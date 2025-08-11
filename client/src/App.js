import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from 'react-query';
import { HelmetProvider } from 'react-helmet-async';

// Contextos
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

// Tema personalizado
import theme from './styles/theme';

// Componentes de Layout
import Header from './components/Layout/Header';
import Footer from './components/Layout/Footer';
import ScrollToTop from './components/Common/ScrollToTop';

// Páginas
import Home from './pages/Home';
import Animals from './pages/Animals';
import AnimalDetail from './pages/AnimalDetail';
import Adoption from './pages/Adoption';
import Reports from './pages/Reports';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Donations from './pages/Donations';
import Campaigns from './pages/Campaigns';
import Statistics from './pages/Statistics';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import Admin from './pages/Admin';
import NotFound from './pages/NotFound';

// Componentes de proteção de rota
import ProtectedRoute from './components/Auth/ProtectedRoute';
import AdminRoute from './components/Auth/AdminRoute';

// Estilos globais
import './styles/global.css';

// Configuração do React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutos
    },
  },
});

function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <NotificationProvider>
              <Router>
                <div className="App">
                  <ScrollToTop />
                  <Header />
                  
                  <main>
                    <Routes>
                      {/* Rotas públicas */}
                      <Route path="/" element={<Home />} />
                      <Route path="/animals" element={<Animals />} />
                      <Route path="/animals/:id" element={<AnimalDetail />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/blog/:slug" element={<BlogPost />} />
                      <Route path="/donations" element={<Donations />} />
                      <Route path="/campaigns" element={<Campaigns />} />
                      <Route path="/statistics" element={<Statistics />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/register" element={<Register />} />

                      {/* Rotas protegidas */}
                      <Route 
                        path="/adoption/:id" 
                        element={
                          <ProtectedRoute>
                            <Adoption />
                          </ProtectedRoute>
                        } 
                      />
                      <Route 
                        path="/profile" 
                        element={
                          <ProtectedRoute>
                            <Profile />
                          </ProtectedRoute>
                        } 
                      />

                      {/* Rotas administrativas */}
                      <Route 
                        path="/admin/*" 
                        element={
                          <AdminRoute>
                            <Admin />
                          </AdminRoute>
                        } 
                      />

                      {/* Página 404 */}
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>

                  <Footer />
                </div>
              </Router>
            </NotificationProvider>
          </AuthProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
