import path from 'node:path';

export const SORT_ORDER = {
  ASC: 'asc',
  DESC: 'desc',
};

export const TEMP_UPLOAD_DIR = path.join(process.cwd(), 'temp');
export const UPLOAD_DIR = path.join(process.cwd(), 'uploads');

export const CLOUDINARY = {
  CLOUD_NAME: 'CLOUD_NAME',
  API_KEY: 'API_KEY',
  API_SECRET: 'API_SECRET',
};

export const CLOUDINARY_FOLDERS = {
  DECORATIONS: 'decorations',
  READY_TO_GO: 'ready-to-go-decorations',
  MAGIC_BALL: 'magic-ball',
  GENDER_PARTY: 'gender-party',
};
