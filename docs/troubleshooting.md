## There are problems building - unused or dangling Docker images
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

## There are problems running 
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

## The Repository webapp is not loading properly
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
