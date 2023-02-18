import { createContext, useCallback, useContext, useState } from "react";
import { Snackbar, Alert, AlertColor } from "@mui/material";

interface FeedbackSettings {
  message: string;
  type?: AlertColor;
  duration?: number;
}

interface NotificationContext {
  showFeedback(data: FeedbackSettings): void;
}

function initPlaceholder() {
  throw new Error(
    "Cannot find notification context. You need to provide it in this part of application."
  );
}

const notificationContext = createContext<NotificationContext>({
  showFeedback: initPlaceholder,
});

interface Props {
  children: JSX.Element;
}

export const NotificationProvider: React.FC<Props> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackSettings>();
  const showFeedback = useCallback(
    ({ message, duration = 2000, type = "success" }: FeedbackSettings) =>
      setFeedback({ message, duration, type }),
    []
  );
  const isFeedback = Boolean(feedback);

  return (
    <notificationContext.Provider value={{ showFeedback }}>
      {children}
      {feedback && (
        <Snackbar
          open={isFeedback}
          onClose={() => setFeedback(undefined)}
          autoHideDuration={feedback?.duration}
        >
          <Alert severity={feedback.type}>{feedback.message}</Alert>
        </Snackbar>
      )}
    </notificationContext.Provider>
  );
};

export const useNotification = () => useContext(notificationContext);
