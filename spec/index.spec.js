const fixtureHelpers = require('./helpers/fixtureHelpers')
const app = require('../index.js')

describe('index.js', function() {
  beforeEach(function() {
    fixtureHelpers.mountFixture('index-fixture', `
      <div>HTML</div>
    `)
  })

  afterEach(function() {
    fixtureHelpers.unmountFixture('index-fixture')
  })

  it('gets tested', function() {
    expect(app.getTrue()).toBe(true)
  })
})
