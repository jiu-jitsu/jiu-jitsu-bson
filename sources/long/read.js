
/**
 *
 */

const constants = require("./constants")
const getLowBitsUnsigned = require("./get-low-bits-unsigned")

/**
 *
 */

module.exports = (long) => {
	return long.high * constants.TWO_PWR_32 + getLowBitsUnsigned(long)
}
