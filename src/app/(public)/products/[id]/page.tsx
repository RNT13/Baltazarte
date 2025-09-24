'use client'

import Button from "@/components/ui/Button/Button"
import Tag from "@/components/ui/Tag/Tag"
import { useAddCartItemMutation, useGetCartQuery, useGetProductByIdQuery } from "@/redux/slices/apiSlice"
import { TitleH2 } from "@/styles/globalStyles"
import { currencyFormatter } from "@/utils/shortIdUtils"
import Image from "next/image"
import { use, useState } from "react"
import toast from "react-hot-toast"
import { FaArrowLeft, FaCartPlus, FaMinus, FaPlus, FaThumbsUp } from "react-icons/fa"
import { FaTrashCan } from "react-icons/fa6"
import Loading from "../../loading"
import {
  ProductIDAction,
  ProductIDGallery,
  ProductIDGalleryItem,
  ProductIDHeader,
  ProductIDPrice,
  ProductIDRight,
  ProductsIDContainer,
  ProductsIDContent,
  ProductsIDLeft
} from "./productIDStyles"

type ProductIDProps = {
  params: Promise<{ id: string }>
}

export default function ProductID({ params }: ProductIDProps) {
  const { id } = use(params)
  const [mainImage, setMainImage] = useState<string | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const { data: cart } = useGetCartQuery();
  const [addCartItem, { isLoading: adding }] = useAddCartItemMutation();
  const { data: product, isLoading } = useGetProductByIdQuery(id)

  if (!product || isLoading) {
    return <Loading />
  }

  const isInCart = cart?.items.some(cartItem => cartItem.product.id === product.id);
  const currentImage = mainImage || product.thumbnail

  const increaseQty = () => {
    if (quantity < product.stock) {
      setQuantity(prev => prev + 1)
    }
  }

  const decreaseQty = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1)
    }
  }

  const clearQty = () => {
    setQuantity(1)
  }

  const handleAddToCart = async () => {
    if (!product.active) return;

    try {
      await addCartItem({ productId: product.id, quantity: quantity }).unwrap();
      toast.success(`${quantity}x ${product.name} adicionado(s) ao carrinho`);
    } catch {
      toast.error("Erro ao adicionar ao carrinho");
    }
  };

  return (
    <ProductsIDContainer>
      <div className="container">
        <Button variant="pink" onClick={() => window.history.back()} leftIcon={<FaArrowLeft />}>
          Voltar
        </Button>
      </div>
      <ProductsIDContent className="container">
        <ProductsIDLeft>
          {isLoading ? (
            <div className="loading">
              <Loading />
            </div>
          ) : (
            <>
              <Image src={currentImage} alt="Imagem do item" width={2000} height={2000} priority />
              <ProductIDGallery>
                {product.gallery.map((img) => (
                  <ProductIDGalleryItem $isActive={currentImage === img} key={img}>
                    <Image
                      onClick={() => setMainImage(img)}
                      src={img}
                      alt="Imagem do item"
                      width={200}
                      height={200}
                      priority
                    />
                  </ProductIDGalleryItem>
                ))}
              </ProductIDGallery>
            </>
          )}
        </ProductsIDLeft>
        <ProductIDRight>
          <ProductIDHeader>
            {product.discount > 0 && (
              <Tag type="product_discount" variant="default">
                -{product.discount}%
              </Tag>
            )}
            {product.highlight && (
              <Tag type="product_highlight" variant="default">
              </Tag>
            )}
          </ProductIDHeader>
          <TitleH2>{product.name}</TitleH2>
          {!product.active ? (
            <p>Produto indisponivel</p>
          ) : product.discount > 0 ? (
            <ProductIDPrice>
              <p>
                De <span>{currencyFormatter.format(product.salePrice)}</span>
              </p>
              <h2>
                Por apenas <span>
                  {currencyFormatter.format(product.salePrice - ((product.salePrice * product.discount) / 100))}
                </span>
              </h2>
            </ProductIDPrice>
          ) : (
            <p>{currencyFormatter.format(product.salePrice)}</p>
          )}
          <p>Estoque: ({product.stock})</p>
          <p>Vendidos: ({product.sold})</p>
          <p>Descrição: {product.description}</p>
          <p>Categoria: {product.category?.name ?? 'Sem categoria'}</p>

          <ProductIDAction>
            <FaPlus onClick={increaseQty} />
            <span>{quantity}</span>
            <FaMinus onClick={decreaseQty} />
            <FaTrashCan onClick={clearQty} />
          </ProductIDAction>

          <Button
            onClick={handleAddToCart}
            disabled={isInCart || !product.active}
            variant="pink"
            size="sm"
            title={product.active ? (isInCart ? 'No carrinho!' : 'Adicionar ao carrinho') : 'Indisponível'}
            rightIcon={product.active ? (isInCart ? <FaThumbsUp /> : <FaCartPlus />) : ''}
            loading={adding}
          >
            {product.active ? (isInCart ? 'No carrinho!' : `Adicionar ao carrinho ${quantity}x`) : 'Indisponível'}
          </Button>
        </ProductIDRight>
      </ProductsIDContent>
    </ProductsIDContainer>
  )
}
