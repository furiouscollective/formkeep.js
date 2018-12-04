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

  const successTemplateConfig = Object.assign({}, config)
  const successTemplate = document.querySelector(`template[data-formkeep-success-template=${identifier}]`)

  // Decorate onSuccess to apply success template if template given
  if (successTemplate) {
    const successTemplateTarget = document.querySelector(successTemplate.getAttribute('data-target'))

    successTemplateConfig.onSuccess = () => {
      successTemplateTarget.replaceWith(successTemplate.content)
      config.onSuccess && config.onSuccess()
    }
  }

  // Submit form
  sendFormJson(identifier, formJson, successTemplateConfig)
}

export const makeFormAsync = (form, identifier, config) => {
  form.addEventListener('submit', (event) => handleSubmitAsync(event, identifier, config))
}
