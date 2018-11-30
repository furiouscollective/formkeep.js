import { sendFormJson } from './sendFormJson'
import { buildJsonFromForm } from './utils'

const handleSubmitAsync = (event, identifier, config = {}) => {
  // Prevent regular submission
  event.preventDefault()

  const form = event.target

  // Parse the form data into JSON
  const formJson = config.beforeSubmit
  ? config.beforeSubmit(buildJsonFromForm(form))
  : buildJsonFromForm(form)

  // Prevent submission if `beforeSubmit` returns false
  if (formJson === false) { return }

  // Submit form
  sendFormJson(identifier, formJson, config)
}

export const makeFormAsync = (form, identifier, config) => {
  form.addEventListener('submit', (event) => handleSubmitAsync(event, identifier, config))
}
