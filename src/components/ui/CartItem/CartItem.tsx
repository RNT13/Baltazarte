'use client'

import { useDeleteCartItemMutation, useUpdateCartItemMutation } from "@/redux/slices/apiSlice";
import { CloseButton, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { currencyFormatter } from "@/utils/shortIdUtils";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaMinus, FaPlus } from "react-icons/fa";
import { IoMdCloseCircleOutline } from "react-icons/io";
import Button from "../Button/Button";
import { CartItemActions, CartItemContainer, CartItemContent, CartItemImg, CartItemInfo } from "./CartItemStyles";

type CartItemProps = {
  item: CartItem
  discription?: boolean
  $image?: "small" | "medium" | "large"
}

export default function CartItem({ item, discription, $image }: CartItemProps) {
  const [updateCartItem, { isLoading }] = useUpdateCartItemMutation()
  const [deleteCartItem, { isLoading: isLoadingDelete }] = useDeleteCartItemMutation()

  const handleIncrement = () => {
    try {
      updateCartItem({ id: item.id, data: { quantity: item.quantity + 1 } })
      toast.success(`+1 ${item.product.name} adicionado`)
    } catch {
      toast.error('Erro ao adicionar ao carrinho')
    }
  }

  const handleDecrement = () => {
    if (item.quantity > 1) {
      updateCartItem({ id: item.id, data: { quantity: item.quantity - 1 } })
      toast.success(`-1 ${item.product.name} no carrinho`)
    } else {
      deleteCartItem(item.id)
      toast.success(`${item.product.name} removido do carrinho`)
    }
  }

  const handleRemove = () => {
    deleteCartItem(item.id)
  }

  return (
    <CartItemContainer>
      <CartItemContent>
        <CartItemImg $image={$image}>
          <Image src={item.product.thumbnail} alt={item.product.name} width={100} height={100} />
        </CartItemImg>

        <CartItemInfo>
          <TitleH2>{item.product.name.slice(6, 20)}</TitleH2>
          {discription && <TitleH3>{item.product.description.slice(0, 50)}</TitleH3>}
          <TitleH3>{currencyFormatter.format(item.product.salePrice)}</TitleH3>
        </CartItemInfo>

        <CartItemActions>
          <div>
            <Button variant="ghost" size="xs" leftIcon={<FaPlus />} onClick={handleIncrement} loading={isLoading} />
            <span>{item.quantity}</span>
            <Button variant="ghost" size="xs" leftIcon={<FaMinus />} onClick={handleDecrement} loading={isLoading} />
          </div>
        </CartItemActions>

        <CloseButton >
          <Button variant="ghost" size="xs" leftIcon={<IoMdCloseCircleOutline />} onClick={handleRemove} loading={isLoadingDelete} />
        </CloseButton>
      </CartItemContent>
    </CartItemContainer>
  )
}
