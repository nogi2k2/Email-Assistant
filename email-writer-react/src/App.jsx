import { useState } from 'react';
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material';
import { ContentCopy } from '@mui/icons-material';
import axios from 'axios';

function App() {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState('');
  const [generatedReply, setGeneratedReply] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    setGeneratedReply('');
    try {
      // Simulate API delay for skeleton effect
      await new Promise((resolve) => setTimeout(resolve, 1500));
      const response = await axios.post('http://localhost:8080/api/email/generate', {
        emailContent,
        tone,
      });
      setGeneratedReply(typeof response.data === 'string' ? response.data : JSON.stringify(response.data));
    } catch (error) {
      setError('Failed to generate email reply. Please make sure the server is running and try again.');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(generatedReply).then(() => {
      setSnackbarOpen(true);
    });
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          sx={{
            p: { xs: 3, md: 5 },
            borderRadius: '16px',
            backgroundColor: 'rgba(32, 32, 36, 0.5)',
            backdropFilter: 'blur(10px)',
            border: '1px solid #323238',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom sx={{ textAlign: 'center', mb: 4, fontWeight: '700' }}>
            Email Reply Generator
          </Typography>

          <Box component="form" noValidate autoComplete="off">
            <InputLabel htmlFor="original-email-content" sx={{ fontWeight: '600', mb: 1 }}>
              Original Email Content
            </InputLabel>
            <TextField
              id="original-email-content"
              fullWidth
              multiline
              rows={8}
              variant="outlined"
              value={emailContent}
              onChange={(e) => setEmailContent(e.target.value)}
              sx={{ mb: 3 }}
            />

            <FormControl fullWidth sx={{ mb: 4 }}>
              <InputLabel>Tone</InputLabel>
              <Select value={tone} label="Tone" onChange={(e) => setTone(e.target.value)}>
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="professional">Professional</MenuItem>
                <MenuItem value="casual">Casual</MenuItem>
                <MenuItem value="friendly">Friendly</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit}
              disabled={!emailContent || loading}
              fullWidth
              size="large"
              sx={{ py: 1.5, fontSize: '1rem' }}
            >
              {loading ? <CircularProgress size={26} color="inherit" /> : 'Generate Reply'}
            </Button>
          </Box>

          {error && (
            <Typography color="error" sx={{ mt: 3, textAlign: 'center' }}>
              {error}
            </Typography>
          )}

          {loading && (
            <Box sx={{ mt: 4 }}>
              <Skeleton variant="text" width="40%" height={32} />
              <Skeleton variant="rectangular" width="100%" height={160} sx={{ mt: 1, borderRadius: '12px' }} />
              <Skeleton variant="text" width="30%" height={40} sx={{ mt: 1 }}/>
            </Box>
          )}

          {!loading && generatedReply && (
            <Box sx={{ mt: 4 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" gutterBottom>
                  Generated Reply
                </Typography>
                <IconButton onClick={handleCopyToClipboard} color="primary">
                  <ContentCopy />
                </IconButton>
              </Box>
              <TextField
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                value={generatedReply}
                InputProps={{
                  readOnly: true,
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#121214', // A slightly darker background for contrast
                  },
                }}
              />
            </Box>
          )}
        </Paper>
      </Container>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        sx={{
          '& .MuiSnackbarContent-root': {
            backgroundColor: '#8257E6',
            color: '#E1E1E6',
            fontWeight: '600',
          },
        }}
      />
    </Box>
  );
}

export default App;