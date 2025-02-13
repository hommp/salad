import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Salad,
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Heart,
  Award,
  Users,
  Flame,
  Dessert,
  Utensils,
  PackageOpenIcon,
} from "lucide-react";

// ---------------------
// Static Data (moved outside the component)
// ---------------------
interface Product {
  name: string;
  price: string;
  description: string;
  image: string;
  tags: string[];
  badge: string;
}

const PRODUCTS: Product[] = [
  {
    name: "Soup Buah",
    price: "10K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/dessert/sopbuah.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Heatly Cendol",
    price: "10K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/dessert/cendol.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Creamy Avosago",
    price: "15K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/dessert/avosago.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Mango Sago",
    price: "15K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/dessert/mango.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Almond Milk",
    price: "20K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/dessert/milk.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Salad Wrap",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/snack/wrap.jpg",
    tags: ["snack"],
    badge: "",
  },
  {
    name: "Chicken Salted Egg (Jumbo Only)",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/ricebox/ricebox.jpg",
    tags: ["ricebox"],
    badge: "",
  },
  {
    name: "Chicken Sambal Matah",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/ricebox/ricebox.jpg",
    tags: ["ricebox"],
    badge: "",
  },
  {
    name: "Chicken Blackpapper",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/ricebox/ricebox.jpg",
    tags: ["ricebox"],
    badge: "",
  },
  {
    name: "Chicken Curry",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/ricebox/ricebox.jpg",
    tags: ["ricebox"],
    badge: "",
  },
  {
    name: "Salad Buah",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/salad/small.jpg",
    tags: ["saladbuah"],
    badge: "",
  },
  {
    name: "Salad Buah",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/salad/medium.jpg",
    tags: ["saladbuah"],
    badge: "",
  },
  {
    name: "Salad Buah",
    price: "35K",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "/assets/salad/jumbo.jpg",
    tags: ["saladbuah"],
    badge: "",
  },
];

interface Category {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
}

const CATEGORIES: Category[] = [
  { id: "all", name: "All", icon: Salad },
  { id: "dessert", name: "Dessert", icon: Dessert },
  { id: "snack", name: "Snack", icon: Utensils },
  { id: "ricebox", name: "Rice Box", icon: PackageOpenIcon },
  { id: "saladbuah", name: "Salad Buah", icon: Flame },
];

// Object map for badge colors
const badgeColors: Record<string, string> = {
  "Most Popular": "bg-red-500",
  New: "bg-blue-500",
  Premium: "bg-purple-500",
  "Healthy Choice": "bg-green-500",
};

const getBadgeColor = (badge: string) => badgeColors[badge] || "bg-gray-500";

