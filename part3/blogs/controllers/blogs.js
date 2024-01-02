const blogRouter = require('express').Router()
const Blog = require('../models/blog')


blogRouter.get('/', async (request, response )=> {
  const blogs = await Blog.find({})
  response.json(blogs)
  })

blogRouter.post('/', async (request, response) => {
  
  const body = request.body
  
  let likes = 0
  if (body.likes){likes = body.likes}

  const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: likes
  })

  const out = await blog.save()
  response.status(201).json(out)

  })

blogRouter.delete('/:id', async (request, response )=> {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
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