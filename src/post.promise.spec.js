import xhrMock from 'xhr-mock'

import { post } from './post'

describe('post.js (without callbacks)', function() {
  const formkeepIdentifier = 'f3a748fed01a'
  const url = `https://formkeep.com/f/${formkeepIdentifier}`
  const jsonData = {
    email: 'test@example.com',
    comments: 'I ❤️ FormKeep'
  }

  beforeEach(() => { xhrMock.setup() })
  afterEach(() => { xhrMock.teardown() })

  it('resolves on a successful post', (done) => {
    xhrMock.post(url, (_req, res) => (res.status(201).body(JSON.stringify(jsonData))))

    post(formkeepIdentifier, jsonData)
    .then(() => { done() })
  })

  it('rejects on a failed post', (done) => {
    xhrMock.post(url, (_req, res) => (res.status(404).body(JSON.stringify(jsonData))))

    post(formkeepIdentifier, jsonData)
    .catch(() => { done() })
  })

  it('rejects on xhr errors', (done) => {
    xhrMock.post(url, () => Promise.reject())

    post(formkeepIdentifier, jsonData)
    .catch(() => { done() })
  })
})
