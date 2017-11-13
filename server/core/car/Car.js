// Libs & utils
import { bearingBetweenTwoLocations } from '../../core/utils/geoUtils'

export default class Car {
	constructor ( id, location ) {
		this.id = id
		this.location = location
		this.heading = 0
	}

	updateLocation ( location ) {
		this.heading = bearingBetweenTwoLocations ( this.location, location )
		this.location = location
	}
}