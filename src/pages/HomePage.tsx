import React from 'react';
import { Hero } from '../components/sections/Hero/Hero';
import { WhyUs } from '../components/sections/WhyUs/WhyUs';
import { Products } from '../components/sections/Products/Products';
import { FAQ } from '../components/sections/FAQ/FAQ';
import { Testimonials } from '../components/sections/Testimonials/Testimonials';
import { Contact } from '../components/sections/Contact/Contact';

export const HomePage = () => (
  <>
    <section id="hero"><Hero /></section>
    <section id="whyus"><WhyUs /></section>
    <section id="products"><Products /></section>
    <section id="faq"><FAQ /></section>
    <section id="testimonials"><Testimonials /></section>
    <section id="contact"><Contact /></section>
  </>
);