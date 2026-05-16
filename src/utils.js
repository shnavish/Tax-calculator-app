export function fmt(num) {
  if (num === null || isNaN(num)) return '₹0'
  return `₹${Math.round(num).toLocaleString('en-IN')}`
}

export function fmtNum(num) {
  if (!num) return '0'
  return Math.round(num).toLocaleString('en-IN')
}

export function toNum(val) {
  const num = Number(val)
  return isNaN(num) ? 0 : num
}

export function calc80CTotal(data) {
  if (!data.has80CItems || data.has80CItems.length === 0) return 0
  return data.has80CItems.reduce((sum, key) => sum + toNum(data.investments80C[key]), 0)
}
