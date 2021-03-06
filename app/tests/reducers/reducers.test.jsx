var expect = require('expect');
var df = require('deep-freeze-strict');

var reducers = require('reducers');

describe('Reducers', () => {
    describe('searchTextReducer', () => {
        it('should set searchText', () => {
            var action = {
                type: 'SET_SEARCH_TEXT',
                searchText: 'some search text'
            };
            var res = reducers.searchTextReducer(df(''), df(action));
            expect(res).toEqual(action.searchText);
        });
    });

    describe('showCompletedReducer', () => {
        it('should toggle the showCompleted status', () => {
            var action = {
                type: 'TOGGLE_SHOW_COMPLETED'
            };
            var res = reducers.showCompletedReducer(df(false), df(action));

            expect(res).toBe(true);
        });
    });

    describe('todosReducer', () => {
        it('should add new todo', () => {
            var action = {
                type: 'ADD_TODO',
                todo: {
                    id: 'abc123',
                    text: 'Something todo',
                    completed: false,
                    createdAt: 434893
                }
            };
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(action.todo);
        });

        it('should update todo', () => {
            var todos = [{
                id: '123',
                text: 'some text',
                completed: true,
                createdAt: 1223242,
                completedAt: 1223245
            }];
            var updates = {
                completed: false,
                completedAt: null
            };
            var action = {
                type: 'UPDATE_TODO',
                id: todos[0].id,
                updates
            };

            var res = reducers.todosReducer(df(todos), df(action));

            expect(res[0].completed).toEqual(updates.completed);
            expect(res[0].completedAt).toEqual(updates.completedAt);
            expect(res[0].text).toEqual(todos[0].text);

        });

        it('should add existing todos', () => {
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
            var res = reducers.todosReducer(df([]), df(action));

            expect(res.length).toEqual(1);
            expect(res[0]).toEqual(todos[0]);
        });

        it('should clear todos on LOGOUT', () => {
            var todos = [{
                id: 111,
                text: 'anything',
                completed: false,
                completedAt: undefined,
                createdAt: 33000
            }];
            var action = {
                type: 'LOGOUT'
            };
            var res = reducers.todosReducer(df(todos), df(action));

            expect(res.length).toEqual(0);
        });
    });

    describe('authReducer', () => {
        it('should set uid value when user is logged in', () => {
            var action = {
                type: 'LOGIN',
                uid: 'abc123'
            };
            var res = reducers.authReducer(df({}), df(action));

            expect(res).toEqual({
                uid: action.uid
            });
        });

        it('should clear the uid value when user logged out', () => {
            var action = {
                type: 'LOGOUT'
            };
            var authData = {
                uid: '123abc'
            };
            var res = reducers.authReducer(df(authData), df(action));

            expect(res).toEqual({});
        });
    });
});