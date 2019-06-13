import * as FormKeep from './index'

describe('index.js', () => {
  [
    'asyncForm',
    'post',
    'thanksForm',
    'redirectForm'
  ].forEach(functionName => {
    it(`exports ${functionName}`, () => {
      expect(typeof FormKeep[functionName]).toEqual('function')
    })
  })
})
