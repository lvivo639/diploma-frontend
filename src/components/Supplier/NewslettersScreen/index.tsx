import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import BasicPaper from '../../Unknown/BasicPaper';

const NewslettersScreen: React.FC = () => {
  const [msgText, setMsgText] = React.useState('');

  const handleMsgTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMsgText(e.target.value as string);
  };

  return (
    <BasicPaper
      title="Newsletters"
      subtitle="Send message to your dropshippers"
    >
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
    </BasicPaper>
  );
};

export default NewslettersScreen;
