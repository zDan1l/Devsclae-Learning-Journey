import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { api } from "@/utils/api";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => {
		const res = await api.users.$get();
		const data = await res.json();
		return data;
	},
});

function App() {
	const router = useRouter();
	const data = Route.useLoaderData();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");

	async function handleCreateUser() {
		const res = await api.users.$post({
			json: {
				name,
				email,
			},
		});

		const data = await res.json();
		router.invalidate();
		setName("");
		setEmail("");
		return data;
	}

	return (
		<div>
			<div>
				{data.users.map((user) => {
					return <div key={user.id}>{user.name}</div>;
				})}
			</div>
			<div className="p-6 flex gap-1.5">
				<input
					type="text"
					className="border rounded-xl p-2"
					placeholder="name"
					value={name}
					onChange={(e) => setName(e.target.value)}
				/>
				<input
					type="email"
					className="border rounded-xl p-2"
					placeholder="email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>
				<button
					onClick={handleCreateUser}
					className="bg-blue-500 text-center px-4 text-white"
					type="submit"
				>
					Create User
				</button>
			</div>
		</div>
	);
}
