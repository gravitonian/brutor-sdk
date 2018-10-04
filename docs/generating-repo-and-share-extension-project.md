# Generating and Running a Repository Extension & Share Extension Project
This tutorial shows how you can generate, build, and run a project that supports both 
Alfresco Repository extensions and Share extensions.

An Alfresco Repository extension will be applied to the *alfresco.war* file and 
an Alfresco Share extension will be applied to the *share.war* file.

-   [Prerequisites](#rerequisites)
-   [Generating the Extension project](#generating-the-extension-project)
    -  [Generator Properties explained](#generator-properties-explained)
-   [Building the Extension project](#building-the-extension-project)
-   [Running the Docker Images with Extensions applied](#running-the-docker-images-with-extensions-applied)
-   [Changing the Extensions and Rebuilding and Deploying the Docker Images](#changing-the-extensions-and-rebuilding-and-deploying-the-docker-images)
-   [Stopping the Docker Containers](#stopping-the-docker-containers)

## Prerequisites

You have installed and configured the development environment according to this [doc](installation-and-configuration.md). 

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
                 
? Parent Project name? My Repo and Share Project
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-repo-share-project
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
? Include project for Activiti Extension? No
? Include project for Activiti Aggregator and Activiti Docker Build? No
? Generate sample source code for all extensions? Yes
? Generate Web Script sample with APS Rest Call in the Repo Extension project? No
? Generate a developer runtime environment based on Docker Compose? Yes
? Enable Inbound Email Server? No
? Enable Outbound Email Server? Yes
```

The important property for generating a Repository extension project is the `Include project for Alfresco Repository Extension` property, 
make sure to answer `Yes`. The same goes for the `Include project for Alfresco Share Extension`, make sure to answer `Yes`. 
We are not using any workflow so answer `No` to the `Include project for Activiti Extension` question.
See below for explanation of the rest of the properties.   

The following files should be generated and they make up the Repo & Share Extension project:

```bash 
Checking root dir...
Your Alfresco extension project must be inside a directory named my-repo-share-project
This directory will be automatically created.
Creating .yo-rc.json file...
Writing project files...
   create pom.xml
   create README.md
   create build-all.sh
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
   create runner/docker-compose/docker-compose.yml
   create runner/docker-compose/acs/alfresco-global.properties
   create runner/docker-compose/acs/log4j.properties
   create runner/docker-compose/docker-postgresql-multiple-databases/create-multiple-postgresql-databases.sh
```
We can see that we got one project called `repo-extension` that can be used to build Repository customizations
and one project called `share-extension` that can be used to build Alfresco Share UI customizations.

There are also the `repo-aggregator-docker` and `share-aggregator-docker` projects that are used that are used to 
assemble (aggregate) all the Repository and Share extensions (there are usually more than one of each in a bigger project) 
and then build the custom Docker images with the extension(s) applied.

The Repo and Share extensions that are aggregated can either be extensions that you develop locally or extensions 
that are available in a Maven repository somewhere. 
 
### Generator Properties explained
There are a number of properties that we can customize when we run the Alfresco project extension generator.
The following table explains the properties related to this type of extension project:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| Parent Project name | `string` | Alfresco Extension Project | This is the name of the parent project that will contain the Repository and Share extensions, aggregator and Docker builds, and Runner projects. You can call it whatever you like. Does not apply to the individual extension project names.|
| Parent Project description | `string` | Alfresco project for working with multiple extensions in a containerized environment | This is the description of the parent project. Does not apply to the individual extension project descriptions.|
| Maven projects groupId | `string` | org.alfresco | The Maven project group ID. This applies to both the parent project and the Repository and Share extension projects|
| Maven parent project artifactId | `string` | my_alf_proj | The Maven parent project artifact ID. Does not apply to the extension projects|
| Maven projects version | `string` | 1.0.0-SNAPSHOT | The Maven project version. This applies to both the parent project and the extension projects|
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
| Include project for Activiti Aggregator and Activiti Docker Build | `boolean` | Yes | Controls whether we want to generate a project for building custom Activiti Docker Image.|
| Generate sample source code for all extensions | `boolean` | Yes | Controls whether sample source code should be generated for the Extension project(s).|
| Generate Web Script sample with APS Rest Call in the Repo Extension project | `boolean` | No | Controls whether sample source code should be generated for an ACS Web Script that uses the APS ReST API Java client to start a process in APS.|
| Generate a developer runtime environment based on Docker Compose | `boolean` | Yes | Controls whether a Runner project based on Docker Compose should be generated. This project can then be used to start up the whole Alfresco solution, or the parts needed to run the Extension.|
| Enable Inbound Email Server | `boolean` | No | Controls whether the alfresco-global.properties should be configured to enable Inbound Email.|
| Enable Outbound Email Server | `boolean` | Yes | Controls whether the alfresco-global.properties should be configured to enable Outbound Email. This also adds an SMTP service to the Docker Compose file so outbound email can be tested.|

## Building the extension project
To build the project step into the project directory and run the `build-all.sh` script:

*Important! If you have another Alfresco extension project running, then you need to stop it first.*

```bash
$ cd my-repo-share-project/
my-repo-share-project mbergljung$ ./build-all.sh 
[INFO] Scanning for projects...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] Repository Extension
[INFO] My Repo and Share Project
[INFO] Alfresco Repository Aggregator and Repository Docker Image Build
[INFO] Share Extension
[INFO] Alfresco Share Aggregator and Share Docker Image Build
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
[INFO] Compiling 4 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:testResources (default-testResources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:testCompile (default-testCompile) @ repo-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.19.1:test (default-test) @ repo-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ repo-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ repo-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building My Repo and Share Project 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ my-repo-share-project ---
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ my-repo-share-project ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/my-repo-share-project/1.0.0-SNAPSHOT/my-repo-share-project-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Repository Aggregator and Repository Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ repo-aggregator-docker ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-repo-extensions) @ repo-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:repo-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-aggregator-docker/target/extensions/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ repo-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-aggregator-docker/1.0.0-SNAPSHOT/repo-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ repo-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-aggregator-docker/target/docker/alfresco-content-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Created docker-build.tar in 34 milliseconds
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Built image sha256:d238d
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Removed old image sha256:14d81
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
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/share-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ share-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ share-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ share-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/share-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Share Aggregator and Share Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-aggregator-docker ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-share-extensions) @ share-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:share-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/share-aggregator-docker/target/extensions/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/share-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-aggregator-docker/1.0.0-SNAPSHOT/share-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ share-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/share-aggregator-docker/target/docker/alfresco-share-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Created docker-build.tar in 8 milliseconds
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Built image sha256:ae2fe
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Removed old image sha256:f276a
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] Repository Extension ............................... SUCCESS [  3.315 s]
[INFO] My Repo and Share Project .......................... SUCCESS [  0.094 s]
[INFO] Alfresco Repository Aggregator and Repository Docker Image Build SUCCESS [  2.016 s]
[INFO] Share Extension .................................... SUCCESS [  0.438 s]
[INFO] Alfresco Share Aggregator and Share Docker Image Build SUCCESS [  0.642 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 6.679 s
[INFO] Finished at: 2018-09-30T08:15:40+01:00
[INFO] Final Memory: 54M/499M
[INFO] ------------------------------------------------------------------------
``` 
This script will first build the parent project, which acts as an aggregator project. Then it will build the 
Repository extension JAR followed by the custom Repository Docker image, which will include the Repo extension JAR.  
After this the same thing is built for the Share extension, the JAR followed by the Docker image.

The custom Docker images that are built is tagged with the version that was specified during project generation.
In this case **1.0.0-SNAPSHOT**. So when you build the images repeatedly, as you code your extensions, there will
not be multiple images created.

We can list Docker images and we should see the newly built images as follows:

```bash
$ docker image ls
REPOSITORY                                                       TAG                 IMAGE ID            CREATED              SIZE
alfresco-content-services-custom                                 1.0.0-SNAPSHOT      2910039ecc35        About a minute ago   1.89GB
alfresco-share-custom                                            1.0.0-SNAPSHOT      07bcb1ed692f        About a minute ago   709MB
```

## Running the Docker Images with Extensions applied
To run and test the customizations use the `run.sh` command (first time you do this you will see a lot of downloads of Docker images from Docker Hub):

*Important!  Make sure ports 5432, 8080, 8082, and 8083 are open. 
These are defined in the docker-compose.yml file.*

```bash
my-repo-share-project mbergljung$ ./run.sh 
Creating network "docker-compose_default" with the default driver
Pulling solr6 (alfresco/alfresco-search-services:1.1.1)...
1.1.1: Pulling from alfresco/alfresco-search-services
6fd64836e300: Already exists
8ff6188dadfc: Already exists
d1b16fb40528: Already exists
fed33e3ce39c: Already exists
96f24514a7b3: Pull complete
6f415ea07e70: Pull complete
e2f858f39b3d: Pull complete
Digest: sha256:be7bf1463c55ced0058becdcd9ad952b3f770213e55b82c119d0eca95e70c7d8
Status: Downloaded newer image for alfresco/alfresco-search-services:1.1.1
Pulling postgres (postgres:10.1)...
10.1: Pulling from library/postgres
723254a2c089: Pull complete
39ec0e6c372c: Pull complete
ba1542fb91f3: Pull complete
c7195e642388: Pull complete
95424deca6a2: Pull complete
2d7d4b3a4ce2: Pull complete
fbde41d4a8cc: Pull complete
880120b92add: Pull complete
9a217c784089: Pull complete
d581543fe8e7: Pull complete
e5eff8940bb0: Pull complete
462d60a56b09: Pull complete
135fa6b9c139: Pull complete
Digest: sha256:3f4441460029e12905a5d447a3549ae2ac13323d045391b0cb0cf8b48ea17463
Status: Downloaded newer image for postgres:10.1
Pulling smtp (tophfr/mailhog:)...
latest: Pulling from tophfr/mailhog
ff3a5c916c92: Already exists
bc640255a091: Pull complete
bc34f6b95a48: Pull complete
9190d9faff6b: Pull complete
00e0ddcda0e4: Pull complete
Digest: sha256:691a35d048479a6051dae59ef433ecbac495001e741b596a291fc5ae1fcc3b61
Status: Downloaded newer image for tophfr/mailhog:latest
Creating docker-compose_postgres_1 ... done
Creating docker-compose_smtp_1     ... done
Creating docker-compose_solr6_1    ... done
Creating docker-compose_content_1  ... done
Creating docker-compose_share_1    ... done
Attaching to docker-compose_smtp_1, docker-compose_solr6_1, docker-compose_postgres_1, docker-compose_content_1, docker-compose_share_1

...
... wait until you see the following type of logs
...
content_1   | 25-Sep-2018 07:43:56.107 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
content_1   | 25-Sep-2018 07:43:56.144 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
content_1   | 25-Sep-2018 07:43:56.158 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 157809 ms
```
This uses the *runner/docker-compose/docker-compose.yml* file to start up the whole Alfresco environment with Repository,
Share, Solr, and PostgreSQL.

The Repository should now be accessible on http://localhost:8082 and Share should be accessible on 
http://localhost:8080/share.

## (OPTIONAL) Apply ACS Enterprise License
If you selected to use *Enterprise Edition* of the ACS server, then you need to install a license.
Navigate to the following address and apply your ACS Enterprise license:

```bash
http://localhost:8082/alfresco/service/enterprise/admin/admin-license
```

## Changing the Extensions and Rebuilding and Deploying the Docker Images
The Alfresco system is now up and running and you would most likely want to keep working on 
the extensions and from time to time update the running system with the changes. 

So how can we make changes to an extension and then build and deploy those?

This can be done quite easily by executing the `update-repo-container.sh` script for Repository extension updates and
the `update-share-container.sh` script for Alfresco Share extension updates.
 
For example, to build and run with latest Repository customizations, run the following script from a different terminal 
than was used to run the system:

```bash
my-repo-share-project mbergljung$ ./update-repo-container.sh 
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Repository Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.0.0:clean (default-clean) @ repo-extension ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/target
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:resources (default-resources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 12 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:compile (default-compile) @ repo-extension ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 4 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:testResources (default-testResources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:testCompile (default-testCompile) @ repo-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.19.1:test (default-test) @ repo-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ repo-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ repo-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.843 s
[INFO] Finished at: 2018-09-30T08:18:37+01:00
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
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-aggregator-docker/target
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-repo-extensions) @ repo-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:repo-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-aggregator-docker/target/extensions/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ repo-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-aggregator-docker/1.0.0-SNAPSHOT/repo-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ repo-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-repo-share-project/repo-aggregator-docker/target/docker/alfresco-content-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Created docker-build.tar in 39 milliseconds
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Built image sha256:95f81
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Removed old image sha256:d238d
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.592 s
[INFO] Finished at: 2018-09-30T08:18:42+01:00
[INFO] Final Memory: 23M/370M
[INFO] ------------------------------------------------------------------------
Creating docker-compose_content_1 ... done
```
This script will do the following:

- Build the Extension so we are sure to get the latest changes
- Stop the Container 
- Remove the Container - so we can build a new image
- Assemble/Aggregate all Repository extension JARs into the target/extensions directory
- Build a new Docker Image with the Extension JAR(s) applied
- Start the Container based on newly built Image

This works the same for the `update-share-container.sh` script.

## Stopping the Docker Containers
The whole Alfresco solution can be stopped in two ways.

The first way is by running the `stop.sh` script from a different terminal 
than was used to run the system:

```bash
my-repo-share-project mbergljung$ ./stop.sh 
Stopping docker-compose_content_1  ... done
Stopping docker-compose_share_1    ... done
Stopping docker-compose_postgres_1 ... done
Stopping docker-compose_solr6_1    ... done
Stopping docker-compose_smtp_1     ... done
Removing docker-compose_content_1  ... done
Removing docker-compose_share_1    ... done
Removing docker-compose_postgres_1 ... done
Removing docker-compose_solr6_1    ... done
Removing docker-compose_smtp_1     ... done
Removing network docker-compose_default
```

This will stop all container and remove them after. 

You can also **Ctrl-C** out of the running Docker Compose console. That will stop the containers but not remove them.

