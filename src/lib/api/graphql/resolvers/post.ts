import savePost from "../handlers/post/mutation/save-post";
import removePost from "../handlers/post/mutation/remove-post";
import classroomPosts from "../handlers/post/query/classroom-posts";
import getPost from "../handlers/post/query/get-post";

const post = {
  Query: {
    classroomPosts,
    getPost,
  },
  Mutation: {
    savePost,
    removePost,
  },
};

export default post;