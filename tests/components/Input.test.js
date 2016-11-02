import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'

import Input from './../../src/components/Input'
import { borderRadius } from './../../src/lib/styles'

it('renders rounded border in every edge of the input element when prop inline is false', () => {
  const div = document.createElement('div')
  const component = ReactDOM.render(<Input />, div)
  const inputElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
  expect(inputElement.style.borderRadius).toBe(`${borderRadius} ${borderRadius} ${borderRadius} ${borderRadius}`)
})

it('renders rounded border only in the right edges of the input element when prop inline is true', () => {
  const div = document.createElement('div')
  const component = ReactDOM.render(<Input inline />, div)
  const inputElement = ReactTestUtils.findRenderedDOMComponentWithTag(component, 'input')
  expect(inputElement.style.borderRadius).toBe(`${borderRadius} 0 0 ${borderRadius}`)
})
