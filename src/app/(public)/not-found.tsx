'use client'

// 🚫 NOT FOUND PÚBLICO - Página 404 para rotas públicas
// ⚠️ ARQUIVO DELETÁVEL - Pode ser removido ao criar sua própria página 404

import Link from 'next/link'
import styled from 'styled-components'
import { theme } from '@/styles/theme'

const NotFoundContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  padding: 20px;

  h1 {
    font-size: 4rem;
    color: ${theme.colors.blue2};
    margin-bottom: 20px;
  }

  h2 {
    font-size: 2rem;
    color: ${theme.colors.textColor};
    margin-bottom: 20px;
  }

  p {
    color: ${theme.colors.gray2};
    margin-bottom: 30px;
    max-width: 500px;
  }
`

const BackButton = styled(Link)`
  background-color: ${theme.colors.blue2};
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  text-decoration: none;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${theme.colors.blue};
  }
`

export default function NotFound() {
  return (
    <NotFoundContainer>
      <h1>404</h1>
      <h2>Página não encontrada</h2>
      <p>A página que você está procurando não existe ou foi movida.</p>
      <BackButton href="/">Voltar ao início</BackButton>
    </NotFoundContainer>
  )
}
