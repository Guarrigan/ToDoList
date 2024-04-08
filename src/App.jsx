import { useState, useEffect } from 'react'
import FormTask from './Form';
import Bounce from './Bounce';
import './App.css'


function Tasks() {

  // Error en el useState([]), cada vez que entramos en la pagina se reseteaban los valores.
  // const [tasks, setTasks] = useState([]);

  // Almacenamos los datos del localStorage a una constante storedTasks para cargarlas en el state.
  const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [filter, setFilter] = useState('all')

  // Guardar los datos en el localStorage cuando estos cambien
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (newTask) => {
    const updatedTasks = [...tasks, { task: newTask, isChecked: false }];
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    console.log(index)
    // Copiamos los datos del array en un nuevo array y eliminamos la tarea con el valor (index) que pasamos por parametros
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks)
  }

  //Recogemos el evento y el index de la tarea, copiamos el array y modificamos el valor de 
  const updateTask = (e, index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index] = { ...updatedTasks[index], task: e.target.value }
    setTasks(updatedTasks)
  }

  //Funcion que modifica el estado de una tarea
  const checkTask = (index) => {
    // Creamos un array para modificar el valor isChecked de la opcion seleccionada (index)
    const newTasks = [...tasks]

    if (newTasks[index].isChecked == true) {
      newTasks[index].isChecked = false
    } else {
      newTasks[index].isChecked = true;
    }
    setTasks(newTasks)
  }

  //Filtro para mostrar tareas por estado.
  const changeFilter = (filterValue) => {
    setFilter(filterValue)
  }

  return (
    <>
      <Bounce element={"h1"}>TodoList</Bounce>
      <FormTask addTask={addTask}></FormTask>
      <ul>
        {tasks
          .filter((task) => {
            if (filter === 'completed') {
              return task.isChecked;
            } else if (filter === 'uncompleted') {
              return !task.isChecked;
            }
            return true;
          })
          .map((task, index) => (
            
            <li key={index} className='task'>
              <input
                type="checkbox"
                checked={task.isChecked}
                onChange={() => checkTask(index)}
              />
              <label>
                <input
                  value={task.task}
                  onChange={(e) => updateTask(e, index)}
                  style={{ textDecoration: task.isChecked ? 'line-through' : 'none' }}>
                </input>
              </label>

              {/* No funcionaba el deleteTask debido a que no se usaba funcion de flecha, escogia el index modificado y borraba el primer task */}
              <button onClick={() => deleteTask(index)} className='deleteButton'></button>
            </li>
          ))}
        <div className='buttonContainer'>
          <button onClick={() => changeFilter('all')} className={filter === 'all' ? 'selected' : 'unselected'}>All Tasks</button>
          <button onClick={() => changeFilter('completed')} className={filter === 'completed' ? 'selected' : 'unselected'}>Completed Tasks</button>
          <button onClick={() => changeFilter('uncompleted')} className={filter === 'uncompleted' ? 'selected' : 'unselected'}>Uncompleted Tasks</button>
        </div>
      </ul>
    </>
  );

}

function App() {

  return (
    <>
      <Tasks></Tasks>
    </>
  );
}

export default App