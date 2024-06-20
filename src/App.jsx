import React, { useEffect, useState } from "react";
import "./App.css";

import { v4 as uuidv4 } from "uuid";
import { MdEditDocument } from "react-icons/md";
import { RiDeleteBin6Fill } from "react-icons/ri";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

const App = () => {
  let [todo, setTodo] = useState("");

  // let [todos, setTodos] = useState([]);
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  let [showFinished, setShowFinished] = useState(true);

  

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);


  function handleSave() {
    if (todo.length < 3) {
      return;
    }

    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);

    setTodo("");
  }

  function handlecheckbox(e) {
    let index = todos.findIndex((i) => i.id === e.target.name);

    let newTodos = [...todos];

    newTodos[index].isCompleted = !newTodos[index].isCompleted;

    setTodos(newTodos);
  }

  function handleDelete(id) {
    let newTodos = todos.filter((i) => i.id !== id);


    setTodos(newTodos);
  }

  function handleEdit(id) {
    todos.find((i) => i.id === id);

    setTodo(todos.find((i) => i.id === id).todo);

    let newTodos = todos.filter((i) => i.id !== id);

    setTodos(newTodos);
  }

  return (
    <div className="min-h-[100vh] bg-[#9AC8CD]">
      <Navbar />
      <div className="min-h-[88vh] flex flex-col items-center gap-8 py-10 px-2">
        <h1 className="text-2xl md:text-4xl font-bold">Add Your TODOs</h1>
        <div className="flex">
          <input
            onChange={(e) => {
              setTodo(e.target.value);
            }}
            id="userinput"
            type="text"
            value={todo}
            className="font-[500] w-[280px] md:w-[500px] p-2 rounded-md focus:outline-blue-600 mr-1 text-center"
            placeholder="Create Your Task, press ↵ or save"
            onKeyUp={(e)=>{
              if (e.key === "Enter") {
                handleSave()

              }
            }}
          />
          <button
            onClick={handleSave}
            className="bg-blue-600 text-white px-4 py-2 rounded-md font-bold"
          >
            Save
          </button>
        </div>
        <div className="card flex flex-col items-center min-h-[300px] bg-[#0E46A3] w-full md:w-[60%] py-6 backdrop-blur-md border-2 border-blue-300 rounded-lg">
          {todos.length !== 0 && (
            <>
              <div className="flex mb-3">
                <input
                  onChange={() => {
                    setShowFinished(!showFinished);
                  }}
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
              <div className="h-[1px] w-[90%] bg-gray-200 mb-3"></div>{" "}
            </>
          )}
          {todos.length === 0 && (
            <div className="text-slate-400 p-2 mt-4 text-center text-xl">
              {" "}
              No Tasks! Add some to appear here
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="todo p-2 w-[90%] md:w-[80%] bg-[#E1F7F5] flex justify-between my-1 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <input
                      id={item.id}
                      name={item.id}
                      type="checkbox"
                      checked={item.isCompleted}
                      onChange={(e) => {
                        handlecheckbox(e);
                      }}
                      className="cursor-pointer"
                    />

                    <label
                      htmlFor={item.id}
                      className={
                        item.isCompleted
                          ? " flex justify-center items-center cursor-pointer md:text-lg font-semibold line-through"
                          : " flex justify-center items-center cursor-pointer md:text-lg font-semibold"
                      }
                    >
                      {item.todo}
                    </label>
                  </div>

                  <div className="flex justify-center items-center gap-1 md:gap-2">
                    <button
                      name={item.id}
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                      className="bg-slate-500 p-2 rounded-md font-semibold text-white"
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
              )
            );
          })}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;
