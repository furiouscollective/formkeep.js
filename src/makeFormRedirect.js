const buildJsonFromForm = form => (
  Array.from((new FormData(form)).entries())
  .reduce((jsonData, formDataPair) => {
    jsonData[formDataPair[0]] = formDataPair[1];
    return jsonData
  }, {})
)

const createHiddenInput = (name, value) => {
  const input = document.createElement('input')

  input.setAttribute('type', 'hidden')
  input.setAttribute('name', name)
  input.setAttribute('value', value)

  return input
}

const thanksUrl = (heading, subheading) => {
  const params = []

  if (heading) {
    params.push(heading)
  }

  if (subheading) {
    params.push(subheading)
  }

  return `https://formkeep.com/thanks${params.length && '?'}${params.join('&')}`
}

const handleSubmitWithRedirect = (form, config) => {
  const formJson = buildJsonFromForm(form)

  const redirectUrl = config.setRedirectUrl && config.setRedirectUrl(formJson)

  form.appendChild(createHiddenInput('_redirect_url', redirectUrl))
}

const makeFormRedirect = (form, config) => {
  form.addEventListener('submit', () => handleSubmitWithRedirect(form, config))
}

export default makeFormRedirect
