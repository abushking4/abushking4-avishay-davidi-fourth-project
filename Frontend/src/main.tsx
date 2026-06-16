import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Layout } from './Components/LayoutArea/Layout/Layout'
import { CacheProvider } from '@emotion/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './index.css'
import { rtlCache } from './Components/SharedArea/RtlCache/RtlCache';
import { theme } from './Components/SharedArea/Theme/Theme';
import { redirectOnRefreshIfNeeded } from './Utils/RefreshRedirect';


redirectOnRefreshIfNeeded("/new-conversation");

createRoot(document.getElementById('root')!).render(
        <CacheProvider value={rtlCache}>
            <ThemeProvider theme={theme}>
                <BrowserRouter>
                    <CssBaseline />
                    <Layout />
                </BrowserRouter>
            </ThemeProvider>
    </CacheProvider>
)
