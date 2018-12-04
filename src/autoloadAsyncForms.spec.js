import { mountFixture, unmountFixture } from '../spec/utils'

import './autoloadAsyncForms'
import { makeFormAsync } from './makeFormAsync'

jest.mock('./makeFormAsync')

describe('autoloadAsyncForms.js', () => {
  const formkeepIdentifier = 'f3a748fed01a'
  const utf8 = '✓'
  const email = 'test@example.com'
  const comments = 'I ❤️ Formkeep'

  beforeEach(() => {
    mountFixture('autoloadAsyncForms', `
      <form id="test-form" data-formkeep-id="${formkeepIdentifier}">
        <input type="hidden" name="utf8" value="${utf8}" />
        <input name="email" value="${email}" />
        <textarea name="comments">${comments}</textarea>
        <button type="submit">Submit</button>
      </form>
    `)
    makeFormAsync.mockReturnValue(true)
  })

  afterEach(() => {
    unmountFixture('autoloadAsyncForms')
    makeFormAsync.mockReset()
  })

  it('makes the form async', () => {
    document.dispatchEvent(new Event('DOMContentLoaded'))

    const form = document.getElementById('test-form')

    expect(makeFormAsync).toHaveBeenCalledWith(form, formkeepIdentifier)
  })
})
