# Generating and Running a Share Extension Project
This tutorial shows how an Alfresco Share extension project can be generated, built, and run.
An Alfresco Share project builds an Alfresco extension that will be applied
to the *share.war* file.

-   [Prerequisites](#rerequisites)
-   [Generating the Extension project](#generating-the-extension-project)
    -  [Generator Properties explained](#generator-properties-explained)
-   [Building the Extension project](#building-the-extension-project)
-   [Running the Docker Image with Extension applied](#running-the-docker-image-with-extension-applied)
-   [Changing the Extension and Rebuilding and Deploying the Docker Image](#changing-the-extension-and-rebuilding-and-deploying-the-docker-image)
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
                 
? Parent Project name? My Share Project
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-share-project
? Maven projects version? 1.0.0-SNAPSHOT
? Package for Java classes? org.alfresco
? Would you like to use Community or Enterprise Edition for Repository and Share? Community
? Include project for Alfresco Repository Extension? No
? Include project for Alfresco Repository Aggregator and Repository Docker Build? No
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
? Generate a developer runtime environment based on Docker Compose? Yes
? Enable Inbound Email Server? No
? Enable Outbound Email Server? Yes
```

The important property for generating a Share extension project is the `Include project for Alfresco Share Extension` property, 
make sure to answer `Yes`.  Then also answer `No` to the `Include project for Alfresco Repository Extension` and `Include project for Activiti Extension` 
properties so those extension projects are not generated. See below for explanation of the rest of the properties.   

The following files should be generated and they make up the Repo Extension project:

```bash 
Checking root dir...
Your Alfresco extension project must be inside a directory named my-share-project
This directory will be automatically created.
Creating .yo-rc.json file...
Writing project files...
   create pom.xml
   create README.md
   create build-all.sh
   create build-share-extension.sh
   create build-share-docker-image.sh
   create update-share-container.sh
   create run.sh
   create stop.sh
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

We can see that we got one project called `share-extension` that can be used to build Share UI customizations
and one project called `share-aggregator-docker` that are used to assemble (aggregate) all the Share extensions 
(there are usually more than one in a bigger project) and then build the custom Docker image with the extension(s) applied.

The Share extensions that are aggregated can either be extensions that you develop locally or extensions 
that are available in a Maven repository somewhere. 

### Generator Properties explained
There are a number of properties that we can customize when we run the Alfresco project extension generator.
The following table explains the properties related to Share extension projects:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| Parent Project name | `string` | Alfresco Extension Project | This is the name of the parent project that will contain the Share extension, Share Docker build, and Runner projects. You can call it whatever you like. Does not apply to the Share Extension project name.|
| Parent Project description | `string` | Alfresco project for working with multiple extensions in a containerized environment | This is the description of the parent project. Does not apply to the Share Extension project description.|
| Maven projects groupId | `string` | org.alfresco | The Maven project group ID. This applies to both the parent project and the Share extension project|
| Maven parent project artifactId | `string` | my_alf_proj | The Maven parent project artifact ID. Does not apply to the Share Extension project|
| Maven projects version | `string` | 1.0.0-SNAPSHOT | The Maven project version. This applies to both the parent project and the Share extension project|
| Package for Java classes | `string` | org.alfresco | The base Java package for Java classes. Any generated sample code in any generated project will end up in this package|
| Would you like to use Community or Enterprise Edition | `string` | Community | Controls whether the Alfresco Community Edition or Enterprise Edition should be used. It determines default versions for artifacts and Docker images.|
| Include project for Alfresco Repository Extension | `boolean` | Yes | Controls whether a Repository Extension project should be generated or not.|
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
| Generate a developer runtime environment based on Docker Compose | `boolean` | Yes | Controls whether a Runner project based on Docker Compose should be generated. This project can then be used to start up the whole Alfresco solution, or the parts needed to run the Extension.|
| Enable Inbound Email Server | `boolean` | No | Controls whether the alfresco-global.properties should be configured to enable Inbound Email.|
| Enable Outbound Email Server | `boolean` | Yes | Controls whether the alfresco-global.properties should be configured to enable Outbound Email. This also adds an SMTP service to the Docker Compose file so outbound email can be tested.|

## Building the extension project
To build the project step into the project directory and run the `build-all.sh` script:

*Important! If you have another Alfresco extension project running, then you need to stop it first.*

```bash
cd my-share-project/
my-share-project mbergljung$ ./build-all.sh 
[INFO] Scanning for projects...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] Share Extension
[INFO] My Share Project
[INFO] Alfresco Share Aggregator and Share Docker Image Build
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
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ share-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ share-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ share-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building My Share Project 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ my-share-project ---
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ my-share-project ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/my-share-project/1.0.0-SNAPSHOT/my-share-project-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Share Aggregator and Share Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-aggregator-docker ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-share-extensions) @ share-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:share-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-aggregator-docker/target/jars/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-aggregator-docker/1.0.0-SNAPSHOT/share-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ share-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-aggregator-docker/target/docker/alfresco-share-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Created docker-build.tar in 36 milliseconds
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Built image sha256:19aad
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Removed old image sha256:019de
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] Share Extension .................................... SUCCESS [  1.050 s]
[INFO] My Share Project ................................... SUCCESS [  0.007 s]
[INFO] Alfresco Share Aggregator and Share Docker Image Build SUCCESS [  2.679 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.839 s
[INFO] Finished at: 2018-09-30T08:01:20+01:00
[INFO] Final Memory: 29M/333M
[INFO] ------------------------------------------------------------------------
``` 
This script will first build the parent project, which acts as an aggregator project. Then it will build the 
Share extension JAR followed by the custom Share Docker image, which will include the Share extension JAR.  

The custom Docker image that is built is tagged with the version that was specified during project generation.
In this case **1.0.0-SNAPSHOT**. So when you build the image repeatedly, as you code your extension, there will
not be multiple images created.

We can list Docker images and we should see the newly built image as follows:

```bash
$ docker image ls
REPOSITORY                                                       TAG                 IMAGE ID            CREATED              SIZE
alfresco-share-custom                                            1.0.0-SNAPSHOT      07bcb1ed692f        About a minute ago   709MB
```

## Running the Docker Image with Extension applied
To run and test the customization use the `run.sh` command:

*Important!  Make sure ports 5432, 8080, 8082, and 8083 are open. 
These are defined in the docker-compose.yml file.*

```bash
my-share-project mbergljung$ ./run.sh 
Creating network "docker-compose_default" with the default driver
Creating docker-compose_solr6_1    ... done
Creating docker-compose_smtp_1     ... done
Creating docker-compose_postgres_1 ... done
Creating docker-compose_content_1  ... done
Creating docker-compose_share_1    ... done
...
... wait until you see the following type of logs
...
content_1   | 25-Sep-2018 10:02:17.599 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
content_1   | 25-Sep-2018 10:02:17.637 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
content_1   | 25-Sep-2018 10:02:17.672 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 138513 ms
```
This uses the *runner/docker-compose/docker-compose.yml* file to start up the whole Alfresco environment with Repository,
Share, Solr, and PostgreSQL.

The Repository should now be accessible on http://localhost:8082/alfresco and Share should be accessible on 
http://localhost:8080/share.

## (OPTIONAL) Apply ACS Enterprise License
If you selected to use *Enterprise Edition* of the ACS server, then you need to install a license.
Navigate to the following address and apply your ACS Enterprise license:

```bash
http://localhost:8082/alfresco/service/enterprise/admin/admin-license
```

## Changing the Extension and Rebuilding and Deploying the Docker Image
The Alfresco system is now up and running and you would most likely want to keep working on 
the Share Extension and from time to time update the running system with the changes. 

So how can we make changes to the extension and then build and deploy those?

This can be done quite easily by executing the `update-share-container.sh` script from a different terminal 
than was used to run the system:

```bash
my-share-project mbergljung$ ./update-share-container.sh 
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Share Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-extension ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/target
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ share-extension ---
[INFO] Copying 12 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ share-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ share-extension ---
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ share-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ share-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ share-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/target/share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-extension/1.0.0-SNAPSHOT/share-extension-1.0.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 1.917 s
[INFO] Finished at: 2018-09-30T08:03:47+01:00
[INFO] Final Memory: 11M/245M
[INFO] ------------------------------------------------------------------------
docker-compose_share_1
docker-compose_share_1
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Share Aggregator and Share Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-aggregator-docker ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-aggregator-docker/target
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-share-extensions) @ share-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:share-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-aggregator-docker/target/jars/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-aggregator-docker/1.0.0-SNAPSHOT/share-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ share-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-aggregator-docker/target/docker/alfresco-share-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Created docker-build.tar in 50 milliseconds
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Built image sha256:f276a
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Removed old image sha256:19aad
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.834 s
[INFO] Finished at: 2018-09-30T08:04:04+01:00
[INFO] Final Memory: 23M/370M
[INFO] ------------------------------------------------------------------------
Creating docker-compose_share_1 ... done
```
This script will do the following:

- Build the Extension so we are sure to get the latest changes
- Stop the Container 
- Remove the Container - so we can build a new image
- Assemble/Aggregate all Share extension JARs into the target/jars directory
- Build a new Docker Image with the Extension JAR(s) applied
- Start the Container based on newly built Image

## Stopping the Docker Containers
The whole Alfresco solution can be stopped in two ways.

The first way is by running the `stop.sh` script from a different terminal 
than was used to run the system:

```bash
my-share-project mbergljung$ ./stop.sh 
Stopping docker-compose_share_1    ... done
Stopping docker-compose_content_1  ... done
Stopping docker-compose_postgres_1 ... done
Stopping docker-compose_smtp_1     ... done
Stopping docker-compose_solr6_1    ... done
Removing docker-compose_share_1    ... done
Removing docker-compose_content_1  ... done
Removing docker-compose_postgres_1 ... done
Removing docker-compose_smtp_1     ... done
Removing docker-compose_solr6_1    ... done
Removing network docker-compose_default
```

This will stop all container and remove them after. 

You can also **Ctrl-C** out of the running Docker Compose console. That will stop the container but not remove them.

