import React, { useState } from 'react';
import { MdDeleteOutline } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

function TodoList() {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editIndex, setEditIndex] = useState(null);


    const handleChange = (e) => setInputValue(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedTodos = editIndex !== null
            ? todos.map((todo, index) => (index === editIndex ? inputValue : todo))
            : [...todos, inputValue];

        setTodos(updatedTodos);
        setEditIndex(null);
        setInputValue('');
    };


    const handleDelete = (index) => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    const handleEdit = (index) => {
        setInputValue(todos[index]);
        setEditIndex(index);
    };

    return (
        <div className='bg-light border d-flex flex-column m-auto mt-4 p-3 rounded shadow-sm w-25'>
            <form className='mt-5 p-4 d-flex flex-column align-items-center' onSubmit={handleSubmit}>
                <input
                    type='text'
                    value={inputValue}
                    onChange={handleChange}
                    placeholder='Todo Giriniz'
                    className='form-control'
                    style={{ outline: "none", border: "none", borderBottom: "1px solid black" }}
                />
                <button className='btn btn-success fw-bold mt-3'>
                    {editIndex !== null ? 'Güncelle' : 'Ekle'}
                </button>
            </form>
            <div>
                {todos.map((todo, index) => (
                    <div key={index} className='d-flex justify-content-center align-items-center mb-2'>
                        <input
                            type="text"
                            className='form-control w-75 border-0'
                            style={{ borderBottom: "1px solid lightgray", outline: "none" }}
                            value={todo}
                            readOnly
                        />
                        <FaEdit onClick={() => handleEdit(index)} className='fs-4 text-danger ms-3' style={{ cursor: "pointer" }} />
                        <MdDeleteOutline onClick={() => handleDelete(index)} className='fs-4 text-primary' style={{ cursor: "pointer" }} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default TodoList;
