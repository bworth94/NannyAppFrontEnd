import React from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
var querystring = require('querystring');
class Update extends React.Component {
  constructor() {
    super();
    this.state = {
      id: '',
      description: '',
      notes:'',
      time: '',
      day: '',
      messageFromServer: '',
      modalIsOpen: false
    }
this.update = this.update.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.nannyApp.id,
      description: this.props.nannyApp.description,
      notes: this.props.nannyApp.notes,
      time: this.props.nannyApp.time,
      day: this.props.nannyApp.day
    });
  }
componentWillReceiveProps(nextProps){
    this.setState({
      id: nextProps.nannyApp.id,
      description: nextProps.nannyApp.description,
      notes: nextProps.nannyApp.notes,
      time:nextProps.nannyApp.time,
      day:nextProps.nannyApp.day
    })
  }
openModal() {
    this.setState({
      modalIsOpen: true
    });
  }
closeModal() {
    this.setState({
      modalIsOpen: false,
      messageFromServer: ''
    });
  }
handleSelectChange(e) {
    if (e.target.name == "time") {
      this.setState({
        time: e.target.value
      });
    }
    if (e.target.name == "day") {
      this.setState({
        day: e.target.day
      });
    }
  }
handleTextChange(e) {
    if (e.target.name == "description") {
      this.setState({
        description: e.target.value
      });
    }
    if (e.target.name == "notes") {
      this.setState({
        notes: e.target.value
      });
    }
  }
onClick(e) {
    this.update(this);
  }
update(e) {
    var nannyApp = {
      id: e.state.id,
      description: e.state.description,
      notes: e.state.notes,
      time: e.state.time,
      day: e.state.day
    }

    axios.post('https://nanny-app-test.herokuapp.com/nannyApp/',nannyApp).then(function(response) {
      e.setState({
        messageFromServer: response.data
      });
});
  }
render() {
    if(this.state.messageFromServer == ''){
      return (
        <div>
          <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            contentLabel="Add Task"
            className="Modal">
<Link to={{pathname: '/', search: '?time='+this.state.time+'&day='+this.state.day }} style={{ textDecoration: 'none' }}>
            <Button bsStyle="danger" bsSize="mini" onClick={this.closeModal}><span className="closebtn glyphicon glyphicon-remove"></span></Button>
          </Link><br/>
<fieldset>
            <label for="description">Description:</label><input type="text" id="description" name="description" value={this.state.description} onChange={this.handleTextChange}></input>
            <label for="time">Time Due:</label><select id="time" name="time" value={this.state.time} onChange={this.handleSelectChange}>
                      <option value="8am" id="8am">8am</option>
                      <option value="9am" id="9am">9am</option>
                      <option value="10am" id="10am">10am</option>
                      <option value="11am" id="11am">11am</option>
                      <option value="12pm" id="12pm">12pm</option>
                      <option value="1pm" id="1pm">1pm</option>
                      <option value="2pm" id="2pm">2pm</option>
                      <option value="3pm" id="3pm">3pm</option>
                      <option value="4pm" id="4pm">4pm</option>
                      <option value="5pm" id="5pm">5pm</option>
                      <option value="6pm" id="6pm">6pm</option>
                      <option value="7pm" id="7pm">7pm</option>
                </select>
            <label for="day">Day:</label><select id="day" name="day" value={this.state.day} onChange={this.handleSelectChange}>
                      <option value="Monday" id="Monday">Monday</option>
                      <option value="Tuesday" id="Tuesday">Tuesday</option>
                      <option value="Wednesday" id="Wednesday">Wednesday</option>
                      <option value="Thursday" id="Thursday">Thursday</option>
                      <option value="Friday" id="Friday">Friday</option>
                </select>
            <label for="notes">Notes from Nanny:</label><input type="text" id="notes" name="notes" value={this.state.notes} onChange={this.handleTextChange}></input>
</fieldset>
<div className='button-center'>
              <br/>
              <Button bsStyle="warning" bsSize="small" onClick={this.onClick}>Update</Button>
            </div>
          </Modal>
        </div>
      )
    }
    else{
      return (
        <div>
         <Button bsStyle="warning" bsSize="small" onClick={this.openModal}><span className="glyphicon glyphicon-edit"></span></Button>
         <Modal
           isOpen={this.state.modalIsOpen}
           onAfterOpen={this.afterOpenModal}
           onRequestClose={this.closeModal}
           contentLabel="Add Task"
           className="Modal">
<div className='button-center'>
              <h3>{this.state.messageFromServer}</h3>
              <Link to={{pathname: '/', search: '?time='+this.state.time+'&day='+this.state.day}} style={{ textDecoration: 'none' }}>
                <Button bsClass="addButtonBackground" bsSize="mini" onClick={this.closeModal}>The Task Has Been Updated</Button>
              </Link>
            </div>
          </Modal>
        </div>
        )
      }
  }
}
export default Update;