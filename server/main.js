// Libs & utils
import express from 'express'
import http from 'http'
import socketIo from 'socket.io'

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
		debug ( error )
	}
	else {
		debug ( `Server listening @ ${appConfig.host}:${appConfig.port}` )
	}
} )