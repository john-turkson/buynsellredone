import { genSalt, hash, compare } from "bcryptjs";

export async function hashPassword(password) {
	try {
		// Generate a salt
		const salt = await genSalt(10);

		// Hash password with the generated salt
		const hashedPassword = await hash(password, salt);
		return hashedPassword;
	} catch (error) {
		throw error;
	}
}

export async function comparePasswords(plainPassword, hashedPassword) {
	try {
		// Compare the plain password with the hashed password
		const match = await compare(plainPassword, hashedPassword);
		return match;
	} catch (error) {
		throw error;
	}
}
