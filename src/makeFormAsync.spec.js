import { mountFixture, unmountFixture } from '../spec/utils'
import { submitForm } from '../spec/utils'

import { makeFormAsync } from './makeFormAsync'
import { sendFormJson } from './sendFormJson'

jest.mock('./sendFormJson')

describe('makeFormAsync.js', () => {
  const formkeepIdentifier = 'f3a748fed01a'
  const utf8 = '✓'
  const email = 'test@example.com'
  const otherEmail = 'other@example.com'
  const comments = 'I ❤️ Formkeep'

  describe('without success template', () => {
    beforeEach(() => {
      mountFixture('makeFormAsync', `
        <form id="test-form">
          <input type="hidden" name="utf8" value="${utf8}" />
          <input name="email" value="${email}" />
          <textarea name="comments">${comments}</textarea>
          <button type="submit">Submit</button>
        </form>
      `)
      sendFormJson.mockReturnValue(true)
    })

    afterEach(() => {
      unmountFixture('makeFormAsync')
      sendFormJson.mockReset()
    })

    it('sends the correct data and configs to `sendForm`', () => {
      const form = document.getElementById('test-form')
      const config = {
        beforeSubmit: (formJson) => (formJson),
        onSuccess: (response) => (response),
        onFailure: (response) => (response)
      }

      makeFormAsync(form, formkeepIdentifier, config)
      submitForm(form)

      expect(sendFormJson).toBeCalledWith(
        formkeepIdentifier,
        { utf8, email, comments },
        config
      )
    })

    it('allows modifying the data in the `beforeSubmit` callback', () => {
      const form = document.getElementById('test-form')
      const config = { beforeSubmit: (formJson) => (Object.assign(formJson, { email: otherEmail})) }

      makeFormAsync(form, formkeepIdentifier, config)
      submitForm(form)

      expect(sendFormJson).toBeCalledWith(
        formkeepIdentifier,
        { utf8, email: otherEmail, comments },
        config
      )
    })

    it("doesn't send the form if `beforeSubmit` returns `false`", () => {
      const form = document.getElementById('test-form')
      const config = { beforeSubmit: formJson => false }

      makeFormAsync(form, formkeepIdentifier, config)
      submitForm(form)

      expect(sendFormJson).not.toBeCalled()
    })
  })

  describe('with success template', () => {
    beforeEach(() => {
      mountFixture('makeFormAsync', `
        <form id="test-form">
          <input type="hidden" name="utf8" value="${utf8}" />
          <input name="email" value="${email}" />
          <textarea name="comments">${comments}</textarea>
          <button type="submit">Submit</button>

        </form>

        <template data-formkeep-success-template="${formkeepIdentifier}" data-target="#test-form">
          <span id="success-text">Your form has been successfully submitted, we'll get back to you</span>
        </template>
      `)
      sendFormJson.mockReturnValue(true)
    })

    afterEach(() => {
      unmountFixture('makeFormAsync')
      sendFormJson.mockReset()
    })

    it('replaces the form with the given template', (done) => {
      sendFormJson.mockImplementation((_id, _json, config) => {
        config.onSuccess()
      })
      const form = document.getElementById('test-form')

      makeFormAsync(form, formkeepIdentifier, {
        onSuccess: () => {
          expect(document.getElementById('success-text').textContent)
          .toEqual("Your form has been successfully submitted, we'll get back to you")
          done()
        }
      })

      submitForm(form)
    })
  })
})
