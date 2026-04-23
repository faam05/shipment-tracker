import { useEffect } from "react";
import useShipmentStore from "../../store/useShipmentStore";
import Button from "../ui/Button";

const Toast = () => {
  const { notification, clearNotification } = useShipmentStore();

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(clearNotification, 4000);
    return () => clearTimeout(timer);
  }, [notification, clearNotification]);

  if (!notification) return null;

  const styles = {
    success: "bg-green-50 border-green-400 text-green-800",
    error: "bg-red-50 border-red-400 text-red-800",
    info: "bg-blue-50 border-blue-400 text-blue-800",
  };

  const icons = {
    success: "✓",
    error: "✕",
    info: "ℹ",
  };

  const type = notification.type || "info";

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-bounce-once">
      <div className={`flex items-start gap-3 px-4 py-3 rounded-lg border shadow-md max-w-sm ${styles[type]}`}>
        <span className="font-bold text-lg leading-none">{icons[type]}</span>
        <p className="text-sm">{notification.message}</p>
        <Button onClick={clearNotification} className="ml-auto text-xs opacity-60 hover:opacity-100">
          ✕
        </Button>
      </div>
    </div>
  );
};

export default Toast;
