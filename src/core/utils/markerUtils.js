// Libs & utils
import L from 'leaflet'

/**
 * Annimate the transition of a markers position to a new lat & lng
 * @param marker
 * @param destinationLatLng
 * @param duration
 */
export function animateMarkerToNewLatLng (marker, destinationLatLng, duration) {
	const startTime = performance.now()
	const startLatLng = [marker.getLatLng().lat, marker.getLatLng().lng]
	const animate = () => {
		let remainingAnimationTime = (startTime + duration) - performance.now()
		let percentDone = (duration - remainingAnimationTime) / duration;

		let currLatLng = []
		currLatLng[0] = (destinationLatLng[0] * percentDone) + ( startLatLng[0] * (1 - percentDone) )
		currLatLng[1] = (destinationLatLng[1] * percentDone) + ( startLatLng[1] * (1 - percentDone) )

		marker.setLatLng(currLatLng)

		if(remainingAnimationTime>0){
			L.Util.requestAnimFrame(animate)
		}
	}
	animate()
}