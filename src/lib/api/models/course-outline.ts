import { Schema, model, models, type InferSchemaType, type Model } from 'mongoose'

const CourseOutlineSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    passed: { type: Boolean, default: false, required: true },
    classroom: { type: Schema.Types.ObjectId, ref: 'classrooms', required: true, index: true },
  },
  { timestamps: true }
)

export type CourseOutlineDocument = InferSchemaType<typeof CourseOutlineSchema>
export const CourseOutlineModel = (models.course_outlines as Model<CourseOutlineDocument> | undefined) ?? model<CourseOutlineDocument>('course_outlines', CourseOutlineSchema, 'course_outlines')
