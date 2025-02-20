import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton, useUser, useAuth } from "@clerk/clerk-react";
import Image from "./Image";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();

  useEffect(() => {
    getToken().then((token) => console.log(token));
  }, []);

  return (
    <div className="w-full h-16 sm:h-13 md:h-16 lg:h-16 flex items-center justify-between fixed top-0 md:top-4 lg:top-5 left-0 right-0 bg-white shadow-lg lg:shadow-lg rounded-none md:rounded-3xl lg:rounded-full z-50 mx-auto px-6 sm:px-8 lg:px-12 xl:px-15 max-w-full sm:max-w-7xl backdrop-blur-lg">
      {/* LOGO */}
      <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
        <Image src="logo.jpeg" alt="Lama Logo" w={42} h={42} />
        <span className="text-gray-800">KomodoHub</span>
      </Link>

      {/* MOBILE MENU */}
      <div className="md:hidden flex items-center gap-4">
        {isLoaded && user && <UserButton />}
        <div
          className="cursor-pointer text-4xl text-gray-800"
          onClick={() => setOpen((prev) => !prev)}
        >
          {open ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-gray-800" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          )}
        </div>
      </div>

      {/* MOBILE DROPDOWN */}
      <div
        className={`absolute top-16 right-0 bg-slate-800 text-white p-4 rounded-xl shadow-lg w-48 transition-all ease-in-out transform ${open ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}`}
        style={{ transformOrigin: "top right" }}
      >
        <Link to="/" className="block px-4 py-2 hover:text-green-500 transition-colors" onClick={() => setOpen(false)}>Home</Link>
        <Link to="/posts?sort=trending" className="block px-4 py-2 hover:text-green-500 transition-colors" onClick={() => setOpen(false)}>Trending</Link>
        <Link to="/posts?sort=popular" className="block px-4 py-2 hover:text-green-500 transition-colors" onClick={() => setOpen(false)}>Most Popular</Link>
        {isLoaded && user && (
    <Link 
      to="/write" 
      className="block w-full text-center px-2 py-2 bg-white text-black font-medium rounded-full shadow-md hover:bg-gray-500 hover:text-white active:bg-gray-300 transition-all duration-200"
      onClick={() => setOpen(false)}
    >
      Write
    </Link>
  )}
        <SignedOut>
          <Link to="/login" className="block px-4 py-2 hover:text-green-500 transition-colors">
            <button className="px-6 py-2 rounded-3xl bg-green-700 text-white hover:bg-green-800 transition-colors">Login</button>
          </Link>
        </SignedOut>
      </div>

      {/* DESKTOP MENU */}
      <div className="hidden md:flex items-center gap-8 xl:gap-12 font-medium">
        <Link to="/" className="text-gray-800 hover:text-green-500 transition-colors">Home</Link>
        <Link to="/posts?sort=trending" className="text-gray-800 hover:text-green-500 transition-colors">Trending</Link>
        <Link to="/posts?sort=popular" className="text-gray-800 hover:text-green-500 transition-colors">Most Popular</Link>
        <Link to="/write" className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-600  transition-colors">Write</Link>
        {isLoaded && user ? (
          <UserButton className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-200" />
        ) : (
          <SignedOut>
            <Link to="/login" className="text-gray-800 hover:text-green-500 transition-colors">
              <button className="px-6 py-2 rounded-3xl bg-green-700 text-white hover:bg-green-800 transition-colors">Login</button>
            </Link>
          </SignedOut>
        )}
      </div>
    </div>
  );
};

export default Navbar;
