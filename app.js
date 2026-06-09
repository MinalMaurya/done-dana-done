var app = angular.module('todoApp', []);


app.controller('TodoController', function($scope) {
    $scope.tasks = [];


    // Add a new task
    $scope.addTask = function() {
        if ($scope.newTask) {
            $scope.tasks.push({ text: $scope.newTask, completed: false, subtasks: [] });
            $scope.newTask = ''; // Clear input
        }
    };


    // Add a subtask to a specific task (recursive)
    $scope.addSubtask = function(task) {
        if (task.newSubtask) {
            task.subtasks.push({ text: task.newSubtask, completed: false, subtasks: [] });
            task.newSubtask = ''; // Clear input
        }
    };


    // Toggle task completion
    $scope.toggleCompletion = function(task) {
        task.completed = !task.completed;
        updateSubtasksCompletion(task, task.completed);
    };


    // Mark all subtasks as completed/incomplete
    function updateSubtasksCompletion(task, completed) {
        task.subtasks.forEach(subtask => {
            subtask.completed = completed;
            updateSubtasksCompletion(subtask, completed); // Recursive call for nested subtasks
        });
    }


    // Remove task
    $scope.removeTask = function(taskList, index) {
        taskList.splice(index, 1);
 };


    // Remove all tasks
    $scope.removeAllTasks = function() {
        $scope.tasks = [];
    };


    // Calculate completion percentage
    $scope.taskCompletionPercentage = function() {
        let totalItems = 0;
        let completedItems = 0;


        function countItems(tasks) {
            tasks.forEach(function(task) {
                totalItems++;
                if (task.completed) {
                    completedItems++;
                }
                countItems(task.subtasks); // Recursively count subtasks
            });
        }


        countItems($scope.tasks);


        return totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;
    };
});


