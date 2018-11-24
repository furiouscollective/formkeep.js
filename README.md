# FormKeep.js

## Setup
To set up the dependencies:
  - [Install yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
  - Run `yarn install`

## Testing
Unit tests are run with Jest, which automatically uses the `.babelrc` to apply es6 transforms.

To run the unit tests:
  - `yarn test`

## Build
The build is run with Parcel, which uses `@babel/env` by default, so our `.babelrc` mimics that.

To run the build:
  - `yarn build`
