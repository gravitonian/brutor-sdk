# Hot reloading of Repository Extension code
Hot reloading is the ability to modify your application's code, and view the changes without 
having to restart Alfresco Tomcat (i.e. without restarting the Repository Container). 
This allows for significant savings in development time that would otherwise be wasted 
restarting Tomcat. 

Hot reloading is the key to enabling Rapid Application Development (RAD) and 
Test Driven Development (TDD).

For hot reloading of classes and web resources products such as [JRebel](https://zeroturnaround.com/software/jrebel/) 
and [HotSwap](http://www.hotswapagent.org/) can be used. JRebel is a commercial product 
while HotSwap is open source. Both products can reload classes and web resources. 
However, JRebel is more powerful than HotSwap and can for example also reload changes to 
the Spring XML context files.

**We cover the usage of HotSwap in this article.** 

## Generating the Repository Extension Project
Walk through the following tutorial to generate a Repository extension project
and while doing it make sure to answer `Yes` to the question **Enable HotSwap Agent and DCEVM for Repository Extension**:

[Generate a Repository Extension Project](generating-repository-extension-project.md):

```bash
? Parent Project name? My Repo Project with Hotswap
? Parent Project description?  Alfresco project for working with multiple extensions in a containerized environment
? Maven projects groupId? org.alfresco
? Maven parent project artifactId? my-repo-proj-hotswap
? Maven projects version? 1.0.0-SNAPSHOT
? Package for Java classes? org.alfresco
? Would you like to use Community or Enterprise Edition for Repository and Share? Community
? Include project for Alfresco Repository Extension? Yes
? Repository Extension maven artifactId? repo-extension
? Repository Extension Name? Repository Extension
? Repository Extension Description? Repository extension module JAR (to be included in the alfresco.war)
? Package Repo extension as JAR or AMP? JAR
? Include project for Alfresco Repository Aggregator and Repository Docker Build? Yes
? Alfresco Repository Community version? 6.0.7-ga
? Alfresco Repository Community Docker Image version? 6.0.7-ga
? Enable HotSwap Agent and DCEVM for Repository Extension? Yes
? Include project for Alfresco Share Extension? No
? Include project for Alfresco Share Aggregator and Share Docker Build? No
? Include project for Activiti Extension? No
? Include project for Activiti Aggregator and Activiti Docker Build? No
? Generate sample source code for all extensions? Yes
? Generate Web Script sample with APS Rest Call in the Repo Extension project? No
? Generate a developer runtime environment based on Docker Compose? Yes
? Enable Inbound Email Server? No
? Enable Outbound Email Server? Yes
```

This will generate the standard Repository extension project but with some extra configuration to enable 
hot reloading.

**Important! Make sure you build and run the project before continuing.**

## HotSwap Agent Activation and Configuration
*This configuration is set up for you when the project is generated.*

The Docker Compose file (my-repo-proj-hotswap/runner/docker-compose/docker-compose.yml) 
in a Repository Extension project has the following configuration:

```yaml
services:
  content:
      image: alfresco-content-services-custom:1.0.0-SNAPSHOT
      mem_limit: 1500m
      environment:
          CATALINA_OPTS: "
      		-agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=5005
      		-javaagent:/usr/local/tomcat/lib/hotswap-agent-1.3.0.jar=propertiesFilePath=/usr/local/tomcat/hotswap-agent/hotswap-agent-repo.properties
      		"
...
```

The `CATALINA_OPTS` environment variable configures Tomcat Remote Debugging to be 
available on port 5005. Java Class reloading can be achieved through the remote debugging configuration.
For other webapp resource files to be reloaded the HotSwap Java Agent is configured.
The configuration of the HotSwap agent is done via the **hotswap-agent-repo.properties** file.
This file is mapped into the container via a volume definition as follows:

```yaml
services:
  content:
...
      volumes:
      ...        
        - ../../repo-extension/src/main/resources:/usr/local/tomcat/hotswap-agent/repo-extension/src/main/resources
        - ../../repo-extension/src/main/resources/hotswap-agent.properties:/usr/local/tomcat/hotswap-agent/hotswap-agent-repo.properties
```

So we can see that we can update the HotSwap configuration by changing the configuration in the 
**repo-extension/src/main/resources/hotswap-agent.properties** file.

It is also important to understand what files that are "watched" by the HotSwap agent, they are in the 
**repo-extension/src/main/resources** directory, which is mapped into the container so HotSwap can detect
changes.

The HotSwap agent knows to look for changes in the **/usr/local/tomcat/hotswap-agent/repo-extension/src/main/resources** 
directory by the following configuration in the **repo-extension/src/main/resources/hotswap-agent.properties** file:

```properties
autoHotswap=true
disabledPlugins=Hibernate,Spring
extraWebappContext=/usr/local/tomcat/hotswap-agent/repo-extension/src/main/resources/META-INF/resources
watchResources=/usr/local/tomcat/hotswap-agent/repo-extension/src/main/resources
LOGGER.org.hotswap.agent=INFO
```
## Dynamic Code Evolution VM (DCEVM) Activation
*This configuration is set up for you when the project is generated.*

If you use the standard Java Runtime Environment (JRE) you can do hot reloading of Java class changes.
However, the changes you can do are very limited. Basically just change the code in a method.
If you wanted to add a new method, then that would not be supported. So to get better Java class 
hot reloading we use the [DCEVM](https://github.com/dcevm/dcevm), which is a patch of the JRE.

When you generate the custom Repository Image the DCEVM is applied automatically for you. 
See the **repo-aggregator-docker/Dockerfile** file for more info. 

## Testing the Hot Reloading Configuration
The Repository Extension project comes with a Repository Web Script that we can try out hot reloading on. 
The Web Script can be accessed with the `http://localhost:8082/alfresco/s/sample/helloworld` URL, and the 
response looks like this:

```
Message: 'Hello from JS!' 'HelloFromJava'
```

It uses both a Java controller and a JavaScript controller.
 
### Basic Hot Reloading of Web Script code
To test hot reloading we will make changes to the Java controller, JavaScript controller, and the FreeMarker template.

Start by changing the JavaScript controller available in the 
**repo-extension/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.js** file:

```javascript
model["fromJS"] = "Goodbye from JS!";
```

Then, in a different console window standing in the Repository Extension directory, run the `refresh-repo` goal for 
the Alfresco Maven Plugin, which will refresh the Repository Web Script code:

```bash
repo-extension mbergljung$ mvn alfresco:refresh-repo
```

Now, in the browser refresh the Web Script page and you should see:

```
Message: 'Goodbye from JS!' 'HelloFromJava'
```

Next update the Web Script Template in the 
**repo-extension/src/main/resources/alfresco/extension/templates/webscripts/alfresco/tutorials/helloworld.get.html.ftl** file:

```html
Message: '${fromJS}' UPDATED '${fromJava}'
```

Then, in the browser refresh the Web Script page (no compile or refresh of Web Script is necessary), 
you should see the following:

```
Message: 'Goodbye from JS!' UPDATED 'HelloFromJava'
```

Let’s continue and change the Java controller in the 
**repo-extension/src/main/java/org/alfresco/reposamples/HelloWorldWebScript.java** file:

```java
public class HelloWorldWebScript extends DeclarativeWebScript {
    protected Map<String, Object> executeImpl(
            WebScriptRequest req, Status status, Cache cache) {
        Map<String, Object> model = new HashMap<String, Object>();
        model.put("fromJava", getMessage());
        return model;
    }

    private String getMessage() {
        return "Goodbye From Java";
    }
}
```

*Now, for class reloading to work you need to have a debug session started.
See this [article](debugging-repository-extensions.md) for how to do that.*

Then compile the code from your IDE or via Maven:

```bash
repo-extension mbergljung$ mvn compile
```

Now, in the browser refresh the Web Script page and you should see:

```html
Message: 'Goodbye from JS!' UPDATED 'Goodbye From Java'
```

**IMPORTANT! HotSwap Agent's Spring plugin supports only annotation based Spring configuration, so
not much use for ACS based extensions, which uses Spring XML configuration.** 
