import ClassroomResult from "./SearchResultTypes/ClassroomResult";
import SearchResultGroup from "./SearchResultGroup";
import ResultTitle from "./ResultTitle";

/**
 * @name ClassroomResultGroup
 * @desc A Card component containing classroom items associated with the user's search query
 */
const ClassroomResultGroup = () => (
  <SearchResultGroup header="Classrooms">
    <ClassroomResult>
      <ResultTitle>Introduction to Computer Science</ResultTitle>
    </ClassroomResult>
    <ClassroomResult>
      <ResultTitle>Intro to Computer Science</ResultTitle>
    </ClassroomResult>
    <ClassroomResult>
      <ResultTitle>Introduction to Computer Engineering</ResultTitle>
    </ClassroomResult>
    <ClassroomResult>
      <ResultTitle>Introduction to Computer Science</ResultTitle>
    </ClassroomResult>
    <ClassroomResult>
      <ResultTitle>Introduction to Computer Management</ResultTitle>
    </ClassroomResult>
    <ClassroomResult>
      <ResultTitle>Introduction to Computer Science</ResultTitle>
    </ClassroomResult>
    <ClassroomResult>
      <ResultTitle>Introduction to Computer Science</ResultTitle>
    </ClassroomResult>
    <ClassroomResult>
      <ResultTitle>Introduction to Computer Science</ResultTitle>
    </ClassroomResult>
  </SearchResultGroup>
);

export default ClassroomResultGroup;