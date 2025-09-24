import {
  Body,
  Column,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Row,
  Section,
  Text,
} from '@react-email/components';

// Interface para os dados do e-mail
interface OrderConfirmationEmailProps {
  userName: string;
  orderId: string;
  orderDate: string;
  totalAmount: string; // Já formatado como moeda
  shippingAddress: {
    street: string;
    number: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export const OrderConfirmationEmail = ({
  userName,
  orderId,
  orderDate,
  totalAmount,
  shippingAddress,
}: OrderConfirmationEmailProps) => (
  <Html>
    <Head />
    <Preview>Confirmação do seu pedido #{orderId}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Obrigado pela sua compra, {userName}!</Heading>
        <Text style={paragraph}>
          Seu pedido foi confirmado e já estamos preparando tudo para o envio.
        </Text>

        <Section style={detailsSection}>
          <Row>
            <Column>
              <strong>Pedido Nº:</strong> {orderId}
            </Column>
            <Column style={{ textAlign: 'right' }}>
              <strong>Data:</strong> {orderDate}
            </Column>
          </Row>
        </Section>

        <Text style={paragraph}>
          <strong>Resumo:</strong>
        </Text>
        <Text style={totalText}>
          Valor Total: {totalAmount}
        </Text>

        <Text style={paragraph}>
          <strong>Endereço de Entrega:</strong>


          {shippingAddress.street}, {shippingAddress.number}


          {shippingAddress.city}, {shippingAddress.state}


          CEP: {shippingAddress.zipCode}
        </Text>

        <Text style={paragraph}>
          Você receberá um novo e-mail assim que seu pedido for enviado.


          Atenciosamente,


          A Equipe Baltazarte
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OrderConfirmationEmail;

// Estilos (pode reutilizar e adaptar os do outro e-mail)
const main = { backgroundColor: '#f6f9fc', fontFamily: 'Arial, sans-serif' };
const container = { backgroundColor: '#ffffff', margin: '0 auto', padding: '20px 0 48px' };
const heading = { fontSize: '28px', fontWeight: 'bold', marginTop: '48px' };
const paragraph = { fontSize: '16px', lineHeight: '24px' };
const detailsSection = { padding: '10px 0', borderTop: '1px solid #eaeaea', borderBottom: '1px solid #eaeaea', margin: '20px 0' };
const totalText = { fontSize: '20px', fontWeight: 'bold', margin: '20px 0' };
