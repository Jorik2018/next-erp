"use client";

import { useSearchParams } from "next/navigation";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useSelector } from "react-redux";

import ClassroomHeaderPanel from "@/lib/components/ClassroomPage/ClassroomHeaderPanel";
import ClassroomInfoPanel from "@/lib/components/ClassroomPage/ClassroomInfoPanel";
import ClassroomPreview from "@/lib/components/ClassroomPage/ClassroomPreview";
import ClassroomActivityPanel from "@/lib/components/ClassroomPage/ClassroomActivityPanel";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import LoadingIcon from "@/lib/components/LoadingIcon";
import Container from "@/lib/components/Container";
import PostsList from "@/lib/components/PostsList";
import Panel from "@/lib/components/Panel";
import Card from "@/lib/components/Card";

interface ClassroomProfileData {
  classroomProfile: {
    isMember: boolean;
    didJoinReqSent: boolean;
    classroom: {
      _id: string;
      name: string;
      description: string;
      subject: string;
      thumbnail?: string | null;
      creator: {
        _id: string;
        fname: string;
        lname?: string | null;
      };
      outline: Array<{
        title: string;
        passed: boolean;
      }>;
      posts: Array<{
        _id: string;
        title: string;
      }>;
    } | null;
    err: {
      message: string;
    } | null;
  };
}

interface ClassroomProfileVariables {
  _id: string;
}

interface RootState {
  user: {
    _id?: string;
  };
}

const CLASSROOM_PROFILE_QUERY = gql`
  query ClassroomProfile($_id: String!) {
    classroomProfile(_id: $_id) {
      isMember
      didJoinReqSent
      classroom {
        _id
        name
        description
        subject
        thumbnail
        creator {
          _id
          fname
          lname
        }
        outline {
          title
          passed
        }
        posts {
          _id
          title
        }
      }
      err {
        message
      }
    }
  }
`;

export default function ClassroomPage() {
  const searchParams = useSearchParams();
  const activeUser = useSelector((state: RootState) => state.user);

  const id = searchParams.get("id");

  const { data, loading } = useQuery<
    ClassroomProfileData,
    ClassroomProfileVariables
  >(CLASSROOM_PROFILE_QUERY, {
    variables: {
      _id: id ?? "",
    },
    skip: !id,
  });

  const classroomProfile = data?.classroomProfile;
  const classroom = classroomProfile?.classroom;

  if (!id) {
    return (
      <AuthenticatedLayout>
        <Card $padding="2em" $marginTop="5em" $textCenter>
          <h3>No se especificó el aula</h3>
        </Card>
      </AuthenticatedLayout>
    );
  }

  return (
    <AuthenticatedLayout>
      {loading ? (
        <LoadingIcon />
      ) : !classroom ? (
        <Card $padding="2em" $marginTop="5em" $textCenter>
          <h3>No se encontró el aula</h3>
        </Card>
      ) : (
        <>
          <ClassroomHeaderPanel
            classroomID={classroom._id}
            classroomName={classroom.name}
          />

          <Container $marginTop="7em">
            {classroomProfile.isMember ? (
              <>
                <Panel $left $width={40}>
                  <ClassroomInfoPanel
                    thumbnail={classroom.thumbnail ?? ""}
                    courseOutline={classroom.outline}
                  />
                </Panel>

                <Panel $right $height="850px" $width={60}>
                  <PostsList
                    classroomID={classroom._id}
                    posts={classroom.posts}
                    height="700px"
                  />
                </Panel>

                <ClassroomActivityPanel
                  classroomID={classroom._id}
                  currentUserID={activeUser._id!}
                  classroomCreatorID={classroom.creator._id}
                />
              </>
            ) : (
              <ClassroomPreview
                classroomID={classroom._id}
                subject={classroom.subject}
                didJoinReqSent={classroomProfile.didJoinReqSent}
                description={classroom.description}
                instructor={`${classroom.creator.fname} ${
                  classroom.creator.lname ?? ""
                }`}
              />
            )}
          </Container>
        </>
      )}
    </AuthenticatedLayout>
  );
}