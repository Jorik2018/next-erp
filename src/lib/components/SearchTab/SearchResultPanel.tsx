import SearchResultCard from "./SearchResultCard";
import SearchResultItem from "./SearchResultItem";

/**
 *  @name SearchResultPanel
 *  @desc Navbar search result panel to display the search results as a list of items
 *  @param show : the state of navbar search result panel apearence
 */
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
