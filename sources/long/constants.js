
/**
 *
 */

const fromInt = require("./from-int")
const fromBits = require("./from-bits")

/**
 *
 */

const ONE = fromInt(1)
const NEG_ONE = fromInt(-1)
const TWO_PWR_16 = 1 << 16
const TWO_PWR_24 = 1 << 24
const TWO_PWR_32 = TWO_PWR_16 * TWO_PWR_16
const TWO_PWR_31 = TWO_PWR_32 / 2
const TWO_PWR_48 = TWO_PWR_32 * TWO_PWR_16
const TWO_PWR_64 = TWO_PWR_32 * TWO_PWR_32
const TWO_PWR_63 = TWO_PWR_64 / 2
const MIN_VALUE = fromBits(0, 0x80000000 | 0)
const MAX_VALUE = fromBits(0xFFFFFFFF | 0, 0x7FFFFFFF | 0)

/**
 *
 */

exports.ONE = ONE
exports.NEG_ONE = NEG_ONE
exports.TWO_PWR_16 = TWO_PWR_16
exports.TWO_PWR_24 = TWO_PWR_24
exports.TWO_PWR_32 = TWO_PWR_32
exports.TWO_PWR_31 = TWO_PWR_31
exports.TWO_PWR_48 = TWO_PWR_48
exports.TWO_PWR_64 = TWO_PWR_64
exports.TWO_PWR_63 = TWO_PWR_63
exports.MIN_VALUE = MIN_VALUE
exports.MAX_VALUE = MAX_VALUE
