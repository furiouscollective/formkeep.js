const FormKeep = require('@formkeep/formkeep')

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('test-form')
  const formkeepIdentifier = '149105c7eb4a'
  const config = {
    beforeSubmit: (formJson) => {
      formJson.datePosted = '2018-11-28'
      return formJson
    },
    onSuccess: (_response) => {
      document.getElementById('info-box').textContent = 'Submitted successfully'
    },
    onFailure: (_response) => {
      document.getElementById('info-box').textContent = 'Failed to submit'
    }
  }

  FormKeep.asyncForm(form, formkeepIdentifier, config)
})
