import sendFormJson from './sendFormJson'

const buildJsonFromForm = form => (
  Array.from((new FormData(form)).entries())
  .reduce((jsonData, formDataPair) => {
    debugger
    jsonData[formDataPair[0]] = formDataPair[1];
    return jsonData
  }, {})
)

const handleSubmitAsync = (event, identifier, config) => {
  // Prevent regular submission
  event.preventDefault()

  const form = event.target

  // Parse the form data into JSON
  let formJson = buildJsonFromForm(form)

  // Pass form JSON to `beforeSubmit` callback
  if (config.beforeSubmit) { formJson = config.beforeSubmit(formJson) }

  // Prevent submission if `beforeSubmit` returns false
  if (formJson === false) { return }

  // Submit form
  sendFormJson(identifier, formJson, config)
}

const makeFormAsync = (form, identifier, config) => {
  form.addEventListener('submit', (event) => handleSubmitAsync(event, identifier, config))
}

export default makeFormAsync
