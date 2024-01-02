const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')

const intialBlogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  let blogObject = new Blog(intialBlogs[0])
  await blogObject.save()
  blogObject = new Blog(intialBlogs[1])
  await blogObject.save()

})


const api = supertest(app)

test('Api returns the correct amout of blogs', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(2)

  })

test('return JSON has field called id', async () => {
    const response = await api.get('/api/blogs')
  
    expect(response.body[0].id).toBeDefined()
  
    })


test('New blogs can be added', async () => {
    
  const newBlog = {
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
  
  }

  await api
  .post('/api/blogs')
  .send(newBlog)
  .expect(201)
  .expect('Content-Type', /application\/json/)
  
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)
    
  expect(response.body).toHaveLength(intialBlogs.length + 1)

  expect(contents).toContain(
    'Go To Statement Considered Harmful'
  )

  })


test('New blogs can be added without likes(with default 0)', async () => {
    
    const newBlog = {
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    
    }
  
    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)
    
    const response = await api.get('/api/blogs')
  
    const contents = response.body.map(r => r.likes)
      
    expect(response.body).toHaveLength(intialBlogs.length + 1)
  
    expect(contents).toContain(
      0
    )
  
    })
test('New blogs cant be adde without title', async () => {
    
      const newBlog = {
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 10
      
      }
    
      await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)
      
      })

test('can delete blogs', async () => {

  let response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(2)
  const id = response.body[0].id
  await api.delete(`/api/blogs/${id}`)
  response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(1)

    
       
        
  })

test('can modify blogs', async () => {
  
  let response = await api.get('/api/blogs')
  const id = response.body[0].id

  const newBlog = {
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 999
  
  }

  await api.put(`/api/blogs/${id}`).send(newBlog)




  response = await api.get('/api/blogs')
  const contents = response.body.map(r => r.likes)
  expect(contents).toContain(999)

  
      
         
          
    })

afterAll(async () => {
    await mongoose.connection.close()
 })