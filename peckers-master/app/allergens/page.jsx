import { buildPageMetadata } from "../lib/seo";

export async function generateMetadata({ searchParams }) {
  return buildPageMetadata({
    searchParams,
    title: "Allergen Information",
    description:
      "Allergen guidance and safety information for the Peckers menu in Stevenage and Hitchin. Find what's in every dish before you order.",
    keywords: [
      "allergen information",
      "Peckers allergens",
      "food allergy guide",
      "gluten free chicken",
      "dairy free chicken",
      "menu allergens Stevenage",
      "menu allergens Hitchin",
    ],
    path: "/allergens",
  });
}

export default function AllergensPage() {
  return (
    <main className="min-h-screen bg-black text-white px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-peakers text-5xl md:text-7xl mb-12 tracking-tight uppercase">Allergen Information</h1>
        
        <div className="space-y-12 text-white/80 leading-relaxed font-sans text-lg">
          <section className="bg-red-950/20 border-l-4 border-red-600 p-6 rounded-r-lg">
            <h2 className="text-2xl font-bold text-white mb-2 uppercase tracking-wider">Important Warning</h2>
            <p>
              Before placing your order, please inform a member of our team if you have a food allergy or intolerance. 
              Our kitchen handles all 14 major allergens, and while we follow strict procedures, cross-contamination is possible.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 uppercase tracking-wider">Common Allergens in Our Kitchen</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#C41718] rounded-full"></span>
                  <p><strong className="text-white">Gluten:</strong> Found in our fried chicken coating and burger buns.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#C41718] rounded-full"></span>
                  <p><strong className="text-white">Milk/Dairy:</strong> Present in some sauces, sides, and milkshakes.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#C41718] rounded-full"></span>
                  <p><strong className="text-white">Eggs:</strong> Used in our mayo-based sauces and some coatings.</p>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#C41718] rounded-full"></span>
                  <p><strong className="text-white">Soya:</strong> Present in our frying oil and some processed ingredients.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#C41718] rounded-full"></span>
                  <p><strong className="text-white">Sesame:</strong> Some of our burger buns may contain sesame seeds.</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 bg-[#C41718] rounded-full"></span>
                  <p><strong className="text-white">Mustard:</strong> Present in our house-made sauces and marinades.</p>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-4 uppercase tracking-wider">Our Commitment</h2>
            <p>
              We are dedicated to providing clear information to help you enjoy our food safely. 
              Each item in our digital menu clearly lists its primary allergens. 
              If you have any doubts, please ask to speak with the manager on duty.
            </p>
          </section>

          <section className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <p className="text-sm font-mono opacity-60">
                Last updated: March 2024<br />
                Peckers Chicken Ltd, Hertfordshire, UK
              </p>
              <a 
                href="/menu" 
                className="text-white font-mono underline decoration-[#C41718] hover:text-[#f22] transition-colors"
              >
                View Digital Menu with Allergen Tags
              </a>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
