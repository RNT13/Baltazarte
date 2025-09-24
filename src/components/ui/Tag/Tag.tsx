import { FaBolt, FaBoxOpen, FaCheckCircle, FaClock, FaExclamationTriangle, FaShippingFast, FaTimesCircle } from 'react-icons/fa';
import { DefaultTheme } from 'styled-components';
import { TagContainer } from './TagStyles';

export type TagType =
  | 'order_pending' | 'order_paid' | 'order_processing' | 'order_shipped'
  | 'order_delivered' | 'order_canceled' | 'order_failed' | 'order_refunded'
  | 'order_complete' | 'product_discount' | 'product_new' | 'product_highlight'
  | 'product_sold_out' | 'message_read' | 'message_new' | 'message_unread'
  | 'message_replied';

export type TagPosition =
  | 'right' | 'left' | 'center' | 'bottomRight' | 'bottomLeft' | 'bottomCenter';

interface TagConfigItem {
  label: string;
  color: keyof DefaultTheme['colors'];
  icon?: React.ReactNode;
}

type TagProps = {
  type?: TagType;
  status?: OrderStatus;
  children?: React.ReactNode;
  variant?: 'default' | 'overlay';
  position?: TagPosition;
};

const TAG_CONFIG: Record<TagType, TagConfigItem> = {
  order_pending: { label: 'Pendente', color: 'orange', icon: <FaClock /> },
  order_paid: { label: 'Pago', color: 'blue2', icon: <FaCheckCircle /> },
  order_processing: { label: 'Processando', color: 'yellow2', icon: <FaBoxOpen /> },
  order_shipped: { label: 'Enviado', color: 'green', icon: <FaShippingFast /> },
  order_delivered: { label: 'Entregue', color: 'green2', icon: <FaCheckCircle /> },
  order_canceled: { label: 'Cancelado', color: 'red', icon: <FaTimesCircle /> },
  order_failed: { label: 'Falhou', color: 'error', icon: <FaExclamationTriangle /> },
  order_refunded: { label: 'Reembolsado', color: 'gray2', icon: <FaCheckCircle /> },
  order_complete: { label: 'Completo', color: 'green', icon: <FaCheckCircle /> },
  product_discount: { label: 'Oferta', color: 'pinkColor3' },
  product_new: { label: 'Novo', color: 'neonBlue' },
  product_highlight: { label: 'Destaque', color: 'yellow', icon: <FaBolt /> },
  product_sold_out: { label: 'Esgotado', color: 'gray2' },
  message_read: { label: 'Lido', color: 'gray2', icon: <FaCheckCircle /> },
  message_new: { label: 'Nova', color: 'green2', icon: <FaClock /> },
  message_unread: { label: 'Nao lido', color: 'blue2', icon: <FaClock /> },
  message_replied: { label: 'Respondido', color: 'green', icon: <FaCheckCircle /> },
};

const orderStatusToTagType: Record<OrderStatus, TagType> = {
  PAID: 'order_paid',
  PROCESSING: 'order_processing',
  SHIPPED: 'order_shipped',
  DELIVERED: 'order_delivered',
  CANCELED: 'order_canceled',
  FAILED: 'order_failed',
  REFUNDED: 'order_refunded',
};

export default function Tag({ type, status, children, variant = 'default', position }: TagProps) {
  let finalType: TagType | undefined;
  if (status) {
    finalType = orderStatusToTagType[status];
  } else {
    finalType = type;
  }

  if (!finalType) {
    return null;
  }

  const config = TAG_CONFIG[finalType];

  if (!config) {
    return null;
  }

  const content = children || config.label;

  return (
    <TagContainer $color={config.color} $variant={variant} $position={position}>
      {config.icon && <span>{config.icon}</span>}
      {content}
    </TagContainer>
  );
}
