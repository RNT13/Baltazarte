"use client";

import Card from "@/components/ui/Card/Card";
import FilterBar from "@/components/ui/FilterBar/FilterBar";
import SearchBar from "@/components/ui/SearchBar/SearchBar";
import Section from "@/components/ui/Section/Section";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useFilteredProducts } from "@/hooks/useFilteredProducts";
import { useGetProductsQuery } from "@/redux/slices/apiSlice";
import { setFilter } from "@/redux/slices/filterSlice";
import { GradientSpan, GradientTextH2, TitleH3 } from "@/styles/globalStyles";
import { FaHeart } from "react-icons/fa";
import Loading from "../loading";
import { ProductsContainer, ProductsContent, ProductsGrid, ProductsHeader } from "./productsStyles";

export default function Products() {
  const { data: products, isLoading: loadingProducts } = useGetProductsQuery();
  const dispatch = useAppDispatch();

  const { filteredProducts, activeFilter } = useFilteredProducts(products ?? []);

  const handleFilterChange = (filter: string) => {
    dispatch(setFilter(filter));
  };

  if (loadingProducts) return <Loading />;

  if (!products || products.length === 0) return (
    <ProductsContainer>
      <Section>
        <ProductsHeader>
          <p>Nenhum produto encontrado</p>
        </ProductsHeader>
      </Section>
    </ProductsContainer>
  );

  return (
    <ProductsContainer>
      <ProductsContent>
        <Section>
          <ProductsHeader>
            <GradientTextH2>Produtos</GradientTextH2>
            <TitleH3>
              Nossos <GradientSpan>MELHORES</GradientSpan> produtos
            </TitleH3>
            <TitleH3>
              feitos com carinho <span>para você! <FaHeart /></span>
            </TitleH3>
            <div>
              <FilterBar
                activeFilter={activeFilter}
                onFilterChange={handleFilterChange}
                filters={["Todos", "Destaque", "Promoção", "Populares", ...new Set(products.map((item) => item.category?.name))]}
              />
              <SearchBar />
            </div>
          </ProductsHeader>
        </Section>

        <Section title={`${filteredProducts.length} Produtos - em ${activeFilter}`}>
          {filteredProducts.length > 0 ? (
            <ProductsGrid>
              {filteredProducts.map((item) => (
                <Card key={item.id} item={item} />
              ))}
            </ProductsGrid>
          ) : (
            <p>Nenhum produto encontrado para este filtro.</p>
          )}
        </Section>
      </ProductsContent>
    </ProductsContainer>
  );
}
