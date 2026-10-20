"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useDispatch, useSelector } from "react-redux";
import ClassroomMemberPanel from "@/components/ClassroomMemberPage/ClassroomMemberPanel";
import ClassroomActivityPanel from "@/components/ClassroomPage/ClassroomActivityPanel";
import ClassroomHeaderPanel from "@/components/ClassroomPage/ClassroomHeaderPanel";
import ClassroomInvitationModal from "@/components/ClassroomInvitationModal";
import AuthenticatedLayout from "@/components/layout/AuthenticatedLayout";
import { CLASSROOM_PAGE } from "@/constants/endpoints/ui";
import LoadingIcon from "@/components/LoadingIcon";
import Container from "@/components/Container";
import { Button } from "@/components/Button";
import Card from "@/components/Card";
import { hideClassroomInvitationModal, showClassroomInvitationModal } from "../slices/classroom-invitation-modal";

interface ClassroomMembersData {
  classroomMembers: {
    isMember: boolean;
    members: ClassroomMember[];
    classroom: {
      _id: string;
      name: string;
    };
    err: {
      message: string;
    } | null;
  };
}

interface ClassroomMembersVariables {
  classroomID: string;
}

interface RootState {
  classroomInvitationModal: boolean;
  user: {
    _id?: string;
  };
}

const CLASSROOM_MEMBERS_QUERY = gql`
  query ClassroomMembers($classroomID: String!) {
    classroomMembers(classroomID: $classroomID) {
      isMember
      members {
        _id
        fname
        lname
        profilePicture
      }
      classroom {
        _id
        name
      }
      err {
        message
      }
    }
  }
`;

export default function ClassroomMemberPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useDispatch();

  const classroomID = searchParams.get("id");

  const isClassroomInvitationModalShowing = useSelector(
    (state: RootState) => state.classroomInvitationModal
  );

  const currentUserID = useSelector(
    (state: RootState) => state.user._id
  );

  const { data, loading } = useQuery<
    ClassroomMembersData,
    ClassroomMembersVariables
  >(CLASSROOM_MEMBERS_QUERY, {
    variables: {
      classroomID: classroomID ?? "",
    },
    skip: !classroomID,
  });

  const classroomMembers = data?.classroomMembers;
  const classroom = classroomMembers?.classroom;

  useEffect(() => {
    if (
      !loading &&
      classroomID &&
      classroomMembers &&
      !classroomMembers.isMember
    ) {
      router.replace(`${CLASSROOM_PAGE}?id=${classroomID}`);
    }
  }, [
    loading,
    classroomID,
    classroomMembers,
    router,
  ]);

  if (!classroomID) {
    return (
      <AuthenticatedLayout>
        <Card $fluidWidth $textCenter $padding="1em" $marginTop="5em">
          Classroom ID was not specified.
        </Card>
      </AuthenticatedLayout>
    );
  }

  if (loading) {
    return (
      <AuthenticatedLayout>
        <LoadingIcon />
      </AuthenticatedLayout>
    );
  }

  if (!classroomMembers || !classroom) {
    return (
      <AuthenticatedLayout>
        <Card $fluidWidth $textCenter $padding="1em" $marginTop="5em">
          Classroom information was not found.
        </Card>
      </AuthenticatedLayout>
    );
  }

  if (!classroomMembers.isMember) {
    return null;
  }

  return (
    <AuthenticatedLayout>
      <ClassroomInvitationModal
        classroomID={classroom._id}
        isShowing={isClassroomInvitationModalShowing}
        hideClassroomInvitationModal={() =>
          dispatch(hideClassroomInvitationModal())
        }
      />

      <ClassroomHeaderPanel
        classroomName={classroom.name}
        classroomID={classroom._id}
      />

      <Container $marginTop="7em">
        <Card
          $fluidWidth
          $textCenter
          $padding="1em"
          $marginTop="1em"
        >
          <Button
            $primary
            onClick={() =>
              dispatch(showClassroomInvitationModal())
            }
          >
            Add New Member
          </Button>
        </Card>

        <ClassroomMemberPanel
          classroomMembers={classroomMembers.members}
        />

        <ClassroomActivityPanel
          classroomID={classroom._id}
          currentUserID={currentUserID}
        />
      </Container>
    </AuthenticatedLayout>
  );
}