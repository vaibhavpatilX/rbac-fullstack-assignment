import { useQuery } from '@tanstack/react-query';
import { getPublicContent, getUserContent, getAdminContent } from '../api/authApi';
import { useAuth } from '../hooks/useAuth';

function ContentCard({
  title,
  badge,
  badgeColor,
  icon,
  data,
  isLoading,
  isError,
}: {
  title: string;
  badge: string;
  badgeColor: string;
  icon: React.ReactNode;
  data?: { message: string; access: string; secret?: string };
  isLoading: boolean;
  isError: boolean;
}) {
  return (
    <div className="card relative overflow-hidden animate-slide-up">
      <div className="absolute top-0 right-0 w-40 h-40 opacity-5 -translate-y-8 translate-x-8">
        {icon}
      </div>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-surface flex items-center justify-center border border-surface-border">
            {icon}
          </div>
          <div>
            <h3 className="font-display font-semibold text-white">{title}</h3>
            <span className={`text-xs px-2 py-0.5 rounded-full font-mono font-medium ${badgeColor}`}>
              {badge}
            </span>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-gray-500 text-sm">
          <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
          Loading content...
        </div>
      )}

      {isError && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-3">
          <p className="text-red-400 text-sm">Failed to load content or insufficient permissions.</p>
        </div>
      )}

      {data && !isLoading && !isError && (
        <div className="space-y-3">
          <p className="text-gray-300 text-sm leading-relaxed">{data.message}</p>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600 font-mono">ACCESS:</span>
            <span className="text-xs text-gray-400 font-mono">{data.access}</span>
          </div>
          {data.secret && (
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
              <p className="text-amber-400 text-xs font-mono">⚡ {data.secret}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const { user, logout } = useAuth();

  const publicQuery = useQuery({
    queryKey: ['public-content'],
    queryFn: getPublicContent,
  });

  const userQuery = useQuery({
    queryKey: ['user-content'],
    queryFn: getUserContent,
    retry: false,
  });

  const adminQuery = useQuery({
    queryKey: ['admin-content'],
    queryFn: getAdminContent,
    retry: false,
  });

  const isAdmin = user?.role === 'ADMIN';

  return (
    <div className="min-h-screen">
      {/* Top nav */}
      <header className="border-b border-surface-border">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-brand-500/20 border border-brand-500/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-brand-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="font-display font-semibold text-white">RBAC System</span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-500 font-semibold text-sm">
                {user?.name?.[0]?.toUpperCase()}
              </div>
              <div className="hidden sm:block">
                <p className="text-sm font-medium text-white">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
            </div>
            <button onClick={logout} className="btn-secondary text-sm px-4 py-2">
              Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-5xl mx-auto px-4 py-10">
        {/* Welcome banner */}
        <div className="mb-10">
          <div className="flex items-center gap-3 mb-1">
            <h1 className="text-4xl font-display font-bold text-white">Dashboard</h1>
            <span className={`px-3 py-1 rounded-full text-xs font-mono font-semibold ${
              isAdmin
                ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                : 'bg-brand-500/20 text-brand-400 border border-brand-500/30'
            }`}>
              {user?.role}
            </span>
          </div>
          <p className="text-gray-400">
            Welcome back, <span className="text-white font-medium">{user?.name}</span>.
            {isAdmin
              ? ' You have full administrative access.'
              : ' You have standard user access.'}
          </p>
        </div>

        {/* Divider */}
        <div className="flex items-center gap-3 mb-6">
          <span className="text-xs font-mono text-gray-600 uppercase tracking-widest">Content Sections</span>
          <div className="flex-1 h-px bg-surface-border" />
        </div>

        {/* Content grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Public */}
          <ContentCard
            title="Public Content"
            badge="PUBLIC"
            badgeColor="bg-green-500/20 text-green-400"
            icon={
              <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            }
            data={publicQuery.data?.data}
            isLoading={publicQuery.isLoading}
            isError={publicQuery.isError}
          />

          {/* User */}
          <ContentCard
            title="User Content"
            badge="USER"
            badgeColor="bg-brand-500/20 text-brand-400"
            icon={
              <svg className="w-5 h-5 text-brand-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
            data={userQuery.data?.data}
            isLoading={userQuery.isLoading}
            isError={userQuery.isError}
          />

          {/* Admin — only shown to ADMIN */}
          {isAdmin ? (
            <ContentCard
              title="Admin Content"
              badge="ADMIN ONLY"
              badgeColor="bg-amber-500/20 text-amber-400"
              icon={
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              }
              data={adminQuery.data?.data}
              isLoading={adminQuery.isLoading}
              isError={adminQuery.isError}
            />
          ) : (
            <div className="card border-dashed flex flex-col items-center justify-center gap-2 min-h-[160px] opacity-40">
              <svg className="w-8 h-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-gray-600 text-sm font-mono">Admin only</p>
            </div>
          )}
        </div>

        {/* Role info */}
        <div className="mt-10 card bg-surface/50">
          <h2 className="font-display font-semibold text-white mb-4">Access Matrix</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-surface-border">
                  <th className="text-left text-gray-500 font-mono py-2 pr-8">Endpoint</th>
                  <th className="text-center text-gray-500 font-mono py-2 px-4">PUBLIC</th>
                  <th className="text-center text-gray-500 font-mono py-2 px-4">USER</th>
                  <th className="text-center text-gray-500 font-mono py-2 px-4">ADMIN</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-surface-border">
                {[
                  { path: '/api/public', pub: true, user: true, admin: true },
                  { path: '/api/user', pub: false, user: true, admin: true },
                  { path: '/api/admin', pub: false, user: false, admin: true },
                ].map((row) => (
                  <tr key={row.path}>
                    <td className="py-3 pr-8 font-mono text-gray-300">{row.path}</td>
                    {[row.pub, row.user, row.admin].map((allowed, i) => (
                      <td key={i} className="text-center py-3 px-4">
                        {allowed ? (
                          <span className="text-green-400">✓</span>
                        ) : (
                          <span className="text-gray-700">✗</span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
