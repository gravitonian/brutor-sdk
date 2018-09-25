# Generating and Running a Repository Extension Project
This tutorial shows how an Alfresco Repository extension project can be generated, built, and run.
An Alfresco Repository project builds an Alfresco extension that will be applied
to the *alfresco.war* file.

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
Standing in the directory where you want to generate the project (it will be created in a new subdirectrory) 
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
                 
? Parent Project name?  Alfresco Extension Project
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my_alf_proj
? Maven projects version? 1.0.0-SNAPSHOT
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
? Include Alfresco Share Extension? No
? Include Activiti Extension? No
? Generate sample source code for all extensions? Yes
? Generate a developer runtime environment based on Docker Compose? Yes
? Enable Inbound Email Server? No
? Enable Outbound Email Server? (Y/n) 
```

Fill in the name bla bla

The following files should be generated and they make up the Repo Extension project:

```bash 
Checking root dir...
Your Alfresco extension project must be inside a directory named my_alf_proj
This directory will be automatically created.
Creating .yo-rc.json file...
Writing project files...
   create pom.xml
   create README.md
   create build-all-extensions.sh
   create build-all-docker-images.sh
   create build-repo-extension.sh
   create build-repo-docker-image.sh
   create update-repo-container.sh
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
   create repo-docker/pom.xml
   create repo-docker/Dockerfile
   create runner/docker-compose/docker-compose.yml
   create runner/docker-compose/acs/alfresco-global.properties
   create runner/docker-compose/acs/log4j.properties
   create runner/docker-compose/docker-postgresql-multiple-databases/create-multiple-postgresql-databases.sh
