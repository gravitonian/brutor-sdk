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
