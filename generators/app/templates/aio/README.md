# Alfresco Extension Project
This is an Alfresco extension project that can be used to build customizations for 
<% if (includeActivitiExtension == true) { %>
- **Activiti** (APS version 1.8.x and version 1.9.x) 
<% } %>
<% if (includeRepoExtension == true) { %>
- **Repository** (ACS version 6.x)  
<% } %>
<% if (includeShareExtension == true) { %>
- **Share** (ACS version 6.x)  
<% } %> 

## Building this project
Build all extensions and Docker images as follows:

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

<% if (includeActivitiExtension == true) { %>
- **APS**: http://localhost:9080/activiti-app
<% } %>
<% if (includeRepoExtension == true) { %>
- **ACS Repo**: http://localhost:8082/alfresco
<% } %>
<% if (includeShareExtension == true) { %>
- **ACS Share**: http://localhost:8080/share/
<% } %> 

## Updating an Extension
After you have built some extensions and run the project to test them, you are likely to want to 
do more coding and updating of your extensions in the running containers. 
 
To update an extension, generate a new Docker Image, and deploy the new Image do as follows:

<% if (includeActivitiExtension == true) { %>
For Activiti extensions: 
```bash
$ ./update-activiti-container.sh
```
<% } %>
<% if (includeRepoExtension == true) { %>
For Repository extensions: 
```bash
$ ./update-repo-container.sh
```
<% } %>
<% if (includeShareExtension == true) { %>
For Share extensions: 
```bash
$ ./update-share-container.sh
```
<% } %> 




   
  
 
