'use client'

import { useRouter } from 'next/navigation'
import styled from 'styled-components'
import { Field, reduxForm, type InjectedFormProps } from 'redux-form'
import { useDispatch, useSelector } from 'react-redux'

import SearchResultPanel from './SearchResultPanel'
import SearchField from './SearchField'
import { Button } from '../Button'

import {
  showSearchPanel,
  hideSearchPanel,
} from '../../reducers/searchbar-panel'
import { SEARCH_RESULT_PAGE } from '../../constants/endpoints/ui'

type FormValues = {
  navbar_search: string
}

type RootState = {
  searchBarPanel: boolean
}

type SearchTabProps = InjectedFormProps<FormValues>

const SearchTabForm = styled.form`
  display: inline;

  @media (max-width: 900px) {
    text-align: center;
    padding: 0 1em;
  }
`

function SearchTab({ handleSubmit }: SearchTabProps) {
  const router = useRouter()
  const dispatch = useDispatch()

  const isSearchPanelShowing = useSelector(
    (state: RootState) => state.searchBarPanel,
  )

  const toggleSearchPanel = () => {
    if (isSearchPanelShowing) {
      dispatch(hideSearchPanel())
    } else {
      dispatch(showSearchPanel())
    }
  }

  const submitHandler = () => {
    dispatch(hideSearchPanel())
    router.push(SEARCH_RESULT_PAGE)
  }

  return (
    <SearchTabForm onSubmit={handleSubmit(submitHandler)}>
      <div style={{ display: 'inline-block' }}>
        <Field
          isSearchPanelShowing={isSearchPanelShowing}
          onFocus={toggleSearchPanel}
          component={SearchField}
          placeholder="ค้นหาทุกอย่างได้จากที่นี่"
          name="navbar_search"
          type="text"
        />

        <SearchResultPanel show={isSearchPanelShowing} />
      </div>

      <Button $light>ค้นหา</Button>
    </SearchTabForm>
  )
}

export default reduxForm<FormValues>({
  form: 'navbar_search',
})(SearchTab)