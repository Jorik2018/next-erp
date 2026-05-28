'use client'

import styled from 'styled-components'

import Card from '../Card'

const DashboardPageHeading = styled.div`
  width: 550px;

  margin: 0.8em;
  padding: 0.4em;

  display: inline-block;

  text-align: center;

  font-size: 1em;
  font-weight: 400;

  color: ${p => p.theme?.PRIMARY_COLOR ?? '#0070f3'};
`

export default function DashboardPageHeadingPanel() {
  return (
    <Card $fluidWidth $textCenter>
      <DashboardPageHeading>
        ห้องเรียนที่คุณได้สร้างหรือเข้าร่วม
      </DashboardPageHeading>
    </Card>
  )
}