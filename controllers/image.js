const Clarifai = require("clarifai");

//Clarifai APP
const app = new Clarifai.App({
    apiKey: process.env.CLARIFAI_API_KEY
});

const handleApiCall = (req, res) => {
    // app.models.predict("c0c0ac362b03416da06ab3fa36fb58e3", req.body.input)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
    .then(data => {
        res.json(data)
    })
    .catch(err => res.status(400).json("an error occured"));
}


const handleImage = (req, res, db) => {
    const { id } = req.body;

    db("users")
        .where({ id })
        .increment("entries", 1)
        .returning("entries")
        .then(entries => {
            res.json(entries);
        })
        .catch(err => res.status(400).json("an error occured"));
}

module.exports = {
    handleImage,
    handleApiCall
}