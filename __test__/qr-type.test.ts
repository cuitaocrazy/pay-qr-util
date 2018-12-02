import { QrType, getQrType } from '../qr-type'

describe('二维码类别判别', () => {
  it('微信', () => {
    // 10, 11, 12, 13, 14, 15开头的16位
    const prefixs = ['10', '11', '12', '13', '14', '15']
    for (const prefix of prefixs) {
      const testQr = prefix + '1234567890123456'
      expect(getQrType(testQr)).toBe(QrType.WX)
    }
  })
  it('支付宝', () => {
    // 28开头16位
    const testQr = '281234567890123456'
    expect(getQrType(testQr)).toBe(QrType.ALI)
  })
  it('银联', () => {
    // 19位数字
    const testQr = '1234567890123456789'
    expect(getQrType(testQr)).toBe(QrType.UP)
  })
  it('未知', () => {
    const testQrs = ['12345678901234567890', 'abc', '12', '123456']
    testQrs.forEach(qr => expect(getQrType(qr)).toBe(QrType.UNKNOWN))
  })
})
