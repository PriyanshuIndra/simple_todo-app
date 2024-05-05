import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [todos, setTodos] = useState([]);
  const inputTask = useRef(null);

  const inputHandler = (e) => {
    const task = e.target.value;
    setInput(task);
  };

  const submitHandler = (e) => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: input, completed: false }];
    });
    inputTask.current.value = "";
    setInput("");
  };

  const deleteTask = (task) => {
    setTodos(todos.filter((word) => word.task !== task));
  };


  // I found a new function findIndex (useful) I finds the index in the particular arr
  const completeTask = (todo) => {
    const index = todos.findIndex(t => t.task === todo.task)
    
    const newTodos = [...todos]
    newTodos[index].completed = !newTodos[index].completed

    setTodos(newTodos)
  }

  return (
    <>
      <h1>Todolist Application</h1>
      <div className="input-field">
        <input
          ref={inputTask}
          name="input"
          onChange={inputHandler}
          className="todo-input"
          type="text"
          placeholder="Enter todo"
        />
        <button onClick={submitHandler} type="submit" className="submitBtn">
          Submit
        </button>
      </div>

      <div className="todos-list">
        <ul>
          {todos.map((eachTodo, index) => {
            return (
              <div className="eachTask" key={index}>
                <li style={eachTodo.completed ? {textDecoration: 'line-through'}: {}}>{eachTodo.task}</li>
                <button onClick={() => {completeTask(eachTodo)}}>Completed</button>
                <button
                  onClick={() => {
                    deleteTask(eachTodo.task);
                  }}
                  className="deleteBtn submitBtn"
                >
                  Delete
                </button>
              </div>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default App;



