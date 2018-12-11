import { post } from './post'
import { buildJsonFromForm, validateFormkeepIdentifier } from './utils'

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

  const successTemplateConfig = Object.assign({}, config)
  const successTemplate = document.querySelector(`template[data-formkeep-success-template="${identifier}"]`)

  // Decorate onSuccess to apply success template if template given
  if (successTemplate) {
    const successTemplateTarget = document.querySelector(successTemplate.getAttribute('data-target'))

    successTemplateConfig.onSuccess = () => {
      successTemplateTarget.replaceWith(successTemplate.content)
      config.onSuccess && config.onSuccess()
    }
  }

  // Submit form
  return post(identifier, formJson, successTemplateConfig)
}

export const asyncForm = (form, identifier, config) => {
  if (!validateFormkeepIdentifier(identifier)) {
    return false
  }

  form.addEventListener('submit', (event) => handleSubmitAsync(event, identifier, config))
}
