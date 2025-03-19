import React from "react";
import './Counter.css';

class Counter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          value: props.initialValue || 0
        };
    }

    increment = () => {
        this.setState((prevState) => ({
            value: prevState.value + 1
          }));
    }

    decrement = () => {
        this.setState((prevState) => ({
            value: prevState.value - 1
          }));
    }

    render() {
        return React.createElement(
            "div",
            {className : "counter-container"},
            React.createElement("h1", null, `Value: ${this.state.value}`),
            React.createElement(
                "button",
                {
                    className: "increment-button",
                    onClick: this.increment
                },
                "Increment"
            ),
            React.createElement(
                "button",
                {
                    className: "decrement-button",
                    onClick: this.decrement
                },
                "Decrement"
            )
        ) 
    }
}

export default Counter;