import { Box } from '@material-ui/core';
import React from 'react';

type EmptyScreenProps = {
  text: string;
};

const EmptyScreen: React.FC<EmptyScreenProps> = ({ text }) => {
  return <Box>{text}</Box>;
};

export default EmptyScreen;
