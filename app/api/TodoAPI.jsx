var $ = require('jquery');

module.exports = {
    filterTodos: function(todos, showCompleted, searchText) {
        var filterTodos = todos;

        filterTodos.sort((a, b) => {
            if(!a.completed && b.completed) {
                return -1;
            } else if(!b.completed && a.completed) {
                return 1;
            } else  {
                return 0;
            }
        });

        filterTodos = filterTodos.filter((todo) => {
            return !todo.completed || showCompleted;
        });

        if(searchText.length > 0) { 
            filterTodos = filterTodos.filter((todo) => {
                var text = todo.text.toLowerCase();
                return text.indexOf(searchText) > -1
            });
        }
        return filterTodos;
    }
};