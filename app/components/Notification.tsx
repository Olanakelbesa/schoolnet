import { motion, AnimatePresence } from 'framer-motion';
import { IoClose } from 'react-icons/io5';

type NotificationType = 'success' | 'error' | 'warning' | 'info';

interface NotificationProps {
  id: number;
  message: string;
  type: NotificationType;
  onClose: (id: number) => void;
}

const Notification: React.FC<NotificationProps> = ({ id, message, type, onClose }) => {
  const typeStyles: Record<NotificationType, string> = {
    success: 'bg-green-500 text-white',
    error: 'bg-red-500 text-white',
    warning: 'bg-yellow-500 text-black',
    info: 'bg-blue-500 text-white',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.3 }}
      className={`p-4 rounded-lg shadow-lg flex items-center gap-4 max-w-md w-full ${typeStyles[type]}`}
    >
      <span className="flex-1">{message}</span>
      <button
        onClick={() => onClose(id)}
        className="text-white hover:text-gray-200 focus:outline-none"
      >
        <IoClose size={24} />
      </button>
    </motion.div>
  );
};

interface NotificationContainerProps {
  notifications: { id: number; message: string; type: NotificationType }[];
  onClose: (id: number) => void;
}

export const NotificationContainer: React.FC<NotificationContainerProps> = ({ notifications, onClose }) => {
  return (
    <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 max-w-md w-full space-y-2">
      <AnimatePresence>
        {notifications.map((notification) => (
          <Notification
            key={notification.id}
            id={notification.id}
            message={notification.message}
            type={notification.type}
            onClose={onClose}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default NotificationContainer;