import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import BlogForm from './BlogForm'


test('renders blog without clicking', () => {
    const blog = {
        user: "asdgasgasgsaga15125",
        title: "How to do testing",
        author: "Testi Timo",
        url: "testi.com",
        likes: 11,
    }

    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()
  
    render(<Blog blog={blog}  liker={mockHandler} deleter={mockHandler2} />)
  
    const element = screen.getByText('How to do testing Testi Timo')
    expect(element).toBeDefined()
    const div = element.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')

  })


test('renders blog with clicking',async () => {
    
    const blog = {
        user: "asdgasgasgsaga15125",
        title: "How to do testing",
        author: "Testi Timo",
        url: "testi.com",
        likes: 11,
    }

    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()
  
    render(<Blog blog={blog}  liker={mockHandler} deleter={mockHandler2} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const element = screen.getByText('How to do testing Testi Timo')
    const div = element.querySelector('.togglableContent')
    expect(div).not.toHaveStyle('display: none')
  })

test('Like works', async () => {
    
    const blog = {
        user: "asdgasgasgsaga15125",
        title: "How to do testing",
        author: "Testi Timo",
        url: "testi.com",
        likes: 11,
    }

    const mockHandler = jest.fn()
    const mockHandler2 = jest.fn()
  
    render(<Blog blog={blog}  liker={mockHandler} deleter={mockHandler2} />)

    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const likeButton = screen.getByText("like")
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
    
  })


test('<Blogform /> updates parent state and calls onSubmit', async () => {
    
    const user = userEvent.setup()
    const createBlog = jest.fn()
  
    render(<BlogForm createBlog={createBlog} />)
    screen.debug()
  
    const inputs = screen.getAllByRole('textbox')
    const sendButton = screen.getByText('create')
  
    await user.type(inputs[0], "Title")
    await user.type(inputs[1], "Writer")
    await user.type(inputs[2], "Url.com")
    await user.click(sendButton)
  
    expect(createBlog.mock.calls).toHaveLength(1)

    expect(createBlog.mock.calls[0][0].title).toBe('Title')
    expect(createBlog.mock.calls[0][0].author).toBe('Writer')
    expect(createBlog.mock.calls[0][0].url).toBe('Url.com')

  })

