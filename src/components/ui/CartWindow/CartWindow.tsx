import { CloseButton, OverlayBlur, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { currencyFormatter } from "@/utils/shortIdUtils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../Button/Button";
import CartItem from "../CartItem/CartItem";
import { CartWindowBody, CartWindowContainer, CartWindowContent, CartWindowFooter, CartWindowHeader } from "./CartWindowStyles";

type CartWindowProps = {
  onClose: () => void
  items: CartItem[]
}

export default function CartWindow({ onClose, items }: CartWindowProps) {
  const router = useRouter();

  const subtotalNumber = items.reduce((total, item) => total + item.product.salePrice * item.quantity, 0)
  const cartTotal = currencyFormatter.format(subtotalNumber)

  const handleClick = () => {
    onClose()
    router.push('/checkout')
  }

  return (
    <CartWindowContainer>
      <OverlayBlur onClick={onClose} />
      <CartWindowContent>
        <CartWindowHeader>
          <TitleH2>Meu Carrinho</TitleH2>
          <CloseButton onClick={onClose}>
            <IoMdCloseCircleOutline />
          </CloseButton>
        </CartWindowHeader>
        {items.length > 0 ? (
          <>
            <CartWindowBody>
              {items.map(item => (
                <CartItem
                  $image="small"
                  key={item.product.id}
                  item={item} />
              ))}
            </CartWindowBody>

            <CartWindowFooter>
              <TitleH3>Subtotal: {cartTotal}</TitleH3>
              <Button onClick={handleClick} variant="pink" size="sm" title="Seguir com o pedido" >
                Seguir com o pedido
              </Button>
            </CartWindowFooter>
          </>
        ) : (
          <>
            <CartWindowBody>
              <p>Seu carrinho esta vazio...</p>
              <Image src="/images/cupCat.png" alt="Carrinho vazio" width={200} height={200} />
              <p>Adicione produtos para finalizar a compra</p>
            </CartWindowBody>
          </>
        )}
      </CartWindowContent>
    </CartWindowContainer>
  )
}
