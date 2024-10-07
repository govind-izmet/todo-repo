import React, { useReducer, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported

const initialTasks = [];
let nextId = 1;

function tasksReducer(tasks, action) {
  switch (action.type) {
    case 'ADDED': {
      return [...tasks, {
        id: action.id,
        text: action.text,
        done: false
      }];
    }
    case 'changed': {
      return tasks.map(t => {
        if (t.id === action.task.id) {
          return action.task;
        } else {
          return t;
        }
      });
    }
    case 'deleted': {
      return tasks.filter(t => t.id !== action.id);
    }
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function ToDo() {
  const [text, setText] = useState('');
  const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);
  const [isEditing, setIsEditing] = useState(null); 
  const [editText, setEditText] = useState(''); 

  function handleAddTask(text) {
    if (!text) return; // Prevent adding empty tasks
    dispatch({
      type: 'ADDED',
      id: nextId++,
      text: text,
    });
    setText('');
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
      id: taskId
    });
  }

  function handleEditTask(task) {
    setIsEditing(task.id);
    setEditText(task.text);
  }

  function handleSaveEdit(taskId) {
    handleChangeTask({ id: taskId, text: editText, done: false });
    setIsEditing(null);
    setEditText('');
  }

  return (
    <div className="container mt-5" > {/* Adjust padding for fixed navbar */}
      <div className="card shadow-sm p-4">
        <h2 className="card-title text-center mb-4">Task Manager</h2>

        {/* Input section */}
        <div className="input-group mb-3">
          <input 
            type="text" 
            className="form-control" 
            placeholder="Add a new task" 
            value={text}
            onChange={e => setText(e.target.value)} 
          />
          <button 
            className="btn btn-primary" 
            type="button" 
            onClick={() => handleAddTask(text)}
          >
            Add Task
          </button>
        </div>

        {/* Task List */}
        <ul className="list-group">
          {tasks.map(task => (
            <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
              {isEditing === task.id ? (
                <>
                  <input 
                    type="text" 
                    className="form-control me-2"
                    value={editText} 
                    onChange={e => setEditText(e.target.value)} 
                  />
                  <div className="btn-group">
                    <button className="btn btn-success" onClick={() => handleSaveEdit(task.id)}>
                      Save
                    </button>
                    <button className="btn btn-secondary" onClick={() => setIsEditing(null)}>
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <span>{task.text}</span>
                  <div className="btn-group">
                    <button className="btn btn-outline-info" onClick={() => handleEditTask(task)}>
                      Edit
                    </button>
                    <button className="btn btn-outline-danger" onClick={() => handleDeleteTask(task.id)}>
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .card {
          background: linear-gradient(76deg, rgba(3,67,67,1) 0%, rgba(158,129,106,1) 49%, rgba(8,62,113,1) 100%);
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .list-group-item {
          background: #f9f9f9;
          border: 1px solid #e0e0e0;
          border-radius: 4px;
        }
      `}</style>
    </div>
  );
}
