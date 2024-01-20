import React from 'react';
import TodoList from './components/TodoList';
import NewTodo from './components/NewTodo';

// function App() {
//   return (
//     <div className="App">
//     </div>
//   );
// }

const App: React.FC = () => {
  const todos = [
    {id: 't1', text: 'TS講座の完了'}
  ]
  const todoAddHundler = (text: string) => {
    console.log(text);
  }
  return (
    <div className="App">
      <NewTodo onAddTodo={todoAddHundler} />
      <TodoList items={todos}/>
    </div>
  );
}

export default App;
