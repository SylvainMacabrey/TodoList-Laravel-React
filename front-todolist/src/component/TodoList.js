import React from 'react';
import axios from 'axios';
import TodoRaw from './TodoRaw'
import Modal from './Modal'

const API = axios.create({ baseURL: `http://127.0.0.1:8000/api/` });

// Liste des tâches à faire
class TodoList extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        todoModalName: '',
        todoModalCompleted: ''
      }
      this.deleteTodo = this.deleteTodo.bind(this)
      this.onCompletedTodo = this.onCompletedTodo.bind(this)
      this.changeTodoModal = this.changeTodoModal.bind(this)
    }
  
    async deleteTodo (id) {
      const response = await API.delete(`todos/${ id }`)
      const rows = this.props.todos.slice()
      const index = rows.findIndex((row) => row.id === id)
      rows.splice(index, 1);
      this.props.onTodoListChange(rows)
    }
  
    onCompletedTodo (todo) {
      const rows = this.props.todos.slice()
      const index = rows.findIndex((row) => row.id === todo.id)
      rows[index].completed = !todo.completed
      this.props.onTodoListChange(rows)
    }

    changeTodoModal (todo) {
      this.setState({ todoModalName: todo.name })
      this.setState({ todoModalCompleted: todo.completed })
    }
  
    render () {
      const rows = []
      this.props.todos.forEach(todo => {
        rows.push(<TodoRaw key={ todo.id } todo={ todo } onChangeTodoModal={ this.changeTodoModal } onDeleteTodo={ this.deleteTodo } onCompletedTodo={ this.onCompletedTodo } />)
      })
      return <div>
          <ul className="list-group list-group-flush"> { rows } </ul>
          <Modal name={ this.state.todoModalName } completed={ this.state.todoModalCompleted }/>
        </div>
    }
  
} 

export default TodoList