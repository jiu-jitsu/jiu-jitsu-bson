
/**
 *
 */

module.exports = (long) => {
	return {
		low: ~long.low,
		high: ~long.high
	}
}
