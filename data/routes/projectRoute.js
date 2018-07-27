const express = require('express');
const projectModel = require('../helpers/projectModel');
const router = express.Router();

router.get('/', (req, res) => {
    projectModel.get()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(500).json({ error: "The projects information could not be retrieved." }))
})
router.get('/:id', (req, res) => {
    projectModel.get(req.params.id)
        .then(response => {
            if (!response) {
                res.status(400).json({ message: "The project with the ID does not exist." })
            } res.status(200).json(response)
        })
        .catch(err => res.status(500).json({ error: "The project information could not be retrieved." }))
})

module.exports = router;