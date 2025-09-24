'use client'

import Card from "@/components/ui/Card/Card"
import Contact from "@/components/ui/Contact/Contact"
import Hero from "@/components/ui/Hero/Hero"
import Section from "@/components/ui/Section/Section"
import { useGetHighlightedProductsQuery, useGetProductsQuery } from "@/redux/slices/apiSlice"
import Loading from "../loading"
import { ProductsGrid } from "../products/productsStyles"
import { HomeContainer, HomeContent } from "./homeStyles"


export default function Home() {
  const { data: highlighted, isLoading: isHilightedLoading } = useGetHighlightedProductsQuery()
  const { data: products } = useGetProductsQuery()

  if (!highlighted || isHilightedLoading) {
    return <Loading />
  }

  return (
    <HomeContainer >
      <HomeContent>
        <Hero />
        <Section id="sobre" $active title="Sobre a empresa">
          <p>
            A Baltazarte é uma loja especializada na criação de canecas estampadas com alta qualidade e preços acessíveis. Cada peça é produzida com atenção aos detalhes, garantindo durabilidade e um acabamento impecável. Nosso compromisso é oferecer não apenas produtos incríveis, mas também um atendimento diferenciado, sempre focado em proporcionar a melhor experiência para nossos clientes.
          </p>
          <p>
            Além da nossa coleção exclusiva, também trabalhamos com pedidos personalizados sob demanda, criando canecas únicas para presentear, colecionar ou divulgar sua marca. E o melhor: realizamos entregas para todo o Brasil, com segurança e agilidade.
          </p>
          <p>
            Na Baltazarte, você encontra muito mais do que canecas: encontra um pedacinho da sua personalidade estampado em cada detalhe.
          </p>
        </Section>
        <Section id="maisVendidos" title="Mais vendidos">
          <ProductsGrid>
            {products?.filter(item => item.sold > 40).slice(0, 3).map(item => (
              <Card key={item.id} item={item} />
            ))}
          </ProductsGrid>
        </Section>
        <Section id="contato" $active title="Fale conosco">
          <Contact />
        </Section>
      </HomeContent>
    </HomeContainer>
  )
}
