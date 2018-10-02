# Debugging Activiti (APS) Extensions
Being able to debug your Activiti Java customizations is an essential feature of the 
developer environment.  

## Tomcat Remote Debug Configuration
*The configuration that makes this happen is already set up on the Tomcat side.*

The Docker Compose file (my-activiti-project/runner/docker-compose/docker-compose.yml) 
in an Activiti Extension project has the following configuration:

```yaml
services:
  process:
    image: alfresco-process-services-custom:1.0.0-SNAPSHOT
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
  process:
...
      ports:        
        - 5006:5005 # Remote Debug
```

## IntelliJ IDEA Debug Configuration
Use the following steps to configure Remote debugging in IntelliJ IDEA:

- In IDEA click on the **Run** menu item
- Then click on **Edit Configurations...** option
- Now click on the **+** sign in the upper left corner
- Select **Remote** in the list of configurations
- Give the Remote configuration a name
- Change the port number from 5005 to 5006 under **Settings | Port**
- Click **OK** button to save the configuration

## IntelliJ IDEA Debugging
Use the following steps to debug some Java code in an Activiti extension. 
We will debug a sample Java Delegate that comes with the Activiti extension project:

- Make sure the system is running (i.e. my-activiti-project/run.sh)
- Navigate to the Java code you want to debug, such as the my-activiti-project/activiti-extension/src/main/java/com/activiti/extension/bean/SimpleJavaDelegate.java class
- Set a breakpoint somewhere, such as in the `execute` method of the Java Delegate 
- Start a debug session in IDEA by clicking the **Run** menu item followed by the **Debug '{name of remote debug config}'"** menu item
- Now, create a Process Definition that has one Service Task that uses the Java Delegate as implementation
- Then create a Process App that includes the Process definition, and publish the app
- Start a new process based on the process definition
- You should see the system stopping on the breakpoint when you get to the Service Task

  
