var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    'initializing' : function () {
        this.config.set('example','Logo');
        this.composeWith('samsara:example');
    }
});