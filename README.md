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

