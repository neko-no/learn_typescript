import { RequestHandler } from 'express';

import { Todo } from '../models/todo';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res, next) => {
    const text = req.body.text as string;
    const newTodo = new Todo(Math.random().toString(), text);

    TODOS.push(newTodo);

    res.status(201).json({message: 'TODOを作成しました', createTodo: newTodo});
}

export const getTodos: RequestHandler = (req, res, next) => {
    res.json({todos: TODOS})
}
