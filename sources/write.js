
/**
 *
 */

const types = require("./types")

/**
 *
 */

const longWrite = require("./long/write")
const stringWrite = require("./string/write")

/**
 * based on http://bsonspec.org/#/specification
 */

function write (data) {

	/**
	 *
	 */

	const bufferArray = []
	const concatArray = []

	/**
	 *
	 */

	toBson(bufferArray, null, data, 0)
	toFlat(bufferArray, concatArray, 0)

	/**
	 *
	 */

	return Buffer.concat(concatArray)

}

/**
 *
 */

function toBson (bufferArray, key, data, deep) {

	/**
	 *
	 */

	key += ""

	/**
	 *
	 */

	let buffer_key = null
	let buffer_type = null
	let buffer_data = null
	let buffer_data_size = null

	/**
	 *
	 */

	if (data === null) {

		/**
		 *
		 */

		buffer_type = Buffer.alloc(1)
		buffer_type.writeInt8(types.TYPE_NULL, 0)
		buffer_key = stringWrite(key)

		/**
		 *
		 */

		bufferArray.push(buffer_type)
		bufferArray.push(buffer_key)

		/**
		 *
		 */

	} else if (data.constructor === Date) {

		/**
		 *
		 */

		const long = longWrite(data.getTime())

		/**
		 *
		 */

		buffer_type = Buffer.alloc(1)
		buffer_type.writeInt8(types.TYPE_DATE, 0)
		buffer_key = stringWrite(key)
		buffer_data = Buffer.alloc(8)
		buffer_data.writeInt32LE(long.low, 0)
		buffer_data.writeInt32LE(long.high, 4)

		/**
		 *
		 */

		bufferArray.push(buffer_type)
		bufferArray.push(buffer_key)
		bufferArray.push(buffer_data)

		/**
		 *
		 */

	} else if (data.constructor === Boolean) {

		/**
		 *
		 */

		buffer_type = Buffer.alloc(1)
		buffer_type.writeInt8(types.TYPE_BOOLEAN, 0)
		buffer_key = stringWrite(key)
		buffer_data = Buffer.alloc(1)
		buffer_data.writeInt8(data ? 1 : 0, 0)

		/**
		 *
		 */

		bufferArray.push(buffer_type)
		bufferArray.push(buffer_key)
		bufferArray.push(buffer_data)

		/**
		 *
		 */

	} else if (data.constructor === Number) {

		/**
		 *
		 */

		buffer_type = Buffer.alloc(1)
		buffer_key = stringWrite(key)

		/**
		 *
		 */

		buffer_type.writeInt8(types.TYPE_NUMBER, 0)
		buffer_data = Buffer.alloc(8)
		buffer_data.writeDoubleLE(data, 0)

		/**
		 *
		 */

		bufferArray.push(buffer_type)
		bufferArray.push(buffer_key)
		bufferArray.push(buffer_data)

		/**
		 *
		 */

	} else if (data.constructor === String && types.TYPE_ISO_8601.test(data)) {

		/**
		 *
		 */

		return toBson(bufferArray, key, new Date(data), deep)

		/**
		 *
		 */

	} else if (data.constructor === String) {

		/**
		 *
		 */

		buffer_type = Buffer.alloc(1)
		buffer_type.writeInt8(types.TYPE_STRING, 0)
		buffer_key = stringWrite(key)
		buffer_data = stringWrite(data)
		buffer_data_size = Buffer.alloc(4)
		buffer_data_size.writeInt32LE(buffer_data.length, 0)

		/**
		 *
		 */

		bufferArray.push(buffer_type)
		bufferArray.push(buffer_key)
		bufferArray.push(buffer_data_size)
		bufferArray.push(buffer_data)

		/**
		 *
		 */

	} else if (data.constructor === Object || data.constructor === Array) {

		/**
		 *
		 */

		const next = []

		/**
		 *
		 */

		if (deep) {

			/**
			 *
			 */

			buffer_key = stringWrite(key)
			buffer_type = Buffer.alloc(1)
			buffer_type.writeInt8(
				data.constructor === Object && types.TYPE_OBJECT ||
				data.constructor === Array && types.TYPE_ARRAY, 0
			)

			/**
			 *
			 */

			bufferArray.push(buffer_type)
			bufferArray.push(buffer_key)
			bufferArray.push(next)

		}

		/**
		 *
		 */

		for (key in data) {

			/**
			 *
			 */

			if (!data.hasOwnProperty(key)) {
				continue
			}

			/**
			 *
			 */

			toBson(deep && next || bufferArray, key, data[key], 1)

		}

		/**
		 *
		 */

		bufferArray.push(Buffer.alloc(1))

		/**
		 *
		 */

	} else {

		/**
		 *
		 */

		if (typeof data === "object") {
			return toBson(bufferArray, key, Object.assign({}, data), deep)
		}

	}

}

/**
 *
 */

function toFlat (bufferArray, concatArray, deep) {

	/**
	 *
	 */

	let size = 0
	let index = 0
	const buffer = Buffer.alloc(4)

	/**
	 *
	 */

	size += 4

	/**
	 *
	 */

	concatArray.push(buffer)

	/**
	 *
	 */

	for (index = 0; index < bufferArray.length; index++) {
		if (Buffer.isBuffer(bufferArray[index])) {
			size += bufferArray[index].length
			concatArray.push(bufferArray[index])
		} else {
			size += toFlat(bufferArray[index], concatArray, 1)
		}

	}

	/**
	 * + next 0x00
	 */

	buffer.writeInt32LE(size + deep, 0)

	/**
	 *
	 */

	return size

}

/**
 *
 */

module.exports = async (data) => write(data)
