import React from 'react';
import ReactDOM from 'react-dom';
import {Tab, Tabs } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class DayTabsRouter extends React.Component {

  constructor(){
  super();
  this.state={style:{'font-size': '16px', color : 'black', float: 'center'}}
 }
 render(){
   return <Link to={{pathname: '/', search: '?time=All&day='+this.props.day }} >
     <p style={this.state.style}>{this.props.day}</p>
    </Link>
 }
}
export default DayTabsRouter;