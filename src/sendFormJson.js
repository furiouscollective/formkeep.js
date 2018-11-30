export const sendFormJson = (formkeepIdentifier, jsonData, config) => {
  const Xhr = new XMLHttpRequest()
  const url = `https://formkeep.com/f/${formkeepIdentifier}`

  Xhr.addEventListener('load', (response) => {
    if (Xhr.status >= 200 && Xhr.status < 400) {
      config.onSuccess(response)
    }

    if (Xhr.status >= 400 && Xhr.status < 600) {
      config.onFailure(response)
    }
  })

  Xhr.open('POST', url)
  Xhr.setRequestHeader('Accept', 'application/javascript')
  Xhr.setRequestHeader('Content-Type', 'application/json')
  Xhr.send(JSON.stringify(jsonData))
}
