// src/components/ModeToggle.jsx
"use client";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import Lottie from "lottie-react";
import wink from "@/assets/lottie/cat-wink.json";

export default function ModeToggle() {
	const [mode, setMode] = useState("system");
	const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

	// detect reduced-motion preference
	useEffect(() => {
		const media = window.matchMedia("(prefers-reduced-motion: reduce)");
		const handler = () => setPrefersReducedMotion(media.matches);
		handler();
		media.addEventListener("change", handler);
		return () => media.removeEventListener("change", handler);
	}, []);

	// determine effective theme
	const resolve = (m) => {
		if (typeof window === "undefined") return "light";
		if (m === "system") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return m;
	};

	// load stored mode on mount
	useEffect(() => {
		const stored = localStorage.getItem("color-mode") || "system";
		setMode(stored);
	}, []);

	// apply theme & persist to localStorage
	useEffect(() => {
		const theme = resolve(mode);
		document.documentElement.classList.toggle("dark", theme === "dark");
		localStorage.setItem("color-mode", mode);
	}, [mode]);

	// choose icon: Lottie wink in dark (unless reduced-motion), Sun fallback, Moon for light
	let icon;
	if (resolve(mode) === "dark") {
		if (prefersReducedMotion) {
			icon = <Sun />;
		} else {
			icon = (
				<Lottie
					animationData={wink}
					autoplay={true}
					loop={false}
					style={{ height: 24, width: 24 }}
				/>
			);
		}
	} else {
		icon = <Moon />;
	}

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
