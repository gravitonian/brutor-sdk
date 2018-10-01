<h1 align="center">Yeoman Generator - Alfresco Extension Projects</h1>
<p align="center">
  <img title="yeoman generator" src='https://github.com/yeoman/media/blob/master/optimized/yeoman-150x150-opaque.png' alt='yeoman logo'  />
</p>

## Introduction
This code generator can generate an Alfresco extension project similar to the Alfresco SDK 3.0 All-In-One (AIO).
It supports Alfresco Content Services (ACS) 6.x and Alfresco Process Services (APS) 1.8.x and 1.9.x. As ACS 6.0 is run
in a Docker container environment this project also supports a runner that is based on Docker Compose.

The code generator is flexible and you have many options to choose from when you decide what you want to be 
generated. After you have generated an Alfresco extension project have a look at its
README file for more information about how to use it.

The way you code extensions has not changed, have a look [here](https://docs.alfresco.com/6.0/concepts/dev-for-developers.html) for full documentation on how to build
Alfresco extensions for Platform/Repository and Share.
 
 
## Getting Started

- [Installation and Configuration](docs/installation-and-configuration.md) 

Here are some links to how you can generate, build, and run a project supporting:

- [Repo, Share, and Activiti Extensions](docs/generating-repo-and-share-and-activiti-extension-project.md) 
- [Repo and Share Extensions](docs/generating-repo-and-share-extension-project.md) 
- [Repo Extensions](docs/generating-repository-extension-project.md) 
- [Share Extensions](docs/generating-share-extension-project.md)
- [Activiti Extensions](docs/generating-activiti-extension-project.md)
- [Repo Extensions and APS Java Client](docs/generating-repository-extension-project-with-support-for-APS-calls.md)
- [Activiti Extensions and ACS Java Client](docs/generating-activiti-extension-project-with-support-for-ACS-calls.md)

If you are integrating ACS and APS you will need the following Java client libraries:

- [Alfresco Content Services (ACS) ReST API Java Client](https://github.com/gravitonian/acs-rest-api-java-client)
- [Alfresco Process Services (APS) ReST API Java Client](https://github.com/gravitonian/aps-rest-api-java-client) 
- [Sample code using ACS Java Client - Service Task implementation](https://github.com/gravitonian/brutor-sdk/blob/master/generators/app/templates/aio/activiti-extension/src/main/java/com/activiti/extension/bean/CallAcsSpringJavaDelegate.java)
- [Sample code using APS Java Client - Web Script implementation](https://github.com/gravitonian/brutor-sdk/blob/master/generators/app/templates/aio/repo-extension/src/main/java/org/alfresco/tutorial/reposamples/CallApsWebScript.java)



