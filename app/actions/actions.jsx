import moment from 'moment';

import firebase, {firebaseRef} from 'app/firebase/';

export var setSearchText = (searchText) => {
  return {
    type: 'SET_SEARCH_TEXT',
    searchText
  };
};

export var toggleShowCompleted = () => {
  return {
    type: 'TOGGLE_SHOW_COMPLETED'
  };
};

export var addTodo = (todo) => {
  return {
    type: 'ADD_TODO',
    todo
  };
};

export var startAddTodo = (text) => {
  return (dispatch, getState) => {
    var todo = {
      text,
      completed: false,
      createdAt: moment().unix(),
      completedAt: null
    };
    var todoRef = firebaseRef.child('todos').push(todo);
    console.log(todo);
    return todoRef.then(() => {
      console.log('Suceess');
        dispatch(addTodo({
        ...todo,
        id: todoRef.key
      }));
    }, (e) => {
      console.log("FAIL! ");
    });
  };
};

export var addTodos = (todos) => {
  return {
    type: 'ADD_TODOS',
    todos
  };
};

export var startAddTodos = () => {
  return (dispatch, getState) => {
    return firebaseRef.child('todos').once('value').then((snapshot) => {
      var data = snapshot.val() || {};

      var initialTodos = Object.keys(data).map((key) => {
        return Object.assign({id: key}, data[key]);
      });
      dispatch(addTodos(initialTodos));
    }, (e) => {
      console.log('Error in fetching from DB');
    });
  }
};

export var updateTodo = (id, updates) => {
  return {
    type: 'UPDATE_TODO',
    id,
    updates
  };
};

export var startToggleTodo = (id, completed) => {
  return (dispatch, getState) => {
    var todoRef = firebaseRef.child(`todos/${id}`);
    var updates = {
      completed,
      completedAt: completed ? moment().unix() : null
    };

    return todoRef.update(updates).then(() => {
      dispatch(updateTodo(id, updates));
    });
  };
};