import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// =========================
// API Slice
// =========================
export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api',
    credentials: 'include' // envia cookies automaticamente
  }),
  // 1. Definir os tipos de tags para gerenciamento de cache
  tagTypes: ['Products', 'Orders', 'Users', 'Messages', 'Categories', 'unreadMessages', 'Shipping', 'Address', 'Cart'],
  endpoints: builder => ({
    // =========================
    // Produtos
    // =========================
    getProducts: builder.query<Product[], void>({
      query: () => 'products',
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products' as const, id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }]
    }),
    getProductById: builder.query<Product, string>({
      query: id => `products/${id}`,
      providesTags: (result, error, id) => [{ type: 'Products', id }]
    }),
    getHighlightedProducts: builder.query<Product[], void>({
      query: () => ({
        url: 'products',
        params: { highlight: true }
      }),
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Products' as const, id })), { type: 'Products', id: 'LIST' }]
          : [{ type: 'Products', id: 'LIST' }]
    }),
    createProduct: builder.mutation<Product, NewProductPayload>({
      query: body => ({
        url: 'products',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    updateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PUT',
        body: data
      }),
      // Invalida a tag do item específico e a da lista.
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' }
      ]
    }),
    deleteProduct: builder.mutation<Product, string>({
      query: id => ({
        url: `products/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Products', id: 'LIST' }]
    }),
    partialUpdateProduct: builder.mutation<Product, { id: string; data: Partial<Product> }>({
      query: ({ id, data }) => ({
        url: `/products/${id}`,
        method: 'PATCH',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Products', id },
        { type: 'Products', id: 'LIST' }
      ]
    }),

    // =========================
    // Categorias
    // =========================
    getCategories: builder.query<Category[], void>({
      query: () => 'categories',
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Categories' as const, id })), { type: 'Categories', id: 'LIST' }]
          : [{ type: 'Categories', id: 'LIST' }]
    }),
    getCategoryById: builder.query<Category, string>({
      query: id => `categories/${id}`,
      providesTags: (result, error, id) => [{ type: 'Categories', id }]
    }),
    createCategory: builder.mutation<Category, { name: string }>({
      query: body => ({
        url: 'categories',
        method: 'POST',
        body
      }),
      // 3. Invalidar a lista de categorias para refetch
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),
    updateCategory: builder.mutation<Category, { id: string; data: Partial<Category> }>({
      query: ({ id, data }) => ({
        url: `categories/${id}`,
        method: 'PUT',
        body: data
      }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Categories', id },
        { type: 'Categories', id: 'LIST' }
      ]
    }),
    deleteCategory: builder.mutation<Category, string>({
      query: id => ({
        url: `categories/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Categories', id: 'LIST' }]
    }),

    // =========================
    // Pedidos
    // =========================
    createOrder: builder.mutation<Order, { userId: string; addressId: string; totalAmount: number; shippingCost: number }>({
      query: body => ({
        url: 'orders',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),

    getOrders: builder.query<Order[], void>({
      query: () => 'orders',
      providesTags: result =>
        result ? [...result.map(({ id }) => ({ type: 'Orders' as const, id })), { type: 'Orders', id: 'LIST' }] : [{ type: 'Orders', id: 'LIST' }]
    }),

    getOrderById: builder.query<Order, string>({
      query: id => `orders/${id}`,
      providesTags: (result, error, id) => [{ type: 'Orders', id }]
    }),

    updateOrder: builder.mutation<Order, { id: string; data: Partial<{ status: OrderStatus }> }>({
      query: ({ id, data }) => ({
        url: `/orders/${id}`,
        method: 'PATCH',
        body: data
      }),
      async onQueryStarted({ id, data }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          apiSlice.util.updateQueryData('getOrders', undefined, draft => {
            const order = draft.find(o => o.id === id)
            if (order && data.status) {
              order.status = data.status
            }
          })
        )
        try {
          await queryFulfilled
        } catch {
          patchResult.undo()
        }
      },
      invalidatesTags: (result, error, { id }) => [{ type: 'Orders', id }]
    }),

    deleteOrder: builder.mutation<{ message: string }, string>({
      query: id => ({
        url: `orders/${id}`,
        method: 'DELETE'
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),

    // =========================
    // Pagamento (Stripe)
    // =========================
    createPaymentIntent: builder.mutation<
      { clientSecret: string },
      { amount: number; items: SimplifiedCartItem[]; addressId: string; shippingCost: number }
    >({
      query: body => ({
        url: 'paymentIntent',
        method: 'POST',
        body: body
      }),
      invalidatesTags: [{ type: 'Orders', id: 'LIST' }]
    }),

    // =========================
    // Usuários
    // =========================
    getUsers: builder.query<User[], void>({
      query: () => 'users',
      providesTags: result =>
        result ? [...result.map(({ id }) => ({ type: 'Users' as const, id })), { type: 'Users', id: 'LIST' }] : [{ type: 'Users', id: 'LIST' }]
    }),
    getUserById: builder.query<User, string>({
      query: id => `users/${id}`,
      providesTags: (result, error, id) => [{ type: 'Users', id }]
    }),
    deleteUser: builder.mutation<{ message: string }, string>({
      query: id => ({ url: `users/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    registerUser: builder.mutation<RegisterResponse, RegisterPayload>({
      query: body => ({
        url: 'auth/register',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Users', id: 'LIST' }]
    }),
    loginUser: builder.mutation<LoginResponse, LoginPayload>({
      query: body => ({
        url: 'auth/login',
        method: 'POST',
        body
      })
    }),
    logoutUser: builder.mutation<{ success: boolean }, void>({
      query: () => ({
        url: 'auth/logout',
        method: 'POST'
      })
    }),
    verifyUser: builder.query<VerifyResponse, void>({
      query: () => 'auth/verify'
    }),

    // =========================
    // Mensagens / Contato
    // =========================
    postUserMessage: builder.mutation<Message, MessagePayload>({
      query: body => ({
        url: 'users/message',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }]
    }),
    getUserMessages: builder.query<Message[], MessagePayload | void>({
      query: arg => {
        if (arg) return { url: 'users/message', params: arg }
        return 'users/message'
      },
      providesTags: result =>
        result
          ? [...result.map(({ id }) => ({ type: 'Messages' as const, id })), { type: 'Messages', id: 'LIST' }]
          : [{ type: 'Messages', id: 'LIST' }]
    }),
    deleteMessage: builder.mutation<Message, string>({
      query: id => ({
        url: `users/message/${id}`,
        method: 'DELETE',
        body: { status: 'READ' }
      }),
      invalidatesTags: [{ type: 'Messages', id: 'LIST' }]
    }),
    updateMessageStatus: builder.mutation<Message, { id: string }>({
      query: ({ id }) => ({
        url: `users/message/${id}`,
        method: 'PATCH',
        body: { status: 'READ' }
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Messages', id }, { type: 'Messages', id: 'LIST' }, 'unreadMessages']
    }),
    getUnreadMessages: builder.query<{ count: number }, void>({
      query: () => 'users/message/unread',
      providesTags: ['unreadMessages']
    }),
    answerMessage: builder.mutation<Message, { messageId: string; responseText: string }>({
      query: ({ messageId, responseText }) => ({
        // A URL corresponde à nova rota que criamos
        url: `users/message/${messageId}/reply`,
        method: 'POST',
        body: { responseText }
      }),
      // Invalida o cache para forçar o refetch da lista e do item específico
      invalidatesTags: (result, error, { messageId }) => [{ type: 'Messages', id: messageId }, { type: 'Messages', id: 'LIST' }, 'unreadMessages']
    }),

    // =========================
    // Upload de imagens (não precisa de tags, pois é um serviço externo)
    // =========================
    uploadImage: builder.mutation<{ url: string }, FormData>({
      query: formData => ({
        url: 'https://api.cloudinary.com/v1_1/dvonqxpbc/image/upload',
        method: 'POST',
        body: formData
      })
    }),

    // =========================
    // Frete
    // =========================
    calculateShipping: builder.mutation<ShippingResponse, ShippingRequest>({
      query: body => ({
        url: 'shipping',
        method: 'POST',
        body
      }),
      invalidatesTags: ['Shipping']
    }),

    // =========================
    // Address
    // =========================
    getUserAddressById: builder.query<Address, { userId: string; id: string }>({
      query: ({ userId, id }) => `users/${userId}/address/${id}`,
      providesTags: (result, error, { id }) => [{ type: 'Address', id }]
    }),

    getUserAddresses: builder.query<Address[], string>({
      query: userId => `users/${userId}/address`,
      providesTags: result =>
        result ? [...result.map(a => ({ type: 'Address' as const, id: a.id })), { type: 'Address', id: 'LIST' }] : [{ type: 'Address', id: 'LIST' }]
    }),

    createAddress: builder.mutation<Address, { userId: string; data: NewAddressPayload }>({
      query: ({ userId, data }) => ({ url: `users/${userId}/address`, method: 'POST', body: data }),
      invalidatesTags: [{ type: 'Address', id: 'LIST' }]
    }),

    updateAddress: builder.mutation<Address, { userId: string; id: string; data: Partial<Address> }>({
      query: ({ userId, id, data }) => ({ url: `users/${userId}/address/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Address', id },
        { type: 'Address', id: 'LIST' }
      ]
    }),
    deleteAddress: builder.mutation<{ message: string }, { userId: string; id: string }>({
      query: ({ userId, id }) => ({ url: `users/${userId}/address/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Address', id: 'LIST' }]
    }),

    getDefaultAddress: builder.query<Address, string>({
      query: userId => `users/${userId}/address/default`,
      providesTags: ['Address']
    }),

    setDefaultAddress: builder.mutation<Address, { userId: string; addressId: string }>({
      query: ({ userId, addressId }) => ({
        url: `/users/${userId}/address/${addressId}/default`,
        method: 'PATCH'
      }),
      invalidatesTags: ['Address']
    }),

    // =========================
    // Cart
    // =========================
    getCart: builder.query<Cart, void>({
      query: () => 'cart',
      providesTags: result =>
        result ? [...result.items.map(({ id }) => ({ type: 'Cart' as const, id })), { type: 'Cart', id: 'LIST' }] : [{ type: 'Cart', id: 'LIST' }]
    }),

    addCartItem: builder.mutation<CartItem, NewCartItemPayload>({
      query: body => ({ url: 'cart', method: 'POST', body }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    }),

    updateCartItem: builder.mutation<CartItem, { id: number; data: UpdateCartItemPayload }>({
      query: ({ id, data }) => ({ url: `cart/${id}`, method: 'PUT', body: data }),
      invalidatesTags: (result, error, { id }) => [
        { type: 'Cart', id },
        { type: 'Cart', id: 'LIST' }
      ]
    }),

    deleteCartItem: builder.mutation<{ success: boolean }, number>({
      query: id => ({ url: `cart/${id}`, method: 'DELETE' }),
      invalidatesTags: [{ type: 'Cart', id: 'LIST' }]
    })
  })
})

// =========================
// Hooks RTK Query
// =========================
export const {
  // Produtos
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetHighlightedProductsQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  usePartialUpdateProductMutation,

  // Categorias
  useGetCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,

  // Pedidos
  useCreateOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
  useGetOrderByIdQuery,
  useDeleteOrderMutation,

  //pagamento
  useCreatePaymentIntentMutation,

  // Usuários
  useGetUsersQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useLogoutUserMutation,
  useVerifyUserQuery,
  useGetUserByIdQuery,
  useDeleteUserMutation,

  // Mensagens
  usePostUserMessageMutation,
  useGetUserMessagesQuery,
  useDeleteMessageMutation,
  useUpdateMessageStatusMutation,
  useGetUnreadMessagesQuery,
  useAnswerMessageMutation,

  // Upload de imagens
  useUploadImageMutation,

  // Frete
  useCalculateShippingMutation,

  // Address
  useGetUserAddressByIdQuery,
  useGetUserAddressesQuery,
  useCreateAddressMutation,
  useUpdateAddressMutation,
  useDeleteAddressMutation,
  useSetDefaultAddressMutation,
  useGetDefaultAddressQuery,

  // Cart
  useGetCartQuery,
  useAddCartItemMutation,
  useUpdateCartItemMutation,
  useDeleteCartItemMutation
} = apiSlice
