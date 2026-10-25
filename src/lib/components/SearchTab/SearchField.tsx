'use client'

import type {
  ChangeEventHandler,
  FocusEventHandler
} from 'react'

import SearchInput from './SearchInput'

interface SearchFieldProps {
  value: string
  name: string
  type?: string
  placeholder?: string
  isSearchPanelShowing?: boolean
  onChange: ChangeEventHandler<HTMLInputElement>
  onFocus?: FocusEventHandler<HTMLInputElement>
  onBlur?: FocusEventHandler<HTMLInputElement>
}

const SearchField = ({
  value,
  name,
  type = 'text',
  placeholder,
  isSearchPanelShowing = false,
  onChange,
  onFocus,
  onBlur
}: SearchFieldProps) => (
  <SearchInput
    value={value}
    name={name}
    type={type}
    placeholder={placeholder}
    $isSearchPanelShowing={isSearchPanelShowing}
    onChange={onChange}
    onFocus={onFocus}
    onBlur={onBlur}
  />
)

export default SearchField