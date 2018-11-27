# FormKeep.js

This library offers a few methods to post data to FormKeep using AJAX, so you can handle the response on your side. If you just want to configure a redirect url or the default "Thank you" page [check the docs](link/to/docs/page/on/params).

## Usage

### Install

#### With NPM *NOT PUBLISHED*
- `npm install formkeep`, or
- `yarn add formkeep`
- Then use in your code with:
  ```javascript
    const Formkeep = require('formkeep')
  ```

#### Import globally *NOT PUBLISHED*
- Add to your HTML header:
  ```html
    <script src="unpkg.com/formkeep/dist/browser.js"></script>
  ```
- Use in your code with:
  ```javascript
    const Formkeep = window.Formkeep
  ```

#### sendForm(formkeepIdentifier: string, formData: Object, options: Object)
You can use it to easily post JSON data to a FormKeep form
- `formkeepIdentifier`: your form's unique identifier (you can find it in your FormKeep dashboard)
- `formData`: a JSON object with the data you want to post
- `options`:
  - `onSuccess` (this could probably be passed a param, either the response or the posted data) a function to call when the data is successfully posted to FormKeep.
  - `onFailure` (this too could be passed a param) a function to call if posting the form fails (we should add why would this happen)

Example:
```javascript
  const Formkeep = window.Formkeep // or require('formkeep')

  FormKeep.sendForm('bbac7724', { name: 'Barney', email: 'awesome@legendary.com' }, {
    onSuccess: () => {
      window.alert('Successfully posted!')
    },
    onFailure: () => {
      window.alert('There was an error posting your form!')
    }
  })
```

#### makeFormAsync(form: HTMLFormElement, options: Object)
You can use this to make any form post to FormKeep using AJAX, so you can handle what to do afterwards.
- `form`: the form element you want to post through AJAX.
- `formkeepIdentifier`: the id of the form to post.
- `options`:
  - `beforeSubmit`: a function to call before the form is posted, in here you can do validations or show a loading indicator. Returning `false` from this function will halt the submission. It receives the form's data as a json object, and should return a json object with the data to be posted (this allows for modifying this data dynamically)
  - `onSuccess`: (this could probably be passed a param, either the response or the posted data) a function to call when the data is successfully posted to FormKeep.
  - `onFailure`: (this too could be passed a param) a function to call if posting the form fails (we should add why would this happen)

Example:
```html
  <!-- On your markup -->
  <form id="example-form">
    <input type="hidden" name="utf8" value="✓" />
    <input type="text" name="name" value="Barney" />
    <input type="email" name="email" value="awesome@legendary.com" />
  </form>
```

```javascript
  // On your script
  const Formkeep = window.Formkeep // or require('formkeep')

  const form = document.getElementById('example-form')

  FormKeep.makeFormAsync(form, {
    formkeepIdentifier: 'bac7724',
    beforeSubmit: (formData) => {
      if (!form.querySelector('input[name=email]').value.includes('@')) {
        return false
      }

      formData['publisher'] = 'ACME'
      return formData
    },
    onSuccess: () => {
      window.alert('Successfully posted!')
    },
    onFailure: () => {
      window.alert('There was an error posting your form!')
    }
  })
```

## Contributing

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
