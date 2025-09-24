'use client'

import Link from 'next/link'
import React, { forwardRef } from 'react'
import { ButtonContent, IconWrapper, StyledButton } from './ButtonStyles'

type ButtonVariants = 'primary' | 'secondary' | 'toggle' | 'outline' | 'ghost' | 'link' | 'danger' | 'cian' | 'pink'
type ButtonSizes = 'xs' | 'sm' | 'md' | 'lg'

export interface CommonButtonProps {
  variant?: ButtonVariants
  size?: ButtonSizes
  loading?: boolean
  fullWidth?: boolean
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  children?: React.ReactNode
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  href?: string
  target?: React.HTMLAttributeAnchorTarget
  rel?: string
  $isActive?: boolean
}

export type ButtonProps = CommonButtonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'> &
  React.AnchorHTMLAttributes<HTMLAnchorElement>

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      children,
      href,
      target,
      rel,
      type = 'button',
      ...props
    },
    ref
  ) => {
    const isDisabled = disabled || loading

    const innerContent = (
      <ButtonContent $loading={loading}>
        {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
        {children}
        {rightIcon && <IconWrapper>{rightIcon}</IconWrapper>}
      </ButtonContent>
    )

    if (href) {
      return (
        <Link href={href} target={target} rel={rel}>
          <StyledButton
            ref={ref as React.Ref<HTMLButtonElement>}
            $variant={variant}
            data-variantt={variant}
            $size={size}
            $loading={loading}
            $fullWidth={fullWidth}
            $isActive={!!props.$isActive}
            aria-disabled={isDisabled}
            {...props}
          >
            {innerContent}
          </StyledButton>
        </Link>
      )
    }

    // Caso botão normal
    return (
      <StyledButton
        ref={ref as React.Ref<HTMLButtonElement>}
        $variant={variant}
        data-variant={variant}
        $size={size}
        $loading={loading}
        $fullWidth={fullWidth}
        $isActive={!!props.$isActive}
        disabled={isDisabled}
        aria-disabled={isDisabled}
        type={type}
        {...props}
      >
        {innerContent}
      </StyledButton>
    )
  }
)

Button.displayName = 'Button'
export default Button
