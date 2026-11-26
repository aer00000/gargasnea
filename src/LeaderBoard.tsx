import { useEffect, useState } from "react";
import { supabase } from "./supabaseClient";
import styles from "./components/leaderboard/leaderboard.module.css";

// Datan som används i leaderboard
export type LeaderboardUser = {
	id: string;
	username: string;
	times_won: number;
};

// users kan skickas in från en annan komponent. tableName anger vilken tabell i Supabase som ska läsas.
type LeaderBoardProps = {
	users?: LeaderboardUser[];
	tableName?: string;
};

export default function LeaderBoard({
	users,
	tableName = "users",
}: LeaderBoardProps) {
	// Sparar användare hämtade från Supabase när ingen egen users-lista skickas in.
	const [fetchedUsers, setFetchedUsers] = useState<LeaderboardUser[]>([]);
	// Visar laddningstext tills användarna har hämtats eller inkommit som prop.
	const [isLoading, setIsLoading] = useState(!users);
	// Håller reda på om anropet till Supabase misslyckades.
	const [loadError, setLoadError] = useState(false);

	useEffect(() => {
		// Om en färdig users-lista skickas in behövs ingen hämtning från databasen.
		if (users) {
			setIsLoading(false);
			return;
		}

		// Förhindrar att en äldre hämtning uppdaterar state efter att komponenten eller parametrarna har bytts.
		let isCurrent = true;
		setIsLoading(true);
		setLoadError(false);

		async function fetchLeaderboard() {
			// Hämtar top 10 användare
			const { data, error } = await supabase
				.from(tableName)
				.select("id, username, times_won")
				.order("times_won", { ascending: false })
				.limit(10);

			if (!isCurrent) return;

			if (error) {
				//error handling
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

	// Använder inkommande users före hämtade användare, sorterar på vinster och begränsar listan till topp 10.
	const topUsers = [...(users ?? fetchedUsers)]
		.sort((a, b) => Number(b.times_won ?? 0) - Number(a.times_won ?? 0))
		.slice(0, 10);

	return (
		<main className={styles.page}>
			<header className={styles.header}>
				<h1>Leaderboard</h1>
			</header>

			{/*Error grajer */}
			{loadError && (
				<p role="alert" className={styles.error}>
					Could not load the leaderboard.
				</p>
			)}

			<div className={styles.tableWrapper}>
				<table className={styles.table}>
					<thead>
						<tr>
							{/* Kolumninfo */}
							<th scope="col">#</th>
							<th scope="col">Player</th>
							<th scope="col">Wins</th>
						</tr>
					</thead>
					<tbody>
						{isLoading ? (
							// Laddar text
							<tr>
								<td colSpan={3} className={styles.empty}>
									Loading...
								</td>
							</tr>
						) : topUsers.length === 0 ? (
							// Ifall den inte hittar användare
							<tr>
								<td colSpan={3} className={styles.empty}>
									No players to show yet.
								</td>
							</tr>
						) : (
							// Index för placering
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