```

### Generator Properties explained
There are a number of properties that we can customize when we run the Alfresco project extension generator.
The following table explains the properties related to Repository extension projects:

| Name | Type | Default value | Description |
| ---- | ---- | ------------- | ----------- |
| Parent Project name | `string` | Alfresco Extension Project | This is the name of the parent project that will contain the Repository extension, Repository Docker build, and Runner projects. You can call it whatever you like. Does not apply to the Repository Extension project name.|
| Parent Project description | `string` | Alfresco project for working with multiple extensions in a containerized environment | This is the description of the parent project. Does not apply to the Repository Extension project description.|
| Maven projects groupId | `string` | org.alfresco | The Maven project group ID. This applies to both the parent project and the Repository extension project|
| Maven parent project artifactId | `string` | my_alf_proj | The Maven parent project artifact ID. Does not apply to the Repository Extension project|
| Maven projects version | `string` | 1.0.0-SNAPSHOT | The Maven project version. This applies to both the parent project and the Repository extension project|
| Package for Java classes | `string` | org.alfresco | The base Java package for Java classes. Any generated sample code in any generated project will end up in this package|
| Would you like to use Community or Enterprise Edition | `string` | Community | Controls whether the Alfresco Community Edition or Enterprise Edition should be used. It determines default versions for artifacts and Docker images.|
| Include Alfresco Repository Extension | `boolean` | Yes | Controls whether a Repository Extension project should be generated or not.|
| Repository extension maven artifactId | `string` | repo-extension | The Maven Repository Extension project artifact ID.|
| Repository Extension Name | `string` | Repository Extension | The Maven Repository Extension project name.|
| Repository Extension Description | `string` | Repository extension module JAR (to be included in the alfresco.war) | The Maven Repository Extension project description.|
| Alfresco Repository Community version | `string` | 6.0.7-ga | The version of the Alfresco Repository (i.e. alfresco.war) that the Repository Extension should be applied to. If you selected Enterprise Edition, then the default version would be specified accordingly.|
| Alfresco Repository Docker Image version | `string` | 6.0.7-ga | The version of the Alfresco Repository Docker Image that should be used as the base for building custom Repository Docker Image.|
| Should a project for Repository Docker build be generated (i.e. build Repo Docker image with repo extension) | `boolean` | Yes | Controls whether we want to generate a project for building custom Repository Docker Image.|
| Package Repo extension as JAR or AMP | `string` | JAR | Controls whether we want to also generate an AMP artifact. Choose AMP and the Extension project will generate both a JAR and an AMP artifact.|
| Include Alfresco Share Extension | `boolean` | Yes | Controls whether a Share Extension project should be generated or not.|
| Include Activiti Extension | `boolean` | Yes | Controls whether an Activiti Extension project should be generated or not.|
| Generate sample source code for all extensions | `boolean` | Yes | Controls whether sample source code should be generated for the Extension project(s).|
| Generate a developer runtime environment based on Docker Compose | `boolean` | Yes | Controls whether a Runner project based on Docker Compose should be generated. This project can then be used to start up the whole Alfresco solution, or the parts needed to run the Extension.|
| Enable Inbound Email Server | `boolean` | No | Controls whether the alfresco-global.properties should be configured to enable Inbound Email.|
| Enable Outbound Email Server | `boolean` | Yes | Controls whether the alfresco-global.properties should be configured to enable Outbound Email. This also adds an SMTP service to the Docker Compose file so outbound email can be tested.|

## Building the extension project
To build the project step into the project directory and execute the following command:

```bash
brutor-samples mbergljung$ cd my_alf_proj/
my_alf_proj mbergljung$ ./build-repo-extension.sh 
[INFO] Scanning for projects...
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
[INFO] Compiling 4 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:testResources (default-testResources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:testCompile (default-testCompile) @ repo-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.19.1:test (default-test) @ repo-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ repo-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ repo-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.731 s
[INFO] Finished at: 2018-09-25T07:53:23+01:00
[INFO] Final Memory: 42M/336M
[INFO] ------------------------------------------------------------------------
``` 
This builds the JAR file and installs it in the local Maven Repository.

## Building the Docker Image with Extension applied
To be able to test the Repo extension we need somewhere to run it.
To do this we will create a custom Repo Docker Image containing the extension JAR.

Execute the following command:

```bash
my_alf_proj mbergljung$ ./build-repo-docker-image.sh 
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Repository Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
...
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.417 s
[INFO] Finished at: 2018-09-25T07:57:58+01:00
[INFO] Final Memory: 42M/325M
[INFO] ------------------------------------------------------------------------
docker-compose_content_1
docker-compose_content_1
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Repository Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ repo-docker-image ---
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-repo-extensions) @ repo-docker-image ---
[INFO] Configured Artifact: org.alfresco:repo-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-docker/target/jars/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ repo-docker-image ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-docker-image/1.0.0-SNAPSHOT/repo-docker-image-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ repo-docker-image ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-docker/target/docker/alfresco-content-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Created docker-build.tar in 45 milliseconds
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Built image sha256:29100
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Removed old image sha256:63717
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.074 s
[INFO] Finished at: 2018-09-25T07:58:34+01:00
[INFO] Final Memory: 22M/325M
[INFO] ------------------------------------------------------------------------
```

This will actually build the extension again. So you could skip the separate building of the extension and
just use this script. It then builds the custom Repo Docker image with the *repo-docker/Dockerfile*, 
which will take the Alfresco Repository image version that was specified during the project generation 
and then add the Repository Extension JAR to it.

The custom Docker image that is built is tagged with the version that was specified during project generation.
In this case **1.0.0-SNAPSHOT**. So when you build the image repeatedly, as you code your extension, there will
not be multiple images created.

We can list Docker images and we should see the newly built image as follows:

```bash
$ docker image ls
REPOSITORY                                                       TAG                 IMAGE ID            CREATED             SIZE
alfresco-content-services-custom                                 1.0.0-SNAPSHOT      2910039ecc35        28 minutes ago      1.89GB
```

## Running the Docker Image with Extension applied
To run and test the customization use the `run.sh` command:

```bash
my_alf_proj mbergljung$ ./run.sh 
Creating network "docker-compose_default" with the default driver
Creating docker-compose_smtp_1     ... done
Creating docker-compose_solr6_1    ... done
Creating docker-compose_postgres_1 ... done
Creating docker-compose_content_1  ... done
Creating docker-compose_share_1    ... done
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

