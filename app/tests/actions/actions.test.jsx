var expect = require('expect');
var actions = require('actions');

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
            text: 'Some text'
        };
        var res = actions.addTodo(action.text);

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