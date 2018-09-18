# Alfresco Extension Project

This is an extension project that can be used to build customizations for 
the Alfresco DBP components (i.e. ACS 6.x and APS 1.9.x). 

## Running this project

Build all extensions and custom Docker Images:

```bash
$ ./build-activiti-docker-image.sh 
...
$ ./build-repo-docker-image.sh 
...
$ ./build-share-docker-image.sh
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

## Accessing webapps

Access apps as follows:

ACS Repo: http://localhost:8082/alfresco
ACS Share: http://localhost:8080/share/
APS: http://localhost:9080/activiti-app

## Updating an Extension
Updating an extension and generating and deploying a new Docker Image:
Start by stopping the Docker Container that we want to update:

```bash
runner/docker-compose mbergljung$ docker-compose stop process
Stopping docker-compose_process_1 ... done
```

Now build extension and image:

```bash
$ ./build-repo-docker-image.sh 
...
```

Then restart the docker container in question:

```bash
runner/docker-compose mbergljung$ docker-compose up -d --no-deps process
Recreating docker-compose_process_1 ... done
...
```




   
  
 
