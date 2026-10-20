import styled from "styled-components";

import Card from "../Card";

const SearchHeaderPanelHeading = styled.h1`
  color: #777;
  font-size: 1.2em;
  font-weight: 400;
`;

const SearchHeaderPanelWrapper = styled(Card)`
  position: absolute;
  left: 0;
  max-width: 100%;
  padding: 2em;
  text-align: center;
`;

const SearchQuery = styled.h1`
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  font-size: 1.7em;
  font-weight: 400;
  cursor: pointer;
`;

interface SearchHeaderPanelProps {
  searchQuery: string;
}

/**
 * @name SearchHeaderPanel
 * @desc Displays the search query and information about the search results.
 */
const SearchHeaderPanel = ({
  searchQuery,
}: SearchHeaderPanelProps) => (
  <SearchHeaderPanelWrapper>
    <SearchHeaderPanelHeading>
      Search results for
    </SearchHeaderPanelHeading>

    <SearchQuery>
      {searchQuery}
    </SearchQuery>
  </SearchHeaderPanelWrapper>
);

export default SearchHeaderPanel;