
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <header className="w-full py-4 px-6 bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2">
            <img src="/logo-b.svg" alt="Logo" className="h-8 w-8" />
            <span className="font-bold text-xl text-primary">Zink Bank</span>
          </div>
          <nav>
            <ul className="flex space-x-6">
              <li>
                <Link to="/login" className="text-gray-600 hover:text-primary">
                  Вход
                </Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-600 hover:text-primary">
                  Регистрация
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold mb-6 text-gray-900">Добро пожаловать в Zink Bank!</h1>
          <p className="text-xl text-gray-600 mb-8">Начните использовать наш банковский сервис уже сегодня — создайте бесплатный аккаунт.</p>
          <div className="flex justify-center gap-4">
            <Button asChild size="lg">
              <Link to="/register">Регистрация</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">Вход</Link>
            </Button>
          </div>
        </div>
      </main>

      <footer className="w-full py-6 bg-gray-100 border-t">
        <div className="container mx-auto text-center">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Zink Bank. Все права защищены.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
