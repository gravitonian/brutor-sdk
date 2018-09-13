'use strict';
var alflogo = require('alfresco-logo');
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var path = require('path');
var _ = require('lodash');

var constants = require('../common/constants.js');

module.exports = yeoman.Base.extend({

  // Arguments and options should be defined in the constructor.
  constructor: function () {
    yeoman.Base.apply(this, arguments);

    //this.out.docs(
    //'An Action is a discrete unit of work that can be invoked repeatedly. It can be invoked from a number of Alfresco features, such as Folder Rules, Workflows, Web Scripts, and Scheduled Jobs.',
    //'http://docs.alfresco.com/5.1/references/dev-extension-points-actions.html');
  },

  /*********************************************************************************************************************
   * Methods that are part of Yeoman environment run loop */

  initializing: function () {
    this.props = {};

    var defaultActionTitle = "Sample Action";
    var defaultActionDesc = "Sample Repository Action";
    this.defaultConfig = {
      projectPackage: 'org.alfresco',
      repoActionsPackageName: 'actions',
      repoActionTitle: defaultActionTitle,
      repoActionDesc: defaultActionDesc
    };
  },

  prompting: function () {
    // Show a welcome message
    this.log(alflogo(
      'Welcome to the Alfresco Repository Action Generator!\n',
      {'left-pad': '     '}));

    // Set up a list of properties we need user to supply values for
    var prompts = [{
      type: 'input',
      name: constants.PROP_PROJECT_PACKAGE,
      message: "Base Java package for this repository module?",
      default: this._getConfigValue(constants.PROP_PROJECT_PACKAGE),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_ACTIONS_PACKAGE_NAME,
      message: "Java package name for all repository actions?",
      default: this._getConfigValue(constants.PROP_REPOSITORY_ACTIONS_PACKAGE_NAME),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_ACTION_TITLE,
      message: "Repository Action Title?",
      default: this._getConfigValue(constants.PROP_REPOSITORY_ACTION_TITLE),
      store: true
    }, {
      type: 'input',
      name: constants.PROP_REPOSITORY_ACTION_DESC,
      message: "Repository Action Description?",
      default: this._getConfigValue(constants.PROP_REPOSITORY_ACTION_DESC),
      store: true
    }];

    return this.prompt(prompts).then(function (props) {
      this.props = props;

      // To access props later use for example this.config.get(constants.PROP_PROJECT_ARTIFACT_ID)
      this._saveProps([
        constants.PROP_PROJECT_PACKAGE,
        constants.PROP_REPOSITORY_ACTIONS_PACKAGE_NAME,
        constants.PROP_REPOSITORY_ACTION_TITLE,
        constants.PROP_REPOSITORY_ACTION_DESC
      ], props);
    }.bind(this));
  },

  writing: {
    writeProjectFiles: function () {
      this.log('Writing platform action files...');

      var actionId = _.kebabCase(this.props.repoActionTitle);
      var artifactId = process.env.PWD.split(path.sep).pop();
      this.log('Artifact ID: ' + artifactId);
      var className = _.upperFirst(_.camelCase(this.props.repoActionTitle)) + 'ActionExecuter';
      var tplContext = {
        actionId: actionId,
        actionTitle: this.props.repoActionTitle,
        actionDescription: this.props.repoActionDesc,
        artifactId: artifactId,
        className: className,
        package: this.props.projectPackage,
        actionsPackageName: this.props.repoActionsPackageName
      };

      // Set new destination root based on what platform artifact module this generator is run from
      this.destinationRoot(this.destinationPath(process.env.PWD));

      var classSrc = this.templatePath('ActionExecuter.java');
      var contextSrc = this.templatePath('platform-action-context.xml');
      var messagesSrc = this.templatePath('platform-action.properties');

      var packagePath = this.props.projectPackage.replace(/\./gi, '/') + '/' + this.props.repoActionsPackageName;
      var platformModulePath = 'src/main/resources/alfresco/module/' + artifactId;
      var springContextPath = platformModulePath + '/context/';
      var messagesPath = platformModulePath + '/messages/';

      var classDst = 'src/main/java/' + packagePath + '/' + className + '.java';
      var contextDst = springContextPath + 'action-' + actionId + '-context.xml';
      var messagesDst = messagesPath + artifactId + '-' + actionId + '-platform-action.properties';

      this.fs.copyTpl(classSrc, classDst, tplContext);
      this.fs.copyTpl(contextSrc, contextDst, tplContext);
      this.fs.copyTpl(messagesSrc, messagesDst, tplContext);
    }
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

});
