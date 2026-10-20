import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

export const invitationStatuses = ['waiting', 'accepted', 'refused'] as const

const ClassroomInvitationSchema = new Schema(
  {
    candidate: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
    classroom: { type: Schema.Types.ObjectId, ref: 'classrooms', required: true, index: true },
    status: { type: String, enum: invitationStatuses, required: true, default: 'waiting', index: true },
  },
  { timestamps: true }
)

ClassroomInvitationSchema.index({ candidate: 1, classroom: 1 }, { unique: true })

export type ClassroomInvitationDocument = InferSchemaType<typeof ClassroomInvitationSchema>
export const ClassroomInvitationModel = (models.classroom_invitations as Model<ClassroomInvitationDocument> | undefined) ?? model<ClassroomInvitationDocument>('classroom_invitations', ClassroomInvitationSchema, 'classroom_invitations')
