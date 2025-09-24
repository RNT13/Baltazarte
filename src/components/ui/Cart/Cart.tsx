import { useGetCartQuery } from "@/redux/slices/apiSlice";
import { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";
import Button from "../Button/Button";
import CartWindow from "../CartWindow/CartWindow";
import { CartWrapper } from "../CartWrapper/CartWrapper";
import { CartContainer, CartContent, CartCount } from "./CartStyles";

export default function Cart() {
  const [isCartOpen, setIsCartOpen] = useState(false)

  const { data: cart, isLoading } = useGetCartQuery()
  const items = cart?.items || []

  if (isLoading) {
    return (
      <CartContainer>
        <CartContent>
          <Button
            variant="ghost"
            size="sm"
            title="Ver Carrinho"
            leftIcon={<FaShoppingCart />}
            onClick={() => setIsCartOpen(!isCartOpen)}
          />
          <CartWrapper isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
            {isCartOpen && <CartWindow items={[]} onClose={() => setIsCartOpen(false)} />}
          </CartWrapper>
        </CartContent>
      </CartContainer>
    )
  }

  return (
    <CartContainer>
      <CartContent>
        <Button
          variant="ghost"
          size="sm"
          title="Ver Carrinho"
          leftIcon={<FaShoppingCart />}
          onClick={() => setIsCartOpen(!isCartOpen)}
        >
          {items.length > 0 && <CartCount>{items.length}</CartCount>}
        </Button>

        <CartWrapper isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
          {isCartOpen && <CartWindow items={items} onClose={() => setIsCartOpen(false)} />}
        </CartWrapper>
      </CartContent>
    </CartContainer>
  )
}
