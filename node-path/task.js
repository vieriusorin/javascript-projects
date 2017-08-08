var Task = function(name) {
  this.name = name;
  this.completed = false;
}

/* This we create a Complete prototype for Task object */
Task.prototype.complete = function() {
  console.log('Completing task ' + this.name);
  this.completed = true;
}

/* This we create a Save prototype for Task object */
Task.prototype.save = function() {
  console.log('Saved task ' + this.name);
}

/* This we export the module to separate the files */
module.exports = Task;