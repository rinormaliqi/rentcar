export default function Footer() {
	return (
		<footer className="block">
			<div className="mx-auto w-full max-w-7xl px-5 py-16 md:px-10 md:py-20">
				{/* Divider */}
				<div className="mb-14 mt-16 w-full border-b border-black"></div>

				{/* Bottom Bar */}
				<div className="flex flex-col sm:flex-col-reverse md:flex-row items-center md:items-center justify-between text-center md:text-left gap-4">
					<p className="text-sm sm:text-base">© 2025 PikeMbiPresje. All rights reserved.</p>
					<div className="flex flex-wrap gap-4 justify-center">
						<a href="/terms"
								className="text-sm text-black transition hover:text-[#4682B4]">Terms of Service</a>
									<a href="/license"
								className="text-sm text-black transition hover:text-[#4682B4]">License</a>
									<a href="/privacy"
								className="text-sm text-black transition hover:text-[#4682B4]">Privacy Policy</a>
					</div>
				</div>
			</div>
		</footer>
	);
}
