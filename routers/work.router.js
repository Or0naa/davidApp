const express = require('express')
const router = express.Router()
const workService = require('../services/work.service')

router.get('/', async (req, res) => {
    
    try {
        const filter = req.query
        const work = await workService.readAllWork(filter)
        res.status(200).json(work)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const work = await workService.readOneWork(filter)
        res.status(200).json(work)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/create', async (req, res) => {
    // console.log(req.body)
    try {
        const data = req.body
        const work = await workService.createNewWork(data)
        res.status(200).json(work)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    // console.log(req.params.id)
   try {
        const id = req.params.id
        const data = req.body
        const work = await workService.updateWork(id, data)
        res.status(200).json(work)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    
    try {
        const id = req.params.id
        const work = await workService.deleteWork(id, req.body)
        res.status(200).json(work)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router