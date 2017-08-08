'use strict'

class Task {
  constructor(name) {
    this.name = name;
    this.completed = false;
  };

  complete() {
    console.log('Completing task ' + this.name);
    this.completed = true;
  };

  save() {
    console.log('Saving Task ' + this.name);
  };
}

/* Here we create different tasks */
var task1 = new Task("Learn javascript");
var task2 = new Task("Learn Node");
var task3 = new Task("Learn something");
var task4 = new Task("Learn to be good");

/* Here we show the task based on the progress */
task1.save();
task2.save();
task3.save();
task4.complete();