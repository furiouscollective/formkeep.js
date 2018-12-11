import { mountFixture, unmountFixture } from '../spec/utils'

import './autoloadAsyncForms'
import { asyncForm } from './asyncForm'

jest.mock('./asyncForm')

describe('autoloadAsyncForms.js', () => {
  const formkeepIdentifier = '149105c7eb4a'
  const utf8 = '✓'
  const email = 'test@example.com'
  const comments = 'I ❤️ FormKeep'

  beforeEach(() => {
    mountFixture('autoloadAsyncForms', `
      <form id="test-form" data-formkeep-id="${formkeepIdentifier}">
        <input type="hidden" name="utf8" value="${utf8}" />
        <input name="email" value="${email}" />
        <textarea name="comments">${comments}</textarea>
        <button type="submit">Submit</button>
      </form>
    `)
    asyncForm.mockReturnValue(true)
  })

  afterEach(() => {
    unmountFixture('autoloadAsyncForms')
    asyncForm.mockReset()
  })

  it('makes the form async', () => {
    document.dispatchEvent(new Event('DOMContentLoaded'))

    const form = document.getElementById('test-form')

    expect(asyncForm).toHaveBeenCalledWith(form, formkeepIdentifier)
  })
})
