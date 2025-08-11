import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  Badge,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home,
  Pets,
  ReportProblem,
  Favorite,
  Article,
  BarChart,
  AccountCircle,
  Login,
  PersonAdd,
  Notifications,
  AdminPanelSettings,
  ExitToApp
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { useNotifications } from '../../hooks/useNotifications';

const Header = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout } = useAuth();
  const { notifications, unreadCount } = useNotifications();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userMenuAnchor, setUserMenuAnchor] = useState(null);
  const [notificationMenuAnchor, setNotificationMenuAnchor] = useState(null);

  const menuItems = [
    { label: 'Início', path: '/', icon: <Home /> },
    { label: 'Animais', path: '/animals', icon: <Pets /> },
    { label: 'Denúncias', path: '/reports', icon: <ReportProblem /> },
    { label: 'Doações', path: '/donations', icon: <Favorite /> },
    { label: 'Blog', path: '/blog', icon: <Article /> },
    { label: 'Estatísticas', path: '/statistics', icon: <BarChart /> },
  ];

  const handleUserMenuOpen = (event) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleNotificationMenuOpen = (event) => {
    setNotificationMenuAnchor(event.currentTarget);
  };

  const handleNotificationMenuClose = () => {
    setNotificationMenuAnchor(null);
  };

  const handleLogout = async () => {
    await logout();
    handleUserMenuClose();
    navigate('/');
  };

  const isActivePath = (path) => {
    return location.pathname === path;
  };

  const renderDesktopMenu = () => (
    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
      {menuItems.map((item) => (
        <Button
          key={item.path}
          component={Link}
          to={item.path}
          color="inherit"
          startIcon={item.icon}
          sx={{
            color: isActivePath(item.path) ? theme.palette.primary.main : 'inherit',
            fontWeight: isActivePath(item.path) ? 600 : 400,
            '&:hover': {
              backgroundColor: 'rgba(76, 175, 80, 0.1)',
            }
          }}
        >
          {item.label}
        </Button>
      ))}
    </Box>
  );

  const renderMobileMenu = () => (
    <Drawer
      anchor="left"
      open={mobileMenuOpen}
      onClose={() => setMobileMenuOpen(false)}
      sx={{
        '& .MuiDrawer-paper': {
          width: 280,
          backgroundColor: theme.palette.background.paper,
        }
      }}
    >
      <Box sx={{ p: 2, borderBottom: `1px solid ${theme.palette.divider}` }}>
        <Typography variant="h6" sx={{ fontWeight: 600, color: theme.palette.primary.main }}>
          🐾 Pet Rescue
        </Typography>
      </Box>
      
      <List>
        {menuItems.map((item) => (
          <ListItem
            key={item.path}
            button
            component={Link}
            to={item.path}
            onClick={() => setMobileMenuOpen(false)}
            sx={{
              backgroundColor: isActivePath(item.path) ? 'rgba(76, 175, 80, 0.1)' : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(76, 175, 80, 0.1)',
              }
            }}
          >
            <ListItemIcon sx={{ color: isActivePath(item.path) ? theme.palette.primary.main : 'inherit' }}>
              {item.icon}
            </ListItemIcon>
            <ListItemText 
              primary={item.label}
              sx={{ 
                color: isActivePath(item.path) ? theme.palette.primary.main : 'inherit',
                '& .MuiListItemText-primary': {
                  fontWeight: isActivePath(item.path) ? 600 : 400
                }
              }}
            />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );

  const renderUserMenu = () => (
    <Menu
      anchorEl={userMenuAnchor}
      open={Boolean(userMenuAnchor)}
      onClose={handleUserMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          minWidth: 200,
          '& .MuiMenuItem-root': {
            px: 2,
            py: 1.5,
          }
        }
      }}
    >
      <MenuItem onClick={() => { navigate('/profile'); handleUserMenuClose(); }}>
        <ListItemIcon>
          <AccountCircle />
        </ListItemIcon>
        Meu Perfil
      </MenuItem>
      
      {user?.role === 'admin' && (
        <MenuItem onClick={() => { navigate('/admin'); handleUserMenuClose(); }}>
          <ListItemIcon>
            <AdminPanelSettings />
          </ListItemIcon>
          Painel Admin
        </MenuItem>
      )}
      
      <MenuItem onClick={handleLogout}>
        <ListItemIcon>
          <ExitToApp />
        </ListItemIcon>
        Sair
      </MenuItem>
    </Menu>
  );

  const renderNotificationMenu = () => (
    <Menu
      anchorEl={notificationMenuAnchor}
      open={Boolean(notificationMenuAnchor)}
      onClose={handleNotificationMenuClose}
      PaperProps={{
        elevation: 3,
        sx: {
          mt: 1.5,
          maxWidth: 350,
          maxHeight: 400,
        }
      }}
    >
      {notifications.length > 0 ? (
        notifications.slice(0, 5).map((notification) => (
          <MenuItem key={notification.id} onClick={handleNotificationMenuClose}>
            <ListItemText
              primary={notification.title}
              secondary={notification.message}
              secondaryTypographyProps={{
                noWrap: true,
                sx: { maxWidth: 250 }
              }}
            />
          </MenuItem>
        ))
      ) : (
        <MenuItem onClick={handleNotificationMenuClose}>
          <ListItemText primary="Nenhuma notificação" />
        </MenuItem>
      )}
    </Menu>
  );

  return (
    <>
      <AppBar 
        position="sticky" 
        elevation={1}
        sx={{
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar sx={{ justifyContent: 'space-between', py: 1 }}>
            {/* Logo e Menu Mobile */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              {isMobile && (
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={() => setMobileMenuOpen(true)}
                  aria-label="menu"
                >
                  <MenuIcon />
                </IconButton>
              )}
              
              <Typography 
                variant="h5" 
                component={Link}
                to="/"
                sx={{ 
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  fontSize: { xs: '1.2rem', md: '1.5rem' }
                }}
              >
                🐾 Pet Rescue
              </Typography>
            </Box>

            {/* Menu Desktop */}
            {!isMobile && renderDesktopMenu()}

            {/* Ações do Usuário */}
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {isAuthenticated ? (
                <>
                  {/* Notificações */}
                  <IconButton
                    color="inherit"
                    onClick={handleNotificationMenuOpen}
                    aria-label={`${unreadCount} notificações não lidas`}
                  >
                    <Badge badgeContent={unreadCount} color="error">
                      <Notifications />
                    </Badge>
                  </IconButton>

                  {/* Avatar do Usuário */}
                  <IconButton
                    onClick={handleUserMenuOpen}
                    sx={{ p: 0.5 }}
                    aria-label="menu do usuário"
                  >
                    <Avatar
                      src={user?.profile_image}
                      sx={{ 
                        width: 40, 
                        height: 40,
                        border: `2px solid ${theme.palette.primary.main}`
                      }}
                    >
                      {user?.name?.charAt(0).toUpperCase()}
                    </Avatar>
                  </IconButton>
                </>
              ) : (
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    component={Link}
                    to="/login"
                    variant="outlined"
                    size="small"
                    startIcon={<Login />}
                    sx={{ 
                      display: { xs: 'none', sm: 'flex' },
                      borderRadius: 2
                    }}
                  >
                    Entrar
                  </Button>
                  
                  <Button
                    component={Link}
                    to="/register"
                    variant="contained"
                    size="small"
                    startIcon={<PersonAdd />}
                    sx={{ borderRadius: 2 }}
                  >
                    Cadastrar
                  </Button>
                </Box>
              )}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Menus */}
      {renderMobileMenu()}
      {renderUserMenu()}
      {renderNotificationMenu()}
    </>
  );
};

export default Header;
