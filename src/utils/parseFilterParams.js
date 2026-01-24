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

const parseIsReadyToGo = (value) => {
  if (!value) return;
  if (typeof value === 'boolean') return value;
  if (typeof value === 'string') {
    const normalized = value.trim().toLowerCase();
    if (normalized === 'true') return true;
    if (normalized === 'false') return false;
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
  const { typeOfDecorations, theme, colors, isReadyToGo } = query;

  const parsedTypeOfDecoration = parseTypeOfDecoration(typeOfDecorations);
  const parsedTheme = parseText(theme);
  const parsedColors= parseTextArray(colors);
  const parsedIsReady= parseIsReadyToGo(isReadyToGo);

  return {
    typeOfDecorations: parsedTypeOfDecoration,
    theme: parsedTheme,
    colors: parsedColors,
    isReadyToGo: parsedIsReady
  };
};

