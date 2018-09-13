'use strict';
var alflogo = require('alfresco-logo');
var Generator = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');

var constants = require('./../common/constants.js');

module.exports = class extends Generator {

  // Arguments and options should be defined in the constructor.
  constructor(args, opts) {
    // Calling the super ctor is important so our generator is correctly set up
    super(args, opts);

    // Now add our custom code

    // This makes `projectType` a command line argument.
    //this.argument('projectType', {
    //  type: String,
    //  desc: 'Alfresco Project Type [AIO | PlatformJAR | ShareJAR | RepoAction | Activiti | Activiti7 ]',
    //  optional: false,
    //  defaults: 'AIO'
    //});
  },

  /*********************************************************************************************************************
   * Methods that are part of Yeoman environment run loop */

  initializing: function () {
    this.props = {};

    this.defaultConfig = {
      // Default config for general project properties
      projectGroupId: 'org.alfresco',
      projectArtifactId: path.basename(process.cwd()),
      projectVersion: '1.0.0-SNAPSHOT',
      projectPackage: 'org.alfresco',
      projectName: ' Alfresco Extension Project',
      projectDescription: ' Alfresco extension project for a containerized environment',
      communityOrEnterprise: 'Community',
      generateSampleSrcCode: true,

      // Default config for Repo extension properties
      includeRepoExtension: true,
      repoExtensionArtifactId: 'repo-extension',
      repoExtensionName: 'Repository Module',
      repoExtensionDescription: 'Repository extension module JAR (to be included in the alfresco.war)',
      repoExtensionGenerateDockerBuild: true,
      repoVersion: '6.0.7-ga',

      // Default config for Share extension properties
      includeShareExtension: true,
      shareExtensionArtifactId: 'share-extension',
      shareExtensionName: 'Share Module',
      shareExtensionDescription: 'Share extension module JAR (to be included in the share.war)',
      shareExtensionGenerateDockerBuild: true,
      shareVersion: '6.0',

      // Default config for Activiti extension properties
      includeActivitiExtension: true,
      activitiExtensionArtifactId: 'activiti-extension',
      activitiExtensionName: 'Activiti Extension',
      activitiExtensionDescription: 'Activiti extension JAR (to be included in the activiti_app.war)',
      activitiExtensionGenerateDockerBuild: true,
      activitiVersion: '6.0',
    };
  },

  prompting: function () {
    // Show a welcome message
    this.log(alflogo(
      'Welcome to the Alfresco Extension Project Generator!\n',
      {'left-pad': '     '}));

    // Set up a list of questions that will control what is generated
    var questionPrompts = [

    // General questions related to the whole project
    {
       type: 'input',
       name: constants.PROP_PROJECT_NAME,
       message: "Project name?",
       default: this._getConfigValue(constants.PROP_PROJECT_NAME),
       store: false
    }, {
       type: 'input',
       name: constants.PROP_PROJECT_DESCRIPTION,
       message: "Project description?",
       default: this._getConfigValue(constants.PROP_PROJECT_DESCRIPTION),
       store: false
    },{
      type: 'input',
      name: constants.PROP_PROJECT_GROUP_ID,
      message: "Maven project groupId?",
      default: this._getConfigValue(constants.PROP_PROJECT_GROUP_ID),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_PROJECT_ARTIFACT_ID,
      message: "Maven project artifactId?",
      default: this._getConfigValue(constants.PROP_PROJECT_ARTIFACT_ID),
      store: false
    }, {
      type: 'input',
      name: constants.PROP_PROJECT_VERSION,
      message: "Maven project version?",
      default: this._getConfigValue(constants.PROP_PROJECT_VERSION),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_PROJECT_PACKAGE,
      message: "Package for Java sample classes?",
      default: function (readonlyProps) {
        return readonlyProps.projectGroupId;
      },
      store: true
    }, {
      type: 'list',
      name: constants.PROP_COMMUNITY_OR_ENTERPRISE,
      message: 'Would you like to use Community or Enterprise Edition?',
      choices: ['Community', 'Enterprise'],
      default: this._getConfigValue(constants.PROP_COMMUNITY_OR_ENTERPRISE),
      store: true
    },

    // Questions related to the Alfresco Repository Extension Module
    {
      type: 'confirm',
      name: constants.PROP_INCLUDE_REPOSITORY_EXTENSION,
      message: 'Include Alfresco Repository Extension?',
      default: this._getConfigValue(constants.PROP_INCLUDE_REPOSITORY_EXTENSION),
      store: true
    },{
      type: 'input',
      name: constants.PROP_REPOSITORY_EXTENSION_ARTIFACT_ID,
      message: 'Repository extension maven artifactId?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_ARTIFACT_ID),
      store: true,
      when : this._includeRepoExtension()
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_EXTENSION_NAME,
      message: 'Repository Extension Name?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_NAME),
      store: true,
      when : this._includeRepoExtension()
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_EXTENSION_DESCRIPTION,
      message: 'Repository Extension Description?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_DESCRIPTION),
      store: true,
      when : this._includeRepoExtension()
    },{
      type: 'input',
      name: constants.PROP_REPOSITORY_VERSION,
      message: 'Alfresco Repository version?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_VERSION),
      store: true,
      when : this._includeRepoExtension()
    }, {
      type: 'confirm',
      name: constants.PROP_REPOSITORY_EXTENSION_GENERATE_DOCKER_BUILD,
      message: 'Should a project for Repository Docker build be generated (i.e. build Repo Docker image with repo extension)?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_GENERATE_DOCKER_BUILD),
      store: true,
      when : this._includeRepoExtension()
    },

    // Questions related to the Alfresco Share Extension Module
    {
      type: 'confirm',
      name: constants.PROP_INCLUDE_SHARE_EXTENSION,
      message: 'Include Alfresco Share Extension?',
      default: this._getConfigValue(constants.PROP_INCLUDE_SHARE_EXTENSION),
      store: true
    },{
      type: 'input',
      name: constants.PROP_SHARE_EXTENSION_ARTIFACT_ID,
      message: 'Share extension maven artifactId?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_ARTIFACT_ID),
      store: true,
      when : this._includeShareExtension()
    }, {
      type: 'input',
      name: constants.PROP_SHARE_EXTENSION_NAME,
      message: 'Share Extension Name?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_NAME),
      store: true,
      when : this._includeShareExtension()
    }, {
      type: 'input',
      name: constants.PROP_SHARE_EXTENSION_DESCRIPTION,
      message: 'Share Extension Description?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_DESCRIPTION),
      store: true,
      when : this._includeShareExtension()
    },{
      type: 'input',
      name: constants.PROP_SHARE_VERSION,
      message: 'Alfresco Share version?',
      default: this._getConfigValue(constants.PROP_SHARE_VERSION),
      store: true,
      when : this._includeShareExtension()
    }, {
      type: 'confirm',
      name: constants.PROP_SHARE_EXTENSION_GENERATE_DOCKER_BUILD,
      message: 'Should a project for Share Docker build be generated (i.e. build Share Docker image with Share extension)?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_GENERATE_DOCKER_BUILD),
      store: true,
      when : this._includeShareExtension()
    },

    // Questions related to the Activiti Extension Module
    {
      type: 'confirm',
      name: constants.PROP_INCLUDE_ACTIVITI_EXTENSION,
      message: 'Include Activiti Extension?',
      default: this._getConfigValue(constants.PROP_INCLUDE_ACTIVITI_EXTENSION),
      store: true
    },{
      type: 'input',
      name: constants.PROP_ACTIVITI_EXTENSION_ARTIFACT_ID,
      message: 'Activiti extension maven artifactId?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_ARTIFACT_ID),
      store: true,
      when : this._includeActivitiExtension()
    }, {
      type: 'input',
      name: constants.PROP_ACTIVITI_EXTENSION_NAME,
      message: 'Activiti Extension Name?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_NAME),
      store: true,
      when : this._includeActivitiExtension()
    }, {
      type: 'input',
      name: constants.PROP_ACTIVITI_EXTENSION_DESCRIPTION,
      message: 'Activiti Extension Description?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_DESCRIPTION),
      store: true,
      when : this._includeActivitiExtension()
    },{
      type: 'input',
      name: constants.PROP_ACTIVITI_VERSION,
      message: 'Activiti version?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_VERSION),
      store: true,
      when : this._includeActivitiExtension()
    }, {
      type: 'confirm',
      name: constants.PROP_ACTIVITI_EXTENSION_GENERATE_DOCKER_BUILD,
      message: 'Should a project for Activiti Docker build be generated (i.e. build Activiti Docker image with Activiti extension)?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_GENERATE_DOCKER_BUILD),
      store: true,
      when : this._includeActivitiExtension()
    },

    {
     type: 'confirm',
     name: constants.PROP_GENERATE_SAMPLE_SRC,
     message: 'Should sample source code be generated?',
     default: this._getConfigValue(constants.PROP_GENERATE_SAMPLE_SRC),
     store: true
   }];

    return this.prompt(questionPrompts).then(function (props) {
      this.props = props;
    }.bind(this));
  },

  default: {
    checkRootDir: function () {
      this.log('Checking root dir...');

      var projectArtifactId = this.props.projectArtifactId;
      if (path.basename(this.destinationPath()) !== projectArtifactId) {
        this.log(
          "Your Alfresco extension project must be inside a directory named " + projectArtifactId + "\n" +
          "This directory will be automatically created."
        );
        mkdirp(projectArtifactId);
        this.destinationRoot(this.destinationPath(projectArtifactId));
      }
    },

    saveConfig: function () {

      this.log('Creating .yo-rc.json file...');
      // To access props later use for example this.config.get(constants.PROP_PROJECT_ARTIFACT_ID)

      this._saveProps([
        constants.PROP_PROJECT_GROUP_ID,
        constants.PROP_PROJECT_ARTIFACT_ID,
        constants.PROP_PROJECT_VERSION,
        constants.PROP_PROJECT_PACKAGE,
        constants.PROP_PROJECT_NAME,
        constants.PROP_PROJECT_DESCRIPTION,
        constants.PROP_COMMUNITY_OR_ENTERPRISE,
        constants.PROP_INCLUDE_REPOSITORY_EXTENSION,
        constants.PROP_INCLUDE_ALFRESCO_SHARE_EXTENSION,
        constants.PROP_INCLUDE_ACTIVITI_EXTENSION,
        constants.PROP_REPOSITORY_VERSION,
        constants.PROP_SHARE_VERSION,
        constants.PROP_REPOSITORY_EXTENSION_NAME,
        constants.PROP_ALFRESCO_SHARE_EXTENSION_NAME,
        constants.PROP_GENERATE_SAMPLE_SRC
      ], this.props);
    }
  },

  writing: {
    writeProjectFiles: function () {
      this.log('Writing project files...');

      // Template Context
      var tplContext = {

        // General project properties
        groupId: this.props.projectGroupId,
        artifactId: this.props.projectArtifactId,
        version: this.props.projectVersion,
        package: this.props.projectPackage,
        name: this.props.projectName,
        description: this.props.projectDescription,
        generateSampleSrcCode: this.props.generateSampleSrcCode,

        // Repository Extension properties
        includeRepoExtension: this.props.includeRepoExtension,
        repoExtensionArtifactId: this.props.repoExtensionArtifactId,
        repoExtensionName: this.props.repoExtensionName,
        repoExtensionDescription: this.props.repoExtensionDescription,
        repoExtensionGenerateDockerBuild: this.props.repoExtensionGenerateDockerBuild,
        repoVersion: this.props.repoVersion,

        // Share Extension properties
        includeShareExtension: this.props.includeShareExtension,
        shareExtensionArtifactId: this.props.shareExtensionArtifactId,
        shareExtensionName: this.props.shareExtensionName,
        shareExtensionDescription: this.props.shareExtensionDescription,
        shareExtensionGenerateDockerBuild: this.props.shareExtensionGenerateDockerBuild,
        shareVersion: this.props.shareVersion,

        // Activiti Extension properties
        includeActivitiExtension: this.props.includeActivitiExtension,
        activitiExtensionArtifactId: this.props.activitiExtensionArtifactId,
        activitiExtensionName: this.props.activitiExtensionName,
        activitiExtensionDescription: this.props.activitiExtensionDescription,
        activitiExtensionGenerateDockerBuild: this.props.activitiExtensionGenerateDockerBuild,
        activitiVersion: this.props.activitiVersion,
      };

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Parent Project files
      this._copyAsTemplate("aio/", "", "pom.xml", tplContext);
      this._copyAsTemplate("aio/", "", "README.md", tplContext);
      this._copyAsTemplate("aio/", "", "build-all-extensions.sh", tplContext);
      this._copyAsTemplate("aio/", "", "build-activiti-extension.sh", tplContext);
      this._copyAsTemplate("aio/", "", "build-repo-extension.sh", tplContext);
      this._copyAsTemplate("aio/", "", "build-share-extension.sh", tplContext);

      // Common paths
      var alfrescoModulePath = '/src/main/resources/alfresco/module/';
      var webExtensionPath = '/src/main/resources/alfresco/web-extension/';

      if (this.props.includeRepoExtension) {
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
        // Copy Repository Extension Module files
        var templateRepoModuleId = 'repo-extension';
        var repoExtensionTemplateSrcMainDir = 'aio/' + templateRepoModuleId + '/src/main/';
        var repoExtensionTemplateModuleDir = 'aio/' + templateRepoModuleId + '/' + alfrescoModulePath + templateRepoModuleId + '/';

        this._copyAsTemplate("aio/" + templateRepoModuleId + "/", repoExtensionArtifactId + "/", "pom.xml", tplContext);

        var fileSrc = repoExtensionTemplateSrcMainDir + 'assembly/';
        var fileDst = repoExtensionArtifactId + '/src/main/assembly/';
        this._copyAsTemplate(fileSrc, fileDst, "amp.xml", tplContext);

        if (this.props.generateSampleSrcCode) {
          fileSrc = repoExtensionTemplateSrcMainDir + 'java/org/alfresco/tutorial/reposamples/';
          fileDst = repoExtensionArtifactId + '/src/main/java/' + this.props.projectPackage.replace(/\./gi, '/') +
            '/reposamples/';
          this._copyAsTemplate(fileSrc, fileDst, "Demo.java", tplContext);
          this._copyAsTemplate(fileSrc, fileDst, "DemoComponent.java", tplContext);
          this._copyAsTemplate(fileSrc, fileDst, "DemoRepoAction.java", tplContext);
          this._copyAsTemplate(fileSrc, fileDst, "HelloWorldWebScript.java", tplContext);

          var webScriptDirPath = 'alfresco/extension/templates/webscripts/alfresco/tutorials/';
          fileSrc = repoExtensionTemplateSrcMainDir + 'resources/' + webScriptDirPath;
          fileDst = repoExtensionArtifactId + '/src/main/resources/' + webScriptDirPath;
          this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.desc.xml", tplContext);
          this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.html.ftl", tplContext);
          this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.js", tplContext);
        }

        var repoModulePathDst = repoExtensionArtifactId + alfrescoModulePath + repoExtensionArtifactId + '/';
        var springContextDirPath = 'context/';
        fileSrc = repoExtensionTemplateModuleDir + springContextDirPath;
        fileDst = repoModulePathDst + springContextDirPath;
        this._copyAsTemplate(fileSrc, fileDst, "bootstrap-context.xml", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "service-context.xml", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "webscript-context.xml", tplContext);

        var contentModelDirPath = 'model/';
        fileSrc = repoExtensionTemplateModuleDir + contentModelDirPath;
        fileDst = repoModulePathDst + contentModelDirPath;
        this._copyAsTemplate(fileSrc, fileDst, "content-model.xml", tplContext);

        fileSrc = repoExtensionTemplateModuleDir;
        fileDst = repoModulePathDst;
        this._copyAsTemplate(fileSrc, fileDst, "alfresco-global.properties", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "log4j.properties", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "module-context.xml", tplContext);

        var metaInfResourcesDirPath = 'META-INF/resources/';
        fileSrc = repoExtensionTemplateSrcMainDir + 'resources/' + metaInfResourcesDirPath;
        fileDst = repoExtensionArtifactId + '/src/main/resources/' + metaInfResourcesDirPath;
        this._copyAsTemplate(fileSrc, fileDst, "test.html", tplContext);
      }

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Share Extension Module files
      var templateShareModuleId = 'share-extension';
      var shareExtensionTemplateSrcMainDir = 'aio/' + templateShareModuleId + '/src/main/';
      var shareExtensionTemplateModuleDir = 'aio/' + templateShareModuleId + '/' + alfrescoModulePath + templateShareModuleId + '/';
      var shareExtensionTemplateWebExtensionDir = 'aio/' + templateShareModuleId + webExtensionPath;

      this._copyAsTemplate("aio/" + templateShareModuleId + "/", shareExtensionArtifactId + "/", "pom.xml", tplContext);

      fileSrc = shareExtensionTemplateSrcMainDir + 'assembly/';
      fileDst = shareExtensionArtifactId + '/src/main/assembly/';
      this._copyAsTemplate(fileSrc, fileDst, "amp.xml", tplContext);

      var shareModulePathDst = shareExtensionArtifactId + alfrescoModulePath + shareExtensionArtifactId + '/';
      fileSrc = shareExtensionTemplateModuleDir;
      fileDst = shareModulePathDst;
      this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);

      fileSrc = shareExtensionTemplateWebExtensionDir;
      fileDst = shareExtensionArtifactId + webExtensionPath;
      this._copyAsTemplate(fileSrc, fileDst, "custom-slingshot-application-context.xml", tplContext);

      fileSrc = shareExtensionTemplateModuleDir;
      fileDst = shareModulePathDst;
      this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);

      var messagesDirPath = 'messages/';
      fileSrc = shareExtensionTemplateWebExtensionDir + messagesDirPath;
      fileDst = shareExtensionArtifactId + webExtensionPath + messagesDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "custom.properties", tplContext);

      var siteDataExtensionsDirPath = 'site-data/extensions/';
      fileSrc = shareExtensionTemplateWebExtensionDir + siteDataExtensionsDirPath;
      fileDst = shareExtensionArtifactId + webExtensionPath + siteDataExtensionsDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "extension-modules.xml", tplContext);

      webScriptDirPath = 'site-webscripts/com/example/pages/';
      fileSrc = shareExtensionTemplateWebExtensionDir + webScriptDirPath;
      fileDst = shareExtensionArtifactId + webExtensionPath + webScriptDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.desc.xml", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.html.ftl", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.js", tplContext);

      var tutorialWidgetsPath = "/js/tutorials/widgets";
      var widgetsResourcesSrcPath = metaInfResourcesDirPath + templateShareModuleId + tutorialWidgetsPath;
      var widgetsResourcesDstPath = metaInfResourcesDirPath + shareExtensionArtifactId + tutorialWidgetsPath;
      fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + '/css/';
      fileDst = shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/css/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.css", tplContext);
      fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + '/i18n/';
      fileDst = shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/i18n/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.properties", tplContext);
      fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + '/templates/';
      fileDst = shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/templates/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.html", tplContext);
      fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + "/";
      fileDst = shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.js", tplContext);

      fileSrc = shareExtensionTemplateSrcMainDir + 'resources/META-INF/';
      fileDst = shareExtensionArtifactId + '/src/main/resources/META-INF/';
      this._copyAsTemplate(fileSrc, fileDst, "share-config-custom.xml", tplContext);
    }
  },

  install: function () {
    this.log('Nothing to install in npm repo...');

    //this.installDependencies();
  },

  /*********************************************************************************************************************
   *  Private methods not part of Yeoman run loop */

   _includeRepoExtension: function (currentAnswers) {
      return currentAnswers.includeRepoExtension;
   },

   _includeShareExtension: function (currentAnswers) {
      return currentAnswers.includeShareExtension;
   },

   _includeActivitiExtension: function (currentAnswers) {
      return currentAnswers.includeActivitiExtension;
   },

  _getConfigValue: function (key) {
    if (!_.isNil(key)) {
      if (!_.isNil(this.config.get(key))) {
        return this.config.get(key);
      } else if (this.defaultConfig) {
        return this.defaultConfig[key];
      }
    }
    return undefined;
  },

  _saveProp: function (propName, propObject) {
    var value = propObject[propName];
    this[propName] = value;
    this.config.set(propName, value);
  },

  _saveProps: function (propNames, propObject) {
    propNames.forEach(function (propName) {
      this._saveProp(propName, propObject);
    }.bind(this));
  },

  _copyAsTemplate: function (fileSrcDir, fileDstDir, fileName, tplContext) {
    this.fs.copyTpl(
      this.templatePath(fileSrcDir + fileName),
      this.destinationPath(fileDstDir + fileName),
      tplContext
    );
  }
}
