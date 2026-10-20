import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const CommentSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
    message: { type: String, required: true, trim: true },
    post: { type: Schema.Types.ObjectId, ref: 'posts', required: true, index: true },
  },
  { timestamps: true }
)

export type CommentDocument = InferSchemaType<typeof CommentSchema>
export const CommentModel = (models.comments as Model<CommentDocument> | undefined) ?? model<CommentDocument>('comments', CommentSchema, 'comments')
