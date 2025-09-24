import { useAppDispatch } from "@/hooks/useAppDispatch";
import { apiSlice, useDeleteProductMutation, usePartialUpdateProductMutation } from "@/redux/slices/apiSlice";
import { MinorTextH4, TitleH3 } from "@/styles/globalStyles";
import { currencyFormatter, shortId } from "@/utils/shortIdUtils";
import Image from "next/image";
import toast from "react-hot-toast";
import { FaPen, FaTrashAlt } from "react-icons/fa";
import Button from "../Button/Button";
import { ProductCardBody, ProductCardContainer, ProductCardContent, ProductCardImage, ProductCardInfo, StockColor } from "./ProductCardStyles";

type ProductCardProps = {
  products: Product
  onEdit: () => void
}

export default function ProductCard({ products, onEdit }: ProductCardProps) {
  const dispatch = useAppDispatch()
  const stock = products.stock <= 5 ? 'low' : products.stock <= 10 ? 'medium' : 'high';

  const [deleteProduct] = useDeleteProductMutation()
  const [updateProduct, { isLoading }] = usePartialUpdateProductMutation()

  const handleDelete = async () => {
    if (window.confirm(`Tem certeza que deseja deletar o produto #${shortId(products.id)}?`)) {
      try {
        await deleteProduct(products.id).unwrap();
        toast.success('Produto deletado com sucesso!');
      } catch (error) {
        toast.error('Falha ao deletar o produto.');
        console.error(error);
      }
    }
  };


  const handleToggleActive = async () => {
    try {
      await updateProduct({ id: products.id, data: { active: !products.active } }).unwrap();
      dispatch(apiSlice.util.invalidateTags(['Products']))
      toast.success(`Produto ${products.name} ${products.active ? "desativado" : "ativado"} com sucesso!`);

    } catch {
      toast.error("Erro ao atualizar produto");
    }
  };

  return (
    <ProductCardContainer>
      <ProductCardContent>
        <ProductCardBody>
          <ProductCardImage>
            <Image src={products.thumbnail} alt={products.name} width={150} height={150} priority />
          </ProductCardImage>
          <ProductCardInfo>

            <div>
              <TitleH3>{products.name.slice(0, 10)}</TitleH3>
              <MinorTextH4>ID:{shortId(products.id)}</MinorTextH4>
            </div>

            <div>
              <TitleH3>Categoria</TitleH3>
              <MinorTextH4>{products.category.name}</MinorTextH4>
            </div>

            <div>
              <TitleH3>Preço</TitleH3>
              <MinorTextH4>{currencyFormatter.format(products.salePrice)}</MinorTextH4>
            </div>

            <div>
              <TitleH3>Estoque</TitleH3>
              <div>
                <StockColor $stock={stock} />
                <span>{products.stock}</span>
              </div>
            </div>

            <div>
              <TitleH3>Status</TitleH3>
              <Button variant="toggle" size="xs" title={products.active ? 'Ativo' : 'Inativo'} $isActive={products.active} onClick={handleToggleActive} />
            </div>

            <div>
              <TitleH3>Ação</TitleH3>
              <div>
                <Button variant="ghost" size="xs" title="Editar" leftIcon={<FaPen />} onClick={onEdit} />
                <Button variant="ghost" size="xs" title="Excluir" leftIcon={<FaTrashAlt />} loading={isLoading} onClick={handleDelete} />
              </div>
            </div>

          </ProductCardInfo>
        </ProductCardBody>
      </ProductCardContent>
    </ProductCardContainer>
  )
}
