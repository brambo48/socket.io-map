// Libs & utils
import React, { Component } from 'react'
import { divIcon, latLngBounds } from 'leaflet'
import { Map as LeafletMap, Marker, TileLayer, Popup } from 'react-leaflet'

// Css
import './Map.css'
import 'leaflet/dist/leaflet.css'

class Map extends Component {

	onMarkerDragged = ( event ) => {
		console.log ( event.target.getLatLng () )
	}

	render () {
		const icon = divIcon ( { className: 'car-div-icon' } );

		return (
			<div className="Map">
				<LeafletMap center={[ 55.661153, 12.3852195 ]} zoom={13}>
					<TileLayer
						url='https://stamen-tiles-{s}.a.ssl.fastly.net/watercolor/{z}/{x}/{y}.png'
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>
					<Marker
						position={[ 55.661153, 12.3852195 ]}
						icon={icon}
						draggable={true}
						onDragEnd={this.onMarkerDragged}>
						<Popup>
							<span>I'm a connected car! Vroooom!</span>
						</Popup>
					</Marker>
				</LeafletMap>
			</div>
		)
	}
}

export default Map
