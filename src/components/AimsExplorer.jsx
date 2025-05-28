// src/components/AimsExplorer.jsx
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import aims from "@/data/aims.js"; // ← updated import

export default function AimsExplorer() {
	const [active, setActive] = useState(null);

	return (
		<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
			{aims.map((a) => (
				<motion.div
					key={a.id}
					className="relative group cursor-pointer"
					onHoverStart={() => setActive(a.id)}
					onHoverEnd={() => setActive(null)}
					onFocus={() => setActive(a.id)}
					onBlur={() => setActive(null)}
				>
					<img
						src={a.img}
						alt={a.title}
						className="rounded-lg shadow-lg w-full h-56 object-cover"
					/>
					<div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
						<h3 className="text-white text-xl font-semibold">{a.title}</h3>
					</div>
					<AnimatePresence>
						{active === a.id && (
							<motion.div
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: 20 }}
								className="absolute top-full mt-2 p-4 bg-white dark:bg-slate-800 rounded shadow-lg w-72 z-10"
							>
								<p className="text-sm">{a.details}</p>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			))}
		</div>
	);
}
