function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-5 bg-white shadow-md">

      {/* Logo */}
      <h1 className="text-2xl font-bold text-blue-600">
        AI Resume Analyzer
      </h1>

      {/* Navigation Links */}
      <ul className="flex gap-8 text-gray-700 font-medium">
        <li className="cursor-pointer hover:text-blue-600">Home</li>
        <li className="cursor-pointer hover:text-blue-600">Features</li>
        <li className="cursor-pointer hover:text-blue-600">About</li>
        <li className="cursor-pointer hover:text-blue-600">Contact</li>
      </ul>

      {/* Buttons */}
      <div className="flex gap-4">
        <button className="px-5 py-2 border rounded-lg hover:bg-gray-100">
          Login
        </button>

        <button className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Register
        </button>
      </div>

    </nav>
  );
}

export default Navbar;