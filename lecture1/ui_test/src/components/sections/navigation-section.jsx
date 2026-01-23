import { useState } from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

/**
 * NavigationSection 컴포넌트
 * MUI AppBar와 Toolbar를 사용한 반응형 네비게이션 섹션
 */
function NavigationSection() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [anchorEl, setAnchorEl] = useState(null);
  const isMenuOpen = Boolean(anchorEl);

  const menuItems = ['홈', '소개', '서비스', '연락처'];

  const handleMenuClick = (menuName) => {
    alert(`${menuName} 메뉴가 클릭되었습니다!`);
    setAnchorEl(null);
  };

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

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
        Navigation
      </Typography>

      <Box sx={{ borderRadius: 1, overflow: 'hidden' }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Logo
            </Typography>

            {isMobile ? (
              <>
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  onClick={handleOpenMenu}
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={isMenuOpen}
                  onClose={handleCloseMenu}
                >
                  {menuItems.map((item) => (
                    <MenuItem
                      key={item}
                      onClick={() => handleMenuClick(item)}
                    >
                      {item}
                    </MenuItem>
                  ))}
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1 }}>
                {menuItems.map((item) => (
                  <Button
                    key={item}
                    color="inherit"
                    onClick={() => handleMenuClick(item)}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            )}
          </Toolbar>
        </AppBar>
      </Box>
    </Box>
  );
}

export default NavigationSection;
