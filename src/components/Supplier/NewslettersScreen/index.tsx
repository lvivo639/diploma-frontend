import { Box, Button, TextField } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import errorToString from '../../../common/errorToString';
import { sendRequest } from '../../../store/auth';
import BasicPaper from '../../Unknown/BasicPaper';
import InfoSnackbar from '../../Unknown/InfoSnackbar';

const NewslettersScreen: React.FC = () => {
  const [text, setText] = React.useState('');

  const handleMsgTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value as string);
  };

  const dispatch = useDispatch();
  const [loading, setLoading] = React.useState(false);
  const [snackbarText, setSnackbarText] = React.useState('');

  const handleSendMessage = async () => {
    setSnackbarText('');
    try {
      setLoading(true);
      await dispatch(
        sendRequest('post', `/supplier-settings/sendNewsletter`, { text }),
      );
    } catch (e) {
      setSnackbarText(errorToString(e));
    }
    setLoading(false);
  };

  return (
    <BasicPaper
      title="Newsletters"
      subtitle="Send message to your dropshippers"
      loading={loading}
    >
      <Box maxWidth={500} display="flex" flexDirection="column">
        <TextField
          id="outlined-multiline-static"
          label="Message Text"
          multiline
          rows={10}
          fullWidth
          variant="outlined"
          value={text}
          onChange={handleMsgTextChange}
        />
        <Box mt={2}>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </Box>
      </Box>
      <InfoSnackbar
        text={snackbarText}
        setText={setSnackbarText}
        severity="error"
      />
    </BasicPaper>
  );
};

export default NewslettersScreen;
