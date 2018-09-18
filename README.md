<h1 align="center">Yeoman Generator - Alfresco SDK Projects</h1>
<p align="center">
  <img title="yeoman generator" src='https://github.com/yeoman/media/blob/master/optimized/yeoman-150x150-opaque.png' alt='yeoman logo'  />
</p>

## Installing Yeoman 

First, install [Yeoman](http://yeoman.io):

```bash
$ sudo npm install -g yo
```

## Installing Alfresco Project Generator 
Since we’re developing the generator locally, it’s not yet available as a global npm module. 
A global module may be created and symlinked to a local one, using npm. 

Here’s what you’ll want to do:

On the command line, from the root of your generator project (in the brutor-sdk/ folder), type:

```bash
$ npm link
```

```bash
$ yo alfresco-extension-project
```
 
##  Generating a new project:

First, move in the folder where you want create your project.

```bash
$ yo alfresco-extension-project
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
     
     Welcome to the Alfresco Extension Project Generator!
                 
? Project name?  Alfresco Extension Project
? Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven project groupId? org.alfresco
? Maven project artifactId? my_alf_proj
? Maven project version? 1.0.0-SNAPSHOT
? Package for Java classes? org.alfresco
? Would you like to use Community or Enterprise Edition? Community
? Include Alfresco Repository Extension? Yes
? Repository extension maven artifactId? repo-extension
? Repository Extension Name? Repository Extension
? Repository Extension Description? Repository extension module JAR (to be included in the alfresco.war)
? Alfresco Repository Community version? 6.0.7-ga
? Alfresco Repository Docker Image version? 6.0.7-ga
? Should a project for Repository Docker build be generated (i.e. build Repo Docker image with repo extension)? Yes
? Package Repo extension as JAR or AMP? JAR
? Include Alfresco Share Extension? Yes
? Share extension maven artifactId? share-extension
? Share Extension Name? Share Extension
? Share Extension Description? Share extension module JAR (to be included in the share.war)
? Alfresco Share Community version? 6.0.c
? Alfresco Share Docker Image version? 6.0.c
? Should a project for Share Docker build be generated (i.e. build Share Docker image with Share extension)? Yes
? Package Share extension as JAR or AMP? JAR
? Include Activiti Extension? Yes
? Activiti extension maven artifactId? activiti-extension
? Activiti Extension Name? Activiti Extension
? Activiti Extension Description? Activiti extension JAR (to be included in the activiti_app.war)
? Activiti version? 1.9.0.3
? Activiti Docker Image version? 1.9.0.1
? Package for Activiti Java classes (don't change unless you know what you are doing)? com.activiti.extension.bean
? Should a project for Activiti Docker build be generated (i.e. build Activiti Docker image with Activiti extension)? Yes
? Generate sample source code for all extensions? Yes
? Generate a developer runtime environment based on Docker Compose? Yes
Checking root dir...
Your Alfresco extension project must be inside a directory named my_alf_proj
This directory will be automatically created.
Creating .yo-rc.json file...
Writing project files...
  ...
Nothing to install in npm repo...
```

##  Adding a platform action to the new project
This uses the platformaction sub-generator:

TODO
