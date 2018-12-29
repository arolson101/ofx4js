const debug = require('debug') as debug.IDebug;

export const LOG = {
	info: debug('ofx4js:info'),
	debug: debug('ofx4js:debug'),
	warning: debug('ofx4js:warning'),
	error: debug('ofx4js:error'),
}
