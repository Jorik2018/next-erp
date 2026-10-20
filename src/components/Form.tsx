import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes
} from 'react'
import styled from 'styled-components'

/**
 * @name Form
 * @desc Form elements container
 */
export const Form = styled.form`
  display: inline;
  padding: 0;
  margin: 0;
`

interface InputStyleProps {
  $inline?: boolean
}

/**
 * @name Input
 * @desc Form input
 */
export const Input = styled.input<InputStyleProps>`
  display: ${({ $inline }) => ($inline ? 'inline-block' : 'block')};
  width: ${({ $inline }) => ($inline ? 'auto' : '100%')};
  border: none;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS};
  padding: 0.6em;
  margin: 0 auto;
  font-size: 1em;
  font-family: Arial, sans-serif;
  font-weight: 300;
  color: ${({ theme }) => theme.TEXT_COLOR};
  background-color: ${({ theme }) => theme.TEXT_INPUT_BACKGROUND_COLOR};
`

/**
 * @name TextArea
 * @desc Form textarea
 */
export const TextArea = styled.textarea<InputStyleProps>`
  display: ${({ $inline }) => ($inline ? 'inline-block' : 'block')};
  width: ${({ $inline }) => ($inline ? 'auto' : '100%')};
  border: none;
  border-radius: ${({ theme }) => theme.BORDER_RADIUS};
  padding: 0.6em;
  margin: 0 auto;
  font-size: 1em;
  font-family: Arial, sans-serif;
  font-weight: 300;
  color: ${({ theme }) => theme.TEXT_COLOR};
  background-color: ${({ theme }) => theme.TEXT_INPUT_BACKGROUND_COLOR};
`

export const InputLabel = styled.label`
  font-family: 'Kanit', sans-serif;
  font-size: 1em;
  font-weight: 400;
  color: ${({ theme }) => theme.PRIMARY_COLOR};
`

export const InputGroup = styled.div`
  margin: 0.5em auto;
`

interface InputFieldProps
  extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const InputField = ({
  label,
  error,
  id,
  name,
  ...props
}: InputFieldProps) => {
  const inputId = id ?? name

  return (
    <InputGroup>
      {label && (
        <InputLabel htmlFor={inputId}>
          {label}
        </InputLabel>
      )}

      <Input
        id={inputId}
        name={name}
        {...props}
      />

      {error && (
        <span className="error">
          {error}
        </span>
      )}
    </InputGroup>
  )
}

interface TextAreaFieldProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
}

export const TextAreaField = ({
  label,
  error,
  id,
  name,
  ...props
}: TextAreaFieldProps) => {
  const inputId = id ?? name

  return (
    <InputGroup>
      {label && (
        <InputLabel htmlFor={inputId}>
          {label}
        </InputLabel>
      )}

      <TextArea
        id={inputId}
        name={name}
        {...props}
      />

      {error && (
        <span className="error">
          {error}
        </span>
      )}
    </InputGroup>
  )
}