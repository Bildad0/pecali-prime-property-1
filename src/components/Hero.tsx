import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, MapPin, Home, BedDouble, Bath, SlidersHorizontal } from "lucide-react";
import heroImage from "@/assets/hero-luxury-properties.jpg";
import useLoadSuseMono from "@/lib/useLoadSuseMono";

// Sample property data
const sampleProperties = [
	{
		id: 1,
		location: "Nairobi",
		price: 15000000,
		type: "apartment",
		bedrooms: 3,
		bathrooms: 2,
	},
	// Add more sample properties...
];

const Hero = () => {
	useLoadSuseMono();
	const [isAdvancedSearch, setIsAdvancedSearch] = useState(false);
	const [searchResults, setSearchResults] = useState([]);
	const [searchData, setSearchData] = useState({
		location: "",
		priceRange: "",
		propertyType: "",
		bedrooms: "",
		bathrooms: "",
	});

	const handleSearch = () => {
		// Filter properties based on search criteria
		const results = sampleProperties.filter((property) => {
			const locationMatch =
				!searchData.location ||
				property.location.toLowerCase().includes(searchData.location.toLowerCase());

			const priceMatch = !searchData.priceRange || matchPriceRange(property.price, searchData.priceRange);

			const typeMatch = !searchData.propertyType || property.type === searchData.propertyType;

			const bedroomsMatch = !searchData.bedrooms || property.bedrooms === parseInt(searchData.bedrooms);

			const bathroomsMatch = !searchData.bathrooms || property.bathrooms === parseInt(searchData.bathrooms);

			return locationMatch && priceMatch && typeMatch && bedroomsMatch && bathroomsMatch;
		});

		setSearchResults(results);
		// You can navigate to results page or show results in a modal/section
		console.log("Search results:", results);
	};

	const matchPriceRange = (price: number, range: string) => {
		const ranges = {
			"0-5m": price <= 5000000,
			"5m-10m": price > 5000000 && price <= 10000000,
			"10m-20m": price > 10000000 && price <= 20000000,
			"20m-50m": price > 20000000 && price <= 50000000,
			"50m+": price > 50000000,
		};
		return ranges[range];
	};

	return (
		<section className="relative min-h-screen flex items-center justify-center overflow-hidden">
			{/* Background Image with Overlay */}
			<div className="absolute inset-0">
				<img
					src={heroImage}
					alt="Luxury Properties"
					className="w-full h-full object-cover"
				/>
				<div className="absolute inset-0 bg-gradient-to-r from-primary-dark/90 via-primary/70 to-transparent"></div>
			</div>

			{/* Content */}
			<div className="relative z-10 container mx-auto px-4 pt-24">
				<div className="max-w-4xl mx-auto text-center text-white">
					<h1
						className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-6 animate-slide-up leading-tight"
						style={{
							fontFamily: "'SUSE Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
							letterSpacing: "0.02em",
						}}
					>
						<span className="block">Discover Modern Living</span>
						<span className="bg-gradient-gold bg-clip-text text-transparent block">
							{" "}
							at Its Best{" "}
						</span>
				</h1>
					<div
						className="bg-white/95 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-luxury animate-scale-in"
						style={{ animationDelay: "0.4s" }}
					>
						<div className="flex flex-col md:flex-row gap-3">
							<div className="relative flex-1">
								<MapPin className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
								<Input
									placeholder="Search location..."
									value={searchData.location}
									onChange={(e) => setSearchData({ ...searchData, location: e.target.value })}
									className="pl-10 h-12 border-2 focus:border-primary w-full text-black"
								/>
							</div>
							<Button
								onClick={() => setIsAdvancedSearch(!isAdvancedSearch)}
								variant="outline"
								className="h-12 px-4 md:w-auto w-full text-black"
							>
								<SlidersHorizontal className="h-4 w-4 mr-2" />
								Filters
							</Button>
							<Button
								onClick={handleSearch}
								className="h-12 bg-gradient-primary hover:bg-gradient-luxury shadow-gold text-white md:w-auto w-full"
							>
								<Search className="h-5 w-5 mr-2" />
								Search
							</Button>
						</div>

						<div
							className={`grid grid-cols-1 md:grid-cols-3 gap-3 mt-4 transition-all duration-300 ease-in-out overflow-hidden ${isAdvancedSearch ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
								}`}
						>
							{/* Property Type */}
							<Select
								value={searchData.propertyType}
								onValueChange={(value) => setSearchData({ ...searchData, propertyType: value })}
							>
								<SelectTrigger className="h-12 border-2 focus:border-primary">
									<Home className="h-4 w-4 mr-2" />
									<SelectValue placeholder="Property Type" className="text-black" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="apartment" className="text-black">Apartment</SelectItem>
									<SelectItem value="house" className="text-black">House</SelectItem>
									<SelectItem value="villa" className="text-black">Villa</SelectItem>
									<SelectItem value="land" className="text-black">Land</SelectItem>
									<SelectItem value="commercial" className="text-black">Commercial</SelectItem>
								</SelectContent>
							</Select>

							{/* Price Range */}
							<Select
								value={searchData.priceRange}
								onValueChange={(value) => setSearchData({ ...searchData, priceRange: value })}
							>
								<SelectTrigger className="h-12 border-2 focus:border-primary">
									<SelectValue placeholder="Price Range" className="text-black" />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value="0-5m">Under 5M KES</SelectItem>
									<SelectItem value="5m-10m">5M - 10M KES</SelectItem>
									<SelectItem value="10m-20m">10M - 20M KES</SelectItem>
									<SelectItem value="20m-50m">20M - 50M KES</SelectItem>
									<SelectItem value="50m+">50M+ KES</SelectItem>
								</SelectContent>
							</Select>

							{/* Combined Bed/Bath */}
							<div className="grid grid-cols-2 gap-2">
								<Select
									value={searchData.bedrooms}
									onValueChange={(value) => setSearchData({ ...searchData, bedrooms: value })}
								>
									<SelectTrigger className="h-12 border-2 focus:border-primary">
										<BedDouble className="h-4 w-4 mr-1" />
										<SelectValue placeholder="Beds" />
									</SelectTrigger>
									<SelectContent>
										{["studio","superior studio",1, 2, 3, 4, "5+"].map((num) => (
											<SelectItem key={num} value={String(num)}>
												{num} Bed
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select
									value={searchData.bathrooms}
									onValueChange={(value) => setSearchData({ ...searchData, bathrooms: value })}
								>
									<SelectTrigger className="h-12 border-2 focus:border-primary">
										<Bath className="h-4 w-4 mr-1" />
										<SelectValue placeholder="Baths" />
									</SelectTrigger>
									<SelectContent>
										{[1, 2, 3, 4, "5+"].map((num) => (
											<SelectItem key={num} value={String(num)}>
												{num} Bath
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</div>
						</div>
					</div>

					{/* Statistics */}
					<div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12 animate-slide-up" style={{ animationDelay: "0.6s" }}>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-accent">500+</div>
							<div className="text-white/80">Properties Listed</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-accent">200+</div>
							<div className="text-white/80">Happy Clients</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-accent">5+</div>
							<div className="text-white/80">Years Experience</div>
						</div>
						<div className="text-center">
							<div className="text-3xl md:text-4xl font-bold text-accent">50+</div>
							<div className="text-white/80">Areas Covered</div>
						</div>
					</div>
					<div className="gap-8 mt-32 animate-slide-up" style={{ animationDelay: "1.2s" }}>
						<p
							className="text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 text-white/90 animate-slide-up leading-snug"
							style={{
								animationDelay: "0.2s",
								fontFamily: "'SUSE Mono', ui-monospace, SFMono-Regular, Menlo, Monaco, monospace",
								letterSpacing: "0.02em",
							}}
						>
							Your Gateway to Premium Properties and Investment Opportunities
						</p>
					</div>
				</div>
			</div>

			{/* Floating elements */}
			<div className="absolute bottom-10 left-10 w-20 h-20 bg-accent/20 rounded-full animate-float hidden lg:block"></div>
			<div
				className="absolute top-1/3 right-20 w-16 h-16 bg-primary/20 rounded-full animate-float hidden lg:block"
				style={{ animationDelay: "1s" }}
			></div>
		</section>
	);
};

export default Hero;