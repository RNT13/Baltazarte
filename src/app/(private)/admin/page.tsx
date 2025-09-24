'use client'

import Loading from "@/app/(public)/loading";
import { Box } from "@/components/ui/Box/Box";
import Button from "@/components/ui/Button/Button";
import { CategoryManager } from "@/components/ui/CategoryManager/CategoryManager";
import EditItem from "@/components/ui/EditItem/EditItem";
import FilterBar from "@/components/ui/FilterBar/FilterBar";
import HamburgerMenu, { HamburgerMenuWindow } from "@/components/ui/HamburgerMenu/HamburgerMenu";
import { MessageCard } from "@/components/ui/MessageCard/MessageCard";
import MessageResponse from "@/components/ui/MessageResponse/MessageResponse";
import { ModalWrapper } from "@/components/ui/ModalWrapper/ModalWrapper";
import OrdersManager from "@/components/ui/OrdersManager/OrdersManager";
import ProductCard from "@/components/ui/ProductCard/ProductCard";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useFilteredOrders } from "@/hooks/useFilteredOrders";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import {
  useGetCategoriesQuery,
  useGetOrdersQuery,
  useGetProductsQuery,
  useGetUnreadMessagesQuery,
  useGetUserMessagesQuery,
  useGetUsersQuery,
  useVerifyUserQuery
} from "@/redux/slices/apiSlice";
import { setFilter } from "@/redux/slices/filterSlice";
import { TitleH2, TitleH3 } from "@/styles/globalStyles";
import { currencyFormatter } from "@/utils/shortIdUtils";
import { useState } from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FaDollarSign, FaEye, FaRegEyeSlash, FaShippingFast } from "react-icons/fa";
import { FaCartFlatbed, FaRegMessage, FaUsers } from "react-icons/fa6";
import { IoMailOpenOutline } from "react-icons/io5";
import { LuLayoutDashboard, LuUsers } from "react-icons/lu";
import { MdAddToPhotos, MdOutlineEmail, MdOutlineMarkEmailUnread } from "react-icons/md";
import { RiMailCheckLine } from "react-icons/ri";
import {
  AdminCenterSide,
  AdminCenterSideBody,
  AdminCenterSideCard,
  AdminCenterSideHeader,
  AdminContainer,
  AdminContent,
  AdminLeftSide
} from "./adminStyles";

