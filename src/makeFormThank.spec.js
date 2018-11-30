import nock from 'nock'
import { mountFixture, unmountFixture } from '../spec/utils'
import { submitForm, assertOnSubmit } from '../spec/utils'
import { makeFormThank } from './makeFormThank'

describe('makeFormThank.js', () => {
  const formkeepIdentifier = 'f3a748fed01a'

  beforeEach(() => {
    mountFixture('makeFormThank', `
      <form id="test-form" action="https://formkeep.com/f/f3a748fed01a" method="POST">
        <input type="hidden" name="utf8" value="✓" />
        <input name="name" value="John Dowd" />
        <input name="email" value="test@example.com" />
        <button type="submit">Submit</button>
      </form>
    `)
  })

  afterEach(() => {
    unmountFixture('makeFormThank')
  })

  it('adds the thank you params to the posted form', (done) => {
    const form = document.getElementById('test-form')
    makeFormThank(form, {
      setHeading: formJson => (
        `Thanks ${formJson.name}!`
      ),
      setSubheading: formJson => (
        `We'll contact you at ${formJson.email}`
      )
    })

    assertOnSubmit(form, done, () => {
      expect(form.querySelector('input[type=hidden][name=_redirect_url]').value)
      .toEqual("https://formkeep.com/thanks?h=Thanks John Dowd!&s=We'll contact you at test@example.com")
    })

    submitForm(form)
  })
})
