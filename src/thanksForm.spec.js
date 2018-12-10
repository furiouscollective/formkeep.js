import { mountFixture, unmountFixture } from '../spec/utils'
import { submitForm, assertOnSubmit } from '../spec/utils'
import { thanksForm } from './thanksForm'

describe('thanksForm.js', () => {
  const formkeepIdentifier = '149105c7eb4a'

  beforeEach(() => {
    mountFixture('thanksForm', `
      <form id="test-form" action="https://formkeep.com/f/149105c7eb4a" method="POST">
        <input name="name" value="John Dowd" />
        <input name="email" value="test@example.com" />
        <button type="submit">Submit</button>
      </form>
    `)
  })

  afterEach(() => {
    unmountFixture('thanksForm')
  })

  it('adds the thank you params to the posted form', (done) => {
    const form = document.getElementById('test-form')
    thanksForm(form, {
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

  it('adds an input to force submission as utf-8', (done) => {
    const form = document.getElementById('test-form')
    thanksForm(form, {
      setHeading: formJson => (
        `Thanks ${formJson.name}!`
      ),
      setSubheading: formJson => (
        `We'll contact you at ${formJson.email}`
      )
    })

    assertOnSubmit(form, done, () => {
      expect(form.querySelector('input[type=hidden][name=utf8]').value).toEqual("✓")
    })

    submitForm(form)
  })
})
