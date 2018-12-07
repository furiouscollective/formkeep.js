import xhrMock from 'xhr-mock'

import { post } from './post'

describe('post.js (without callbacks)', function() {
  const formkeepIdentifier = 'exampletoken'
  const url = `https://formkeep.com/f/${formkeepIdentifier}`
  const jsonData = {
    email: 'test@example.com',
    comments: 'I ❤️ FormKeep'
  }

  beforeEach(() => { xhrMock.setup() })
  afterEach(() => { xhrMock.teardown() })

  it('resolves on a successful post', (done) => {
    xhrMock.post(url, (_req, res) => (res.status(201).reason('OK')))

    post(formkeepIdentifier, jsonData)
    .then(() => { done() })
  })

  it('rejects on a failed post', (done) => {
    xhrMock.post(url, (_req, res) => (res.status(403).reason('FORBIDDEN')))

    post(formkeepIdentifier, jsonData)
    .catch(() => { done() })
  })
})
