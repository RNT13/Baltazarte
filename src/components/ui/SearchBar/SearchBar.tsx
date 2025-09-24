"use client";

import { clearQuery, setQuery } from "@/redux/slices/searchSlice";
import { RootState } from "@/redux/store";
import { FaSearch, FaTimes } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IconButton, SearchBarContainer, SearchBarContent, SearchInput } from "./SearchBarSlytes";

export default function SearchBar() {
  const dispatch = useDispatch();
  const query = useSelector((state: RootState) => state.search.query);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setQuery(e.target.value));
  };

  const handleClear = () => {
    dispatch(clearQuery());
  };

  return (
    <SearchBarContainer>
      <SearchBarContent>
        <FaSearch />
        <SearchInput
          type="text"
          placeholder="Pesquisar..."
          value={query}
          onChange={handleChange}
        />
        {query && (
          <IconButton onClick={handleClear}>
            <FaTimes />
          </IconButton>
        )}
      </SearchBarContent>
    </SearchBarContainer>
  );
}
