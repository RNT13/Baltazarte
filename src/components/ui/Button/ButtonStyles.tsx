
import { media, theme } from '@/styles/theme'
import styled, { css } from 'styled-components'

interface StyledButtonProps {
  $variant: 'primary' | 'secondary' | 'toggle' | 'outline' | 'ghost' | 'link' | 'danger' | 'cian' | 'pink'
  $size: 'xs' | 'sm' | 'md' | 'lg'
  $loading: boolean
  $fullWidth: boolean
  $isActive: boolean | string
}

const buttonVariants = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.baseBlue.base};
    color: ${({ theme }) => theme.colors.textColor};
    border: 2px solid ${({ theme }) => theme.colors.baseBlue.base};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseBlue.dark};
      border-color: ${({ theme }) => theme.colors.baseBlue.dark};
      transform: translateY(-1px);
      scale: 1.01;
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseBlue.dark20};
      transform: translateY(0);
    }
  `,

  secondary: css<StyledButtonProps>`
    background-color: ${({ theme }) => theme.colors.baseGreen.base};
    color: ${({ theme }) => theme.colors.baseBlack.base};
    border: 2px solid ${({ theme }) => theme.colors.baseGreen.base};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseGreen.dark};
      border-color: ${({ theme }) => theme.colors.baseGreen.dark};
      transform: translateY(-1px);
      scale: 1.01;
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseGreen.dark20};
      transform: translateY(0);
    }
  `,

  toggle: css<StyledButtonProps>`
  background-color: ${({ theme, $isActive }) =>
      $isActive ? theme.colors.baseBlue.base : theme.colors.baseBlack.light20};
  border: 2px solid
    ${({ theme, $isActive }) =>
      $isActive ? theme.colors.baseBlue.base : theme.colors.baseBlack.base};
  width: 44px;
  height: 24px;
  border-radius: 999px;
  position: relative;
  padding: 0;
  transition: background-color 0.3s ease, border-color 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    top: 50%; /* centraliza */
    left: 2px;
    transform: ${({ $isActive }) =>
      $isActive ? "translate(20px, -50%)" : "translate(0, -50%)"};
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.colors.textColor};
    transition: transform 0.3s ease;
  }

  &:hover:not(:disabled) {
    transform: scale(1.05);
  }

  &:active:not(:disabled) {
    transform: scale(0.98);
  }
