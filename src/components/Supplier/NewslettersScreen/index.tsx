import { Box, Button, TextField, Typography } from '@material-ui/core';
import React from 'react';

const NewslettersScreen: React.FC = () => {
  const [msgText, setMsgText] = React.useState('');

  const handleMsgTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgText(e.target.value as string);
  };

  return (
    <>
      <Box mb={4}>
        <Typography variant="h3">Newsletters</Typography>
        <Typography>Send message to your dropshippers</Typography>
      </Box>
      <Box maxWidth={500} display="flex" flexDirection="column">
        <TextField
          id="outlined-multiline-static"
          label="Message Text"
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          value={msgText}
          onChange={handleMsgTextChange}
        />
        <Box mt={2}>
          <Button variant="outlined" color="primary">
            Send
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default NewslettersScreen;
