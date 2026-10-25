import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const SubCommentSchema = new Schema(
  {
    message: { type: String, required: true, trim: true },
    creator: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
    parentComment: { type: Schema.Types.ObjectId, ref: 'comments', required: true, index: true },
  },
  { timestamps: true }
)

export type SubCommentDocument = InferSchemaType<typeof SubCommentSchema>
export const SubCommentModel = (models.sub_comments as Model<SubCommentDocument> | undefined) ?? model<SubCommentDocument>('sub_comments', SubCommentSchema, 'sub_comments')
