import React, { useState } from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';
import { Todo } from './todo.model';


const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([{id: 't1', text: 'TS講座の完了'}])

  const todoAddHundler = (text: string) => {
    setTodos(prevTodos => [
      ...prevTodos,
      {id: Math.random().toString(), text: text}]
    )
  }

  const todoDeleteHundler = (id: string) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id))
  }


  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHundler} />
      <TodoList items={todos} onDeleteTodo={todoDeleteHundler}/>
    </div>
  );
}

export default App;
