import http from 'http';
import { app } from './app';
import environment from './config/environment';
import connectDB from './utils/database';

(async () => {
  const port = environment.port;

  // Make a connection to db
  await connectDB();

  const server = http.createServer(app);

  server.listen(port, () =>
    console.info(`App is running at http://localhost:${port}`)
  );
})();
