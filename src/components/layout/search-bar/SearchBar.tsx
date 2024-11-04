// SearchBar.tsx
import React, { useState } from "react";
import "./search-bar.scss";

interface SearchBarProps {
  onSearch: (searchTerm: string) => void;
  placeholder?: string; // Placeholder optionnel
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = "Rechercher...",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [Terms, setTerms] = useState<any[]>([]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchTerm(newValue);
    onSearch(newValue); // Envoyer la valeur de recherche au parent
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default SearchBar;
