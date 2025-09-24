import { useAppDispatch } from "@/hooks/useAppDispatch"
import { apiSlice, useDeleteMessageMutation, useUpdateMessageStatusMutation } from "@/redux/slices/apiSlice"
import { MinorTextH4 } from "@/styles/globalStyles"
import toast from "react-hot-toast"
import { FaRegPaperPlane, FaRegTrashAlt } from "react-icons/fa"
import { IoMailOpenOutline } from "react-icons/io5"
import { MdMailOutline } from "react-icons/md"
import Button from "../Button/Button"
import Tag from "../Tag/Tag"
import { MessageCardBody, MessageCardContainer, MessageCardContent, MessageCardFooter, MessageCardHeader, MessagesActions, TagDiv } from "./MessageCardStyles"

type MessageCardProps = {
  messages: Message
  onResponse: () => void
}

export const MessageCard = ({ messages, onResponse }: MessageCardProps) => {
  const dispatch = useAppDispatch();
  const [updateMessageStatus, { isLoading }] = useUpdateMessageStatusMutation()
  const [deleteMessage, { isLoading: isLoadingDelete }] = useDeleteMessageMutation()

  const handleUpdateMessage = async () => {
    try {
      await updateMessageStatus({ id: messages.id }).unwrap()
      dispatch(apiSlice.util.invalidateTags(['Messages']))
      toast.success('Mensagem marcada como lida!')

    } catch {
      toast.error('Erro ao atualizar mensagem')
    }
  }

  const handleMessageDelete = async () => {
    try {
      await deleteMessage(messages.id).unwrap()
      dispatch(apiSlice.util.invalidateTags(['Messages']))
      toast.success('Mensagem deletada com sucesso!')
    } catch {
      toast.error('Erro ao deletar mensagem')
    }
  }

  return (
    <MessageCardContainer>
      <MessageCardContent $isNew={messages.status === 'NEW'}>
        <TagDiv>
          {messages.status === 'NEW' && <Tag type="message_new" variant="default" />}
          {messages.status === 'READ' && <Tag type="message_read" variant="default" />}
          {messages.status === 'ANSWERED' && <Tag type="message_replied" variant="default" />}
        </TagDiv>
        <MessageCardHeader>
          <div>
            {messages.status == 'NEW' ? <MdMailOutline /> : <IoMailOpenOutline />}
            <p>{new Date(messages.createdAt).toLocaleDateString('pt-BR')}</p>
            <p>{messages.type}</p>
          </div>

          <MessagesActions>
            <Button type="button" variant="ghost" size="xs" title="Ler" leftIcon={<IoMailOpenOutline />} loading={isLoading} onClick={handleUpdateMessage} />
            <Button type="button" variant="ghost" size="xs" title="Responder" leftIcon={<FaRegPaperPlane />} onClick={onResponse} />
            <Button type="button" variant="ghost" size="xs" title="Excluir" leftIcon={<FaRegTrashAlt />} loading={isLoadingDelete} onClick={handleMessageDelete} />
          </MessagesActions>
        </MessageCardHeader>

        <MessageCardBody>
          <div>
            <MinorTextH4>De: {messages.name.slice(0, 6)}</MinorTextH4>
            <MinorTextH4>({messages.email})</MinorTextH4>
          </div>
        </MessageCardBody>

        <MessageCardFooter>
          {messages.response ? (
            <>
              <div>
                <strong>Mensagem:</strong>
                <p>{messages.message}</p>
              </div>
              <div>
                <strong>Resposta:</strong>
                <p>{messages.response}</p>
              </div></>
          ) : (
            <div>
              <strong>Mensagem:</strong>
              <p>{messages.message}</p>
            </div>
          )}
        </MessageCardFooter>
      </MessageCardContent>
    </MessageCardContainer>
  )
}
