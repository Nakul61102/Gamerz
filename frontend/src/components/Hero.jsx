const Hero = () => {
  return (
    <div className="flex items-center justify-center h-full py-12">
      <div className="text-center p-8 bg-[#111827] bg-opacity-80 rounded-xl shadow-lg max-w-xl">
        <h1 className="text-5xl font-bold mb-4">Welcome to GamerZone 🎮</h1>
        <p className="text-lg text-gray-300 mb-6">
          Connect with gamers, join communities, and share your gaming moments!
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="/register"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
          >
            Get Started
          </a>
          <a
            href="/login"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg text-lg font-semibold transition duration-300"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
