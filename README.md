# FormKeep.js

## Ruby + Jasmine
Jasmine is a simple but feature complete JavaScript testing framework.
The `ruby-jasmine` branch has a simple ruby setup to serve the javascript (both the tests and testing code)

To run the tests in the browser:
- `rake jasmine` to start the server
- Visit `localhost:8888`

To run the tests headlessly:
- `rake jasmine:ci`

### Advantages
- Easy to setup and run
- Easy to test on real browsers (with debugging and all)
- Easy to test on a headless browser if needed (for CI for instance)

### Disadvantages
- Doesn't make use of the full JS ecosystem which can be eventually useful
- Constrained to old JS features (can be fixed)
