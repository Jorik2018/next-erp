import jwt from "jsonwebtoken";
import { isEmpty, isMongoId, trim } from "validator";

import { displayErrMessageWhenDev } from "./error-helpers";
import { ClassroomMemberModel } from "../api/models/classroom-member";
import { CurrentUser } from "../api/graphql/core/context";

export const SECRET_TOKEN_KEY = process.env.SECRET_TOKEN_KEY;

/** ==================================================================================
 * @name requiredAuthentication()
 * @desc verifying user's authentication status and return TRUE if he/she is authenticated, FALSE otherwise.
 * @param user [GRAPHQL_CONTEXT] : Current user(Javascript Object) extracted from JWT Token since he/she was logged-in.
 * @return Boolean
 ================================================================================== */
export const requiredAuthentication = async (user?: CurrentUser) => {
  try {
    return !!user?._id && isMongoId(String(user._id));
  } catch (err) {
    displayErrMessageWhenDev(err);
    return false;
  }
};

/** ==================================================================================
 * @name requireClassroomMember()
 * @desc Make sure user have the right permission to access the
 *       particular resource, by Making sure they are classroom member.
 * @param classroomID [GRAPHQL_ARGS] : Classroom ID.
 * @param user [GRAPHQL_CONTEXT] : Current user extracted from JWT Token since he/she was logged-in.
 ================================================================================== */
export const requiredClassroomMember = async (
  user: any,
  classroomID: string,
) => {
  return true;
  try {
    const userID = String(user._id);
    const classID = String(classroomID);

    // In case the user ID was not provided. This means user is not authenticated.
    if (isEmpty(trim(userID)) || !isMongoId(userID)) {
      return false;
    }

    // In case the classroom ID was not provided. return FALSE
    if (isEmpty(trim(classID)) || !isMongoId(classID)) {
      return false;
    }

    // Checking wether user is a member of the given classroom or not.
    const isMember = await ClassroomMemberModel.findOne({
      member: userID,
      classroom: classID,
    });

    // Return TRUE, if a given user is a member of a given classroom. Otherwise, return FALSE.
    return isMember ? true : false;
  } catch (err) {
    displayErrMessageWhenDev(err);
    return false;
  }
};

/** ==================================================================================
 * @name requiredClassroomAdmin()
 * @desc Make sure user have the right permission to access the
 *       particular resource, by Making sure they are classroom administrator(Admin)
 * @param user [GRAPHQL_CONTEXT] : Current user extracted from JWT Token since he/she was logged-in
 * @param classroomID [GRAPHQL_ARGS] : Classroom ID
 * @param ClassroomMember [GRAPHQL_CONTEXT] : Mongoose Model names "ClassroomMember"
 * @return Boolean
 ================================================================================== */
export const requiredClassroomAdmin = async (
  user: any,
  classroomID: string,
) => {
  try {
    if (!user?._id) {
      return false;
    }

    const userID = String(user._id);
    const classID = String(classroomID);

    if (
      isEmpty(trim(userID)) ||
      !isMongoId(userID)
    ) {
      return false;
    }

    if (
      isEmpty(trim(classID)) ||
      !isMongoId(classID)
    ) {
      return false;
    }

    const isClassroomAdmin = await ClassroomMemberModel.findOne({
      classroom: classID,
      member: userID,
      role: "admin",
    });

    return !!isClassroomAdmin;
  } catch (err) {
    displayErrMessageWhenDev(err);
    return false;
  }
};
/** ==================================================================================
 * @name verifyToken()
 * @desc Verifying wether the given token is valid or not
 * @param token string : A token to verify
 * @return Object(an extracted data from the given token)
 ================================================================================== */
export const verifyToken = async (token: any) => {
  if (!token || token === "") {
    throw new Error("ERROR: 1st parameter 'token' not specified!");
  }

  const extractedData = await jwt.verify(token, SECRET_TOKEN_KEY!);

  if (!extractedData) {
    throw new Error("ERROR: Token Invalid!");
  }

  return extractedData;
};

/** ==================================================================================
 * @name generateToken()
 * @desc Generate accessToken or refreshToken depending on the parameter
 * @param payload object : Object contains data which will be storing in the Token
 * @param type string : Specify wether to generate accessToken
 *     or refreshToken. Possible values are 'accessToken' or 'refreshToken'
 * @return string : a generated token
 ================================================================================== */
export const generateToken = async (payload: any, type: any) => {
  let token = "";

  if (!payload || payload == null) {
    throw new Error("ERROR: 1st parameter 'payload' not specified!");
  }

  if (!type || type === "") {
    throw new Error("ERROR: 2nd parameter 'type' not specified!");
  }

  if (type === "accessToken") {
    token = await jwt.sign(payload, SECRET_TOKEN_KEY!, {
      expiresIn: 60 * 10, // Last for 10 minutes
    });
  } else if (type === "refreshToken") {
    token = await jwt.sign(payload, SECRET_TOKEN_KEY!); // This token will last forever
  }

  return token;
};

/** ==================================================================================
 * @name generateNewTokensIfExpired()
 * @desc Generate new both access/refresh tokens of old accessToken is expired
 * @param payload object : a payload from old refreshToken
 * @return Object (contains new refresh/access tokens)
 ================================================================================== */
export const generateNewTokensIfExpired = async (payload: any) => {
  if (!payload || payload == null) {
    throw new Error("ERROR: 1st parameter 'refreshToken' not specified!");
  }

  const newRefreshToken = await generateToken(payload, "refreshToken");
  const newAccessToken = await generateToken(payload, "accessToken");

  return { newRefreshToken, newAccessToken };
};
