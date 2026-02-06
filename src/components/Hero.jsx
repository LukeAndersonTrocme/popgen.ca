export default function Hero({ text }) {
	return (
		<section
			id="home"
			className="hero-fade relative h-screen w-full bg-fixed bg-center bg-cover"
			style={{ backgroundImage: "url('/assets/hero.jpg')" }}
		>
			<div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent" />
			<div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center text-white">
				<h1 className="text-7xl lg:text-8xl font-bold">{text.title}</h1>
				<p className="mt-4 text-2xl">{text.subtitle}</p>
				{text.description && (
					<p className="mt-6 max-w-lg">{text.description}</p>
				)}
			</div>
		</section>
	);
}
