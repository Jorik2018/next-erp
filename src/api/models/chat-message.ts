import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const ChatMessageSchema = new Schema(
  {
    creator: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
    message: { type: String, trim: true, required: true },
    chatroom: { type: Schema.Types.ObjectId, ref: 'chatrooms', required: true, index: true },
  },
  { timestamps: true }
)

export type ChatMessageDocument = InferSchemaType<typeof ChatMessageSchema>
export const ChatMessageModel = (models.chat_messages as Model<ChatMessageDocument> | undefined) ?? model<ChatMessageDocument>('chat_messages', ChatMessageSchema, 'chat_messages')
