import React from 'react';

type ErrorScreenProps = {
  text: string;
};

const ErrorScreen: React.FC<ErrorScreenProps> = ({ text }) => {
  return <>{text}</>;
};

export default ErrorScreen;
