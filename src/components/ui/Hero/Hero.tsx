import Loading from "@/app/(public)/loading";
import { useGetHighlightedProductsQuery } from "@/redux/slices/apiSlice";
import { theme } from "@/styles/theme";
import { FaHeart } from "react-icons/fa6";
import HeroComponent from "../HeroComponent/HeroComponent";
import Typewriter from "../TypeWriter/Typewriter";
import { HeroContainer, HeroContent, HeroImg, SpanDot1, SpanDot2, SpanDot3, SpanDot4, SpanDot5, SpanDot6, SpanMessage1, SpanMessage2, SpanMessage3, SpanMessage4 } from "./HeroStyles";

export default function Hero() {
  const { data: highlightedProducts, isLoading } = useGetHighlightedProductsQuery()

  if (!highlightedProducts || isLoading) {
    return <Loading />
  }

  return (
    <HeroContainer >
      <HeroContent className="container">

        <HeroImg>
          <HeroComponent >
            <Typewriter
              texts={["Olá Cliente!", "Bem-vindo à Baltazarte", "As melhores canecas do mercado!", "Não perca nossos descontos de 15% na sua primeira compra de canecas!"]}
              typingSpeed={100}
              erasingSpeed={30}
              delayBetween={1000}
              fontSize="3rem"
              fontFamily="var(--secondary-font)"
              fontWeight="600"
              color={theme.colors.textColor2}
              letterSpacing="2px"
              $cursorColor={theme.colors.textColor2}
            />
          </HeroComponent>
        </HeroImg>

        <SpanMessage1>
          <p>Somente o melhor produto!</p>
        </SpanMessage1>
        <SpanMessage2>
          <p>Não perca essa oferta!</p>
        </SpanMessage2>
        <SpanMessage3>
          <p>Gatinhos!</p>
          <FaHeart />
        </SpanMessage3>
        <SpanMessage4>
          <p>Canecas!</p>
          <FaHeart />
        </SpanMessage4>

        <SpanDot1 className="bounce" />
        <SpanDot2 className="bounce" />
        <SpanDot3 className="bounce" />
        <SpanDot4 className="bounce" />
        <SpanDot5 className="bounce" />
        <SpanDot6 className="bounce" />

      </HeroContent>
    </HeroContainer >
  )
}
