const express = require('express')
const router = express.Router()
const taskService = require('../services/task.service')



router.get('/byWork/:workId', async (req, res) => {
    try {
       
        const filter = req.params.workId
        const task = await taskService.readAlltask(filter)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const filter = req.params.id
        const task = await taskService.readOneTask(filter)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})
router.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const data = req.body
        const task = await taskService.createNewTask(data)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
       
        const id = req.params.id
        const data = req.body
        const task = await taskService.updatetask(id, data)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const task = await taskService.deletetask(id)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router