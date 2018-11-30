import { makeFormAsync } from './makeFormAsync'
import { buildJsonFromForm } from './utils'

export const makeFormShowSuccessTemplate = (form, identifier, config = {}) => {
  makeFormAsync(form, identifier, {
    beforeSubmit: config.beforeSubmit,
    onFailure: config.onFailure,
    onSuccess: () => {
      const template = form.querySelector('template[data-formkeep=success-template]')
      const templateTarget = document.querySelector('[data-formkeep=success-replace]')

      templateTarget.replaceWith(template.content)

      config.onSuccess && config.onSuccess()
    }
  })
}
