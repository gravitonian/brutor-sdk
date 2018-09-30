# Generating and Running a Repository, Share, and Activiti Extension Project
This tutorial shows how you can generate, build, and run a project that supports  
Alfresco Repository extensions, Share extensions, and Activiti extensions.

An Alfresco Repository extension will be applied to the *alfresco.war* file and 
an Alfresco Share extension will be applied to the *share.war* file.
The Activiti workflow extension will be applied to the *activiti-app.war* file.


-   [Prerequisites](#rerequisites)
-   [Generating the Extension project](#generating-the-extension-project)
    -  [Generator Properties explained](#generator-properties-explained)
-   [Building the Extension project](#building-the-extension-project)
-   [Running the Docker Images with Extensions applied](#running-the-docker-images-with-extensions-applied)
-   [Changing the Extensions and Rebuilding and Deploying the Docker Images](#changing-the-extensions-and-rebuilding-and-deploying-the-docker-images)
-   [Stopping the Docker Containers](#stopping-the-docker-containers)

## Prerequisites
The Yeoman scaffolding tool has been installed and the Alfresco project generator 
has been installed. See this [README](https://github.com/gravitonian/brutor-sdk/blob/master/README.md) if you need to install these. 

You have configured Maven according to this [doc](docs/configuring-maven-with-alfresco-repositories.md). 

## Generating the extension project
Standing in the directory where you want to generate the project (it will be created in a new subdirectory) 
run the `yo` command:

```bash
brutor-samples mbergljung$ yo
? 'Allo Martin! What would you like to do? (Use arrow keys)
  Run a generator
❯ Alfresco Extension Project 
  Alfresco Adf App 
  ──────────────
  Update your generators 
  Install a generator 
  Find some help 
```
Make sure to select the `Alfresco Extension Project` option and then hit `Enter`:

```bash 
Make sure you are in the directory you want to scaffold into.
This generator can also be run with: yo alfresco-extension-project

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
                 
? Parent Project name? My Repo, Share, and Activiti Project
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-repo-share-activiti-project
? Maven projects version? 1.0.0-SNAPSHOT
? Package for Java classes? org.alfresco
? Would you like to use Community or Enterprise Edition for Repository and Share? Community
? Include project for Alfresco Repository Extension? Yes
? Repository Extension maven artifactId? repo-extension
? Repository Extension Name? Repository Extension
? Repository Extension Description? Repository extension module JAR (to be included in the alfresco.war)
? Alfresco Repository Community version? 6.0.7-ga
? Alfresco Repository Docker Image version? 6.0.7-ga
? Package Repo extension as JAR or AMP? JAR
? Include project for Alfresco Repository Aggregator and Repository Docker Build? Yes
? Include project for Alfresco Share Extension? Yes
? Share Extension maven artifactId? share-extension
? Share Extension Name? Share Extension
? Share Extension Description? Share extension module JAR (to be included in the share.war)
? Alfresco Share Community version? 6.0.c
? Alfresco Share Docker Image version? 6.0.c
? Package Share extension as JAR or AMP? JAR
? Include project for Alfresco Share Aggregator and Share Docker Build? Yes
? Include project for Activiti Extension? Yes
? Activiti extension maven artifactId? activiti-extension
? Activiti Extension Name? Activiti Extension
? Activiti Extension Description? Activiti extension JAR (to be included in the activiti_app.war)
? Activiti version? 1.9.0.3
? Activiti Docker Image version? 1.9.0.1
? Package for Activiti Java classes (don't change unless you know what you are doing)? com.activiti.extension.bean
? Include project for Activiti Aggregator and Activiti Docker Build? Yes
? Generate sample source code for all extensions? Yes
? Generate Web Script sample with APS Rest Call in the Repo Extension project? No
? Generate Service Task sample with ACS Rest Call in the Activiti Extension project? No
? Generate a developer runtime environment based on Docker Compose? Yes
? Enable Inbound Email Server? No
? Enable Outbound Email Server? Yes
```

The important property for generating a Repository extension project is the `Include project for Alfresco Repository Extension` property, 
make sure to answer `Yes`. The same goes for the `Include project for Alfresco Share Extension`, make sure to answer `Yes`. 
We are also using workflow in this project, so answer `Yes` to the `Include project for Activiti Extension` question too.
See below for explanation of the rest of the properties.   

The following files should be generated and they make up the Repo, Share, and Activiti Extension project:

```bash 
Checking root dir...
Your Alfresco extension project must be inside a directory named my-repo-share-activiti-project
This directory will be automatically created.
Creating .yo-rc.json file...
Writing project files...
   create pom.xml
   create README.md
   create build-all.sh
   create build-activiti-extension.sh
   create build-activiti-docker-image.sh
   create update-activiti-container.sh
   create build-repo-extension.sh
   create build-repo-docker-image.sh
   create update-repo-container.sh
   create build-share-extension.sh
   create build-share-docker-image.sh
   create update-share-container.sh
   create run.sh
   create stop.sh
   create repo-extension/pom.xml
   create repo-extension/src/main/java/org/alfresco/reposamples/Demo.java
   create repo-extension/src/main/java/org/alfresco/reposamples/DemoComponent.java
   create repo-extension/src/main/java/org/alfresco/reposamples/DemoRepoAction.java
   create repo-extension/src/main/java/org/alfresco/reposamples/HelloWorldWebScript.java
   create repo-extension/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.desc.xml
   create repo-extension/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.html.ftl
   create repo-extension/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.js
   create repo-extension/src/main/resources/alfresco/module/repo-extension/context/bootstrap-context.xml
   create repo-extension/src/main/resources/alfresco/module/repo-extension/context/service-context.xml
   create repo-extension/src/main/resources/alfresco/module/repo-extension/context/webscript-context.xml
   create repo-extension/src/main/resources/alfresco/module/repo-extension/model/content-model.xml
   create repo-extension/src/main/resources/alfresco/module/repo-extension/alfresco-global.properties
   create repo-extension/src/main/resources/alfresco/module/repo-extension/log4j.properties
   create repo-extension/src/main/resources/alfresco/module/repo-extension/module.properties
   create repo-extension/src/main/resources/alfresco/module/repo-extension/module-context.xml
   create repo-extension/src/main/resources/META-INF/resources/test.html
   create repo-aggregator-docker/pom.xml
   create repo-aggregator-docker/Dockerfile
   create share-extension/pom.xml
   create share-extension/src/main/resources/alfresco/module/share-extension/module.properties
   create share-extension/src/main/resources/alfresco/web-extension/custom-slingshot-application-context.xml
   create share-extension/src/main/resources/alfresco/web-extension/messages/custom.properties
   create share-extension/src/main/resources/alfresco/web-extension/site-data/extensions/extension-modules.xml
   create share-extension/src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages/simple-page.get.desc.xml
   create share-extension/src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages/simple-page.get.html.ftl
   create share-extension/src/main/resources/alfresco/web-extension/site-webscripts/com/example/pages/simple-page.get.js
   create share-extension/src/main/resources/META-INF/resources/share-extension/js/tutorials/widgets/css/TemplateWidget.css
   create share-extension/src/main/resources/META-INF/resources/share-extension/js/tutorials/widgets/i18n/TemplateWidget.properties
   create share-extension/src/main/resources/META-INF/resources/share-extension/js/tutorials/widgets/templates/TemplateWidget.html
   create share-extension/src/main/resources/META-INF/resources/share-extension/js/tutorials/widgets/TemplateWidget.js
   create share-extension/src/main/resources/META-INF/share-config-custom.xml
   create share-aggregator-docker/pom.xml
   create share-aggregator-docker/Dockerfile
   create activiti-extension/pom.xml
   create activiti-extension/src/main/java/com/activiti/extension/bean/SimpleJavaDelegate.java
   create activiti-extension/src/main/java/com/activiti/extension/bean/SimpleSpringJavaDelegate.java
   create activiti-aggregator-docker/pom.xml
   create activiti-aggregator-docker/Dockerfile
   create runner/docker-compose/docker-compose.yml
   create runner/docker-compose/acs/alfresco-global.properties
   create runner/docker-compose/acs/log4j.properties
   create runner/docker-compose/aps/activiti-app.properties
   create runner/docker-compose/aps/log4j.properties
   create runner/docker-compose/aps/enterprise-license/README.md
   create runner/docker-compose/docker-postgresql-multiple-databases/create-multiple-postgresql-databases.sh
```
We can see that we got one project called `repo-extension` that can be used to build Repository customizations
and one project called `share-extension` that can be used to build Alfresco Share UI customizations. We also 
got the `activiti-extension` project that can be used to build workflow extensions.

There are also the `repo-aggregator-docker`, `share-aggregator-docker`, and `activiti-aggregator-docker` projects that
are used to assemble (aggregate) all the Repository, Share, and Activiti extensions 
(there are usually more than one of each in a bigger project) and then build the custom Docker images 
with the extension(s) applied.
             
The Repo, Share, and Activiti extensions that are aggregated can either be extensions that you develop locally or extensions 
that are available in a Maven repository somewhere.  
 
### Generator Properties explained
There are a number of properties that we can customize when we run the Alfresco project extension generator.
The following table explains the properties related to this type of extension project:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| Parent Project name | `string` | Alfresco Extension Project | This is the name of the parent project that will contain the Repository extension, Repository Docker build, and Runner projects. You can call it whatever you like. Does not apply to the Repository Extension project name.|
| Parent Project description | `string` | Alfresco project for working with multiple extensions in a containerized environment | This is the description of the parent project. Does not apply to the Repository Extension project description.|
| Maven projects groupId | `string` | org.alfresco | The Maven project group ID. This applies to both the parent project and the Repository extension project|
| Maven parent project artifactId | `string` | my_alf_proj | The Maven parent project artifact ID. Does not apply to the Repository Extension project|
| Maven projects version | `string` | 1.0.0-SNAPSHOT | The Maven project version. This applies to both the parent project and the Repository extension project|
| Package for Java classes | `string` | org.alfresco | The base Java package for Java classes. Any generated sample code in any generated project will end up in this package|
| Would you like to use Community or Enterprise Edition | `string` | Community | Controls whether the Alfresco Community Edition or Enterprise Edition should be used. It determines default versions for artifacts and Docker images.|
| Include project for Alfresco Repository Extension | `boolean` | Yes | Controls whether a Repository Extension project should be generated or not.|
| Repository Extension maven artifactId | `string` | repo-extension | The Maven Repository Extension project artifact ID.|
| Repository Extension Name | `string` | Repository Extension | The Maven Repository Extension project name.|
| Repository Extension Description | `string` | Repository extension module JAR (to be included in the alfresco.war) | The Maven Repository Extension project description.|
| Alfresco Repository Community version | `string` | 6.0.7-ga | The version of the Alfresco Repository (i.e. alfresco.war) that the Repository Extension should be applied to. If you selected Enterprise Edition, then the default version would be specified accordingly.|
| Alfresco Repository Docker Image version | `string` | 6.0.7-ga | The version of the Alfresco Repository Docker Image that should be used as the base for building custom Repository Docker Image.|
| Package Repo extension as JAR or AMP | `string` | JAR | Controls whether we want to also generate an AMP artifact. Choose AMP and the Extension project will generate both a JAR and an AMP artifact.|
| Include project for Alfresco Repository Aggregator and Repository Docker Build | `boolean` | Yes | Controls whether we want to generate a project for building custom Repository Docker Image.|
| Include project for Alfresco Share Extension | `boolean` | Yes | Controls whether a Share Extension project should be generated or not.|
| Share Extension maven artifactId | `string` | share-extension | The Maven Share Extension project artifact ID.|
| Share Extension Name | `string` | Share Extension | The Maven Share Extension project name.|
| Share Extension Description | `string` | Share extension module JAR (to be included in the alfresco.war) | The Maven Share Extension project description.|
| Alfresco Share Community version | `string` | 6.0.c | The version of the Alfresco Share (i.e. share.war) that the Share Extension should be applied to. If you selected Enterprise Edition, then the default version would be specified accordingly.|
| Alfresco Share Docker Image version | `string` | 6.0.c | The version of the Alfresco Share Docker Image that should be used as the base for building custom Share Docker Image.|
| Package Share extension as JAR or AMP | `string` | JAR | Controls whether we want to also generate an AMP artifact. Choose AMP and the Extension project will generate both a JAR and an AMP artifact.|
| Include project for Alfresco Share Aggregator and Share Docker Build | `boolean` | Yes | Controls whether we want to generate a project for building custom Share Docker Image.|
| Include project for Activiti Extension | `boolean` | Yes | Controls whether an Activiti Extension project should be generated or not.|
| Activiti extension maven artifactId | `string` | activiti-extension | The Maven Repository Extension project artifact ID.|
| Activiti Extension Name | `string` | Activiti Extension |  The Maven Repository Extension project name.|
| Activiti Extension Description | `string` | Activiti extension JAR (to be included in the activiti_app.war) | The Maven Repository Extension project description.|
| Activiti version | `string` | 1.9.0.3 | The version of Activiti (i.e. activiti-app.war) that the Activiti Extension should be applied to.|
| Activiti Docker Image version | `string` | 1.9.0.1 | The version of the Activiti Docker Image that should be used as the base for building custom Activiti Docker Image.|
| Package for Activiti Java classes (don't change unless you know what you are doing) | `string` | com.activiti.extension.bean | The Java package where Activiti extension beans should be generated and where you should add new ones. Don't change this unless you know exactly what you are doing as the Activiti system looks in the *com.activiti.extension.bean* package by default for beans.|
| Include project for Activiti Aggregator and Activiti Docker Build | `boolean` | Yes | Controls whether we want to generate a project for building custom Activiti Docker Image.|
| Generate sample source code for all extensions | `boolean` | Yes | Controls whether sample source code should be generated for the Extension project(s).|
| Generate Web Script sample with APS Rest Call in the Repo Extension project | `boolean` | No | Controls whether sample source code should be generated for an ACS Web Script that uses the APS ReST API Java client to start a process in APS.|
| Generate Service Task sample with ACS Rest Call in the Activiti Extension project | `boolean` | No | Controls whether sample source code should be generated for an APS Service Task that uses the ACS ReST API Java client to create a folder in ACS.|
| Generate a developer runtime environment based on Docker Compose | `boolean` | Yes | Controls whether a Runner project based on Docker Compose should be generated. This project can then be used to start up the whole Alfresco solution, or the parts needed to run the Extension.|
| Enable Inbound Email Server | `boolean` | No | Controls whether the alfresco-global.properties should be configured to enable Inbound Email.|
| Enable Outbound Email Server | `boolean` | Yes | Controls whether the alfresco-global.properties should be configured to enable Outbound Email. This also adds an SMTP service to the Docker Compose file so outbound email can be tested.|

## Building the extension project
To build the project step into the project directory and run the `build-all.sh` script:

*Important! If you have another Alfresco extension project running, then you need to stop it first.*

```bash
cd my-repo-share-activiti-project/
my-repo-share-activiti-project mbergljung$ ./build-all.sh 
[INFO] Scanning for projects...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] My Repo, Share, and Activiti Project
[INFO] Activiti Extension
[INFO] Activiti Aggregator and Docker Image Build
[INFO] Repository Extension
[INFO] Alfresco Repository Aggregator and Repository Docker Image Build
[INFO] Share Extension
[INFO] Alfresco Share Aggregator and Share Docker Image Build
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building My Repo, Share, and Activiti Project 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ my-repo-share-activiti-project ---
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ my-repo-share-activiti-project ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/my-repo-share-activiti-project/1.0.0-SNAPSHOT/my-repo-share-activiti-project-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Activiti Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ activiti-extension ---
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ activiti-extension ---
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-extension/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ activiti-extension ---
[INFO] Changes detected - recompiling the module!
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[INFO] Compiling 2 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ activiti-extension ---
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ activiti-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ activiti-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ activiti-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-extension/target/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ activiti-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-extension/target/activiti-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/activiti-extension/1.0.0-SNAPSHOT/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/activiti-extension/1.0.0-SNAPSHOT/activiti-extension-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Activiti Aggregator and Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ activiti-aggregator-docker ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-activiti-extensions) @ activiti-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:activiti-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying activiti-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-aggregator-docker/target/jars/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ activiti-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/activiti-aggregator-docker/1.0.0-SNAPSHOT/activiti-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ activiti-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/activiti-aggregator-docker/target/docker/alfresco-process-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Created docker-build.tar in 41 milliseconds
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Built image sha256:3afff
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Removed old image sha256:8846d
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Repository Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.0.0:clean (default-clean) @ repo-extension ---
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:resources (default-resources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 12 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:compile (default-compile) @ repo-extension ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 4 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:testResources (default-testResources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:testCompile (default-testCompile) @ repo-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.19.1:test (default-test) @ repo-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ repo-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ repo-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Repository Aggregator and Repository Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ repo-aggregator-docker ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-repo-extensions) @ repo-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:repo-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-aggregator-docker/target/jars/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ repo-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-aggregator-docker/1.0.0-SNAPSHOT/repo-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ repo-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-aggregator-docker/target/docker/alfresco-content-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Created docker-build.tar in 7 milliseconds
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Built image sha256:1f684
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Removed old image sha256:95f81
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Share Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-extension ---
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ share-extension ---
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] Copying 12 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ share-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ share-extension ---
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/share-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ share-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ share-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ share-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/share-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Share Aggregator and Share Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-aggregator-docker ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-share-extensions) @ share-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:share-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/share-aggregator-docker/target/jars/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/share-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-aggregator-docker/1.0.0-SNAPSHOT/share-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ share-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/share-aggregator-docker/target/docker/alfresco-share-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Created docker-build.tar in 8 milliseconds
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Built image sha256:59eb4
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Removed old image sha256:ae2fe
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] My Repo, Share, and Activiti Project ............... SUCCESS [  0.248 s]
[INFO] Activiti Extension ................................. SUCCESS [  6.413 s]
[INFO] Activiti Aggregator and Docker Image Build ......... SUCCESS [  2.375 s]
[INFO] Repository Extension ............................... SUCCESS [  1.616 s]
[INFO] Alfresco Repository Aggregator and Repository Docker Image Build SUCCESS [  0.548 s]
[INFO] Share Extension .................................... SUCCESS [  0.077 s]
[INFO] Alfresco Share Aggregator and Share Docker Image Build SUCCESS [  0.548 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 11.997 s
[INFO] Finished at: 2018-09-30T08:32:33+01:00
[INFO] Final Memory: 95M/514M
[INFO] ------------------------------------------------------------------------
``` 
This script will first build the parent project, which acts as an aggregator project. Then it will build the 
Repository extension JAR followed by the custom Repository Docker image, which will include the Repo extension JAR.  
After this the same thing is built for the Share extension, the JAR followed by the Docker image. And after this 
the same type of build is done to create the Activiti extension and its custom Docker image.

The custom Docker images that are built is tagged with the version that was specified during project generation.
In this case **1.0.0-SNAPSHOT**. So when you build the images repeatedly, as you code your extensions, there will
not be multiple images created.

We can list Docker images and we should see the newly built images as follows:

```bash
$ docker image ls
REPOSITORY                                                       TAG                 IMAGE ID            CREATED              SIZE
alfresco-share-custom                            1.0.0-SNAPSHOT      019de7b1dd72        2 minutes ago       709MB
alfresco-content-services-custom                 1.0.0-SNAPSHOT      1cb52bb3a635        2 minutes ago       1.89GB
alfresco-process-services-custom                 1.0.0-SNAPSHOT      8846dce1a3af        2 minutes ago       1.1GB
```

## Running the Docker Images with Extensions applied
To run and test the customizations use the `run.sh` command (first time you do this you will see a lot of downloads of Docker images from Docker Hub):

```bash
my-repo-share-activiti-project mbergljung$ ./run.sh 
Creating network "docker-compose_default" with the default driver
Pulling elasticsearch (elasticsearch:1.7.3)...
1.7.3: Pulling from library/elasticsearch
d4bce7fd68df: Pull complete
a3ed95caeb02: Pull complete
816152842605: Pull complete
78b9e3c01ea4: Pull complete
03f01b5df385: Pull complete
2464058c255a: Pull complete
20ae76d672fc: Pull complete
d34e22497ac0: Pull complete
a91742ab17fc: Pull complete
5ddab515df02: Pull complete
58d1e1dd0f86: Pull complete
3aa5d11c4693: Pull complete
d311c7d84c37: Pull complete
5761d495347c: Pull complete
53daee3949bd: Pull complete
850ae9ac2959: Pull complete
Digest: sha256:404c72601ec9f5a5c5f517fcda247698da6df861dda5f3b97af79e7e91fb05e5
Status: Downloaded newer image for elasticsearch:1.7.3
Creating docker-compose_elasticsearch_1 ... done
Creating docker-compose_smtp_1          ... done
Creating docker-compose_postgres_1      ... done
Creating docker-compose_solr6_1         ... done
Creating docker-compose_process_1       ... done
Creating docker-compose_content_1       ... done
Creating docker-compose_share_1         ... done
Attaching to docker-compose_elasticsearch_1, docker-compose_solr6_1, docker-compose_smtp_1, docker-compose_postgres_1, docker-compose_content_1, docker-compose_process_1, docker-compose_share_1

...
... wait until you see the following type of logs
...
process_1        | 29-Sep-2018 15:04:14.883 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
process_1        | 29-Sep-2018 15:04:14.914 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
process_1        | 29-Sep-2018 15:04:14.932 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 109840 ms
and 
content_1        | 29-Sep-2018 15:05:02.507 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
content_1        | 29-Sep-2018 15:05:02.526 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
content_1        | 29-Sep-2018 15:05:02.536 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 157401 ms
```

This uses the *runner/docker-compose/docker-compose.yml* file to start up the whole Alfresco environment with Repository,
Share, Solr, Activiti, and PostgreSQL.

The Repository should now be accessible on http://localhost:8082 and Share should be accessible on 
http://localhost:8080/share. The Activiti App should be accessible at http://localhost:9080/activiti-app.

## Changing the Extensions and Rebuilding and Deploying the Docker Images
The Alfresco system is now up and running and you would most likely want to keep working on 
the extensions and from time to time update the running system with the changes. 

So how can we make changes to an extension and then build and deploy those?

This can be done quite easily by executing the `update-repo-container.sh` script for Repository extension updates and
the `update-share-container.sh` script for Alfresco Share extension updates. For Activiti extension updates use the
`update-activiti-container.sh` script.
 
For example, to build and run with latest Repository customizations, run the following script from a different terminal 
than was used to run the system:

```bash
my-repo-share-activiti-project mbergljung$ ./update-repo-container.sh 
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Repository Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.0.0:clean (default-clean) @ repo-extension ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/target
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:resources (default-resources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 12 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:compile (default-compile) @ repo-extension ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 4 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:testResources (default-testResources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:testCompile (default-testCompile) @ repo-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.19.1:test (default-test) @ repo-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ repo-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ repo-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.829 s
[INFO] Finished at: 2018-09-30T08:39:10+01:00
[INFO] Final Memory: 42M/326M
[INFO] ------------------------------------------------------------------------
docker-compose_content_1
docker-compose_content_1
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Repository Aggregator and Repository Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ repo-aggregator-docker ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-aggregator-docker/target
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-repo-extensions) @ repo-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:repo-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-aggregator-docker/target/jars/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ repo-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-aggregator-docker/1.0.0-SNAPSHOT/repo-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ repo-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-activiti-project/repo-aggregator-docker/target/docker/alfresco-content-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Created docker-build.tar in 41 milliseconds
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Built image sha256:b5d9e
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Removed old image sha256:1f684
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.774 s
[INFO] Finished at: 2018-09-30T08:39:15+01:00
[INFO] Final Memory: 23M/369M
[INFO] ------------------------------------------------------------------------
Creating docker-compose_content_1 ... done
```
This script will do the following:

- Build the Extension so we are sure to get the latest changes
- Stop the Container 
- Remove the Container - so we can build a new image
- Assemble/Aggregate all Repository extension JARs into the target/jars directory
- Build a new Docker Image with the Extension JAR(s) applied
- Start the Container based on newly built Image

This works the same for the `update-share-container.sh` and `update-activiti-container.sh` scripts.

## Stopping the Docker Containers
The whole Alfresco solution can be stopped in two ways.

The first way is by running the `stop.sh` script from a different terminal 
than was used to run the system:

```bash
my-repo-share-activiti-project mbergljung$ ./stop.sh 
Stopping docker-compose_share_1         ... done
Stopping docker-compose_process_1       ... done
Stopping docker-compose_content_1       ... done
Stopping docker-compose_postgres_1      ... done
Stopping docker-compose_solr6_1         ... done
Stopping docker-compose_smtp_1          ... done
Stopping docker-compose_elasticsearch_1 ... done
Removing docker-compose_share_1         ... done
Removing docker-compose_process_1       ... done
Removing docker-compose_content_1       ... done
Removing docker-compose_postgres_1      ... done
Removing docker-compose_solr6_1         ... done
Removing docker-compose_smtp_1          ... done
Removing docker-compose_elasticsearch_1 ... done
Removing network docker-compose_default
```

This will stop all container and remove them after. 

You can also **Ctrl-C** out of the running Docker Compose console. That will stop the containers but not remove them.

