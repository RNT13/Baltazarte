'use client'

// ⏳ LOADING PÚBLICO - Componente de loading para páginas públicas
// ⚠️ ARQUIVO DELETÁVEL - Pode ser removido ao criar seu próprio loading

import { SiMacpaw } from "react-icons/si";
import styled, { keyframes } from 'styled-components';



const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`

const LoadingContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50vh;
`

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  animation: ${spin} 2s linear infinite;

  svg {
    width: 100px;
    height: 100px;
  }
`

export default function Loading() {
  return (
    <LoadingContainer>
      <Spinner >
        <SiMacpaw />
      </Spinner>
    </LoadingContainer>
  )
}
