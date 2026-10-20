import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const NotificationSchema = new Schema(
  {
    issuer: { type: String, required: true, trim: true },
    message: { type: String, trim: true, required: true },
    type: { type: String, required: true },
    isRead: { type: Boolean, required: true, default: false, index: true },
    creator: { type: Schema.Types.ObjectId, ref: 'users', required: true },
    receiver: { type: Schema.Types.ObjectId, ref: 'users', required: true, index: true },
  },
  { timestamps: true }
)

export type NotificationDocument = InferSchemaType<typeof NotificationSchema>
export const NotificationModel = (models.notifications as Model<NotificationDocument> | undefined) ?? model<NotificationDocument>('notifications', NotificationSchema, 'notifications')
