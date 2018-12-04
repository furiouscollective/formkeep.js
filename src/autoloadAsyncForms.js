import { makeFormAsync } from './makeFormAsync'

document.addEventListener('DOMContentLoaded', () => {
  const formkeepForms = document.querySelectorAll('[data-formkeep-id]')

  formkeepForms.forEach(form => {
    makeFormAsync(form, form.getAttribute('data-formkeep-id'))
  })
})
