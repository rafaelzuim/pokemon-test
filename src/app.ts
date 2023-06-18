import express from 'express';
import routes from './routes';

const app = express();
const port = 3000;

// Load routes
app.use(routes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});