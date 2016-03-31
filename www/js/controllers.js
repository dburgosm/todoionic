todo.controller('TodoCtrl', function($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, Project) {
	$scope.projects = [];

    var getLastActiveIndex =  function() {
        return parseInt(window.localStorage['lastActiveProject']) || 0;
    }
    
    var setLastActiveIndex = function(index) {
        window.localStorage['lastActiveProject'] = index;
    }


    // A utility function for creating a new project
    // with the given projectTitle
    var createProject = function(projectTitle) {
        var newProject = Project.save({
            title: projectTitle
        }, function() {
            $scope.selectProject(newProject.data,$scope.projects.length);
            $scope.loadProjects();
        });
    }

    // Called to select the given project
    $scope.selectProject = function(project, index) {
        $scope.activeProject = project;
        setLastActiveIndex(index);
        $ionicSideMenuDelegate.toggleLeft(false);
    };

    $scope.loadProjects = function() {
        var projects = Project.query(function() {
        	console.debug(projects.data);
        	if(!(projects.data[0] instanceof Object)){
        		createProject("Example");	
        	} else {
        		$scope.projects = projects.data;
        		var index = getLastActiveIndex();
            	$scope.selectProject($scope.projects[index], index);
        	}
        });
    }

    // Called to create a new project
    $scope.newProject = function() {
        var projectTitle = prompt('Project name');
        if (projectTitle) {
            createProject(projectTitle);
        }
    };

    // Create our modal
    $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
        $scope.taskModal = modal;
    }, {
        scope: $scope
    });

    $scope.createTask = function(task) {
        if (!$scope.activeProject || !task) {
            return;
        }

        var project = $scope.projects[getLastActiveIndex()];

        var newTask = Project.addTask({
            projectId: project._id,
            resourceName: 'task',
            title: task.title,
            description: task.title,
            done: false
        }, function() {
            $scope.loadProjects();      
        });

        $scope.taskModal.hide();

        task.title = "";
    };

    $scope.newTask = function() {
        $scope.taskModal.show();
    };

    $scope.closeNewTask = function() {
        $scope.taskModal.hide();
    }

    $scope.toggleProjects = function() {
        $ionicSideMenuDelegate.toggleLeft();
    };

    $scope.loadProjects();

})