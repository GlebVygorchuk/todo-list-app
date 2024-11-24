import React, { useState } from "react"
import './styles/styles.css'

function App() {
  const [todos, setTodos] = useState([])
  const [inputValue, setInputValue] = useState('')

  const handleClick = () => {
    setInputValue('')
    const newTodo = [...todos, {id: Math.random(), text: inputValue}]
    setTodos(newTodo)
  }

  const handleEnterPress = e => {
    if (e.key === 'Enter') {
      handleClick()
    }
  }

  const handleDelete = item => {
    const updatedTodos = todos.map(todo => 
      todo.id === item.id ? {...todo, isDeleting: true} : todo
    )
    setTodos(updatedTodos)

    setTimeout(() => {
      const finalTodos = todos.filter(i => i.id !== item.id)
      setTodos(finalTodos)
    }, 350)
  }

  const handleComplete = item => {
    const updatedTodos = todos.map(todo => 
      todo.id === item.id ? {...todo, isCompleted: true} : todo
    )
    setTodos(updatedTodos)
  }

  const deleteAll = () => {
    const updatedTodos = todos.map(todo => {
      return {...todo, isDeleting: true}
    })
    setTodos(updatedTodos)

    setTimeout(() => {
      setTodos([])
    }, 350)
  }

  return (
    <>
      <>
        <header className="header">

            <div className="header__wrapper">
               <div className="header__title">TO-DO LIST</div>
            </div>
            
            <div className="header__new-task">

               <input
               value={inputValue}
               onInput={(e) => setInputValue(e.target.value)} 
               placeholder="Type your task here!"
               onKeyDown={inputValue !== '' ? handleEnterPress : null} 
               type="text" 
               className="header__create-task" 
               />

               <button 
               onClick={handleClick}
               disabled={inputValue === ''}
               type="button" 
               id="add-task"
               className="header__button">
               Add
               </button>

            </div>

        </header>

        <main className="main">
           <div className="tasks">
               <ul id="list" className="tasks__list">
                {
                    todos.map(task => {
                      
                        return <li 
                        id={task.id} 
                        key={task.id} 
                        className={task.isDeleting ? 'tasks__item remove' : (task.isCompleted ? 'tasks__item done' : 'tasks__item')}>

                           <div className="tasks__item__text-wrapper">
                               {task.text}
                           </div>

                           <div className="tasks__item__buttons">

                               <button 
                               onClick={() => handleComplete(task)}
                               className="tasks__button tasks__button__done">
                                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 26 26" fill="white" width="30px" height="30px"><path d="M 22.566406 4.730469 L 20.773438 3.511719 C 20.277344 3.175781 19.597656 3.304688 19.265625 3.796875 L 10.476563 16.757813 L 6.4375 12.71875 C 6.015625 12.296875 5.328125 12.296875 4.90625 12.71875 L 3.371094 14.253906 C 2.949219 14.675781 2.949219 15.363281 3.371094 15.789063 L 9.582031 22 C 9.929688 22.347656 10.476563 22.613281 10.96875 22.613281 C 11.460938 22.613281 11.957031 22.304688 12.277344 21.839844 L 22.855469 6.234375 C 23.191406 5.742188 23.0625 5.066406 22.566406 4.730469 Z"/></svg>
                               </button>

                               <button 
                               onClick={() => handleDelete(task)}
                               className="tasks__button tasks__button__delete">
                                  <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 48 48" fill="white" width="30px" height="30px"><path d="M 24 4 C 20.491685 4 17.570396 6.6214322 17.080078 10 L 6.5 10 A 1.50015 1.50015 0 1 0 6.5 13 L 8.6367188 13 L 11.15625 39.029297 C 11.43025 41.862297 13.785813 44 16.632812 44 L 31.367188 44 C 34.214187 44 36.56875 41.862297 36.84375 39.029297 L 39.363281 13 L 41.5 13 A 1.50015 1.50015 0 1 0 41.5 10 L 30.919922 10 C 30.429604 6.6214322 27.508315 4 24 4 z M 24 7 C 25.879156 7 27.420767 8.2681608 27.861328 10 L 20.138672 10 C 20.579233 8.2681608 22.120844 7 24 7 z M 19.5 18 C 20.328 18 21 18.671 21 19.5 L 21 34.5 C 21 35.329 20.328 36 19.5 36 C 18.672 36 18 35.329 18 34.5 L 18 19.5 C 18 18.671 18.672 18 19.5 18 z M 28.5 18 C 29.328 18 30 18.671 30 19.5 L 30 34.5 C 30 35.329 29.328 36 28.5 36 C 27.672 36 27 35.329 27 34.5 L 27 19.5 C 27 18.671 27.672 18 28.5 18 z"/></svg>
                               </button>

                        </div>
                        </li>
                    })
                }
                <div className="tasks__list__total">

                    <p className="total-tasks">tasks in total: {todos.length}</p>

                    <button
                    style={todos.length < 2 ? {display: 'none'} : null}
                    id="wipe"
                    onClick={deleteAll}
                    className="tasks__list__total__delete">
                    Delete all
                    </button>

                </div>
               </ul>
           </div>
        </main>
        </>
    </>
  )
}

export default App
