import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen font-sans flex flex-col items-center justify-center">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-6 md:px-12 bg-gradient-to-b from-black/50 to-transparent backdrop-blur-[2px]">
        <div className="text-xl md:text-2xl font-bold text-white tracking-tight">
          FARM MINERALS
        </div>
        <div className="hidden md:flex gap-8 text-sm font-medium text-white/90">
          <Link href="#" className="hover:text-white transition-colors">Technology</Link>
          <Link href="#" className="hover:text-white transition-colors">Products</Link>
          <Link href="#" className="hover:text-white transition-colors">Sustainability</Link>
          <Link href="#" className="hover:text-white transition-colors">About</Link>
        </div>
        <button className="hidden md:block px-5 py-2 text-sm font-medium text-black bg-white rounded-full hover:bg-gray-100 transition-colors">
          Contact Us
        </button>
      </nav>

      {/* Hero Section */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/farm.jpg"
            alt="Farm background"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay to ensure text readability */}
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 md:space-y-8 mt-20">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-tight drop-shadow-2xl">
            Fertilizer, <br className="hidden md:block" />
            Reinvented.
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto font-light leading-relaxed drop-shadow-lg">
            For Your Crops. For the Planet.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-8">
            <button className="px-8 py-4 bg-white text-black text-lg font-medium rounded-full hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg">
              Explore Products
            </button>
            <button className="px-8 py-4 bg-white/10 border border-white/40 text-white text-lg font-medium rounded-full hover:bg-white/20 transition-all backdrop-blur-md shadow-lg">
              Our Technology
            </button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 animate-bounce text-white/70 hover:text-white cursor-pointer transition-colors">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </section>

      {/* Section 2: Better Way (White Background) */}
      <section className="w-full bg-white text-black py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900 leading-tight">
                We found a <br />
                <span className="text-emerald-700">better way.</span>
              </h2>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Traditional fertilizers are inefficient and carbon-intensive. 
                Our next-generation plant nutrition uses carbon-captured fertilizers 
                to boost yields while cutting emissions.
              </p>
              <div className="pt-4">
                <Link href="#" className="group inline-flex items-center text-lg font-semibold text-emerald-700 hover:text-emerald-800 transition-colors">
                  Learn more about our technology
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform">→</span>
                </Link>
              </div>
            </div>
            <div className="relative h-[400px] w-full bg-gray-100 rounded-3xl overflow-hidden shadow-2xl skew-y-1 transform hover:skew-y-0 transition-all duration-700">
               {/* Ideally another image here, using a placeholder colored div for now */}
               <div className="absolute inset-0 bg-gradient-to-br from-emerald-800 to-emerald-950 flex items-center justify-center p-8">
                  <div className="text-center text-white space-y-2">
                    <span className="block text-7xl font-black opacity-30">CO₂</span>
                    <h3 className="text-2xl font-bold">Carbon Negative</h3>
                    <p className="text-sm opacity-70">Turning pollution into plant food.</p>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Products (Light Gray) */}
      <section className="w-full bg-neutral-50 py-24 px-6 md:px-12 lg:px-24 border-t border-neutral-200">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              For Better Plants. <span className="text-gray-400">For Healthier Animals.</span>
            </h2>
            <p className="text-gray-600 text-lg">Next-generation solutions for the modern farm.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
             {/* Card 1 */}
            <div className="group relative bg-white rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
              <div className="space-y-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-emerald-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">CropTab™ NPK</h3>
                <p className="text-gray-600 leading-relaxed">
                  High-performance macronutrient fertilizers powered by zero-emission carbon capsule technology. Designed for maximum uptake.
                </p>
                <div className="pt-8">
                  <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-gray-50 text-gray-900 text-sm font-medium group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300">
                    View Product
                  </span>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="group relative bg-white rounded-3xl p-8 md:p-12 shadow-sm hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 border border-gray-100">
               <div className="space-y-4">
                 <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-6 h-6 text-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">NutriPeak™</h3>
                <p className="text-gray-600 leading-relaxed">
                   Liquid supplements work alongside your main fertilizer to address specific nutrient needs for stronger growth, even in tough soil.
                </p>
                <div className="pt-8">
                  <span className="inline-flex items-center px-5 py-2.5 rounded-full bg-gray-50 text-gray-900 text-sm font-medium group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    View Product
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-emerald-900 text-white py-24 px-6 md:px-12 text-center">
         <div className="max-w-4xl mx-auto space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Ready to transform your yield?</h2>
            <p className="text-emerald-100 text-lg md:text-xl max-w-2xl mx-auto">
              Join the farmers using our science-driven technology to improve soil health and profitability.
            </p>
            <button className="px-10 py-4 bg-white text-emerald-900 text-lg font-bold rounded-full hover:bg-emerald-50 transition-all shadow-xl hover:scale-105">
              Contact Sales
            </button>
         </div>
      </section>

      {/* Footer */}
      <footer className="w-full bg-black text-white py-16 px-6 md:px-12 border-t border-white/10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
             <div className="text-2xl font-bold tracking-tight">FARM MINERALS</div>
             <p className="text-gray-400 text-sm">Innovating agriculture for a sustainable future.</p>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">Products</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">CropTab™ NPK</Link></li>
              <li><Link href="#" className="hover:text-white">NutriPeak™</Link></li>
              <li><Link href="#" className="hover:text-white">ElevateFeed™</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Company</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="#" className="hover:text-white">About Us</Link></li>
              <li><Link href="#" className="hover:text-white">Sustainability</Link></li>
              <li><Link href="#" className="hover:text-white">Careers</Link></li>
              <li><Link href="#" className="hover:text-white">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">Connect</h4>
            <div className="flex gap-4">
              {/* Social placeholders */}
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer"></div>
              <div className="w-8 h-8 bg-gray-800 rounded-full hover:bg-gray-700 cursor-pointer"></div>
            </div>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Farm Minerals Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-white">Privacy Policy</Link>
            <Link href="#" className="hover:text-white">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
