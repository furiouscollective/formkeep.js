import { asyncForm } from './asyncForm'

document.addEventListener('DOMContentLoaded', () => {
  const formkeepForms = document.querySelectorAll('[data-formkeep-id]')

  formkeepForms.forEach(form => {
    asyncForm(form, form.getAttribute('data-formkeep-id'))
  })
})
