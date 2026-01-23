import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/**
 * InputSection 컴포넌트
 * MUI TextField의 variant 조합을 보여주는 섹션
 */
function InputSection() {
  const [values, setValues] = useState({
    standard: '',
    outlined: '',
    filled: ''
  });

  const handleChange = (variant) => (event) => {
    setValues((prev) => ({
      ...prev,
      [variant]: event.target.value
    }));
  };

  const variants = [
    { name: 'standard', label: 'Standard', placeholder: 'Standard 입력' },
    { name: 'outlined', label: 'Outlined', placeholder: 'Outlined 입력' },
    { name: 'filled', label: 'Filled', placeholder: 'Filled 입력' }
  ];

  return (
    <Box sx={{ mb: 4 }}>
      <Typography
        variant="h5"
        component="h2"
        sx={{
          mb: 3,
          fontWeight: 600,
          fontSize: { xs: '1.25rem', md: '1.5rem' }
        }}
      >
        Input
      </Typography>

      <Grid container spacing={3}>
        {variants.map((item) => (
          <Grid key={item.name} size={{ xs: 12, md: 4 }}>
            <TextField
              variant={item.name}
              label={item.label}
              placeholder={item.placeholder}
              value={values[item.name]}
              onChange={handleChange(item.name)}
              fullWidth
            />
            <Typography
              variant="body2"
              sx={{ mt: 1, color: 'text.secondary' }}
            >
              입력값: {values[item.name] || '(없음)'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default InputSection;
