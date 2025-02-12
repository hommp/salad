import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Phone,
  Clock,
  MapPin,
  MessageCircle,
  Heart,
  Award,
  Users,
  Dessert,
  LeafyGreen,
  Utensils,
  PackageOpenIcon,
  Salad,
} from "lucide-react";

// ---------------------
// Data & Interfaces
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
    description: "",
    image: "/assets/dessert/sopbuah.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Heatly Cendol",
    price: "10K",
    description: "",
    image: "/assets/dessert/cendol.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Creamy Avosago",
    price: "15K",
    description: "",
    image: "/assets/dessert/avosago.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Mango Sago",
    price: "15K",
    description: "",
    image: "/assets/dessert/mango.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Almond Milk",
    price: "20K",
    description: "",
    image: "/assets/dessert/milk.jpg",
    tags: ["dessert"],
    badge: "",
  },
  {
    name: "Salad Wrap",
    price: "35K",
    description: "",
    image: "/assets/snack/wrap.jpg",
    tags: ["snack"],
    badge: "",
  },
  {
    name: "Ricebox",
    price: "35K",
    description: "",
    image: "/assets/ricebox/ricebox.jpg",
    tags: ["ricebox"],
    badge: "",
  },
  {
    name: "Salad Buah",
    price: "35K",
    description: "",
    image: "/assets/salad/small.jpg",
    tags: ["saladbuah"],
    badge: "small",
  },
  {
    name: "Salad Buah",
    price: "35K",
    description: "",
    image: "/assets/salad/medium.jpg",
    tags: ["saladbuah"],
    badge: "medium",
  },
  {
    name: "Salad Buah",
    price: "35K",
    description: "",
    image: "/assets/salad/jumbo.jpg",
    tags: ["saladbuah"],
    badge: "jumbo",
  },
];

interface Category {
  id: string;
  name: string;
  icon: React.FC<{ className?: string }>;
}

const CATEGORIES: Category[] = [
  { id: "all", name: "All", icon: LeafyGreen },
  { id: "dessert", name: "Dessert", icon: Dessert },
  { id: "snack", name: "Snack", icon: Utensils },
  { id: "ricebox", name: "Rice Box", icon: PackageOpenIcon },
  { id: "saladbuah", name: "Salad Buah", icon: Salad },
];

// Badge color mapping (adjust or extend as needed)
const badgeColors: Record<string, string> = {
  small: "bg-red-500",
  medium: "bg-yellow-500",
  jumbo: "bg-blue-500",
};

const getBadgeColor = (badge: string) => badgeColors[badge] || "bg-gray-500";

// ---------------------
// Custom Hook for Scroll Animations
// ---------------------
// (Ensure you have CSS for the classes `.animate-on-scroll` and `.fade-in`)
const useAnimateOnScroll = () => {
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
    return () => elements.forEach((el) => observer.unobserve(el));
  }, []);
};

// ---------------------
// Header Component
// ---------------------
const Header = ({
  scrollToSection,
}: {
  scrollToSection: (sectionId: string) => void;
}) => (
  <header className="bg-white/90 backdrop-blur-md shadow-sm fixed w-full top-0 z-50">
    <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <img className="h-10" src="/logo.png" alt="Logo" />
      </div>
      <div className="flex items-center space-x-6">
        <button
          onClick={() => scrollToSection("home")}
          className="text-gray-600 hover:text-[#9cc90a] transition"
        >
          Home
        </button>
        <button
          onClick={() => scrollToSection("menu")}
          className="text-gray-600 hover:text-[#9cc90a] transition"
        >
          Menu
        </button>
        <button
          onClick={() => scrollToSection("about")}
          className="text-gray-600 hover:text-[#9cc90a] transition"
        >
          About
        </button>
      </div>
    </nav>
  </header>
);

// ---------------------
// Hero Section Component
// ---------------------
const Hero = ({
  scrollToSection,
}: {
  scrollToSection: (sectionId: string) => void;
}) => (
  <section id="home" className="relative overflow-hidden">
    <div
      className="absolute inset-0 bg-cover bg-center bg-fixed opacity-30"
      style={{ backgroundImage: "url('salad.jpg')" }}
      aria-hidden="true"
    />
    <div className="container mx-auto px-6 pt-32 pb-16 text-center relative">
      <div className="slide-up animate-on-scroll">
        <h1 className="text-5xl font-bold text-[#fe6704] mb-6 drop-shadow-lg">
          One Stop
          <br />
          <span className="text-[#9cc90a]">Healthy Food Brand</span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
          Salad 18 adalah brand healthy food yang menawarkan beragam pilihan
          hidangan sehat dan inovatif. Kami berkomitmen memberikan produk
          berkualitas tinggi dengan bahan segar langsung dari petani.
        </p>
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => scrollToSection("menu")}
            className="bg-[#9cc90a] text-white px-8 py-3 rounded-full hover:bg-green-600 transition transform hover:scale-105"
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
    </div>
  </section>
);

