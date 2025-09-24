import { css, keyframes } from 'styled-components'

// ==================================
// TRANSITIONS (DURAÇÃO E EFEITO)
// ==================================

export const transitions = {
  default: 'transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.35s ease-in-out',
  fast: 'transform 0.2s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.2s ease-in-out',
  slow: 'transform 0.5s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease-in-out',
  visibility: 'visibility 0.35s ease-in-out' // Transição para visibility
}

// ==================================
// ANIMAÇÕES DE ENTRADA/SAÍDA (CSS HELPERS)
// Baseadas em uma prop $isOpen
// ==================================

/**
 * Fade In / Fade Out.
 * Controla a opacidade e a visibilidade.
 */
export const fadeInOut = css<{ $isOpen?: boolean }>`
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  transition:
    opacity ${transitions.fast},
    ${transitions.visibility};
`

/**
 * Usa scaleX para expandir/recolher horizontalmente.
 */
export const slideFromLeft = css<{ $isOpen?: boolean }>`
  transform-origin: left;
  transform: ${({ $isOpen }) => ($isOpen ? 'scaleX(1)' : 'scaleX(0)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: ${transitions.default};
`

/**
 * Desliza de cima para baixo.
 * Usa scaleY para expandir/recolher verticalmente.
 */
export const slideFromTop = css<{ $isOpen?: boolean }>`
  transform-origin: top;
  transform: ${({ $isOpen }) => ($isOpen ? 'scaleY(1)' : 'scaleY(0)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: ${transitions.fast};
`

/**
 * Usa scaleX com origem na direita.
 */
export const slideFromRight = css<{ $isOpen?: boolean }>`
  transform-origin: right;
  transform: ${({ $isOpen }) => ($isOpen ? 'scaleX(1)' : 'scaleX(0)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: ${transitions.default};
`

/**
 * Aumenta e diminui o tamanho do elemento a partir do centro.
 */
export const zoomInOut = css<{ $isOpen?: boolean }>`
  transform-origin: center;
  transform: ${({ $isOpen }) => ($isOpen ? 'scale(1)' : 'scale(0.5)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: ${transitions.fast};
`

/**
 * Usa translateX para mover o elemento para cima e para baixo.
 */
export const slideAndFadeFromBottom = css<{ $isOpen?: boolean }>`
  transform: ${({ $isOpen }) => ($isOpen ? 'translateY(0)' : 'translateY(20px)')};
  opacity: ${({ $isOpen }) => ($isOpen ? '1' : '0')};
  transition: ${transitions.default};
`

// ==================================
// ANIMAÇÕES CONTÍNUAS (KEYFRAMES)
// Para serem usadas com a propriedade 'animation'
// ==================================

/**
 * Efeito de "pulo" suave para cima e para baixo.
 * Ótimo para ícones de "scroll down".
 */
export const bounce = keyframes`
  0%, 100% {
    transform: translateY(0);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateY(25%);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`

/**
 * Efeito de rotação para chamar atenção.
 * Ótimo para ícones de notificação.
 */
export const jumpRotate = keyframes`
  0%   { transform: rotate(0deg); }
  30%  { transform: rotate(15deg); }
  50%  { transform: rotate(15deg); }
  80%  { transform: rotate(-15deg); }
  100% { transform: rotate(0deg); }
`

/**
 * Aumenta e diminui o tamanho para criar um foco sutil.
 */
export const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`

/**
 * Um gradiente que se move para indicar que o conteúdo está carregando.
 */
export const skeletonLoading = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`

/**
 * Perfeito para ícones de loading (spinners).
 */
export const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
