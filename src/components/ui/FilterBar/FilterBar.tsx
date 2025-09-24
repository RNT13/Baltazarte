'use client';

import Button from "../Button/Button";
import { FilterBarButtons, FilterBarContainer, FilterBarContent } from "./FilterBarStyles";

type FilterBarProps = {
  filters: string[];
  activeFilter: string;
  onFilterChange: (filter: string) => void;
};

export default function FilterBar({ filters, activeFilter, onFilterChange }: FilterBarProps) {
  return (
    <FilterBarContainer>
      <FilterBarContent>
        <FilterBarButtons>
          {filters.map(filter => (
            <Button
              key={filter}
              className={activeFilter === filter ? "active" : ""}
              onClick={() => onFilterChange(filter)}
              variant="ghost"
              size="xs"
              title={filter}
            >
              {filter}
            </Button>
          ))}
        </FilterBarButtons>
      </FilterBarContent>
    </FilterBarContainer>
  );
}
