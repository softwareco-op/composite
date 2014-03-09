var requirejs = require('requirejs');

requirejs.config({
    nodeRequire: require,
    baseUrl : 'src',
    shim: {
        underscore: {
            exports: '_'
        }
    }
});


global.requirejs = requirejs;

requirejs(['Loader/ModuleServiceLoader', 'Configuration/Modules', 'Service'],
function(ModuleServiceLoader, environmentModules, Service) {

    //Depend on Server and client task
    //-won't work on client
    //--test runs against node
    //--test setup in karma,mocha
    //ServerTask configures server loaders
    //ClientTask configures client loaders

    // function taskRunner (error, modules) {
    //     //Get the task service and start it.
    //     var Task = Service.getService('Task/Task');
    //     Task.startService();
    // }

    var serverContext = requirejs(['Task/TimeServerContext'], function(TimeServerContext) {
        var timeServerContext = new TimeServerContext();
        timeServerContext.timeMessageListenerServiceLoader().startService();
    });



    // //Load the hawk module descriptions for this environment
    // environmentModules(function(hawkModuleDescriptions) {
    //     console.log('service modules: ' + hawkModuleDescriptions.serviceModules);
    //     loader.loadConfiguration(hawkModuleDescriptions.serviceModules, taskRunner);
    // });


});
