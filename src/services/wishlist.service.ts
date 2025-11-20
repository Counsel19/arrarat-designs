import { NextFunction, Response } from 'express';
import createHttpError from 'http-errors';

import { AuthenticatedRequestBody, IUser } from '@src/interfaces';
import User from '@src/models/User.model';
import Product from '@src/models/Product.model';
import { customResponse } from '@src/utils';

export const getWishlistService = async (req: AuthenticatedRequestBody<IUser>, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?._id).populate('wishlist').exec();
    if (!user) {
      return next(createHttpError(401, 'Auth Failed'));
    }
    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Wishlist fetched successfully',
        data: { wishlist: user.wishlist || [] },
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const addWishlistItemService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const product = await Product.findById(productId);
    if (!product) {
      return next(createHttpError(404, 'Product not found'));
    }

    const user = await User.findById(req.user?._id);
    if (!user) {
      return next(createHttpError(401, 'Auth Failed'));
    }

    await user.addToWishlist(productId);
    await user.populate('wishlist');

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Product added to wishlist',
        data: { wishlist: user.wishlist },
      })
    );
  } catch (error) {
    return next(error);
  }
};

export const removeWishlistItemService = async (
  req: AuthenticatedRequestBody<IUser>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { productId } = req.params;
    const user = await User.findById(req.user?._id);
    if (!user) {
      return next(createHttpError(401, 'Auth Failed'));
    }

    await user.removeFromWishlist(productId);
    await user.populate('wishlist');

    return res.status(200).send(
      customResponse({
        success: true,
        error: false,
        status: 200,
        message: 'Product removed from wishlist',
        data: { wishlist: user.wishlist },
      })
    );
  } catch (error) {
    return next(error);
  }
};

