var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    init: function (){
        this.config.app='app';
        this.config.dist='dist';
    },
    promptUser: function () {
        
        console.log('Making a Samsara project!');
        
        var prompts = [
            {
                type: 'input',
                name: 'projectName',
                message: 'What\'s the project name?',
                default: this.config.get('projectName') || this.appname
            },
            {
                type: 'input',
                name: 'description',
                message: 'How would you describe the project?',
                default: this.config.get('description') || ''
            },
            {
                type: 'confirm',
                name: 'isWebApp',
                message: 'Would you like the project to be mobile web app capable?'
            },
        ];
        
        return this.prompt(prompts).then(function (answers){
            this.config.set(answers);
        }.bind(this));
   },
   app: function(){
       this.template('app/index.html');
       this.copy('app/src/main.js');
       this.copy('app/src/Cube.js');
       this.copy('app/src/requireConfig.js');
       this.copy('app/styles/app.css');
   },
   framework: function(){
       this.template('bower.json');
       this.template('package.json');
       this.template('grunt');
       this.copy('Gruntfile.js');
       this.copy('.bowerrc');
   }
});