export default function Admin() {
  const dispatch = useAppDispatch()
  const [activeSection, setActiveSection] = useState<'dashboard' | 'produtos' | 'mensagems' | 'usuarios' | 'pedidos'>('dashboard');
  const [isEditItemOpen, setIsEditItemOpen] = useState(false)
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false)
  const [isMessageResponseOpen, setIsMessageResponseOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)

  const { data: products } = useGetProductsQuery()
  const { data: messages } = useGetUserMessagesQuery()
  const { data: unreadMessages } = useGetUnreadMessagesQuery()
  const { data: orders } = useGetOrdersQuery()
  const { data: users } = useGetUsersQuery()
  const { data: session } = useVerifyUserQuery()
  const { data: categories } = useGetCategoriesQuery()
  const { filteredOrders, activeFilter } = useFilteredOrders(orders ?? [])
  const { filteredProducts } = useFilteredProducts(products ?? [])


  const handleEditProduct = async (product: Product) => {
    setSelectedProduct(product)
    setIsEditItemOpen(true)
  };

  const handleCreateProduct = () => {
    setSelectedProduct(null)
    setIsEditItemOpen(true)
  };

  const handleMessageResponse = (message: Message) => {
    setSelectedMessage(message)
    setIsMessageResponseOpen(true)
  }

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
  };

  if (!products || !messages || !orders || !users || !session) {
    return (
      <AdminContainer>
        <AdminContent>
          <AdminCenterSide>
            <AdminCenterSideHeader>
              <Loading />
            </AdminCenterSideHeader>
          </AdminCenterSide>
        </AdminContent>
      </AdminContainer>
    )
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <AdminCenterSide key='dashboard' >
            <AdminCenterSideHeader>
              <AdminCenterSideCard>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Total de produtos</TitleH3>
                  <div>
                    <BsBoxSeam />
                    <p>{products.length}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Total de pedidos</TitleH3>
                  <div>
                    <FaShippingFast />
                    <p>{orders.length}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Mensagens</TitleH3>
                  <div>
                    <FaRegMessage />
                    <p>{messages.length}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Receita total</TitleH3>
                  <div>
                    <FaDollarSign />
                    <p>{currencyFormatter.format(orders.reduce((acc, order) => acc + order.totalAmount, 0))}</p>
                  </div>
                </Box>
              </AdminCenterSideCard>
            </AdminCenterSideHeader>

            <AdminCenterSideBody>
              <Box width="lg" height="400" direction="row" $padding="sm" $bgColor="primary">
                <TitleH2>Bem-vindo ao painel {session.name}, veja as estatísticas acima.</TitleH2>
              </Box>
            </AdminCenterSideBody>
          </AdminCenterSide>
        )
      case 'produtos':
        return (
          <AdminCenterSide key='produtos'>
            <AdminCenterSideHeader>
              <AdminCenterSideCard>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Total de produtos</TitleH3>
                  <div>
                    <BsBoxSeam />
                    <p>{products.length}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Em Estoque</TitleH3>
                  <div>
                    <FaEye className="greenAye" />
                    <p>{products.filter(product => product.active && product.stock > 0).length}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Fora de Estoque</TitleH3>
                  <div>
                    <FaRegEyeSlash className="redAye" />
                    <p>{products.filter(product => product.active === false || product.stock === 0).length}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Valor Total</TitleH3>
                  <div>
                    <FaDollarSign />
                    <p>
                      {currencyFormatter.format(products.reduce((acc, product) => acc + product.salePrice * product.stock, 0))}
                    </p>
                  </div>
                </Box>
              </AdminCenterSideCard>
            </AdminCenterSideHeader>

            <AdminCenterSideBody>

              <Box width="lg" height="xm" direction="row" $padding="sm" $bgColor="primary" $justify="space-between">
                <FilterBar
                  filters={['Todos', 'Inativos', ...(categories?.map(category => category.name) ?? [])]}
                  activeFilter={activeFilter}
                  onFilterChange={handleFilterChange}
                />

                <CategoryManager
                  selectedCategoryId={categories?.find(c => c.name === activeFilter)?.id ?? ''}
                  onSelect={(id) => {
                    const selectedCat = categories?.find(c => c.id === id);
                    if (selectedCat) {
                      handleFilterChange(selectedCat.name);
                    }
                  }}
                />
              </Box>


              <Box width="lg" height="lg" direction="row" $padding="sm" $bgColor="primary">
                <ul>
                  {filteredProducts.map(product => (
                    <li key={product.id}>
                      <ProductCard
                        onEdit={() => { handleEditProduct(product) }}
                        products={product} />
                    </li>
                  ))}
                </ul>
              </Box>
              <Button variant="pink" onClick={() => { handleCreateProduct() }} leftIcon={<MdAddToPhotos />}>Criar produto</Button>
            </AdminCenterSideBody>
          </AdminCenterSide>
        )
      case 'mensagems':
        return (
          <AdminCenterSide key='mensagems'>
            <AdminCenterSideHeader>
              <AdminCenterSideCard>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Total</TitleH3>
                  <div>
                    <MdOutlineEmail />
                    <p>{messages.length}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Novas</TitleH3>
                  <div>
                    <MdOutlineMarkEmailUnread />
                    <p>{unreadMessages?.count}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Lidas</TitleH3>
                  <div>
                    <IoMailOpenOutline />
                    <p>{messages.length - (unreadMessages ? unreadMessages.count : 0)}</p>
                  </div>
                </Box>
                <Box height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="secondary">
                  <TitleH3>Respondidas</TitleH3>
                  <div>
                    <RiMailCheckLine />
                    <p>{messages.filter(message => message.response).length}</p>
                  </div>
                </Box>
              </AdminCenterSideCard>
            </AdminCenterSideHeader>

            <AdminCenterSideBody>
              <Box width="lg" height="lg" direction="row" $padding="sm" $bgColor="primary">
                <ul>
                  {messages.map(message => (
                    <li key={message.id}>
                      <MessageCard
                        onResponse={() => { handleMessageResponse(message) }}
                        messages={message}
                      />
                    </li>
                  ))}
                </ul>
              </Box>
            </AdminCenterSideBody>
          </AdminCenterSide>
        )
      case 'usuarios':
        return (
          <>
            <Box width="lg" height="sm" direction="row" $padding="sm" $bgColor="primary">
              <FaUsers />{users.length}
            </Box>
            <Box width="lg" height="400" direction="row" $padding="sm" $bgColor="primary">
              <ul>
                {users.map(u => (
                  <li key={u.id}>{u.name}</li>
                ))}
              </ul>
            </Box>
          </>
        )
      case 'pedidos':
        return (
          <AdminCenterSide key='pedidos'>
            <AdminCenterSideHeader>
              <FilterBar
                filters={['Todos', 'Pendente', 'Pago', 'Processando', 'Enviado', 'Entregue', 'Cancelado', 'Falhou', 'Reembolsado']}
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
              />
            </AdminCenterSideHeader>

            <AdminCenterSideBody>
              <OrdersManager orders={filteredOrders} />
            </AdminCenterSideBody>
          </AdminCenterSide>
        );
      default:
        return null
    }
  }

  const NavMenu = () => {
    return (
      <>
        <Button variant="ghost" size="sm" leftIcon={<LuLayoutDashboard />} $isActive={activeSection === 'dashboard'} onClick={() => { setActiveSection('dashboard'); setIsHamburgerOpen(false) }}>Dashboard</Button>
        <Button variant="ghost" size="sm" leftIcon={<BsBoxSeam />} $isActive={activeSection === 'produtos'} onClick={() => { setActiveSection('produtos'); setIsHamburgerOpen(false) }}>Produtos</Button>
        <Button variant="ghost" size="sm" leftIcon={<FaCartFlatbed />} $isActive={activeSection === 'pedidos'} onClick={() => { setActiveSection('pedidos'); setIsHamburgerOpen(false) }}>Pedidos</Button>
        <Button variant="ghost" size="sm" leftIcon={<FaRegMessage />} rightIcon={unreadMessages && unreadMessages.count > 0 ? (<span>{unreadMessages.count}</span>) : (<></>)} $isActive={activeSection === 'mensagems'} onClick={() => { setActiveSection('mensagems'); setIsHamburgerOpen(false) }}>Mensagens</Button>
        <Button variant="ghost" size="sm" leftIcon={<LuUsers />} $isActive={activeSection === 'usuarios'} onClick={() => { setActiveSection('usuarios'); setIsHamburgerOpen(false) }}>Usuários</Button>
      </>
    );
  }

  return (
    <AdminContainer>
      <HamburgerMenuWindow $isOpen={isHamburgerOpen} >
        <NavMenu />
      </HamburgerMenuWindow>
      <AdminContent className="container">
        <AdminLeftSide >
          <Box height="sm" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="primary">
            <TitleH2>Painel do Admin</TitleH2>
          </Box>
          <Box className="boxRow" height="lg" direction="column" $padding="sm" $justify="center" $align="start" $bgColor="primary">
            <NavMenu />
          </Box>
        </AdminLeftSide>

        <AdminCenterSide>
          <Box height="xm" direction="row" $padding="sm" $align="center" $bgColor="primary">
            <HamburgerMenu onClick={() => setIsHamburgerOpen(!isHamburgerOpen)} $isOpen={isHamburgerOpen} />
            <TitleH2>{activeSection.toUpperCase()}</TitleH2>
          </Box>

          {renderSection()}
        </AdminCenterSide>

        {isEditItemOpen && (
          <ModalWrapper isOpen={isEditItemOpen} onClose={() => setIsEditItemOpen(false)}>
            <EditItem product={selectedProduct} onClose={() => setIsEditItemOpen(false)} />
          </ModalWrapper>
        )}

        {isMessageResponseOpen && selectedMessage && (
          <ModalWrapper isOpen={isMessageResponseOpen} onClose={() => setIsMessageResponseOpen(false)}>
            <MessageResponse message={selectedMessage} onClose={() => setIsMessageResponseOpen(false)} />
          </ModalWrapper>
        )}

      </AdminContent>
    </AdminContainer>
  )
}
