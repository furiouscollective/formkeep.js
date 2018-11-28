import { buildJsonFromForm, createHiddenInput } from './utils'

const handleSubmitWithRedirect = (form, config) => {
  const formJson = buildJsonFromForm(form)
  const redirectUrl = config.setRedirectUrl && config.setRedirectUrl(formJson)

  form.appendChild(createHiddenInput('_redirect_url', redirectUrl))
}

const makeFormRedirect = (form, config) => {
  form.addEventListener('submit', () => handleSubmitWithRedirect(form, config))
}

export default makeFormRedirect
