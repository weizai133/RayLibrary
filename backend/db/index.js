var mysql = require('mysql');
var pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'ray_library'
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

const asyQuery = (sql, options) => {
	return new Promise((resolve, reject)=>{
		pool.getConnection((err, conn) => {
			if(err) reject(err);
			else {
				conn.query(sql, options, (err, result, fields)=>{
					if(err) return reject(err);
					resolve(result);
				})
			}
		})
	})
}

module.exports = {
	query,
	pool,
	asyQuery
}