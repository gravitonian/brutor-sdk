# Configuring Maven with Alfresco Repositories
When an Alfresco Extension project has been generated it does not contain any information about 
where it can find the artifacts that it depends on. Basically the project does not know 
where it should download the Alfresco and Activiti JARs from.

The following sections shows how to set up the Alfresco Maven Repositories in a 
Community environment and in an Enterprise environment.

Open up your Maven **settings.xml** file and do as follows. On a Mac this file 
is located at ~/.m2/settings.xml.

## Alfresco Community Maven Repository set up
Add the public (Community) Alfresco ACS repository as follows:

```xml
<repositories>
    <repository>
        <id>alfresco-public</id>
        <url>https://artifacts.alfresco.com/nexus/content/groups/public</url>
    </repository>
</repositories>
<pluginRepositories>
    <pluginRepository>
        <id>alfresco-public</id>
        <name>Alfresco</name>
        <url>http://artifacts.alfresco.com/nexus/content/repositories/releases</url>
    </pluginRepository>
</pluginRepositories>
```
No login is required to access these.

## Alfresco Enterprise Maven Repository set up (OPTIONAL)
*Make sure you have set up Community repositories first.*
Start by setting up credentials for the Alfresco Content Services Enterprise artifact repository 
and the Alfresco Process Services Enterprise artifact repository:

```xml
<servers>
   <server>
       <id>activiti-private-repository</id>
       <username>{your Alfresco Enterprise username}</username>
       <password>{your Alfresco Enterprise pwd}</password>
   </server>
   <server>
       <id>alfresco-private-repository</id>
       <username>{your Alfresco Enterprise username}</username>
       <password>{your Alfresco Enterprise pwd}</password>
   </server>
</servers>
```
The credentials can be acquired from Alfresco Support.

Then add the URLs for these repositories:

```xml
<repositories>
    <repository>
        <id>activiti-private-repository</id>
        <name>Activiti Private Repository</name>
        <url>https://artifacts.alfresco.com/nexus/content/repositories/activiti-enterprise-releases</url>
    </repository>
    <repository>
        <id>alfresco-private-repository</id>
        <name>Alfresco Private Repository</name>
        <url>http://artifacts.alfresco.com/nexus/content/groups/private</url>
    </repository>
</repositories>
```
