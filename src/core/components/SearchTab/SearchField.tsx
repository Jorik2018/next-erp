'use client'

import SearchInput from './SearchInput'

type SearchFieldProps = {
  isSearchPanelShowing: boolean
  placeholder: string
  type: string
  input: Record<string, unknown>
  meta?: Record<string, unknown>
}

export default function SearchField({
  isSearchPanelShowing,
  placeholder,
  input,
  type,
}: SearchFieldProps) {
  return (
    <SearchInput
      $isSearchPanelShowing={isSearchPanelShowing}
      placeholder={placeholder}
      {...input}
      type={type}
    />
  )
}