// Libs & utils
import React, { Component } from 'react'
import { divIcon, latLngBounds } from 'leaflet'
import { Map as LeafletMap, Marker, TileLayer, Popup } from 'react-leaflet'
import { animateMarkerToNewLatLng } from '../../core/utils/markerUtils'

// Css
import './Map.css'
import 'leaflet/dist/leaflet.css'

class Map extends Component {

	constructor ( props ) {
		super ()
		this.markers = {}

		// When a cars' position gets updated -> animate the car to the new position
		props.socket.on ( 'carUpdated', ( car ) => {
			if ( Object.keys ( this.markers ).length && this.markers[ car.id ] ) {
				const marker = this.markers[ car.id ].leafletElement
				const rotation = car.heading
				const icon = divIcon ( {
					html: `<div class="car-div-icon" style="transform:rotate(${rotation}deg)"}></div>`,
				} );
				marker.setIcon(icon)
				animateMarkerToNewLatLng ( marker, car.location, 1500 )
			}
		} )
	}

	/**
	 * Event listener for when user dragged a car on the map
	 * @param event
	 * @param carId
	 */
	onMarkerDragged = ( event, carId ) => {
		const latLng = event.target.getLatLng ()
		this.props.socket.emit ( 'updateCar', { id: carId, location: [ latLng.lat, latLng.lng ] } )
	}

	/**
	 * Render all car markers on the map
	 * @param cars
	 */
	renderCarMarkers = ( cars ) => {
		return cars.map ( ( car ) => {
			const rotation = car.heading
			const icon = divIcon ( {
				html: `<div class="car-div-icon" style="transform:rotate(${rotation}deg)"}></div>`,
			} );

				return (<Marker
					key={car.id}
					position={car.location}
					icon={icon}
					ref={( marker ) => {
						this.markers[ car.id ] = marker;
					}}
					draggable={true}
					onDragEnd={( event ) => {
						this.onMarkerDragged ( event, car.id )
					}}>
					<Popup>
						<span>I'm a connected car! Vroooom!</span>
					</Popup>
				</Marker>)
			}
		)
	}

	render () {

		return (
			<div className="Map">
				<LeafletMap center={[ 55.661153, 12.3852195 ]} zoom={13} ref="mappie">
					<TileLayer
						url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>

					{ this.renderCarMarkers ( this.props.cars ) }
				</LeafletMap>
			</div>
		)
	}
}

export default Map
