import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import DisplayBlogs from './DisplayBlogs'

test('Renders content', () => {
  const blog = {
    title: 'Testaajan blogi',
    author: 'Teppo Testaaja',
    likes: 1
  }

  const component = render(
    <DisplayBlogs blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Testaajan blogi'
  )
})