import styled from 'styled-components'

export const BasedBadge = styled.div`
  color: ${({ theme }) => theme.TEXT_COLOR};
  background-color: #fff;
  display: inline-block;
  text-align: center;
  border-radius: 50%;
  margin-bottom: 3px;
  margin-left: 0.7em;
  font-size: 11px;
  margin-right: 0;
  margin-top: 0;
  border: none;
  padding: 5px;
  width: 28px;
`

export const InfoBadge = styled(BasedBadge)`
  background-color: ${({ theme }) => theme.INFO_COLOR};
  color: #fff;
`