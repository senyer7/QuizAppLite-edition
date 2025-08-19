import { useEffect, useState } from "react";

// timeout - кол-во времени на 1 вопрос
// onTimeout - функция, вызываемая при окончании таймера
// useEffect - нужен здесь для запуска побычных эффектов (таймера)

export default function QuestionTimer({ timeout, onTimeout }) {
  const [remainingTime, setRemainingTime] = useState(timeout);

  // useEffect(() => {}, []) - выполняет что-то один раз когда рендерится компонент
  // setInterval() - запускает цикл, который каждые 100 мс уменьшает remainingTime на 100 мс

  // useEffect(()={}, []) // Из-за пустого массива, запуск происходит только один раз, при первом рендере компонента
  // Каждые 100 мс (милли секунд), меняем состояние (уменьшаем оставшееся время на 50 мс)
  // И если времени осталось < 100 мы останавливаем интервал и возвращаем 0 в remainingTime

  useEffect(() => {
    const interval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev < 100) {
          clearInterval(interval);
          return 0;
        }

        return prev - 50;
      });
    }, 100);
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      onTimeout();
    }
  }, [remainingTime]);

  return <progress max={timeout} value={remainingTime}></progress>;
}
