import mongoose, { Schema } from 'mongoose';

import { FAQT } from '@src/interfaces';

export const FAQSchema: Schema<FAQT> = new Schema(
  {
    question: {
      type: String,
      required: [true, 'Please provide question'],
      maxLength: 500,
      minlength: 10,
      trim: true,
    },
    answer: {
      type: String,
      required: [true, 'Please provide answer'],
      minlength: 10,
      trim: true,
    },
    category: {
      type: String,
      trim: true,
    },
    order: {
      type: Number,
      default: 0,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

FAQSchema.post('save', function () {
  if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    console.log('FAQ saved:', this);
  }
});

export default mongoose.models.FAQ || mongoose.model<FAQT>('FAQ', FAQSchema);

