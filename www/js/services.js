todo.factory('Project', function($resource)  {
    return $resource('http://todoapi.localhost.app/project/:projectId/:resourceName/:resourceId', 
        {projectId:'@projectId', resourceName: '@resourceName', resourceId: '@resourceId'}, 
        {
            query: {
                method: 'get',
                cache: false,
            },
            update: {
                method: 'put'
            },
            save: {
                method: 'post'
            },
            addTask: {
                method: 'post'
            }
        }
    );
})