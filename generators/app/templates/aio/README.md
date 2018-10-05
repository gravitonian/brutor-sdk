<% if (includeActivitiExtension == true || includeRepoExtension == true || includeShareExtension == true) { %>
# Alfresco Extension Project
This is an Alfresco extension project that can be used to build customizations for
<% } %> 
<% if (includeActivitiExtension == true) { %>
- **Activiti** (APS version 1.8.x and version 1.9.x) 
<% } %>
<% if (includeRepoExtension == true) { %>
- **Repository** (ACS version 6.x)  
<% } %>
<% if (includeShareExtension == true) { %>
- **Share** (ACS version 6.x)  
<% } %> 
<% if (includeActivitiExtension == false && includeRepoExtension == false && includeShareExtension == false) { %>
# Alfresco Aggregator Project
This is an Alfresco aggregator project that can be used to assemble multiple extensions (JARs and/or AMPs) and 
then build a Docker image with the extensions applied.

**Note** You need to add at least one JAR and/or AMP to the aggregator project before it can be built successfully.
<% } %> 
## Building this project
Build all Docker images with the extensions applied as follows:

```bash
$ ./build-all.sh 
...
```

## Running this project
Run the solution with Docker Compose as follows:

```bash
$ ./run.sh 
Creating docker-compose_smtp_1          ... done
Creating docker-compose_elasticsearch_1 ... done
Creating docker-compose_solr6_1         ... done
Creating docker-compose_postgres_1      ... done
Creating docker-compose_process_1       ... done
Creating docker-compose_content_1       ... done
Creating docker-compose_share_1         ... done
...
```

## Accessing the webapps
Access apps as follows:

<% if (includeActivitiContainerInRunner) { %>
- **APS**: http://localhost:9080/activiti-app
<% } %>
<% if (includeRepoAndShareContainersInRunner == true) { %>
- **ACS Repo**: http://localhost:8082/alfresco
<% } %>
<% if (includeRepoAndShareContainersInRunner == true) { %>
- **ACS Share**: http://localhost:8080/share/
<% } %> 

<% if (includeActivitiExtension == true || includeRepoExtension == true || includeShareExtension == true) { %>
## Updating an Extension
After you have built some extensions and run the project to test them, you are likely to want to 
do more coding and updating of your extensions in the running containers. 
 
To update an extension, generate a new Docker Image, and deploy the new Image do as follows:
<% } %> 
<% if (includeActivitiExtension == false && includeRepoExtension == false && includeShareExtension == false) { %>
# Updating a Docker Image
When the system is running and you have updated an aggregator project with a new JAR or AMP dependency, 
then you need to generate a new Docker Image and deploy it as follows:
<% } %> 

<% if (includeActivitiExtension == true || activitiExtensionGenerateDockerBuild == true) { %>
For Activiti extensions: 
```bash
$ ./update-activiti-container.sh
```
<% } %>
<% if (includeRepoExtension == true || repoExtensionGenerateDockerBuild == true) { %>
For Repository extensions: 
```bash
$ ./update-repo-container.sh
```
<% } %>
<% if (includeShareExtension == true || shareExtensionGenerateDockerBuild == true) { %>
For Share extensions: 
```bash
$ ./update-share-container.sh
```
<% } %> 




   
  
 
