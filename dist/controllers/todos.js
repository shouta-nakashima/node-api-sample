"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodos = void 0;
var todos_1 = require("../models/todos");
var TODOS = [];
exports.createTodos = function (req, res, next) {
    var text = req.body.text;
    var newTodo = new todos_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(200).json({ message: 'Todoを追加しました。', createdtodo: newTodo });
};
exports.getTodos = function (req, res, next) {
    res.json({ todos: TODOS });
};
exports.updateTodo = function (req, res, next) {
    var todoId = req.params.id;
    var updateText = req.body.text;
    var todoIndex = TODOS.findIndex(function (todo) { return todo.id === todoId; });
    if (todoIndex < 0) {
        throw new Error('対象のtodoが見つかりません。');
    }
    TODOS[todoIndex] = new todos_1.Todo(todoId, updateText);
    res.json({ message: 'todoを更新しました。', updateTodo: TODOS[todoIndex] });
};
exports.deleteTodo = function (req, res, next) {
    var todoId = req.params.id;
    var todoIndex = TODOS.findIndex(function (todo) { return todo.id === todoId; });
    if (todoIndex < 0) {
        throw new Error('対象のtodoが見つかりません。');
    }
    TODOS.splice(todoIndex, 1);
    res.json({ message: '削除しました' });
};
