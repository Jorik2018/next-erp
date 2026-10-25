import type { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const EmptyFieldWrapper = styled.div`
  width: 100%;
  height: 200px;
  background-color: transparent;
  border: 2px dashed ${({ theme }) => theme.PRIMARY_COLOR};
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 200ms ease-in;

  &:hover {
    border: 2px solid ${({ theme }) => theme.PRIMARY_COLOR};
  }

  h3 {
    color: ${({ theme }) => theme.PRIMARY_COLOR};
    font-weight: 400;
    font-size: 1.5em;
  }
`

type EmptyFieldProps = ComponentPropsWithoutRef<'div'>

/**
 * @name EmptyField
 * @desc Click this field to show a modal to select post components
 */
const EmptyField = (props: EmptyFieldProps) => (
  <EmptyFieldWrapper {...props}>
    <h3>Add Component</h3>
  </EmptyFieldWrapper>
)

export default EmptyField