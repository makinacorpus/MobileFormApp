var gulp = require("gulp");

var osTask = require("../config").osTask;

// Default install tasks
var tasks = ["bower-install"];
var nbTasks = tasks.length;

// Add the corresponding tasks to os passed as parameters
for(var i = 0; i < process.argv.length-1; i++) {
	var param = process.argv[i];
	var value = process.argv[i+1];
	if(param == "--os") {
		if(value == "all") { // Add all os
			for(var os in osTask) {
				var gulpTask = osTask[os];
				if(tasks.indexOf(gulpTask) < 0) { // Task not added
					tasks.push(gulpTask);
				} else { } // Task already added
			}
		} else { // Add specific os
			if(osTask[value]) { // know os gulp task
				if(tasks.indexOf(osTask[value]) > 0) {
					console.error("Task for "+ value +" init is already added");
				} else {
					tasks.push(osTask[value]);
				}
			} else { // unknow os gulp task
				console.error("Task for "+ value +" init is undefined");
			}
		}
	}
}

if(tasks.length == nbTasks) { // No task added
	tasks.push(osTask["android"]);
}

// Tasks after os task init
tasks.push("default")

// Install task
gulp.task("install", tasks);