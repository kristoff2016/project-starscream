import { NestFactory } from '@nestjs/core';

import { ApplicationModule } from './modules/app.module';

const { PORT } = process.env;

(async () => {
  const app = await NestFactory.create(ApplicationModule);
  await app.listen(+PORT!, () => console.log(`Server running on port ${PORT}`));
})();
