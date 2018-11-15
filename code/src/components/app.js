import React from "react"
import TodoList from "../toDoList"
import "./style.scss"
import CompletedTask from "../CompletedTask"


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


  updatedTasks = (task) => {
    let updatedTasks = this.state.tasks;
    updatedTasks.unshift(task);
    this.setState({tasks:updatedTasks});
    this.updateLocalStorage(updatedTasks);
  }

  removeItem = (removeItemID) => {
    const listUpdate = this.state.toDoItems
      .filter(item => {
        return item.id !== removeItemID
      })
    this.setState({
      items: listUpdate
    }, () => {
      const dataToStorage = JSON.stringify(this.state.items)
      localStorage.setItem("toDoList", dataToStorage)
      this.handleSearch(this.state.searchString)
    })
}

  endTask = (task) => {
    let endTasks = this.state.end;
    endTasks.unshift(task);
    this.setState({finish:endTasks});
    this.endLocalStorage(endTasks);
    console.log(endTasks);
}


updateLocalStorage(updatedTasks){
  localStorage.setItem('storeTasks',JSON.stringify(updatedTasks));
}

endLocalStorage(endTasks){
  localStorage.setItem('endTasks',JSON.stringify(endTasks));
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

        <div className="button">
              	<h3>Add New Task</h3>
              	<AddNewTask updateTasks = {this.updateTasks}/>
          </div>

              <div className="button">
              	<h3>To Do List</h3>
              		<TodoList tasks = {this.state.tasks} remove= {this.removeTask} />
              </div>

              <div className="button">
              	<h3>Completed Tasks</h3>
              	<CompletedTask finishes = {this.state.end} />
      </div>

      </div>

    )
  }
}

export default App
