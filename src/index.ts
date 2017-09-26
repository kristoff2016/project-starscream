import { createServer } from './server';

(async () => {
  const { PORT } = process.env;
  const server = await createServer();
  server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
})();
