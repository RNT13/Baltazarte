'use client'

import { media, theme } from "@/styles/theme"
import { styled } from "styled-components"

type BoxProps = {
  direction?: 'row' | 'column'
  $justify?: 'center' | 'space-between' | 'space-around' | 'start' | 'end'
  $align?: 'center' | 'space-between' | 'space-around' | 'start' | 'end'
  $bgColor?: 'primary' | 'secondary' | 'trasparent'
  $textColor?: 'primary' | 'secondary'
  width?: 'xm' | 'sm' | 'md' | 'lg' | '100' | '200' | '300' | '400'
  height?: 'xm' | 'sm' | 'md' | 'lg' | '100' | '200' | '300' | '400'
  $padding?: 'sm' | 'md'
  $border?: boolean
}


export const Box = styled.div<BoxProps>`
  width: ${props => {
    switch (props.width) {
      case 'xm':
        return '15%'
      case 'sm':
        return '30%'
      case 'md':
        return '50%'
      case 'lg':
        return '100%'
      case '100':
        return '100px'
      case '200':
        return '200px'
      case '300':
        return '300px'
      case '400':
        return '400px'
      case undefined:
        return '100%'
    }
  }};
  height: ${props => {
    switch (props.height) {
      case 'xm':
        return '15%'
      case 'sm':
        return '30%'
      case 'md':
        return '50%'
      case 'lg':
        return '100%'
      case '100':
        return '100px'
      case '200':
        return '200px'
      case '300':
        return '300px'
      case '400':
        return '400px'
      case undefined:
        return 'fit-content'
    }
  }};
  display: flex;
  gap: 12px;
  padding: ${props => {
    switch (props.$padding) {
      case 'sm':
        return '12px'
      case 'md':
        return '24px'
      case undefined:
        return '0px'
    }
  }};
  border-radius: 12px;
  overflow: auto;
  scrollbar-width: none;
  list-style: none;
  border: 1px solid ${theme.colors.fifthColor};

  flex-direction: ${props => props.direction};
  justify-content: ${props => props.$justify};
  align-items: ${props => props.$align};
  color: ${props => {
    switch (props.$textColor) {
      case 'primary':
        return theme.colors.pinkColor
      case 'secondary':
        return theme.colors.fifthColor
      case undefined:
        return theme.colors.baseBlue.light50
    }
  }};
  background-color: ${props => {
    switch (props.$bgColor) {
      case 'primary':
        return theme.colors.secondaryColor
      case 'secondary':
        return theme.colors.pinkColor
      case 'trasparent':
        return 'transparent'
      case undefined:
        return 'transparent'
    }
  }};


  ${media.pc}{
    gap: 12px;
    padding: 12px;
  }

  ${media.tablet}{
    gap: 8px;
    padding: 8px;
  }

  ${media.mobile}{
    gap: 4px;
    padding: 4px;
  }
`
