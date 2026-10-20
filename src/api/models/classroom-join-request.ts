import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

export const joinRequestStatuses = ['waiting', 'accepted', 'refused'] as const

const ClassroomJoinRequestSchema = new Schema(
  {
    candidate: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
    classroom: { type: Schema.Types.ObjectId, ref: 'classrooms', required: true, index: true },
    status: { type: String, enum: joinRequestStatuses, required: true, default: 'waiting', index: true },
  },
  { timestamps: true }
)

ClassroomJoinRequestSchema.index({ candidate: 1, classroom: 1 }, { unique: true })

export type ClassroomJoinRequestDocument = InferSchemaType<typeof ClassroomJoinRequestSchema>
export const ClassroomJoinRequestModel = (models.classroom_join_requests as Model<ClassroomJoinRequestDocument> | undefined) ?? model<ClassroomJoinRequestDocument>('classroom_join_requests', ClassroomJoinRequestSchema, 'classroom_join_request')
