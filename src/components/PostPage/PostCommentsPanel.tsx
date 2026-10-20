import styled from "styled-components";

import Card, { Header, Body } from "../Card";
import PostCommentItem from "./PostCommentItem";

const SubCommentsWrapper = styled.ul`
  padding-left: 5em;
  list-style: none;
`;

const CommentPanelCard = styled(Card)`
  padding-bottom: 4em;
  margin-bottom: 2em;
  max-width: 100%;
  height: 500px;
  width: 900px;
`;

interface CommentCreator {
  _id: string;
  fname: string;
  profilePicture?: string | null;
}

interface SubComment {
  message: string;
  creator: CommentCreator;
}

interface PostComment {
  message: string;
  creator: CommentCreator;
  subComments: SubComment[];
}

interface CommentProps {
  creator: string;
  content: string;
  subComments: SubComment[];
}

const Comment = ({
  creator,
  content,
  subComments,
}: CommentProps) => (
  <div>
    <PostCommentItem
      creator={creator}
      content={content}
    />

    <SubCommentsWrapper>
      {subComments.map((comment, index) => (
        <PostCommentItem
          key={`${comment.creator._id}-${index}`}
          isReply
          content={comment.message}
          creator={comment.creator.fname}
        />
      ))}
    </SubCommentsWrapper>
  </div>
);

interface PostCommentsPanelProps {
  comments?: PostComment[] | null;
}

const PostCommentsPanel = ({
  comments,
}: PostCommentsPanelProps) => (
  <CommentPanelCard>
    <Header>Comments</Header>

    <Body $overflowY="auto" $height="450px">
      {!comments?.length ? (
        <Card
          $padding="2em 4em"
          $marginTop="3em"
          $textCenter
        >
          <h3>No comments yet</h3>
        </Card>
      ) : (
        comments.map((comment, index) => (
          <Comment
            key={`${comment.creator._id}-${index}`}
            content={comment.message}
            creator={comment.creator.fname}
            subComments={comment.subComments}
          />
        ))
      )}
    </Body>
  </CommentPanelCard>
);

export default PostCommentsPanel;