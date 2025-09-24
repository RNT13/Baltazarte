
import { usePostUserMessageMutation } from "@/redux/slices/apiSlice";
import { MinorTextH4, TitleH3 } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import { CiCalendar, CiChat1, CiMail } from "react-icons/ci";
import { FaRegPaperPlane, FaShippingFast } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";
import { FcIdea } from "react-icons/fc";
import { IoIosColorPalette } from "react-icons/io";
import { IoPawSharp } from "react-icons/io5";
import { PiWhatsappLogoBold } from "react-icons/pi";
import * as yup from 'yup';
import Button from "../Button/Button";
import { MaskedInput } from "../MaskedInput/MaskedInput";
import { ContactContainer, ContactContent, ContactForm, ContactForm1, ContactForm2, ContactQuestions, ContactTop, FormContent, FormHeader, FormSection, Questions } from "./ContactStyles";

export default function Contact() {
  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      tel: '',
      type: '',
      message: '',
    },
    validationSchema: yup.object({
      name: yup.string().min(5, 'Minimo de 5 caracteres').required('Campo obrigatório'),
      email: yup.string().email('E-mail inválido').required('Campo obrigatório'),
      tel: yup.string().min(15, 'Minimo de 15 caracteres').max(15, 'Maximo de 11 caracteres').required(),
      type: yup.string().required('Campo obrigatório'),
      message: yup.string().required('Campo obrigatório'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await userMessage(values)
        if (response.data) {
          form.resetForm()
          toast.success('Mensagem enviada com sucesso!')
        }
      } catch (ApiErrorResponse) {
        console.log(ApiErrorResponse)
        toast.error('Erro ao enviar mensagem.')
      }
    }

  })

  const [userMessage, { isLoading }] = usePostUserMessageMutation()

  return (
    <ContactContainer>

      <ContactContent>
        <ContactTop>
          <TitleH3>
            Tem alguma dúvida sobre nossos produtos ou quer fazer um pedido personalizado?
          </TitleH3>
          <TitleH3>
            Adoramos conversar sobre gatinhos e canecas! <IoPawSharp />
          </TitleH3>
        </ContactTop>

        <ContactForm >

          <ContactForm1>
            <FormContent>
              <FormHeader>
                <TitleH3><CiChat1 /> Outras formas de contato</TitleH3>
              </FormHeader>
              <FormSection>
                <TitleH3><CiMail /> E-mail</TitleH3>
                <MinorTextH4>contato@baltazarte.com</MinorTextH4>
              </FormSection>
              <FormSection>
                <TitleH3><PiWhatsappLogoBold /> WhatsApp</TitleH3>
                <MinorTextH4>(11) 99999-9999</MinorTextH4>
              </FormSection>
              <FormSection>
                <TitleH3><CiCalendar /> Horário de Atendimento</TitleH3>
                <MinorTextH4>Segunda à Sexta: 9h às 18h</MinorTextH4>
                <MinorTextH4>Sabado: 9h aos 14h</MinorTextH4>
              </FormSection>
              <FormSection className="gradientBG">
                <TitleH3><FcIdea /> Dica Especial</TitleH3>
                <MinorTextH4>Quer uma caneca personalizada com seu gatinho?</MinorTextH4>
                <MinorTextH4>Nos envie uma foto junto com sua mensagem!</MinorTextH4>
              </FormSection>
            </FormContent>
          </ContactForm1>

          <FormikProvider value={form}>
            <ContactForm2 onSubmit={form.handleSubmit}>

              <FormContent>
                <FormHeader>
                  <TitleH3><FaRegPaperPlane />Envie sua mensagem</TitleH3>
                </FormHeader>
                <FormSection>
                  <label htmlFor="name">Nome</label>
                  <MaskedInput
                    name="name"
                    id="name"
                    placeholder="Digite seu nome"
                    showError={false}
                  />
                </FormSection>
                <FormSection>
                  <label htmlFor="email">E-mail</label>
                  <MaskedInput
                    name="email"
                    id="email"
                    placeholder="Digite seu e-mail"
                    showError={false}
                  />
                </FormSection>
                <FormSection>
                  <label htmlFor="tel">Telefone</label>
                  <MaskedInput
                    name="tel"
                    id="tel"
                    placeholder="Digite seu telefone"
                    mask="(00) 00000-0000"
                    showError={false}
                  />
                </FormSection>
                <FormSection>
                  <label htmlFor="type">Tipo de contato</label>
                  <MaskedInput
                    as="select"
                    name="type"
                    id="type"
                    showError={false}
                  >
                    <option value="">Selecione</option>
                    <option value="orcamento">Orçamento</option>
                    <option value="duvida">Dúvida</option>
                    <option value="sugestao">Sugestão</option>
                    <option value="elogio">Elogio</option>
                    <option value="reclamacao">Reclamação</option>
                  </MaskedInput>
                </FormSection>
                <FormSection>
                  <label htmlFor="message">Mensagem</label>
                  <MaskedInput
                    as="textarea"
                    name="message"
                    id="message"
                    placeholder="Digite sua mensagem"
                    showError={false}
                  />
                </FormSection>
                <Button type="submit" variant="pink" disabled={isLoading} size="sm">
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </Button>
              </FormContent>
            </ContactForm2>
          </FormikProvider>
        </ContactForm>

        <ContactQuestions className="gradientBG">
          <div>
            <TitleH3>Perguntas Frequentes</TitleH3>
            <Questions>
              <div>
                <TitleH3><FaClock />Prazo de entrega</TitleH3>
                <MinorTextH4>5 - 7 dias úteis para pedidos padrão</MinorTextH4>
              </div>
              <div>
                <TitleH3><IoIosColorPalette /> Personalização</TitleH3>
                <MinorTextH4>Aceitamos pedidos personalizados.</MinorTextH4>
                <MinorTextH4>Porem o tempo de entrega pode variar conforme o tempo de confecção.</MinorTextH4>
              </div>
              <div>
                <TitleH3><FaShippingFast /> Frete Gratis</TitleH3>
                <MinorTextH4>Para todo o Brasil, Nas compras acima de R$ 150,00 reais</MinorTextH4>
              </div>
            </Questions>
          </div>
        </ContactQuestions>

      </ContactContent>
    </ContactContainer >
  )
}
