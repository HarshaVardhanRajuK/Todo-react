import React, { useEffect, useState } from "react";
import "./App.css";

import { v4 as uuidv4 } from "uuid";

import Navbar from "./components/Navbar/Navbar";

const App = () => {
  let [todo, setTodo] = useState("");

  let [todos, setTodos] = useState([]);

  useEffect(()=>{
    
    let todos = JSON.parse(localStorage.getItem("todos"))
    console.log(todos)
    if(!todos){
      return
    }
    setTodos(todos)
  },[])

  function handleSave() {
    if (todo.length < 3) {
      return;
    }

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);

    setTodo("");
    saveToLocal()
  }

  function handlecheckbox(e) {
    let index = todos.findIndex(i=>i.id === e.target.name)

    let newTodos = [...todos]

    newTodos[index].isCompleted = !newTodos[index].isCompleted

    setTodos(newTodos)
    saveToLocal()

  }

  function handleDelete(e) {
    let newTodos = todos.filter(i=>i.id!==e.target.name)

    setTodos(newTodos)
    saveToLocal()
  }

  function handleEdit(id) {
    todos.find(i=>i.id===id)
    console.log(todos.find(i=>i.id===id).todo)
    
    setTodo(todos.find(i=>i.id===id).todo)

    let newTodos = todos.filter(i=>i.id!==id)

    setTodos(newTodos)
    saveToLocal()

  }

  function saveToLocal() {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  return (
    <div className="min-h-[100vh] bg-sky-200">
      <Navbar />
      <div className="min-h-[88vh] flex flex-col items-center gap-12 p-10">
        <h1 className="text-4xl font-bold">Add your TODOs</h1>
        <div>
          <input
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            id="userinput"
            type="text"
            value={todo}
            className="font-[500] w-[500px] p-2 rounded-md focus:outline-blue-600 mr-1 text-center"
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Save
          </button>
        </div>
        <div className="card flex flex-col items-center min-h-[300px] bg-green-300 w-3/4 pt-4">
          {todos.map((item) => {
            return (
              <div
                key={item.id}
                className="todo p-2 w-[80%] bg-blue-400 flex justify-between"
              >
                <div className="flex">
                  <input
                  name={item.id}
                    type="checkbox"
                    value={item.isCompleted}
                    onChange={(e) => {
                      handlecheckbox(e);
                    }}
                  />

                  <div
                    className={
                      item.isCompleted
                        ? "bg-green-200 ml-2 flex justify-center items-center line-through"
                        : "bg-green-200 ml-2 flex justify-center items-center"
                    }
                  >
                    {item.todo}
                  </div>
                </div>

                <div>
                  <button name={item.id} onClick={() => {handleEdit(item.id)}} className="bg-slate-500 px-3 py-1 mr-2 rounded-md">
                    Edit
                  </button>
                  <button name={item.id} onClick={(e) => {handleDelete(e)}} className="bg-red-500 px-3 py-1 rounded-md">
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
