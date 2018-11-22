const mock = require('xhr-mock').default
const fixtureHelpers = require('./helpers/fixtureHelpers')
const appHelpers = require('../helpers')
const asyncForm = require('../asyncForm')
const $ = require('jquery')

fdescribe('asyncForm.js', function() {
  beforeEach(function() {
    fixtureHelpers.mountFixture('index-fixture', `
      <form data-formkeep-identifier="f3a748fed01a">
        <input type="hidden" name="utf8" value="✓" />

        <input name="email" value="test@example.com" />
        <textarea name="comments" value="I love FormKeep"></textarea>

        <button id="submit-button" type="submit">Submit</button>
      </form>
    `)
    mock.setup()
    asyncForm.asyncForm(document.querySelector('[data-formkeep-identifier]'))
  })

  afterEach(function() {
    fixtureHelpers.unmountFixture('index-fixture')
    mock.teardown()
  })

  describe('Async submission', function() {
    it('submits the form through ajax', function() {
      // Call `asyncForm` on form (`[data-formkeep-identifier]`)
      // Click submit button
      // Verify:
      //  - URL hit
      //  - Headers set (application/javascript and application/json)
      //  - Form data set
      expect.assertions(3);

      mock.post('/api/user', (req, res) => {
        expect(req.header('Accept')).toEqual('application/javascript');
        expect(req.header('Content-Type')).toEqual('application/json');
        expect(req.body()).toEqual('{"email":"test@example.com","comments":"I love FormKeep"}');
        return res.status(201).body('{"data":{"id":"abc-123"}}');
      });

      $('submit-button').click()
    })

    describe('beforeSubmit', function() {
      it('calls the `beforeSubmit` callback', function() {
      })

      it('passes the object with the data to be submitted', function() {
      })

      it('allows for adding arbitrary fields to the submitted data', function() {
      })

      it("doesn't submit if `false` is returned", function() {
      })
    })

    // describe 'afterSubmissionHalted'

    describe('afterResponse', function() {
      it('calls the `afterResponse` callback', function() {
      })

      it('passes an error describer to the callback if the response is a `400`', function() {
      })

      it('passes an error describer to the callback if the response is a `500`', function() {
      })

      it('passes a success response if the submission response is a `300`', function() {
      })

      it('passes a success response if the submission response is a `200`', function() {
      })
    })
  })
})
