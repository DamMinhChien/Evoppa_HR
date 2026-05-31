import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {AuthProvider, type AuthProviderProps} from 'react-oidc-context'

const oidcConfig: AuthProviderProps = {
    authority: import.meta.env.VITE_OIDC_AUTHORITY,
    client_id: import.meta.env.VITE_OIDC_CLIENT_ID,
    redirect_uri: import.meta.env.VITE_OIDC_REDIRECT_URI,
    response_type: 'code',
    scope: 'openid profile email',

    // Hàm này giúp làm sạch URL trình duyệt sau khi đăng nhập xong
    onSigninCallback: () => {
        window.history.replaceState({}, document.title, window.location.pathname);
    }
}

createRoot(document.getElementById('root')!).render(
    <AuthProvider {...oidcConfig}>
        <App/>
    </AuthProvider>
)
