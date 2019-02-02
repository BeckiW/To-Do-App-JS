import React from "react"
import DayPickerInput from "react-day-picker/DayPickerInput"
import "react-day-picker/lib/style.css"
import "./style.css"

class AddItem extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      todoItem: "",
      message: "",
      todoDate: ""
    }
  }

  handleClick = () => {
    if ((new Date(this.state.todoDate) - new Date()) < (-24*60*60*1000)) {
      this.setState({
        message: "Oops, that's in the past. Try again!"
      })
    } else if (this.state.todoItem === "") {
      this.setState({
        message: "Oops, that's not a valid task. Try again!"
      })
    } else {
      this.props.onAddItem(this.state.todoItem, this.state.todoDate)
      this.setState({
        todoItem: "",
        message: "",
        todoDate: ""
      })
    }
  }

  handleDayChange = (day) => {
    if (day !== undefined) {
      this.setState({
        todoDate: day.toString()
      })
    }
  }

  render() {
    return (
      <div className="add">
        <input type="text" value={this.state.todoItem} placeholder="New task" onChange={event => this.setState({ todoItem: event.target.value.toString() })} />
        <DayPickerInput placeholder="Deadline (optional)" clickUnselectsDay={true} onDayChange={this.handleDayChange} />
        <p>(Click on a date again to clear it from the calendar)</p>
        <button type="button" onClick={this.handleClick}>Add</button>
        <p>{this.state.message}</p>
      </div>
    )
  }
}

export default AddItem
