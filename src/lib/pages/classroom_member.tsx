"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useDispatch, useSelector } from "react-redux";
import ClassroomMemberPanel from "@/lib/components/ClassroomMemberPage/ClassroomMemberPanel";
import ClassroomActivityPanel from "@/lib/components/ClassroomPage/ClassroomActivityPanel";
import ClassroomHeaderPanel from "@/lib/components/ClassroomPage/ClassroomHeaderPanel";
import ClassroomInvitationModal from "@/lib/components/ClassroomInvitationModal";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import { CLASSROOM_PAGE } from "@/lib/constants/endpoints/ui";
import LoadingIcon from "@/lib/components/LoadingIcon";
import Container from "@/lib/components/Container";
import Card from "@/lib/components/Card";
import { hideClassroomInvitationModal, showClassroomInvitationModal } from "../slices/classroom-invitation-modal";
import { Button } from "../ui/button";

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

interface ClassroomMemberPageProps {
  classroomID: string
}

export default function ClassroomMemberPage({ classroomID }: ClassroomMemberPageProps) {
  const router = useRouter();
  const dispatch = useDispatch();

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