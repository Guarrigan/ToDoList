import { useState } from 'react';


function FormTask({ addTask }) {

    const [taskInput, setTaskInput] = useState('')
  
    const handleSubmit = (event) => {
      event.preventDefault();
      if (taskInput.trim() !== '') {
        addTask(taskInput);
        setTaskInput('');
      }};

      return (
        <>
          <form onSubmit={handleSubmit}>
            <label>
              <input
                type="text"
                value={taskInput}
                onChange={(event) => setTaskInput(event.target.value)}
                placeholder="Enter a new task"
              />
            </label>
            <button type="submit" disabled={taskInput ? "" : "disabled"} className='addButton'>Add Task</button>
          </form>
        </>
      )
    }

    export default FormTask