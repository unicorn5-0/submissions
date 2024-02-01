import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'

test('right content in blog form', async () => {
    const createBlog = jest.fn()
    const user = userEvent.setup()

  const {container} = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('.title')
  const author = container.querySelector('.author')
  const url = container.querySelector('.url')
  const btn = screen.getByText('create')

  await user.type(title, 'testing a form...')
  await user.type(author, 'testing')
  await user.type(url, 'testing.com/forms/')
  await user.click(btn)
   
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form...')

})

