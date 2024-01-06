const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const helper = require("./test_helper")


const intialUsers = [
  { 
      "username": "root",
      "name": "root",
      "password": "admin11"
  
  }
]

const api = supertest(app)

beforeEach(async () => {
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'root', passwordHash })
  await user.save()
  

  const usersAtStart = await helper.usersInDb()

  const intialBlogs = [
    {
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      user: usersAtStart[0].id
    },
    {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      user: usersAtStart[0].id
    }
  ]

  await Blog.deleteMany({})
  let blogObject = new Blog(intialBlogs[0])

  await blogObject.save()
  blogObject = new Blog(intialBlogs[1])
  await blogObject.save()


  

})



describe('Get works', () => {
test('Api returns the correct amout of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)

  })

test('return JSON has field called id', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  
    })

  })


describe('Adding blocks works', () => {
test('New blogs can be added', async () => {
  
  const usersAtStart = await helper.usersInDb()


  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    userId: usersAtStart[0].id

  
  }
  
 const login = await api.post('/api/login').send({ 
  "username": "root",
    "password": "sekret"})

  

  
  await api
  .post('/api/blogs')
  .set('Authorization', "Bearer " + login.body.token)
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
    
  expect(response.body).toHaveLength(3)

  expect(contents).toContain(
    'Go To Statement Considered Harmful'
  )

  })
test('New blogs can be added without likes(with default 0)', async () => {
    const usersAtStart = await helper.usersInDb()

    const login = await api.post('/api/login').send({ 
      "username": "root",
        "password": "sekret"})

    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      userId: usersAtStart[0].id
    
    }
  
    await api
    .post('/api/blogs')
    .set('Authorization', "Bearer " + login.body.token)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.likes)
      
    expect(response.body).toHaveLength(3)
  
    expect(contents).toContain(
      0
    )
  
    })
test('New blogs cant not be added without title', async () => {
      const usersAtStart = await helper.usersInDb()
      
      const login = await api.post('/api/login').send({ 
        "username": "root",
          "password": "sekret"})
      
      const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10,
        userId: usersAtStart[0].id

      
      }
    
      await api
      .post('/api/blogs')
      .set('Authorization', "Bearer " + login.body.token)
      .send(newBlog)
      .expect(400)
      
      })

})


describe('Delete works', () => {

test('can delete blocks', async () => {

  const login = await api.post('/api/login').send({ 
    "username": "root",
      "password": "sekret"})



  const response = await api.get('/api/blogs')
  
  expect(response.body).toHaveLength(2)
  
  const test = await api.get('/api/blogs')
  const target = `/api/blogs/${test.body[0].id}`

  await api.delete(target).set('Authorization', "Bearer " + login.body.token).expect(204)
  const out = await api.get('/api/blogs')
  expect(out.body).toHaveLength(1)

        
})

test('cant delete without authorization', async () => {
  const response = await api.get('/api/blogs')
    
  expect(response.body).toHaveLength(2)
    
  const test = await api.get('/api/blogs')
  const target = `/api/blogs/${test.body[0].id}`
  console.log(target)
  
  await api.delete(target).set('Authorization', "Bearer asfasfasfassfasf").expect(401)
  const out = await api.get('/api/blogs')
  expect(out.body).toHaveLength(2)
})
  
          
})
  
  





describe('Put works', () => {
test('can modify blogs', async () => {
  
  let response = await api.get('/api/blogs')
  const id = response.body[0].id

  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 999
  
  }

  await api.put(`/api/blogs/${id}`).send(newBlog).expect(200)




  response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.likes)
  expect(contents).toContain(999)

  
      
         
          
    })
})


afterAll(async () => {
    await mongoose.connection.close()
 })