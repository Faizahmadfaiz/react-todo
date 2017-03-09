var React = require('react');
var ReactDOM = require('react-dom');
var {Route, Router, IndexRoute, hashHistory, browserHistory} = require('react-router');

var TodoApp = require('TodoApp.jsx');

var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
  console.log('New State', store.getState());
});

store.dispatch(actions.addTodo('Clean the Yard'));
store.dispatch(actions.setSearchText('Yard'));
store.dispatch(actions.toggleShowCompleted());

//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <TodoApp/>,
  document.getElementById('app')
);