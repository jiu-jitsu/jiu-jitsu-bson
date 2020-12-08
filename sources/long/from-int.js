
/**
 *
 */

module.exports = (value) => {
	return {
		low: value | 0,
		high: value < 0 ? -1 : 0
	}
}
