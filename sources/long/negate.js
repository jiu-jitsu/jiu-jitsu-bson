
/**
 *
 */

const add = require("./add")
const not = require("./not")
const constants = require("./constants")

/**
 *
 */

module.exports = (long) => {
	return add(not(long), constants.ONE)
}
