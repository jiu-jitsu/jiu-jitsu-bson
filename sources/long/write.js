
/**
 *
 */

const negate = require("./negate")
const constants = require("./constants")

/**
 *
 */

module.exports = (value) => {

	/**
	 *
	 */

	if (value < 0) {

		/**
		 *
		 */

		return negate({
			low: (value % constants.TWO_PWR_32) | 0,
			high: (value / constants.TWO_PWR_32) | 0
		})

		/**
		 *
		 */

	} else {

		/**
		 *
		 */

		return {
			low: (value % constants.TWO_PWR_32) | 0,
			high: (value / constants.TWO_PWR_32) | 0
		}

	}

}
