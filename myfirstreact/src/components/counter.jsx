import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navbar from './navbar';
import './App.css';
class Counter extends Component {
    state={
        count:1,
        tags: ['tag1', 'tag2', 'tag3']
    };

    renderTags(){
        if(this.state.tags.length === 0) return <p>There are no tags!</p>;
    }

    handleIncrement(){
        console.log('increment clicked');
    }

    render() { 
        return (
            <div>
                <Router>
                    <Navbar/>
                </Router>
            
                <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
                <button onclick={this.handleIncrement} className="btn btn-secondary btn-sm">Increment</button>
                <ul>
                    {this.state.tags.map(tag => <li key={tag}>{tag}</li>)}
                </ul>
            </div>
        );
    }

    getBadgeClasses() {
        let classes = "badge m-2 badge-";
        classes += (this.state.count === 0) ? "warning" : "primary";
        return classes;
    }

    formatCount(){
       
    }
}

 
export default Counter;