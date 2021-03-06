var connection = require('../../../configuration/database/connection');

module.exports = function(req, res, next) {
    const query = 'select * from cities where countryId = ?';
    connection.query(query, [req.params.countryId], function(err, result) {
        if(err) {
            return next({
                status : 500,
                data : 'Server error'
            })
        }
        res.status(200).json(result);
    });
}