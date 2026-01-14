import Joi from 'joi';
export const createDecorationSchema = Joi.object({
  typeOfDecorations: Joi.string()
    .valid("Фотозона", "Комплексний декор")
    .required()
    .messages({
      'string.base': 'Тип декорації має бути рядком.',
      'any.only': 'Тип декорації повинен бути одним із: "Фотозона" або "Комплексний декор".',
      'any.required': 'Тип декорації є обов’язковим полем.',
      'string.empty': 'Тип декорації не може бути порожнім.'
    }),
  theme: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Тема має бути рядком.',
      'string.min': 'Тема має містити мінімум {#limit} символи.',
      'string.max': 'Тема має містити максимум {#limit} символів.',
      'any.required': 'Тема є обов’язковим полем.',
      'string.empty': 'Тема не може бути порожньою.'
    }),
  colors: Joi.string()
    .min(3)
    .max(50)
    .required()
    .messages({
      'string.base': 'Кольори мають бути рядком.',
      'string.min': 'Поле кольорів має містити мінімум {#limit} символи.',
      'string.max': 'Поле кольорів має містити максимум {#limit} символів.',
      'any.required': 'Кольори є обов’язковим полем.',
      'string.empty': 'Поле кольорів не може бути порожнім.'
    }),
  images: Joi.array()
    .messages({
      'array.base': 'Поле images має бути масивом.'
    }),
  review: Joi.string()
    .messages({
      'string.base': 'Відгук має бути рядком.'
    }),
});
export const updateDecorationSchema = Joi.object({
  typeOfDecorations: Joi.string()
    .valid("Фотозона", "Комплексний декор")
    .messages({
      'string.base': 'Тип декорації має бути рядком.',
      'any.only': 'Тип декорації повинен бути одним із: "Фотозона" або "Комплексний декор".',
      'string.empty': 'Тип декорації не може бути порожнім.'
    }),
  theme: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Тема має бути рядком.',
      'string.min': 'Тема має містити мінімум {#limit} символи.',
      'string.max': 'Тема має містити максимум {#limit} символів.',
      'string.empty': 'Тема не може бути порожньою.'
    }),
  colors: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.base': 'Кольори мають бути рядком.',
      'string.min': 'Поле кольорів має містити мінімум {#limit} символи.',
      'string.max': 'Поле кольорів має містити максимум {#limit} символів.',
      'string.empty': 'Поле кольорів не може бути порожнім.'
    }),
  images: Joi.array()
    .messages({
      'array.base': 'Поле images має бути масивом.'
    }),
  review: Joi.string()
    .messages({
      'string.base': 'Відгук має бути рядком.'
    }),
});
