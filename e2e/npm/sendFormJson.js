import { sendFormJson } from 'formkeep.js'

const saveToFormkeep = position => {
  const location = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }

  sendFormJson('f3a748fed01a', location, {
    onSuccess: () => {
      document.getElementById('info-box')
      .textContent = `Saved your position (${location.latitude}, ${location.longitude})`
    }
  })
}

const saveLocation = () => {
  navigator.geolocation.getCurrentPosition(saveToFormkeep)
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('save-button').addEventListener('click', saveLocation)
})
