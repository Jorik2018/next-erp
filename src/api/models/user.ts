import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

export const DEFAULT_PROFILE_PICTURE = '/static/images/default/user-profile.jpg'
export const DEFAULT_USER_ROLE = 'user'

const UserSchema = new Schema(
  {
    // Bridge to the PostgreSQL/Auth.js user UUID. This lets Mongo keep its
    // ObjectId relationships while Auth.js remains the source of identity.
    authUserId: {
      type: String,
      unique: true,
      sparse: true,
      index: true,
    },
    fname: { type: String, lowercase: true, required: true, trim: true },
    lname: { type: String, lowercase: true, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true, index: true },
    // Never lowercase password hashes.
    password: { type: String, required: true, select: false },
    username: { type: String, lowercase: true, unique: true, required: true, trim: true, index: true },
    address: { type: String, lowercase: true, trim: true },
    career: { type: String, lowercase: true, trim: true },
    profilePicture: { type: String, default: DEFAULT_PROFILE_PICTURE },
    role: { type: String, default: DEFAULT_USER_ROLE },
    birthDate: { type: Date },
  },
  { timestamps: true }
)

export type UserDocument = InferSchemaType<typeof UserSchema>
export const UserModel = (models.users as Model<UserDocument> | undefined) ?? model<UserDocument>('users', UserSchema, 'users')
