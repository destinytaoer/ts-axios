import Cancel, { isCancel } from '../../src/cancel/Cancel'

describe('cancel:Cancel', () => {
  it('should returns correct result when message is specified', () => {
    const cancel = new Cancel('Operation has been canceled')
    expect(cancel.message).toBe('Operation has been canceled')
  })
  describe('isCancel', () => {
    it('should returns true if value is a Cancel', () => {
      expect(isCancel(new Cancel())).toBeTruthy()
    })
    it('should returns false if value not a Cancel', () => {
      expect(isCancel({})).toBeFalsy()
    })
  })
})
