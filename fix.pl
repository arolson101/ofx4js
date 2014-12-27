use strict;
use warnings;


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
      my $js = $_;
      
      if($js =~ /\.js$/i)
      {
        print "$js\n";
        
        convert($js);
      }
    }
  }
}


processDir("src");


sub convert
{
  my $js = shift;
  
  open my $hfile, $js or die "Can't open $js for reading: $!";
  my $doc = "";
  my $found = 0;
  while(my $line = <$hfile>)
  {
    #Element.add({name: "CURDEF", required: true, order: 0, owner: StatementResponse, /*type: String,*/ fcn: "getCurrencyCode"});
    if($line =~ s/(\.add\()\s*(\{.*)owner: (\w+), /$1$3, $2/)
    {
      $found = 1;
    }
    if($line =~ s/\/\*type: ([^,]+,)\*\//attributeType: $1/)
    {
      $line =~ s/boolean/bool/i;
      $line =~ s/(\w+)\[\]/Array, collectionEntryType: $1/;
      $found = 1;
    }
    $doc .= $line;
    
    if($found)
    {
#      print $line;
#      $found = 0;
    }
  }
  close $hfile;

#return;
  if($found)
  {
    open my $hout, ">$js" or die "Can't open $js for writing: $!";
    print $hout $doc;
    close $hout;
  }
}
