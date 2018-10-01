# Introduction to Docker
The Alfresco Extension project generator uses a runner project that is based on Docker Compose.
And Docker Compose is a container orchestration tool that can be used to run multiple Docker containers
locally.  

So getting up to speed with how Docker works is essential to understanding how these
Alfresco extension projects work.

The following is a list of concepts (terms) and technologies that you will come in contact with when deploying and running with the Alfresco extension project. 
 
## Docker Image
An image is a number of layers that can be used to instantiate a container. This could be, for example, Java + Apache Tomcat. You can find all kinds of Docker Images on the public repository called Docker Hub. There are also private image repositories (for things like commercial enterprise images), such as the one Alfresco uses called Quay.  

## Docker Container
An instance of an image is called a container. You have an image, which is a set of layers as described. If you start this image, you have a running container of this image. You can have many running containers of the same image.

## Docker
Docker is one of the most popular container platforms. Docker provides functionality for deploying and running applications in containers based on images. 

## Docker Compose
When you have many containers making up your solution, such as with ACS, and you need to configure each one of the containers so they work nicely together, then you need a tool for this.

Docker Compose is such a tool for defining and running multi-container Docker applications. With Compose, you use a YAML file to configure your application’s services. Then, with a single command, you create and start all the services from your configuration. 

## Dockerfile
A Dockerfile is a script containing a successive series of instructions, directions, and commands which are to be executed to form a new Docker image. Each command executed translates to a new layer in the image, forming the end product. They replace the process of doing everything manually and repeatedly. When a Dockerfile is finished executing, you end up having built a new image, which then you use to start a new Docker container.

The Alfresco Extension Project generator uses a *Dockerfile* to build a custom image with the extensions applied.

## Virtual Machine Monitor (Hypervisor)
A Hypervisor is used to run other OS instances on your local host machine. Typically it's used to run a different OS on your machine, such as Windows on a Mac. When you run another OS on your host it is called a guest OS, and it runs in a so called Virtual Machine (VM).

## Difference between Containers and Virtual Machines
It is important to understand the difference between using containers and using VMs. 

The main difference is that when you are running a container you are not kicking off a complete new OS instance. And this makes containers much more lightweight and quicker to start. A container is also taking up much less space on your hard-disk as it does not have to ship the whole OS.
