import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';

import PlatformSetting from '@src/models/Setting.model';
import { AuthenticatedRequestBody, IUser, PlatformSettingsT } from '@src/interfaces';
import { customResponse } from '@src/utils';
import { environmentConfig } from '@src/configs';

export const getOrCreatePlatformSettings = async (): Promise<PlatformSettingsT> => {
  let settings = await PlatformSetting.findOne({ key: 'default' });
  if (!settings) {
    settings = await PlatformSetting.create({
      key: 'default',
      adminWhatsappNumber: environmentConfig.DEFAULT_ADMIN_WHATSAPP || '+2348100474601',
      orderNotificationEmail: environmentConfig.ORDER_NOTIFICATION_EMAIL || environmentConfig.SUPPORT_EMAIL,
      whatsappMessageTemplate:
        'Hello Ararat Designs, I just placed an order with invoice {invoiceNumber}. Can you confirm payment instructions?',
    });
  }
  return settings;
};

export const getPublicSettingsService = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const settings = await getOrCreatePlatformSettings();
    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Successfully fetched settings',
        data: {
          adminWhatsappNumber: settings.adminWhatsappNumber,
        },
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const getSettingsService = async (_req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const settings = await getOrCreatePlatformSettings();
    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Successfully fetched admin settings',
        data: { settings },
      })
    );
  } catch (error) {
    return next(error);
  }
};

type UpdateSettingsBody = {
  adminWhatsappNumber?: string;
  orderNotificationEmail?: string;
  whatsappMessageTemplate?: string;
};

export const updateAdminContactService = async (
  req: AuthenticatedRequestBody<IUser & UpdateSettingsBody>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { adminWhatsappNumber, orderNotificationEmail, whatsappMessageTemplate } = req.body;
    if (!adminWhatsappNumber && !orderNotificationEmail && !whatsappMessageTemplate) {
      return next(createHttpError(400, 'Provide at least one field to update'));
    }

    const settings = await getOrCreatePlatformSettings();

    if (adminWhatsappNumber) {
      settings.adminWhatsappNumber = adminWhatsappNumber;
    }
    if (orderNotificationEmail) {
      settings.orderNotificationEmail = orderNotificationEmail.toLowerCase();
    }
    if (whatsappMessageTemplate) {
      settings.whatsappMessageTemplate = whatsappMessageTemplate;
    }
    settings.updatedBy = req.user?._id;
    const updated = await settings.save();

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Settings updated successfully',
        data: { settings: updated },
      })
    );
  } catch (error) {
    return next(error);
  }
};

