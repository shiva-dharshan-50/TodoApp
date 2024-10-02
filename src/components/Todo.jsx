import React, { useEffect, useState } from 'react'
import { FaTrash } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
export default function Todo() {
    const[todos,setTodos]=useState([])
    useEffect(() => {
        const savedTodos = JSON.parse(localStorage.getItem('todos'));
        if (savedTodos) {
          setTodos(savedTodos);
        }
      }, []);
      useEffect(() => {
        if (todos.length > 0) {
          localStorage.setItem('todos', JSON.stringify(todos));
        }
      }, [todos]);
    const[todoInput,setTodoInput]=useState('')

    const handleSubmit=(text)=>{
        if(text.trim()=='') return
        const newInput=[...todos,text]
        setTodos(newInput)
        setTodoInput('')
    }
    const handleDelete=(index)=>{
        const remainingTodo=todos.filter((res,todoIndex)=>todoIndex!==index)
        setTodos(remainingTodo)
    }
    const handleEdit=(index)=>{
            setTodoInput(todos[index])
            handleDelete(index)
    }
  return (
    <div>
      <div  className='w-[50%] bg-yellow-400 mx-auto p-5 rounded-md flex justify-center gap-5'>
        <input value={todoInput} onChange={e=>setTodoInput(e.target.value)} className='py-2 w-[60%] rounded-sm px-5' type='text' placeholder='Enter the Todo'></input>
        <button onClick={()=>handleSubmit(todoInput)} className='border-2 border-white py-1 px-3 rounded-md hover:translate-y-1 duration-200 hover:text-white'>Add+</button>
      </div>
      <div className='w-[50%] shadow-md mt-10 border-2 mx-auto p-5 rounded-md flex flex-col justify-center gap-5'>
        {todos.map((res,index)=>{
            return(
                <div key={index} className='flex text-xl  justify-between border-2 border-black py-2 px-5 rounded-sm'>
                    <p >{res}</p>
                    <div className='flex gap-5 text-md scale-125 items-center'>
                    <FaEdit onClick={()=>handleEdit(index)} className='text-yellow-500 hover:translate-y-1 duration-200 cursor-pointer'/>
                    <FaTrash onClick={()=>handleDelete(index)} className='text-red-500 hover:translate-y-1 duration-200 cursor-pointer'/>
                    </div>
                    
                </div>
            )
        })}
      </div>
    </div>
  )
}
