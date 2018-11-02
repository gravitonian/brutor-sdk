# Generating and Running an Activiti Extension Project with Support for ACS calls
In this tutorial we generate an Activiti/APS extension project with support for 
ACS ReST API calls. These calls are done with the help of an ACS ReST API Java client.

## Cloning and Packaging the ACS ReST API Java Client
Before you can build an Activiti extension with support for ACS remote calls you need to 
clone, compile, and package the ACS ReST API Java client:

```bash
$ git clone https://github.com/gravitonian/acs-rest-api-java-client
``` 

```bash
$ cd acs-rest-api-java-client/
acs-rest-api-java-client mbergljung$ mvn clean install
``` 

Make sure you got the project available in your local Maven Repository:

```bash
$ ls -l ~/.m2/repository/org/alfresco/acs-rest-api-java-client/1.0.0-SNAPSHOT/
total 5504
-rw-r--r--  1 mbergljung  staff      385 20 Sep 10:30 _remote.repositories
-rw-r--r--  1 mbergljung  staff  1538414 20 Sep 10:30 acs-rest-api-java-client-1.0.0-SNAPSHOT-javadoc.jar
-rw-r--r--  1 mbergljung  staff   322135 20 Sep 10:30 acs-rest-api-java-client-1.0.0-SNAPSHOT-sources.jar
-rw-r--r--  1 mbergljung  staff    27851 20 Sep 10:30 acs-rest-api-java-client-1.0.0-SNAPSHOT-tests.jar
-rw-r--r--  1 mbergljung  staff   897809 20 Sep 10:30 acs-rest-api-java-client-1.0.0-SNAPSHOT.jar
-rw-r--r--  1 mbergljung  staff     9463 20 Sep 09:14 acs-rest-api-java-client-1.0.0-SNAPSHOT.pom
-rw-r--r--  1 mbergljung  staff     1335 20 Sep 10:30 maven-metadata-local.xml
-rw-r--r--  1 mbergljung  staff      490 29 Sep 09:02 resolver-status.properties
``` 

## Generating the Activiti Extension Project
Walk through the following tutorial to generate an Activiti extension project
and while doing it make sure to answer `Yes` to the question **Generate Service Task sample with ACS Rest Call in the Activiti Extension project**:

[Gerate an Activiti Extension Project](generating-activiti-extension-project.md):

```bash
? Parent Project name? My Activiti Project with ACS Call Support
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-activiti-project-acs-call-support
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
? Generate Service Task sample with ACS Rest Call in the Activiti Extension project? Yes
? Generate a developer runtime environment based on Docker Compose? Yes
```

This will generate the standard Activiti extension project but with an extra sample Service Task that 
demonstrates how to use the ACS Java Client:

```bash
my-activiti-project-acs-call-support/activiti-extension/src/main/java/com/activiti/extension/bean/CallAcsSpringJavaDelegate.java
``` 

It will also include an extra ACS Java Client dependency in the POM: 

```bash
my-activiti-project-acs-call-support/activiti-extension/pom.xml
``` 

The `activiti-aggregator-docker` project POM will also have a number of extra dependencies, such as a HTTP client library, 
that supports the ACS ReST API Java Client library. 

## Configuring location of ACS in APS Identity management 
Before you can actually run the Service Task implementation `CallAcsSpringJavaDelegate` you need to configure 
where ACS is running. This can be done by setting up an Alfresco Repository tenant in APS. Click on the 
**Identity management** tile on the initial Dashboard in APS. Then click on the **Tenants** menu item.
Now click on **Alfresco Repositories**. To add a new Repository click on the **+** button. 

This will prompt you till fill in the following:

- **Name**: Use `ACS 6`
- **Repository base url**: Use `http://content:8080/alfresco` - this is an internal Docker network address that only works inside the Docker network.
- **Share base url**: Use `http://share:8080/alfresco` - (NOT USED) this is an internal Docker network address that only works inside the Docker network.
- **Alfresco version**: Select `4.2 (or higher)`

