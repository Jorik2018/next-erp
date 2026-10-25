'use client'

import {
  type ChangeEvent,
  type FormEvent,
  useState
} from 'react'
import { useRouter } from 'next/navigation'
import styled from 'styled-components'

import SearchResultPanel from './SearchResultPanel'
import SearchField from './SearchField'

import {
  showSearchPanel,
  hideSearchPanel
} from '@/lib/slices/searchbar-panel'

import {
  useAppDispatch,
  useAppSelector
} from '@/lib/store/hooks'

import {
  SEARCH_RESULT_PAGE
} from '@/lib/constants/endpoints/ui'

import { Button } from '@/lib/ui/button'

const SearchTabForm = styled.form`
  display: inline;

  @media (max-width: 900px) {
    text-align: center;
    padding: 0 1em;
  }
`

const SearchTab = () => {
  const router = useRouter()
  const dispatch = useAppDispatch()

  const isSearchPanelShowing = useAppSelector(state => state.searchBarPanel)

  const [search, setSearch] =
    useState('')

  const handleFocus = () => {
    if (!isSearchPanelShowing) {
      dispatch(showSearchPanel())
    }
  }

  const handleBlur = () => {
    if (isSearchPanelShowing) {
      dispatch(hideSearchPanel())
    }
  }

  const handleChange = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    setSearch(event.target.value)
  }

  const handleSubmit = (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault()

    const query = search.trim()

    if (!query) {
      return
    }

    dispatch(hideSearchPanel())

    router.push(
      `${SEARCH_RESULT_PAGE}?q=${encodeURIComponent(
        query
      )}`
    )
  }

  return (
    <SearchTabForm
      onSubmit={handleSubmit}
    >
      <div
        style={{
          display: 'inline-block'
        }}
      >
        <SearchField
          value={search}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Search for anything"
          name="navbar_search"
          type="text"
        />
        <SearchResultPanel
          show={isSearchPanelShowing}
        />
      </div>

      <Button
        $light
        type="submit"
      >
        Search
      </Button>
    </SearchTabForm>
  )
}

export default SearchTab