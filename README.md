# FormKeep.js

This library offers a few methods to post data to FormKeep using AJAX, so you can handle the response on your side. If you just want to configure a redirect url or the default "Thank you" page [check the docs](link/to/docs/page/on/params).

## Usage

### Install

#### With NPM *NOT PUBLISHED*
- `npm install formkeep`, or
- `yarn add formkeep`
- Then use in your code with:
  ```javascript
    const FormKeep = require('formkeep')
  ```

#### Import globally *NOT PUBLISHED*
- Add to your HTML header:
  ```html
    <script src="unpkg.com/formkeep/dist/index.js"></script>
  ```
- Use in your code with:
  ```javascript
    const FormKeep = window.FormKeep
  ```

#### API

##### post(formkeepIdentifier: string, formJson: Object, options: Object | null): true | Promise
You can use it to easily post JSON data to a FormKeep form. You can omit the onSuccess and onFailure callbacks and a Promise will be returned instead.
- `formkeepIdentifier`: your form's unique identifier (you can find it in your FormKeep dashboard)
- `formJson`: a JSON object with the data you want to post
- `options`:
  - `onSuccess [optional]` (this could probably be passed a param, either the response or the posted data) a function to call when the data is successfully posted to FormKeep.
  - `onFailure [optional]` (this too could be passed a param) a function to call if posting the form fails (we should add why would this happen)

Example:
```javascript
  const FormKeep = window.FormKeep // or require('formkeep')

  FormKeep.sendForm('bbac7724', { name: 'Barney', email: 'awesome@legendary.com' }, {
    onSuccess: () => {
      window.alert('Successfully posted!')
    },
    onFailure: () => {
      window.alert('There was an error posting your form!')
    }
  })
```

##### asyncForm(form: HTMLFormElement, options: Object | null): true | Promise
You can use this to make any form post to FormKeep using AJAX, so you can handle what to do afterwards. You can omit the onSuccess and onFailure callbacks and a Promise will be returned instead.
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
  const FormKeep = window.FormKeep // or require('formkeep')

  const form = document.getElementById('example-form')

  FormKeep.asyncForm(form, {
    formkeepIdentifier: 'bac7724',
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
```

##### thanksForm(form: HTMLFormElement, config: Object)
You can use this to dynamically add thanks params to the FormKeep thanks page
- `form`: the form element you want to modify (it should be [set up to post to formkeep](linktodocs)).
- `options`:
  - `setHeading(formJson: Object)`: a function that sets the heading for the thank you page. It is passed the form's data as a JSON object for convenience.
  - `setSubheading(formJson: Object)`: a function that sets the subheading for the thank you page. It is also passed the form's data as a JSON object.

##### redirectForm(form: HTMLFormElement, config: Object)
You can use this to dynamically add thanks params to the FormKeep thanks page
- `form`: the form element you want to modify (it should be [set up to post to formkeep](linktodocs)).
- `options`:
  - `setRedirectUrl(formJson: Object)`: a function that sets the redirect URL when the form is submitted. It is passed the form's data as a JSON object for convenience.

Example:

```html
  <!-- On your markup -->
  <form id="test-form" action="https://formkeep.com/f/f3a748fed01a" method="POST">
    <input type="hidden" name="utf8" value="✓" />
    <input name="email" value="test@example.com" />
    <button type="submit">Submit</button>
  </form>
```

```javascript
  // On your script
  const FormKeep = window.FormKeep // or require('formkeep')

  const form = document.getElementById('test-form')
  FormKeep.redirectForm(form, {
    setRedirectUrl: formJson => (
      `https://example.com/greeting?name=${formJson.email}`
    )
  })
```

##### makeFormWithSuccessTemplate(form: HTMLFormElement, identifier, config: Object | null)
You can use this to show a message after the form is submitted.
- `form`: the form element you want to modify.
- `formkeepIdentifier`: the id of the form to post.
In addition to calling the function with your form, you can provide a template with a `data-formkeep-success` attribute, and it will replace any element you give a `data-formkeep-replace` attribute.

Example:

```html
  <!-- On your markup -->
  <div data-formkeep-replace="f3a748fed01a"></div>
  <form data-formkeep="f3a748fed01a">
    <input type="hidden" name="utf8" value="✓" />
    <input name="name" value="John Dowd" />
    <input name="email" value="test@example.com" />
    <button type="submit">Submit</button>
  </form>
  <template data-formkeep-success="f3a748fed01a">
    <div>
      Your form was successfully posted! We'll get back to you!
    </div>
  </template>
```

```javascript
  // On your script
  const FormKeep = window.FormKeep // or require('formkeep')

  const form = document.getElementById('test-form')
  FormKeep.thanksForm(form, {
    setHeading: formJson => (
      `Thanks ${formJson.name}!`
    ),
    setSubheading: formJson => (
      `We'll contact you at ${formJson.email}`
    )
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
