export const buildJsonFromForm = form => (
  Array.from((new FormData(form)).entries())
  .reduce((jsonData, formDataPair) => {
    jsonData[formDataPair[0]] = formDataPair[1];
    return jsonData
  }, {})
)

export const createHiddenInput = (name, value) => {
  const input = document.createElement('input')

  input.setAttribute('type', 'hidden')
  input.setAttribute('name', name)
  input.setAttribute('value', value)

  return input
}

export const createUtf8Input = () => {
  return createHiddenInput('utf8', '✓')
}
