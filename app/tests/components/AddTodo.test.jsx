var React = require('react');
var ReactDOM = require('react-dom');
var expect = require('expect');
var $ = require('jquery');
var TestUtils = require('react-addons-test-utils');

var AddTodo = require('AddTodo');

describe('AddTodo', () => {
    it('should exist', () => {
        expect(AddTodo).toExist();
    });

    it('should call onAddTodo props if valid data is entered', () => {
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        //var $el = $(ReactDOM.findDOMNode(addTodo));
        var el = ReactDOM.findDOMNode(addTodo);

        addTodo.refs.todoText.value = 'Eat food';
        //TestUtils.Simulate.submit($el.find('form')[0]);
        TestUtils.Simulate.submit(el.querySelectorAll('form')[0]);
        
        expect(spy).toHaveBeenCalledWith('Eat food');
    });

    it('should not call onAddTodo props empty value is entered', () => {
        var spy = expect.createSpy();
        var addTodo = TestUtils.renderIntoDocument(<AddTodo onAddTodo={spy}/>);
        //var $el = $(ReactDOM.findDOMNode(addTodo));
        var el = ReactDOM.findDOMNode(addTodo);

        addTodo.refs.todoText.value = '';
        //TestUtils.Simulate.submit($el.find('form')[0]);
        TestUtils.Simulate.submit(el.querySelectorAll('form')[0]);
        
        expect(spy).toNotHaveBeenCalled();
    });
});