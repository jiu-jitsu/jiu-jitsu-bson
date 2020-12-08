
/**
 * http://bsonspec.org/spec.html
 */

module.exports = {

	/**
	 *
	 */

	TYPE_NUMBER: 1,
	TYPE_STRING: 2,
	TYPE_OBJECT: 3,
	TYPE_ARRAY: 4,
	TYPE_OID: 7,
	TYPE_BOOLEAN: 8,
	TYPE_DATE: 9,
	TYPE_NULL: 10,
	TYPE_INT32: 16,
	TYPE_TIMESTAMP: 17,
	TYPE_INT64: 18,

	/**
	 *
	 */

	TYPE_ISO_8601: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/i

}
