import { api } from "@/utils/api";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: App, loader: async() => {
	const res = await api.users.$get();
	const data = await res.json();
	return data;
} });

function App() {
	const data = Route.useLoaderData();
	return (
		<div>
			<div>{data.users.map((user) => {
				return (
					<div key={user.id}>{user.name}</div>
				)
			})}</div>
		</div>
	)
}
