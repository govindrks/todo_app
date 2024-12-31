import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { deleteTask, createTask, updateTask } from "./redux/taskReducer";
import { CiEdit } from "react-icons/ci";

const Form = () => {
  const dispatch = useDispatch();
  // State for the value of the current todo item
  const [todoValue, setTodoValue] = useState("");

  // State for storing the list of todo items
  const [todoItems, setTodoItems] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);

 
  // Handle form submission to add or update a todo item
  const handleSubmit = (e) => {
    e.preventDefault();
    if (todoValue.trim()) {
      if (isEditing) {
        dispatch(updateTask({ id: editId, text: todoValue }));
        setTodoItems((prevItems) =>
          prevItems.map((item) =>
            item.id === editId ? { ...item, text: todoValue } : item
          )
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        // Create a new task
        const newTodo = {
          id: Date.now(),
          text: todoValue,
        };
        dispatch(createTask(newTodo));
        setTodoItems((prevItems) => [...prevItems, newTodo]);
      }
      setTodoValue("");
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTodoValue("");
  };

  // Handle edit button click
  const handleEdit = (id, text) => {
    setEditId(id);
    setTodoValue(text);
    setIsEditing(true);
  };

  // Handle remove todo item
  const handleRemove = (id) => {
    dispatch(deleteTask(id));
    setTodoItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Add Your Todo-Items</label>
        <div>
          <input
            type="text"
            value={todoValue}
            onChange={(e) => setTodoValue(e.target.value)}
          />
          <button type="submit" disabled={!todoValue.trim()}>
            {isEditing ? "Edit Todo" : "Add Todo"}
          </button>
        </div>
        <button
          type="button"
          className="button warning"
          onClick={handleCancel}
          //disabled={!editMode}
        >
          Cancel
        </button>
      </form>

      <ul>
        {todoItems.map((item) => (
          <li key={item.id}>
            {item.text}
            <button
              className="edit-btn"
              onClick={() => handleEdit(item.id, item.text)}
            >
              <CiEdit /> Edit
            </button>
            <button
              className="remove-btn"
              onClick={() => handleRemove(item.id)}
            >
              <FaTrash /> Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Form;
