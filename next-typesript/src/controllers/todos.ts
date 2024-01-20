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

export const updateTodo: RequestHandler<{id: string}> = (req, res, next) => {
     const todoId = req.params.id;
     const updateText = (req.body as {text: string}).text;

     const TodoIndex = TODOS.findIndex(todo => todo.id === todoId);

     if(TodoIndex < 0) {
        throw new Error('対象の要素が見つかりませんでした')
    }

    TODOS[TodoIndex] = new Todo(todoId, updateText);

    res.json({message: 'TODOを更新しました', updatedTodo: TODOS[TodoIndex]})
}

export const deleteTodo: RequestHandler<{id: string}> = (req, res, next) => {
    const todoId = req.params.id;

    const TodoIndex = TODOS.findIndex(todo => todo.id === todoId);

    if(TodoIndex < 0){
        throw new Error('対象の要素が見つかりませんでした')
    }

    TODOS.splice(TodoIndex,1);

    res.json({message: '削除しました'})
}
