import { validateFormkeepIdentifier } from './utils'

const getResult = ({ status, statusText }) => ({
  status,
  text: statusText
})

export const post = (formkeepIdentifier, jsonData, config = {}) => {
  if (!validateFormkeepIdentifier(formkeepIdentifier)) {
    return false
  }

  const Xhr = new XMLHttpRequest()
  const url = `https://formkeep.com/f/${formkeepIdentifier}`

  let result = true

  if (!(config.onSuccess || config.onFailure)) {
    result = new Promise((resolve, reject) => {
      Xhr.addEventListener('load', () => {
        if (Xhr.status >= 200 && Xhr.status < 400) {
          resolve(getResult(Xhr))
        }

        if (Xhr.status >= 400 && Xhr.status < 600) {
          console.error()
          reject(getResult(Xhr))
        }
      })

      Xhr.addEventListener('error', () => {
        reject(getResult(Xhr))
      })
    })
  } else {
    Xhr.addEventListener('load', () => {
      if (Xhr.status >= 200 && Xhr.status < 400) {
        config.onSuccess && config.onSuccess(getResult(Xhr))
      }

      if (Xhr.status >= 400 && Xhr.status < 600) {
        config.onFailure && config.onFailure(getResult(Xhr))
      }
    })

    Xhr.addEventListener('error', () => {
      config.onFailure && config.onFailure(getResult(Xhr))
    })
  }

  Xhr.open('POST', url)
  Xhr.setRequestHeader('Accept', 'application/javascript')
  Xhr.setRequestHeader('Content-Type', 'application/json')
  Xhr.send(JSON.stringify(jsonData))

  return result
}
