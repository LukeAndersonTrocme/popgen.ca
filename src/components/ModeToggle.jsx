"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import { Player } from "lottie-react";
import wink from "@/assets/lottie/cat-wink.json";

export default function ModeToggle() {
	const [mode, setMode] = useState("system");
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	// detect reduced-motion preference
	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		setPrefersReducedMotion(media.matches);
		const handler = () => setPrefersReducedMotion(media.matches);
		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, []);

	// resolve effective theme
	const resolve = (m) => {
		if (typeof window === "undefined") return "light";
		if (m === "system") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return m;
	};

	// load stored mode
	useEffect(() => {
		const stored = localStorage.getItem("color-mode") || "system";
		setMode(stored);
	}, []);

	// apply theme & persist
	useEffect(() => {
		const theme = resolve(mode);
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("color-mode", mode);
	}, [mode]);

	// choose icon: Lottie wink in dark, fallback to Sun if reduced-motion, Moon in light
	const icon =
		resolve(mode) === "dark" ? (
			prefersReducedMotion ? (
				<Sun />
			) : (
				<Player
					autoplay
					loop={false}
					src={wink}
					style={{ height: 24, width: 24 }}
				/>
			)
		) : (
			<Moon />
		);

	return (
		<button
			aria-label="Toggle dark mode"
			className="p-2 rounded focus:outline-none focus:ring-2 focus:ring-primary"
			onClick={() =>
				setMode((prev) =>
					prev === "light" ? "dark" : prev === "dark" ? "system" : "light",
				)
			}
		>
			{icon}
		</button>
	);
}
