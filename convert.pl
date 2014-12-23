use strict;
use warnings;

my $single = 0;
if($single)
{
  my $src = "src/domain/data/banking/BankAccountDetails.java";
  my $dst = "src/domain/data/banking/BankAccountDetails.js";
  convert($src, $dst);
}
else
{
  processDir("src/domain");
}

sub processDir
{
  my $path = shift;
  opendir my $hdir, $path or die "Can't open $path: $!";
  my @files = grep { !/^\.{1,2}$/ } readdir $hdir;
  closedir $hdir;
  
  @files = map { $path . '/' . $_ } @files;
  for (@files)
  {
    if( -d $_ )
    {
      processDir($_);
    }
    else
    {
      my $java = $_;
      my $js = $_;
      
      next if($js =~ /package-info.js/);
      
      if($js =~ s/\.java$/\.js/i)
      {
        print "$js\n";
        next if($js =~ /UnitedStatesAccountType/i);
        next if($js =~ /Inv401KSource/i);
        next if($js =~ /TransactionWrappedRequestMessage/i);
        next if($js =~ /TransactionWrappedResponseMessage/i);
        convert($java, $js);
      }
    }
  }
}

sub trim
{
  my $s = shift;
  $s =~ s/^\s+|\s+$//g;
  return $s;
}

sub fixType
{
  my ($type) = @_;
  if($type =~ /List\<(.*)\>/)
  {
    $type = $1 . "[]";
  }
  return $type;
}

sub convertDir
{
  my ($dir) = @_;
  my @files = glob("$dir/*.java");
  foreach my $java (@files)
  {
    my $js = $java;
    $js =~ s/\.java$/\.js/i;
    print "$js\n";
  }
}

