import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Header extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      hamburger_open: true
    } 
  }
  
  toggleHamburger = () => {
    this.setState({
      hamburger_open: !this.state.hamburger_open
    })
  }
  
  render() {
    let hamburger_class = "hamburger right";
    let menu_class = "hamburger_menu";
    if(!this.state.hamburger_open) {
      hamburger_class += " open"; 
      menu_class += " open"; 
    }
    return (
      <div>
        <div className="header">
                <h1>{this.props.title}</h1>
                <Link to="/">Home</Link>                
          <div className={hamburger_class} onClick={this.toggleHamburger}>
            <div className="hamburger2"/>        
          </div>    	 
        </div>
        <div className={menu_class}>
          <a href="#">Your travels</a>
          <a href="#">See more destinations</a>
          <a href="#">Popular travels</a>
          <a href="#">About us</a>
        </div>
      </div>
    )
  }
};