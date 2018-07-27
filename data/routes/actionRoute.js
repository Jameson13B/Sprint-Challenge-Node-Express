const express = require('express');
const actionModel = require('../helpers/actionModel');
const router = express.Router();

router.get('/', (req, res) => {
    actionModel.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "Action .get catch error" }))
})
router.get('/:id', (req, res) => {
    actionModel.get(req.params.id)
        .then(response => {
            if (!response) {
                res.status(400).json({ message: "The action with the ID does not exist." })
            } res.status(200).json(response)
        })
        .catch(err => res.status(500).json({ error: "The action information could not be retrieved." }))
})

module.exports = router;