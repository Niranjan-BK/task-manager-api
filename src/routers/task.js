const express = require('express')
const Task = require('../models/task')
const auth = require('../middleware/auth')
const { findOneAndDelete } = require('../models/user')
const router = express.Router()

router.post('/tasks', auth, async (req, res) => {
    //const task = Task(req.body)
    const task = Task({
        ...req.body,
        owner: req.user._id
    })
    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error)
    }
})

// GET /tasks/?completed?true
// GET /tasks/?limit=10&skip=0
// GET /tasks?sortBy=createdAt_asc
router.get('/tasks', auth, async (req, res) => {
    const match = {}
    const sort = {}

    if (req.query.completed)
        match.completed = req.query.completed === 'true'
    if (req.query.sortBy) {
        const parts = req.query.sortBy.split('_')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }
    try {
        //const tasks = await Task.find({ owner: req.user._id }, null, { limit: parseInt(req.query.limit), skip: parseInt(req.query.skip)})  //alternative way
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks) 
    } catch (error) {
        res.status(500).send()
    }
    
})

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id
    try {
        //const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})
        if(!task)
            return res.status(404).send()
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.patch('/tasks/:id', auth, async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedupdates = ['description', 'completed' ]
    const isValidOperation = updates.every((update) => allowedupdates.includes(update))

    if(!isValidOperation)
        return res.status(400).send('Invalid updates!')
    try {
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id })
        
        // can not use the below code because it bypass Middleware 'save'
        //const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true})
        if(!task)
            return res.status(404).send()
        updates.forEach((update) => {
            task[update] = req.body[update]
        })
        await task.save()
        res.send(task)
    } catch (error) {
        res.status(500).send()
    }
})

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
       //const task = await Task.findByIdAndDelete(req.params.id)
       const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id })
       if(!task)
            return res.status(404).send()
        res.send(task) 
    } catch (error) {
        res.status(500).send(error)
    }
})

module.exports = router