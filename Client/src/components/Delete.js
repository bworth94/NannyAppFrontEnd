import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

class Delete extends React.Component {
constructor(){
  super();
  this.state={id: '', time: '', day: ''};
  this.onClick = this.onClick.bind(this);
  this.delete = this.delete.bind(this);
}
componentDidMount() {
    this.setState({
      id: this.props.nannyApp.id,
      time: this.props.nannyApp.time,
      day: this.props.nannyApp.day
    })
  }
componentWillReceiveProps(nextProps){
  this.setState({
    id: nextProps.nannyApp.id,
    time:nextProps.nannyApp.time,
    day:nextProps.nannyApp.day
  })
  }
onClick(){
     this.delete(this);
    }
delete(e){
  console.log(e.state.id);
    axios.delete('https://nanny-app-test.herokuapp.com/',{
        params: { id: e.state.id }
      })
      .then(function(response){
});
}
render(){
  return (
    <Button bsStyle="danger" bsSize="small" onClick={this.onClick}>
     <Link to={{pathname: '/', search: '?time='+this.state.time+'&day='+this.state.day}} style={{ textDecoration: 'none' }}>
                  <span className="glyphicon glyphicon-remove"></span>
         </Link>
    </Button>
)
 }
}
export default Delete;