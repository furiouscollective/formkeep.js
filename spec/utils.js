export const mountFixture = (fixtureId, fixtureTemplate) => {
  var fixture = document.createElement('div')
  fixture.id = fixtureId
  fixture.innerHTML = fixtureTemplate

  document.body.appendChild(fixture)
}

export const unmountFixture = (fixtureId) => {
  document.getElementById(fixtureId).remove()
}

export const submitForm = form => {
  form.dispatchEvent(new Event('submit'))
}

export const assertOnSubmit = (form, done, test) => {
  form.addEventListener('submit', event => {
    event.preventDefault()
    test()
    done()
  })
}
