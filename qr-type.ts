import R from 'ramda'
export enum QrType {
  WX = 0,
  ALI = 1,
  UP = 2,
  UNKNOWN = 3,
}

export function getQrType(qr: string) {
  const wxPrefixs = ['10', '11', '12', '13', '14', '15']
  const aliPrefixs = ['28']
  if (!qr || qr.length < 2 || !/^\d+$/.test(qr)) {
    return QrType.UNKNOWN
  }

  const qrPrefix = qr.substr(0, 2)
  const match = R.any(s => s === qrPrefix)
  if (match(wxPrefixs) && qr.length === 18) {
    return QrType.WX
  }

  if (match(aliPrefixs) && qr.length === 18) {
    return QrType.ALI
  }

  if (qr.length === 19) {
    // 可能, 现在没有银联卡BIN, 不知如何判断
    return QrType.UP
  }

  return QrType.UNKNOWN
}
