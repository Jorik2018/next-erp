import { displayErrMessageWhenDev } from "@/api/helpers/error-helpers";
import { requiredAuthentication } from "@/api/helpers/security-helpers";
import { isEmpty, isMongoId, trim } from "validator";

const formatGraphQLErrorMessage = (message: string) => ({
  classrooms: [],
  err: {
    name: "userClassroom",
    message,
  },
});

const userClassroom = async (
  _: any,
  { _id }: any, //args
  { user, models }: any //context
) => {
  try {
    const isLogin = await requiredAuthentication(user);

    if (!isLogin) {
      return formatGraphQLErrorMessage("Authentication Required");
    }

    if (isEmpty(trim(_id)) || !isMongoId(_id)) {
      return formatGraphQLErrorMessage(
        "User ID invalid or not specified"
      );
    }
    const classrooms = await models.ClassroomMember.find({
      member: _id,
    })
      .populate("classroom")
      .lean();

    return {
      classrooms: classrooms.map((c: any) => c.classroom),
      err: null,
    };
  } catch (err) {
    displayErrMessageWhenDev(err);
    return formatGraphQLErrorMessage("Server Error");
  }
};

export default userClassroom;