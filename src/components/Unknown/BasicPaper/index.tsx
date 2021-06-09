import { Box, CircularProgress, Typography } from '@material-ui/core';
import React from 'react';

type BasicPaperProps = {
  title?: string;
  subtitle?: string;
  loading?: boolean;
};

const BasicPaper: React.FC<BasicPaperProps> = ({
  title,
  subtitle,
  loading = false,
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
      {loading ? <CircularProgress /> : <>{children}</>}
    </Box>
  );
};

export default BasicPaper;
