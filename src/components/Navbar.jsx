"use client";
import { useState, useEffect } from "react";
import { Sheet, SheetTrigger, SheetContent } from "./ui/sheet.jsx";
import ModeToggle from "./ModeToggle.jsx";
import { Menu } from "lucide-react";

const routes = {
	en: {
		home: "/",
		research: "/research",
		people: "/people",
		publications: "/publications",
		news: "/news",
		join: "/join",
		contact: "/contact",
		luke: "/luke",
		brian: "/brian",
		switch: "/fr",
		switchLabel: "Français",
		homeLabel: "Home",
		researchLabel: "Research",
		peopleLabel: "Team",
		publicationsLabel: "Publications",
		newsLabel: "News",
		joinLabel: "Join Us",
		contactLabel: "Contact",
	},
	fr: {
		home: "/fr/",
		research: "/fr/recherche",
		people: "/fr/equipe",
		publications: "/fr/publications",
		news: "/fr/nouvelles",
		join: "/fr/rejoindre",
		contact: "/fr/contact",
		luke: "/fr/luke",
		brian: "/fr/brian",
		switch: "/",
		switchLabel: "English",
		homeLabel: "Accueil",
		researchLabel: "Recherche",
		peopleLabel: "Équipe",
		publicationsLabel: "Publications",
		newsLabel: "Nouvelles",
		joinLabel: "Rejoindre",
		contactLabel: "Contact",
	},
};

// Map paths between languages
const pathMapping = {
	en: {
		"/": "/fr/",
		"/research": "/fr/recherche",
		"/people": "/fr/equipe",
		"/publications": "/fr/publications",
		"/news": "/fr/nouvelles",
		"/join": "/fr/rejoindre",
		"/contact": "/fr/contact",
		"/luke": "/fr/luke",
		"/brian": "/fr/brian",
	},
	fr: {
		"/fr/": "/",
		"/fr": "/",
		"/fr/recherche": "/research",
		"/fr/equipe": "/people",
		"/fr/publications": "/publications",
		"/fr/nouvelles": "/news",
		"/fr/rejoindre": "/join",
		"/fr/contact": "/contact",
		"/fr/luke": "/luke",
		"/fr/brian": "/brian",
	},
};

export default function Navbar({ locale = "en", currentPath = "/" }) {
	const r = routes[locale];

	// Get the language-switched path, defaulting to home if not found
	const switchPath =
		pathMapping[locale][currentPath] || (locale === "en" ? "/fr/" : "/");
	const [scrolled, setScrolled] = useState(false);
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 10);
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const menuItems = [
		"home",
		"research",
		"people",
		"publications",
		"news",
		"join",
		"contact",
	];

	return (
		<nav
			className={`sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-slate-900/70 p-4 transition-shadow ${
				scrolled ? "shadow-sm" : ""
			}`}
		>
			<div className="flex items-center justify-between max-w-7xl mx-auto px-4">
				{/* Logo */}
				<a href={r.home}>
					<img
						src="/assets/logo.png"
						alt="PopGen Lab logo"
						className="h-10 w-auto dark:invert"
						width={120}
						height={40}
						loading="eager"
					/>
				</a>

				{/* Desktop links */}
				<ul className="hidden md:flex space-x-6">
					{menuItems.map((key) => (
						<li key={key}>
							<a
								href={r[key]}
								className="hover:text-primary hover:underline underline-offset-4 decoration-2 transition-colors"
							>
								{r[`${key}Label`]}
							</a>
						</li>
					))}
					<li className="flex items-center space-x-2">
						<ModeToggle />
						<a href={switchPath} className="font-semibold hover:text-highlight">
							{r.switchLabel}
						</a>
					</li>
				</ul>

				{/* Mobile burger */}
				<div className="md:hidden flex items-center space-x-4">
					<ModeToggle />
					<a href={switchPath} className="font-semibold">
						{r.switchLabel}
					</a>
					<Sheet open={open} onOpenChange={setOpen}>
						<SheetTrigger asChild>
							<button aria-label="Open menu">
								<Menu />
							</button>
						</SheetTrigger>
						<SheetContent position="right" className="p-4">
							<ul className="space-y-4">
								{menuItems.map((key) => (
									<li key={key}>
										<a
											href={r[key]}
											onClick={() => setOpen(false)}
											className="block text-lg"
										>
											{r[`${key}Label`]}
										</a>
									</li>
								))}
							</ul>
						</SheetContent>
					</Sheet>
				</div>
			</div>
		</nav>
	);
}
