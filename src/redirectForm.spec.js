import { mountFixture, unmountFixture } from '../spec/utils'
import { submitForm, assertOnSubmit } from '../spec/utils'
import { redirectForm } from './redirectForm'

describe('redirectForm.js', () => {
  describe('without a utf8 input', () => {
    beforeEach(() => {
      mountFixture('redirectForm', `
        <form id="test-form" action="https://formkeep.com/f/149105c7eb4a" method="POST">
          <input name="name" value="John Dowd" />
          <input name="email" value="test@example.com" />
          <button type="submit">Submit</button>
        </form>
      `)
    })

    afterEach(() => {
      unmountFixture('redirectForm')
    })

    it('adds the thank you params to the posted form', (done) => {
      const form = document.getElementById('test-form')
      redirectForm(form, {
        setRedirectUrl: formJson => (
          `https://example.com/greeting?name=${formJson.email}`
        )
      })

      assertOnSubmit(form, done, () => {
        expect(form.querySelector('input[type=hidden][name=_redirect_url]').value)
        .toEqual('https://example.com/greeting?name=test@example.com')
      })

      submitForm(form)
    })

    it('adds an input to force submission as utf-8', (done) => {
      const form = document.getElementById('test-form')
      redirectForm(form, {
        setRedirectUrl: formJson => (
          `https://example.com/greeting?name=${formJson.email}`
        )
      })

      assertOnSubmit(form, done, () => {
        expect(form.querySelector('input[type=hidden][name=utf8]').value).toEqual("✓")
      })

      submitForm(form)
    })
  })

  describe('with a utf8 input already added', () => {
    beforeEach(() => {
      mountFixture('redirectForm', `
        <form id="test-form" action="https://formkeep.com/f/149105c7eb4a" method="POST">
          <input type="hidden" name="utf8" value="☃" />
          <input name="name" value="John Dowd" />
          <input name="email" value="test@example.com" />
          <button type="submit">Submit</button>
        </form>
      `)
    })

    afterEach(() => {
      unmountFixture('redirectForm')
    })

    it("doesn't add a utf8 input", (done) => {
      const form = document.getElementById('test-form')
      redirectForm(form, {
        setRedirectUrl: formJson => (
          `https://example.com/greeting?name=${formJson.email}`
        )
      })

      assertOnSubmit(form, done, () => {
        expect(form.querySelector('input[type=hidden][name=utf8]').value).toEqual("☃")
      })

      submitForm(form)
    })
  })
})
