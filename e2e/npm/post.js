import { post } from 'formkeep.js'

const saveToFormKeep = position => {
  const location = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude
  }

  post('f3a748fed01a', location, {
    onSuccess: () => {
      document.getElementById('info-box')
      .textContent = `Saved your position (${location.latitude}, ${location.longitude})`
    }
  })
}

const saveLocation = () => {
  navigator.geolocation.getCurrentPosition(saveToFormKeep)
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('save-button').addEventListener('click', saveLocation)
})
