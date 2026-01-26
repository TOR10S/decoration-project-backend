import { createDecoration, deleteDecoration, getAllDecorations, getDecorationById, updateDecoration } from "../services/decorations.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";
import { saveFileToCloudinary } from '../utils/saveFileToCloudinary.js';
import { deleteFileFromCloudinary } from '../utils/deleteFileFromCloudinary.js';

export const getDecorationsController = async (req, res,next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const decorations = await getAllDecorations({page, perPage,sortBy,
    sortOrder,filter});
  res.status(200).json({
    message: "decorations acquired",
    data: decorations,
  });
};

export const createDecorationController = async (req, res) => {
  const files = req.files;
  let photos = [];

  if (files && files.length > 0) {
    photos = await Promise.all(
      files.map(file => saveFileToCloudinary(file, 'decorations'))
    );
  }

  const decoration = await createDecoration({
    ...req.body,
    images: photos,
  });
  res.status(201).json({
    status: 201,
    message: "Successfully created a decoration",
    data: decoration,
  });
};

export const deleteDecorationController = async (req, res,next) => {
  const { decorationId } = req.params;
   const decoration = await getDecorationById(decorationId);
   if (!decoration) {
  next(createHttpError(404, "decoration not found"));
}
    if (decoration.images?.length > 0) {
    await Promise.all(
      decoration.images.map(image =>
        deleteFileFromCloudinary(image.publicId)
      )
    );
  }
    await deleteDecoration(decorationId);
  res.status(204).send();
};


export const upsertDecorationController = async (req, res, next) => {
  const { decorationId } = req.params;
  const files = req.files;

  let images;

  const existingDecoration = await getDecorationById(decorationId);

  if (files && files.length > 0) {
    if (existingDecoration?.images?.length) {
      await Promise.all(
        existingDecoration.images.map(img =>
          deleteFileFromCloudinary(img.publicId)
        )
      );
    }

    images = await Promise.all(
      files.map(file =>
        saveFileToCloudinary(file, 'decorations')
      )
    );
  }

  const result = await updateDecoration(
    decorationId,
    {
      ...req.body,
      ...(images && { images }),
    },
    { upsert: true }
  );

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Successfully upserted a decoration',
    data: result.decoration,
  });
};

export const patchDecorationController = async (req, res, next) => {
  const { decorationId } = req.params;
  const files = req.files;

  const decoration = await getDecorationById(decorationId);

  if (!decoration) {
    next(createHttpError(404, 'Decoration not found'));
    return;
  }

  let images = [];

  if (files && files.length > 0) {
    if (decoration.images?.length) {
      await Promise.all(
        decoration.images.map(img =>
          deleteFileFromCloudinary(img.publicId)
        )
      );
    }

    images = await Promise.all(
      files.map(file =>
        saveFileToCloudinary(file, 'decorations')
      )
    );
  }

  const result = await updateDecoration(decorationId, {
    ...req.body,
    ...(images && { images }),
  });

  res.json({
    status: 200,
    message: 'Successfully patched a decoration!',
    data: result,
  });
};
