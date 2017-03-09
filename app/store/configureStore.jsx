var redux = require('redux');
var {searchTextReducer, showCompletedReducer, todosReducer} = require('reducers');

export var configure = () => {
    var reducer = redux.combineReducers({
        searchText: searchTextReducer,
        showComplete: showCompletedReducer,
        todos: todosReducer      
    });

    var store = redux.createStore(reducer, redux.compose(
        window.devToolsEtension ? window.devToolsEtension() : f => f
    ));
    return store;
};
