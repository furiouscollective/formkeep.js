export function mountFixture(fixtureId, fixtureTemplate) {
  var fixture = document.createElement('div')
  fixture.id = fixtureId
  fixture.innerHTML = fixtureTemplate

  document.body.appendChild(fixture)
}

export function unmountFixture(fixtureId) {
  document.getElementById(fixtureId).remove()
}
