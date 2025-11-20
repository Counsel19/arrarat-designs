import mongoose, { Schema } from 'mongoose';

import { PlatformSettingsT } from '@src/interfaces';

const platformSettingsSchema = new Schema<PlatformSettingsT>(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: 'default',
    },
    adminWhatsappNumber: {
      type: String,
      required: true,
      trim: true,
    },
    orderNotificationEmail: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    whatsappMessageTemplate: {
      type: String,
      trim: true,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
    updatedBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.PlatformSetting ||
  mongoose.model<PlatformSettingsT>('PlatformSetting', platformSettingsSchema);

