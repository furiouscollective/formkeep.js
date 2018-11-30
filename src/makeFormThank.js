import { buildJsonFromForm, buildThanksUrl, createHiddenInput } from './utils'

const handleSubmitWithThanks = (form, config) => {
  const formJson = buildJsonFromForm(form)
  const heading = `h=${config.setHeading(formJson)}`
  const subheading = `s=${config.setSubheading(formJson)}`

  form.appendChild(createHiddenInput('_redirect_url', buildThanksUrl(heading, subheading)))
}

export const makeFormThank = (form, config) => {
  form.addEventListener('submit', () => handleSubmitWithThanks(form, config))
}
