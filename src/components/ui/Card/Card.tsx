import { useAddCartItemMutation, useGetCartQuery } from "@/redux/slices/apiSlice";
import { Dot, Line } from "@/styles/globalStyles";
import { currencyFormatter } from "@/utils/shortIdUtils";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaThumbsUp } from "react-icons/fa";
import { FaCartPlus } from "react-icons/fa6";
import { TbListDetails } from "react-icons/tb";
import { Button } from "../Button/Button";
import Tag from "../Tag/Tag";
import { CardBody, Cardcontainer, CardContent, CardDescription, CardFooter, CardHeader, CardHeaderBar, CardPrice, CardTitle } from "./CardStyles";

type CardProps = {
  item: Product
}

export default function Card({ item }: CardProps) {
  const { data: cart, isLoading: cartLoading } = useGetCartQuery();
  const [addCartItem, { isLoading: adding }] = useAddCartItemMutation();

  const isInCart = cart?.items.some(cartItem => cartItem.product.id === item.id);

  const handleAddToCart = async () => {
    if (!item.active) return;

    try {
      await addCartItem({ productId: item.id, quantity: 1 }).unwrap();
      toast.success(`${item.name} adicionado ao carrinho`);
    } catch {
      toast.error("Erro ao adicionar ao carrinho");
    }
  };

  return (
    <Cardcontainer>
      <CardContent>
        <CardHeaderBar>
          <Dot />
          <Dot />
          <Line />
        </CardHeaderBar>

        <CardHeader $active={item.active}>
          <Image src={item.thumbnail} alt="Imagem do item" width={200} height={200} priority />
          {item.discount > 0 && (
            <Tag type="product_discount" position="right" variant="overlay">
              -{item.discount}%
            </Tag>
          )}
          {item.stock === 0 && (
            <Tag type="product_sold_out" position="bottomRight" variant="overlay" />
          )}
          {item.highlight && (
            <Tag type="product_highlight" position="left" variant="overlay" />
          )}
        </CardHeader>

        <CardBody>
          <CardTitle>{item.name.slice(0, 20)}</CardTitle>
          <CardDescription>{item.description.slice(0, 60)}...</CardDescription>
          {!item.active ? (
            <CardPrice>Indisponível</CardPrice>
          ) : item.discount > 0 ? (
            <CardPrice>
              <span> {currencyFormatter.format(item.originalPrice)}</span>
              <span> {currencyFormatter.format(item.salePrice)}</span>
            </CardPrice>
          ) : (
            <CardPrice> {currencyFormatter.format(item.salePrice)}</CardPrice>
          )}
        </CardBody>
        <CardFooter>
          <Button
            variant="pink"
            size="sm"
            href={`/products/${item.id}`}
            title={`Ver detalhes de ${item.name}`}
            leftIcon={<TbListDetails />}
          >
            Ver Detalhes
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={isInCart || !item.active}
            loading={adding || cartLoading}
            variant="pink"
            size="sm"
            title={item.active ? (isInCart ? 'No carrinho!' : 'Adicionar ao carrinho') : 'Indisponível'}
            rightIcon={item.active ? (isInCart ? <FaThumbsUp /> : <FaCartPlus />) : ''}
          >
            {item.active ? (isInCart ? 'No carrinho!' : 'Adicionar ao carrinho') : 'Indisponível'}
          </Button>
        </CardFooter>
      </CardContent>
    </Cardcontainer >
  )
}
