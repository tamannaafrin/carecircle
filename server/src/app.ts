import express, { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
import { signup, login, getUserById } from "./controllers/userController";
import connectDB from "./config/db";
import cors from "cors";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
	cors({
		origin: "*",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	})
);

app.use(express.json({ limit: "20mb" }));
app.use(express.urlencoded({ limit: "20mb", extended: true }));

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Content-Type, Authorization"
	);
	next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
	const contentLength = req.headers["content-length"];
	console.log(
		`==> \x1b[33m${req.method} ${req.url}\x1b[0m` +
			" " +
			`\x1b[36mPayload Size: ${
				contentLength ? contentLength + " bytes" : "unknown"
			}\x1b[0m\n`
	);
	next();
});

const startServer = async () => {
	await connectDB();

	app.post("/api/signup", signup);
	app.post("/api/login", login);
	app.get("/api/user/:id", getUserById);

	const PORT = process.env.PORT || 5000;
	app.listen(PORT, () => console.log(`Server Working`));
};

startServer();
