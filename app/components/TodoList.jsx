var React = require('react');
var {connect} = require('react-redux');
import Todo from 'Todo';

export var TodoList = React.createClass({
    render: function() {
        var {todos} = this.props;
        
        var renderTodoList = () => {
            if(todos.length === 0) {
                return (
                    <p className="container__message">Nothing To Do</p>
                );
            }

            return todos.map((todo) => {
                return (
                    <Todo key={todo.id} {...todo}/>
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

export default connect(
    (state) => {
        return {
            todos: state.todos
        };
    }
)(TodoList);