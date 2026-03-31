import { useState } from 'react'
import './App.css'

const FILTERS = ['All', 'Active', 'Completed']

function newId() {
  return crypto.randomUUID()
}

function App() {
  const [todos, setTodos] = useState([
    { id: newId(), text: 'Buy groceries', completed: false },
    { id: newId(), text: 'Walk the dog', completed: true },
    { id: newId(), text: 'Read a book', completed: false },
  ])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState('All')

  function addTodo(e) {
    e.preventDefault()
    const text = input.trim()
    if (!text) return
    setTodos([...todos, { id: newId(), text, completed: false }])
    setInput('')
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ))
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id))
  }

  function clearCompleted() {
    setTodos(todos.filter(todo => !todo.completed))
  }

  const filtered = todos.filter(todo => {
    if (filter === 'Active') return !todo.completed
    if (filter === 'Completed') return todo.completed
    return true
  })

  const activeCount = todos.filter(todo => !todo.completed).length

  return (
    <div className="app">
      <h1 className="title">todos</h1>

      <div className="card">
        <form onSubmit={addTodo} className="add-form">
          <input
            className="add-input"
            type="text"
            placeholder="What needs to be done?"
            value={input}
            onChange={e => setInput(e.target.value)}
          />
          <button className="add-btn" type="submit">Add</button>
        </form>

        <ul className="todo-list">
          {filtered.length === 0 && (
            <li className="empty-message">No todos here!</li>
          )}
          {filtered.map(todo => (
            <li key={todo.id} className={`todo-item${todo.completed ? ' completed' : ''}`}>
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                className="todo-checkbox"
              />
              <span className="todo-text">{todo.text}</span>
              <button
                className="delete-btn"
                onClick={() => deleteTodo(todo.id)}
                aria-label="Delete todo"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>

        <div className="footer">
          <span className="count">{activeCount} item{activeCount !== 1 ? 's' : ''} left</span>

          <div className="filters">
            {FILTERS.map(f => (
              <button
                key={f}
                className={`filter-btn${filter === f ? ' active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            className="clear-btn"
            onClick={clearCompleted}
            disabled={!todos.some(t => t.completed)}
          >
            Clear completed
          </button>
        </div>
      </div>
    </div>
  )
}

export default App
