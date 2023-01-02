const { MongoClient, ObjectID } = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id)
console.log(id.getTimestamp())

MongoClient.connect(connectionURL, { useNewUrlParser: true, useUnifiedTopology: true}, (error, client) => {
    if(error)
        return console.log('Unable to connect to database')
    
    const db = client.db(databaseName) 
    
    // db.collection('users').insertMany([
    //     {
    //         name: 'Sathvik',
    //         age: 26
    //     },
    //     {
    //         name: 'Mahesh',
    //         age: 26
    //     }
    // ], (error, result) => {
    //     if (error)
    //         return console.log('Unable to insert documents')
    //     console.log(result.ops)
    // })

    // db.collection('tasks').insertMany([
    //     {
    //         description: 'Watchlist page',
    //         completed: false
    //     }, {
    //         description: 'Monthly report',
    //         completed: true
    //     }, {
    //         description: 'Markets update',
    //         completed: false
    //     }
    // ], (err, res) => {
    //     if (err)
    //         return console.log('Task insertions falied')
    //     console.log(res.ops)
    // })

    // db.collection('users').findOne( { name: 'Rakesh' }, (err, user) => {
    //     if (err)
    //      return console.log('Unable to featch')

    //     console.log(user)
    // })


    // db.collection('users').find( { age: 26 }).count((err , count) => {
    //     if (err)
    //      return console.log('Unable to featch')

    //     console.log(count)
    // })

    // db.collection('tasks').findOne( { _id: ObjectID("63a06046f4f3c11b3841356f") }, (err, task) => {
    //     if (err)
    //      return console.log('Unable to featch')

    //     console.log(task)
    // })

    // db.collection('tasks').find( { completed: true }).toArray((err , completedTask) => {
    //     if (err)
    //      return console.log('Unable to featch')

    //     console.log(completedTask)
    // })

    // db.collection('users').updateOne({
    //     _id: ObjectID("63a05a05230b1e373c1dd8cf")
    // }, {
    //     $set: {
    //         age: 22
    //     }
    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection('users').updateOne({
    //     _id: ObjectID("63a05a05230b1e373c1dd8cf")
    // }, {
    //     $inc: {
    //         age: 1
    //     }
    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })

    // db.collection('tasks').updateMany({
    //     completed: false
    // }, {
    //     $set: {
    //         completed: true
    //     }
    // }).then((res) => {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err)
    // })

    db.collection('users').deleteOne({
        name: 'Rakesh'
    }).then((res)=> {
        console.log(res)
    }).catch((err) => {
        console.log(err);
    })


    // db.collection('users').deleteMany({
    //     age: 26
    // }).then((res)=> {
    //     console.log(res)
    // }).catch((err) => {
    //     console.log(err);
    // })
    
})
