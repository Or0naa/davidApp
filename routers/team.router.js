const express = require('express')
const router = express.Router()
const teamService = require('../services/team.service')

router.get('/', async (req, res) => {
    try {
        const filter = req.query
        const team = await teamService.readAllteam(filter)
        res.status(200).json(team)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const team = await teamService.readOneteam(filter)
        res.status(200).json(team)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/create', async (req, res) => {
    try {
        const data = req.body
        const team = await teamService.createNewTeam(data)
        res.status(200).json(team)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const team = await teamService.updateteam(id, data)
        res.status(200).json(team)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const team = await teamService.deleteteam(id)
        res.status(200).json(team)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router