import bcrypt from "bcrypt";
import User from "../models/User";

export const signup = async (req: any, res: any) => {
	try {
		const { name, email, password } = req.body;

		if (!name || !email || !password) {
			return res.status(400).json({ message: "All fields are required" });
		}

		const existingUser = await User.findOne({ email });
		if (existingUser) {
			return res
				.status(400)
				.json({ message: "Email is already registered" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		const newUser = await User.create({
			name,
			email,
			password: hashedPassword,
		});

		res.status(201).json({
			message: "User created successfully",
			user: newUser,
		});
	} catch (error: any) {
		res.status(500).json({ message: "Failed to create user", error });
	}
};

export const login = async (req: any, res: any) => {
	try {
		const { email, password } = req.body;

		if (!email || !password) {
			return res
				.status(400)
				.json({ message: "Email and password are required" });
		}

		const user = await User.findOne({ email });
		if (!user) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res
				.status(400)
				.json({ message: "Invalid email or password" });
		}

		res.status(200).json({ message: "Login successful", user });
	} catch (error: any) {
		res.status(500).json({ message: "Failed to login", error });
	}
};

export const getUserById = async (req: any, res: any) => {
	try {
		const user = await User.findById(req.params.id);

		if (!user) {
			return res.status(404).json({ message: "User not found" });
		}

		res.status(200).json(user);
	} catch (error: any) {
		res.status(500).json({ message: "Failed to fetch user", error });
	}
};
