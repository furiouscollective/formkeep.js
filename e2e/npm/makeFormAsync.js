const Formkeep = require('formkeep.js').default

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('test-form')
  const formkeepIdentifier = 'f3a748fed01a'
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

  Formkeep.asyncForm(form, formkeepIdentifier, config)
})