Click **Save** to store this Alfresco Repository tenant.
Make a not of the `ID` for the Repo tenant. Usually this is `1` for the first one.

To verify that the Repo configuration is correct, click on **Personal** in the menu. Then scroll down to the bottom
of the screen where you should see the **ACS 6** repository. Click on it and then specify `admin/admin` as 
ACS credentials. Then click **Save**. If you don't get an error, then you have configured the Repo tenant in APS correctly.

The ACS `admin/admin` credentials are also hardcoded in the `CallAcsSpringJavaDelegate` class. This class uses the
`AlfrescoEndpointService` bean to find the configured Repo endpoint (i.e. `http://content:8080/alfresco`). It does this
by using a Service Task field called `alfrescoRepoId`, which needs to be injected with the Repo tenant ID (i.e. `1`).

## Importing the Sample Process App and Definition into APS
You don't have to create a new process from scratch to test this out. A sample Process App and Process Definition has 
been generated with a Service Task definition that uses `CallAcsSpringJavaDelegate` as an implementation. This Service
Task also sets the `alfrescoRepoId` field to `1`.

It is available as a ZIP here:

```bash
my-activiti-project-acs-call-support/activiti-process-samples/Sample App.zip
```

You can import this ZIP directly via APS App Designer (Note. the APS server needs to have an Enterprise license applied)
and the **Apps | Import App** menu item.

Now, very *important*! Make sure you publish the Sample App by clicking the **Publish** button, otherwise it will not yet 
be available to use.

## Starting the Process to Test the Service Task implementation 

Click on the **Sample App** tile and then on **+ START**. There are two process definitions in the Sample App, 
select the one called **Sample Process with Service Task**. 

The logs should print something like this:

```bash
process_1        | 02:23:26 [http-nio-8080-exec-6] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Alfresco Repo ID, should match what's configured in Tenant section: [ID=1]
process_1        | 02:23:26 [http-nio-8080-exec-6] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Alfresco Repo endpoint: [endpointRepoUrl=http://content:8080/alfresco][secret=null]
process_1        | 02:23:26 [http-nio-8080-exec-6] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - ACS ReST API base URL: http://content:8080/alfresco/api/-default-/public/alfresco/versions/1
process_1        | 02:23:28 [http-nio-8080-exec-6] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Created new Request folder: class NodeEntry {
process_1        |     entry: class Node {
process_1        |         id: b9aa975e-f08c-4bd1-9adb-8aa4f75cccf0
process_1        |         name: My Folder
process_1        |         nodeType: cm:folder
process_1        |         isFolder: true
process_1        |         isFile: false
process_1        |         isLocked: false
process_1        |         modifiedAt: 2018-10-01T14:23:27.909Z
process_1        |         modifiedByUser: class UserInfo {
process_1        |             displayName: Administrator
process_1        |             id: admin
process_1        |         }
process_1        |         createdAt: 2018-10-01T14:23:27.909Z
process_1        |         createdByUser: class UserInfo {
process_1        |             displayName: Administrator
process_1        |             id: admin
process_1        |         }
process_1        |         parentId: 8f2105b4-daaf-4874-9e8a-2152569d109b
process_1        |         isLink: null
process_1        |         content: null
process_1        |         aspectNames: [cm:titled, cm:auditable]
process_1        |         properties: {cm:title=My new folder, cm:description=A folder created via ReST API call from APS}
process_1        |         allowableOperations: null
process_1        |         path: null
process_1        |         permissions: null
process_1        |     }
process_1        | }
process_1        | 02:23:28 [http-nio-8080-exec-6] INFO  com.activiti.extension.bean.CallAcsSpringJavaDelegate  - Created new folder in Repository [nodeId=b9aa975e-f08c-4bd1-9adb-8aa4f75cccf0]
```

The folder that's created is called `My Folder` and it is located here: `Sites/swsdp/documentLibrary`.
