const moment = require('moment');

const formateDate = (date) =>{
	return moment(date).format('YYYY-MM-DD');
}

const getDaysBetweenRange = (from, to) => {
	var a = moment(from);
	var b = moment(to);
	return b.diff(a, 'days');
}

const sqlBool = (val) =>{
	return typeof val === 'Integer' && val === 0 ? false : true;
}

module.exports = {formateDate, getDaysBetweenRange, sqlBool}