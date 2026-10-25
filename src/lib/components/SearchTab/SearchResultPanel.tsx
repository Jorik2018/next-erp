import SearchResultCard from "./SearchResultCard";
import SearchResultItem from "./SearchResultItem";

const SearchResultPanel = ({ show }:SearchResultPanelProp) => (
  <SearchResultCard show={show}>
    <SearchResultItem name="Tony Stark" />
    <SearchResultItem name="Chris Redfield" />
    <SearchResultItem name="Introduction to Coputer Sci..." />
    <SearchResultItem name="Steve Rogers" />
    <SearchResultItem name="Calculus II" />
    <SearchResultItem name="Nick Fury" />
  </SearchResultCard>
);

interface SearchResultPanelProp  {
  show: boolean
};

export default SearchResultPanel;
