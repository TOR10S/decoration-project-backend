import { DecorationsCollection } from '../db/models/decoration.js';
import { calculatePaginationData } from '../utils/calcPaginationData.js';
import { SORT_ORDER } from '../constants/index.js';


export const getAllDecorations = async ({ page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',filter = {}, }) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;
  const decorationsQuery = DecorationsCollection.find();
  if (filter.typeOfDecorations) {
    decorationsQuery.where('typeOfDecorations').equals(filter.typeOfDecorations);
  }
  if (filter.theme) {
    decorationsQuery.where('theme').equals(filter.theme);
  }
if (filter.colors && Array.isArray(filter.colors) && filter.colors.length > 0) {
    const andFilters = filter.colors.map(color => ({
      colors: { $regex: color, $options: 'i' }
    }));
    decorationsQuery.and(andFilters);
  }

  const [decorationsCount, decorations] = await Promise.all([
    DecorationsCollection.find().merge(decorationsQuery).countDocuments(),
    decorationsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(decorationsCount, perPage, page);

  return {
    data: decorations,
    ...paginationData,
  };;
};

export const createDecoration = async (payload) => {
  const decoration = await DecorationsCollection.create(payload);
  return decoration;
};

export const deleteDecoration = async (decorationId) => {
  const decoration = await DecorationsCollection.findOneAndDelete({
    _id: decorationId,
  });
  return decoration;
};

export const updateDecoration = async (decorationId, payload, options = {}) => {
  const rawResult = await DecorationsCollection.findOneAndUpdate(
    {_id: decorationId},
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    }
  );
  if (!rawResult || !rawResult.value) return null;

  return {
    decoration: rawResult.value,
    isNew: Boolean(rawResult?.lastErrorObject?.upserted),
  };
};
