'use strict';
var alflogo = require('alfresco-logo');
var yeoman = require('yeoman-generator');
var path = require('path');
var mkdirp = require('mkdirp');
var _ = require('lodash');

var constants = require('./../common/constants.js');

module.exports = yeoman.Base.extend({

  // Arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    // This makes `projectType` a command line argument.
    this.argument('projectType', {
      type: String,
      desc: 'SDK Project Type [AIO | PlatformJAR | ShareJAR ]',
      optional: false,
      defaults: 'AIO'
    });
  },

  /*********************************************************************************************************************
   * Methods that are part of Yeoman environment run loop */

  initializing: function () {
    this.props = {};

    this.projectType = "AIO";

    this.defaultConfig = {
      projectGroupId: 'com.mycompany',
      projectArtifactId: path.basename(process.cwd()),
      projectVersion: '1.0.0-SNAPSHOT',
      projectPackage: 'com.mycompany',
      projectName: this.projectType + ' SDK 3.0 Project',
      projectDescription: this.projectType + ' SDK 3.0 Project',
      communityOrEnterprise: 'Community',
      alfrescoPlatformVersion: '5.2.a-EA',
      alfrescoShareVersion: '5.1.g',
      generateSampleSrcCode: true
    };
  },

  prompting: function () {
    // Show a welcome message
    this.log(alflogo(
      'Welcome to the Alfresco SDK Project generator!\n',
      {'left-pad': '     '}));

    // Set up a list of properties we need user to supply values for
    var prompts = [{
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
      store: true
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
      type: 'input',
      name: constants.PROP_PROJECT_NAME,
      message: "Project name?",
      default: this._getConfigValue(constants.PROP_PROJECT_NAME),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_PROJECT_DESCRIPTION,
      message: "Project description?",
      default: this._getConfigValue(constants.PROP_PROJECT_DESCRIPTION),
      store: true
    }, {
      type: 'list',
      name: constants.PROP_COMMUNITY_OR_ENTERPRISE,
      message: 'Would you like to use Community or Enterprise Edition?',
      choices: ['Community', 'Enterprise'],
      default: this._getConfigValue(constants.PROP_COMMUNITY_OR_ENTERPRISE),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_ALFRESCO_PLATFORM_VERSION,
      message: 'Alfresco Platform (i.e. Repository) version?',
      default: this._getConfigValue(constants.PROP_ALFRESCO_PLATFORM_VERSION),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_ALFRESCO_SHARE_VERSION,
      message: 'Alfresco Share version?',
      default: this._getConfigValue(constants.PROP_ALFRESCO_SHARE_VERSION),
      store: true
    }, {
      type: 'confirm',
      name: constants.PROP_GENERATE_SAMPLE_SRC,
      message: 'Should sample source code be generated for modules?',
      default: this._getConfigValue(constants.PROP_GENERATE_SAMPLE_SRC),
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;

      // To access props later use for example this.config.get(constants.PROP_PROJECT_ARTIFACT_ID)
      this._saveProps([
        constants.PROP_PROJECT_GROUP_ID,
        constants.PROP_PROJECT_ARTIFACT_ID,
        constants.PROP_PROJECT_VERSION,
        constants.PROP_PROJECT_PACKAGE,
        constants.PROP_PROJECT_NAME,
        constants.PROP_PROJECT_DESCRIPTION,
        constants.PROP_COMMUNITY_OR_ENTERPRISE,
        constants.PROP_ALFRESCO_PLATFORM_VERSION,
        constants.PROP_ALFRESCO_SHARE_VERSION,
        constants.PROP_GENERATE_SAMPLE_SRC
      ], props);
    }.bind(this));
  },

  /* TODO: remove, no need to do this if you do individual saves
   configuring: {
   saveConfig: function () {

   this.log('Saving project configuration...');

   // Need to do this otherwise config is not available when writing files
   this.config.save();
   },
   },*/

  default: {
    checkRootDir: function () {
      this.log('Checking root dir...');

      var projectArtifactId = this.config.get(constants.PROP_PROJECT_ARTIFACT_ID);
      if (path.basename(this.destinationPath()) !== projectArtifactId) {
        this.log(
          "Your SDK project must be inside a directory named " + projectArtifactId + "\n" +
          "This directory will be automatically created."
        );
        mkdirp(projectArtifactId);
        this.destinationRoot(this.destinationPath(projectArtifactId));
      }
    }
  },

  writing: {
    writeProjectFiles: function () {
      this.log('Writing project files...');

      // Set up new artifact ids
      var platformJarBaseArtifactId = "-platform-sample-jar";
      var shareJarBaseArtifactId = "-share-sample-jar";
      var platformJarArtifactId = this.props.projectArtifactId + platformJarBaseArtifactId;
      var shareJarArtifactId = this.props.projectArtifactId + shareJarBaseArtifactId;

      // Template Context
      var tplContext = {
        groupId: this.props.projectGroupId,
        artifactId: this.props.projectArtifactId,
        version: this.props.projectVersion,
        package: this.props.projectPackage,
        name: this.props.projectName,
        description: this.props.projectDescription,
        platformVersion: this.props.alfrescoPlatformVersion,
        shareVersion: this.props.alfrescoShareVersion,
        generateSampleSrcCode: this.props.generateSampleSrcCode,
        platformJarArtifactId: platformJarArtifactId,
        shareJarArtifactId: shareJarArtifactId

      };

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy AIO Parent files
      this._copyAsTemplate("aio/", "", "pom.xml", tplContext);
      this._copyAsTemplate("aio/", "", "README.md", tplContext);
      this._copyAsTemplate("aio/", "", "run.sh", tplContext);

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Platform JAR Module files
      var templatePlatformModuleId = 'platform-sample-jar';
      var platformJarTemplateSrcMainDir = 'aio/' + templatePlatformModuleId + '/src/main/';
      var alfrescoModulePath = '/src/main/resources/alfresco/module/';
      var platformJarTemplateModuleDir = 'aio/' + templatePlatformModuleId + '/' + alfrescoModulePath + templatePlatformModuleId + '/';

      this._copyAsTemplate("aio/" + templatePlatformModuleId + "/", platformJarArtifactId + "/", "pom.xml", tplContext);

      var fileSrc = platformJarTemplateSrcMainDir + 'assembly/';
      var fileDst = platformJarArtifactId + '/src/main/assembly/';
      this._copyAsTemplate(fileSrc, fileDst, "amp.xml", tplContext);

      if (this.props.generateSampleSrcCode) {
        fileSrc = platformJarTemplateSrcMainDir + 'java/org/alfresco/tutorial/platformsample/';
        fileDst = platformJarArtifactId + '/src/main/java/' + this.props.projectPackage.replace(/\./gi, '/') +
          '/platformsample/';
        this._copyAsTemplate(fileSrc, fileDst, "Demo.java", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "DemoComponent.java", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "HelloWorldWebScript.java", tplContext);

        var webScriptDirPath = 'alfresco/extension/templates/webscripts/alfresco/tutorials/';
        fileSrc = platformJarTemplateSrcMainDir + 'resources/' + webScriptDirPath;
        fileDst = platformJarArtifactId + '/src/main/resources/' + webScriptDirPath;
        this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.desc.xml", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.html.ftl", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.js", tplContext);
      }

      var platformModulePathDst = platformJarArtifactId + alfrescoModulePath + platformJarArtifactId + '/';
      var springContextDirPath = 'context/';
      fileSrc = platformJarTemplateModuleDir + springContextDirPath;
      fileDst = platformModulePathDst + springContextDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "bootstrap-context.xml", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "service-context.xml", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "webscript-context.xml", tplContext);

      var contentModelDirPath = 'model/';
      fileSrc = platformJarTemplateModuleDir + contentModelDirPath;
      fileDst = platformModulePathDst + contentModelDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "content-model.xml", tplContext);

      var workflowDirPath = 'workflow/';
      fileSrc = platformJarTemplateModuleDir + workflowDirPath;
      fileDst = platformModulePathDst + workflowDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "sample-process.bpmn20.xml", tplContext);

      fileSrc = platformJarTemplateModuleDir;
      fileDst = platformModulePathDst;
      this._copyAsTemplate(fileSrc, fileDst, "alfresco-global.properties", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "log4j.properties", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "module-context.xml", tplContext);

      var metaInfResourcesDirPath = 'META-INF/resources/';
      fileSrc = platformJarTemplateSrcMainDir + 'resources/' + metaInfResourcesDirPath;
      fileDst = platformJarArtifactId + '/src/main/resources/' + metaInfResourcesDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "test.html", tplContext);

      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Share JAR Module files
      var templateShareModuleId = 'share-sample-jar';
      var shareJarTemplateSrcMainDir = 'aio/' + templateShareModuleId + '/src/main/';
      var shareJarTemplateModuleDir = 'aio/' + templateShareModuleId + '/' + alfrescoModulePath + templateShareModuleId + '/';
      var webExtensionPath = '/src/main/resources/alfresco/web-extension/';
      var shareJarTemplateWebExtensionDir = 'aio/' + templateShareModuleId + webExtensionPath;

      this._copyAsTemplate("aio/" + templateShareModuleId + "/", shareJarArtifactId + "/", "pom.xml", tplContext);

      fileSrc = shareJarTemplateSrcMainDir + 'assembly/';
      fileDst = shareJarArtifactId + '/src/main/assembly/';
      this._copyAsTemplate(fileSrc, fileDst, "amp.xml", tplContext);

      var shareModulePathDst = shareJarArtifactId + alfrescoModulePath + shareJarArtifactId + '/';
      fileSrc = shareJarTemplateModuleDir;
      fileDst = shareModulePathDst;
      this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);

      fileSrc = shareJarTemplateWebExtensionDir;
      fileDst = shareJarArtifactId + webExtensionPath;
      this._copyAsTemplate(fileSrc, fileDst, "custom-slingshot-application-context.xml", tplContext);

      fileSrc = shareJarTemplateModuleDir;
      fileDst = shareModulePathDst;
      this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);

      webScriptDirPath = 'site-webscripts/com/example/pages/';
      fileSrc = shareJarTemplateWebExtensionDir + webScriptDirPath;
      fileDst = shareJarArtifactId + webExtensionPath + webScriptDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.desc.xml", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.html.ftl", tplContext);
      this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.js", tplContext);


      var widgetsResourcesPath = 'META-INF/resources/' + templateShareModuleId + "/js/tutorials/widgets";
      fileSrc = shareJarTemplateSrcMainDir + 'resources/' + widgetsResourcesPath + '/css/';
      fileDst = shareJarArtifactId + '/src/main/resources/' + widgetsResourcesPath + '/css/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.css", tplContext);
      fileSrc = shareJarTemplateSrcMainDir + 'resources/' + widgetsResourcesPath + '/i18n/';
      fileDst = shareJarArtifactId + '/src/main/resources/' + widgetsResourcesPath + '/i18n/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.properties", tplContext);
      fileSrc = shareJarTemplateSrcMainDir + 'resources/' + widgetsResourcesPath + '/templates/';
      fileDst = shareJarArtifactId + '/src/main/resources/' + widgetsResourcesPath + '/templates/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.html", tplContext);
      fileSrc = shareJarTemplateSrcMainDir + 'resources/' + widgetsResourcesPath + "/";
      fileDst = shareJarArtifactId + '/src/main/resources/' + widgetsResourcesPath + '/';
      this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.js", tplContext);
    }
  },

  install: function () {
    this.log('Installing stuff...');

    this.installDependencies();
  },

  /*********************************************************************************************************************
   *  Private methods not part of Yemoan run loop */

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

});
