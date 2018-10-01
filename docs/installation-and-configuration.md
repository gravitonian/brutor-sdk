**You only need to do this once.**

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
Before you can build any of the generated projects you need to have Java and Maven installed.
Then you need to configure Maven according to this [doc](configuring-maven-with-alfresco-repositories.md). 
