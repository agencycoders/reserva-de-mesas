import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-playfair font-bold text-primary">
            Restaurante
          </Link>
          <div className="space-x-4">
            <Link
              to="/admin/login"
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Área Administrativa
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;