
import { Link } from "react-router-dom";

export const RegistrationFooter = () => {
  return (
    <footer className="w-full py-6 bg-gray-100 border-t">
      <div className="container mx-auto text-center">
        <div className="flex justify-center space-x-6 mb-4">
          <Link to="/about" className="text-gray-600 hover:text-primary text-sm">
            О нас
          </Link>
          <Link to="/terms" className="text-gray-600 hover:text-primary text-sm">
            Условия использования
          </Link>
          <Link to="/privacy" className="text-gray-600 hover:text-primary text-sm">
            Политика конфиденциальности
          </Link>
        </div>
        <p className="text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} МойСайт. Все права защищены.
        </p>
      </div>
    </footer>
  );
};
