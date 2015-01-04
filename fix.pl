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
      
      if($js =~ /\.java$/i)
      {
        convert($js);
      }
    }
  }
}


#processDir("src");
processDir("/Users/aolson/Desktop/ofx4j-code/src");


sub convert
{
  my $js = shift;
  #print "$js\n";
  
  open my $hfile, $js or die "Can't open $js for reading: $!";
  my $doc = "";
  my $found = 0;
  my %fcns;
  while(my $line = <$hfile>)
  {
    if($line =~ /static/)
    {
      if(!$found)
      {
        print "*****\n$js\n";
        $found = 1;
      }
      print $line;
    }
  }
  close $hfile;
}
