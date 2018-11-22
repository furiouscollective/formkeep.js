function sendFormData(url, data) {
  // Make the AJAX request (this should be a separate function)
  const XHR = new XMLHttpRequest();
  // This is where we plug in our callbacks
  XHR.addEventListener('load', function(event) {});
  XHR.addEventListener('error', function(event) {});

  // Send the request with proper headers
  XHR.open('POST', url);
  XHR.setRequestHeader('Accept', 'application/javascript');
  XHR.setRequestHeader('Content-Type', 'application/json');
  XHR.send(JSON.stingify(data));
}

function handleAsyncFormSubmission(event) {
  // Prevent synchronous submission
  event.preventDefault()

  const form = event.target

  // Parse the form data into JSON (maybe we can just submit the form data, this should be a separate function)
  const formJson = Array.from((new FormData(form)).entries()).reduce(function(accumulator, pair) { accumulator[pair[0]] = pair[1]; return accumulator }, {})
  // Build the URL from the identifier, maybe it's better if this identifier is passed in
  const formkeepUrl = "https://formkeep.com/f/" + form.dataset('formkeep-identifier')

  sendFormData(formkeepUrl, formJson)
}

function asyncForm(form) {
  form.addEventListener('submit', handleAsyncFormSubmission)
}

module.exports = {
  asyncForm: asyncForm
}
