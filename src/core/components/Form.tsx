'use client'

import {
  forwardRef,
  type InputHTMLAttributes,
  type TextareaHTMLAttributes,
} from 'react'
import styled from 'styled-components'

export const Form = styled.form`
  display: inline;
  padding: 0;
  margin: 0;
`

type InlineProps = {
  $inline?: boolean
}

export const Input = styled.input<InlineProps>`
  display: ${p => (p.$inline ? 'inline-block' : 'block')};
  width: ${p => (p.$inline ? 'auto' : '100%')};
  border: none;
  border-radius: ${p => p.theme?.BORDER_RADIUS ?? '8px'};
  padding: 0.6em;
  margin: 0 auto;
  font-size: 1em;
  font-family: Arial, sans-serif;
  font-weight: 300;
  color: ${p => p.theme?.TEXT_COLOR ?? '#333'};
  background-color: ${p => p.theme?.TEXT_INPUT_BACKGROUND_COLOR ?? '#f5f5f5'};
`

export const TextArea = styled.textarea<InlineProps>`
  display: ${p => (p.$inline ? 'inline-block' : 'block')};
  width: ${p => (p.$inline ? 'auto' : '100%')};
  border: none;
  border-radius: ${p => p.theme?.BORDER_RADIUS ?? '8px'};
  padding: 0.6em;
  margin: 0 auto;
  font-size: 1em;
  font-family: Arial, sans-serif;
  font-weight: 300;
  color: ${p => p.theme?.TEXT_COLOR ?? '#333'};
  background-color: ${p => p.theme?.TEXT_INPUT_BACKGROUND_COLOR ?? '#f5f5f5'};
`

export const InputLabel = styled.label`
  font-family: Kanit, sans-serif;
  font-size: 1em;
  font-weight: 400;
  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
`

export const InputGroup = styled.div`
  margin: 0.5em auto;
`

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  error?: string
  $inline?: boolean
}

export const InputField = forwardRef<HTMLInputElement, InputFieldProps>(
  ({ label, error, $inline, ...props }, ref) => (
    <InputGroup>
      <InputLabel>{label}</InputLabel>
      <Input ref={ref} $inline={$inline} {...props} />
      {error && <span className="error">{error}</span>}
    </InputGroup>
  ),
)

InputField.displayName = 'InputField'

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
  $inline?: boolean
}

export const TextAreaField = forwardRef<HTMLTextAreaElement, TextAreaFieldProps>(
  ({ label, error, $inline, ...props }, ref) => (
    <InputGroup>
      <InputLabel>{label}</InputLabel>
      <TextArea ref={ref} $inline={$inline} {...props} />
      {error && <span className="error">{error}</span>}
    </InputGroup>
  ),
)

TextAreaField.displayName = 'TextAreaField'