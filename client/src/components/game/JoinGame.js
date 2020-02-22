import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {connectNewPlayer, setGoal, updatePlayerNumber, updatePlayerName} from '../../store/actions/gameActions'


class JoinGame extends Component {
  constructor(props) {
      super(props)
      this.state = {
          input: ''
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (e) => {
      this.setState({
          input: e.target.value
      })
  }
  handleSubmit = (e) => {
      e.preventDefault()
      console.log(this.state.input)
      axios({
        method: 'post',
        url: '/joinGame',
        data: {
          name: this.state.input
        }
      })
      .then(response => { 
        this.props.setGoal(response.data.firstGoal)
        this.props.updatePlayerName(response.data.playerName)
        this.props.updatePlayerNumber(response.data.playerNumber)
      })
      .catch(error => {
        throw error;
      });
    this.props.connectNewPlayer(this.state.input)
  }
  
  render() {
    return (
      <form className='joinForm' onSubmit={this.handleSubmit}>
        <input className='joinFormInput' type="text" value={this.state.value} maxLength='24' placeholder='Your name' onChange={this.handleChange} />
        <input className='joinFormButton' type="submit" value="Join game" />
      </form>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    connectNewPlayer: (name) => dispatch(connectNewPlayer(name)),
    updatePlayerNumber: (playerNumber) => dispatch(updatePlayerNumber(playerNumber)),
    updatePlayerName: (playerName) => dispatch(updatePlayerName(playerName)),
    setGoal: (firstGoal) => dispatch(setGoal(firstGoal))
  }
}

export default connect(null, mapDispatchToProps)(JoinGame)