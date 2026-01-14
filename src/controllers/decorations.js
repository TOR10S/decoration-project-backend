import { createDecoration, deleteDecoration, getAllDecorations, updateDecoration } from "../services/decorations.js";
import createHttpError from 'http-errors';
import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";
import { parseFilterParams } from "../utils/parseFilterParams.js";

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
  const decoration = await createDecoration(req.body);
  res.status(201).json({
    status: 201,
    message: `Successfully created a decoration`,
    data: decoration,
  });
};

export const deleteDecorationController = async (req, res,next) => {
  const { decorationId } = req.params;
  const decoration = await deleteDecoration(decorationId);
if (!decoration) {
  next(createHttpError(404, "decoration not found"));
}

  res.status(204).send();
};


export const upsertDecorationController = async (req, res,next) => {
  const { decorationId } = req.params;
  const result = await updateDecoration(decorationId, req.body, {
    upsert: true,
  });

  if (!result) {
    next(createHttpError(404, 'Decoration not found'));
    return;
  }

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: `Successfully upserted a decoration`,
    data: result.student,
  });
};

export const patchDecorationController = async (req, res,next) => {
  const { decorationId } = req.params;
  const result = await updateDecoration(decorationId, req.body);
  if (!result) {
    next(createHttpError(404, 'Student not found'));
    return;
  }

  res.json({
    status: 200,
    message: `Successfully patched a student!`,
    data: result.student,
  });
};
