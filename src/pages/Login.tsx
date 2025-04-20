
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Link } from "react-router-dom";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { RegistrationHeader } from "@/components/RegistrationHeader";
import { RegistrationFooter } from "@/components/RegistrationFooter";

const formSchema = z.object({
  email: z.string().email({
    message: "Введите корректный адрес электронной почты",
  }),
  password: z.string().min(1, {
    message: "Пароль обязателен для заполнения",
  }),
  rememberMe: z.boolean().optional(),
});

const Login = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    // В реальной ситуации здесь был бы API запрос для входа
    console.log(values);
    setTimeout(() => {
      setIsSubmitting(false);
      // После успешного входа можно перенаправить на домашнюю страницу
    }, 1500);
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <RegistrationHeader />
      
      <div className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6">Вход в систему</h1>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Электронная почта</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите email" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Пароль</FormLabel>
                    <FormControl>
                      <Input placeholder="Введите пароль" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="rememberMe"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox 
                        checked={field.value} 
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>
                        Запомнить меня
                      </FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <div className="text-right">
                <Link to="/reset-password" className="text-sm text-primary hover:underline">
                  Забыли пароль?
                </Link>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-primary hover:bg-primary/90" 
                disabled={isSubmitting}
              >
                {isSubmitting ? "Вход..." : "Войти"}
              </Button>
            </form>
          </Form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Нет аккаунта?{" "}
              <Link to="/register" className="text-primary hover:underline">
                Зарегистрироваться
              </Link>
            </p>
          </div>
        </div>
      </div>

      <RegistrationFooter />
    </div>
  );
};

export default Login;
