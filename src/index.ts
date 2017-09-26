import { createServer } from './server';

Error.stackTraceLimit = 5;

(async () => {
  const { PORT } = process.env;
  const server = await createServer();
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
