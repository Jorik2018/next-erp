'use client'

import { useForm } from 'react-hook-form'

import { Form, Input } from '../Form'
import { Button } from '../Button'
import Card from '../Card'

interface SearchFormValues {
  query: string
}

/**
 * @name SearchPanel
 * @desc Allows the user to search using advanced search tools.
 */
const SearchPanel = () => {
  const { register, handleSubmit } = useForm<SearchFormValues>({
    defaultValues: {
      query: ''
    }
  })

  const onSubmit = ({ query }: SearchFormValues) => {
    console.log('Search:', query)
  }

  return (
    <Card
      $fluidWidth
      $padding="1em"
      $marginBottom="2em"
    >
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input
          type="search"
          placeholder="Search"
          {...register('query')}
        />

        <Button
          $light
          $textCenter
          $fluidWidth
          $marginTop="1em"
          $marginBottom="0"
          $marginLeft="auto"
          $marginRight="auto"
          type="submit"
        >
          Search
        </Button>
      </Form>
    </Card>
  )
}

export default SearchPanel