# Generating and Running a Share Extension Project
This tutorial shows how an Alfresco Share extension project can be generated, built, and run.
An Alfresco Share project builds an Alfresco extension that will be applied
to the *share.war* file.

-   [Prerequisites](#rerequisites)
-   [Generating the Extension project](#generating-the-extension-project)
    -  [Generator Properties explained](#generator-properties-explained)
-   [Building the Extension project](#building-the-extension-project)
-   [Building the Docker Image with Extension applied](#building-the-docker-image-with-extension-applied)
-   [Running the Docker Image with Extension applied](#running-the-docker-image-with-extension-applied)
-   [Changing the Extension and Rebuilding and Deploying the Docker Image](#changing-the-extension-and-rebuilding-and-deploying-the-docker-image)
-   [Stopping the Docker Containers](#stopping-the-docker-containers)

## Prerequisites
The Yeoman scaffolding tool has been installed and the Alfresco project generator 
has been installed. See this [README](https://github.com/gravitonian/brutor-sdk/blob/master/README.md) if you need to install these. 

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
? Would you like to use Community or Enterprise Edition? Community
? Include Alfresco Repository Extension? No
? Include Alfresco Share Extension? Yes
? Share Extension maven artifactId? share-extension
? Share Extension Name? Share Extension
? Share Extension Description? Share extension module JAR (to be included in the share.war)
? Alfresco Share Community version? 6.0.c
? Alfresco Share Docker Image version? 6.0.c
? Should a project for Share Docker build be generated (i.e. build Share Docker image with Share extension)? Yes
? Package Share extension as JAR or AMP? JAR
? Include Activiti Extension? No
? Generate sample source code for all extensions? Yes
? Generate a developer runtime environment based on Docker Compose? Yes
? Enable Inbound Email Server? No
? Enable Outbound Email Server? Yes
```

The important property for generating a Share extension project is the `Include Alfresco Share Extension` property, 
make sure to answer `Yes`.  Then also answer `No` to the `Include Alfresco Repository Extension` and `Include Activiti Extension` 
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
   create build-all-extensions.sh
   create build-all-docker-images.sh
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
   create share-docker/pom.xml
   create share-docker/Dockerfile
   create runner/docker-compose/docker-compose.yml
   create runner/docker-compose/acs/alfresco-global.properties
   create runner/docker-compose/acs/log4j.properties
   create runner/docker-compose/docker-postgresql-multiple-databases/create-multiple-postgresql-databases.sh
```

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
| Include Alfresco Repository Extension | `boolean` | Yes | Controls whether a Repository Extension project should be generated or not.|
| Include Alfresco Share Extension | `boolean` | Yes | Controls whether a Share Extension project should be generated or not.|
| Share Extension maven artifactId | `string` | share-extension | The Maven Share Extension project artifact ID.|
| Share Extension Name | `string` | Share Extension | The Maven Share Extension project name.|
| Share Extension Description | `string` | Share extension module JAR (to be included in the alfresco.war) | The Maven Share Extension project description.|
| Alfresco Share Community version | `string` | 6.0.c | The version of the Alfresco Share (i.e. share.war) that the Share Extension should be applied to. If you selected Enterprise Edition, then the default version would be specified accordingly.|
| Alfresco Share Docker Image version | `string` | 6.0.c | The version of the Alfresco Share Docker Image that should be used as the base for building custom Share Docker Image.|
| Should a project for Share Docker build be generated (i.e. build Share Docker image with share extension) | `boolean` | Yes | Controls whether we want to generate a project for building custom Share Docker Image.|
| Package Share extension as JAR or AMP | `string` | JAR | Controls whether we want to also generate an AMP artifact. Choose AMP and the Extension project will generate both a JAR and an AMP artifact.|
| Include Activiti Extension | `boolean` | Yes | Controls whether an Activiti Extension project should be generated or not.|
| Generate sample source code for all extensions | `boolean` | Yes | Controls whether sample source code should be generated for the Extension project(s).|
| Generate a developer runtime environment based on Docker Compose | `boolean` | Yes | Controls whether a Runner project based on Docker Compose should be generated. This project can then be used to start up the whole Alfresco solution, or the parts needed to run the Extension.|
| Enable Inbound Email Server | `boolean` | No | Controls whether the alfresco-global.properties should be configured to enable Inbound Email.|
| Enable Outbound Email Server | `boolean` | Yes | Controls whether the alfresco-global.properties should be configured to enable Outbound Email. This also adds an SMTP service to the Docker Compose file so outbound email can be tested.|

## Building the extension project
To build the project step into the project directory and execute the following command:

```bash
brutor-samples mbergljung$ cd my-share-project/
MBP512-MBERGLJUNG-0917:my-share-project mbergljung$ ./build-share-extension.sh 
[INFO] Scanning for projects...
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
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 1.369 s
[INFO] Finished at: 2018-09-25T10:57:15+01:00
[INFO] Final Memory: 11M/245M
[INFO] ------------------------------------------------------------------------
``` 
This builds the JAR file and installs it in the local Maven Repository.

## Building the Docker Image with Extension applied
To be able to test the Share extension we need somewhere to run it.
To do this we will create a custom Share Docker Image containing the extension JAR.

Execute the following command:

```bash
my-share-project mbergljung$ ./build-share-docker-image.sh 
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Share Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 1.159 s
[INFO] Finished at: 2018-09-25T10:58:05+01:00
[INFO] Final Memory: 12M/309M
[INFO] ------------------------------------------------------------------------
Error response from daemon: No such container: docker-compose_share_1
Error: No such container: docker-compose_share_1
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Share Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-docker-image ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-share-extensions) @ share-docker-image ---
[INFO] Configured Artifact: org.alfresco:share-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-docker/target/jars/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-docker-image ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-docker-image/1.0.0-SNAPSHOT/share-docker-image-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ share-docker-image ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-docker/target/docker/alfresco-share-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Created docker-build.tar in 47 milliseconds
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Built image sha256:07bcb
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Removed old image sha256:06248
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.702 s
[INFO] Finished at: 2018-09-25T10:58:10+01:00
[INFO] Final Memory: 23M/369M
[INFO] ------------------------------------------------------------------------
```

This will actually build the extension again. So you could skip the separate building of the extension and
just use this script. It then builds the custom Share Docker image with the *share-docker/Dockerfile*, 
which will take the Alfresco Share image version that was specified during the project generation 
and then add the Share Extension JAR to it.

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

The Repository should now be accessible on http://localhost:8082 and Share should be accessible on 
http://localhost:8080/share.

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
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 1.282 s
[INFO] Finished at: 2018-09-25T11:02:57+01:00
[INFO] Final Memory: 11M/245M
[INFO] ------------------------------------------------------------------------
docker-compose_share_1
docker-compose_share_1
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Share Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ share-docker-image ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-docker/target
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-share-extensions) @ share-docker-image ---
[INFO] Configured Artifact: org.alfresco:share-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying share-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-docker/target/jars/share-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ share-docker-image ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/share-docker-image/1.0.0-SNAPSHOT/share-docker-image-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ share-docker-image ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-share-project/share-docker/target/docker/alfresco-share-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Created docker-build.tar in 51 milliseconds
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Built image sha256:7a83a
[INFO] DOCKER> [alfresco-share-custom:1.0.0-SNAPSHOT] "share-custom": Removed old image sha256:07bcb
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.240 s
[INFO] Finished at: 2018-09-25T11:03:13+01:00
[INFO] Final Memory: 23M/372M
[INFO] ------------------------------------------------------------------------
Creating docker-compose_share_1 ... done
```
This script will do the following:

- Build the Extension so we are sure to get the latest changes
- Stop the Container 
- Remove the Container - so we can build a new image
- Build a new Image with the Extension applied
- Start the Container 

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

