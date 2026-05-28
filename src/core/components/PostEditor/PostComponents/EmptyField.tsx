'use client'

import type { HTMLAttributes } from 'react'
import styled from 'styled-components'

const EmptyFieldWrapper = styled.div`
  width: 100%;
  height: 200px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  background-color: transparent;

  border: 2px dashed
    ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};

  border-radius: 7px;

  transition: 200ms ease-in;

  &:hover {
    border: 2px solid
      ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
  }

  h3 {
    color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
    font-weight: 400;
    font-size: 1.5em;
  }
`

type EmptyFieldProps = HTMLAttributes<HTMLDivElement>

export default function EmptyField(props: EmptyFieldProps) {
  return (
    <EmptyFieldWrapper {...props}>
      <h3>เพิ่มส่วนประกอบ</h3>
    </EmptyFieldWrapper>
  )
}