import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import * as actions from 'actions';

var createMockStore = configureMockStore([thunk]);

describe('Actions', () => {
    it('should generate searchText action', () => {
        var action = {
            type: 'SET_SEARCH_TEXT',
            searchText: 'Some search Text'
        };
        var res = actions.setSearchText(action.searchText);

        expect(res).toEqual(action);
    });

    it('should generate addTodo action', () => {
        var action = {
            type: 'ADD_TODO',
            todo: {
                id: '111',
                text: 'anything',
                completed: false,
                createdAt: 33000
            }
        };
        var res = actions.addTodo(action.todo);

        expect(res).toEqual(action);
    });

    it('should create todo and dispatch ADD_TODO', (done) => {
        const store = createMockStore({});
        const todoText = 'My todo item';

        store.dispatch(actions.startAddTodo(todoText)).then(() => {
          const actions = store.getActions();
          expect(actions[0]).toInclude({
            type: 'ADD_TODO'
          });
          expect(actions[0].todo).toInclude({
            text: todoText
          });
          done();
        }).catch(done);
    });

    it('should generate addTodos action object', () => {
        var todos = [{
            id: 111,
            text: 'anything',
            completed: false,
            completedAt: undefined,
            createdAt: 33000
        }];
        var action = {
            type: 'ADD_TODOS',
            todos
        };
        var res = actions.addTodos(todos);

        expect(res).toEqual(action);
    });

    it('should generate toggleSohwCompleted action', () => {
        var action = {
            type: 'TOGGLE_SHOW_COMPLETED'
        };
        var res = actions.toggleShowCompleted();

        expect(res).toEqual(action);
    });

    it('should generate toggleTodo action', () => {
        var action = {
            type: 'TOGGLE_TODO',
            id: 3
        };
        var res = actions.toggleTodo(action.id);

        expect(res).toEqual(action);
    });
});
