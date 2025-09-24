import Loading from "@/app/(public)/loading";
import { useCreateAddressMutation, useGetUserAddressByIdQuery, useVerifyUserQuery } from "@/redux/slices/apiSlice";
import { TitleH2 } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import * as yup from 'yup';
import Button from "../Button/Button";
import { MaskedInput } from "../MaskedInput/MaskedInput";
import { AddressFormContainer, AddressFormContent, AddressRow } from "./AddressFormStyles";

export default function AddressForm() {
  const { data: user } = useVerifyUserQuery()
  const [createAddress, { isLoading }] = useCreateAddressMutation()
  const { data: defaultAddress, isLoading: isLoadingAddress } = useGetUserAddressByIdQuery(
    {
      userId: user?.id ?? '',
      id: user?.defaultAddressId ?? ''
    },
    { skip: !user?.id || !user?.defaultAddressId }
  )

  const form = useFormik({
    initialValues: {
      label: defaultAddress?.label ?? '',
      tel: defaultAddress?.tel ?? '',
      zipCode: defaultAddress?.zipCode ?? '',
      street: defaultAddress?.street ?? '',
      complement: defaultAddress?.complement ?? '',
      number: defaultAddress?.number ?? '',
      city: defaultAddress?.city ?? '',
      state: defaultAddress?.state ?? '',
    },
    validationSchema: yup.object({
      label: yup.string().required(),
      tel: yup.string().min(15, 'Minimo de 15 caracteres').max(15, 'Maximo de 15 caracteres').required(),
      zipCode: yup.string().required('Campo obrigatório'),
      street: yup.string().required('Campo obrigatório'),
      number: yup.string().required('Campo obrigatório'),
      city: yup.string().required('Campo obrigatório'),
      state: yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const userId = user?.id ?? ''
        const response = await createAddress({ userId, data: values })
        if (response.data) {
          toast.success('Endereço salvo com sucesso!')
        }
      } catch (err) {
        console.log(err)
        toast.error('Erro ao salvar endereço.')
      }
    },
    enableReinitialize: true,
  })

  if (isLoading || isLoadingAddress) {
    return (
      <AddressFormContainer>
        <Loading />
      </AddressFormContainer>
    )
  }

  return (
    <AddressFormContainer>
      <FormikProvider value={form}>
        <AddressFormContent onSubmit={form.handleSubmit}>
          <TitleH2>Endereço de Entrega</TitleH2>

          <div>
            <div>
              <label htmlFor="label"> Apelido</label>
              <MaskedInput showError={false} name="label" type="text" placeholder="Apelido do endereço" />
            </div>

            <AddressRow>
              <div>
                <label htmlFor="tel">Telefone</label>
                <MaskedInput showError={false} name="tel" type="tel" placeholder="Telefone" mask="(00) 00000-0000" />
              </div>
              <div>
                <label htmlFor="zipCode"> CEP</label>
                <MaskedInput showError={false} name="zipCode" type="text" placeholder="CEP" mask="00000-000" />
              </div>
            </AddressRow>

            <div>
              <label htmlFor="street">Rua</label>
              <MaskedInput showError={false} name="street" type="text" placeholder="Rua" />
            </div>

            <div>
              <label htmlFor="complement">Complemento</label>
              <MaskedInput showError={false} name="complement" type="text" placeholder="Complemento" />
            </div>

            <AddressRow>
              <div>
                <label htmlFor="number">N°</label>
                <MaskedInput showError={false} name="number" type="text" placeholder="N°" />
              </div>
              <div>
                <label htmlFor="city">Cidade</label>
                <MaskedInput showError={false} name="city" type="text" placeholder="Cidade" />
              </div>
              <div>
                <label htmlFor="state"> Estado</label>
                <MaskedInput showError={false} name="state" type="text" placeholder="Estado" />
              </div>
            </AddressRow>
          </div>

          <Button
            size="sm"
            variant="pink"
            type="submit"
            title="Enviar"
            loading={isLoading}
          >
            Salvar Endereço
          </Button>
        </AddressFormContent>
      </FormikProvider>
    </AddressFormContainer>
  )
}
