var connection = require('../../../../../configuration/database/connection');
module.exports = function(req, res, next) {
    const query = 'delete from favoritevacancies where vacancyId = ?';
    connection.query(query, [req.params.id], (err) => {
        if(err) {
            return next({
                status : 500,
                data : 'There was an error while deleting favorite vacancy'
            })
        }
        res.status(200).end();
    });
};
