import styled from "styled-components";

import Card, { Body } from "../../Card";

const UserResultCard = styled(Card)`
  margin-left: 1.5em;
  margin-right: 1.5em;
  margin-bottom: 1.5em;
  margin-top: 0;
  display: inline-block;
  max-width: 350px;
  box-shadow: none;
  cursor: pointer;
  transition: all 100ms ease-in;
  &:hover {
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
    transform: translateY(-7px);
  }
`;

const UserProfilePic = styled.img`
  width: 100%;
  height: 200px;
  background-color: #ccc;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
`;

interface UserResultProp {
  profilePic?: string,
  children: any
};

/**
 * @name UserResult
 * @desc Display a single user item which corresponding to user's search text query
 * @param children : User information such as a title,name,date, whatever
 * @param profilePic : Profile picture of the user(will be replaced with default image if NULL passed)
 */
const UserResult = ({ children, profilePic }: UserResultProp) => (
  <UserResultCard>
    <UserProfilePic src={profilePic} />
    <Body>{children}</Body>
  </UserResultCard>
);

export default UserResult;
