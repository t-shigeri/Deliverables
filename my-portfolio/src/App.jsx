import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

// import React from 'react';
// import Header from './components/Header';
// import Hero from './components/Hero';
// import About from './components/About';
// import Works from './components/Works';
// import Contact from './components/Contact';
// import Footer from './components/Footer';
// import GithubProfile from './components/GithubProfile';

// function App() {
//   return (
//     <>
//       <Header />
//       <Hero />
//       <About />
//       <Works />
//       <GithubProfile />
//       <Contact />
//       <Footer />
//     </>
//   );
// }

// export default App;
