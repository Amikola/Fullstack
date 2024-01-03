const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const middleware = require('../utils/middleware')





blogRouter.get('/', async (request, response )=> {
  const blogs = await Blog.find({}).populate("user", {username: 1, name: 1})
  response.json(blogs)
  })

blogRouter.post('/', middleware.tokenExtractor, 
middleware.userExtractor, async(request, response) => {
  
  const body = request.body
  
  const user = request.user
  
  let likes = 0
  if (body.likes){likes = body.likes}

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes,
      user: user._id

  })

  const out = await blog.save()
  user.blogs = user.blogs.concat(out._id)
  await user.save()
  response.status(201).json(out)

  })

blogRouter.delete('/:id',middleware.tokenExtractor,
middleware.userExtractor,  async (request, response )=> {
  console.log("alkaa")
  
  const user = request.user
  const blog = await Blog.findById(request.params.id)
  console.log("Haettiin: " + request.params.id)
  console.log("testiS")
  console.log(blog)

  if ( blog.user.toString() === user.id.toString() ){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  }else{
    return response.status(401).json({ error: 'Unauthorized' })
  }

  
})


blogRouter.put('/:id', async (request, response )=> {
  
  console.log(request.params.id)
  
  const body = request.body
  
  let likes = 0
  if (body.likes){likes = body.likes}

  const blog = new Blog({
      id: request.params.id,
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes
  })


  await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
  response.json(blog)
})



module.exports = blogRouter