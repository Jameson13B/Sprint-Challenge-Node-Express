const express = require('express');
const projectModel = require('../helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    projectModel.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "Project .get catch error" }))
})

module.exports = router;