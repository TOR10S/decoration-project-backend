import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidDecorationId = (req, res, next) => {
  const { decorationId } = req.params;
  if (!isValidObjectId(decorationId)) {
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