`,

  outline: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.baseBlue.base};
    border: 2px solid ${({ theme }) => theme.colors.baseBlue.base};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseBlue.base};
      color: ${({ theme }) => theme.colors.textColor};
      transform: translateY(-1px);
      scale: 1.01;
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseBlue.dark};
      transform: translateY(0);
    }
  `,

  ghost: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.fifthColor};
    border: 2px solid transparent;

    &:hover:not(:disabled) {
      transform: translateY(-2px);
      scale: 1.01;
    }

    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,

  link: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.baseBlue.base};
    border: 2px solid transparent;
    text-decoration: none;
    flex-wrap: wrap;
    flex: 1;
    border-radius: 0;

    &:hover:not(:disabled) {
      text-decoration: underline;
      color: ${({ theme }) => theme.colors.baseBlue.dark};
      transform: translateY(-1px);
      scale: 1.01;
    }
  `,

  danger: css`
    background-color: ${({ theme }) => theme.colors.baseRed.base};
    color: ${({ theme }) => theme.colors.textColor};
    border: 2px solid ${({ theme }) => theme.colors.baseRed.base};
    box-shadow:  4px 4px 4px ${({ theme }) => theme.colors.baseRed.base};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseRed.dark};
      border-color: ${({ theme }) => theme.colors.baseRed.dark};
      transform: translateY(-1px);
      scale: 1.01;
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseRed.dark20};
      transform: translateY(0);
    }
  `,

  cian: css`
    background-color: ${({ theme }) => theme.colors.baseCyan.base};
    color: ${({ theme }) => theme.colors.baseCyan.dark40};
    border: 2px solid ${({ theme }) => theme.colors.baseCyan.base};

    &:hover:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseCyan.dark30};
      border-color: ${({ theme }) => theme.colors.baseCyan.light30};
      color: ${({ theme }) => theme.colors.baseCyan.light30};
      transform: translateY(-1px);
      scale: 1.01;
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.baseCyan.dark20};
      transform: translateY(0);
    }
    `,

  pink: css`
    background: linear-gradient(180deg, ${theme.colors.pinkColor}, ${theme.colors.pinkColor2});
    color: ${theme.colors.fifthColor};
    border: 2px solid ${theme.colors.pinkColor2};
    box-shadow: 3px 3px 0px ${theme.colors.fifthColor};

    &:hover:not(:disabled) {
      background: linear-gradient(360deg, ${theme.colors.pinkColor}, ${theme.colors.pinkColor2});
      border: 2px solid ${theme.colors.pinkColor};
      color: ${({ theme }) => theme.colors.fifthColor};
      transform: translateY(-1px);
      scale: 1.01;
    }

    &:active:not(:disabled) {
      background-color: ${({ theme }) => theme.colors.pinkColor};
      transform: translateY(0);
    }
    `
}

const activeStyles = {
  primary: css`
    background-color: ${({ theme }) => theme.colors.baseBlue.dark20};
    border-color: ${({ theme }) => theme.colors.baseBlue.base};
    color: ${({ theme }) => theme.colors.baseBlue.light30};
  `,

  secondary: css`
    background-color: ${({ theme }) => theme.colors.baseGreen.dark20};
    border-color: ${({ theme }) => theme.colors.baseGreen.base};
    color: ${({ theme }) => theme.colors.baseGreen.light30};
  `,

  toggle: css`
    background-color: ${({ theme }) => theme.colors.baseGreen.dark20};
    border-color: ${({ theme }) => theme.colors.baseGreen.base};
    color: ${({ theme }) => theme.colors.baseGreen.light30};
  `,

  outline: css`
    background-color: ${({ theme }) => theme.colors.baseBlue.dark};
    border-color: ${({ theme }) => theme.colors.baseBlue.base};
    color: ${({ theme }) => theme.colors.textColor};
  `,

  ghost: css`
    background-color: ${({ theme }) => theme.colors.pinkColor};
    border-color: transparent;
    color: ${({ theme }) => theme.colors.fifthColor};
  `,

  link: css`
    background-color: transparent;
    color: ${({ theme }) => theme.colors.baseBlue.base};
    border: 2px solid transparent;
  `,

  danger: css`
    background-color: ${({ theme }) => theme.colors.baseRed.dark20};
    border-color: ${({ theme }) => theme.colors.baseRed.base};
    color: ${({ theme }) => theme.colors.textColor};
  `,

  cian: css`
    background-color: ${({ theme }) => theme.colors.baseCyan.dark20};
    border-color: ${({ theme }) => theme.colors.baseCyan.base};
    color: ${({ theme }) => theme.colors.baseCyan.light30};
  `,

  pink: css`
    background: ${({ theme }) => theme.colors.pinkColor};
    border-color: ${({ theme }) => theme.colors.pinkColor2};
    color: ${({ theme }) => theme.colors.fifthColor};
    box-shadow: 2px 2px 0px ${({ theme }) => theme.colors.fifthColor};
  `,
}


const buttonSizes = {
  xs: css`
    padding: 2px 8px;
    font-size: 14px;
    min-height: 22px;
  `,
  sm: css`
    padding: 4px 12px;
    font-size: 18px;
    min-height: 26px;
  `,

  md: css`
    padding: 6px 18px;
    font-size: 22px;
    min-height: 34px;
  `,

  lg: css`
    padding: 8px 24px;
    font-size: 26px;
    min-height: 42px;
  `
}

export const StyledButton = styled.button<StyledButtonProps>`
  height: fit-content;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-family: inherit;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;
  text-align: center;
  white-space: nowrap;
  border-radius: 16px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  position: relative;
  overflow: hidden;

  ${({ $size }) => buttonSizes[$size]}
  ${({ $variant }) => buttonVariants[$variant]}

  ${({ $variant }) =>
    $variant === 'link' &&
    css`
      white-space: normal;
      text-align: left;
      justify-content: flex-start;
    `}

  ${({ $fullWidth }) =>
    $fullWidth &&
    css`
      width: 100%;
    `}

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  ${({ $isActive, $variant }) =>
    $isActive &&
    css`
    ${activeStyles[$variant]}
  `}


  ${({ $loading }) =>
    $loading &&
    css`
      cursor: not-allowed;

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 50%;
        width: 16px;
        height: 16px;
        margin: -8px 0 0 -8px;
        border: 2px solid transparent;
        border-top: 2px solid currentColor;
        border-radius: 50%;
        animation: spin 1s linear infinite;
      }

      @keyframes spin {
        0% {
          transform: rotate(0deg);
        }
        100% {
          transform: rotate(360deg);
        }
      }
    `}

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.colors.baseBlue.base};
    outline-offset: 2px;
  }

  ${media.mobile} {
    ${({ $size }) => $size === "lg" && buttonSizes.md}
    ${({ $size }) => $size === "md" && buttonSizes.sm}
  }
`

export const ButtonContent = styled.span<{ $loading: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  opacity: ${({ $loading }) => ($loading ? 0 : 1)};
  transition: opacity 0.2s ease-in-out;
`

export const IconWrapper = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    width: 1em;
    height: 1em;
  }

  span {
    background-color: ${({ theme }) => theme.colors.red};
    color: ${({ theme }) => theme.colors.fifthColor};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 2px 6px;
    border-radius: 50%;
  }
`

