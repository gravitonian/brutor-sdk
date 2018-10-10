'use strict';
const alflogo = require('alfresco-logo');
const Generator = require('yeoman-generator');
const path = require('path');
const mkdirp = require('mkdirp');
const _ = require('lodash');
const semver = require('semver');

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
  }

  /*********************************************************************************************************************
   * Methods that are part of Yeoman environment run loop, in priority order */

  // Initialization methods (checking current project state, getting configs, etc)
  initializing() {
    this.props = {};

    this.defaultConfig = {
      // Default config for general project properties
      projectGroupId: 'org.alfresco',
      projectArtifactId: 'my_alf_proj',
      projectVersion: '1.0.0-SNAPSHOT',
      projectPackage: 'org.alfresco',
      projectName: ' Alfresco Extension Project',
      projectDescription: ' Alfresco project for working with multiple extensions in a containerized environment',
      communityOrEnterprise: 'Community', // Only relevant for Repo and Share, Activiti is always Enterprise
      generateSampleSrcCode: true,
      includeDevRuntimeEnv: true,
      enableInboundEmailServer: false,
      enableOutboundEmailServer: true,

      // Default config for Repo extension properties
      includeRepoExtension: true,
      repoExtensionArtifactId: 'repo-extension',
      repoExtensionName: 'Repository Extension',
      repoExtensionDescription: 'Repository extension module JAR (to be included in the alfresco.war)',
      repoExtensionGenerateDockerBuild: true,
      repoCommunityVersion: '6.0.7-ga',
      repoDockerImageCommunityVersion: '6.0.7-ga',
      repoEnterpriseVersion: '6.0.0.2',
      repoDockerImageEnterpriseVersion: '6.0.0.2',
      repoJarOrAmp: 'JAR',
      repoEnableHotSwap: false,
      includeRepoCallApsSample: false,

      // Default config for Share extension properties
      includeShareExtension: true,
      shareExtensionArtifactId: 'share-extension',
      shareExtensionName: 'Share Extension',
      shareExtensionDescription: 'Share extension module JAR (to be included in the share.war)',
      shareExtensionGenerateDockerBuild: true,
      shareCommunityVersion: '6.0.c',
      shareDockerImageCommunityVersion: '6.0.c',
      shareEnterpriseVersion: '6.0',
      shareDockerImageEnterpriseVersion: '6.0',
      shareJarOrAmp: 'JAR',
      shareEnableHotSwap: false,

      // Default config for Activiti extension properties
      includeActivitiExtension: true,
      activitiExtensionArtifactId: 'activiti-extension',
      activitiExtensionName: 'Activiti Extension',
      activitiExtensionDescription: 'Activiti extension JAR (to be included in the activiti_app.war)',
      activitiExtensionGenerateDockerBuild: true,
      activitiVersion: '1.9.0.3', // Alfresco Process Services (APS) version (Enterprise)
      activitiDockerImageVersion: '1.9.0.1', // Docker image does not exist for latest build 1.9.0.3
      activitiProjectPackage: 'com.activiti.extension.bean', // Standard place where Activiti searches for Spring Beans
      includeActivitiCallAcsSample: false,
      activitiEnableHotSwap: false
    };

    /* Now check if Java and Maven is installed
    try {
      if (semver.lt(process.versions.node, '5.0.0')) {
        throw new Error('Node.JS 5.0.0 or above is required, you are using: ' + process.versions.node + '.');
      }

      this.javaVersion = versions.getJavaVersion();
      if (!this.javaVersion) {
        throw new Error('Cannot find a java executable. JDK version 8.0 is recommended.');
      }

      this.mavenVersion = versions.getMavenVersion();
      if (!this.mavenVersion) {
        throw new Error('Cannot find a maven executable. Maven is required to build the projects.');
      }
    } catch (e) {
      this.out.error(e.message);
    }*/
  }

  // Where you prompt users for options (where you’d call this.prompt())
  prompting() {
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
       message: "Parent Project name?",
       default: this._getConfigValue(constants.PROP_PROJECT_NAME),
       store: false
    }, {
       type: 'input',
       name: constants.PROP_PROJECT_DESCRIPTION,
       message: "Parent Project description?",
       default: this._getConfigValue(constants.PROP_PROJECT_DESCRIPTION),
       store: false
    },{
      type: 'input',
      name: constants.PROP_PROJECT_GROUP_ID,
      message: "Maven projects groupId?",
      default: this._getConfigValue(constants.PROP_PROJECT_GROUP_ID),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_PROJECT_ARTIFACT_ID,
      message: "Maven parent project artifactId?",
      default: this._getConfigValue(constants.PROP_PROJECT_ARTIFACT_ID),
      store: false
    }, {
      type: 'input',
      name: constants.PROP_PROJECT_VERSION,
      message: "Maven projects version?",
      default: this._getConfigValue(constants.PROP_PROJECT_VERSION),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_PROJECT_PACKAGE,
      message: "Package for Java classes?",
      default: function (readonlyProps) {
        return readonlyProps.projectGroupId;
      },
      store: true
    }, {
      type: 'list',
      name: constants.PROP_COMMUNITY_OR_ENTERPRISE,
      message: 'Would you like to use Community or Enterprise Edition for Repository and Share?',
      choices: ['Community', 'Enterprise'],
      default: this._getConfigValue(constants.PROP_COMMUNITY_OR_ENTERPRISE),
      store: true
    },

    // Questions related to the Alfresco Repository Extension Module
    {
      type: 'confirm',
      name: constants.PROP_INCLUDE_REPOSITORY_EXTENSION,
      message: 'Include project for Alfresco Repository Extension?',
      default: this._getConfigValue(constants.PROP_INCLUDE_REPOSITORY_EXTENSION),
      store: true
    },{
      type: 'input',
      name: constants.PROP_REPOSITORY_EXTENSION_ARTIFACT_ID,
      message: 'Repository Extension maven artifactId?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_ARTIFACT_ID),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeRepoExtension;
      }
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_EXTENSION_NAME,
      message: 'Repository Extension Name?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_NAME),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeRepoExtension;
      }
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_EXTENSION_DESCRIPTION,
      message: 'Repository Extension Description?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_DESCRIPTION),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeRepoExtension;
      }
    }, {
      type: 'list',
      name: constants.PROP_REPOSITORY_JAR_OR_AMP,
      message: 'Package Repo extension as JAR or AMP?',
      choices: ['JAR', 'AMP'],
      default: this._getConfigValue(constants.PROP_REPOSITORY_JAR_OR_AMP),
      store: false,
      when: function (currentAnswers) {
       return currentAnswers.includeRepoExtension;
      }
    }, {
      type: 'confirm',
      name: constants.PROP_REPOSITORY_EXTENSION_GENERATE_DOCKER_BUILD,
      message: 'Include project for Alfresco Repository Aggregator and Repository Docker Build?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_EXTENSION_GENERATE_DOCKER_BUILD),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_COMMUNITY_VERSION,
      message: 'Alfresco Repository Community version?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_COMMUNITY_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeRepoExtension || currentAnswers.repoExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Community';
      }
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_ENTERPRISE_VERSION,
      message: 'Alfresco Repository Enterprise version?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_ENTERPRISE_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeRepoExtension || currentAnswers.repoExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Enterprise';
      }
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_DOCKER_IMAGE_COMMUNITY_VERSION,
      message: 'Alfresco Repository Community Docker Image version?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_DOCKER_IMAGE_COMMUNITY_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeRepoExtension || currentAnswers.repoExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Community';
      }
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_DOCKER_IMAGE_ENTERPRISE_VERSION,
      message: 'Alfresco Repository Enterprise Docker Image version?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_DOCKER_IMAGE_ENTERPRISE_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeRepoExtension || currentAnswers.repoExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Enterprise';
      }
    }, {
      type: 'confirm',
      name: constants.PROP_REPOSITORY_ENABLE_HOTSWAP,
      message: 'Enable HotSwap Agent and DCEVM for Repository Extension?',
      default: this._getConfigValue(constants.PROP_REPOSITORY_ENABLE_HOTSWAP),
      store: false,
      when: function (currentAnswers) {
            return (currentAnswers.includeRepoExtension || currentAnswers.repoExtensionGenerateDockerBuild);
      }
    },

    // Questions related to the Alfresco Share Extension Module
    {
      type: 'confirm',
      name: constants.PROP_INCLUDE_SHARE_EXTENSION,
      message: 'Include project for Alfresco Share Extension?',
      default: this._getConfigValue(constants.PROP_INCLUDE_SHARE_EXTENSION),
      store: true
    },{
      type: 'input',
      name: constants.PROP_SHARE_EXTENSION_ARTIFACT_ID,
      message: 'Share Extension maven artifactId?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_ARTIFACT_ID),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeShareExtension;
      }
    }, {
      type: 'input',
      name: constants.PROP_SHARE_EXTENSION_NAME,
      message: 'Share Extension Name?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_NAME),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeShareExtension;
      }
    }, {
      type: 'input',
      name: constants.PROP_SHARE_EXTENSION_DESCRIPTION,
      message: 'Share Extension Description?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_DESCRIPTION),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeShareExtension;
      }
    }, {
      type: 'list',
      name: constants.PROP_SHARE_JAR_OR_AMP,
      message: 'Package Share extension as JAR or AMP?',
      choices: ['JAR', 'AMP'],
      default: this._getConfigValue(constants.PROP_SHARE_JAR_OR_AMP),
      store: false,
      when: function (currentAnswers) {
       return currentAnswers.includeShareExtension;
      }
    }, {
      type: 'confirm',
      name: constants.PROP_SHARE_EXTENSION_GENERATE_DOCKER_BUILD,
      message: 'Include project for Alfresco Share Aggregator and Share Docker Build?',
      default: this._getConfigValue(constants.PROP_SHARE_EXTENSION_GENERATE_DOCKER_BUILD),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_SHARE_COMMUNITY_VERSION,
      message: 'Alfresco Share Community version?',
      default: this._getConfigValue(constants.PROP_SHARE_COMMUNITY_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeShareExtension || currentAnswers.shareExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Community';
      }
    }, {
      type: 'input',
      name: constants.PROP_SHARE_ENTERPRISE_VERSION,
      message: 'Alfresco Share Enterprise version?',
      default: this._getConfigValue(constants.PROP_SHARE_ENTERPRISE_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeShareExtension || currentAnswers.shareExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Enterprise';
      }
    }, {
      type: 'input',
      name: constants.PROP_SHARE_DOCKER_IMAGE_COMMUNITY_VERSION,
      message: 'Alfresco Share Community Docker Image version?',
      default: this._getConfigValue(constants.PROP_SHARE_DOCKER_IMAGE_COMMUNITY_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeShareExtension || currentAnswers.shareExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Community';
      }
    }, {
      type: 'input',
      name: constants.PROP_SHARE_DOCKER_IMAGE_ENTERPRISE_VERSION,
      message: 'Alfresco Share Enterprise Docker Image version?',
      default: this._getConfigValue(constants.PROP_SHARE_DOCKER_IMAGE_ENTERPRISE_VERSION),
      store: true,
      when: function (currentAnswers) {
        return (currentAnswers.includeShareExtension || currentAnswers.shareExtensionGenerateDockerBuild) &&
               currentAnswers.communityOrEnterprise == 'Enterprise';
      }
    }, {
      type: 'confirm',
      name: constants.PROP_SHARE_ENABLE_HOTSWAP,
      message: 'Enable HotSwap Agent and DCEVM for Share Extension?',
      default: this._getConfigValue(constants.PROP_SHARE_ENABLE_HOTSWAP),
      store: false,
      when: function (currentAnswers) {
            return (currentAnswers.includeShareExtension || currentAnswers.shareExtensionGenerateDockerBuild);
      }
    },

    // Questions related to the Activiti Extension Module
    {
      type: 'confirm',
      name: constants.PROP_INCLUDE_ACTIVITI_EXTENSION,
      message: 'Include project for Activiti Extension?',
      default: this._getConfigValue(constants.PROP_INCLUDE_ACTIVITI_EXTENSION),
      store: true
    },{
      type: 'input',
      name: constants.PROP_ACTIVITI_EXTENSION_ARTIFACT_ID,
      message: 'Activiti extension maven artifactId?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_ARTIFACT_ID),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeActivitiExtension;
      }
    }, {
      type: 'input',
      name: constants.PROP_ACTIVITI_EXTENSION_NAME,
      message: 'Activiti Extension Name?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_NAME),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeActivitiExtension;
      }
    }, {
      type: 'input',
      name: constants.PROP_ACTIVITI_EXTENSION_DESCRIPTION,
      message: 'Activiti Extension Description?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_DESCRIPTION),
      store: false,
      when: function (currentAnswers) {
        return currentAnswers.includeActivitiExtension;
      }
    }, {
      type: 'input',
      name: constants.PROP_ACTIVITI_PROJECT_PACKAGE,
      message: "Package for Activiti Java classes (don't change unless you know what you are doing)?",
      default: this._getConfigValue(constants.PROP_ACTIVITI_PROJECT_PACKAGE),
      store: false,
      when: function (currentAnswers) {
       return currentAnswers.includeActivitiExtension;
      }
    }, {
      type: 'confirm',
      name: constants.PROP_ACTIVITI_EXTENSION_GENERATE_DOCKER_BUILD,
      message: 'Include project for Activiti Aggregator and Activiti Docker Build?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_EXTENSION_GENERATE_DOCKER_BUILD),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_ACTIVITI_VERSION,
      message: 'Activiti/APS version?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_VERSION),
      store: true,
      when: function (currentAnswers) {
        return currentAnswers.includeActivitiExtension || currentAnswers.activitiExtensionGenerateDockerBuild;
      }
    }, {
      type: 'input',
      name: constants.PROP_ACTIVITI_DOCKER_IMAGE_VERSION,
      message: 'Activiti/APS Docker Image version?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_DOCKER_IMAGE_VERSION),
      store: true,
      when: function (currentAnswers) {
        return currentAnswers.includeActivitiExtension || currentAnswers.activitiExtensionGenerateDockerBuild;
      }
    }, {
      type: 'confirm',
      name: constants.PROP_ACTIVITI_ENABLE_HOTSWAP,
      message: 'Enable DCEVM for Activiti Extension?',
      default: this._getConfigValue(constants.PROP_ACTIVITI_ENABLE_HOTSWAP),
      store: false,
      when: function (currentAnswers) {
            return (currentAnswers.includeActivitiExtension || currentAnswers.activitiExtensionGenerateDockerBuild);
      }
    },

    // General question about source code and runtime environment
    {
      type: 'confirm',
      name: constants.PROP_GENERATE_SAMPLE_SRC,
      message: 'Generate sample source code for all extensions?',
      default: this._getConfigValue(constants.PROP_GENERATE_SAMPLE_SRC),
      store: true
    }, {
      type: 'confirm',
      name: constants.PROP_INCLUDE_REPOSITORY_CALL_APS_SAMPLE,
      message: 'Generate Web Script sample with APS Rest Call in the Repo Extension project?',
      default: this._getConfigValue(constants.PROP_INCLUDE_REPOSITORY_CALL_APS_SAMPLE),
      store: true,
      when: function (currentAnswers) {
        return currentAnswers.includeRepoExtension;
      }
    }, {
      type: 'confirm',
      name: constants.PROP_INCLUDE_ACTIVITI_CALL_ACS_SAMPLE,
      message: 'Generate Service Task sample with ACS Rest Call in the Activiti Extension project?',
      default: this._getConfigValue(constants.PROP_INCLUDE_ACTIVITI_CALL_ACS_SAMPLE),
      store: true,
      when: function (currentAnswers) {
        return currentAnswers.includeActivitiExtension;
      }
    }, {
      type: 'confirm',
      name: constants.PROP_INCLUDE_DEVELOPMENT_RUNTIME_ENVIRONMENT,
      message: 'Generate a developer runtime environment based on Docker Compose?',
      default: this._getConfigValue(constants.PROP_INCLUDE_DEVELOPMENT_RUNTIME_ENVIRONMENT),
      store: true
    }, {
      type: 'confirm',
      name: constants.PROP_ENABLE_INBOUND_EMAIL_SERVER,
      message: 'Enable Inbound Email Server?',
      default: this._getConfigValue(constants.PROP_ENABLE_INBOUND_EMAIL_SERVER),
      store: true,
      when: function (currentAnswers) {
        return currentAnswers.includeDevRuntimeEnv && (currentAnswers.includeRepoExtension || currentAnswers.includeShareExtension);
      }
    }, {
      type: 'confirm',
      name: constants.PROP_ENABLE_OUTBOUND_EMAIL_SERVER,
      message: 'Enable Outbound Email Server?',
      default: this._getConfigValue(constants.PROP_ENABLE_OUTBOUND_EMAIL_SERVER),
      store: true,
      when: function (currentAnswers) {
        return currentAnswers.includeDevRuntimeEnv && (currentAnswers.includeRepoExtension || currentAnswers.includeShareExtension);
      }
    }];

    return this.prompt(questionPrompts).then(function (props) {
      this.props = props;
    }.bind(this));
  }

  // If the method name doesn’t match a priority, it will be pushed to this group
  default() {
    // Check root directory
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

    // Save configuration
    this.log('Creating .yo-rc.json file...');
    // To access props later use for example this.config.get(constants.PROP_PROJECT_ARTIFACT_ID)

    this._saveProps([
      // General project props
      constants.PROP_COMMUNITY_OR_ENTERPRISE,
      constants.PROP_PROJECT_ARTIFACT_ID,
      constants.PROP_PROJECT_ARTIFACT_ID_PREFIX,
      constants.PROP_PROJECT_GROUP_ID,
      constants.PROP_PROJECT_PACKAGE,
      constants.PROP_PROJECT_VERSION,
      constants.PROP_PROJECT_NAME,
      constants.PROP_PROJECT_DESCRIPTION,
      constants.PROP_GENERATE_SAMPLE_SRC,
      constants.PROP_INCLUDE_DEVELOPMENT_RUNTIME_ENVIRONMENT,
      constants.PROP_ENABLE_INBOUND_EMAIL_SERVER,
      constants.PROP_ENABLE_OUTBOUND_EMAIL_SERVER,

      // Repo extension props
      constants.PROP_INCLUDE_REPOSITORY_EXTENSION,
      constants.PROP_REPOSITORY_EXTENSION_ARTIFACT_ID,
      constants.PROP_REPOSITORY_EXTENSION_NAME,
      constants.PROP_REPOSITORY_EXTENSION_DESCRIPTION,
      constants.PROP_REPOSITORY_EXTENSION_GENERATE_DOCKER_BUILD,
      constants.PROP_REPOSITORY_COMMUNITY_VERSION,
      constants.PROP_REPOSITORY_DOCKER_IMAGE_COMMUNITY_VERSION,
      constants.PROP_REPOSITORY_ENTERPRISE_VERSION,
      constants.PROP_REPOSITORY_DOCKER_IMAGE_ENTERPRISE_VERSION,
      constants.PROP_REPOSITORY_JAR_OR_AMP,
      constants.PROP_REPOSITORY_ENABLE_HOTSWAP,

      // Share extension props
      constants.PROP_INCLUDE_SHARE_EXTENSION,
      constants.PROP_SHARE_EXTENSION_ARTIFACT_ID,
      constants.PROP_SHARE_EXTENSION_NAME,
      constants.PROP_SHARE_EXTENSION_DESCRIPTION,
      constants.PROP_SHARE_EXTENSION_GENERATE_DOCKER_BUILD,
      constants.PROP_SHARE_COMMUNITY_VERSION,
      constants.PROP_SHARE_DOCKER_IMAGE_COMMUNITY_VERSION,
      constants.PROP_SHARE_ENTERPRISE_VERSION,
      constants.PROP_SHARE_DOCKER_IMAGE_ENTERPRISE_VERSION,
      constants.PROP_SHARE_JAR_OR_AMP,
      constants.PROP_SHARE_ENABLE_HOTSWAP,

      // Activiti extension props
      constants.PROP_INCLUDE_ACTIVITI_EXTENSION,
      constants.PROP_ACTIVITI_EXTENSION_ARTIFACT_ID,
      constants.PROP_ACTIVITI_EXTENSION_NAME,
      constants.PROP_ACTIVITI_EXTENSION_DESCRIPTION,
      constants.PROP_ACTIVITI_EXTENSION_GENERATE_DOCKER_BUILD,
      constants.PROP_ACTIVITI_VERSION,
      constants.PROP_ACTIVITI_DOCKER_IMAGE_VERSION,
      constants.PROP_ACTIVITI_PROJECT_PACKAGE,
      constants.PROP_INCLUDE_ACTIVITI_CALL_ACS_SAMPLE
    ],
    this.props);
  }

  // Where you write the generator specific files (routes, controllers, etc)
  writing() {
    this.log('Writing project files...');

    var tempRepoVersion;
    var tempRepoDockerImageVersion;
    var tempShareVersion;
    var tempShareDockerImageVersion;
    if (this.props.communityOrEnterprise == 'Community') {
      tempRepoVersion = this.props.repoCommunityVersion;
      tempRepoDockerImageVersion = this.props.repoDockerImageCommunityVersion;
      tempShareVersion = this.props.shareCommunityVersion;
      tempShareDockerImageVersion = this.props.shareDockerImageCommunityVersion;
    } else {
      tempRepoVersion = this.props.repoEnterpriseVersion;
      tempRepoDockerImageVersion = this.props.repoDockerImageEnterpriseVersion;
      tempShareVersion = this.props.shareEnterpriseVersion;
      tempShareDockerImageVersion = this.props.shareDockerImageEnterpriseVersion;
    }

    // Find out the Activiti Minor version, used when producing the custom Docker Image
    if (typeof this.props.activitiDockerImageVersion !== "undefined") {
      var imageMinorVersionStr = this.props.activitiDockerImageVersion.substr(0,3);
      var activitiDockerImageMinorVersion = parseFloat(imageMinorVersionStr);
    }

    // Figure out in what situations we need to include the Repository Container and Share Container
    // in the Runner config (i.e. in Docker Compose file)
    // It is probably a good idea to always include both of these together, even if you are just developing
    // a Repo Web Script, you might want to check something in the Alfresco Share UI.
    // Vice Versa, if you are including just Share extensions or aggregator, then you need the Repo when running.
    // We also need these containers running when we are building something in Activiti that should talk to the
    // ACS ReST API.
    var includeRepoAndShareContainersInRunner =
      (this.props.includeRepoExtension == true ||
       this.props.repoExtensionGenerateDockerBuild == true ||
       this.props.includeShareExtension == true ||
       this.props.shareExtensionGenerateDockerBuild == true ||
       this.props.includeActivitiCallAcsSample == true);

    // Figure out in what situations we need to include the Activiti/APS Container
    // in the Runner config (i.e. in Docker Compose file)
    // Note. we need this container when we build something on the Repo side that calls the APS ReST API.
    var includeActivitiContainerInRunner =
      (this.props.includeActivitiExtension == true ||
       this.props.activitiExtensionGenerateDockerBuild == true ||
       this.props.includeRepoCallApsSample == true);

    // Template Context
    var tplContext = {

      // General project properties
      communityOrEnterprise: this.props.communityOrEnterprise,
      groupId: this.props.projectGroupId,
      artifactId: this.props.projectArtifactId,
      version: this.props.projectVersion,
      package: this.props.projectPackage,
      name: this.props.projectName,
      description: this.props.projectDescription,
      generateSampleSrcCode: this.props.generateSampleSrcCode,
      includeDevRuntimeEnv: this.props.includeDevRuntimeEnv,
      enableInboundEmailServer: this.props.enableInboundEmailServer,
      enableOutboundEmailServer: this.props.enableOutboundEmailServer,

      // Repository Extension properties
      includeRepoExtension: this.props.includeRepoExtension,
      repoExtensionArtifactId: this.props.repoExtensionArtifactId,
      repoExtensionName: this.props.repoExtensionName,
      repoExtensionDescription: this.props.repoExtensionDescription,
      repoExtensionGenerateDockerBuild: this.props.repoExtensionGenerateDockerBuild,
      repoVersion: tempRepoVersion,
      repoDockerImageVersion: tempRepoDockerImageVersion,
      repoJarOrAmp: this.props.repoJarOrAmp,
      includeRepoCallApsSample: this.props.includeRepoCallApsSample,
      includeRepoAndShareContainersInRunner: includeRepoAndShareContainersInRunner,
      repoEnableHotSwap: this.props.repoEnableHotSwap,

      // Share Extension properties
      includeShareExtension: this.props.includeShareExtension,
      shareExtensionArtifactId: this.props.shareExtensionArtifactId,
      shareExtensionName: this.props.shareExtensionName,
      shareExtensionDescription: this.props.shareExtensionDescription,
      shareExtensionGenerateDockerBuild: this.props.shareExtensionGenerateDockerBuild,
      shareVersion: tempShareVersion,
      shareDockerImageVersion: tempShareDockerImageVersion,
      shareJarOrAmp: this.props.shareJarOrAmp,
      shareEnableHotSwap: this.props.shareEnableHotSwap,

      // Activiti Extension properties
      includeActivitiExtension: this.props.includeActivitiExtension,
      activitiExtensionArtifactId: this.props.activitiExtensionArtifactId,
      activitiExtensionName: this.props.activitiExtensionName,
      activitiExtensionDescription: this.props.activitiExtensionDescription,
      activitiExtensionGenerateDockerBuild: this.props.activitiExtensionGenerateDockerBuild,
      activitiVersion: this.props.activitiVersion,
      activitiDockerImageVersion: this.props.activitiDockerImageVersion,
      activitiDockerImageMinorVersion: activitiDockerImageMinorVersion,
      activitiPackage: this.props.activitiProjectPackage,
      includeActivitiCallAcsSample: this.props.includeActivitiCallAcsSample,
      includeActivitiContainerInRunner: includeActivitiContainerInRunner,
      activitiEnableHotSwap: this.props.activitiEnableHotSwap
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // Copy parent project files and some general build files
    this._copyAsTemplate("aio/", "", "pom.xml", tplContext);
    this._copyAsTemplate("aio/", "", "README.md", tplContext);
    this._copyAsTemplate("aio/", "", "build-all.sh", tplContext);
    if (this.props.includeActivitiExtension) {
      this._copyAsTemplate("aio/", "", "build-activiti-extension.sh", tplContext);
    }
    if (this.props.activitiExtensionGenerateDockerBuild) {
      this._copyAsTemplate("aio/", "", "build-activiti-docker-image.sh", tplContext);
      this._copyAsTemplate("aio/", "", "update-activiti-container.sh", tplContext);
    }
    if (this.props.includeRepoExtension) {
      this._copyAsTemplate("aio/", "", "build-repo-extension.sh", tplContext);
    }
    if (this.props.repoExtensionGenerateDockerBuild) {
      this._copyAsTemplate("aio/", "", "build-repo-docker-image.sh", tplContext);
      this._copyAsTemplate("aio/", "", "update-repo-container.sh", tplContext);
    }
    if (this.props.includeShareExtension) {
      this._copyAsTemplate("aio/", "", "build-share-extension.sh", tplContext);
    }
    if (this.props.shareExtensionGenerateDockerBuild) {
      this._copyAsTemplate("aio/", "", "build-share-docker-image.sh", tplContext);
      this._copyAsTemplate("aio/", "", "update-share-container.sh", tplContext);
    }
    if (this.props.includeDevRuntimeEnv) {
      this._copyAsTemplate("aio/", "", "run.sh", tplContext);
      this._copyAsTemplate("aio/", "", "stop.sh", tplContext);
    }

    // Common paths
    var alfrescoModulePath = '/src/main/resources/alfresco/module/';
    var metaInfResourcesDirPath = 'META-INF/resources/';

    if (this.props.includeRepoExtension) {
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Repository Extension Module files
      var templateRepoModuleId = 'repo-extension';
      var repoExtensionTemplateSrcMainDir = 'aio/' + templateRepoModuleId + '/src/main/';
      var repoExtensionTemplateModuleDir = 'aio/' + templateRepoModuleId + '/' + alfrescoModulePath + templateRepoModuleId + '/';

      this._copyAsTemplate("aio/" + templateRepoModuleId + "/", this.props.repoExtensionArtifactId + "/", "pom.xml", tplContext);

      if (this.props.repoJarOrAmp == 'AMP') {
        var fileSrc = repoExtensionTemplateSrcMainDir + 'assembly/';
        var fileDst = this.props.repoExtensionArtifactId + '/src/main/assembly/';
        this._copyAsTemplate(fileSrc, fileDst, "amp.xml", tplContext);
      }

      if (this.props.generateSampleSrcCode) {
        fileSrc = repoExtensionTemplateSrcMainDir + 'java/org/alfresco/tutorial/reposamples/';
        fileDst = this.props.repoExtensionArtifactId + '/src/main/java/' + this.props.projectPackage.replace(/\./gi, '/') +
          '/reposamples/';
        this._copyAsTemplate(fileSrc, fileDst, "Demo.java", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "DemoComponent.java", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "DemoRepoAction.java", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "HelloWorldWebScript.java", tplContext);
        if (this.props.includeRepoCallApsSample) {
          this._copyAsTemplate(fileSrc, fileDst, "CallApsWebScript.java", tplContext);
        }

        var repoExtensionTemplateResourcesDir = repoExtensionTemplateSrcMainDir + 'resources/';
        var repoExtensionResourcesDir = this.props.repoExtensionArtifactId + '/src/main/resources/';
        var webScriptDirPath = 'alfresco/extension/templates/webscripts/alfresco/tutorials/';
        fileSrc = repoExtensionTemplateResourcesDir + webScriptDirPath;
        fileDst = repoExtensionResourcesDir + webScriptDirPath;
        this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.desc.xml", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.html.ftl", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "helloworld.get.js", tplContext);
        if (this.props.includeRepoCallApsSample) {
          this._copyAsTemplate(fileSrc, fileDst, "callaps.get.desc.xml", tplContext);
          this._copyAsTemplate(fileSrc, fileDst, "callaps.get.html.ftl", tplContext);
        }
      }

      var repoModulePathDst = this.props.repoExtensionArtifactId + alfrescoModulePath + this.props.repoExtensionArtifactId + '/';
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

      fileSrc = repoExtensionTemplateResourcesDir + metaInfResourcesDirPath;
      fileDst = repoExtensionResourcesDir + metaInfResourcesDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "test.html", tplContext);

      if (this.props.repoEnableHotSwap) {
        this._copyAsTemplate(repoExtensionTemplateResourcesDir, repoExtensionResourcesDir, "hotswap-agent.properties", tplContext);
      }
    }
    if (this.props.repoExtensionGenerateDockerBuild) {
      var templateRepoDockerDir = 'repo-aggregator-docker';
      this._copyAsTemplate("aio/" + templateRepoDockerDir + "/", templateRepoDockerDir + "/", "pom.xml", tplContext);
      this._copyAsTemplate("aio/" + templateRepoDockerDir + "/", templateRepoDockerDir + "/", "Dockerfile", tplContext);
    }

    if (this.props.includeShareExtension) {
      //////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Share Extension Module files
      var templateShareModuleId = 'share-extension';
      var webExtensionPath = '/src/main/resources/alfresco/web-extension/';
      var shareExtensionTemplateSrcMainDir = 'aio/' + templateShareModuleId + '/src/main/';
      var shareExtensionTemplateModuleDir = 'aio/' + templateShareModuleId + '/' + alfrescoModulePath + templateShareModuleId + '/';
      var shareExtensionTemplateWebExtensionDir = 'aio/' + templateShareModuleId + webExtensionPath;

      this._copyAsTemplate("aio/" + templateShareModuleId + "/", this.props.shareExtensionArtifactId + "/", "pom.xml", tplContext);

      if (this.props.shareJarOrAmp == 'AMP') {
        fileSrc = shareExtensionTemplateSrcMainDir + 'assembly/';
        fileDst = this.props.shareExtensionArtifactId + '/src/main/assembly/';
        this._copyAsTemplate(fileSrc, fileDst, "amp.xml", tplContext);
      }

      var shareModulePathDst = this.props.shareExtensionArtifactId + alfrescoModulePath + this.props.shareExtensionArtifactId + '/';
      fileSrc = shareExtensionTemplateModuleDir;
      fileDst = shareModulePathDst;
      this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);

      fileSrc = shareExtensionTemplateWebExtensionDir;
      fileDst = this.props.shareExtensionArtifactId + webExtensionPath;
      this._copyAsTemplate(fileSrc, fileDst, "custom-slingshot-application-context.xml", tplContext);

      fileSrc = shareExtensionTemplateModuleDir;
      fileDst = shareModulePathDst;
      this._copyAsTemplate(fileSrc, fileDst, "module.properties", tplContext);

      var messagesDirPath = 'messages/';
      fileSrc = shareExtensionTemplateWebExtensionDir + messagesDirPath;
      fileDst = this.props.shareExtensionArtifactId + webExtensionPath + messagesDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "custom.properties", tplContext);

      var siteDataExtensionsDirPath = 'site-data/extensions/';
      fileSrc = shareExtensionTemplateWebExtensionDir + siteDataExtensionsDirPath;
      fileDst = this.props.shareExtensionArtifactId + webExtensionPath + siteDataExtensionsDirPath;
      this._copyAsTemplate(fileSrc, fileDst, "extension-modules.xml", tplContext);

      if (this.props.generateSampleSrcCode) {
        webScriptDirPath = 'site-webscripts/com/example/pages/';
        fileSrc = shareExtensionTemplateWebExtensionDir + webScriptDirPath;
        fileDst = this.props.shareExtensionArtifactId + webExtensionPath + webScriptDirPath;
        this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.desc.xml", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.html.ftl", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "simple-page.get.js", tplContext);

        var tutorialWidgetsPath = "/js/tutorials/widgets";
        var widgetsResourcesSrcPath = metaInfResourcesDirPath + templateShareModuleId + tutorialWidgetsPath;
        var widgetsResourcesDstPath = metaInfResourcesDirPath + this.props.shareExtensionArtifactId + tutorialWidgetsPath;
        fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + '/css/';
        fileDst = this.props.shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/css/';
        this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.css", tplContext);
        fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + '/i18n/';
        fileDst = this.props.shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/i18n/';
        this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.properties", tplContext);
        fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + '/templates/';
        fileDst = this.props.shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/templates/';
        this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.html", tplContext);
        fileSrc = shareExtensionTemplateSrcMainDir + 'resources/' + widgetsResourcesSrcPath + "/";
        fileDst = this.props.shareExtensionArtifactId + '/src/main/resources/' + widgetsResourcesDstPath + '/';
        this._copyAsTemplate(fileSrc, fileDst, "TemplateWidget.js", tplContext);
      }

      var shareExtensionTemplateResourcesDir = shareExtensionTemplateSrcMainDir + 'resources/';
      var shareExtensionResourcesDir = this.props.shareExtensionArtifactId + '/src/main/resources/';
      fileSrc = shareExtensionTemplateResourcesDir + 'META-INF/';
      fileDst = shareExtensionResourcesDir + 'META-INF/';
      this._copyAsTemplate(fileSrc, fileDst, "share-config-custom.xml", tplContext);

      if (this.props.shareEnableHotSwap) {
        this._copyAsTemplate(shareExtensionTemplateResourcesDir, shareExtensionResourcesDir, "hotswap-agent.properties", tplContext);
      }
    }
    if (this.props.shareExtensionGenerateDockerBuild) {
      var templateShareDockerDir = 'share-aggregator-docker';
      this._copyAsTemplate("aio/" + templateShareDockerDir + "/", templateShareDockerDir + "/", "pom.xml", tplContext);
      this._copyAsTemplate("aio/" + templateShareDockerDir + "/", templateShareDockerDir + "/", "Dockerfile", tplContext);
    }

    if (this.props.includeActivitiExtension) {
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Activiti Extension Module files
      var templateActivitiModuleId = 'activiti-extension';
      var activitiExtensionTemplateSrcMainDir = 'aio/' + templateActivitiModuleId + '/src/main/';

      this._copyAsTemplate("aio/" + templateActivitiModuleId + "/", this.props.activitiExtensionArtifactId + "/", "pom.xml", tplContext);

      if (this.props.generateSampleSrcCode) {
        fileSrc = activitiExtensionTemplateSrcMainDir + 'java/com/activiti/extension/bean/';
        fileDst = this.props.activitiExtensionArtifactId + '/src/main/java/' + this.props.activitiProjectPackage.replace(/\./gi, '/') + '/';
        this._copyAsTemplate(fileSrc, fileDst, "SimpleJavaDelegate.java", tplContext);
        this._copyAsTemplate(fileSrc, fileDst, "SimpleSpringJavaDelegate.java", tplContext);
        if (this.props.includeActivitiCallAcsSample) {
          this._copyAsTemplate(fileSrc, fileDst, "CallAcsSpringJavaDelegate.java", tplContext);
        }
      }
    }
    if (this.props.activitiExtensionGenerateDockerBuild) {
      var templateActivitiDockerDir = 'activiti-aggregator-docker';
      this._copyAsTemplate("aio/" + templateActivitiDockerDir + "/", templateActivitiDockerDir + "/", "pom.xml", tplContext);
      this._copyAsTemplate("aio/" + templateActivitiDockerDir + "/", templateActivitiDockerDir + "/", "Dockerfile", tplContext);
    }

    if (this.props.includeActivitiCallAcsSample || this.props.includeRepoCallApsSample) {
      // Copy Process App Sample with some process definitions
      templateActivitiModuleId = 'activiti-process-samples/';
      fileSrc = 'aio/' + templateActivitiModuleId;
      fileDst = templateActivitiModuleId;
      this._copyAsTemplate(fileSrc, fileDst, "Sample App.zip", tplContext);
    }

    if (this.props.includeDevRuntimeEnv) {
      ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
      // Copy Runner files
      var fileSrc = 'aio/runner/docker-compose/';
      var fileDst = 'runner/docker-compose/';
      var acsRunnerConfigSrcDir = fileSrc + 'acs/';
      var acsLicenseRunnerConfigSrcDir = acsRunnerConfigSrcDir + 'license/'
      var apsRunnerConfigSrcDir = fileSrc + 'aps/';
      var apsLicenseRunnerConfigSrcDir = apsRunnerConfigSrcDir + 'enterprise-license/'
      var dbRunnerConfigSrcDir = fileSrc + 'docker-postgresql-multiple-databases/';

      this._copyAsTemplate(fileSrc, fileDst, "docker-compose.yml", tplContext);
      if (includeRepoAndShareContainersInRunner == true) {
        this._copyAsTemplate(acsRunnerConfigSrcDir, fileDst + 'acs/', "alfresco-global.properties", tplContext);
        this._copyAsTemplate(acsRunnerConfigSrcDir, fileDst + 'acs/', "log4j.properties", tplContext);
        if (this.props.communityOrEnterprise == 'Enterprise') {
          this._copyAsTemplate(acsLicenseRunnerConfigSrcDir, fileDst + 'acs/license/', "README.md", tplContext);
        }
      }
      if (includeActivitiContainerInRunner == true) {
        this._copyAsTemplate(apsRunnerConfigSrcDir, fileDst + 'aps/', "activiti-app.properties", tplContext);
        this._copyAsTemplate(apsRunnerConfigSrcDir, fileDst + 'aps/', "log4j.properties", tplContext);
        this._copyAsTemplate(apsLicenseRunnerConfigSrcDir, fileDst + 'aps/enterprise-license/', "README.md", tplContext);
      }
      this._copyAsTemplate(dbRunnerConfigSrcDir, fileDst + 'docker-postgresql-multiple-databases/', "create-multiple-postgresql-databases.sh", tplContext);
    }
  }

  // Where installations are run (npm, bower)
  install() {
    this.log('Nothing to install in npm repo...');

    //this.installDependencies();
  }

  /*********************************************************************************************************************
   *  Private methods not part of Yeoman run loop */

  /**
   * Get saved property value or the default one.
   */
  _getConfigValue(key) {
    if (!_.isNil(key)) {
      if (!_.isNil(this.config.get(key))) {
        // The user has set this property before to a custom value, use it
        return this.config.get(key);
      } else if (this.defaultConfig) {
        // No previous saved custom value, use default
        return this.defaultConfig[key];
      }
    }
    return undefined;
  }

  _saveProp(propName, propObject) {
    var value = propObject[propName];
    this[propName] = value;
    this.config.set(propName, value);
  }

  _saveProps(propNames, propObject) {
    propNames.forEach(function (propName) {
      this._saveProp(propName, propObject);
    }.bind(this));
  }

  _copyAsTemplate(fileSrcDir, fileDstDir, fileName, tplContext) {
    this.fs.copyTpl(
      this.templatePath(fileSrcDir + fileName),
      this.destinationPath(fileDstDir + fileName),
      tplContext
    );
  }
}
