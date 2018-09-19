# Alfresco Extension Project
This is an extension project that can be used to build customizations for 
the Alfresco DBP components (i.e. ACS 6.x and APS 1.9.x). 

## Running this project
Build all extensions and custom Docker Images:

```bash
$ ./build-all-docker-images.sh 
...
```

Then run the whole thing:
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

- **ACS Repo**: http://localhost:8082/alfresco
- **ACS Share**: http://localhost:8080/share/
- **APS**: http://localhost:9080/activiti-app

## Updating an Extension
After you have built some extensions and run the project to test them, you are likely to want to 
do more coding and updating of your extensions in the running containers. 
 
To update an extension, generate a new Docker Image, and deploy the new Image do as in 
the following example for repo extensions:

```bash
$ ./update-repo-container.sh
```





   
  
 
