const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = require('../../src/models/user')
const Task = require('../../src/models/task')

const userOneId = mongoose.Types.ObjectId()
const userOne = {
    _id: userOneId,
    name: 'Nithin',
    email: 'nithink@gmail.com',
    password: 'Mypass777!',
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SCRET)
    }]
}

const userTwoId = mongoose.Types.ObjectId()
const userTwo = {
    _id: userTwoId,
    name: 'Niranjan',
    email: 'Niranjkan@gmail.com',
    password: 'Mypass777!',
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SCRET)
    }]
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'First task',
    completed: false,
    owner: userOne._id
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Second task',
    completed: false,
    owner: userOne._id
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'Third task',
    completed: true,
    owner: userTwo._id
}

const setupDatabase = async () => {
    await User.deleteMany()
    await Task.deleteMany()
    await User(userOne).save()
    await User(userTwo).save()
    await Task(taskOne).save()
    await Task(taskTwo).save()
    await Task(taskThree).save()
}


module.exports = {
    userOneId,
    userOne,
    userTwoId,
    userTwo,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}