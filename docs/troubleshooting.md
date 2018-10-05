## Running Problem - Cannot start service share b driver failed
If you see an error like follows when you do run.sh:

```bash
ERROR: for docker-compose_share_1  Cannot start service share: b'driver failed programming external connectivity on endpoint docker-compose_share_1 (98f36a05bf1d4b282efb112fb9c9c0173f5beab35ebfb54446ffeea8dedf47a5): failed to update bridge endpoint 98f36a0 to store: failed to update bridge store for object type *bridge.bridgeEndpoint: input/output error'
ERROR: for share  Cannot start service share: b'driver failed programming external connectivity on endpoint docker-compose_share_1 (98f36a05bf1d4b282efb112fb9c9c0173f5beab35ebfb54446ffeea8dedf47a5): failed to update bridge endpoint 98f36a0 to store: failed to update bridge store for object type *bridge.bridgeEndpoint: input/output error'
```

And then you try and stop and run again, but get these errors:

```bash
ERROR: for docker-compose_smtp_1  b'container e74c4591a1ceb0eafe25a238e5b93a49daf0547efea125d5dbac756d75141f25: driver "overlay2" failed to remove root filesystem: remove /var/lib/docker/overlay2/b3760ac47f83af50732c7aa49574edce5e1422d2e7e9b73e9ac2cdd5b2999b0b/merged: read-only file system'
ERROR: for docker-compose_process_1  b'container e8e18401056586de112665a7dc36eb073a0433f381880d1f4ae52bf32758b657: driver "overlay2" failed to remove root filesystem: remove /var/lib/docker/overlay2/47fa02d135ac5a2fec02e601b0eee6ddf9855c6c5f9c19be21ce410cd24f1d07/merged: read-only file system'
ERROR: for docker-compose_share_1  b'container 4461bce49adf9c74c5443809b871bb74a26d6e4414e242e9b49b50b0b96ce2bc: driver "overlay2" failed to remove root filesystem: remove /var/lib/docker/overlay2/02e52f3500db3bcea6ed7f9ccad84c1553a6fc5da893069947ca967127999070/merged: read-only file system'
ERROR: for docker-compose_content_1  b'container b994383970c4c1775fe2f2d76932c7a470b1e90f2df05dd948cec9b1464b5a46: driver "overlay2" failed to remove root filesystem: remove /var/lib/docker/overlay2/b4afbe06b4737cbcba5828ba5705bff064b416a47beafa99490b1a0f7c28d941/merged: read-only file system'
ERROR: for docker-compose_elasticsearch_1  b'container e3477bee7b2aedfa0973c25831c672daaede5406d30d80873c3cfd7056a20fe6: driver "overlay2" failed to remove root filesystem: remove /var/lib/docker/overlay2/224b218d72389007ae805c40dab1c63d37a71afbfcf1c06bc2f08ed8bb3a5c8a/merged: read-only file system'
ERROR: for docker-compose_solr6_1  b'container ae31d741dfd0e69297e8846bfc3bfcb7f12e3198fa2e9741c77ea2724cca7caa: driver "overlay2" failed to remove root filesystem: remove /var/lib/docker/overlay2/04832f633740dff078c294887c2d6e48b6dde8a19602b07e7bc6597ac8b3f77d/merged: read-only file system'
ERROR: for docker-compose_postgres_1  b'container 4b75d817a6d43972366baee27d3ed05d0f8f74ae00e5de713f0fbb6829fc5952: driver "overlay2" failed to remove root filesystem: remove /var/lib/docker/overlay2/4f62f849dff8b9d36fc6b9230497e102bd80d974ce73e5a91084e4886b8dd31d/merged: read-only file system'
```

The you need to **restart Docker** on your machine. Then see if the containers are gone by doing:

```bash
$ docker container ls -a
```

If they are gone try and start the system again. If they are not gone try and do stop and rm as follows:

```bash
$ docker container stop docker-compose_content_1 docker-compose_process_1 docker-compose_solr6_1 docker-compose_smtp_1 docker-compose_elasticsearch_1
$ docker container rm docker-compose_content_1 docker-compose_process_1 docker-compose_solr6_1 docker-compose_smtp_1 docker-compose_elasticsearch_1
```

## Running Problem - The Repository Container does not start, cannot connect to PostgreSQL
This can happen sometimes after the first build and run.

Stop the system with **Ctrl-C**.

Then make sure all containers are stopped and removed with **./stop.sh**.

Then start it back up again with **./run.sh.sh**

Still does not work, you might have to remove all the data:

```bash
$ cd my-project/runner/docker-compose/data
$ rm -rf *
```

Try and run again.

## Building Problem - unused or dangling Docker images
It does not work properly to build or run the system.

An unused image means that it has not been assigned or used in a container. 
For example, when running `docker container ps -a` - it will list all of your exited and currently running containers. 
Any images shown being used inside any of the containers are a "used image".

On the other hand, a dangling image just means that you've created the new build of the image, 
but it wasn't given a new name. So the old images you have becomes the "dangling image". 
Those old image are the ones that are untagged and displays `<none>` on its name when you run `docker images ls`.

To remove both unused and dangling images execute the following command:
 
```bash
$ docker system prune -a
WARNING! This will remove:
        - all stopped containers
        - all networks not used by at least one container
        - all images without at least one container associated to them
        - all build cache
Are you sure you want to continue? [y/N] y
...
```

Any images being used in a container, whether they have been exited or currently running, will NOT be affected.

However, note that when you use the `-a` option any unused image will be removed. So you might end up removing 
a lot of images if all your containers are stopped and removed.

## Running Problem - Docker Image missing 
If you see an error as follows when running the system:

```bash
Pulling process (alfresco-process-services-custom:1.0.0-SNAPSHOT)...
ERROR: pull access denied for alfresco-process-services-custom, repository does not exist or may require 'docker login'
```

Then that most likely means that the custom Docker image (alfresco-process-services-custom:1.0.0-SNAPSHOT) does not exist.

Check with the following command:

```bash
$ docker image ls
REPOSITORY                                                       TAG                 IMAGE ID            CREATED             SIZE
alfresco-share-custom                                            1.0.0-SNAPSHOT      7a83ac9078f2        3 hours ago         709MB
alfresco-content-services-custom                                 1.0.0-SNAPSHOT      90dcf14e95a5        5 hours ago         1.89GB
```
If you do not see the image in the list, then build it.

## Running Problem - Repository webapp is not loading properly
Sometimes when you start the whole system with './run.sh' it does not 
load the Repository (alfresco.war) container properly. 

Try and stop everything:

```bash
my_alf_proj mbergljung$ ./stop.sh 
```

Then start it again:

```bash
my_alf_proj mbergljung$ ./run.sh 
```

If that does not work, then you can try and stop everything, 
remove all the data under 'runner/docker-compose/data', then run again.
**Note**. this will remove any content and processes that you might have created.  
