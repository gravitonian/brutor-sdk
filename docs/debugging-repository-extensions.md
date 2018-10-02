# Debugging Repository Extensions
Being able to debug your Repository Java customizations is an essential feature of the 
developer environment.  

## Tomcat Remote Debug Configuration
*The configuration that makes this happen is already set up on the Tomcat side.*

The Docker Compose file (my-repo-project/runner/docker-compose/docker-compose.yml) 
in a Repository Extension project has the following configuration:

```yaml
services:
  content:
      image: alfresco-content-services-custom:1.0.0-SNAPSHOT
      mem_limit: 1500m
      environment:
          CATALINA_OPTS: "
      		-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
      		"
...
```

The `CATALINA_OPTS` environment variable configures Tomcat Remote Debugging to be 
available on port 5005. This port is then exposed externally to the container via the 
following configuration:

```yaml
services:
  content:
...
      ports:        
        - 5005:5005 # Remote Debug
```

## IntelliJ IDEA Debug Configuration
Use the following steps to configure Remote debugging in IntelliJ IDEA:

- In IDEA click on the **Run** menu item
- Then click on **Edit Configurations...** option
- Now click on the **+** sign in the upper left corner
- Select **Remote** in the list of configurations
- Give the Remote configuration a name
- Click **OK** button to save the configuration

## IntelliJ IDEA Debugging
Use the following steps to debug some Java code in a Repository extension. 
We will debug a sample Web Script that comes with the Repository extension project:

- Make sure the system is running (i.e. my-repo-project/run.sh)
- Navigate to the Java code you want to debug, such as the my-repo-project/repo-extension/src/main/java/org/alfresco/reposamples/HelloWorldWebScript.java class
- Set a breakpoint somewhere, such as in the `executeImpl` of a Web Script 
- Start a debug session in IDEA by clicking the **Run** menu item followed by the **Debug '{name of remote debug config}'"** menu item
- Execute something that runs the code with the breakpoint, the sample Hello Web Script can be invoked via http://localhost:8082/alfresco/s/sample/helloworld
- You should see the system stopping on the breakpoint 

  
