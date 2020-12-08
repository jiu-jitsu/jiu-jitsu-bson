
/**
 * write c string
 * @param {String} value
 */
module.exports = (value) => {
	const buffer = Buffer.alloc(Buffer.byteLength(value) + 1)
	buffer.write(value, 0, "utf8")
	return buffer
}
