import React from "react"
import "./style.css"

class Item extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      done: false
    }
  }

  // this is needed to set the done status of items loaded by localStorage
  componentDidMount() {
    let todoList = JSON.parse(localStorage.getItem("list"))
      // need the if statement when item is loaded from localStorage, since it doesn't have a props.id yet
      if (todoList.length > this.props.id) {
        this.setState({
          done: todoList[this.props.id].done
        })
      }
  }

  setDone = () => {
    this.setState({
      done: !this.state.done
    }, () => {
      this.props.onDoneButtonClick(this.props.id, this.state.done)
    })
  }

  removeItem = () => {
    this.setState({
      removed: true
    }, () => {
      this.props.onRemoveButtonClick(this.props.id, this.state.removed)
    })
  }


  render() {
    let todoStyles = this.state.done ? "done " : ""
    todoStyles += !this.state.done && this.props.daysToDeadline < 4 ? "urgent" : ""
    let todoDayText
    if (this.props.daysToDeadline < 1) {
      todoDayText = "(today)"
    } else if (this.props.daysToDeadline < 2) {
      todoDayText = "(in " + this.props.daysToDeadline + " day)"
    } else if (this.props.daysToDeadline < 4) {
      todoDayText = "(in " + this.props.daysToDeadline + " days)"
    }
    return (
      <div className="list-item">
        <div className="left">
          <button
            className={todoStyles}
            onClick={this.setDone}>{this.props.value} {todoDayText}
          </button>
        </div>
        <button onClick={this.removeItem}><i className="fas fa-minus"></i></button>
      </div>
    )
  }

}

export default Item
