const tracer = require('tracer');
function getLogger()
{
	return tracer.colorConsole();
}
module.exports.getLogger=getLogger;


