// Libs & utils
import React, { Component } from 'react'
import io from 'socket.io-client'

// Components
import Map from '../map/Map'

// CSS
import './App.css'

class App extends Component {
	constructor () {
		super ()

		this.state = {
			cars: []
		}

		// initialize socket.io connection and bind websocket event handlers
		this.socket = io ( '/' )
		this.socket.on ( 'connect', () => {
			this.bindWebsocketHandlers ( this.socket )
		} )
	}


	bindWebsocketHandlers = ( socket ) => {
		socket.on ( 'setInitialCars', ( cars ) => {
			this.setState ( { cars } )
		} )
	}

	render () {
		return (
			<div className="App">

				<Map
					cars={this.state.cars}
					socket={this.socket}
				/>

			</div>
		)
	}
}

export default App
