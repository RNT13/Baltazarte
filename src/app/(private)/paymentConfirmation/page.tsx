'use client'

import { Box } from "@/components/ui/Box/Box";
import { TitleH2, TitleH3 } from "@/styles/globalStyles";
import Image from "next/image";
import { PaymentConfirmationContainer, PaymentConfirmationContent } from "./paymentConfirmationStyles";

export default function PaymentConfirmation() {
  return (
    <PaymentConfirmationContainer>
      <PaymentConfirmationContent className="container">
        <Box width="lg" height="lg" direction="column" $padding="sm" $justify="center" $align="center" $bgColor="primary">
          <TitleH2>Seu pedido foi realizado com sucesso!</TitleH2>
          <Image src="/images/gatoFeliz.png" alt="checked" width={350} height={350} />
          <TitleH3>Assim que o pagamento for confirmado você receberá um e-mail com as informações de entrega</TitleH3>
        </Box>
      </PaymentConfirmationContent>
    </PaymentConfirmationContainer>
  )
}
