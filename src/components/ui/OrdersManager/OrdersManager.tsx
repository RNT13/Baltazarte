'use client';

import { useDeleteOrderMutation, useUpdateOrderMutation } from '@/redux/slices/apiSlice';
import { CloseButton, MinorTextH4, TitleH2, TitleH3 } from '@/styles/globalStyles';
import { ORDER_STATUS_OPTIONS } from '@/utils/orderConfig';
import { currencyFormatter } from '@/utils/shortIdUtils';
import Image from 'next/image';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { IoMdCloseCircleOutline } from 'react-icons/io';
import { TbListDetails } from 'react-icons/tb';
import { Box } from '../../ui/Box/Box';
import Button from '../../ui/Button/Button';
import Tag from '../../ui/Tag/Tag';
import { ModalWrapper } from '../ModalWrapper/ModalWrapper';
import { DetailGrid, DetailItem, DetailSection, ManagerContainer, ModalBody, ModalContent, ModalFooter, ModalHeader, OrderActions, OrderCard, OrderInfo, ProductItem, StatusSelect } from './OrdersManagerStyles';

interface OrdersManagerProps {
  orders: Order[];
}

export default function OrdersManager({ orders }: OrdersManagerProps) {
  const [updateOrder, { isLoading: isUpdating }] = useUpdateOrderMutation();

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrder({ id: orderId, data: { status: newStatus } }).unwrap();
      toast.success(`Pedido atualizado!`);
    } catch (error) {
      toast.error('Falha ao atualizar o status do pedido.');
      console.error(error);
    }
  };

  return (
    <>
      <ManagerContainer>
        <Box width='lg' height='lg' $padding='sm' direction="column" $justify="center" $align="center" $bgColor='primary'>
          {orders.length > 0 ? (
            orders.map(order => (
              <OrderCard key={order.id}>
                <OrderInfo>
                  <TitleH2>
                    Pedido #{order.id.substring(0, 8).toUpperCase()}
                  </TitleH2>
                  <Tag type={`order_${order.status.toLowerCase() as Lowercase<OrderStatus>}`} variant='overlay' position='right' />
                  <MinorTextH4>Cliente: {order.user?.name || 'Não identificado'}</MinorTextH4>
                  <MinorTextH4>Data: {new Date(order.createdAt).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</MinorTextH4>
                  <MinorTextH4>Valor: {currencyFormatter.format(order.totalAmount)}</MinorTextH4>
                </OrderInfo>
                <OrderActions>
                  <StatusSelect
                    value={order.status}
                    onChange={(e) => handleStatusChange(order.id, e.target.value as OrderStatus)}
                    disabled={isUpdating}
                  >
                    {ORDER_STATUS_OPTIONS.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </StatusSelect>
                  <Button variant="outline" size="sm" title="Detalhes" leftIcon={<TbListDetails />} onClick={() => setSelectedOrder(order)} > Detalhes</Button>
                </OrderActions>
              </OrderCard>
            ))
          ) : (
            <p>Nenhum pedido encontrado para o filtro selecionado.</p>
          )}
        </Box>
      </ManagerContainer>

      {selectedOrder && (
        <ModalWrapper isOpen={!!selectedOrder} onClose={() => setSelectedOrder(null)}>
          <OrderDetailsWindow order={selectedOrder} onClose={() => setSelectedOrder(null)} />
        </ModalWrapper>
      )}
    </>
  );
}

interface OrderDetailsWindowProps {
  order: Order;
  onClose: () => void;
}

export function OrderDetailsWindow({ order, onClose }: OrderDetailsWindowProps) {
  const [deleteOrder, { isLoading: isDeleting }] = useDeleteOrderMutation();

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja deletar o pedido #${order.id.substring(0, 8)}?`)) {
      try {
        await deleteOrder(order.id).unwrap();
        toast.success('Pedido deletado com sucesso!');
        onClose();
      } catch (error) {
        toast.error('Falha ao deletar o pedido.');
        console.error(error);
      }
    }
  };

  return (
    <ModalContent>
      <ModalHeader>
        <TitleH2>Detalhes do Pedido #{order.id.substring(0, 8).toUpperCase()}</TitleH2>
        <Tag type={`order_${order.status.toLowerCase() as Lowercase<OrderStatus>}`} variant='default' position='right' />
        <CloseButton onClick={onClose}>
          <IoMdCloseCircleOutline />
        </CloseButton>
      </ModalHeader>

      <ModalBody>
        <DetailSection>
          <TitleH3>Informações do Cliente</TitleH3>
          <DetailGrid>
            <DetailItem>
              <TitleH3>Nome do Cliente:</TitleH3>
              <MinorTextH4>{order.user.name}</MinorTextH4>
            </DetailItem>
            <DetailItem>
              <TitleH3>Email:</TitleH3>
              <MinorTextH4>{order.user.email}</MinorTextH4>
            </DetailItem>
            <DetailItem>
              <TitleH3>Data do Pedido:</TitleH3>
              <MinorTextH4>{new Date(order.createdAt).toLocaleString('pt-BR')}</MinorTextH4>
            </DetailItem>
            <DetailItem>
              <TitleH3>Status Atual:</TitleH3>
              <MinorTextH4>{order.status}</MinorTextH4>
            </DetailItem>
          </DetailGrid>
        </DetailSection>

        <DetailSection>
          <TitleH3>Itens do Pedido ({order.products.length})</TitleH3>
          {order.products.map(item => (
            <ProductItem key={item.id}>
              <Image src={item.product.thumbnail} alt={item.product.name} width={60} height={60} style={{ objectFit: 'cover' }} />
              <div>
                <TitleH3>{item.product.name}</TitleH3>
                <p>
                  {item.quantity} x {currencyFormatter.format(item.price)}
                </p>
              </div>
              <strong>{currencyFormatter.format(item.quantity * item.price)}</strong>
            </ProductItem>
          ))}
        </DetailSection>

        <DetailSection>
          <TitleH3>Entrega e Pagamento</TitleH3>
          <DetailGrid>
            <DetailItem>
              <TitleH3>Endereço de Entrega:</TitleH3>
              <MinorTextH4>
                {order.shippingAddress.street}, {order.shippingAddress.number}
                {order.shippingAddress.complement && `, ${order.shippingAddress.complement}`}
                {order.shippingAddress.city} - {order.shippingAddress.state}
                CEP: {order.shippingAddress.zipCode}
              </MinorTextH4>
            </DetailItem>
            <DetailItem>
              <TitleH3>Método de Pagamento:</TitleH3>
              <MinorTextH4>{order.paymentMethod.replace('_', ' ')}</MinorTextH4>

              <TitleH3>Custo do Frete:</TitleH3>
              <MinorTextH4>{currencyFormatter.format(order.shippingCost)}</MinorTextH4>

              <TitleH3>Total do Pedido:</TitleH3>
              <MinorTextH4><strong>{currencyFormatter.format(order.totalAmount)}</strong></MinorTextH4>
            </DetailItem>
          </DetailGrid>
        </DetailSection>
      </ModalBody>


      <ModalFooter>
        <Button variant="danger" onClick={handleDelete} loading={isDeleting}>
          Deletar Pedido
        </Button>
        <Button variant="pink" onClick={onClose}>
          Fechar
        </Button>
      </ModalFooter>
    </ModalContent >
  );
}
