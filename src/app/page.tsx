export default function ComingSoon() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white px-6">
      <div className="text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight animate-fade-in">
          Something awesome is coming soon.
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          We&apos;re working hard to launch our new experience. Stay tuned.
        </p>
        <div className="mt-8">
          <span className="inline-block px-6 py-3 text-sm font-medium tracking-wide uppercase bg-white text-gray-900 rounded-full shadow-md hover:shadow-lg transition">
            Notify Me
          </span>
        </div>
      </div>
    </div>
  );
}