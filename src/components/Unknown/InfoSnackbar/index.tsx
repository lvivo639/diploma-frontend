import { Snackbar, Typography } from '@material-ui/core';
import Alert, { Color } from '@material-ui/lab/Alert';
import React from 'react';

type InfoSnackbarProps = {
  text: string;
  setText: (value: string) => void;
  duration?: number;
  severity?: Color;
};

const InfoSnackbar: React.FC<InfoSnackbarProps> = ({
  text,
  setText,
  duration = 3000,
  severity = 'info',
}) => {
  return (
    <Snackbar
      open={!!text}
      autoHideDuration={duration}
      onClose={() => setText('')}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Typography>
        <Alert severity={severity}>{text}</Alert>
      </Typography>
    </Snackbar>
  );
};

export default InfoSnackbar;
