import React from "react"
import AddItem from "./AddItem"
import ToDoItem from "./ToDoItem"

class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todoList: []
    }
  }

  componentDidMount() {
    this.hydrateStateWithLocalStorage()
    // add event listener to save state to localStorage
    // when user leaves/refreshes the page
    window.addEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    )
  }

  hydrateStateWithLocalStorage = () => {
    this.setState({
      todoList: JSON.parse(localStorage.getItem("list"))
    })
  }


  componentWillUnmount() {
    // remove event listener
    window.removeEventListener(
      "beforeunload",
      this.saveStateToLocalStorage.bind(this)
    )
    this.saveStateToLocalStorage()
  }

  saveStateToLocalStorage = () => {
    const items = this.state.todoList
    localStorage.setItem("list", JSON.stringify(items))
  }

  addItem = (newItem, newDeadline) => {
    //let daysToDeadline
    if (newDeadline) {
      this.daysToDeadline = Math.floor((new Date(newDeadline) - new Date()) /
      (1000 * 60 * 60 * 24) + 1)
    } else {
      this.daysToDeadline = 365
    }
    const items = this.state.todoList
    items.push({
      task: newItem,
      done: false,
      deadline: newDeadline,
      daysToDeadline: this.daysToDeadline
    })
    this.setState({
      todoList: items
    }, () => this.saveStateToLocalStorage())
  }

  updateDone = (itemId, isDone) => {
    const items = this.state.todoList
    const item = items[itemId]
    item.done = isDone
    items[itemId] = item
    this.setState({
      todoList: items
    }, () => this.saveStateToLocalStorage())
  }

  removeItem = (itemId) => {
    const items = this.state.todoList
    items.splice(itemId, 1)
    this.setState({
      todoList: items
    })
  }

  render() {
    return (
      <div className="app">
        <h1>Things I should do...</h1>
        <AddItem onAddItem={this.addItem} />

        {this.state.todoList.sort((a, b) => {
          if (b.daysToDeadline < a.daysToDeadline) {
            return 1
          } else if (b.daysToDeadline > a.daysToDeadline) {
            return -1
          } else {
            return 0
          }
        }).map((item, index) => {
          return <ToDoItem
            key={index}
            id={index}
            value={item.task}
            daysToDeadline={item.daysToDeadline}
            onDoneButtonClick={this.updateDone}
            onRemoveButtonClick={this.removeItem} />
        })}
      </div>
    )
  }

}

export default App
