const handleProfileGet = (req, res, db) => {
    const { id } = req.params;

    db.select("*").from("users").where({ id })
        .then(users => {
            if (users.length) {
                res.json(users[0]);
            } else {
                res.status(400).json("an error occured");
            }
        })
        .catch(err => res.status(400).json("an error occured"));
}

module.exports = {
    handleProfileGet
}