const parseTypeOfDecoration = (typeOfDecorations) => {
  const isString = typeof typeOfDecorations === 'string';
  if (!isString) return;
  const isTypeOfDecorations = (typeOfDecorations) => ["Фотозона","Комплексний декор"].includes(typeOfDecorations);

  if (isTypeOfDecorations(typeOfDecorations)) return typeOfDecorations;
};

const parseText = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;
  const trimmedValue = value.trim();
  if (trimmedValue.length > 0) {
    return trimmedValue;
  }
};

const parseTextArray = (value) => {
  const isString = typeof value === 'string';
  if (!isString) return;
  const array = value
    .split(',')
    .map((item) => item.trim())
    .filter((item) => item.length > 0);

  return array.length > 0 ? array : undefined;
};

export const parseFilterParams = (query) => {
  const { typeOfDecorations, theme, colors } = query;

  const parsedTypeOfDecoration = parseTypeOfDecoration(typeOfDecorations);
  const parsedTheme = parseText(theme);
  const parsedColors= parseTextArray(colors);

  return {
    typeOfDecorations: parsedTypeOfDecoration,
    theme: parsedTheme,
    colors: parsedColors,
  };
};
