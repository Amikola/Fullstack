const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/user')
const bcrypt = require('bcrypt')


const api = supertest(app)


beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

describe('User creation works', () => {

    test('Api returns the added user', async () => {
    const response = await api.get('/api/users')
    expect(response.body).toHaveLength(1)
    })

    test('Can add new users', async () => {
        let test =
        { 
            "username": "second",
            "name": "user",
            "password": "11111111",
        }
        
        await api.post('/api/users')
        .send(test).expect(201)
        .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/users')
        expect(response.body).toHaveLength(2)
        })

    
    test('Api output 400 if username or bad word is too short', async () => {
        
        let test =
        { 
            "username": "ro",
            "name": "root",
            "password": "admin11"
        }
    
        await api.post('/api/users').send(test).expect(400)

        test =
        { 
            "username": "test",
            "name": "root",
            "password": "a"
        }

        await api.post('/api/users').send(test).expect(400)

        

        })

        

})

afterAll(async () => {
    await mongoose.connection.close()
 })