import { mountFixture, unmountFixture } from '../spec/helpers/fixtureHelpers'
import makeFormAsync from './makeFormAsync'
import sendFormJson from './sendFormJson'

jest.mock('./sendFormJson')

describe('asyncForm.js', () => {
  const formkeepId = 'f3a748fed01a'
  const utf8 = '✓'
  const email = 'test@example.com'
  const otherEmail = 'other@example.com'
  const comments = 'I ❤️ Formkeep'

  beforeEach(() => {
    mountFixture('makeFormAsync', `
      <form id="test-form" data-formkeep-identifier="${formkeepId}">
        <input type="hidden" name="utf8" value="${utf8}" />
        <input name="email" value="${email}" />
        <textarea name="comments">${comments}</textarea>
        <button type="submit">Submit</button>
      </form>
    `)
  })

  afterEach(() => { unmountFixture('makeFormAsync') })

  it('sends the correct data and configs to `sendForm`', () => {
    sendFormJson.mockReturnValue(true)
    const form = document.getElementById('test-form')
    const sampleConfig = {
      beforeSubmit: (formJson) => (formJson),
      onSuccess: (response) => (response),
      onFailure: (response) => (response)
    }

    makeFormAsync(form, sampleConfig)
    form.dispatchEvent(new Event('submit'))

    expect(sendFormJson).toBeCalledWith(
      `https://formkeep.com/f/${formkeepId}`,
      { utf8, email, comments },
      sampleConfig
    )
  })

  it('allows modifying the data in the `beforeSubmit` callback', () => {
    sendFormJson.mockReturnValue(true)
    const form = document.getElementById('test-form')
    const sampleConfig = {
      beforeSubmit: (formJson) => (Object.assign(formJson, { email: otherEmail}))
    }

    makeFormAsync(form, sampleConfig)
    form.dispatchEvent(new Event('submit'))

    expect(sendFormJson).toBeCalledWith(
      `https://formkeep.com/f/${formkeepId}`,
      { utf8, email: otherEmail, comments },
      sampleConfig
    )
  })
})
