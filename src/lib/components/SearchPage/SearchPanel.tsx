'use client'

import { useForm } from 'react-hook-form'

import { Form, Input } from '../Form'
import Card from '../Card'
import { Button } from '@/lib/ui/button'

interface SearchFormValues {
  query: string
}

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
         
          type="submit"
        >
          Search
        </Button>
      </Form>
    </Card>
  )
}

export default SearchPanel