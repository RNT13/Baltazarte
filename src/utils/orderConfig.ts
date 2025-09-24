import { DefaultTheme } from 'styled-components'

export type StatusConfig = {
  label: string
  color: keyof DefaultTheme['colors']
}

export const ORDER_STATUS_CONFIG: Record<OrderStatus, StatusConfig> = {
  PAID: { label: 'Pago', color: 'blue' },
  PROCESSING: { label: 'Processando', color: 'yellow' },
  SHIPPED: { label: 'Enviado', color: 'green' },
  DELIVERED: { label: 'Entregue', color: 'green2' },
  CANCELED: { label: 'Cancelado', color: 'red' },
  FAILED: { label: 'Falhou', color: 'redHover' },
  REFUNDED: { label: 'Reembolsado', color: 'gray' }
}
export const ORDER_STATUS_OPTIONS = Object.entries(ORDER_STATUS_CONFIG).map(([value, { label }]) => ({
  value: value as OrderStatus,
  label: label
}))
