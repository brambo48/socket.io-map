/**
 * Generate a random lat & lng within a given radius from a center location
 * @param center
 * @param radius
 */
export function generateRandomLatLngWithinRadius ( center, radius ) {
	var r = radius / 111300 // = 100 meters
		, y0 = center[ 0 ]
		, x0 = center[ 1 ]
		, u = Math.random ()
		, v = Math.random ()
		, w = r * Math.sqrt ( u )
		, t = 2 * Math.PI * v
		, x = w * Math.cos ( t )
		, y1 = w * Math.sin ( t )
		, x1 = x / Math.cos ( y0 )

	const newY = y0 + y1
	const newX = x0 + x1

	return [ newY, newX ]
}

/**
 * Calculate the bearing between two lat&lngs
 * @param startLatLng
 * @param endLatLng
 * @returns {number}
 */
export function bearingBetweenTwoLocations ( startLatLng, endLatLng ) {
	const startLat = endLatLng[ 1 ] * Math.PI / 180
	const startLong = startLatLng[ 0 ] * Math.PI / 180
	const endLat = startLatLng[ 1 ] * Math.PI / 180
	const endLong = endLatLng[ 0 ] * Math.PI / 180

	let dLong = endLong - startLong

	const dPhi = Math.log ( Math.tan ( endLat / 2.0 + Math.PI / 4.0 ) / Math.tan ( startLat / 2.0 + Math.PI / 4.0 ) )
	if ( Math.abs ( dLong ) > Math.PI ) {
		if ( dLong > 0.0 ) {
			dLong = -(2.0 * Math.PI - dLong)
		} else {
			dLong = (2.0 * Math.PI + dLong)
		}
	}

	return ((Math.atan2 ( dLong, dPhi ) * (180 / Math.PI)) + 360.0) % 360.0
}