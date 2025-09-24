// src/components/ui/UserOrders/UserOrders.tsx
import { Box } from "@/components/ui/Box/Box";
import { TitleH3 } from "@/styles/globalStyles";
import { currencyFormatter, shortId } from "@/utils/shortIdUtils";
import Tag from "../Tag/Tag";
import { DetailRow, OrderCard, OrderDetails, OrderHeader, OrdersContainer } from "./UserOrdersStyles";

interface UserOrdersProps {
  orders: Order[];
}

export default function UserOrders({ orders }: UserOrdersProps) {
  if (orders.length === 0) {
    return (
      <Box width="lg" height="lg" $padding="md" $bgColor="primary">
        <TitleH3>Você ainda não fez nenhum pedido.</TitleH3>
      </Box>
    );
  }

  return (
    <OrdersContainer>
      {orders.map((order) => (
        <OrderCard key={order.id}>
          <OrderHeader>
            <TitleH3>Pedido #{shortId(order.id)}</TitleH3>
            <Tag status={order.status} />
          </OrderHeader>
          <OrderDetails>
            <DetailRow>
              <span>Data:</span>
              <strong>{new Date(order.createdAt).toLocaleDateString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</strong>
            </DetailRow>
            <DetailRow>
              <span>Valor Total:</span>
              <strong>{currencyFormatter.format(order.totalAmount)}</strong>
            </DetailRow>
            <DetailRow>
              <span>Status:</span>
              <strong>{order.status}</strong>
            </DetailRow>
            {order.status === 'SHIPPED' && order.trackingCode && (
              <DetailRow>
                <span>Cód. Rastreio:</span>
                <strong>{order.trackingCode}</strong>
              </DetailRow>
            )}
          </OrderDetails>
        </OrderCard>
      ))}
    </OrdersContainer>
  );
}
