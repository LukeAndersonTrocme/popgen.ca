"use client";
import { useEffect, useState } from "react";

export default function OfflineToast() {
	const [offline, setOffline] = useState(false);

	useEffect(() => {
		const update = () => setOffline(!navigator.onLine);
		window.addEventListener("online", update);
		window.addEventListener("offline", update);
		update();
		return () => {
			window.removeEventListener("online", update);
			window.removeEventListener("offline", update);
		};
	}, []);

	if (!offline) return null;
	return (
		<div className="fixed bottom-4 right-4 bg-cta text-black px-4 py-2 rounded shadow-lg">
			Offline mode: content cached
		</div>
	);
}
