import React, { useRef } from 'react'

interface NewTodoProps {
    onAddTodo: (t: string) => void
}

const NewTodo: React.FC<NewTodoProps> = ({onAddTodo}) => {
    const textInputRef = useRef<HTMLInputElement>(null);
    const todoSubmitHundler = (e: React.FormEvent) => {
        e.preventDefault();
        const enteredText = textInputRef.current!.value;
        onAddTodo(enteredText);
        textInputRef.current!.value = '';
    };

    return (
        <form onSubmit={todoSubmitHundler}>
            <div>
                <label htmlFor="todo-text">TODO内容</label>
                <input type="text" name="" id="todo-text" ref={textInputRef}/>
            </div>
            <button type="submit">TODO追加</button>
        </form>
    )
}

export default NewTodo

