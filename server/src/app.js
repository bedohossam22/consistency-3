import express from 'express';
import authRoutes from "./routes/auth.routes.js"; 
import userRoutes from "./routes/user.routes.js";


const app = express();

app.use(express.json());

// connect your auth routes
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);


app.get('/', (req, res) => {
  res.send('Hello, World!');
});

export default app;