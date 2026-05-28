'use client'

import styled from 'styled-components'

export const BasedBadge = styled.div`
  color: ${p => p.theme?.TEXT_COLOR ?? '#333'};
  background-color: #fff;

  display: inline-block;
  text-align: center;

  border-radius: 50%;

  margin-bottom: 3px;
  margin-left: 0.7em;
  margin-right: 0;
  margin-top: 0;

  font-size: 11px;

  border: none;

  padding: 5px;
  width: 28px;
`

export const InfoBadge = styled(BasedBadge)`
  background-color: ${p => p.theme?.INFO_COLOR ?? '#0ea5e9'};
  color: #fff;
`