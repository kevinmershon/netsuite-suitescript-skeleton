#/bin/bash

echo "Preparing project repository for SDF"
mkdir Objects
touch Objects/.git-keep
mkdir FileCabinet
touch FileCabinet/.git-keep
mkdir AccountConfiguration
touch AccountConfiguration/.git-keep
mkdir FileCabinet/SuiteScripts
touch FileCabinet/SuiteScripts/sdf_ignore
mkdir FileCabinet/SuiteScripts/\.attributes
touch FileCabinet/SuiteScripts/.attributes/.git-keep
mkdir FileCabinet/Templates
mkdir FileCabinet/Templates/E-mail\ Templates
touch FileCabinet/Templates/E-mail\ Templates/.git-keep
mkdir FileCabinet/Templates/Marketing\ Templates
touch FileCabinet/Templates/Marketing\ Templates/.git-keep

echo '<deploy>'>deploy.xml
echo '    <configuration>'>>deploy.xml
echo '        <path>~/AccountConfiguration/*</path>'>>deploy.xml
echo '    </configuration>'>>deploy.xml
echo '    <files>'>>deploy.xml
echo '        <path>~/FileCabinet/SuiteScripts/*</path>'>>deploy.xml
echo '    </files>'>>deploy.xml
echo '    <objects>'>>deploy.xml
echo '        <path>~/Objects/*</path>'>>deploy.xml
echo '    </objects>'>>deploy.xml
echo '</deploy>'>>deploy.xml

DirName=`pwd`
ProjectName=`basename "$DirName"`

echo '<manifest projecttype="ACCOUNTCUSTOMIZATION">'>manifest.xml
echo "    <projectname>$ProjectName</projectname>">>manifest.xml
echo '    <frameworkversion>1.0</frameworkversion>'>>manifest.xml
echo '    <dependencies>'>>manifest.xml
echo '        <features>'>>manifest.xml
echo '            <feature required="true">CUSTOMRECORDS</feature>'>>manifest.xml
echo '            <feature required="true">SERVERSIDESCRIPTING</feature>'>>manifest.xml
echo '            <feature required="false">CREATESUITEBUNDLES</feature>'>>manifest.xml
echo '        </features>'>>manifest.xml
echo '    </dependencies>'>>manifest.xml
echo '</manifest>'>>manifest.xml

git add Objects FileCabinet AccountConfiguration deploy.xml manifest.xml
#git commit -m 'Initialize SDF project template'
