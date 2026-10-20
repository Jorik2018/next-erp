import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

export const DEFAULT_CLASSROOM_THUMBNAIL = '/static/images/default/user-profile.jpg'

const ClassroomSchema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    subject: { type: String, required: true, trim: true },
    thumbnail: { type: String, required: true, default: DEFAULT_CLASSROOM_THUMBNAIL },
    description: { type: String, required: true, trim: true },
    outlines: [{ type: Schema.Types.ObjectId, ref: 'course_outlines' }],
    creator: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
  },
  { timestamps: true }
)

export type ClassroomDocument = InferSchemaType<typeof ClassroomSchema>
export const ClassroomModel = (models.classrooms as Model<ClassroomDocument> | undefined) ?? model<ClassroomDocument>('classrooms', ClassroomSchema, 'classrooms')
