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
router.get('/:id/actions', (req, res) => {
  projectModel.getProjectActions(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404).json({ message: "The project with the ID does not exist." })
      } res.status(200).json(response);
    })
    .catch(err => res.status(500).json({ error: "The project's actions could not be retrieved."}))
})
router.post('/', (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res.status(400).json({ errorMessage: "Please provide a name and description for the project." })
  }
  projectModel.insert({ name, description, completed })
    .then(response => res.status(201).json(response))
    .catch(err => res.status(500).json({ error: "The project could not be saved to the database" }))
})
router.delete('/:id', (req, res) => {
  projectModel.remove(req.params.id)
    .then(response => {
      if (!response) {
        res.status(404).json({ message: "The project with the ID does not exist." })
      } else {
        res.status(200).json({ message: "The project has been deleted." })
      }
    })
    .catch(err => res.status(500).json({ error: "The project could not be removed." }))
})
router.put('/:id', (req, res) => {
  const { name, description, completed } = req.body;
  if (!name || !description) {
    res.status(400).json({ errorMessage: "Please provide name and description for the project." })
  }
  projectModel.update(req.params.id, { name, description, completed })
    .then(response => {
      if (response === null) {
        res.status(404).json({ message: "The project with the specified ID does not exist." })
      } else {
        res.status(200).json({ response });
      }
    })
    .catch(err => res.status(500).json({ error: "The project could not be updated" }))
})

module.exports = router;