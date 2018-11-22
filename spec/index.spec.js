const fixtureHelpers = require('./helpers/fixtureHelpers')
const appHelpers = require('../helpers')

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
    expect(appHelpers.getTrue()).toBe(true)
  })
})
