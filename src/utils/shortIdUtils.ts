export function shortId(id: string) {
  return parseInt(id.replace(/-/g, '').slice(0, 12), 16).toString(36)
}

export const currencyFormatter = new Intl.NumberFormat('pt-BR', {
  style: 'currency',
  currency: 'BRL'
})
