import { isEmail, isEmpty, trim } from "validator";
import bcrypt from "bcrypt";
import { generateToken } from "@/api/helpers/security-helpers";
import { displayErrMessageWhenDev } from "@/api/helpers/error-helpers";
import { PASSWORD_PATTERN } from "@/api/constants";

const formatGraphQLErrorMessage = (message: string) => ({
  success: false,
  user: null,
  token: "",
  err: {
    name: "login",
    message,
  },
});

/** ==================================================================================
 * @name login()
 * @type resolver
 * @desc Authenticate user by verifying their email nad password
 * @param parent : default parameter from ApolloServer
 * @param { email } [GRAPHQL_ARGS] : User email
 * @param { password } [GRAPHQL_ARGS] : User password
 * @param { models } [GRAPHQL_CONTEXT] : Mongoose Model
 * @return GraphQL LoginResponse Type
 ================================================================================== */
const login = async (_: any, { email, password }: any, { models }: any) => {
  try {
    // ---------------------------------------------------------------------
    // Inputs Validation
    // ---------------------------------------------------------------------
    if (isEmpty(trim(email)) || isEmpty(trim(password))) {
      return formatGraphQLErrorMessage("Email or Password not specified");
    }

    if (!isEmail(email) || email.length > 250) {
      return formatGraphQLErrorMessage("Email is not valid");
    }

    // ---------------------------------------------------------------------
    // Password may contain anything and must have a length between 8 - 55 characters
    // ---------------------------------------------------------------------
    if (!PASSWORD_PATTERN.test(password) || password.length > 55) {
      return formatGraphQLErrorMessage("Password is not valid");
    }

    // ---------------------------------------------------------------------
    // If user does not exists
    // ---------------------------------------------------------------------
    const user = await models.User.findOne({ email }).lean();
    if (!user) return formatGraphQLErrorMessage("Invalid Credentials");

    // ---------------------------------------------------------------------
    // Compare the password
    // ---------------------------------------------------------------------
    const isPasswordValid = await bcrypt.compareSync(password, user.password);
    if (isPasswordValid) {
      // ---------------------------------------------------------------------
      // Password valid
      // ---------------------------------------------------------------------
      const accessToken = await generateToken({
        email: user.email,
        _id: user._id,
      }, "accessToken");
      const refreshToken = await generateToken({
        email: user.email,
        _id: user._id,
      }, "refreshToken");

      return {
        success: true,
        refreshToken,
        accessToken,
        user,
      };
    } else {
      // ---------------------------------------------------------------------
      // If password is invalid
      // ---------------------------------------------------------------------
      return formatGraphQLErrorMessage("Invalid Credentials");
    }
  } catch (err) {
    displayErrMessageWhenDev(err);
    return formatGraphQLErrorMessage("Server Error");
  }
};

export default login;