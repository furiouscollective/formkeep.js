export const submitForm = form => {
  form.dispatchEvent(new Event('submit'))
}

export const assertOnSubmit = (form, done, test) => {
  form.addEventListener('submit', event => {
    event.preventDefault()
    test()
    done && done()
  })
}
