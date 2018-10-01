# Generating and Running an Activiti Extension Project
This tutorial shows how an Activiti (Alfersco Process Services) extension project can be generated, built, and run.
An Activiti project builds an extension that will be applied to the *activiti-app.war* file.

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
                 
? Parent Project name? My Activiti Project
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-activiti-project
? Maven projects version? 1.0.0-SNAPSHOT
? Package for Java classes? org.alfresco
? Would you like to use Community or Enterprise Edition for Repository and Share? Community
? Include project for Alfresco Repository Extension? No
? Include project for Alfresco Repository Aggregator and Repository Docker Build? No
? Include project for Alfresco Share Extension? No
? Include project for Alfresco Share Aggregator and Share Docker Build? No
? Include project for Activiti Extension? Yes
? Activiti extension maven artifactId? activiti-extension
? Activiti Extension Name? Activiti Extension
? Activiti Extension Description? Activiti extension JAR (to be included in the activiti_app.war)
? Activiti version? 1.9.0.3
? Activiti Docker Image version? 1.9.0.1
? Package for Activiti Java classes (don't change unless you know what you are doing)? com.activiti.extension.bean
? Include project for Activiti Aggregator and Activiti Docker Build? Yes
? Generate sample source code for all extensions? Yes
? Generate Service Task sample with ACS Rest Call in the Activiti Extension project? No
? Generate a developer runtime environment based on Docker Compose? Yes
```

The important property for generating an Activiti extension project is the `Include project for Activiti Extension` property, 
make sure to answer `Yes`.  Then also answer `No` to the `Include project for Alfresco Share Extension` and `Include project for Alfresco Repository Extension` 
properties so those extension projects are not generated. See below for explanation of the rest of the properties.   

The following files should be generated and they make up the Repo Extension project:

```bash 
Your Alfresco extension project must be inside a directory named my-activiti-project
This directory will be automatically created.
Creating .yo-rc.json file...
Writing project files...
   create pom.xml
   create README.md
   create build-all.sh
   create build-activiti-extension.sh
   create build-activiti-docker-image.sh
   create update-activiti-container.sh
   create run.sh
   create stop.sh
   create activiti-extension/pom.xml
   create activiti-extension/src/main/java/com/activiti/extension/bean/SimpleJavaDelegate.java
   create activiti-extension/src/main/java/com/activiti/extension/bean/SimpleSpringJavaDelegate.java
   create activiti-aggregator-docker/pom.xml
   create activiti-aggregator-docker/Dockerfile
   create runner/docker-compose/docker-compose.yml
   create runner/docker-compose/aps/activiti-app.properties
   create runner/docker-compose/aps/log4j.properties
   create runner/docker-compose/aps/enterprise-license/README.md
   create runner/docker-compose/docker-postgresql-multiple-databases/create-multiple-postgresql-databases.sh
```
We can see that we got one project called `activiti-extension` that can be used to build Activiti customizations 
(e.g. Service Tasks implementations) and one project called `activiti-aggregator-docker` that are used to assemble (aggregate) 
all the Activiti extensions (there are usually more than one in a bigger project) and then build the custom Docker image with the extension(s).

The Activiti extensions that are aggregated can either be extensions that you develop locally or extensions 
that are available in a Maven repository somewhere. 

### Generator Properties explained
There are a number of properties that we can customize when we run the Alfresco project extension generator.
The following table explains the properties related to Activiti extension projects:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| Parent Project name | `string` | Alfresco Extension Project | This is the name of the parent project that will contain the Activiti extension, aggregator Docker build, and Runner projects. You can call it whatever you like. Does not apply to the Activiti Extension project name.|
| Parent Project description | `string` | Alfresco project for working with multiple extensions in a containerized environment | This is the description of the parent project. Does not apply to the Activiti Extension project description.|
| Maven projects groupId | `string` | org.alfresco | The Maven project group ID. This applies to both the parent project and the Activiti extension project|
| Maven parent project artifactId | `string` | my_alf_proj | The Maven parent project artifact ID. Does not apply to the Activiti Extension project|
| Maven projects version | `string` | 1.0.0-SNAPSHOT | The Maven project version. This applies to both the parent project and the Activiti extension project|
| Package for Java classes | `string` | org.alfresco | **Does not apply** to the Activiti Extension project, only to Repository and Share projects.|
| Would you like to use Community or Enterprise Edition | `string` | Community | **Does not apply** to the Activiti Extension project, only to Repository and Share projects.|
| Include project for Alfresco Repository Extension | `boolean` | Yes | Controls whether a Repository Extension project should be generated or not.|
| Include project for Alfresco Repository Aggregator and Repository Docker Build | `boolean` | Yes | Controls whether we want to generate a project for building custom Repository Docker Image.|
| Include project for Alfresco Share Extension | `boolean` | Yes | Controls whether a Share Extension project should be generated or not.|
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
| Generate Service Task sample with ACS Rest Call in the Activiti Extension project | `boolean` | No | Controls whether sample source code should be generated for an APS Service Task that uses the ACS ReST API Java client to create a folder in ACS.|
| Generate a developer runtime environment based on Docker Compose | `boolean` | Yes | Controls whether a Runner project based on Docker Compose should be generated. This project can then be used to start up the whole Alfresco solution, or the parts needed to run the Extension.|

## Building the extension project
To build the project step into the project directory and run the `build-all.sh` script:

*Important! If you have another Alfresco extension project running, then you need to stop it first.*

```bash
cd my-activiti-project/
my-activiti-project mbergljung$ ./build-all.sh 
[INFO] Scanning for projects...
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Build Order:
[INFO] 
[INFO] My Activiti Project
[INFO] Activiti Extension
[INFO] Activiti Aggregator and Docker Image Build
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building My Activiti Project 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ my-activiti-project ---
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ my-activiti-project ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/my-activiti-project/1.0.0-SNAPSHOT/my-activiti-project-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Activiti Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ activiti-extension ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ activiti-extension ---
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ activiti-extension ---
[INFO] Changes detected - recompiling the module!
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[INFO] Compiling 2 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ activiti-extension ---
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ activiti-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ activiti-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ activiti-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ activiti-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target/activiti-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/activiti-extension/1.0.0-SNAPSHOT/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/activiti-extension/1.0.0-SNAPSHOT/activiti-extension-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Activiti Aggregator and Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ activiti-aggregator-docker ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/target
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-activiti-extensions) @ activiti-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:activiti-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying activiti-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/target/jars/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ activiti-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/activiti-aggregator-docker/1.0.0-SNAPSHOT/activiti-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ activiti-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/target/docker/alfresco-process-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Created docker-build.tar in 41 milliseconds
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Built image sha256:80684
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Removed old image sha256:242c2
[INFO] ------------------------------------------------------------------------
[INFO] Reactor Summary:
[INFO] 
[INFO] My Activiti Project ................................ SUCCESS [  0.373 s]
[INFO] Activiti Extension ................................. SUCCESS [  3.693 s]
[INFO] Activiti Aggregator and Docker Image Build ......... SUCCESS [  2.340 s]
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 6.507 s
[INFO] Finished at: 2018-10-01T09:43:48+01:00
[INFO] Final Memory: 65M/514M
[INFO] ------------------------------------------------------------------------
``` 
This script will first build the parent project, which acts as an aggregator project. Then it will build the 
Activiti extension JAR followed by the custom Activiti Docker image, which will include the Activiti extension JAR.  

The custom Docker image that is built is tagged with the version that was specified during project generation.
In this case **1.0.0-SNAPSHOT**. So when you build the image repeatedly, as you code your extension, there will
not be multiple images created.

We can list Docker images and we should see the newly built image as follows:

```bash
$ docker image ls
REPOSITORY                                       TAG                 IMAGE ID            CREATED              SIZE
alfresco-process-services-custom                 1.0.0-SNAPSHOT      80684fec14a5        About a minute ago   1.1GB
```

## Running the Docker Image with Extension applied
To run and test the customization use the `run.sh` command:

```bash
my-repo-project mbergljung$ ./run.sh 
Creating network "docker-compose_default" with the default driver
Creating docker-compose_elasticsearch_1 ... done
Creating docker-compose_postgres_1      ... done
Creating docker-compose_process_1       ... done
Attaching to docker-compose_elasticsearch_1, docker-compose_postgres_1, docker-compose_process_1
...
... wait until you see the following type of logs
...
process_1        | 01-Oct-2018 08:47:35.903 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["http-nio-8080"]
process_1        | 01-Oct-2018 08:47:35.952 INFO [main] org.apache.coyote.AbstractProtocol.start Starting ProtocolHandler ["ajp-nio-8009"]
process_1        | 01-Oct-2018 08:47:36.035 INFO [main] org.apache.catalina.startup.Catalina.start Server startup in 62273 ms
```
This uses the *runner/docker-compose/docker-compose.yml* file to start up the whole Alfresco environment with APS, ElasticSearch, and PostgreSQL.

The Activiti App should now be accessible on the http://localhost:9080/activiti-app URL.

## Changing the Extension and Rebuilding and Deploying the Docker Image
The Activiti/APS system is now up and running and you would most likely want to keep working on 
the Extension and from time to time update the running system with the changes. 

So how can we make changes to the extension and then build and deploy those?

This can be done quite easily by executing the `update-activiti-container.sh` script from a different terminal 
than was used to run the system:

```bash
my-activiti-project mbergljung$ ./update-activiti-container.sh 
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Activiti Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ activiti-extension ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target
[INFO] 
[INFO] --- maven-resources-plugin:2.6:resources (default-resources) @ activiti-extension ---
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/src/main/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:compile (default-compile) @ activiti-extension ---
[INFO] Changes detected - recompiling the module!
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[INFO] Compiling 2 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:2.6:testResources (default-testResources) @ activiti-extension ---
[WARNING] File encoding has not been set, using platform encoding UTF-8, i.e. build is platform dependent!
[WARNING] Using platform encoding (UTF-8 actually) to copy filtered resources, i.e. build is platform dependent!
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.1:testCompile (default-testCompile) @ activiti-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.12.4:test (default-test) @ activiti-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:2.4:jar (default-jar) @ activiti-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ activiti-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/target/activiti-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/activiti-extension/1.0.0-SNAPSHOT/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/activiti-extension/1.0.0-SNAPSHOT/activiti-extension-1.0.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.181 s
[INFO] Finished at: 2018-10-01T09:51:55+01:00
[INFO] Final Memory: 72M/273M
[INFO] ------------------------------------------------------------------------
docker-compose_process_1
docker-compose_process_1
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Activiti Aggregator and Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ activiti-aggregator-docker ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/target
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-activiti-extensions) @ activiti-aggregator-docker ---
[INFO] Configured Artifact: org.alfresco:activiti-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying activiti-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/target/jars/activiti-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ activiti-aggregator-docker ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/activiti-aggregator-docker/1.0.0-SNAPSHOT/activiti-aggregator-docker-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ activiti-aggregator-docker ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my-activiti-project/activiti-aggregator-docker/target/docker/alfresco-process-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Created docker-build.tar in 47 milliseconds
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Built image sha256:56556
[INFO] DOCKER> [alfresco-process-services-custom:1.0.0-SNAPSHOT] "aps-custom": Removed old image sha256:80684
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 2.852 s
[INFO] Finished at: 2018-10-01T09:52:10+01:00
[INFO] Final Memory: 23M/371M
[INFO] ------------------------------------------------------------------------
Creating docker-compose_process_1 ... done
```
This script will do the following:

- Build the Extension so we are sure to get the latest changes
- Stop the Container 
- Remove the Container - so we can build a new image
- Assemble/Aggregate all Activiti extension JARs into the target/jars directory
- Build a new Docker Image with the Extension JAR(s) applied
- Start the Container based on newly built Image

## Stopping the Docker Containers
The whole Activiti/APS solution can be stopped in two ways.

The first way is by running the `stop.sh` script from a different terminal 
than was used to run the system:

```bash
my-activiti-project mbergljung$ ./stop.sh 
Stopping docker-compose_process_1       ... done
Stopping docker-compose_postgres_1      ... done
Stopping docker-compose_elasticsearch_1 ... done
Removing docker-compose_process_1       ... done
Removing docker-compose_postgres_1      ... done
Removing docker-compose_elasticsearch_1 ... done
Removing network docker-compose_default
```

This will stop all container and remove them after. 

You can also **Ctrl-C** out of the running Docker Compose console. That will stop the containers but not remove them.

