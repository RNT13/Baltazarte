'use client'

import { media } from "@/styles/theme"
import { useEffect, useState } from "react"
import styled, { css, keyframes } from "styled-components"

// Animação do cursor piscando
const blink = keyframes`
  0%, 50% { opacity: 1; }
  50.01%, 100% { opacity: 0; }
`

// Props para estilização
interface StyleProps {
  fontSize?: string
  fontFamily?: string
  fontWeight?: number | string
  color?: string
  letterSpacing?: string
  $cursorColor?: string
}

// Container do texto + cursor
const Wrapper = styled.div<StyleProps>`
  display: inline-block;
  align-items: center;
  white-space: pre-wrap;
  padding: 0.8rem;

  ${({ fontSize }) => fontSize && css`font-size: ${fontSize};`}
  ${({ fontFamily }) => fontFamily && css`font-family: ${fontFamily};`}
  ${({ fontWeight }) => fontWeight && css`font-weight: ${fontWeight};`}
  ${({ color }) => color && css`color: ${color};`}
  ${({ letterSpacing }) => letterSpacing && css`letter-spacing: ${letterSpacing};`}

  ${media.mobile}{
    font-size: 1.5rem;
  }
`

const Cursor = styled.span<StyleProps>`
  display: inline-block;
  width: 2px;
  height: 1em;
  margin-left: 2px;
  vertical-align: text-bottom;
  animation: ${blink} 1s infinite;

  ${({ $cursorColor, color }) => css`
    background: ${$cursorColor || color || "#000"};
  `}
`

interface TypewriterProps extends StyleProps {
  texts: string[] // lista de textos que vão aparecer
  typingSpeed?: number // velocidade de digitar
  erasingSpeed?: number // velocidade de apagar
  delayBetween?: number // tempo antes de apagar/escrever próximo
}

export default function Typewriter({
  texts,
  typingSpeed = 100,
  erasingSpeed = 50,
  delayBetween = 2000,
  fontSize = "1.5rem",
  fontFamily = "inherit",
  fontWeight = "normal",
  color = "#000",
  letterSpacing = "normal",
  $cursorColor
}: TypewriterProps) {
  const [text, setText] = useState("")
  const [index, setIndex] = useState(0)
  const [subIndex, setSubIndex] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (index >= texts.length) return

    if (!deleting && subIndex === texts[index].length) {
      const timeout = setTimeout(() => setDeleting(true), delayBetween)
      return () => clearTimeout(timeout)
    }

    if (deleting && subIndex === 0) {
      setDeleting(false)
      setIndex((prev) => (prev + 1) % texts.length)
      return
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1))
    }, deleting ? erasingSpeed : typingSpeed)

    return () => clearTimeout(timeout)
  }, [subIndex, index, deleting, texts, typingSpeed, erasingSpeed, delayBetween])

  useEffect(() => {
    setText(texts[index].substring(0, subIndex))
  }, [subIndex, index, texts])

  return (
    <Wrapper
      fontSize={fontSize}
      fontFamily={fontFamily}
      fontWeight={fontWeight}
      color={color}
      letterSpacing={letterSpacing}
    >
      {text}
      <Cursor $cursorColor={$cursorColor} color={color} />
    </Wrapper>
  )
}
