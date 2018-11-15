import React, { Component } from 'react';

class CompletedTask extends Component{
        constructor(){
                super();
        }
	render(){
		return(
			<ul className="list-group">{
          {this.props.items.map(item => (
              return(
                <li key={item.id} className="finished-item">
                    <span>{item.text}</span>
                </li>
            )
            })
      }</ul>
		);
	}
}

export default CompletedTask;
