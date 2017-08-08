var Task = require('./task');
var Repo = require('./taskRepository');

var task1 = new Task(Repo.get(1));

var task2 = new Task({name: 'learn everyday'});

task1.save();
task2.save();
// task3.save();
// task4.complete();