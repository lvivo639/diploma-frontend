import { Box, Typography } from '@material-ui/core';
import React from 'react';

type BasicPaperProps = {
  title?: string;
  subtitle?: string;
};

const BasicPaper: React.FC<BasicPaperProps> = ({
  title,
  subtitle,
  children,
}) => {
  return (
    <Box p={3}>
      {(title || subtitle) && (
        <Box mb={4}>
          <Typography variant="h3">{title}</Typography>
          <Typography>{subtitle}</Typography>
        </Box>
      )}
      {children}
    </Box>
  );
};

export default BasicPaper;