## Changing the Extension and Rebuilding and Deploying the Docker Image
The Alfresco system is now up and running and you would most likely want to keep working on 
the Repository Extension and from time to time update the running system with the changes. 

So how can we make changes to the extension and then build and deploy those?

This can be done quite easily by executing the `update-repo-container.sh` script from a different terminal 
than was used to run the system:

```bash
my_alf_proj mbergljung$ ./update-repo-container.sh 
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Repository Extension 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:3.0.0:clean (default-clean) @ repo-extension ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/target
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:resources (default-resources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] Copying 12 resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:compile (default-compile) @ repo-extension ---
[INFO] Changes detected - recompiling the module!
[INFO] Compiling 4 source files to /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/target/classes
[INFO] 
[INFO] --- maven-resources-plugin:3.0.1:testResources (default-testResources) @ repo-extension ---
[INFO] Using 'UTF-8' encoding to copy filtered resources.
[INFO] skip non existing resourceDirectory /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/src/test/resources
[INFO] 
[INFO] --- maven-compiler-plugin:3.6.0:testCompile (default-testCompile) @ repo-extension ---
[INFO] No sources to compile
[INFO] 
[INFO] --- maven-surefire-plugin:2.19.1:test (default-test) @ repo-extension ---
[INFO] No tests to run.
[INFO] 
[INFO] --- maven-jar-plugin:3.0.2:jar (default-jar) @ repo-extension ---
[INFO] Building jar: /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.5.2:install (default-install) @ repo-extension ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/target/repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-extension/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-extension/1.0.0-SNAPSHOT/repo-extension-1.0.0-SNAPSHOT.pom
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 4.304 s
[INFO] Finished at: 2018-09-25T09:27:40+01:00
[INFO] Final Memory: 42M/321M
[INFO] ------------------------------------------------------------------------
docker-compose_content_1
docker-compose_content_1
[INFO] Scanning for projects...
[INFO] 
[INFO] ------------------------------------------------------------------------
[INFO] Building Alfresco Repository Docker Image Build 1.0.0-SNAPSHOT
[INFO] ------------------------------------------------------------------------
[INFO] 
[INFO] --- maven-clean-plugin:2.5:clean (default-clean) @ repo-docker-image ---
[INFO] Deleting /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-docker/target
[INFO] 
[INFO] --- maven-dependency-plugin:3.0.2:copy (copy-repo-extensions) @ repo-docker-image ---
[INFO] Configured Artifact: org.alfresco:repo-extension:1.0.0-SNAPSHOT:jar
[INFO] Copying repo-extension-1.0.0-SNAPSHOT.jar to /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-docker/target/jars/repo-extension-1.0.0-SNAPSHOT.jar
[INFO] 
[INFO] --- maven-install-plugin:2.4:install (default-install) @ repo-docker-image ---
[INFO] Installing /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-docker/pom.xml to /Users/mbergljung/.m2/repository/org/alfresco/repo-docker-image/1.0.0-SNAPSHOT/repo-docker-image-1.0.0-SNAPSHOT.pom
[INFO] 
[INFO] --- docker-maven-plugin:0.26.1:build (docker) @ repo-docker-image ---
[INFO] Building tar: /Users/mbergljung/IDEAProjects/brutor-samples/my_alf_proj/repo-docker/target/docker/alfresco-content-services-custom/1.0.0-SNAPSHOT/tmp/docker-build.tar
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Created docker-build.tar in 45 milliseconds
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Built image sha256:90dcf
[INFO] DOCKER> [alfresco-content-services-custom:1.0.0-SNAPSHOT] "acs-custom": Removed old image sha256:29100
[INFO] ------------------------------------------------------------------------
[INFO] BUILD SUCCESS
[INFO] ------------------------------------------------------------------------
[INFO] Total time: 3.573 s
[INFO] Finished at: 2018-09-25T09:27:50+01:00
[INFO] Final Memory: 22M/325M
[INFO] ------------------------------------------------------------------------
Creating docker-compose_content_1 ... done 
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
my_alf_proj mbergljung$ ./stop.sh 
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

You can also **Ctrl-C** out of the running Docker Compose console. That will stop the container but not remove them.

