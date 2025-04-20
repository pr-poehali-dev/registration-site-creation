
import { Link } from "react-router-dom";

export const RegistrationHeader = () => {
  return (
    <header className="w-full py-4 px-6 bg-white shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo-b.svg" alt="Logo" className="h-8 w-8" />
          <span className="font-bold text-xl text-primary">МойСайт</span>
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-gray-600 hover:text-primary">
                Главная
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-gray-600 hover:text-primary">
                Вход
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};
