import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";

export type LeaderboardUser = {
	id: string;
	username: string;
	times_won: number;
};

type LeaderBoardProps = {
	users?: LeaderboardUser[];
	tableName?: string;
};

export default function LeaderBoard({
	users,
	tableName = "users",
}: LeaderBoardProps) {
	const [fetchedUsers, setFetchedUsers] = useState<LeaderboardUser[]>([]);
	const [isLoading, setIsLoading] = useState(!users);
	const [loadError, setLoadError] = useState(false);

	useEffect(() => {
		if (users) {
			setIsLoading(false);
			return;
		}

		let isCurrent = true;
		setIsLoading(true);
		setLoadError(false);

		async function fetchLeaderboard() {
			const { data, error } = await supabase
				.from(tableName)
				.select("id, username, times_won")
				.order("times_won", { ascending: false })
				.limit(10);

			if (!isCurrent) return;

			if (error) {
				console.error("Leaderboard error:", error.message);
				setLoadError(true);
			} else {
				setFetchedUsers(data ?? []);
			}

			setIsLoading(false);
		}

		fetchLeaderboard();

		return () => {
			isCurrent = false;
		};
	}, [users, tableName]);

	const topUsers = [...(users ?? fetchedUsers)]
		.sort((a, b) => Number(b.times_won ?? 0) - Number(a.times_won ?? 0))
		.slice(0, 10);

	return (
		<main className="leaderboard-page">
			<header className="leaderboard-header">
				<h1>Leaderboard</h1>
			</header>

			{loadError && <p role="alert">Could not load the leaderboard.</p>}

			<div className="leaderboard-table-wrapper">
				<table className="leaderboard-table">
					<thead>
						<tr>
							<th scope="col">#</th>
							<th scope="col">Player</th>
							<th scope="col">Wins</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							<tr>
								<td colSpan={3} className="leaderboard-empty">
									Loading...
								</td>
							</tr>
						) : topUsers.length === 0 ? (
							<tr>
								<td colSpan={3} className="leaderboard-empty">
									No players to show yet.
								</td>
							</tr>
						) : (
							topUsers.map((user, index) => (
								<tr key={user.id}>
									<td>{index + 1}</td>
									<td>{user.username || "Player"}</td>
									<td>{Number(user.times_won ?? 0)}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</main>
	);
}