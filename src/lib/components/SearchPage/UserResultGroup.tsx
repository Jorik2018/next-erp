import UserResult from "./SearchResultTypes/UserResult";
import SearchResultGroup from "./SearchResultGroup";
import ResultTitle from "./ResultTitle";

/**
 * @name UserResultGroup
 * @desc A Card component contents of user profile associated to user's search query
 */
const UserResultGroup = () => (
  <SearchResultGroup header="Users">
    <UserResult>
      <ResultTitle>Tony Stark</ResultTitle>
    </UserResult>
    <UserResult>
      <ResultTitle>Tony Stark</ResultTitle>
    </UserResult>
    <UserResult>
      <ResultTitle>Tony Stark</ResultTitle>
    </UserResult>
    <UserResult>
      <ResultTitle>Tony Stark</ResultTitle>
    </UserResult>
    <UserResult>
      <ResultTitle>Tony Stark</ResultTitle>
    </UserResult>
    <UserResult>
      <ResultTitle>Tony Stark</ResultTitle>
    </UserResult>
    <UserResult>
      <ResultTitle>Tony Stark</ResultTitle>
    </UserResult>
  </SearchResultGroup>
);

export default UserResultGroup;
