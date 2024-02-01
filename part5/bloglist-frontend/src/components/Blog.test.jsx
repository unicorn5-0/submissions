import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog containe', () => {
    let container
    const blog = {
        title: 'jest-dom',
        author: 'jestins',
        url: 'jestins.com/jestins',
        likes: 20,
        user: {
            name: 'homer'
        }
    }

    const mockHandler = jest.fn()

    beforeEach(() => {

        container = render(<Blog blog={blog} addLikes={mockHandler} />).container
    })

    test('renders', () => {
   

        const div = container.querySelector('.blog')
    
        expect(div).toHaveTextContent('jest-dom jestins')
        
    
    
    })

    test('diplay none on blog body', () => {
        const div = container.querySelector('.togglableContent')
        expect(div).toHaveStyle('display: none')
    })

    test('blog body displays when button is clicked', async () => {
        const user = userEvent.setup()

        const button = screen.getByText('view')
        await user.click(button)

        const div = container.querySelector('.togglableContent')
        expect(div).not.toHaveStyle('display: none')
        expect(button).toHaveTextContent('hide')
    })

    test('event hantler for likes is called twice', async () => {

      const user = userEvent.setup()
      const button = screen.getByText('like')
      for (let i = 0; i < 2; i++) {
        console.log(i);  
        await user.click(button)  
      }

      expect(mockHandler.mock.calls).toHaveLength(2)
    })
    
})




