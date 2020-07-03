import React from 'react';

class Modal extends React.Component {

    constructor (props) {
        super(props)
        this.state = {
            name: '',
            completed: ''
        }
    }

    componentWillReceiveProps (props) {
        this.setState({ name: props.name })
        this.setState({ completed: props.completed })
    }

    render () {
        return <div className="modal fade" id="todoModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">{ this.state.name }</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    La tâche { this.state.completed  == 1 ? " est " : " n'est pas " } complétée.
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
            </div>
            </div>
        </div>
    }

}

export default Modal