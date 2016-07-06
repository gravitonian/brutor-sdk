<h1 align="center">Yeoman Generator - Alfresco SDK Projects</h1>
<p align="center">
  <img title="yeoman generator" src='https://github.com/yeoman/media/blob/master/optimized/yeoman-150x150-opaque.png' alt='yeoman logo'  />
</p>

## Installing Yeoman and the Alfresco SDK Generator

First, install [Yeoman](http://yeoman.io):

```bash
$ sudo npm install -g yo
```

Then the Alfresco SDK Generator:
 
```bash
$ sudo npm install -g alfresco-sdk-generator
```
 
##  Generating a new SDK project:

First, move in the folder where you want create your project.

```bash
$ yo alfresco-sdk
              ,****.          
         ,.**. `*****  <-_    
        ******** ***** ####   
       $********::**** ####;  
       _.-._`***::*** ######  
     ,*******, *::* .;##### @ 
     **********,' -=#####',@@@
     ***' .,---, ,.-==@@@@@@@@
      * /@@@@@',@ @\ '@@@@@@@ 
       '@@@@/ @@@ @@@\ ':#'   
       !@@@@ @@@@ @@@@@@@@@^  
        @@@@ @@@@@ @@@@@@@'   
         `"$ '@@@@@. '##'     
              '@@@@;'         
     
     Welcome to the Alfresco SDK Project generator!
                 
? Maven project groupId? org.alfresco.test
? Maven project artifactId? aio-gen
? Maven project version? 1.0.0-SNAPSHOT
? Package for Java sample classes? org.alfresco.test
? Project name? AIO SDK 3.0 Project
? Project description? AIO SDK 3.0 Project
? Would you like to use Community or Enterprise Edition? Community
? Alfresco Platform (i.e. Repository) version? 5.2.a-EA
? Alfresco Share version? 5.1.g
? Should sample source code be generated for modules? Yes
```

##  Adding a platform action to the new project
This uses the platformaction sub-generator:

```
aio-gen/aio-gen-platform-sample-jar$ yo alfresco-sdk:platformaction

Just found a `.yo-rc.json` in a parent directory.
Setting the project root at: /home/martin/src/sdk3/alfresco-generator-tests/aio-gen
              ,****.          
         ,.**. `*****  <-_    
        ******** ***** ####   
       $********::**** ####;  
       _.-._`***::*** ######  
     ,*******, *::* .;##### @ 
     **********,' -=#####',@@@
     ***' .,---, ,.-==@@@@@@@@
      * /@@@@@',@ @\ '@@@@@@@ 
       '@@@@/ @@@ @@@\ ':#'   
       !@@@@ @@@@ @@@@@@@@@^  
        @@@@ @@@@@ @@@@@@@'   
         `"$ '@@@@@. '##'     
              '@@@@;'         
     
     Welcome to the Alfresco SDK Platform Action Generator!
                 
? Base Java package for this platform module? org.alfresco.test
? Java package name for all platform actions? actions
? Platform Action Title? Sample
? Platform Action Description? Sample platform action, also called repository action
Writing platform action files...
Artifact ID: aio-gen-platform-sample-jar
   create src/main/java/org/alfresco/test/actions/SampleActionExecuter.java
   create src/main/resources/alfresco/module/aio-gen-platform-sample-jar/context/action-sample-context.xml
   create src/main/resources/alfresco/module/aio-gen-platform-sample-jar/messages/aio-gen-platform-sample-jar-sample-platform-action.properties
```
