import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Works from './components/Works';
import Contact from './components/Contact';
import Footer from './components/Footer';
import GithubProfile from './components/GithubProfile';

function App() {
  return (
    <>
      <Header />
      <Hero />
      <About />
      <Works />
      <GithubProfile />
      <Contact />
      <Footer />
    </>
  );
}

export default App;
