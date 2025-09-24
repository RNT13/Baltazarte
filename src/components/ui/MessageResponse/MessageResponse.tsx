import { useAppDispatch } from "@/hooks/useAppDispatch";
import { apiSlice, useAnswerMessageMutation } from "@/redux/slices/apiSlice";
import { CloseButton, MinorTextH4, TitleH2 } from "@/styles/globalStyles";
import { FormikProvider, useFormik } from "formik";
import toast from "react-hot-toast";
import { FaRegPaperPlane } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import * as yup from 'yup';
import Button from "../Button/Button";
import { MaskedInput } from "../MaskedInput/MaskedInput";
import { MessageResponseBody, MessageResponseContainer, MessageResponseContent, MessageResponseFooter, MessageResponseHeader } from "./MessageResponseStyles";

type MessageResponseProps = {
  message: Message;
  onClose: () => void;
}

export default function MessageResponse({ message, onClose }: MessageResponseProps) {
  const dispatch = useAppDispatch();
  const [answerMessage, { isLoading }] = useAnswerMessageMutation();

  const form = useFormik({
    initialValues: {
      response: ''
    },
    validationSchema: yup.object({
      response: yup.string().required('A resposta não pode estar em branco.'),
    }),
    onSubmit: async (values) => {
      try {
        await answerMessage({
          messageId: message.id,
          responseText: values.response
        }).unwrap();
        dispatch(apiSlice.util.invalidateTags(['Messages']))
        toast.success('Resposta enviada com sucesso!');

        onClose();

      } catch {
        toast.error('Falha ao enviar a resposta. Tente novamente.');
      }
    }
  });

  return (
    <MessageResponseContainer>
      <MessageResponseContent>
        <CloseButton title="Fechar" onClick={onClose}><IoCloseCircleOutline /></CloseButton>
        <MessageResponseHeader>
          <TitleH2>Responder mensagem</TitleH2>
          <MinorTextH4>Respondendo para: {message.name.slice(0, 6)} ({message.email})</MinorTextH4>
        </MessageResponseHeader>

        <MessageResponseBody>
          <MinorTextH4>Mensagem original:</MinorTextH4>
          <p>{message.message}</p>
        </MessageResponseBody>

        <FormikProvider value={form}>
          <form onSubmit={form.handleSubmit}>
            <MessageResponseFooter>
              <MaskedInput
                name="response"
                as="textarea"
                id="response"
                placeholder="Digite sua resposta"
              />
              <Button
                type="submit"
                variant="pink"
                size="md"
                title="Enviar"
                loading={isLoading}
                leftIcon={<FaRegPaperPlane />}
              >
                Enviar Resposta
              </Button>
            </MessageResponseFooter>
          </form>
        </FormikProvider>
      </MessageResponseContent>
    </MessageResponseContainer>
  );
}
