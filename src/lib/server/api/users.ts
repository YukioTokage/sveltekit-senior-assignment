import rawUsers from '$lib/server/mocks/users.json';
import { usersFileSchema } from '$lib/schemas';

const allUsers = usersFileSchema.parse(rawUsers);

export function getUserByEmail(email: string) {
	return allUsers.find((user) => user.email === email);
}

export function getUserById(id: string) {
	return allUsers.find((user) => user.id === id);
}
