import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { HomePage } from './pages/HomePage';
import { CartProvider } from './context/CartContext';

// Placeholder pages (you can expand later)
const ShopPage = () => <div className="py-20 text-center"><h1 className="text-3xl font-heading">Shop</h1></div>;
const AboutPage = () => <div className="py-20 text-center"><h1 className="text-3xl font-heading">About</h1></div>;
const BlogPage = () => <div className="py-20 text-center"><h1 className="text-3xl font-heading">Blog</h1></div>;
const ContactPage = () => <div className="py-20 text-center"><h1 className="text-3xl font-heading">Contact</h1></div>;

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/contact" element={<ContactPage />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;