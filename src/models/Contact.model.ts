import mongoose, { Schema } from 'mongoose';

import { ContactT } from '@src/interfaces';

export const ContactSchema: Schema<ContactT> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      maxLength: 200,
      minlength: 2,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      trim: true,
    },
    subject: {
      type: String,
      required: [true, 'Please provide subject'],
      maxLength: 200,
      minlength: 3,
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Please provide message'],
      minlength: 10,
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied'],
      default: 'new',
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

ContactSchema.post('save', function () {
  if (process?.env?.NODE_ENV && process.env.NODE_ENV === 'development') {
    console.log('Contact message saved:', this);
  }
});

export default mongoose.models.Contact || mongoose.model<ContactT>('Contact', ContactSchema);

