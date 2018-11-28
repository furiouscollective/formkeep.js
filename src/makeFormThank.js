import { buildJsonFromForm, buildThanksUrl, createHiddenInput } from './utils'

const handleSubmitWithThanks = (form, config) => {
  const formJson = buildJsonFromForm(form)
  const heading = config.setHeading && `h=${config.setHeading(formJson)}`
  const subheading = config.setSubheading && `s=${config.setSubheading(formJson)}`

  form.appendChild(createHiddenInput('_redirect_url', buildThanksUrl(heading, subheading)))
}

const makeFormThank = (form, config) => {
  form.addEventListener('submit', () => handleSubmitWithThanks(form, config))
}

export default makeFormThank
