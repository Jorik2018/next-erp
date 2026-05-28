'use client'

import styled from 'styled-components'

type SearchInputProps = {
  $isSearchPanelShowing?: boolean
}

const SearchInput = styled.input<SearchInputProps>`
  display: inline;

  width: 400px;
  height: auto;

  padding: 0.4em 1em;
  margin: 0 0.5em;

  border: none;

  border-radius: 5px;

  font-size: 1em;
  font-weight: 300;

  color: ${p => p.theme?.TEXT_COLOR ?? '#333'};

  background-color: #fff;

  border-bottom-left-radius: ${p =>
    p.$isSearchPanelShowing ? '0' : '5px'};

  border-bottom-right-radius: ${p =>
    p.$isSearchPanelShowing ? '0' : '5px'};

  @media (max-width: 900px) {
    display: block;

    width: 90%;
    height: auto;

    margin: 1em 0;
  }
`

export default SearchInput