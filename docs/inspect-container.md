# Inspecting the contents of a running container

Sometimes you need to look inside a running container to find out, for example, what extensions that has actually been deployed.

You can easily do this with Docker commands.

First find out what containers that are running:

```bash
$ docker container ls
CONTAINER ID        IMAGE                                             COMMAND                  CREATED             STATUS              PORTS                                            NAMES
63ff5d4d1581        alfresco-process-services-custom:1.0.0-SNAPSHOT   "/root/entrypoint.sh"    6 minutes ago       Up 6 minutes        0.0.0.0:9080->8080/tcp                           docker-compose_process_1
2ae01ea8b9f2        alfresco-share-custom:1.0.0-SNAPSHOT              "/usr/local/tomcat/s…"   3 hours ago         Up 3 hours          8000/tcp, 0.0.0.0:8080->8080/tcp                 docker-compose_share_1
a6cf49b23783        alfresco-content-services-custom:1.0.0-SNAPSHOT   "catalina.sh run -se…"   3 hours ago         Up 3 hours          0.0.0.0:5005->5005/tcp, 0.0.0.0:8082->8080/tcp   docker-compose_content_1
a5b9f292df62        alfresco/alfresco-search-services:1.1.1           "/opt/alfresco-searc…"   3 hours ago         Up 3 hours          0.0.0.0:8083->8983/tcp                           docker-compose_solr6_1
938058af7403        elasticsearch:1.7.3                               "/docker-entrypoint.…"   3 hours ago         Up 3 hours          9200/tcp, 9300/tcp                               docker-compose_elasticsearch_1
b9a341ed39e8        postgres:10.1                                     "docker-entrypoint.s…"   3 hours ago         Up 3 hours          0.0.0.0:5432->5432/tcp                           docker-compose_postgres_1
3e0b69dbfcc6        tophfr/mailhog                                    "/entrypoint.sh mail…"   3 hours ago         Up 3 hours          0.0.0.0:2525->25/tcp, 0.0.0.0:1080->80/tcp       docker-compose_smtp_1
```

Let's look inside the Alfresco Repository container, which has the name docker-compose_content_1:

```bash
$ docker container exec -it docker-compose_content_1 /bin/bash
[root@a6cf49b23783 tomcat]# pwd
/usr/local/tomcat
```

To see what extension that are deployed look in WEB-INF/lib for the webapp:

```bash
# cd webapps/alfresco/WEB-INF/lib
[root@a6cf49b23783 lib]# ls -lt|more
total 173572
-rw-r--r-- 1 root root    14968 Sep 20 11:00 repo-extension-1.0.0-SNAPSHOT.jar
-r--r--r-- 1 root root 19814011 Jun 21 21:24 alfresco-repository-6.55.jar
-r--r--r-- 1 root root  2690307 Jun 21 21:24 alfresco-remote-api-6.38.jar
-r--r--r-- 1 root root    13467 Jun 21 15:04 alfresco-messaging-repo-1.2.9.jar
...
```
Here we can see that we got one extension called **repo-extension-1.0.0-SNAPSHOT.jar**, which has been 
deployed via the *repo-extension* project.

Extract the content of the JAR so you can inspect it:

```bash
[root@a6cf49b23783 lib]# mkdir temp
[root@a6cf49b23783 lib]# cp repo-extension-1.0.0-SNAPSHOT.jar temp
[root@a6cf49b23783 lib]# cd temp/
[root@a6cf49b23783 temp]# jar -xvf repo-extension-1.0.0-SNAPSHOT.jar               
 inflated: META-INF/MANIFEST.MF
  created: META-INF/
  created: org/
  created: org/alfresco/
  created: org/alfresco/reposamples/
  created: META-INF/resources/
  created: alfresco/
  created: alfresco/extension/
  created: alfresco/extension/templates/
  created: alfresco/extension/templates/webscripts/
  created: alfresco/extension/templates/webscripts/alfresco/
  created: alfresco/extension/templates/webscripts/alfresco/tutorials/
  created: alfresco/module/
  created: alfresco/module/repo-extension/
  created: alfresco/module/repo-extension/context/
  created: alfresco/module/repo-extension/model/
  created: META-INF/maven/
  created: META-INF/maven/org.alfresco/
  created: META-INF/maven/org.alfresco/repo-extension/
 inflated: org/alfresco/reposamples/DemoRepoAction.class
 inflated: alfresco/module/repo-extension/context/webscript-context.xml
 inflated: alfresco/module/repo-extension/context/bootstrap-context.xml
 inflated: alfresco/module/repo-extension/context/service-context.xml
 inflated: alfresco/module/repo-extension/alfresco-global.properties
 inflated: org/alfresco/reposamples/DemoComponent.class
 inflated: alfresco/module/repo-extension/module-context.xml
 inflated: org/alfresco/reposamples/Demo.class
 inflated: alfresco/module/repo-extension/module.properties
 inflated: alfresco/module/repo-extension/model/content-model.xml
 inflated: org/alfresco/reposamples/HelloWorldWebScript.class
 inflated: alfresco/module/repo-extension/log4j.properties
 inflated: META-INF/maven/org.alfresco/repo-extension/pom.xml
 inflated: META-INF/maven/org.alfresco/repo-extension/pom.properties
 inflated: META-INF/resources/test.html
 inflated: alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.desc.xml
 inflated: alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.js
 inflated: alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.html.ftl
 ```
