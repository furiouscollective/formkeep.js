import nock from 'nock'
import { mountFixture, unmountFixture } from './spec/helpers/fixtureHelpers'
import * as Formkeep from './index'

describe('index.js', () => {
  const formFixture = `
    <form id="test-form">
      <div id="info-box"></div>
      <input type="hidden" name="utf8" value="✓" />
      <input name="email" value="test@example.com" />
      <textarea name="comments">I ❤️ FormKeep</textarea>
      <button id="test-button" type="submit">Submit</button>
    </form>
  `

  const setUpForm = () => {
    const form = document.getElementById('test-form')
    const formkeepIdentifier = 'f3a748fed01a'
    const config = {
      beforeSubmit: (formJson) => {
        formJson.datePosted = '2018-11-28'
        return formJson
      },
      onSuccess: (response) => {
        document.getElementById('info-box').textContent = 'Submitted successfully'
      },
      onFailure: (response) => {
        document.getElementById('info-box').textContent = 'Failed to submit'
      }
    }
    Formkeep.makeFormAsync(form, formkeepIdentifier, config)
  }

  const mockFormkeep = () => (
    nock('https://formkeep.com')
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/f/f3a748fed01a')
  )

  const clickSubmit = () => (
    document
    .getElementById('test-button')
    .dispatchEvent(new Event('click'))
  )

  beforeEach(() => {
    mountFixture('makeFormAsync', formFixture)
    setUpForm()
  })

  afterEach(() => {
    unmountFixture('makeFormAsync')
  })

  it('shows a success message when the form is submitted', (done) => {
    const httpRequestMock = mockFormkeep().reply(200, 'OK')

    clickSubmit()

    setTimeout(() => {
      httpRequestMock.done()
      expect(document.getElementById('info-box').textContent).toEqual('Submitted successfully')
      done()
    }, 100)
  })

  it('shows a failure message if the form fails to post', (done) => {
    const httpRequestMock = mockFormkeep().reply(400, 'FAILED')

    clickSubmit()

    setTimeout(() => {
      httpRequestMock.done()
      expect(document.getElementById('info-box').textContent).toEqual('Failed to submit')
      done()
    }, 100)
  })

  it('posts the form with correct data', (done) => {
    const httpRequestMock = nock('https://formkeep.com')
    .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
    .post('/f/f3a748fed01a', {
      comments: 'I ❤️ FormKeep',
      datePosted: '2018-11-28',
      email: 'test@example.com',
      utf8: '✓'
    })
    .reply(200, 'OK')

    clickSubmit()

    setTimeout(() => {
      httpRequestMock.done()
      done()
    }, 100)
  })
})
