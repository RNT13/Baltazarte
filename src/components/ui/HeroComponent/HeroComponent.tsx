import { HeroButtons, HeroComponentContainer, HeroComponentContent, HeroComponentImg, Span3, Span4, SpanButton1, SpanButton2 } from "./HeroComponentStyles";

type HeroComponentProps = {
  children: React.ReactNode
}

export default function HeroComponent({ children }: HeroComponentProps) {
  return (
    <HeroComponentContainer>
      <HeroComponentContent>
        <HeroComponentImg>
          {children}
        </HeroComponentImg>
        <HeroButtons>
          <SpanButton1 />
          <SpanButton1 />
          <SpanButton2 />
        </HeroButtons>

      </HeroComponentContent>
      <Span3 />
      <Span4 />
    </HeroComponentContainer>
  )
}
