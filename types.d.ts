import 'styled-components'
import { store } from './src/redux/store'

// Tipagem do Redux
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

// Tipagem global pro React-Redux + RTK
declare module 'react-redux' {
  type DefaultRootState = RootState
}

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      baseBlack: ColorVariants
      baseBlue: ColorVariants
      baseGreen: ColorVariants
      baseRed: ColorVariants
      baseCyan: ColorVariants
      baseYellow: ColorVariants

      // cores estáticas
      primaryColor: string
      secondaryColor: string
      thirdColor: string
      forthColor: string
      fifthColor: string
      sixthColor: string
      pinkColor: string
      pinkColor2: string
      pinkColor3: string
      textColor: string
      textColor2: string
      textColor3: string
      bgColor: string

      yellow: string
      yellow2: string
      blue: string
      blue2: string
      gray: string
      gray2: string
      orange: string
      orange2: string
      black: string
      red: string
      redHover: string
      error: string
      green: string
      green2: string
      neonBlue: string
      neonGree: string

      // suporte a nested objects (como neon no darkTheme)
      neon?: {
        [key: string]: string
      }
    }
  }
}

declare global {
  declare interface ColorVariants {
    base: string
    light: string
    light02: string
    light04: string
    light08: string
    light20: string
    light30: string
    light40: string
    light50: string
    dark: string
    dark02: string
    dark04: string
    dark08: string
    dark20: string
    dark30: string
    dark40: string
    dark50: string
  }

  type TagType = keyof typeof TAG_CONFIG

  // -------------------------------------
  // Enums (Status e Roles)
  // -------------------------------------
  enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER'
  }

  enum MessageStatus {
    NEW = 'NEW',
    READ = 'READ',
    ANSWERED = 'ANSWERED'
  }

  enum OrderStatus {
    PAID = 'PAID',
    PROCESSING = 'PROCESSING',
    SHIPPED = 'SHIPPED',
    DELIVERED = 'DELIVERED',
    CANCELED = 'CANCELED',
    FAILED = 'FAILED',
    REFUNDED = 'REFUNDED'
  }

  enum PaymentMethod {
    BOLETO = 'BOLETO',
    CREDIT_CARD = 'CREDIT_CARD',
    DEBIT_CARD = 'DEBIT_CARD',
    PIX = 'PIX',
    PENDING = 'PENDING'
  }

  // -------------------------------------
  // Entidades do Banco de Dados (Models)
  // -------------------------------------
  interface Category {
    id: string
    name: string
    slug: string
    createdAt: Date
    updatedAt: Date
  }

  interface Product {
    id: string
    name: string
    categoryId: string
    category: Category
    description: string
    originalPrice: number
    salePrice: number
    discount: number
    thumbnail: string
    gallery: string[]
    stock: number
    highlight: boolean
    sold: number
    active: boolean
    weight: number
    height: number
    width: number
    length: number
    createdAt: Date
    updatedAt: Date
  }

  interface Address {
    id: string
    label: string
    tel: string
    zipCode: string
    street: string
    complement?: string
    number: string
    city: string
    state: string
  }

  interface User {
    id: string
    name: string
    email: string
    password: string
    avatar?: string
    role: UserRole
    address?: Address[]
    createdAt: Date
    updatedAt: Date
  }

  interface CartItem {
    id: number
    product: Product
    quantity: number
    cartId: number
  }

  interface Cart {
    id: number
    userId: string
    items: CartItem[]
  }

  interface OrderProduct {
    id: string
    product: Product
    productId: string
    orderId: string
    quantity: number
    price: number
  }

  interface Order {
    id: string
    user: User
    userId: string
    products: OrderProduct[]
    totalAmount: number
    paymentMethod: PaymentMethod
    status: OrderStatus
    shippingAddress: Address
    shippingCost: number
    trackingCode?: string
    stripePaymentId?: string
    createdAt: Date
    updatedAt: Date
    statusHistory?: {
      status: OrderStatus
      changedAt: Date
    }[]
  }

  interface Message {
    id: string
    name: string
    email: string
    tel: string
    type: string
    message: string
    status: MessageStatus
    response?: string
    user?: User
    createdAt: Date
    updatedAt: Date
  }

  // -------------------------------------
  // Payloads e Respostas de API
  // -------------------------------------

  // Auth
  interface RegisterPayload {
    name: string
    email: string
    password: string
  }
  interface RegisterResponse {
    user: User
    token: string
    message: string
    success: boolean
  }
  interface LoginPayload {
    email: string
    password: string
  }
  interface LoginResponse {
    user: User
    token: string
    message: string
    success: boolean
  }
  interface VerifyResponse {
    id: string
    name: string
    email: string
    role: UserRole
    avatar: string
    createdAt: Date
    updatedAt: Date
    defaultAddressId: string
  }

  // Product
  interface NewProductPayload {
    id?: string
    name: string
    categoryId: string
    description: string
    originalPrice?: number
    thumbnail: string
    gallery: string[]
    discount: number
    stock: number
    highlight: boolean
    sold: number
    active: boolean
  }

  // Cart
  interface SimplifiedCartItem {
    productId: string
    quantity: number
    salePrice: number
  }
  interface NewCartItemPayload {
    productId: string
    quantity: number
  }
  interface UpdateCartItemPayload {
    quantity: number
  }

  // Address
  interface NewAddressPayload {
    label: string
    tel: string
    zipCode: string
    street: string
    complement?: string
    number: string
    city: string
    state: string
  }

  // Order
  interface NewOrderRequestBody {
    cartId: number
    addressId: string
    totalAmount: number
    shippingCost: number
  }
  interface PendingOrder {
    order: Order
    clientSecret: string
  }

  // Message
  interface MessagePayload {
    name: string
    email: string
    tel: string
    type: string
    message: string
    response?: string
  }

  // Shipping
  interface ShippingRequest {
    cepDestino: string
    peso: number
    largura: number
    altura: number
    comprimento: number
  }
  interface ShippingResponse {
    price: number
    prazo: number
  }

  // Genérico
  interface ApiErrorResponse {
    data?: {
      message?: string
    }
    status?: number
  }
}
