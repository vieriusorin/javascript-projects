module.exports = function (gulp, $) {
	del            = require('del');
    return function() {
    	del([dest + '*']);
    }
}