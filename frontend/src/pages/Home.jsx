import Hero from '../components/Hero';

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#0B1120] text-white">
      <main className="flex-grow">
        <Hero />
      </main>
    </div>
  );
};

export default Home;