// ---------------------
// Main App Component
// ---------------------
function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Use IntersectionObserver for animate-on-scroll
  useEffect(() => {
    const elements = document.querySelectorAll(".animate-on-scroll");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Memoize filtered products so that filtering only runs when the category changes
  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.tags.includes(selectedCategory));
  }, [selectedCategory]);

  // Memoize callback functions to avoid unnecessary re-renders
  const handleWhatsAppOrder = useCallback(
    (productName: string, price: string) => {
      const message = `Hi FreshBowl! I would like to order:\n\n${productName} (Rp ${price})\n\nPlease help me with my order 😊`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/6281234567890?text=${encodedMessage}`,
        "_blank"
      );
    },
    []
  );

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm fixed w-full top-0 z-50">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <img className="w-14" src="/logo.png" alt="logo" />
          </div>
          <div className="flex items-center space-x-6">
            <button
              onClick={() => scrollToSection("home")}
              className="text-gray-600 hover:text-[#9cc90a]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-gray-600 hover:text-[#9cc90a]"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("menu")}
              className="text-gray-600 hover:text-[#9cc90a]"
            >
              Menu
            </button>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <section
        id="home"
        className="container mx-auto px-6 pt-32 pb-16 text-center relative overflow-hidden"
      >
        <div
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&q=80&w=2000')] opacity-5 bg-cover bg-center"
          aria-hidden="true"
        />
        <div className="relative slide-up">
          <h1 className="text-5xl font-bold text-[#fe6704] mb-6">
            Salad
            <br />
            <span className="text-[#9cc90a]">Segar & Sehat </span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Temukan perpaduan sempurna bahan-bahan segar, dipilih dengan cermat
            dan disiapkan setiap hari untuk gaya hidup sehat Anda.
          </p>
          <div className="flex justify-center space-x-4">
            <button
              onClick={() => scrollToSection("menu")}
              className="bg-[#9cc90a] text-white px-8 py-3 rounded-full transition transform hover:scale-105"
            >
              Pesan Sekarang
            </button>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-[#9cc90a] text-[#9cc90a] px-8 py-3 rounded-full hover:bg-green-50 transition flex items-center space-x-2 transform hover:scale-105"
            >
              <MessageCircle className="h-5 w-5" />
              <span>Hubungi kami</span>
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12 animate-on-scroll">
            <h2 className="text-3xl font-bold mb-4">Kisah kami</h2>
            <p className="text-gray-600 max-w-3xl mb-4 mx-auto">
              Dimulai sebagai usaha kecil di 2019, Salad 18 telah tumbuh dengan
              mengutamakan kualitas dan inovasi. Dengan resep turun-temurun dan
              buah-buahan segar, kami berkomitmen menyajikan hidangan sehat yang
              memikat.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center p-6 animate-on-scroll">
              <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform transition hover:rotate-12">
                <Heart className="h-10 w-10 text-[#9cc90a]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Dibuat dengan Cinta
              </h3>
              <p className="text-gray-600">
                Setiap mangkuk dibuat dengan hati-hati dan perhatian terhadap
                detail
              </p>
            </div>

            <div className="text-center p-6 animate-on-scroll">
              <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform transition hover:rotate-12">
                <Award className="h-10 w-10 text-[#9cc90a]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Kualitas Pertama</h3>
              <p className="text-gray-600">
                Kami hanya mengambil buah-buahan segar dengan kualitas terbaik
              </p>
            </div>

            <div className="text-center p-6 animate-on-scroll">
              <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform transition hover:rotate-12">
                <Users className="h-10 w-10 text-[#9cc90a]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">
                Pelanggan yang Bahagia
              </h3>
              <p className="text-gray-600">
                Ribuan pelanggan yang puas dan terus bertambah
              </p>
            </div>
          </div>

          <div className="mt-16 bg-orange-50 rounded-2xl p-8 animate-on-scroll">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Misi kami</h3>
                <p className="text-gray-600 mb-4">
                  Kami berkomitmen menyediakan hidangan sehat, segar, dan
                  bergizi dengan pilihan inovatif. Visi kami adalah menjadi
                  brand healthy food yang dikenal secara nasional dan regional.
                </p>
                <p className="text-gray-600">
                  Kami terus berinovasi dan berkembang dengan menghadirkan
                  produk berkualitas dan pelayanan terbaik untuk Anda.
                </p>
              </div>
              <div className="relative h-64 rounded-xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1490474418585-ba9bad8fd0ea?auto=format&fit=crop&q=80&w=1200"
                  alt="Fresh fruits"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="menu" className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Menu kami</h2>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {CATEGORIES.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all transform hover:scale-105 ${
                  selectedCategory === category.id
                    ? "bg-[#9cc90a] text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 hover:bg-green-50 shadow-md"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span>{category.name}</span>
              </button>
            );
          })}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition transform hover:scale-105 animate-on-scroll"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                {product.badge && (
                  <div
                    className={`absolute top-4 right-4 ${getBadgeColor(
                      product.badge
                    )} text-white px-3 py-1 rounded-full text-sm font-semibold`}
                  >
                    {product.badge}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-4">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-[#9cc90a]">
                    Rp {product.price}
                  </span>
                  <button
                    onClick={() =>
                      handleWhatsAppOrder(product.name, product.price)
                    }
                    className="bg-[#9cc90a] text-white px-6 py-2 rounded-full hover:bg-green-600 transition flex items-center space-x-2"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>Pesan</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-orange-50 py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-sm transform hover:scale-105 transition animate-on-scroll">
              <Phone className="h-8 w-8 text-[#9cc90a]" />
              <div>
                <h3 className="font-semibold">Hubungi Kami</h3>
                <p className="text-gray-600">+62 123 456 789</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-sm transform hover:scale-105 transition animate-on-scroll">
              <Clock className="h-8 w-8 text-[#9cc90a]" />
              <div>
                <h3 className="font-semibold">Jam Buka</h3>
                <p className="text-gray-600">09:00 - 21:00</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-sm transform hover:scale-105 transition animate-on-scroll">
              <MapPin className="h-8 w-8 text-[#9cc90a]" />
              <div>
                <h3 className="font-semibold">Lokasi</h3>
                <p className="text-gray-600">Jakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4">
              <p className="text-gray-600">
                © 2025 Salad 18. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
