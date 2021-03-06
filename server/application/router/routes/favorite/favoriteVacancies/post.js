var connection = require('../../../../../configuration/database/connection');

module.exports = function(req, res, next) {
    const query = 'insert into favoritevacancies set ?';
    connection.query(query, {userId: req.user.id, vacancyId: req.params.id}, (err, result) => {
        if(err) {
            return next({
                status : 500,
                data : (typeof err == "string") ? err : 'There was an error while adding favorite vacancy'
            })
        }
        res.status(200).send(result);
    });
};
