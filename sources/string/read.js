
/**
 * read c string
 * @param {Buffer} buffer
 * @param {Number} offset
 */
module.exports = (buffer, offset) => {

	/**
	 *
	 */

	for (let index = offset; index < buffer.length; index++) {
		if (buffer[index] === 0) {
			return buffer.toString("utf8", offset, index)
		}
	}

	/**
	 *
	 */

	throw new Error("Unterminated c-string!")

}
