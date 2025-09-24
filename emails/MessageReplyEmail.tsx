import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
} from '@react-email/components';

interface MessageReplyEmailProps {
  userName: string;
  originalMessage: string;
  responseText: string;
}

export const MessageReplyEmail = ({
  userName,
  originalMessage,
  responseText,
}: MessageReplyEmailProps) => (
  <Html>
    <Head />
    <Preview>Sua mensagem foi respondida!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={heading}>Olá, {userName}!</Heading>
        <Text style={paragraph}>
          Recebemos sua mensagem e nossa equipe já a respondeu.
        </Text>
        <Text style={paragraph}>
          <strong>Sua mensagem original:</strong>

          <em>&ldquo;{originalMessage}&rdquo;</em>
        </Text>
        <Text style={paragraph}>
          <strong>Nossa resposta:</strong>


          {responseText}
        </Text>
        <Text style={paragraph}>
          Atenciosamente,


          A Equipe Baltazarte
        </Text>
      </Container>
    </Body>
  </Html>
);

export default MessageReplyEmail;

// Estilos básicos para o e-mail
const main = {
  backgroundColor: '#f6f9fc',
  fontFamily: 'Arial, sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const heading = {
  fontSize: '28px',
  fontWeight: 'bold',
  marginTop: '48px',
};

const paragraph = {
  fontSize: '16px',
  lineHeight: '24px',
  textAlign: 'left' as const,
};
