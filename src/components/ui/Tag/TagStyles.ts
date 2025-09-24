import { DefaultTheme, css, styled } from 'styled-components'
import { TagPosition } from './Tag'

type TagContainerProps = {
  $color: keyof DefaultTheme['colors']
  $variant: 'default' | 'overlay'
  $position?: TagPosition
}

const getThemeColor = (theme: DefaultTheme, colorKey: keyof DefaultTheme['colors']): string => {
  const colorValue = theme.colors[colorKey]

  if (typeof colorValue === 'object' && colorValue !== null && 'base' in colorValue) {
    return (colorValue as ColorVariants).base
  }

  if (typeof colorValue === 'string') {
    return colorValue
  }

  return theme.colors.gray
}

const getPositionStyles = (position?: TagPosition) => {
  if (!position) return ''

  return css`
    position: absolute;
    pointer-events: auto;

    ${() => {
      switch (position) {
        case 'right':
          return 'top: 8px; right: 8px;'
        case 'left':
          return 'top: 8px; left: 8px;'
        case 'center':
          return 'top: 50%; left: 50%; transform: translate(-50%, -50%);'
        case 'bottomRight':
          return 'bottom: 8px; right: 8px;'
        case 'bottomLeft':
          return 'bottom: 8px; left: 8px;'
        case 'bottomCenter':
          return 'bottom: 8px; left: 50%; transform: translateX(-50%);'
        default:
          return ''
      }
    }}
  `
}

const baseTagStyles = css<TagContainerProps>`
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.25rem 0.6rem;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.2;
  white-space: nowrap;
  z-index: 10;

  background-color: ${({ theme, $color }) => getThemeColor(theme, $color)};

  color: ${({ theme, $color }) => {
    const darkColorKeys: (keyof DefaultTheme['colors'])[] = [
      'primaryColor',
      'secondaryColor',
      'fifthColor',
      'bgColor',
      'blue',
      'blue2',
      'orange',
      'black',
      'red',
      'redHover',
      'error',
      'green',
      'green2',
      'pinkColor3',
      'baseBlue',
      'baseRed',
      'baseGreen'
    ]
    return darkColorKeys.includes($color) ? theme.colors.textColor3 : theme.colors.black
  }};

  span {
    display: inline-flex;
  }
`

const overlayStyles = css`
  border: 2px solid ${({ theme }) => theme.colors.textColor3};
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
`

export const TagContainer = styled.div<TagContainerProps>`
  ${baseTagStyles}

  ${({ $variant }) => $variant === 'overlay' && overlayStyles}

  ${({ $position }) => getPositionStyles($position)}
`
