var mysql      = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'library'
});
 
const query = (sql, options, callback) =>{
	if (typeof options === "function") {
		callback = options;
		options = undefined;
	}
	pool.getConnection((err, conn) => {
		if(err) {
			console.log(err);
			callback(err, null, null);
		}
		else{
			conn.query(sql, options, (err, result, fields)=>{
				callback(err, result, fields);
			});
			conn.release();
		}
	})
}

module.exports = {
	query,
	pool
}