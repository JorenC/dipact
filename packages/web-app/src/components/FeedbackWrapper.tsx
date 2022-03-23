import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import React from "react";
import { useTranslation } from "react-i18next";
import useFeedbackWrapper from "../hooks/useFeedbackWrapper";

interface FeedbackWrapperProps {
  children: React.ReactNode;
}

const FeedbackWrapper = ({
  children,
}: FeedbackWrapperProps): React.ReactElement => {
  const { t } = useTranslation();
  const { feedback, handleClose } = useFeedbackWrapper();

  return (
    <>
      {children}
      {feedback.map(({ id, message, severity }) => (
        <Snackbar
          key={id}
          open={true}
          onClose={() => handleClose(id)}
          message={message}
        >
          <Alert severity={severity}>{t(message)}</Alert>
        </Snackbar>
      ))}
    </>
  );
};

export default FeedbackWrapper;