import xhrMock from 'xhr-mock'

import { post } from './post'

describe('post.js', function() {
  const formkeepIdentifier = 'f3a748fed01a'
  const url = `https://formkeep.com/f/${formkeepIdentifier}`
  const jsonData = {
    email: 'test@example.com',
    comments: 'I ❤️ FormKeep'
  }

  beforeEach(() => { xhrMock.setup() })
  afterEach(() => { xhrMock.teardown() })

  it('posts the stringified json data', (done) => {
    xhrMock.post(url, (req, res) => {
      expect(req.body()).toEqual(JSON.stringify(jsonData))
      return res.status(201).body(JSON.stringify(jsonData))
    })

    post(formkeepIdentifier, jsonData, {
      onSuccess: (_result) => { done() }
    })
  })

  it('sets the correct headers', (done) => {
    xhrMock.post(url, (req, res) => {
      expect(req.header('Accept')).toEqual('application/javascript')
      expect(req.header('Content-Type')).toEqual('application/json')
      return res.status(201).body(JSON.stringify(jsonData))
    })

    post(formkeepIdentifier, jsonData, {
      onSuccess: (_result) => { done() }
    })
  })

  it('calls the success callback on 200 responses', (done) => {
    xhrMock.post(url, (_req, res) => (res.status(200).statusText('OK')))

    post(formkeepIdentifier, jsonData, {
      onSuccess: (result) => {
        expect(result).toEqual({ status: 200, text: 'OK' })
        done()
      }
    })
  })

  it('calls the failure callback on 400 responses', (done) => {
    xhrMock.post(url, (_req, res) => (res.status(403).statusText('FORBIDDEN')))

    post(formkeepIdentifier, jsonData, {
      onFailure: (result) => {
        expect(result).toEqual({ status: 200, text: 'FORBIDDEN' })
        done()
      }
    })
  })

  it('calls the failure callback on 501 responses', (done) => {
    xhrMock.post(url, (_req, res) => (res.status(501).statuText('ERROR')))

    post(formkeepIdentifier, jsonData, {
      onFailure: (_result) => {
        expect(result).toEqual({ status: 501, text: 'ERROR' })
        done()
      }
    })
  })
})
