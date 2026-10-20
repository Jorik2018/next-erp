import createPost from "../handlers/post/mutation/create-post";
import removePost from "../handlers/post/mutation/remove-post";
import classroomPosts from "../handlers/post/query/classroom-posts";
import getPost from "../handlers/post/query/get-post";

const post = {
  Query: {
    classroomPosts,
    getPost,
  },
  Mutation: {
    createPost,
    removePost,
  },
};

export default post;