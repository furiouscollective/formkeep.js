import { mountFixture, unmountFixture } from '../spec/utils'
import { submitForm } from '../spec/utils'
import makeFormShowSuccessTemplate from './makeFormShowSuccessTemplate'
import sendFormJson from './sendFormJson'

jest.mock('./sendFormJson')

describe('makeFormShowSuccessTemplate.js', () => {
  const formkeepIdentifier = 'f3a748fed01a'

  beforeEach(() => {
    mountFixture('makeFormShowSuccessTemplate', `
      <form data-formkeep="success-replace" id="test-form">
        <input name="email" value="test@example.com" />
        <button type="submit">Submit</button>

        <template data-formkeep="success-template">
          <span id="success-text">Your form has been successfully submitted, we'll get back to you</span>
        </template>
      </form>
    `)
    sendFormJson.mockImplementation((_id, _json, config) => {
      config.onSuccess()
    })
  })

  afterEach(() => {
    unmountFixture('makeFormShowSuccessTemplate')
    sendFormJson.mockReset()
  })

  it('replaces the form with the given template', (done) => {
    const form = document.getElementById('test-form')

    makeFormShowSuccessTemplate(form, formkeepIdentifier, {
      onSuccess: () => {
        expect(document.getElementById('success-text').textContent)
        .toEqual("Your form has been successfully submitted, we'll get back to you")
        done()
      }
    })

    submitForm(form)
  })
})
