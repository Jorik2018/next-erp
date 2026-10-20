import styled from 'styled-components'

const Title = styled.h2`
  color: ${({ theme }) => theme.PRIMARY_COLOR};
  font-size: 1.2em;
  font-weight: 500;
  text-align: center;
`

interface UserTitleProps {
  children: string
}

/**
 * @name UserTitle
 * @desc Display string with a maximum length of 30 characters
 */
const UserTitle = ({ children }: UserTitleProps) => (
  <Title>
    {children.length > 30
      ? `${children.slice(0, 27)}...`
      : children}
  </Title>
)

export default UserTitle