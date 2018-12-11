import { buildJsonFromForm, createHiddenInput, createUtf8Input } from './utils'

const handleSubmitWithRedirect = (form, config) => {
  const formJson = buildJsonFromForm(form)
  const redirectUrl = config.setRedirectUrl(formJson)

  if (!form.querySelector('input[name=utf8]')) {
    form.appendChild(createUtf8Input())
  }

  form.appendChild(createHiddenInput('_redirect_url', redirectUrl))
}

export const redirectForm = (form, config) => {
  form.addEventListener('submit', () => handleSubmitWithRedirect(form, config))
}
