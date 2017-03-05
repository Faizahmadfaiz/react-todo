var React = require('react');
var Todo = require('Todo');

var TodoList = React.createClass({
    render: function() {
        var {todos} = this.props;
        
        var renderTodoList = () => {
            return todos.map((todo) => {
                return (
                    <Todo key={todo.id} {...todo} onToggle={this.props.onToggle}/>
                );
            });
        };

        return (
            <div>
                {renderTodoList()}
            </div>
        );
    }
});

module.exports = TodoList;