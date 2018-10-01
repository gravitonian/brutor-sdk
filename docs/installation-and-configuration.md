**You only need to do this once.**

## Install Docker
You probably already have Docker installed as everything these days is easily accessible and run as containers. 
If you don't, then head over to the [Docker Store](https://store.docker.com/search?type=edition&offering=community) and download the latest stable community edition (CE). 

Make sure the Docker daemon is running and you are set:

```bash 
mbergljung$ docker -v
Docker version 18.06.1-ce, build e68fc7a
```

## (OPTIONAL) Set up Access to Alfresco Enterprise Docker Images
If you intend to use Alfresco Repo and/or Share Enterprise versions, then you need to set up 
access to Alfresco's Enterprise Docker Registry, which is [QUAY](https://quay.io/).

You can request access/credentials via Alfresco Support.

Then login to Quay.io with Docker using your credentials:

```bash 
$ docker login quay.io
Username: myusername
Password: mypassword
```

## Clone this project
You need to clone this project in order to use the Yeoman generator:

```bash
$ git clone https://github.com/gravitonian/brutor-sdk
```

## Install Yeoman 
First, install [Yeoman](http://yeoman.io):

```bash
$ sudo npm install -g yo
```

## Install Alfresco Project Generator 
Since we’re developing the generator locally, it’s not yet available as a global npm module. 
A global module may be created and symlinked to a local one, using npm. 

Here’s what you’ll want to do:

On the command line, from the root of your generator project 
(in the folder where you cloned this project, such as *brutor-sdk*), type:

```bash
$ npm link
```

## Configuring Maven
Before you can build any of the generated projects you need to have Java SDK and Maven installed.
Then you need to configure Maven according to this [doc](configuring-maven-with-alfresco-repositories.md). 
