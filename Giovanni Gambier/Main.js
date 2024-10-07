// MainContent.js
'use client';

import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard.js';
import Modal from './Modal.js'; // Importation du composant de la modale
import { useCart } from './cart/CartContext.js';
import '@/styles/MainContent.scss';
import { FaArrowUp } from 'react-icons/fa';
import RMCarousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import products from '@/config/products.json';

const Carousel = RMCarousel.default ? RMCarousel.default : RMCarousel;
const { specialtyProducts, outdoorPoultryProducts, holidayProducts } = products;

const MainContent = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  const { addToCart } = useCart();

  const responsives = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024
      },
      items: 3,
      partialVisibilityGutter: 40
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0
      },
      items: 1,
      partialVisibilityGutter: 30
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 464
      },
      items: 2,
      partialVisibilityGutter: 30
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Fonction pour ajouter un produit au panier
  const handleAddToCart = (product, quantity) => {
    if (typeof addToCart === 'function') {
      addToCart(product, quantity);
    } else {
      console.error("addToCart n'est pas une fonction");
    }
  };

  const handleShowDetails = (product) => {
    setSavedScrollPosition(window.scrollY); // Sauvegarder la position de défilement
    setSelectedProduct(product);
  };

  const handleCloseModal = () => {
    setSelectedProduct(null);
    window.scrollTo(0, savedScrollPosition); // Restaurer la position de défilement
  };

  return (
    <div>
      {/* NavBar secondaire */}
      <nav className="secondary-nav">
        <p className="nav-description">
          Si vous souhaitez accéder directement à une section de produits qui
          vous intéresse, cliquez sur l'un de ces trois liens.
        </p>
        <ul>
          <li>
            <a href="#specialties">Nos spécialités</a>
          </li>
          <li>
            <a href="#outdoor-poultry">Nos produits de plein air</a>
          </li>
          <li>
            <a href="#holiday-products">Nos produits de fête</a>
          </li>
        </ul>
      </nav>
      {/* Section pour les spécialités */}
      <section id="specialties" className="main-section">
        <h2>Nos spécialités</h2>
        <div className="product-grid">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsives}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {specialtyProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onShowDetails={handleShowDetails}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Section pour les produits de plein air */}
      <section id="outdoor-poultry" className="main-section">
        <h2>Nos produits de plein air</h2>
        <div className="product-grid">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsives}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {outdoorPoultryProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onShowDetails={handleShowDetails}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Section pour les produits de fête */}
      <section id="holiday-products" className="main-section">
        <h2>Nos produits de fête</h2>
        <p className="holiday-products-text">
          Veuillez noter que les produits de cette section sont disponibles
          uniquement sur commande.
        </p>
        <div className="product-grid">
          <Carousel
            additionalTransfrom={0}
            arrows
            autoPlaySpeed={3000}
            centerMode={true}
            className=""
            containerClass="container-with-dots"
            dotListClass=""
            draggable
            focusOnSelect={false}
            itemClass=""
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            renderArrowsWhenDisabled={false}
            renderButtonGroupOutside={false}
            renderDotsOutside={false}
            responsive={responsives}
            rewind={false}
            rewindWithAnimation={false}
            rtl={false}
            shouldResetAutoplay
            showDots={false}
            sliderClass=""
            slidesToSlide={1}
            swipeable
          >
            {holidayProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
                onShowDetails={handleShowDetails}
              />
            ))}
          </Carousel>
        </div>
      </section>

      {/* Modale */}
      {selectedProduct && (
        <Modal
          show={!!selectedProduct}
          onClose={handleCloseModal}
          product={selectedProduct}
        />
      )}

      {/* Conteneur pour la flèche de retour en haut */}
      <div className="scroll-container">
        <button
          className={`scroll-to-top ${showScrollToTop ? 'visible' : ''}`}
          onClick={handleScrollToTop}
        >
          <FaArrowUp />
        </button>
      </div>
    </div>
  );
};

export default MainContent;
