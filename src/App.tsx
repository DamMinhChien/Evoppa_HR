import { useAuth } from 'react-oidc-context';

function App() {
  const auth = useAuth();

  // Giao diện khi đang tải (Loading)
  if (auth.isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <span className="material-symbols-outlined text-4xl text-blue-500 animate-spin">
            progress_activity
          </span>
          <p className="text-slate-300 font-medium tracking-wide animate-pulse">Đang kết nối hệ thống SSO...</p>
        </div>
      </div>
    );
  }

  // Giao diện khi có lỗi
  if (auth.error) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950 p-6">
        <div className="glass-panel max-w-md w-full rounded-2xl p-8 text-center border-red-500/30">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-500/20 mb-6">
            <span className="material-symbols-outlined text-4xl text-red-500">
              error
            </span>
          </div>
          <h2 className="text-xl font-bold text-red-400 mb-2">Lỗi xác thực</h2>
          <p className="text-slate-400 mb-6">{auth.error.message}</p>
          <button 
            onClick={() => window.location.reload()}
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white rounded-xl font-medium transition-all duration-200 flex items-center justify-center"
          >
            <span className="material-symbols-outlined mr-2">refresh</span>
            Thử lại
          </button>
        </div>
      </div>
    );
  }

  // Giao diện khi ĐÃ ĐĂNG NHẬP
  if (auth.isAuthenticated) {
    return (
      <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center p-6">
        {/* Background Blobs */}
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '2s' }}></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" style={{ animationDelay: '4s' }}></div>

        {/* Nội dung chính */}
        <div className="glass-panel relative max-w-3xl w-full rounded-3xl p-10 shadow-2xl z-10">
          <div className="flex flex-col md:flex-row items-center justify-between border-b border-slate-700/50 pb-8 mb-8">
            <div>
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm font-semibold tracking-wide mb-3 border border-blue-500/20">
                <span className="w-2 h-2 rounded-full bg-blue-400 mr-2 animate-pulse"></span>
                Evoppa HR System
              </div>
              <h1 className="text-3xl font-bold text-white mb-1 flex items-center">
                <span className="material-symbols-outlined mr-3 text-3xl">corporate_fare</span>
                Cổng Nhân Sự
              </h1>
              <p className="text-slate-400">Bạn đã xác thực thành công qua Keycloak SSO</p>
            </div>
            
            {/* User Profile */}
            <div className="mt-6 md:mt-0 flex items-center bg-slate-800/50 p-4 rounded-2xl border border-slate-700/50">
              <div className="h-12 w-12 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                <span className="material-symbols-outlined text-2xl">person</span>
              </div>
              <div className="ml-4 pr-2">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Xin chào,</p>
                <p className="text-lg font-bold text-white">{auth.user?.profile.preferred_username || 'Ẩn danh'}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-800/50 transition-colors">
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center">
                <span className="material-symbols-outlined text-base mr-2">mail</span>
                Email Address
              </h3>
              <p className="text-white font-medium text-lg">{auth.user?.profile.email || 'Không có email'}</p>
            </div>
            <div className="bg-slate-900/50 p-6 rounded-2xl border border-slate-800/50 hover:bg-slate-800/50 transition-colors">
              <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-2 flex items-center">
                <span className="material-symbols-outlined text-base mr-2">security</span>
                Session State
              </h3>
              <p className="text-emerald-400 font-medium text-lg flex items-center">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 mr-2 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                Active & Secured
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h3 className="text-slate-400 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center">
              <span className="material-symbols-outlined text-base mr-2">key</span>
              Access Token (Gửi xuống Backend API)
            </h3>
            <div className="relative group cursor-text">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative bg-[#0b1120] p-5 rounded-xl border border-slate-700/50 overflow-x-auto h-32 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
                <pre className="text-xs text-slate-300 font-mono leading-relaxed">
                  {auth.user?.access_token}
                </pre>
              </div>
            </div>
          </div>

          <div className="flex justify-end">
            <button 
              onClick={() => void auth.signoutRedirect()}
              className="py-3 px-6 bg-slate-800 hover:bg-slate-700 hover:text-red-400 text-white font-medium rounded-xl border border-slate-700 transition-all duration-200 flex items-center group"
            >
              <span className="material-symbols-outlined mr-2 text-slate-400 group-hover:text-red-400 transition-colors">
                logout
              </span>
              Đăng xuất hệ thống
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Giao diện khi CHƯA ĐĂNG NHẬP (Login Page)
  return (
    <div className="relative min-h-screen bg-slate-950 overflow-hidden flex items-center justify-center p-6">
      {/* Background Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob" style={{ animationDelay: '2s' }}></div>
      
      <div className="glass-panel relative max-w-lg w-full rounded-3xl p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] text-center border-t border-slate-700/50 z-10">
        <div className="mx-auto w-16 h-16 bg-gradient-to-tr from-blue-500 to-indigo-600 rounded-2xl shadow-lg shadow-blue-500/30 flex items-center justify-center mb-6 rotate-3 hover:rotate-6 transition-transform duration-300">
          <span className="material-symbols-outlined text-4xl text-white">
            admin_panel_settings
          </span>
        </div>
        
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 mb-4 tracking-tight">
          Evoppa HR
        </h1>
        <p className="text-slate-400 mb-10 text-base leading-relaxed">
          Đăng nhập một lần (SSO) để truy cập toàn bộ hệ sinh thái nội bộ của Evoppa một cách an toàn.
        </p>
        
        <button 
          onClick={() => void auth.signinRedirect()} 
          className="group relative w-full flex items-center justify-center py-4 px-8 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)]"
        >
          <span>Đăng nhập qua Keycloak</span>
          <span className="material-symbols-outlined ml-3 group-hover:translate-x-1 transition-transform">
            login
          </span>
        </button>
        
        <div className="mt-8 pt-8 border-t border-slate-800/50 text-sm text-slate-500 flex items-center justify-center">
          <span className="material-symbols-outlined text-lg mr-1.5 text-slate-400">
            shield_lock
          </span>
          Secured by Keycloak OAuth 2.0
        </div>
      </div>
    </div>
  );
}

export default App;
