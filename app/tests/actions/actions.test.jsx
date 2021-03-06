import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
var expect = require('expect');

import firebase, {firebaseRef} from 'app/firebase/';
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

    it('should generate updateTodo action', () => {
        var action = {
            type: 'UPDATE_TODO',
            id: 3,
            updates: {
                completed: false
            }
        };
        var res = actions.updateTodo(action.id, action.updates);

        expect(res).toEqual(action);
    });

    it('should generate LOGIN action object', () => {
        var action = {
            type: 'LOGIN',
            uid: 'abc123'
        };
        var res = actions.login(action.uid);

        expect(res).toEqual(action);
    });

    it('should generate LOGOUT action object', () => {
        var action = {
            type: 'LOGOUT'
        };
        var res = actions.logout();

        expect(res).toEqual(action);
    });

    describe('Test with firebase Todos', () => {
        var testTodoRef;
        var uid;
        var todosRef;

        beforeEach((done) => {
            firebase.auth().signInAnonymously().then((user) => {
                uid = user.uid;
                todosRef = firebaseRef.child(`users/${uid}/todos`);

                return todosRef.remove();
            }).then(() => {
                testTodoRef = todosRef.push();

                return testTodoRef.set({
                    text: 'Something to do',
                    completed: false,
                    createdAt: 323214
                });
            }).then(() => done())
            .catch(done);
        });

        afterEach((done) => {
            todosRef.remove().then(() => done());
        });

        it('should toggle todo and dispatch UPDATE_TODO action', (done) => {
            const store = createMockStore({auth: {uid}});
            const action = actions.startToggleTodo(testTodoRef.key, true);

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0]).toInclude({
                    type: 'UPDATE_TODO',
                    id: testTodoRef.key
                });

                expect(mockActions[0].updates).toInclude({
                    completed: true
                });

                expect(mockActions[0].updates.completedAt).toExist();

                done();
            }, done);
        });

         it('should populate todos and dispatch ADD_TODOS', (done) => {
            const store = createMockStore({auth: {uid}});
            const action = actions.startAddTodos();

            store.dispatch(action).then(() => {
                const mockActions = store.getActions();

                expect(mockActions[0].type).toEqual('ADD_TODOS');
                expect(mockActions[0].todos.length).toEqual(1);
                expect(mockActions[0].todos[0].text).toEqual('Something to do');

                done();
            }, done);
        });
        
        it('should create todo and dispatch ADD_TODO', (done) => {
            const store = createMockStore({auth: {uid}});
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
        
    });
});
