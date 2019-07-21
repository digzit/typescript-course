import app from './app';

const PORT = process.env.API_PORT;

app.listen(PORT, () => {
  console.log(`Find the api server at: http://localhost:${PORT}`);
});
