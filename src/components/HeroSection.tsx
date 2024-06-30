// src/components/HeroSection.tsx
// const HeroSection = () => {
//     return (
//       <div className="relative bg-cover bg-center h-96" style={{ backgroundImage: 'url(/assets/images/hero-image.png)' }}>
//         <div className="absolute inset-0 bg-black opacity-50"></div>
//         <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-8">
//           <h1 className="text-5xl font-bold mb-4">Welcome to My Blog</h1>
//           <p className="text-xl mb-6">Sharing my journey and projects in coding and technology.</p>
//           <a href="#recent-posts" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
//             Read More
//           </a>
//         </div>
//       </div>
//     );
//   };
  
//   export default HeroSection;

// src/components/HeroSection.tsx
const HeroSection = () => {
  return (
    <section className="relative text-white p-8 pt-20 flex items-center justify-center" style={{ height: '100vh' }}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/images/hero-image.png)',
          filter: 'blur(5px)', // Apply blur to the background image
          zIndex: 1,
        }}
      />
      <div
        className="absolute inset-0 bg-black opacity-50"
        style={{ zIndex: 2 }}
      />
      <div className="relative text-center" style={{ zIndex: 3 }}>
        <h1 className="text-5xl font-bold">Welcome to AI World</h1>
        <p className="mt-4 text-lg">Your one-stop destination for AI and tech-related blogs.</p>
      </div>
    </section>
  );
};

export default HeroSection;
