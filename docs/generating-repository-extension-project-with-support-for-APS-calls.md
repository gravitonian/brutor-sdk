# Generating and Running a Repository Extension Project with Support for APS calls
In this tutorial we generate an Alfresco Repository extension project with support for 
APS ReST API calls. These calls are done with the help of an APS ReST API Java client.

## Cloning and Packaging the APS ReST API Java Client
Before you can build a Repository extension with support for APS remote calls you need to 
clone, compile, and package the APS ReST API Java client:

```bash
$ git clone https://github.com/gravitonian/aps-rest-api-java-client
``` 

```bash
$ cd aps-rest-api-java-client/
aps-rest-api-java-client mbergljung$ mvn clean package
``` 

Make sure you got the project available in your local Maven Repository:

```bash
$ ls -l ~/.m2/repository/org/activiti/aps-rest-api-java-client/1.0.0-SNAPSHOT/
total 7184
-rw-r--r--  1 mbergljung  staff      385 27 Sep 11:13 _remote.repositories
-rw-r--r--  1 mbergljung  staff  1726618 27 Sep 11:13 aps-rest-api-java-client-1.0.0-SNAPSHOT-javadoc.jar
-rw-r--r--  1 mbergljung  staff   390438 27 Sep 11:13 aps-rest-api-java-client-1.0.0-SNAPSHOT-sources.jar
-rw-r--r--  1 mbergljung  staff    48381 27 Sep 11:13 aps-rest-api-java-client-1.0.0-SNAPSHOT-tests.jar
-rw-r--r--  1 mbergljung  staff  1472825 27 Sep 11:13 aps-rest-api-java-client-1.0.0-SNAPSHOT.jar
-rw-r--r--  1 mbergljung  staff      829 27 Sep 10:56 aps-rest-api-java-client-1.0.0-SNAPSHOT.jar.lastUpdated
-rw-r--r--  1 mbergljung  staff     9463 26 Sep 11:35 aps-rest-api-java-client-1.0.0-SNAPSHOT.pom
-rw-r--r--  1 mbergljung  staff      829 27 Sep 10:56 aps-rest-api-java-client-1.0.0-SNAPSHOT.pom.lastUpdated
-rw-r--r--  1 mbergljung  staff     1335 27 Sep 11:13 maven-metadata-local.xml
-rw-r--r--  1 mbergljung  staff      613 29 Sep 08:47 resolver-status.properties
``` 

## Generating the Repository Extension Project
Walk through the following tutorial to generate a Repository extension project
and while doing it make sure to answer `Yes` to the question **Generate Web Script sample with APS Rest Call in the Repo Extension project**:

[Gerate a Repository Extension Project](generating-repository-extension-project.md):

```bash
? Parent Project name? My Repository Project with APS call Support
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-repository-project-aps-call-support
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
? Include project for Alfresco Share Extension? No
? Include project for Alfresco Share Aggregator and Share Docker Build? No
? Include project for Activiti Extension? No
? Include project for Activiti Aggregator and Activiti Docker Build? No
? Generate sample source code for all extensions? Yes
? Generate Web Script sample with APS Rest Call in the Repo Extension project? Yes
? Generate a developer runtime environment based on Docker Compose? Yes
? Enable Inbound Email Server? No
? Enable Outbound Email Server? Yes
```

This will generate the standard Repository extension project but with an extra sample Web Script that 
demonstrates how to use the APS Java Client:

```bash
my-repository-project-aps-call-support/repo-extension/src/main/java/org/alfresco/reposamples/CallApsWebScript.java
``` 

It will also include an extra APS Java Client dependency in the POM: 

```bash
my-repository-project-aps-call-support/repo-extension/pom.xml
``` 

The `repo-aggregator-docker` project POM will also have a number of extra dependencies, such as a HTTP client library, 
that supports the APS ReST API Java Client library. 

## Configuring location of APS and Process Definition
Before you can actually run the Web Script implementation `CallApsWebScript` you need to configure 
where APS is running and what Process Definition to use. When the system is run
via the Docker Compose based runner there is actually not much you have to 
change in the default configuration. But as soon as you are going
to test this in, for example, a Kubernetes environment, you will have to set some of these properties.

These properties are specified in the **alfresco-global.properties** file located here:

```bash
my-repository-project-aps-call-support/repo-extension/src/main/resources/alfresco/module/repo-extension/alfresco-global.properties
```

The file has the following properties related to this:

```properties
aps.host=process
aps.port=8080
aps.username=admin@app.activiti.com
aps.pwd=admin
aps.processdef.key=SampleProcesswithUserTask
aps.tenant.alfresco.repository.source=alfresco-1-ACS 6
```
 
The properties have the following meaning:

| Name | Default Value | Description |
| ---- | ------------- | ----------- | 
| aps.host | process | This is the hostname for where the APS server is running. By default this will be the service name from the Docker Compose file located here: runner/docker-compose/docker-compose.yml |
| aps.port | 8080 | This is the port for accessing the APS server. By default this will be the internal Docker network port from the Docker Compose file located here: runner/docker-compose/docker-compose.yml |
| aps.username | admin@app.activiti.com | Standard APS Admin username |
| aps.pwd | admin| Standard APS Admin password |
| aps.processdef.key | SampleProcesswithUserTask | The process definition key for the process definition that you want to start. You don't have to change this if you use the supplied Sample Process App and Definition. If you design a new process then make sure to set this property. |
| aps.tenant.alfresco.repository.source | alfresco-1-ACS 6 | This matches the Alfresco Repository tenant that has been set up in APS. It is used when you upload content from ACS to APS. The format is `alfresco-<Repo Tenant ID>-<Repo Tenant Name>`|

## Importing the Sample Process App and Definition into APS
The `CallApsWebScript` sample code assumes that a process with Process Definition Key **SampleProcesswithUserTask** exist.

A sample Process App and Process Definition has been generated for you that matches what you need. It is available 
as a ZIP here:

```bash
my-repository-project-aps-call-support/activiti-process-samples/Sample App.zip
```

You can import this ZIP directly via APS App Designer (Note. the APS server needs to have an Enterprise license applied)
and the **Apps | Import App** menu item.

Now, very *important*! Make sure you publish the Sample App by clicking the **Publish** button, otherwise it will not yet 
be available to use.

## Calling the Web Script to Start the Process
Now when we got everything configured and running we can try out the `CallApsWebScript` Web Script
via the `http://localhost:8082/alfresco/s/sample/callaps` URL. The response should look something
like this:

```json 
class ProcessInstanceRepresentation { businessKey: null ended: null graphicalNotationDefined: true id: 8 name: My Process Instance processDefinitionCategory: http://www.activiti.org/processdef processDefinitionDeploymentId: 1 processDefinitionDescription: This process is used by ACS to demonstrate starting a process via APS ReST API processDefinitionId: SampleProcesswithUserTask:1:7 processDefinitionKey: SampleProcesswithUserTask processDefinitionName: Sample Process with User Task processDefinitionVersion: 1 startFormDefined: false started: 2018-10-01T07:47:50.692Z startedBy: class LightUserRepresentation { company: null email: admin@app.activiti.com externalId: null firstName: null id: 1 lastName: Administrator pictureId: null } suspended: false tenantId: tenant_1 variables: [class RestVariable { name: acscontent scope: null type: null value: null }, class RestVariable { name: atextvar scope: null type: string value: Some text }, class RestVariable { name: initiator scope: null type: string value: 1 }] }' 
```

Logged into APS you should be able to click on the **Sample App** tile and then on **Processes**. You should then see
the new process instance.
