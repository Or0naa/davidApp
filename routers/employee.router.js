const express = require('express')
const router = express.Router()
const employeeService = require('../services/employee.service')

router.get('/', async (req, res) => {
    try {
        const filter = req.query
        const employee = await employeeService.readAllEmp(filter)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/:id', async (req, res) => {
    try {
        const filter = { _id: req.params.id }
        const employee = await employeeService.readOneEmp(filter)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.get('/works/:id', async (req, res) => {
    try {
        const filter = req.params.id
        console.log("lkjb",filter)
        const employee = await employeeService.readWorks(filter)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/', async (req, res) => {
    try {
        // console.log(req.body)
        const filter = req.body
        const employee = await employeeService.loginEmp(filter)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.post('/create', async (req, res) => {
    try {
        const data = req.body
        const employee = await employeeService.createNewEmp(data)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const data = req.body
        const employee = await employeeService.updateemployee(id, data)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const employee = await employeeService.deleteemployee(id)
        res.status(200).json(employee)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})


module.exports = router