## It does not work to run the system
If you see an error as follows:

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
