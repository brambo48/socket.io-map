// Libs & utils
import express from 'express'
import http from 'http'
import socketIo from 'socket.io'
import Car from './core/car/Car'
import { generateRandomLatLngWithinRadius } from './core/utils/geoUtils'

// Configuration files
import { appConfig, routeConfig } from './config/index'

const ENV_PRODUCTION = process.env.NODE_ENV === 'production'
const app = express ()
// Only use express to serve static client build in production mode
const server = ENV_PRODUCTION ? http.Server ( app ) : http.Server ()
const io = socketIo ( server )

appConfig.configureApp ( app )
routeConfig.configureRoutes ( app )

//=====================================
//  LISTEN
//-------------------------------------
server.listen ( appConfig.port, appConfig.host, error => {
	if ( error ) {
		console.log ( error )
	}
	else {
		console.log ( `Server listening @ ${appConfig.host}:${appConfig.port}` )
	}
} )

//=====================================
//  CREATE SOME CARS, YEAH!
//-------------------------------------
let cars = []
let originLocation = [ 55.661153, 12.3852195 ]
for ( let i = 0; i < 15; i++ ) {
	const carLocation = generateRandomLatLngWithinRadius ( originLocation, 10000 )
	const car = new Car ( i, carLocation )
	cars.push ( car )
}


//=====================================
//  SOCKET.IO HANDLERS
//-------------------------------------
io.on ( 'connection', ( socket ) => {
	// Debug information about user connection
	console.log ( `User with id ${socket.id} connected` )

	// Upon client connection -> send all current car locations to the client
	socket.emit ( 'setInitialCars', cars )

	// When a user updates the position of a car -> broadcast the new position to all clients
	socket.on ( 'updateCar', ( updatedCar ) => {
		let cachedCar = cars.find ( ( car ) => {
			return car.id === updatedCar.id
		} )

		cachedCar.updateLocation ( updatedCar.location )
		io.sockets.emit ( 'carUpdated', cachedCar )
	} )
} )