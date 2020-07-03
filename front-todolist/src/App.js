import React from 'react';
import './App.css';
import axios from 'axios';
import TodoForm from './component/TodoForm'
import TodoList from './component/TodoList'

const API = axios.create({ baseURL: `http://127.0.0.1:8000/api/` });

class Todo extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      todos: [],
    }
    this.handleTodoListChange = this.handleTodoListChange.bind(this)
  }

  handleTodoListChange (todos) {
    this.setState({ todos })
  }

  componentDidMount() {
    API.get(`todos`).then(res => {
      const todos = res.data
      this.setState({ todos })
    })
  }

  render () {
    return <div>
      <TodoForm todos={ this.state.todos } onTodoListChange={ this.handleTodoListChange } />
      <TodoList todos={ this.state.todos } onTodoListChange={ this.handleTodoListChange } />
    </div>
  }

}

function App() {
  return (
    <div className="App">
      <h1>To Do List</h1>
      <Todo/>
    </div>
  );
}

export default App;
