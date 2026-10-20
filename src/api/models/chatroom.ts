import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const ChatroomSchema = new Schema(
  {
    classroom: { type: Schema.Types.ObjectId, ref: 'classrooms', required: true, unique: true, index: true },
  },
  { timestamps: true }
)

export type ChatroomDocument = InferSchemaType<typeof ChatroomSchema>
export const ChatroomModel = (models.chatrooms as Model<ChatroomDocument> | undefined) ?? model<ChatroomDocument>('chatrooms', ChatroomSchema, 'chatrooms')
