import React, {Component} from "react";
import './Counter.css'

export default class Counter extends Component{
    constructor(props) {
    super(props)
    this.state = {
        counter: 0
    }
        this.increment = this.increment.bind(this)
        this.decrement = this.decrement.bind(this)
        this.reset = this.reset.bind(this)
}



    render() {
        return(
            <div className="counter">
                <CounterButton by={1} incrementMethod ={this.increment} decrementMethod={this.decrement} />
                <CounterButton by={5} incrementMethod ={this.increment} decrementMethod={this.decrement}/>
                <CounterButton by={10} incrementMethod ={this.increment} decrementMethod={this.decrement}/>
                <span className="count">{this.state.counter}</span>
                {/*we use "this.state.counter because counter has state established inside the constructor*/}
                <div>
                    <button className="reset" onClick={this.reset}>Reset</button>
                </div>

            </div>
        )
    }

    reset(){
        this.setState({counter: 0})

    }

    increment(by) {   //you cannot update the state directly, you must use setState to update state "counter"
        this.setState(
            (prevState) => {       // previous state is the current state which is set to 0
                return { counter: prevState.counter + by }
            })

    }
    decrement(by) {
        this.setState(
            (prevState) => {
                return { counter: prevState.counter - by}
            }
        )
    }

}

 export class CounterButton extends Component {
    constructor(props) {
        super(props)
        this.state = {
            counter: 0
        }

        // this.increment = this.increment.bind(this) // always bind your functions in the constructor
        // this.decrement = this.decrement.bind(this)

    }
    render() {   // if you use an arrow function 'render = () => { instead...you wont need to bind it but arrow function will have to be added to the increment method as well

        return (
            <div className="counter">
                <button onClick={() => this.props.incrementMethod(this.props.by)}> + {this.props.by}</button>
                <button onClick={() => this.props.decrementMethod(this.props.by)}> - {this.props.by}</button>
                {/*<span className="count">{this.state.counter}</span>*/}
                {/*we use "this.state.counter because counter has state established inside the constructor*/}
            </div>
        )
    }

     // increment() {   //you cannot update the state directly, you must use setState to update state "counter"
     //     this.setState(
     //         (prevState) => {
     //            return { counter: prevState.counter + this.props.by }
     //         })
     //     this.props.incrementMethod(this.props.by)
     //
     //
     // }
     // decrement(){
     //
     //    this.setState(
     //        (prevState) => {
     //        return {counter: prevState.counter - this.props.by}
     //     })
     //
     //     this.props.decrementMethod(this.props.by)
     //
     // }



 }



