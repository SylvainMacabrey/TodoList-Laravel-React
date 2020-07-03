import React from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: `http://127.0.0.1:8000/api/` });

// Checkbox pour les tâches complêtées
const Checkbox = ({ label, isSelected, onCheckboxChange }) => (
    <div className="form-check">
      <label>
        <input type="checkbox" name={ label } checked={ isSelected } onChange={ onCheckboxChange } className="form-check-input" />
        { label }
      </label>
    </div>
)

// Tâche à faire
class TodoRaw extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        todo: props.todo
      }
      this.completedTodo = this.completedTodo.bind(this)
    }
  
    async completedTodo () {
      let todo = this.state.todo
      const response = await API.patch(`todos/${ todo.id }`, { completed: !todo.completed })
      this.setState(todo)
      this.props.onCompletedTodo(todo)
    }
  
    render () {
      const { onDeleteTodo, onChangeTodoModal } = this.props
      const { todo } = this.state
      return <li className="list-group-item">
        <Checkbox label={ todo.name } isSelected={ todo.completed } onCheckboxChange={ this.completedTodo } key={ todo.id } />
        <button className="btn btn-danger btn-delete-toto" onClick={() => onDeleteTodo(todo.id)}>
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
        <button className="btn btn-secondary btn-update-toto" data-toggle="modal" data-target="#todoModal" onClick={ () => onChangeTodoModal(todo) }>
          <i className="fa fa-info-circle" aria-hidden="true"></i>
        </button>
      </li>
    }
  
}

export default TodoRaw