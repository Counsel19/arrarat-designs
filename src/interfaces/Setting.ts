import mongoose, { Document } from 'mongoose';

export interface PlatformSettingsT extends Document {
  key: string;
  adminWhatsappNumber: string;
  orderNotificationEmail: string;
  whatsappMessageTemplate?: string;
  metadata?: Record<string, unknown>;
  updatedBy?: mongoose.Schema.Types.ObjectId;
}

export default PlatformSettingsT;

