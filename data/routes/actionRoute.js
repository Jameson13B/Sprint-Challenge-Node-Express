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
router.post('/', (req, res) => {
    const { project_id, description, notes, completed } = req.body;
    if (!project_id || !description) {
        res.status(400).json({ errorMessage: "Please provide a project_id and description for the action." })
    }
    actionModel.insert({ project_id, description, notes, completed })
        .then(response => res.status(201).json(response))
        .catch(err => res.status(500).json({ error: "The action could not be saved to the database" }))
})
router.delete('/:id', (req, res) => {
    actionModel.remove(req.params.id)
        .then(response => {
            if (!response) {
                res.status(404).json({ message: "The action with the ID does not exist." })
            } else {
                res.status(200).json({ message: "The action has been deleted."})
            }
        })
        .catch(err => res.status(500).json({ error: "The action could not be removed." }))
})

module.exports = router;