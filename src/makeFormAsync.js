import sendFormJson from './sendFormJson'

const buildJsonFromForm = form => (
  Array.from((new FormData(form)).entries())
  .reduce((jsonData, formDataPair) => {
    debugger
    jsonData[formDataPair[0]] = formDataPair[1];
    return jsonData
  }, {})
)

const handleSubmitAsync = (event, config) => {
  // Prevent regular submission
  event.preventDefault()

  const form = event.target

  // Parse the form data into JSON (maybe we can just submit the form data, this should be a separate function)
  const formJson = config.beforeSubmit(buildJsonFromForm(form))
  // Build the URL from the identifier, maybe it's better if this identifier is passed in
  const formkeepUrl = "https://formkeep.com/f/" + form.dataset['formkeepIdentifier']

  sendFormJson(formkeepUrl, formJson, config)
}

const makeFormAsync = (form, config) => {
  form.addEventListener('submit', (event) => handleSubmitAsync(event, config))
}

export default makeFormAsync
