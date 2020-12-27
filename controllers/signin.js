const handleSignin = (db, bcrypt) => (req,res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("incorrect form submission");
    }
    db.select("email", "hash").from("login").where({ email })
        .then(loginData => {
            const isValid = bcrypt.compareSync(password, loginData[0].hash);
            if (isValid) {
                return db.select("*").from("users").where({ email })
                    .then(user => res.json(user[0]))
                    .catch(err => res.status(400).json("an error occured"));
            } else {
                return res.status(400).json("failed login");
            }
        })
        .catch(err => res.status(400).json("failed login"));
};

module.exports = {
    handleSignin
}