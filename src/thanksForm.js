import { buildJsonFromForm, createHiddenInput } from './utils'

const buildThanksUrl = (heading, subheading) => {
  const params = []

  if (heading) {
    params.push(`h=${heading}`)
  }

  if (subheading) {
    params.push(`s=${subheading}`)
  }

  return `https://formkeep.com/thanks${params.length && '?'}${params.join('&')}`
}

const handleSubmitWithThanks = (form, config) => {
  const formJson = buildJsonFromForm(form)
  const heading = config.setHeading(formJson)
  const subheading = config.setSubheading(formJson)

  form.appendChild(createHiddenInput('_redirect_url', buildThanksUrl(heading, subheading)))
}

export const thanksForm = (form, config) => {
  form.addEventListener('submit', () => handleSubmitWithThanks(form, config))
}
