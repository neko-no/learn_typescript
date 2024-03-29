"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTodo = exports.updateTodo = exports.getTodos = exports.createTodo = void 0;
const todo_1 = require("../models/todo");
const TODOS = [];
const createTodo = (req, res, next) => {
    const text = req.body.text;
    const newTodo = new todo_1.Todo(Math.random().toString(), text);
    TODOS.push(newTodo);
    res.status(201).json({ message: 'TODOを作成しました', createTodo: newTodo });
};
exports.createTodo = createTodo;
const getTodos = (req, res, next) => {
    res.json({ todos: TODOS });
};
exports.getTodos = getTodos;
const updateTodo = (req, res, next) => {
    const todoId = req.params.id;
    const updateText = req.body.text;
    const TodoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (TodoIndex < 0) {
        throw new Error('対象の要素が見つかりませんでした');
    }
    TODOS[TodoIndex] = new todo_1.Todo(todoId, updateText);
    res.json({ message: 'TODOを更新しました', updatedTodo: TODOS[TodoIndex] });
};
exports.updateTodo = updateTodo;
const deleteTodo = (req, res, next) => {
    const todoId = req.params.id;
    const TodoIndex = TODOS.findIndex(todo => todo.id === todoId);
    if (TodoIndex < 0) {
        throw new Error('対象の要素が見つかりませんでした');
    }
    TODOS.splice(TodoIndex, 1);
    res.json({ message: '削除しました' });
};
exports.deleteTodo = deleteTodo;
