const FormKeep = require('formkeep').default

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('test-form')
  const formkeepIdentifier = 'exampletoken'
  const config = {
    beforeSubmit: (formJson) => {
      formJson.datePosted = '2018-11-28'
      return formJson
    },
    onSuccess: (response) => {
      document.getElementById('info-box').textContent = 'Submitted successfully'
    },
    onFailure: (response) => {
      document.getElementById('info-box').textContent = 'Failed to submit'
    }
  }

  FormKeep.asyncForm(form, formkeepIdentifier, config)
})
