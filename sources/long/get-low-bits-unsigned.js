
/**
 *
 */

const constants = require("./constants")

/**
 *
 */

module.exports = (long) => {

	/**
	 *
	 */

	if (long.low >= 0) {
		return long.low
	}

	/**
	 *
	 */

	return constants.TWO_PWR_32 + long.low

}
