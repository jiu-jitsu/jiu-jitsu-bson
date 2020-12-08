
/**
 *
 */

module.exports = (a, b) => {

	/**
	 * divide each number into 4 chunks of 16 bits, and then sum the chunks.
	 */

	const a48 = a.high >>> 16
	const a32 = a.high & 0xFFFF
	const a16 = a.low >>> 16
	const a00 = a.low & 0xFFFF

	/**
	 *
	 */

	const b48 = b.high >>> 16
	const b32 = b.high & 0xFFFF
	const b16 = b.low >>> 16
	const b00 = b.low & 0xFFFF

	/**
	 *
	 */

	let c48 = 0
	let c32 = 0
	let c16 = 0
	let c00 = 0

	/**
	 *
	 */

	c00 += a00 + b00
	c16 += c00 >>> 16
	c00 &= 0xFFFF
	c16 += a16 + b16
	c32 += c16 >>> 16
	c16 &= 0xFFFF
	c32 += a32 + b32
	c48 += c32 >>> 16
	c32 &= 0xFFFF
	c48 += a48 + b48
	c48 &= 0xFFFF

	/**
	 *
	 */

	return {
		low: (c16 << 16) | c00,
		high: (c48 << 16) | c32
	}

}