sub convert
{
  my ($src, $dst) = @_;
  open my $hsrc, $src or die "Can't open $src for reading: $!";
  open my $hdst, ">$dst" or die "Can't open $dst for writing: $!";
  
  my $comment = '';
  my $aggregate = 0;
  my @paths;
  while(my $line = <$hsrc>)
  {
    if($line =~ /(public|private|protected)(\s+abstract)?\s+class[^{]+$/)
    {
      chomp $line;
      $line .= <$hsrc>;
    }

    if($comment)
    {
      $comment .= $line;
      if($line =~ m/\*\//)
      {
        $comment =~ s/ \* Copyright \d+ Web Cohesion\n \*\n//m;
        $comment =~ s/ \* \@author.*\n \*\n//m;
        print $hdst $comment;
        $comment = '';
      }
    }
    elsif($line =~ m/\/\*/)
    {
      $comment = $line;
    }
    elsif($line =~ /import (.*);/i)
    {
      my $module = $1;
      if($module =~ s/net\.sf\.ofx4j\.//i)
      {
        my @paths = split /\./, $module;
        my $mod = $paths[-1];
        my $path = join '/', @paths;
        print $hdst "var $mod = require(\"$path\");\n";
      }
      else
      {
        print $hdst "//$line";
      }
    }
    elsif($line =~ m/public enum (\w+)/)
    {
      my $sym = $1;
      print $hdst "var $sym = {\n";
      my $val = 0;
      while($line = <$hsrc>)
      {
        my $last = 0;
        
        if($line =~ /(public|private|protected)\s+static\s+([\w<>]+)\s+(\w+)\(([^\)]*)\)/)
        {
          my $access = $1;
          my $return = fixType($2);
          my $fcn = $3;
          my $args = $4;
          
          my @a = split /,/, $args;
          my @newargs;
          foreach my $arg (@a)
          {
            my ($type, $param) = $arg =~ /([\w<>]+)\s+(\w+)/;
            $type = fixType($type);
            if($comment =~ s/\@param $param/\@param \{$type\} $param/mg)
            {
              push @newargs, $param;
            }
            else
            {
              push @newargs, "/*$type*/ $param";
            }
          }
          $args = join ', ', @newargs;
          
          if($comment)
          {
            $comment =~ s/\@return /\@return \{$return\} /mg;
          }
          
          $comment =~ s/^  //mg;
          print $hdst $comment;
          
          print $hdst "  $fcn: function($args) {\n";
          my $braces = 1;
          while($line = <$hsrc>)
          {
            $braces += scalar($line =~ /{/g);
            $braces -= scalar($line =~ /}/g);
            if($braces == 0)
            {
              chomp $line;
              print $hdst $line;
              last;
            }
            print $hdst $line;
          }
          
          print $hdst ";\n";
          $comment = "";
          next;
        }
        elsif($line =~ s/(\w+)((,|;)?)/$1: $val$2/)
        {
          $val++;
        }
        elsif($line =~ s/(\w+)(\s*)=(\s*)(\d+)(,|;)/$1$2:$3$4,/)
        {
          $val = $4 + 1;
        }
        elsif($line =~ s/}/};/)
        {
          $last = 1;
        }
        
        print $hdst $line;
        last if($last);
      }
      print $hdst "\n\nmodule.exports = $sym;\n";
    }
    elsif($line =~ /^\s*\@Aggregate\s*\(\s*"(\w+)"\s*\)/)
    {
      $aggregate = $1;
    }
    elsif($line =~ /^\s*\@Aggregate/i)
    {
      $aggregate = '1';
    }
    elsif($line =~ m/public(?:\s+abstract)?\s+class (\w+)\s+(?:extends\s*([\w<>]+))?(\s+implements\s+[\w<>]+)*/)
    {
      my $class = $1;
      my $base = $2;
      my $constructor = "";
      my $methods = "";
      my $classComment = $comment;
      $comment = "";
      my $element = "";
      my $header = "";
      my $childAggregate = "";
      my @implements = $line =~ /implements\s+([\w<>\.]+)/g;
      if($aggregate eq '1')
      {
        $aggregate = $class;
      }

      while($line = <$hsrc>)
      {
        #print "++: $line";
        if($line =~ /(public|private|protected)\s+\w+\s+\w+\([^\)]+$/)
        {
          chomp $line;
          $line .= <$hsrc>;
        }
        
        if($line =~ /(public|private|protected)?(\s+final)?\s+([\w\.<>]+)\s+(\w+)(\s*=\s*.*)?;/)
        {
          my $initializer = $5;
          if(! $initializer)
          {
            $initializer = ' = null';
          }
          $constructor .= "\n";
          $constructor .= "  /**\n";
          $constructor .= "   * \@name $class#$4\n";
          $constructor .= "   * \@type $3\n";
          $constructor .= "   * \@access $1\n" if($1);
          $constructor .= "   */\n";
          $constructor .= "  this.$4$initializer;\n";
        }
        elsif($line =~ /\/\*/)
        {
          $comment = $line;
          while($line = <$hsrc>)
          {
            $comment .= $line;
            last if($line =~ /\*\//);
          }
        }
        elsif($line =~ /^\s*\/\//)
        {
          $comment .= $line;
        }
        elsif($line =~ /^\s*\@Header\s*\(\s*([^\)]+\s*)/i)
        {
          $header = trim($1);
          $header =~ s/ ?=/:/g;
        }
        elsif($line =~ /^\s*\@Element\s*\(\s*([^\)]+\s*)/i)
        {
          $element = trim($1);
          $element =~ s/ ?=/:/g;
        }
        elsif($line =~ /^\s*\@ChildAggregate\s*\(\s*([^\)]+\s*)/i)
        {
          $childAggregate = trim($1);
          $childAggregate =~ s/ ?=/:/g;
        }
        elsif($line =~ /(public|private|protected)?\s*([\w\.<>]+)?\s+(\w+)\(([^\)]*)\)/)
        {
          my $return = $2 ? fixType($2) : "";
          my $fcn = $3;
          my $args = $4;
          
          my @a = split /,/, $args;
          my @newargs;
          foreach my $arg (@a)
          {
            my ($type, $param) = $arg =~ /([\w<>]+)\s+(\w+)/;
            $type = fixType($type);
            if($comment =~ s/\@param $param/\@param \{$type\} $param/mg)
            {
              push @newargs, $param;
            }
            else
            {
              push @newargs, "/*$type*/ $param";
            }
          }
          $args = join ', ', @newargs;
          
          if($comment)
          {
            $comment =~ s/\@return /\@return \{$return\} /mg;
          }
          
          $comment =~ s/^  //mg;
          $methods .= $comment;
          
          $methods .= "$class.prototype.$fcn = function($args) {\n";
          my $braces = 1;
          while($line = <$hsrc>)
          {
            $line =~ s/^  //;
            $methods .= $line;
            $braces += scalar($line =~ /{/g);
            $braces -= scalar($line =~ /}/g);
            if($braces == 0)
            {
              chomp $methods;
              last;
            }
          }
          
          $methods .= ";\n";
          
          if($header)
          {
            my $setter = $fcn;
            $setter =~ s/^get/set/;
            my $getter = $fcn;
            $getter =~ s/^set/get/;
            $methods .= "Header.add({$header, owner: $class, /*type: $return,*/ fcn: \"$fcn\"});\n";
            $header = "";
          }
          if($element)
          {
            my $setter = $fcn;
            $setter =~ s/^get/set/;
            my $getter = $fcn;
            $getter =~ s/^set/get/;
            $methods .= "Element.add({$element, owner: $class, /*type: $return,*/ fcn: \"$fcn\"});\n";
            $element = "";
          }
          if($childAggregate)
          {
            my $setter = $fcn;
            $setter =~ s/^get/set/;
            my $getter = $fcn;
            $getter =~ s/^set/get/;
            $methods .= "ChildAggregate.add({$childAggregate, owner: $class, /*type: $return,*/ fcn: \"$fcn\"});\n";
            $childAggregate = "";
          }
          $methods .= "\n\n";
          $comment = "";
        }
        elsif($line =~ m/public enum (\w+) implements (\w+)/)
        {
          my $sym = $1;
          my $ebase = $2;
          #$methods .= "$class.$sym = {\n";
          my $constructor = "$class.$sym = {\n";
          my $values = "";
          my $statics = "";
          my $val = 0;
          my %access = ();
          while($line = <$hsrc>)
          {
            my $last = 0;
            $line =~ s/^  //;
            if($line =~ /(\w+)\((.*)\)\s*(,|;)/)
            {
              $statics .= "$class.$sym.$1 = new $class.$sym($2);\n";
              next;
            }
            elsif($line =~ /$sym\((.*)\)\s+\{/)
            {
              my $args = $1;
              my %types = ();
              my @a = split /,/, $args;
              my @newargs;
              foreach my $arg (@a)
              {
                my ($type, $param) = $arg =~ /([\w<>]+)\s+(\w+)/;
                $type = fixType($type);
                $types{$param} = $type;
                if($comment =~ s/\@param $param/\@param \{$type\} $param/mg)
                {
                  push @newargs, $param;
                }
                else
                {
                  push @newargs, "/*$type*/ $param";
                }
              }
              $args = join ', ', @newargs;
              
              $constructor = "$class.$sym = function($args) {\n";
              my $braces = 1;
              while($line = <$hsrc>)
              {
                $line =~ s/^    //;
                
                if($line =~ /this\.(\w+)\s+=/)
                {
                  my $name = $1;
                  my $type = $types{$name};
                  my $acc = $access{$name} or die "unknown access for $name";
                  $constructor .= "\n";
                  $constructor .= "  /**\n";
                  $constructor .= "   * \@name $class.$sym#$name\n";
                  $constructor .= "   * \@type $type\n";
                  $constructor .= "   * \@access $acc\n";
                  $constructor .= "   */\n";
                }
                $constructor .= $line;
                $braces += scalar($line =~ /\{/g);
                $braces -= scalar($line =~ /\}/g);
                last if($braces == 0);
              }
              chomp $constructor;
              $constructor .= ";\n";
              next;
            }
            elsif($line =~ /(public|private|protected)(\s+final)?\s+([\w<>]+)\s+(\w+)(\s*=\s*.*)?;/)
            {
              $access{$4} = $1;
              next;
            }
            elsif($line =~ /public( static)? (\w+)\s+(\w+)\((.*)\)\s+\{/)
            {
              my $args = $4;
              $statics .= "\n";
              $statics .= "/**\n";
              
              my @a = split /,/, $args;
              my @newargs;
              foreach my $arg (@a)
              {
                my ($type, $param) = $arg =~ /([\w<>]+)\s+(\w+)/;
                $type = fixType($type);
                $statics .= " * \@param {$type} $param\n";
                push @newargs, $param;
              }
              $args = join ', ', @newargs;
              
              $statics .= " * \@returns $2\n";
              $statics .= " */\n";
              if($1)
              {
                $statics .= "$class.$sym.$3 = function($args) {\n";
              }
              else
              {
                $statics .= "$class.$sym.prototype.$3 = function($args) {\n";
              }
              my $braces = 1;
              while($line = <$hsrc>)
              {
                $line =~ s/^    //;
                $statics .= $line;
                $braces += scalar($line =~ /\{/g);
                $braces -= scalar($line =~ /\}/g);
                last if($braces == 0);
              }
              next;
            }
            elsif($line =~ s/(\w+)((,|;)?)/$1: $val$2/)
            {
              $val++;
            }
            elsif($line =~ s/(\w+)(\s*)=(\s*)(\d+)(,|;)/$1$2:$3$4,/)
            {
              $val = $4 + 1;
            }
            elsif($line =~ s/}/};/)
            {
              $last = 1;
            }

            $values .= $line;
            last if($last);
          }
          $methods .= "$constructor\n";
          
          if($ebase =~ y/<>/()/)
          {
            $ebase = "new $base";
          }
          $methods .= "inherit($class.$sym, \"implements\", $ebase);\n";

          $methods .= "\n\n";
          $methods .= $statics;
          $methods .= "\n";
        }
        elsif($line =~ m/public enum (\w+)/)
        {
          my $sym = $1;
          $methods .= "var $sym = $class.$sym = {\n";
          my $val = 0;
          while($line = <$hsrc>)
          {
            my $last = 0;
            $line =~ s/^  //;
            if($line =~ s/(\w+)((,|;)?)/$1: $val$2/)
            {
              $val++;
            }
            elsif($line =~ s/(\w+)(\s*)=(\s*)(\d+)(,|;)/$1$2:$3$4,/)
            {
              $val = $4 + 1;
            }
            elsif($line =~ s/}/};/)
            {
              $last = 1;
            }

            $methods .= $line;
            last if($last);
          }
          $methods .= "\n";
        }
        elsif($line =~ /^}/)
        {
          # class closer, do nothing
          last;
        }
        elsif($line =~ /^\s*\@override\s*$/i)
        {
          $comment .= "// " . trim($line) . "\n";
        }
        else
        {
          $line = trim($line);
          if($line)
          {
            die "line didn't match: '$line'\n";
          }
        }
      }
      
      print $hdst $classComment;
      print $hdst "function $class () {\n";
      print $hdst $constructor;
      print $hdst "}\n\n";
      if($base)
      {
        if($base =~ y/<>/()/)
        {
          $base = "new $base";
        }
        print $hdst "inherit($class, \"extends\", $base);\n";
      }
      foreach my $i (@implements)
      {
        print $hdst "inherit($class, \"implements\", $i);\n";
      }
      print $hdst "\n\n";
      if($aggregate)
      {
        print $hdst "Aggregate.add(\"$aggregate\", $class);\n";
        $aggregate = 0;
      }
      print $hdst "\n\n";
      print $hdst $methods;
      
      print $hdst "\n\nmodule.exports = $class;\n";
    }
    elsif($line =~ /public interface (\w+)/)
    {
      my $interface = $1;
      if($comment)
      {
        print $hdst $comment;
        $comment = "";
      }
      print $hdst "function $interface() {\n";
      print $hdst "}\n\n";
      while($line = <$hsrc>)
      {
        if($line =~ /\/\*/)
        {
          $comment = $line;
          while($line = <$hsrc>)
          {
            $comment .= $line;
            last if($line =~ /\*\//);
          }
        }
        elsif($line =~ /\s*([\w<>]+)\s+(\w+)\(([^\)]*)\)/)
        {
          my $return = fixType($1);
          my $fcn = $2;
          my $args = $3;
          
          if($args)
          {
            my @a = split /,/, $args;
            my @newargs;
            foreach my $arg (@a)
            {
              my ($type, $param) = $arg =~ /([\w<>]+)\s+(\w+)/;
              $type = fixType($type);
              if($comment =~ s/\@param $param/\@param \{$type\} $param/mg)
              {
                push @newargs, $param;
              }
              else
              {
                push @newargs, "/*$type*/ $param";
              }
            }
            $args = join ', ', @newargs;
          }
          else
          {
            $args = "";
          }
          
          if($comment)
          {
            $comment =~ s/\@return /\@return \{$return\} /mg;
            $comment =~ s/^  //mg;
            print $hdst $comment;
            $comment = "";
          }
          print $hdst "$interface.prototype.$fcn = function($args) { throw new Error(\"not implemented\"); };\n\n";
        }
      }
      
      print $hdst "\nmodule.exports = $interface;\n";
    }
    elsif($line =~ s/package net.*;/\"use strict\";\n\nvar inherit = require\("..\/inherit"\);/i)
    {
      print $hdst $line;
    }
    else
    {
      print $hdst $line;
      die "Unknown line: $line\n" if(trim($line) ne "");
    }
  }
  
  close $hdst;
  close $hsrc;
}