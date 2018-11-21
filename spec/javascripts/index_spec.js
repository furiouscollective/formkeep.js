describe('index.js', function() {
  beforeEach(function() {
    var template = "\
      <div>HTML</div>\
    "
    mountFixture('index-fixture', template)
  })

  afterEach(function() {
    unmountFixture('index-fixture')
  })

  it('gets tested', function() {
    expect(true).toBe(true)
  })
})
