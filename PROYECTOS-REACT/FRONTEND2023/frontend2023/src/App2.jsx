import React, {Fragment, useState, useRef, useEffect} from 'react';
import {TodoList} from './componentes/TodoList'
// useState forza el renderizado

export function App2(){
    //tpdps = estado, y setTodos es el que lo modifica
    // se puede inicializar

    const [todos, setTodos] = useState([
        {id:1, task: 'Tarea 1', completed:false, prioridad: 'Alta'},
    ]); 

    const todoTaskRef = useRef();
    const todoTaskPrioridad = useRef();


    useEffect(() =>{
        const storedTodos = JSON.parse(localStorage.getItem("todoApp.todos"));
        if (storedTodos){
            setTodos(storedTodos);
        }
    },[]);

    useEffect(()=>{
        localStorage.setItem('todoApp.todos', JSON.stringify(todos));
    },[todos])

    const toggleTodo = (id) =>{
        const newTodos = [...todos];
        const todo = newTodos.find((todo)=>todo.id === id);
        todo.completed = !todo.completed;
        setTodos(newTodos);
    }


    const handleTodoAdd = () => {
        const task = todoTaskRef.current.value;
        const prioridad = todoTaskPrioridad.current.value;
        if (task === "" ) return;
        setTodos((prevTodos) => {
            let idActual = prevTodos.length+1;
            return [...prevTodos, {id:idActual , task,completed:false, prioridad}];
        })

          // Limpia los campos de entrada después de agregar una tarea
    todoTaskRef.current.value = "";
    todoTaskPrioridad.current.value = "";

    }

    const handleClearAll = () => {
        const newTodos = todos.filter((todos) => !todos.completed);
        setTodos(newTodos);
    }

    return (
        <Fragment>
            <TodoList todos={todos} toggleTodo={toggleTodo}/>
        
            <input ref={todoTaskRef} type="text" placeholder="Nueva Tarea" />
            <input ref={todoTaskPrioridad} type="text" placeholder="Prioridad de Tarea" />
            <button onClick={handleTodoAdd}>+</button>
            <button onClick={handleClearAll}>-</button>
            <div>Te quedan {todos.filter((todo) => !todo.completed).length} tareas por terminar.</div>
        </Fragment>
    )
    
}