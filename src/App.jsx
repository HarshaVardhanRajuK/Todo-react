import React, { useEffect, useState } from "react";
import "./App.css";

import { v4 as uuidv4 } from "uuid";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";


import Navbar from "./components/Navbar/Navbar";

const App = () => {
  let [todo, setTodo] = useState("");

  let [todos, setTodos] = useState([]);

  let [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todos = JSON.parse(localStorage.getItem("todos"));

    if (todos) {
      setTodos(todos);
    }
  }, []);



  function saveToLocal() {
    localStorage.setItem("todos", JSON.stringify(todos));
    console.log(todos)
  }

  function handleSave() {
    if (todo.length < 3) {
      return;
    }

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);

    setTodo("");
    saveToLocal();
  }

  function handlecheckbox(e) {
    let index = todos.findIndex((i) => i.id === e.target.name);

    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
    saveToLocal();
  }

  function handleDelete(id) {
    let newTodos = todos.filter((i) => i.id !== id);

    console.log(newTodos)

    setTodos(newTodos);
    saveToLocal();
  }

  function handleEdit(id) {
    todos.find((i) => i.id === id);

    setTodo(todos.find((i) => i.id === id).todo);

    let newTodos = todos.filter((i) => i.id !== id);

    setTodos(newTodos);
    saveToLocal();
  }

  

  return (
    <div className="min-h-[100vh] bg-[#9AC8CD]">
      <Navbar />
      <div className="min-h-[88vh] flex flex-col items-center gap-8 p-10">
        <h1 className="text-2xl md:text-4xl font-bold">Add Your TODOs</h1>
        <div className="flex">
          <input
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            id="userinput"
            type="text"
            value={todo}
            className="font-[500] w-[270px] md:w-[500px] p-2 rounded-md focus:outline-blue-600 mr-1 text-center"
            placeholder="Create Your Task"
            // onKeyUp={(e)=>{
            //   if (e.key === "Enter") {
            //     handleSave()
                
            //   }
            // }}
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold"
          >
            Save
          </button>
        </div>
        <div className="card flex flex-col items-center min-h-[300px] bg-[#0E46A3] w-full md:w-[60%] py-4 backdrop-blur-md border-2 border-blue-300 rounded-lg">
          <div className="flex mb-2">
            <input
              onChange={()=>{setShowFinished(!showFinished)}}
              type="checkbox"
              name=""
              id="showFinished"
              className="mr-2 cursor-pointer w-6"
              checked={showFinished}
            />
            <label
              className="text-lg cursor-pointer font-medium text-white"
              htmlFor="showFinished"
            >
              Show Completed
            </label>
            
          </div>
          <hr />
          {todos.map((item) => {
            return ( ( showFinished || !item.isCompleted ) &&
              <div
                key={item.id}
                className="todo p-2 w-[80%] bg-[#E1F7F5] flex justify-between my-1 rounded-md"
              >
                <div className="flex">
                  <input
                  id={item.id}
                    name={item.id}
                    type="checkbox"
                    checked={item.isCompleted}
                    onChange={(e) => {
                      handlecheckbox(e);
                    }}
                    className="cursor-pointer w-5"
                  />

                  <label
                  htmlFor={item.id}
                    className={
                      item.isCompleted
                        ? "ml-2 flex justify-center items-center text-lg font-semibold line-through"
                        : "ml-2 flex justify-center items-center text-lg font-semibold"
                    }
                  >
                    {item.todo}
                  </label>
                </div>

                <div>
                  <button
                    name={item.id}
                    onClick={() => {
                      handleEdit(item.id);
                    }}
                    className="bg-slate-500 p-2 mr-2 rounded-md font-semibold text-white"
                  >
                    <MdEditDocument />
                  </button>
                  <button
                    name={item.id}
                    onClick={(e) => {
                      handleDelete(item.id);
                    }}
                    className="bg-red-500 p-2 rounded-md font-semibold text-white"
                  >
                    <RiDeleteBin6Fill />
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
