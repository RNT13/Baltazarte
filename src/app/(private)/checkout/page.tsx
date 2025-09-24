'use client';

import Loading from "@/app/(public)/loading";
import AddressManager from "@/components/ui/AddressManager/AddressManager";
import { Box } from "@/components/ui/Box/Box";
import Button from "@/components/ui/Button/Button";
import CartItem from "@/components/ui/CartItem/CartItem";
import PaymentForm from "@/components/ui/PaymentForm/PaymentForm";
import ShippingCalculator from "@/components/ui/ShippingCalculator/ShippingCalculator";
import { useCreatePaymentIntentMutation, useGetCartQuery, useGetDefaultAddressQuery, useGetUserAddressesQuery, useVerifyUserQuery } from "@/redux/slices/apiSlice";
import { MinorTextH4, TitleH2, TitleH3 } from "@/styles/globalStyles";
import { currencyFormatter } from "@/utils/shortIdUtils";
import Image from "next/image";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaArrowLeft } from "react-icons/fa";
import { AddressCard, CheckoutColumn, CheckoutContainer, CheckoutContent, CheckoutRow, CheckoutSummary, ItemDiv, ItemsList } from "./checkoutStyles";

export default function Checkout() {
  const [step, setStep] = useState<'items' | 'shipping' | 'payment'>('items');
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const [pendingOrder, setPendingOrder] = useState<{ cartSnapshot: Cart; addressId: string; shippingCost: number; totalAmount: number; clientSecret: string; } | null>(null);
  const [isPreparingPayment, setIsPreparingPayment] = useState(false);
  const [shippingCost, setShippingCost] = useState<number | null>(null);
  const [shippingCep, setShippingCep] = useState<string | null>(null);

  const { data: user, isLoading: isUserLoading } = useVerifyUserQuery();
  const userId = user?.id;

  const { data: addresses, isLoading: isAddressesLoading, refetch: refetchAddresses } = useGetUserAddressesQuery(userId!, { skip: !userId });
  const { data: defaultAddress, isLoading: isDefaultAddressLoading, refetch: refetchDefaultAddress } = useGetDefaultAddressQuery(userId!, { skip: !userId });

  const { data: cart, isLoading: isCartLoading } = useGetCartQuery();
  const [createPaymentIntent] = useCreatePaymentIntentMutation();


  const subtotalNumber = cart?.items?.reduce((total, item) => { return total + Number(item.product.salePrice) * item.quantity; }, 0) ?? 0;
  const totalNumber = subtotalNumber + (shippingCost || 0);

  useEffect(() => {
    if (defaultAddress) {
      setSelectedAddress(defaultAddress.id);
    } else if (addresses && addresses.length > 0) {
      setSelectedAddress(addresses[0].id);
    }
  }, [defaultAddress, addresses]);

  useEffect(() => {
    if (step === 'shipping' && selectedAddress && addresses && shippingCep) {
      const addressObject = addresses.find(addr => addr.id === selectedAddress);
      if (addressObject) {
        const addressCep = addressObject.zipCode.replace('-', '');
        if (addressCep !== shippingCep) {
          toast.error("Atenção: O CEP deste endereço é diferente do frete calculado. O valor pode mudar.", {
            duration: 5000,
            icon: '⚠️'
          });
        }
      }
    }
  }, [selectedAddress, addresses, shippingCep, step]);

  const handleShippingCalculated = (cost: number, cep: string) => {
    setShippingCost(cost);
    setShippingCep(cep.replace('-', ''));
  };

  const handleNextStep = async () => {
    // =================================
    // ETAPA 1: ITENS -> ENTREGA
    // =================================
    if (step === 'items') {
      if (shippingCost === null) {
        toast.error("Por favor, calcule o frete para continuar.");
        return;
      }
      setStep('shipping');
      return;
    }

    const addressObject = addresses?.find(addr => addr.id === selectedAddress);
    if (!addressObject) {
      toast.error("Endereço selecionado não encontrado. Tente novamente.");
      return;
    }

    const addressCep = addressObject.zipCode.replace('-', '');

    if (addressCep !== shippingCep) {
      toast.error("O CEP do endereço selecionado é diferente do CEP calculado. Por favor, calcule o frete novamente na etapa anterior.");

      setStep('items');
      setShippingCost(null);
      setShippingCep(null);

      return;
    }

    setIsPreparingPayment(true);
    toast.loading('Iniciando pagamento seguro...', { id: 'preparing' });

    // =================================
    // ETAPA 2: ENTREGA -> PAGAMENTO
    // =================================
    if (step === 'shipping') {
      if (!selectedAddress) {
        toast.error("Por favor, selecione ou cadastre um endereço de entrega.");
        return;
      }

      setIsPreparingPayment(true);
      toast.loading('Atualizando informações...', { id: 'preparing' });

      try {
        await Promise.all([
          refetchDefaultAddress().unwrap(),
          refetchAddresses().unwrap(),
        ]);
      } catch (error) {
        console.error("Falha ao buscar endereços atualizados:", error);
        toast.error("Não foi possível atualizar os dados de endereço.", { id: 'preparing' });
        setIsPreparingPayment(false);
        return;
      }

      toast.loading('Iniciando pagamento seguro...', { id: 'preparing' });
      try {
        const simplifiedCartItems = cart!.items.map(item => ({
          productId: item.product.id,
          quantity: item.quantity,
          salePrice: Number(item.product.salePrice),
        }));
        const paymentIntentResponse = await createPaymentIntent({
          amount: totalNumber,
          items: simplifiedCartItems,
          addressId: selectedAddress,
          shippingCost: shippingCost!,
        }).unwrap();

        const { clientSecret } = paymentIntentResponse;

        if (!clientSecret || typeof clientSecret !== 'string') {
          toast.error("Não foi possível iniciar o pagamento. Tente novamente.", { id: 'preparing' });
          console.error("Erro crítico: O clientSecret não foi retornado pela API ou é inválido.");
          setIsPreparingPayment(false);
          return;
        }

        setPendingOrder({
          cartSnapshot: cart!,
          addressId: selectedAddress,
          shippingCost: shippingCost!,
          totalAmount: totalNumber,
          clientSecret,
        });

        // 5. AVANÇAR PARA A ETAPA DE PAGAMENTO
        setStep('payment');
        toast.success('Pronto para finalizar o pagamento!', { id: 'preparing' });

      } catch (err) {
        console.error("Falha ao iniciar o pagamento:", err);
        toast.error("Erro ao iniciar o pagamento. Verifique o console para detalhes.", { id: 'preparing' });
      } finally {
        setIsPreparingPayment(false);
      }
    }
  };

  const handlePreviousStep = () => {
    if (step === 'shipping') setStep('items');
    else if (step === 'payment') {
      setStep('shipping');
      setPendingOrder(null);
    }
  };

  if (isUserLoading || isCartLoading || (user && (isAddressesLoading || isDefaultAddressLoading))) return <Loading />;
  if (!cart || cart.items.length === 0) return <CheckoutContainer className="container"><p>Seu carrinho está vazio.</p></CheckoutContainer>;

  return (
    <CheckoutContainer className="container">

      {/* STEP 1: Items */}
      {step === 'items' && (
        <CheckoutContent>
          <CheckoutColumn>
            <Box width="lg" height="xm" $padding="md" $bgColor="primary">
              <TitleH2>Itens do pedido</TitleH2>
            </Box>
            <Box width="lg" height="lg" $padding="md" direction="column" $bgColor="primary">
              {isCartLoading ? <p>Carregando itens...</p> : (
                <ItemsList>
                  {cart.items.map(item => (
                    <CartItem
                      $image="medium"
                      discription
                      key={item.product.id}
                      item={item}
                    />
                  ))}
                </ItemsList>
              )}
            </Box>
          </CheckoutColumn>

          <CheckoutSummary>
            <Box width="lg" $padding="md" direction="column" $bgColor="primary">
              <CheckoutRow>
                <TitleH3>Sub total</TitleH3>
                {currencyFormatter.format(subtotalNumber)}
              </CheckoutRow>

              <ShippingCalculator onShippingCalculated={handleShippingCalculated} />

              {shippingCost !== null && (
                <>
                  <CheckoutRow>
                    <TitleH3>Frete</TitleH3>
                    {shippingCost > 0 ? currencyFormatter.format(shippingCost) : 'Grátis'}
                  </CheckoutRow>
                  <CheckoutRow>
                    <TitleH3>Total</TitleH3>
                    {currencyFormatter.format(totalNumber)}
                  </CheckoutRow>
                </>
              )}
            </Box>
            <Box width="lg" height="xm" $padding="md" $bgColor="primary">
              <Button
                onClick={handleNextStep}
                variant="pink"
                size="sm"
                title="Ir para entrega"
                disabled={shippingCost === null}
              >
                Ir para entrega
              </Button>
            </Box>
          </CheckoutSummary>
        </CheckoutContent>
      )}

      {/* STEP 2: Shipping */}
      {step === 'shipping' && (
        <CheckoutContent>
          <CheckoutColumn>
            <div>
              <Button
                onClick={handlePreviousStep}
                variant="pink"
                leftIcon={<FaArrowLeft />}
                size="sm"
                title="voltar para itens"
              >
                voltar para itens
              </Button>
            </div>

            <Box width="lg" height="xm" $padding="md" direction="column" $bgColor="primary">
              <TitleH2>Informações de entrega</TitleH2>
            </Box>

            <Box width="lg" height="lg" $padding="md" direction="column" $bgColor="primary">
              <TitleH3>Endereço cadastrado</TitleH3>
              <AddressManager />
            </Box>
          </CheckoutColumn>

          <CheckoutSummary>
            <Box width="lg" height="lg" $padding="md" direction="column" $bgColor="primary">
              <ItemsList>
                <TitleH2>Resumo do pedido</TitleH2>
                {cart.items.map(item => (
                  <ItemDiv key={item.product.id}>
                    <Image
                      src={item.product.thumbnail}
                      alt={item.product.name}
                      width={100}
                      height={100}
                    />
                    <div>
                      <TitleH3>{item.product.name}</TitleH3>
                      <MinorTextH4>{currencyFormatter.format(item.product.salePrice)}</MinorTextH4>
                      <TitleH3>Qtd: {item.quantity}</TitleH3>
                    </div>
                  </ItemDiv>
                ))}
              </ItemsList>
            </Box>

            <Box width="lg" height="lg" $padding="md" direction="column" $bgColor="primary">
              <CheckoutRow>
                <TitleH3>Sub total</TitleH3>
                {currencyFormatter.format(subtotalNumber)}
              </CheckoutRow>
              <CheckoutRow>
                <TitleH3>Frete</TitleH3>
                {shippingCost !== null ? (shippingCost > 0 ? currencyFormatter.format(shippingCost) : 'Grátis') : 'A calcular'}
              </CheckoutRow>
              <CheckoutRow>
                <TitleH3>Total</TitleH3>
                {currencyFormatter.format(totalNumber)}
              </CheckoutRow>
            </Box>
            <Box width="lg" height="xm" $padding="md" $bgColor="primary">
              <Button onClick={handleNextStep} variant="pink" size="sm" title="Ir para pagamento" loading={isPreparingPayment} >
                Ir para pagamento
              </Button>
            </Box>
          </CheckoutSummary>
        </CheckoutContent>
      )}

      {/* STEP 3: Payment */}
      {step === 'payment' && pendingOrder && (
        <CheckoutContent>
          <CheckoutColumn>
            <div>
              <Button onClick={handlePreviousStep} variant="pink" leftIcon={<FaArrowLeft />} size="sm" title="voltar para entrega" >
                voltar para entrega
              </Button>
            </div>
            <Box width="lg" height="xm" $padding="md" direction="column" $bgColor="primary">
              <TitleH2>Informações de pagamento</TitleH2>
            </Box>
            <Box width="lg" height="lg" $padding="md" direction="column" $bgColor="primary">
              <PaymentForm clientSecret={pendingOrder.clientSecret} />
            </Box>
          </CheckoutColumn>

          <CheckoutSummary>
            <Box width="lg" $padding="md" direction="column" $bgColor="primary">
              <TitleH2>Resumo do pedido</TitleH2>
              {defaultAddress ? (
                <AddressCard $isSelected={true} >
                  <TitleH3><strong>{defaultAddress.label}</strong></TitleH3>
                  <p>{defaultAddress.street}, {defaultAddress.number}</p>
                  {defaultAddress.complement && <p>{defaultAddress.complement}</p>}
                  <p>{defaultAddress.city} - {defaultAddress.state}</p>
                  <p>{defaultAddress.zipCode}</p>
                  <p>{defaultAddress.tel}</p>
                </AddressCard>
              ) : (
                <MinorTextH4>Nenhum endereço padrão selecionado.</MinorTextH4>
              )}
            </Box>

            <Box width="lg" $padding="md" direction="column" $bgColor="primary">
              <ItemsList>
                {cart.items.map(item => (
                  <ItemDiv key={item.product.id}>
                    <Image src={item.product.thumbnail} alt={item.product.name} width={50} height={50} />
                    <div>
                      <TitleH3>{item.product.name}</TitleH3>
                      <MinorTextH4>Qtd: {item.quantity}</MinorTextH4>
                    </div>
                  </ItemDiv>
                ))}
              </ItemsList>
            </Box>

            <Box width="lg" $padding="md" direction="column" $bgColor="primary">
              <CheckoutRow>
                <TitleH3>Sub total</TitleH3>
                {currencyFormatter.format(subtotalNumber)}
              </CheckoutRow>
              <CheckoutRow>
                <TitleH3>Frete</TitleH3>
                {shippingCost !== null ? (shippingCost > 0 ? currencyFormatter.format(shippingCost) : 'Grátis') : 'A calcular'}
              </CheckoutRow>
              <CheckoutRow>
                <TitleH3>Total</TitleH3>
                {currencyFormatter.format(totalNumber)}
              </CheckoutRow>
            </Box>
          </CheckoutSummary>
        </CheckoutContent>
      )}

    </CheckoutContainer>
  )
}
