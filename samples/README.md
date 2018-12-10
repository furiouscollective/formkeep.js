# Samples

## Usage

### Set up your local environment

1. Clone the repo
1. [Install yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
1. Switch to this directory (`samples`)
1. Run `yarn install`

### View the live examples

1. Run `yarn start`
1. Visit the URL for the example from your browser (host is usually `localhost:1234`)

__Note__ You can change the samples to point to your own FormKeep forms by changing the `action` in `form`s (for `thanksForm` and `redirectForm`), the `data-formkeep-id` in the `form` (for `autoloadAsyncForms`) and the `const formkeepIdentifier` (for `asyncForm` and `post`).

| Sample | Address |
| ------ | ------- |
| Show a success message | http://localhost:1234/autoloadAsyncForms.html |
| Redirect to a page depending on input | http://localhost:1234/redirectForm.html |
| Customize the Thanks form | http://localhost:1234/thanksForm.html |
| Submit the form through AJAX | http://localhost:1234/asyncForm.html |
| Post JSON data to FormKeep | http://localhost:1234/post.html |
