export default function Hero({ text }) {
	return (
		<section
			id="home"
			className="hero-fade relative h-screen w-full bg-fixed bg-center bg-cover"
			style={{ backgroundImage: "url('/assets/hero.jpg')" }}
		>
			{/* Even scrim so white text stays legible across the whole photo */}
			<div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/55" />
			<div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center text-white">
				<h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold leading-[1.02] text-balance [text-shadow:0_2px_16px_rgba(0,0,0,0.3)]">{text.title}</h1>
				<p className="mt-4 text-xl sm:text-2xl">{text.subtitle}</p>
				{text.description && (
					<p className="mt-6 max-w-lg">{text.description}</p>
				)}
			</div>
		</section>
	);
}