// ---------------------
// About Section Component
// ---------------------
const About = () => (
  <section id="about" className="py-16 bg-white">
    <div className="container mx-auto px-6">
      <div className="text-center mb-12 animate-on-scroll">
        <h2 className="text-3xl font-bold mb-4">Kisah Kami</h2>
        <p className="text-gray-600 max-w-3xl mx-auto">
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
          <h3 className="text-xl font-semibold mb-2">Dibuat dengan Cinta</h3>
          <p className="text-gray-600">
            Setiap mangkuk dibuat dengan perhatian detail.
          </p>
        </div>
        <div className="text-center p-6 animate-on-scroll">
          <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform transition hover:rotate-12">
            <Award className="h-10 w-10 text-[#9cc90a]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Kualitas Terbaik</h3>
          <p className="text-gray-600">
            Menggunakan bahan berkualitas dan segar setiap hari.
          </p>
        </div>
        <div className="text-center p-6 animate-on-scroll">
          <div className="bg-green-50 rounded-full p-4 w-20 h-20 mx-auto mb-4 flex items-center justify-center transform transition hover:rotate-12">
            <Users className="h-10 w-10 text-[#9cc90a]" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Pelanggan Puas</h3>
          <p className="text-gray-600">
            Ribuan pelanggan setia dan terus bertambah.
          </p>
        </div>
      </div>
      <div className="mt-16 bg-green-50 rounded-2xl p-8 animate-on-scroll">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-bold mb-4">Misi Kami</h3>
            <p className="text-gray-600 mb-4">
              Kami berkomitmen menyediakan hidangan sehat, segar, dan bergizi
              dengan pilihan inovatif. Visi kami adalah menjadi brand healthy
              food yang dikenal secara nasional dan regional.
            </p>
            <p className="text-gray-600">
              Kami terus berinovasi dan berkembang dengan menghadirkan produk
              berkualitas dan pelayanan terbaik untuk Anda.
            </p>
          </div>
          <div className="relative h-64 rounded-xl overflow-hidden">
            <img
              src="salad.jpg"
              alt="Misi Kami"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------------
// Products (Menu) Section Component
// ---------------------
interface ProductsProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  handleWhatsAppOrder: (productName: string, price: string) => void;
}

const Products = ({
  selectedCategory,
  setSelectedCategory,
  handleWhatsAppOrder,
}: ProductsProps) => {
  const filteredProducts = useMemo(() => {
    return selectedCategory === "all"
      ? PRODUCTS
      : PRODUCTS.filter((product) => product.tags.includes(selectedCategory));
  }, [selectedCategory]);

  return (
    <section id="menu" className="container mx-auto px-6 py-16">
      <h2 className="text-3xl font-bold text-center mb-12">Menu Kami</h2>
      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {CATEGORIES.map((category) => {
          const Icon = category.icon;
          return (
            <button
              key={category.id}
              onClick={() => setSelectedCategory(category.id)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full transition transform hover:scale-105 ${
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
  );
};

// ---------------------
// Contact Section Component
// ---------------------
const Contact = () => (
  <section className="bg-green-50 py-16">
    <div className="container mx-auto px-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition animate-on-scroll">
          <Phone className="h-8 w-8 text-[#9cc90a]" />
          <div>
            <h3 className="font-semibold">Hubungi Kami</h3>
            <p className="text-gray-600">+62 123 456 789</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition animate-on-scroll">
          <Clock className="h-8 w-8 text-[#9cc90a]" />
          <div>
            <h3 className="font-semibold">Jam Buka</h3>
            <p className="text-gray-600">09:00 - 21:00</p>
          </div>
        </div>
        <div className="flex items-center space-x-4 bg-white p-6 rounded-2xl shadow-md transform hover:scale-105 transition animate-on-scroll">
          <MapPin className="h-8 w-8 text-[#9cc90a]" />
          <div>
            <h3 className="font-semibold">Lokasi</h3>
            <p className="text-gray-600">
              Jl. Basuki Rahmad No.36, Pesantren, Surodikraman, Kec. Ponorogo,
              Kabupaten Ponorogo, Jawa Timur 63419
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ---------------------
// Footer Component
// ---------------------
const Footer = () => (
  <footer className="bg-white border-t">
    <div className="container mx-auto px-6 py-8">
      <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0">
        <p className="text-gray-600">© 2024 Salad 18. All rights reserved.</p>
      </div>
    </div>
  </footer>
);

// ---------------------
// Main App Component
// ---------------------
function App() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Initialize scroll-triggered animations
  useAnimateOnScroll();

  // Opens WhatsApp with a pre-formatted message
  const handleWhatsAppOrder = useCallback(
    (productName: string, price: string) => {
      const message = `Hi Salad 18! I would like to order:\n\n${productName} (Rp ${price})\n\nPlease assist with my order 😊`;
      const encodedMessage = encodeURIComponent(message);
      window.open(
        `https://wa.me/6281234567890?text=${encodedMessage}`,
        "_blank"
      );
    },
    []
  );

  // Smooth scroll to section
  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <Header scrollToSection={scrollToSection} />
      <main className="pt-20">
        <Hero scrollToSection={scrollToSection} />
        <About />
        <Products
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          handleWhatsAppOrder={handleWhatsAppOrder}
        />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
