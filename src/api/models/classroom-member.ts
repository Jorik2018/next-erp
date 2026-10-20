import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const ClassroomMemberSchema = new Schema(
  {
    member: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
    classroom: { type: Schema.Types.ObjectId, ref: 'classrooms', required: true, index: true },
    role: { type: String, enum: ['member', 'admin'], required: true, default: 'member' },
  },
  { timestamps: true }
)

ClassroomMemberSchema.index({ member: 1, classroom: 1 }, { unique: true })

export type ClassroomMemberDocument = InferSchemaType<typeof ClassroomMemberSchema>
export const ClassroomMemberModel = (models.classroom_members as Model<ClassroomMemberDocument> | undefined) ?? model<ClassroomMemberDocument>('classroom_members', ClassroomMemberSchema, 'classroom_members')
