import { useAppDispatch } from "@/hooks/useAppDispatch";
import { apiSlice, useCreateProductMutation, useGetCategoriesQuery, useUpdateProductMutation } from "@/redux/slices/apiSlice";
import { CloseButton, TitleH2 } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoMdCloseCircleOutline } from "react-icons/io";
import * as yup from 'yup';
import { Box } from "../Box/Box";
import Button from "../Button/Button";
import { MaskedInput } from "../MaskedInput/MaskedInput";
import { EditItemBody, EditItemContainer, EditItemContent, EditItemFooter, EditItemForm, EditItemHeader } from "./EditItemStyles";

type EditItemProps = {
  product: Product | null
  onClose: () => void
}

export default function EditItem({ product, onClose }: EditItemProps) {
  const form = useFormik({
    initialValues: {
      name: product?.name || '',
      categoryId: product?.categoryId || '',
      description: product?.description || '',
      originalPrice: product?.originalPrice || 0,
      thumbnail: product?.thumbnail || '',
      gallery: product?.gallery || [],
      discount: product?.discount || 0,
      stock: product?.stock || 0,
      highlight: product?.highlight || false,
      sold: product?.sold || 0,
      active: product?.active || false,
    },
    enableReinitialize: true,
    validationSchema: yup.object({
      name: yup.string().min(5, 'Minimo de 5 caracteres').required('Campo obrigatório'),
      categoryId: yup.string().required('Campo obrigatório'),
      description: yup.string().required('Campo obrigatório'),
      originalPrice: yup
        .number()
        .typeError('O preço deve ser um número')
        .positive('O preço deve ser um valor positivo')
        .required('Campo obrigatório'),
      thumbnail: yup.string().required('Campo obrigatório'),
      gallery: yup.array().required('Campo obrigatório'),
      discount: yup.number().required('Campo obrigatório'),
      stock: yup.number().required('Campo obrigatório'),
      highlight: yup.boolean().required('Campo obrigatório'),
      sold: yup.number().required('Campo obrigatório'),
      active: yup.boolean().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const payload = {
          ...values,
          originalPrice: Number(values.originalPrice),
          discount: Number(values.discount),
          stock: Number(values.stock),
          sold: Number(values.sold),
        };

        if (product) {
          await updateProduct({ id: product.id, data: payload }).unwrap();
          toast.success("Produto atualizado com sucesso!");
        } else {
          await createProduct(payload).unwrap();
          toast.success("Produto criado com sucesso!");
        }

        dispatch(apiSlice.util.invalidateTags(['Products']));
        onClose();

      } catch (error) {
        console.error("Falha ao salvar o produto:", error);
        toast.error(product ? "Erro ao atualizar produto" : "Erro ao criar produto");
      }
    },
  })

  const dispatch = useAppDispatch()
  const [updateProduct] = useUpdateProductMutation()
  const [createProduct] = useCreateProductMutation()

  const { data: categories = [] } = useGetCategoriesQuery()

  const [activeSection, setActiveSection] = useState<'Básico' | 'Detalhes' | 'Imagens'>('Básico');

  const renderSection = () => {
    switch (activeSection) {
      case 'Básico':
        return (
          <div key="basico">
            <div>
              <label htmlFor="name">Nome</label>
              <MaskedInput name="name" type="text" id="name" showError={false} placeholder="Nome do produto" />
            </div>

            <div >
              <label htmlFor="categoryId">Categoria</label>
              <MaskedInput
                id="categoryId"
                name="categoryId"
                as="select"
                showError={false}
              >
                <option value="">Selecione uma categoria</option>
                {categories.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </MaskedInput>
            </div>

            <div>
              <label htmlFor="description">Descrição</label>
              <MaskedInput name="description" as="textarea" id="description" showError={false} placeholder="Descrição do produto" />
            </div>
          </div>
        )
      case 'Detalhes':
        return (
          <div key="detalhes">
            <div>
              <label htmlFor="originalPrice">Preço</label>
              <MaskedInput name="originalPrice" type="number" id="originalPrice" showError={false} placeholder="0000.00" />
            </div>
            <div>
              <label htmlFor="discount">Desconto</label>
              <MaskedInput name="discount" type="number" id="discount" showError={false} placeholder="Desconto do produto" />
            </div>
            <div>
              <label htmlFor="stock">Estoque</label>
              <MaskedInput name="stock" type="number" id="stock" showError={false} placeholder="Estoque do produto" />
            </div>
          </div>
        )
      case 'Imagens':
        return (
          <div key="imagens">
            <div>
              <label htmlFor="thumbnail">Thumbnail</label>
              <MaskedInput
                name="thumbnail"
                fileUpload
                uploadPreset="ImageUp"
                cloudName="dvonqxpbc"
                showError={false}
              />
            </div>
            <div>
              <label htmlFor="gallery">Galeria</label>
              <MaskedInput
                name="gallery"
                fileUpload
                multiple
                uploadPreset="ImageUp"
                cloudName="dvonqxpbc"
                showError={false}
              />
            </div>
          </div>
        )
      default:
        return null;
    }
  }

  return (
    <EditItemContainer>
      <EditItemContent>
        <EditItemHeader>
          <CloseButton onClick={onClose}><IoMdCloseCircleOutline /></CloseButton>
          <TitleH2>{product ? 'Editar produto' : 'Criar produto'}</TitleH2>
          <Box height="xm" width="lg" direction="row" $justify="space-between" $align="center">
            <Button variant="ghost" size="xs" $isActive={activeSection === 'Básico'} onClick={() => setActiveSection('Básico')}>Básico</Button>
            <Button variant="ghost" size="xs" $isActive={activeSection === 'Detalhes'} onClick={() => setActiveSection('Detalhes')}>Detalhes</Button>
            <Button variant="ghost" size="xs" $isActive={activeSection === 'Imagens'} onClick={() => setActiveSection('Imagens')}>Imagens</Button>
          </Box>
        </EditItemHeader>
        <FormikProvider value={form}>
          <EditItemForm onSubmit={form.handleSubmit}>
            <EditItemBody>
              {renderSection()}
            </EditItemBody>
            <EditItemFooter>
              <Button variant="pink" size="sm" title="Salvar" type="submit" loading={form.isSubmitting} >Salvar</Button>
            </EditItemFooter>
          </EditItemForm>
        </FormikProvider>
      </EditItemContent>
    </EditItemContainer>
  )
}
