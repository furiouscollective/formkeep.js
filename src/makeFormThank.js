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

const handleSubmitWithThanks = (form, config) => {
  const formJson = buildJsonFromForm(form)

  const heading = config.setHeading && `h=${config.setHeading(formJson)}`
  const subheading = config.setSubheading && `s=${config.setSubheading(formJson)}`

  form.appendChild(createHiddenInput('_redirect_url', thanksUrl(heading, subheading)))
}

const makeFormThank = (form, config) => {
  form.addEventListener('submit', () => handleSubmitWithThanks(form, config))
}

export default makeFormThank
