const express = require('express');
const actionModel = require('../helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    actionModel.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "Action .get catch error" }))
})

module.exports = router;