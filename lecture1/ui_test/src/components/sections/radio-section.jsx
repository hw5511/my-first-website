import { useState } from 'react';
import Box from '@mui/material/Box';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

/**
 * RadioSection 컴포넌트
 * MUI Radio 컴포넌트의 다양한 형태를 보여주는 섹션
 */
function RadioSection() {
  const [values, setValues] = useState({
    gender: '',
    size: '',
    color: ''
  });

  const handleChange = (name) => (event) => {
    setValues((prev) => ({
      ...prev,
      [name]: event.target.value
    }));
  };

  const radioGroups = [
    {
      name: 'gender',
      label: '성별',
      options: [
        { value: 'male', label: '남성' },
        { value: 'female', label: '여성' },
        { value: 'other', label: '기타' }
      ]
    },
    {
      name: 'size',
      label: '사이즈',
      options: [
        { value: 'small', label: 'Small' },
        { value: 'medium', label: 'Medium' },
        { value: 'large', label: 'Large' }
      ]
    },
    {
      name: 'color',
      label: '색상',
      options: [
        { value: 'red', label: '빨강' },
        { value: 'green', label: '초록' },
        { value: 'blue', label: '파랑' }
      ]
    }
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
        Radio
      </Typography>

      <Grid container spacing={3}>
        {radioGroups.map((group) => (
          <Grid key={group.name} size={{ xs: 12, md: 4 }}>
            <FormControl>
              <FormLabel>{group.label}</FormLabel>
              <RadioGroup
                value={values[group.name]}
                onChange={handleChange(group.name)}
              >
                {group.options.map((option) => (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    control={<Radio />}
                    label={option.label}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Typography
              variant="body2"
              sx={{ mt: 1, color: 'text.secondary' }}
            >
              선택: {values[group.name] || '(없음)'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default RadioSection;
