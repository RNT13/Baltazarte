import { Dot, Line, TitleH2 } from "@/styles/globalStyles"
import React from "react"
import { SectionContainer, SectionContent, SectionDiv } from "./SectionStyles"

type SectionProps = {
  children?: React.ReactNode
  title?: string
  $active?: boolean
  className?: string
  $titleColor?: string
  id?: string
}

export default function Section({ children, title, $active, className, $titleColor, id }: SectionProps) {
  return (
    <SectionContainer id={id} >
      <SectionContent $titleColor={$titleColor} className={`${className} container`} >
        <TitleH2 >{title}</TitleH2>
        <SectionDiv $active={$active}>
          <Line />
          <Dot />
          <Dot />
          <Dot />
        </SectionDiv>
        {children}
      </SectionContent>
    </SectionContainer>
  )
}
