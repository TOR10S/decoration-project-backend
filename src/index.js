import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from './constants/index.js';
import { initMongoDB } from './db/initMongoDB.js';
import { startServer } from './server.js';
import { createDir } from './utils/createDir.js';

const bootstrap = async () => {
  await initMongoDB();
    await createDir(TEMP_UPLOAD_DIR);
  await createDir(UPLOAD_DIR);
  startServer();
};

bootstrap();
