import React from "react"
import TodoList from "./todoList"
import "./style.scss"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      items: [],
      text: ""
    }
  }

  handleChange = (event) => {
  this.setState({ text: event.target.value })
}

handleSubmit = (event) => {
    event.preventDefault()
    if (!this.state.text.length) {
      return
    }
    const newItem = {
      text: this.state.text,
      id: Date.now()
    }
    this.setState(prevState => ({
      items: prevState.items.concat(newItem),
      text: ""
    }))
  }

  render() {
    return (


      <div className="container">
      <h3 className="test">TO-DO LIST </h3>
        <form onSubmit={this.handleSubmit}>
          <input className = "inputValue"
            onChange={this.handleChange}
            value={this.state.text} />
          <button>
            Add item
          </button>
          <TodoList items={this.state.items} />
        </form>
      </div>
    
    )
  }
}

export default App
