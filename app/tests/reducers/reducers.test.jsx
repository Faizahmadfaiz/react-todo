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

        it('should toggle todo', () => {
            var state = [{
                id: '123',
                text: 'some text',
                completed: false,
                createdAt: 1223242,
                completedAt: undefined
            }];
            var action = {
                type: 'TOGGLE_TODO',
                id: '123'
            };

            var res = reducers.todosReducer(df(state), df(action));

            expect(res[0].completed).toEqual(true);
            expect(res[0].completedAt).toBeA('number');

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
    });
});