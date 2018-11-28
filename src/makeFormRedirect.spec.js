import nock from 'nock'
import { mountFixture, unmountFixture } from '../spec/helpers/fixtureHelpers'
import makeFormRedirect from './makeFormRedirect'

describe('makeFormRedirect.js', () => {
  const formkeepIdentifier = 'f3a748fed01a'

  beforeEach(() => {
    mountFixture('makeFormRedirect', `
      <form id="test-form" action="https://formkeep.com/f/f3a748fed01a" method="POST">
        <input type="hidden" name="utf8" value="✓" />
        <input name="name" value="John Dowd" />
        <input name="email" value="test@example.com" />
        <button type="submit">Submit</button>
      </form>
    `)
  })

  afterEach(() => {
    unmountFixture('makeFormRedirect')
  })

  it('adds the thank you params to the posted form', (done) => {
    const form = document.getElementById('test-form')
    makeFormRedirect(form, {
      setRedirectUrl: formJson => (
        `https://example.com/greeting?name=${formJson.email}`
      )
    })

    form.addEventListener('submit', event => {
      event.preventDefault()

      expect(form.querySelector('input[type=hidden][name=_redirect_url]').value)
      .toEqual('https://example.com/greeting?name=test@example.com')

      done()
    })

    form.dispatchEvent(new Event('submit'))
  })
})
