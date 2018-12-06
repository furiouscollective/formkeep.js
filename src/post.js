export const post = (formkeepIdentifier, jsonData, config = {}) => {
  const Xhr = new XMLHttpRequest()
  const url = `https://formkeep.com/f/${formkeepIdentifier}`

  let result = true

  if (!(config.onSuccess || config.onFailure)) {
    result = new Promise((resolve, reject) => {
      Xhr.addEventListener('load', (response) => {
        if (Xhr.status >= 200 && Xhr.status < 400) {
          resolve(response)
        }

        if (Xhr.status >= 400 && Xhr.status < 600) {
          reject(response)
        }
      })

      Xhr.addEventListener('error', (error) => {
        reject(error)
      })
    })
  } else {
    Xhr.addEventListener('load', (response) => {
      if (Xhr.status >= 200 && Xhr.status < 400) {
        config.onSuccess && config.onSuccess(response)
      }

      if (Xhr.status >= 400 && Xhr.status < 600) {
        config.onFailure && config.onFailure(response)
      }
    })

    Xhr.addEventListener('error', (error) => {
      config.onFailure && config.onFailure(error)
    })
  }

  Xhr.open('POST', url)
  Xhr.setRequestHeader('Accept', 'application/javascript')
  Xhr.setRequestHeader('Content-Type', 'application/json')
  Xhr.send(JSON.stringify(jsonData))

  return result;
}
