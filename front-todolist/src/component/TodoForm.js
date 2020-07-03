import React from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: `http://127.0.0.1:8000/api/` });

// Formulaire pur créer une tâche
class TodoForm extends React.Component {

    constructor (props) {
      super(props)
      this.state = {
        name: '',
        classInvalid: 'invalid-invisible'
      }
      this.handleTodoNameChange = this.handleTodoNameChange.bind(this)
      this.handleSubmit = this.handleSubmit.bind(this)
    }
  
    handleTodoNameChange (e) {
      this.setState({ name: e.target.value })
    }
  
    async handleSubmit (e) {
      e.preventDefault()
      const name = this.state.name
      try {
        const response = await API.post(`todos`, { name })
        let rows = this.props.todos.slice()
        rows.push(response.data)
        this.props.onTodoListChange(rows)
        this.setState({ classInvalid: 'invalid-invisible'})
        this.setState({ name: '' })
      } catch (e) {
        console.error(e)
        this.setState({ classInvalid: 'alert alert-danger'})
      }
    }
  
    render () {
      return <div>
        <form className="text-center border border-light p-5" onSubmit={ this.handleSubmit }>
          <input type="text" id="name" name="name" value={ this.state.name } className="form-control mb-4" placeholder="Nouvelle tâche" onChange={ this.handleTodoNameChange } />
          <div className={ this.state.classInvalid }> Remplissez ce champs !</div>
          <button className="btn btn-primary" type="submit">Ajouter</button>
        </form>
      </div>
    }
  
}

export default TodoForm