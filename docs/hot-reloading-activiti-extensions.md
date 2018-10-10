# Hot reloading of Activiti Extension code
Hot reloading is the ability to modify your application's code, and view the changes without 
having to restart Activiti Tomcat (i.e. without restarting the Activiti/APS Container). 
This allows for significant savings in development time that would otherwise be wasted 
restarting Tomcat. 

Hot reloading is the key to enabling Rapid Application Development (RAD) and 
Test Driven Development (TDD).

For hot reloading of Java classes the Dynamic Code Evolution VM (DCEVM) can be used.
If you use the standard Java Runtime Environment (JRE) you can also do hot reloading of Java class changes.
However, the changes you can do are very limited. Basically just changing the code in a method.
If you wanted to add a new method, then that would not be supported. So to get better Java class 
hot reloading we use the [DCEVM](https://github.com/dcevm/dcevm), which is a patch of the JRE.

## Generating the Activiti Extension Project
Walk through the following tutorial to generate an Activiti extension project
and while doing it make sure to answer `Yes` to the question **Enable DCEVM for Activiti Extension**:

[Generate an Activiti Extension Project](generating-activiti-extension-project.md):

```bash
? Parent Project name? My Activiti Project with Hot reloading
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-activiti-project-hotreload
? Maven projects version? 1.0.0-SNAPSHOT
? Package for Java classes? org.alfresco
? Would you like to use Community or Enterprise Edition for Repository and Share? Community
? Include project for Alfresco Repository Extension? No
? Include project for Alfresco Repository Aggregator and Repository Docker Build? No
? Include project for Alfresco Share Extension? No
? Include project for Alfresco Share Aggregator and Share Docker Build? No
? Include project for Activiti Extension? Yes
? Activiti extension maven artifactId? activiti-extension
? Activiti Extension Name? Activiti Extension
? Activiti Extension Description? Activiti extension JAR (to be included in the activiti_app.war)
? Package for Activiti Java classes (don't change unless you know what you are doing)? com.activiti.extension.bean
? Include project for Activiti Aggregator and Activiti Docker Build? Yes
? Activiti/APS version? 1.9.0.3
? Activiti/APS Docker Image version? 1.9.0.1
? Enable DCEVM for Activiti Extension? Yes
? Generate sample source code for all extensions? Yes
? Generate Service Task sample with ACS Rest Call in the Activiti Extension project? No
? Generate a developer runtime environment based on Docker Compose? Yes
```

This will generate the standard Activiti extension project but with some extra configuration to enable 
hot reloading.

**Important! Make sure you build and run the project before continuing.**

## Dynamic Code Evolution VM (DCEVM) Activation
*This configuration is set up for you when the project is generated.*

When you generate the custom Activiti Image the DCEVM is applied automatically for you. 
See the **activiti-aggregator-docker/Dockerfile** file for more info. 

## Testing the Hot Reloading Configuration
The Activiti Extension project comes with a couple of Service Task Java implementations that we can try out hot reloading on. 

Let’s change some of the code in the **activiti-extension/src/main/java/com/activiti/extension/bean/SimpleJavaDelegate.java** file.
By default, when executed this Service task implementation will print the following in the logs:

```bash
process_1        | Simple Java Delegate executed
process_1        | 09:16:05 [http-nio-8080-exec-8] INFO  com.activiti.extension.bean.SimpleJavaDelegate  - Simple Java Delegate executed
```
From the APS APP Designer (http://localhost:9080/activiti-app) create a Process Definition that uses this 
Java Delegate (i.e. `com.activiti.extension.bean.SimpleJavaDelegate`). 
Execute the process and verify that it prints the default logs as above.

Now, let's update the implementation to look like this:

```java
public class SimpleJavaDelegate implements JavaDelegate {
    private static Logger logger = LoggerFactory.getLogger(SimpleJavaDelegate.class);

    @Override
    public void execute(DelegateExecution execution) throws Exception {
        System.out.println(getSomeText());
        logger.info(getSomeText());
    }
    
    private String getSomeText() {
        return "Some text coming from method!";
    }
}
```

*Important, for class reloading to work you need to have a debug session started.
See this [article](debugging-activiti-extensions.md) for how to do that.*

Then compile the code from your IDE or via Maven:

```bash
activiti-extension mbergljung$ mvn compile
```

Now, executing the process again should print the following in the logs:

```bash
process_1        | Some text coming from method!
process_1        | 09:41:36 [http-nio-8080-exec-4] INFO  com.activiti.extension.bean.SimpleJavaDelegate  - Some text coming from method!
```
