import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const PostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    recipe: { type: String },
    isPublic: { type: Boolean, default: false },
    creator: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
    classroom: { type: Schema.Types.ObjectId, ref: 'classrooms', required: true, index: true },
    comments: [{ type: Schema.Types.ObjectId, ref: 'comments' }],
  },
  { timestamps: true }
)

export type PostDocument = InferSchemaType<typeof PostSchema>
export const PostModel = (models.posts as Model<PostDocument> | undefined) ?? model<PostDocument>('posts', PostSchema, 'posts')
