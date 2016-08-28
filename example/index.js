var generators = require('yeoman-generator');
var chalk = require('chalk');

module.exports = generators.Base.extend({
    initializing:function(){
        

    },
    prompting: function () {
        
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
            }
        ];
        if(!this.config.get('example'))
        {
            prompts.unshift({
                    type: 'list',
                    name: 'example',
                    message: 'Which example would you like?',
                    choices: [
                        'Logo',
                        'Cube',
                        'Layouts',
                        'ParallaxCats',
                        'Carousel',
                        'SideMenu',
                        'SafariTabs',
                        'GoogleNow'

                    ]
                });
        }
        
        return this.prompt(prompts).then(function (answers){
            this.config.set(answers);
        }.bind(this));
   },
   writing: {
       templates: function(){
           console.log('Hey! Let me fetch the templates, one moment...');
           if(!this.fs.exists(this.templatePath('samsara/package.json')))
           {
                this.spawnCommandSync('git',['clone','https://github.com/dmvaldman/samsara.git', this.templatePath('samsara')]);
           }
           this.spawnCommandSync('git',['-C',this.templatePath('samsara'),'pull']);
       },
        app: function(){
            this.fs.copy(
                this.templatePath('samsara/examples/'+this.config.get('example')),
                this.destinationPath('app')
                );
            if(this.config.get('notNew'))
            {}
            else{
                this.fs.delete(this.destinationPath('app/index.html'));
                this.fs.delete(this.destinationPath('app/js/lib/require.js'));
            }
            this.template('app/index.html');
            this.copy('app/js/requireConfig.js');

            this.config.set('notNew',true);
        },
        framework: function(){
            this.template('bower.json');
            this.template('package.json');
            this.copy('Gruntfile.js');
            this.copy('.bowerrc');
            this.fs.copy(this.templatePath('gitignore'),this.destinationPath('.gitignore'));
            this.template('README.md');
        },
        grunt: function(){
                this.fs.copy(
                    this.templatePath('grunt/aliases.js'),
                    this.destinationPath('grunt/aliases.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/watch.js'),
                    this.destinationPath('grunt/watch.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/connect.js'),
                    this.destinationPath('grunt/connect.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/clean.js'),
                    this.destinationPath('grunt/clean.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/rev.js'),
                    this.destinationPath('grunt/rev.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/processhtml.js'),
                    this.destinationPath('grunt/processhtml.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/useminPrepare.js'),
                    this.destinationPath('grunt/useminPrepare.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/usemin.js'),
                    this.destinationPath('grunt/usemin.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/htmlmin.js'),
                    this.destinationPath('grunt/htmlmin.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/copy.js'),
                    this.destinationPath('grunt/copy.js')
                    );
                this.fs.copy(
                    this.templatePath('grunt/requirejs.js'),
                    this.destinationPath('grunt/requirejs.js')
                    );
        }
    },
   install: function()
   {
       this.installDependencies()
   },
   end: function()
   {
       console.log('Good to go, give it a '+chalk.green('grunt serve')+' to see it in action.');
   }
});