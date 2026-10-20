'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import type { RootState, AppDispatch } from '@/lib/store'

import SearchResultPanel from './SearchResultPanel'
import SearchField from './SearchField'
import { Button } from '../Button'

import {
  showSearchPanel,
  hideSearchPanel
} from '@/lib/slices/searchbar-panel'

import { SEARCH_RESULT_PAGE } from '@/constants/endpoints/ui'

const SearchTabForm = styled.form`
  display: inline;

  @media (max-width: 900px) {
    text-align: center;
    padding: 0 1em;
  }
`

const SearchTab = () => {
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()

  const isSearchPanelShowing = useSelector(
    (state: RootState) => state.searchPanel
  )

  const [search, setSearch] = useState('')

  const handleFocus = () => {
    if (!isSearchPanelShowing) {
      dispatch(showSearchPanel())
    }
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const query = search.trim()

    if (!query) {
      return
    }

    dispatch(hideSearchPanel())

    router.push(
      `${SEARCH_RESULT_PAGE}?q=${encodeURIComponent(query)}`
    )
  }

  return (
    <SearchTabForm onSubmit={handleSubmit}>
      <div style={{ display: 'inline-block' }}>
        <SearchField
          value={search}
          onChange={(event:any) => setSearch(event.target.value)}
          onFocus={handleFocus}
          placeholder="Search for anything"
          name="navbar_search"
          type="text"
        />

        <SearchResultPanel
          show={isSearchPanelShowing}
        />
      </div>

      <Button $light type="submit">
        Search
      </Button>
    </SearchTabForm>
  )
}

export default SearchTab