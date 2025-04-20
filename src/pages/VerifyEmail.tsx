
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { RegistrationHeader } from "@/components/RegistrationHeader";
import { RegistrationFooter } from "@/components/RegistrationFooter";
import { toast } from "@/components/ui/use-toast";

const formSchema = z.object({
  code: z.string().length(6, {
    message: "Код подтверждения должен содержать 6 цифр",
  }),
});

const VerifyEmail = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [resendDisabled, setResendDisabled] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem('registrationEmail');
    if (!storedEmail) {
      // Если email не найден, перенаправляем на страницу регистрации
      navigate('/register');
      return;
    }
    setEmail(storedEmail);
  }, [navigate]);

  // Обратный отсчет для повторной отправки кода
  useEffect(() => {
    let timer: number | undefined;
    if (resendDisabled && countdown > 0) {
      timer = window.setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
    } else if (countdown === 0) {
      setResendDisabled(false);
      setCountdown(30);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [resendDisabled, countdown]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  // Функция для отправки данных пользователя на специальную почту
  const sendUserDataToAdmin = () => {
    const userData = {
      username: sessionStorage.getItem('registrationUsername'),
      email: sessionStorage.getItem('registrationEmail'),
      registrationTime: new Date().toISOString()
    };

    // В реальном приложении здесь был бы запрос к API для отправки данных
    console.log("Отправка данных пользователя на почту администратора:", userData);
    
    // Имитация отправки данных
    const adminEmail = "admin@zinkbank.ru"; // Адрес для получения данных о регистрациях
    console.log(`Данные успешно отправлены на ${adminEmail}`);
    
    // Очистка данных пользователя из sessionStorage после успешной отправки
    sessionStorage.removeItem('registrationUsername');
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    
    // Проверяем код подтверждения
    const storedCode = sessionStorage.getItem('verificationCode');
    
    setTimeout(() => {
      setIsSubmitting(false);
      
      if (values.code === storedCode) {
        // Отправляем данные пользователя на почту администратора
        sendUserDataToAdmin();
        
        toast({
          title: "Электронная почта подтверждена",
          description: "Регистрация успешно завершена!",
        });
        
        // В реальном приложении здесь был бы запрос на сервер для завершения регистрации
        sessionStorage.removeItem('verificationCode');
        navigate('/login');
      } else {
        toast({
          title: "Неверный код",
          description: "Пожалуйста, проверьте код и попробуйте снова",
          variant: "destructive",
        });
      }
    }, 1000);
  }

  const handleResendCode = () => {
    if (resendDisabled) return;
    
    // Генерируем новый код
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    sessionStorage.setItem('verificationCode', newCode);
    
    // В реальном приложении здесь был бы запрос на повторную отправку кода
    console.log(`Новый код подтверждения для ${email}: ${newCode}`);
    
    toast({
      title: "Код отправлен повторно",
      description: `Новый код подтверждения отправлен на ${email}`,
    });
    
    setResendDisabled(true);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RegistrationHeader />
      
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Подтверждение email</h1>
          
          <p className="text-center text-gray-600 mb-6">
            Мы отправили код подтверждения на адрес<br />
            <span className="font-medium text-gray-800">{email}</span>
          </p>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem className="space-y-4">
                    <FormLabel className="text-center block">Введите 6-значный код</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Проверка..." : "Подтвердить"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 mb-2">
              Не получили код?
            </p>
            <Button 
              variant="link" 
              onClick={handleResendCode}
              disabled={resendDisabled}
              className="text-primary p-0 h-auto"
            >
              {resendDisabled 
                ? `Отправить повторно (${countdown}с)` 
                : "Отправить повторно"}
            </Button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-200">
            <p className="text-sm text-center text-gray-600">
              <Link to="/register" className="text-primary hover:underline">
                Вернуться к регистрации
              </Link>
            </p>
          </div>
        </div>
      </div>

      <RegistrationFooter />
    </div>
  );
};

export default VerifyEmail;
