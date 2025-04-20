
/**
 * Сервис для отправки электронных писем
 * В реальном приложении этот сервис будет взаимодействовать с API
 */

interface UserData {
  username: string;
  email: string;
  registrationTime: string;
}

export const EmailService = {
  /**
   * Отправка кода подтверждения на email пользователя
   * @param email Email пользователя
   * @param code Код подтверждения
   */
  sendVerificationCode: (email: string, code: string): Promise<boolean> => {
    // В реальном приложении здесь будет запрос к API
    console.log(`Отправка кода подтверждения ${code} на адрес ${email}`);
    
    // Имитация асинхронного запроса
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Код успешно отправлен на ${email}`);
        resolve(true);
      }, 500);
    });
  },
  
  /**
   * Отправка данных о регистрации пользователя на email администратора
   * @param userData Данные пользователя
   * @param adminEmail Email администратора
   */
  sendUserDataToAdmin: (userData: UserData, adminEmail: string = "admin@zinkbank.ru"): Promise<boolean> => {
    // В реальном приложении здесь будет запрос к API
    console.log(`Отправка данных пользователя на адрес ${adminEmail}:`, userData);
    
    // Подготовка информации для письма
    const emailSubject = `Новая регистрация: ${userData.username}`;
    const emailBody = `
      Информация о новом пользователе:
      
      Имя пользователя: ${userData.username}
      Email: ${userData.email}
      Дата и время регистрации: ${new Date(userData.registrationTime).toLocaleString()}
    `;
    
    console.log('Заголовок письма:', emailSubject);
    console.log('Тело письма:', emailBody);
    
    // Имитация асинхронного запроса
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Данные успешно отправлены на ${adminEmail}`);
        resolve(true);
      }, 500);
    });
  }
};

export default EmailService;
