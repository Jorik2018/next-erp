"use client";

import { gql, type TypedDocumentNode } from "@apollo/client";
import { useQuery } from "@apollo/client/react";

import ProfileActivityPanel from "@/lib/components/ProfilePage/ProfileActivityPanel";
import ProfileInfoPanel from "@/lib/components/ProfilePage/ProfileInfoPanel";
import AuthenticatedLayout from "@/lib/components/layout/AuthenticatedLayout";
import LoadingIcon from "@/lib/components/LoadingIcon";
import Container from "@/lib/components/Container";
import Panel from "@/lib/components/Panel";
import Card from "@/lib/components/Card";

interface ProfileUser {
  _id: string;
  fname: string;
  lname?: string | null;
  email: string;
  address?: string | null;
  username?: string | null;
  career?: string | null;
  profilePicture: string;
}

interface UserProfileResponse {
  user: ProfileUser | null;

  err: {
    message: string;
  } | null;
}

interface MyProfileData {
  userProfile: UserProfileResponse;
}

/* -------------------------------------------------------------------------- */
/*                                   GraphQL                                  */
/* -------------------------------------------------------------------------- */

const MY_PROFILE_QUERY: TypedDocumentNode<MyProfileData> = gql`
  query MyProfile {
    userProfile {
      user {
        _id
        fname
        lname
        email
        address
        username
        career
        profilePicture
      }

      err {
        message
      }
    }
  }
`;

/* -------------------------------------------------------------------------- */
/*                              Helper Components                             */
/* -------------------------------------------------------------------------- */

interface ProfileMessageProps {
  children: React.ReactNode;
}

function ProfileMessage({
  children,
}: ProfileMessageProps) {
  return (
    <AuthenticatedLayout>
      <Container>
        <Card
          $textCenter
          $padding="2em"
          $marginTop="5em"
        >
          {children}
        </Card>
      </Container>
    </AuthenticatedLayout>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Profile Page                                */
/* -------------------------------------------------------------------------- */

export default function ProfilePage() {
  const { data, loading, error } =
    useQuery(MY_PROFILE_QUERY);

  if (loading) {
    return (
      <AuthenticatedLayout>
        <Container>
          <LoadingIcon />
        </Container>
      </AuthenticatedLayout>
    );
  }

  if (error) {
    console.error(
      "Unable to load profile:",
      error
    );

    return (
      <ProfileMessage>
        <h2>Unable to load your profile.</h2>
      </ProfileMessage>
    );
  }

  const response = data?.userProfile;

  if (response?.err) {
    return (
      <ProfileMessage>
        <h2>{response.err.message}</h2>
      </ProfileMessage>
    );
  }

  const user = response?.user;

  if (!user) {
    return (
      <ProfileMessage>
        <h2>User profile not found.</h2>
      </ProfileMessage>
    );
  }

  const fullName = [
    user.fname,
    user.lname,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <AuthenticatedLayout>
      <Container>
        <Panel $left $width={40}>
          <ProfileInfoPanel
            email={user.email}
            realName={fullName}
            career={
              user.career ?? "Not specified"
            }
            address={
              user.address ?? "Not specified"
            }
            username={
              user.username ?? "Not specified"
            }
            profilePicture={
              user.profilePicture
            }
          />
        </Panel>

        <Panel $right $width={60}>
          <Card $padding="2em">
            <h2>Profile Details</h2>

            <p>
              <strong>Name:</strong>{" "}
              {fullName}
            </p>

            <p>
              <strong>Email:</strong>{" "}
              {user.email}
            </p>

            <p>
              <strong>Username:</strong>{" "}
              {user.username ?? "Not specified"}
            </p>

            <p>
              <strong>Career:</strong>{" "}
              {user.career ?? "Not specified"}
            </p>

            <p>
              <strong>Address:</strong>{" "}
              {user.address ?? "Not specified"}
            </p>
          </Card>
        </Panel>
      </Container>

      <ProfileActivityPanel />
    </AuthenticatedLayout>
  );
}