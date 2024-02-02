import { useState } from 'react';
import './App.css';

function App() {

  let [task, settask] = useState('');
  let [displayresult, setresult] = useState([]);
  let [gettasks, getsetTasks] = useState([]);
  let [edit, setedit] = useState(false);
  let [id, setid] = useState();
  let [search, setsearch] = useState("");


  const inserttask = () => {
    if (edit) {
      const updatedTasks = [...gettasks];
      updatedTasks[id].name = task; // Update the task 
      setresult(updatedTasks);
      getsetTasks(updatedTasks);
      setedit(false);
    } else {
      setresult([...gettasks, { name: task, completed: false }]);
      getsetTasks([...gettasks, { name: task, completed: false }]);
    }
    settask("");
  };
  const deletehandler = (ind) => {
    var data = displayresult.filter((ele, ind1) => {
      return ind != ind1;
    })
    setresult(data);
    getsetTasks(data);

  }

  const edithandler = (ind) => {
    settask(displayresult[ind].name);
    setid(ind);
    setedit(true);
  }

  let handlecheck = (ind) => {
    const updatedTasks = [...displayresult];
    updatedTasks[ind].completed = !updatedTasks[ind].completed;
    setresult(updatedTasks);
    getsetTasks(updatedTasks);
  }

  let handleserch = () => {
    var data = gettasks.filter((ele, ind) => {
      return ele.name == search;
    })
    setresult(data);
    setsearch('');
  }
  let handleall = () => {
    setresult([...gettasks])
  }
  let completed = () => {
    let check = gettasks.filter((ele) => {
      return ele.completed === true;
    });
    // console.log(setresult);
    console.log(check);
    // setresult(check);
  };

  let uncompleted = () => {
    let check = gettasks.filter((ele) => {
      return ele.completed === false;
    });
    setresult(check);
  };

  return (
    <div className='Container'>
      <h1>TO DO LIST</h1>
      <div className='todolist'>
        <input type='text' placeholder='add your task' onChange={(e) => settask(e.target.value)} value={task}></input>
        <button onClick={inserttask}>Add</button><br></br>
      </div>
      <div className='allfun'>
        <input type='text' placeholder='Serch' value={search} onChange={(e) => setsearch(e.target.value)}></input>
        <button onClick={handleserch}>Search</button>
        <button onClick={handleall}>All</button>
        <button onClick={completed}>completed</button>
        <button onClick={uncompleted}>Uncompleted</button>
      </div>
      <ul >
        {
          displayresult.map((ele, ind) => (
            <li key={ind} className='submit'>
              <input type='checkbox' onClick={() => handlecheck(ind)} checked={ele.completed}></input>
              <span style={{ textDecoration: ele.completed ? 'line-through' : 'none' }}>{ele.name}</span>
              <button onClick={() => deletehandler(ind)}>Delete</button>
              <button onClick={() => edithandler(ind)}>Edit</button>
            </li>
          ))
        }
      </ul>
    </div>
  );
}

export default App