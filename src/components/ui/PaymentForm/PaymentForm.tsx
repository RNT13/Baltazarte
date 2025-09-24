'use client';

import { useAppDispatch } from "@/hooks/useAppDispatch";
import { apiSlice } from "@/redux/slices/apiSlice";
import { TitleH2 } from "@/styles/globalStyles";
import { Elements, PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { FormEvent, forwardRef, useImperativeHandle, useState } from "react";
import toast from "react-hot-toast";
import Button from "../Button/Button";
import { PaymentFormContainer, PaymentFormContent } from "./PaymentFormStyles";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

interface PaymentFormProps {
  clientSecret: string;
}

export interface PaymentFormHandle {
  submit: () => void;
}

const Form = forwardRef<PaymentFormHandle>((props, ref) => {
  const dispatch = useAppDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);


  const handleSubmit = async (event?: FormEvent) => {
    event?.preventDefault();
    if (!stripe || !elements) {
      console.error("Stripe.js não foi carregado.");
      return;
    }

    setIsLoading(true);
    toast.loading('Processando seu pagamento...', { id: 'processing' });

    const returnUrl = `${window.location.origin}/`;

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: { return_url: returnUrl },
      redirect: 'if_required'
    });

    if (error) {
      dispatch(apiSlice.util.invalidateTags(['Cart']));
      toast.error(error.message || 'Ocorreu um erro no pagamento.', { id: 'processing' });
      setIsLoading(false);
    } else {
      toast.success('Pagamento confirmado!', { id: 'processing' });
      window.location.href = returnUrl + 'paymentConfirmation';
    }
  };

  useImperativeHandle(ref, () => ({
    submit: handleSubmit
  }));

  return (
    <PaymentFormContainer>
      <PaymentFormContent id="payment-form" onSubmit={handleSubmit}>
        <TitleH2>Finalize seu Pagamento</TitleH2>
        <PaymentElement />
        <Button variant="pink" type="submit" loading={!stripe || !elements || isLoading}>
          {isLoading ? 'Processando...' : 'Confirmar Pagamento'}
        </Button>
      </PaymentFormContent>
    </PaymentFormContainer>
  );
});

Form.displayName = 'PaymentForm';

export default function PaymentFormWrapper({ clientSecret }: PaymentFormProps) {
  return (
    <Elements stripe={stripePromise} options={{ clientSecret }}>
      <Form />
    </Elements>
  );
}
