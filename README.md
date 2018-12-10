# FormKeep.js

This library offers a few methods to make it easier to add interactivity to FormKeep forms, so you can show success messages, dynamically change the redirect URLs, post the form through AJAX and handle the response on your side or even post JSON data to FormKeep from JavaScript. If you just want to configure a redirect url or the default "Thanks" page, regardless of the input [check the docs](https://intercom.help/formkeep/improve-the-user-experience-of-your-forms/can-i-dynamically-change-the-redirect-url).

## Installation

### With a bundler
- `npm install formkeep`, or
- `yarn add formkeep`
- Then use in your code with:
  ```javascript
    const FormKeep = require('formkeep')
  ```

### Without a bundler
- Add to your HTML header:
  ```html
    <script src="unpkg.com/formkeep/dist/index.js"></script>
  ```
- Use the `FormKeep` global variable:
  ```javascript
    FormKeep.post('<YOUR_FORM_IDENTIFIER>', { hello: 'world' })
  ```

## Contents

- __[Guide](#guide)__
  - [Show a success message](#show-a-success-message)
  - [Redirect to a page depending on input](#redirect-to-a-page-depending-on-input)
  - [Redirect to a page depending on input](#redirect-to-a-page-depending-on-input)
  - [Customize the Thanks page depending on input](#customize-the-thanks-page-depending-on-input)
  - [Submit the form through AJAX](#submit-the-form-through-ajax)

- __[API](#api)__
  - [post](#post)
  - [asyncForm](#asyncForm)
  - [thanksForm](#asyncForm)
  - [redirectForm](#asyncForm)

- __[Contributing](#contributing)__

## Guide

### Samples

[Run live samples locally](./samples/README.md)

### Show a success message

1. [Load the script](#without-a-bundler)
1. Add a `<form>` with `data-formkeep-id="<YOUR_FORM_IDENTIFIER>"`
1. Give the `<form>` or any other element an `id="<SOME_UNIQUE_ID>"`
1. Add a `<template>` with `data-formkeep-success-template=<YOUR_FORM_IDENTIFIER>` and `data-target="#<SOME_UNIQUE_ID>"` _(notice the `#`)_
1. When the form is successfully submitted, the element with the unique id will be replaced by the contents of the template.

#### Example

```html
  <!-- On your page -->
  <div id="example-success-notice"></div>

  <form data-formkeep-id="<YOUR_FORM_IDENTIFIER>">
    <input type="hidden" name="utf8" value="✓" />
    <input name="name" value="John Dowd" />
    <input name="email" value="test@example.com" />
    <button type="submit">Submit</button>
  </form>

  <template
    data-formkeep-success-template="<YOUR_FORM_IDENTIFIER>"
    data-target="#example-success-notice"
  >
    <div>
      Your form was successfully posted! We'll get back to you!
    </div>
  </template>
```

### Redirect to a page depending on input

1. [Load the script](#without-a-bundler)
1. Add [a regular FormKeep form](https://intercom.help/formkeep/frequently-asked-questions/sample-form-in-3-steps)
1. Use the `redirectForm` function on your form
1. Pass a `setRedirectUrl` function and return a URL (the form's data is passed to this function for convenience)
1. The `setRedirectUrl` callback will be called after the user clicks submit (but before posting to FormKeep) so you can use their input to set the redirect URL.

#### Example

```html
  <!-- On your page -->
  <form
    id="test-form"
    action="https://formkeep.com/f/<YOUR_FORM_IDENTIFIER>"
    method="POST"
  >
    <div>
      <input type="radio" name="site" value="google" checked>
      <label for="site">Take me to Google</label>
    </div>
    <div>
      <input type="radio" name="site" value="apple">
      <label for="site">Take me to Apple</label>
    </div>

    <button type="submit">Submit</button>
  </form>
```

```javascript
  // On your script
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('test-form')

    FormKeep.redirectForm(form, {
      setRedirectUrl: function(formJson) {
        if (formJson.site === 'google') {
          return 'https://google.com'
        }
        if (formJson.site === 'apple') {
          return 'https://apple.com'
        }
      }
    })
  })
```

### Customize the [Thanks page](https://formkeep.com/thanks?h=This%20is%20the%20heading&s=This%20is%20the%20subheading) depending on input

1. [Load the script](#without-a-bundler)
1. Add [a regular FormKeep form](https://intercom.help/formkeep/frequently-asked-questions/sample-form-in-3-steps)
1. Use the `thanksForm` function on your form
1. Pass a `setHeading` and a `setSubheading` function and return a string from each (the form's data is passed to this function for convenience)
1. The `setHeading` and `setSubheading` callbacks will be called after the user clicks submit (but before posting to FormKeep) so you can use their input to set up the "Thanks" page.

#### Example

```html
  <!-- On your page -->
  <form
    id="test-form"
    action="https://formkeep.com/f/<YOUR_FORM_IDENTIFIER>"
    method="POST"
  >
    <input name="name" value="John Doe" />
    <input name="email" value="test@example.com" />
    <button type="submit">Submit</button>
  </form>
```

```javascript
  // On your script
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('test-form')
    FormKeep.thanksForm(form, {
      setHeading: function(formJson) {
        return "Thanks, " + formJson.name + "!"
      },
      setSubheading: function(formJson) {
        return "We will contact you at" + formJson.email + " soon"
      }
    })
  })
```

### Submit the form through AJAX

1. [Install formkeep.js](#installation)
1. Add the desired form in your HTML
1. Use the `asyncForm` function on your form with your FormKeep identifier
1. Use the `beforeSubmit` hook to do something before the form is posted (this function is passed the form's data as an object)
  - Return `false` to prevent the submission
  - Return the `data` object to submit it (you can modify it)
1. Use the `onSuccess` callback to do something after the form is successfully posted
1. Use the `onFailure` callback to do something if the form fails to post

__Note__ you can also leave out the `onSuccess` and `onFailure` callbacks and `asyncForm` will return a `Promise` instead.

#### Example

```html
  <!-- On your page -->
  <form id="example-form">
    <input type="hidden" name="utf8" value="✓" />
    <input type="text" name="name" value="Barney" />
    <input type="email" name="email" value="awesome@legendary.com" />
  </form>
```

```javascript
  // On your script
  const FormKeep = require('formkeep') // or window.FormKeep

  document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('example-form')

    FormKeep.asyncForm(form, '<YOUR_FORM_IDENTIFIER>', {
      beforeSubmit: (formJson) => {
        if (!form.querySelector('input[name=email]').value.includes('@')) {
          return false
        }

        formJson.publisher = 'ACME'
        return formJson
      },
      onSuccess: () => {
        window.alert('Successfully posted!')
      },
      onFailure: () => {
        window.alert('There was an error posting your form!')
      }
    })
  })
```

### Post JSON data to FormKeep
1. [Install formkeep.js](#installation)
1. Use the `post` function
1. Either pass a config object with `onSuccess` and `onFailure` or omit those and `post` will return a `Promise`

#### Example

```javascript
  const { post } = require('formkeep')

  post('<YOUR_FORM_IDENTIFIER>', { name: 'Barney', email: 'awesome@legendary.com' })
  .then(() => {
    window.alert('Successfully posted!')
  })
  .catch(() => {
    window.alert('There was an error posting your form!')
  })
```

## API

### post

`post(formkeepIdentifier: string, formJson: Object, options: Object | null): true | Promise`

You can use it to easily post JSON data to a FormKeep form. You can omit the onSuccess and onFailure callbacks and a Promise will be returned instead.
- `formkeepIdentifier`: your form's unique identifier (you can find it in your FormKeep dashboard)
- `formJson`: a JSON object with the data you want to post
- `options`:
  - `onSuccess [optional]` a function to call when the data is successfully posted to FormKeep.
  - `onFailure [optional]` a function to call if posting the form fails

### asyncForm

`asyncForm(form: HTMLFormElement, formkeepIdentifier: string, options: Object | null): true | Promise`

You can use this to make any form post to FormKeep using AJAX, so you can handle what to do afterwards. You can omit the onSuccess and onFailure callbacks and a Promise will be returned instead.
- `form`: the form element you want to post through AJAX.
- `formkeepIdentifier`: the id of the form to post.
- `options`:
  - `beforeSubmit`: a function to call before the form is posted, in here you can do validations or show a loading indicator. Returning `false` from this function will halt the submission. It receives the form's data as a json object, and should return a json object with the data to be posted (this allows for modifying this data dynamically)
  - `onSuccess`: a function to call when the data is successfully posted to FormKeep.
  - `onFailure`: a function to call if posting the form fails

### thanksForm

`thanksForm(form: HTMLFormElement, config: Object)`

You can use this to dynamically add thanks params to the FormKeep thanks page
- `form`: the form element you want to modify (it should be [set up to post to formkeep](https://intercom.help/formkeep/frequently-asked-questions/sample-form-in-3-steps)).
- `options`:
  - `setHeading(formJson: Object)`: a function that sets the heading for the thank you page. It is passed the form's data as a JSON object for convenience.
  - `setSubheading(formJson: Object)`: a function that sets the subheading for the thank you page. It is also passed the form's data as a JSON object.

### redirectForm

`redirectForm(form: HTMLFormElement, config: Object)`

You can use this to dynamically add thanks params to the FormKeep thanks page
- `form`: the form element you want to modify (it should be [set up to post to formkeep](https://intercom.help/formkeep/frequently-asked-questions/sample-form-in-3-steps)).
- `options`:
  - `setRedirectUrl(formJson: Object)`: a function that sets the redirect URL when the form is submitted. It is passed the form's data as a JSON object for convenience.

## Contributing

Please submit a PR if you have an improvement!

### Setup
To set up the dependencies:
  - [Install yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
  - Run `yarn install`

### Testing
Unit tests are run with Jest, which automatically uses the `.babelrc` to apply es6 transforms.

To run the unit tests:
  - `yarn test`

### Build
The build is run with Parcel, which uses `@babel/env` by default, so our `.babelrc` mimics that.

To run the build:
  - `yarn build`
