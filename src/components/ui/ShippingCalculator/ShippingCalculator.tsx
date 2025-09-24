'use client';

import { useCalculateShippingMutation, useGetCartQuery } from '@/redux/slices/apiSlice';
import { currencyFormatter } from '@/utils/shortIdUtils';
import { FormikProvider, useFormik } from 'formik';
import toast from 'react-hot-toast';
import { FaShippingFast } from 'react-icons/fa';
import * as yup from 'yup';
import Button from '../Button/Button';
import { MaskedInput } from '../MaskedInput/MaskedInput';
import { CalculatorContainer, ResultContainer, ResultItem } from './ShippingCalculatorStyles';

interface ShippingCalculatorProps {
  onShippingCalculated: (cost: number, cep: string) => void;
}

export default function ShippingCalculator({ onShippingCalculated }: ShippingCalculatorProps) {
  const { data: cart, isLoading: isCartLoading } = useGetCartQuery();

  const [calculateShipping, { data: shippingResult, error, reset }] = useCalculateShippingMutation();

  const calculatePackageDetails = () => {
    if (!cart || cart.items.length === 0) {
      return { weight: 0, width: 0, height: 0, length: 0 };
    }
    const totalWeight = cart.items.reduce((acc, item) => acc + (item.product.weight || 0.3) * item.quantity, 0);
    const maxWidth = Math.max(...cart.items.map(item => item.product.width || 15));
    const maxHeight = Math.max(...cart.items.map(item => item.product.height || 15));
    const maxLength = Math.max(...cart.items.map(item => item.product.length || 15));

    return {
      weight: totalWeight,
      width: maxWidth,
      height: maxHeight,
      length: maxLength,
    };
  };

  const formik = useFormik({
    initialValues: {
      cep: ''
    },
    validationSchema: yup.object({
      cep: yup
        .string()
        .required('O CEP é obrigatório.')
        .matches(/^[0-9]{5}-?[0-9]{3}$/, 'Formato de CEP inválido.'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      reset();
      const packageDetails = calculatePackageDetails();
      if (packageDetails.weight === 0) {
        return;
      }

      try {
        const result = await calculateShipping({
          cepDestino: values.cep,
          peso: packageDetails.weight,
          largura: packageDetails.width,
          altura: packageDetails.height,
          comprimento: packageDetails.length,
        }).unwrap();

        if (result && result.price) {
          onShippingCalculated(result.price, values.cep);
          toast.success('Frete calculado!');
        }

      } catch (err) {
        onShippingCalculated(0, values.cep);
        console.error('Falha ao calcular o frete:', err);
        toast.error('Não foi possível calcular o frete para este CEP.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  if (isCartLoading || !cart || cart.items.length === 0) {
    return null;
  }

  return (
    <FormikProvider value={formik}>
      <CalculatorContainer as="form" onSubmit={formik.handleSubmit}>
        <h4><FaShippingFast /> Calcule o frete</h4>
        <MaskedInput
          name="cep"
          mask="00000-000"
          placeholder="Digite seu CEP"
          showError={true}
        />
        <Button variant="pink" type="submit" loading={formik.isSubmitting}>
          {formik.isSubmitting ? 'Calculando...' : 'Calcular'}
        </Button>

        {shippingResult && (
          <ResultContainer>
            <ResultItem>
              <span>Prazo de entrega:</span>
              <strong>{shippingResult.prazo} dias úteis</strong>
            </ResultItem>
            <ResultItem>
              <span>Valor do frete:</span>
              <strong>{currencyFormatter.format(shippingResult.price)}</strong>
            </ResultItem>
          </ResultContainer>
        )}

        {error && !shippingResult && (
          <p style={{ color: 'red', marginTop: '1rem' }}>
            Erro ao consultar o frete. Tente novamente.
          </p>
        )}
      </CalculatorContainer>
    </FormikProvider>
  );
}
