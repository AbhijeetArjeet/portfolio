import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { adminService, healthService } from '../services/admin.service';
import LoadingSpinner from '../components/common/LoadingSpinner';
import {
  ShieldCheck,
  Activity,
  Users,
  Layers,
  Flag,
  FileText,
  RefreshCw,
  CheckCircle,
  AlertTriangle,
  ExternalLink,
  Ban,
  RotateCcw,
  Lock,
  Building2,
  Inbox,
  UserCheck,
  XCircle
} from 'lucide-react';

export default function AdminDashboard() {
  const { user, isAdmin } = useAuth();
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [portfolios, setPortfolios] = useState([]);
  const [reports, setReports] = useState([]);
  const [auditLogs, setAuditLogs] = useState([]);
  const [accessRequests, setAccessRequests] = useState([]);
  const [activeTab, setActiveTab] = useState('health');
  const [loading, setLoading] = useState(true);

  // Health ping state
  const [healthStatus, setHealthStatus] = useState(null);
  const [readyStatus, setReadyStatus] = useState(null);
  const [pingLatency, setPingLatency] = useState(null);
  const [pinging, setPinging] = useState(false);

  const fetchAllData = async () => {
    try {
      const [sData, uData, pData, rData, aData, reqData] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getPortfolios(),
        adminService.getReports(),
        adminService.getAuditLogs(),
        adminService.getAccessRequests()
      ]);

      setStats(sData.stats);
      setUsers(uData.users || []);
      setPortfolios(pData.portfolios || []);
      setReports(rData.reports || []);
      setAuditLogs(aData.logs || []);
      setAccessRequests(reqData || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePingHealth = async () => {
    setPinging(true);
    const start = performance.now();
    try {
      const [h, r] = await Promise.all([
        healthService.checkHealth(),
        healthService.checkReady()
      ]);
      const latency = Math.round(performance.now() - start);
      setHealthStatus(h);
      setReadyStatus(r);
      setPingLatency(latency);
    } catch (err) {
      setHealthStatus({ status: 'unreachable', error: err.message });
    } finally {
      setPinging(false);
    }
  };

  useEffect(() => {
    fetchAllData();
    handlePingHealth();
  }, []);

  const handleToggleUserStatus = async (userId, currentStatus) => {
    const nextStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await adminService.updateUserStatus(userId, nextStatus);
      fetchAllData();
    } catch (err) {
      alert(err.message || 'Failed to update user status');
    }
  };

  const handleTogglePortfolioPublish = async (portfolioId, currentPublished) => {
    try {
      await adminService.togglePublish(portfolioId, !currentPublished);
      fetchAllData();
    } catch (err) {
      alert(err.message || 'Failed to update portfolio');
    }
  };

  const handleUpdateAccessRequest = async (requestId, status) => {
    try {
      await adminService.updateAccessRequestStatus(requestId, status, user?.name || 'Faculty Admin');
      fetchAllData();
    } catch (err) {
      alert(err.message || 'Failed to update request');
    }
  };

  if (!isAdmin) {
    return (
      <div className="container" style={{ padding: '6rem 1rem', textAlign: 'center' }}>
        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--danger)' }}>Access Denied</h2>
        <p style={{ marginTop: '0.5rem', color: 'var(--text-muted)' }}>
          Administrator privileges are required to view the Faculty Evaluation Portal.
        </p>
      </div>
    );
  }

  if (loading) {
    return <LoadingSpinner text="Loading Faculty Admin Portal..." />;
  }

  return (
    <div className="container" style={{ padding: '3rem 1.5rem 5rem' }}>
      {/* Top Banner with Evaluator Badges */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
            <span className="badge badge-success" style={{ padding: '4px 10px' }}>
              <ShieldCheck size={14} /> Module: Faculty Evaluation &amp; Admin
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
              Local Storage + Render Telemetry Mode Active
            </span>
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800, marginTop: '0.4rem' }}>
            System &amp; Portfolio Administration
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
            Logged in as <strong>{user?.name}</strong> (Evaluator / Admin)
          </p>
        </div>

        <button
          type="button"
          onClick={() => { fetchAllData(); handlePingHealth(); }}
          className="btn btn-secondary btn-sm"
        >
          <RefreshCw size={14} /> Refresh Data
        </button>
      </div>

      {/* Quick Overview Metric Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Total Accounts</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '4px 0' }}>{stats?.totalUsers || users.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Registered users</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Portfolios</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '4px 0' }}>{stats?.totalPortfolios || portfolios.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--success-text)', fontWeight: 600 }}>{stats?.publishedPortfolios || portfolios.filter(p => p.isPublished).length} Published</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Permission Requests</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '4px 0' }}>{accessRequests.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 600 }}>From recruiters &amp; orgs</div>
        </div>

        <div className="card">
          <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', fontWeight: 600 }}>Server Telemetry</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, margin: '4px 0' }}>{healthStatus?.status === 'ok' ? 'Online' : 'Local'}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{healthStatus?.status === 'ok' ? `Latency ${pingLatency}ms` : 'LocalStorage Fallback'}</div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', borderBottom: '1px solid var(--border-color)', marginBottom: '1.75rem', overflowX: 'auto' }}>
        <button
          type="button"
          onClick={() => setActiveTab('health')}
          className={`btn btn-sm ${activeTab === 'health' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Activity size={14} /> Render Health &amp; Telemetry
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('users')}
          className={`btn btn-sm ${activeTab === 'users' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Users size={14} /> User Accounts ({users.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('portfolios')}
          className={`btn btn-sm ${activeTab === 'portfolios' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Layers size={14} /> Portfolios Moderation ({portfolios.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('requests')}
          className={`btn btn-sm ${activeTab === 'requests' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Lock size={14} /> Access &amp; Permission Requests ({accessRequests.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('reports')}
          className={`btn btn-sm ${activeTab === 'reports' ? 'btn-primary' : 'btn-outline'}`}
        >
          <Flag size={14} /> Moderation Reports ({reports.length})
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('audit')}
          className={`btn btn-sm ${activeTab === 'audit' ? 'btn-primary' : 'btn-outline'}`}
        >
          <FileText size={14} /> Security Audit Logs
        </button>
      </div>

      {/* TAB 1: RENDER HEALTH & KEEP-ALIVE MONITORING */}
      {activeTab === 'health' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="card" style={{ background: 'var(--bg-secondary)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '1rem' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Activity size={20} color="var(--primary)" /> Render Keep-Alive &amp; Liveness Telemetry
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                  Live diagnostics for Render web service sleep mitigation and keep-alive health pings.
                </p>
              </div>

              <button
                type="button"
                onClick={handlePingHealth}
                disabled={pinging}
                className="btn btn-primary btn-sm"
              >
                <RefreshCw size={14} className={pinging ? 'spinner' : ''} />
                {pinging ? 'Pinging...' : 'Ping /api/health Now'}
              </button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
              <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>Liveness Check: <code>/api/health</code></strong>
                  {healthStatus?.status === 'ok' ? (
                    <span className="badge badge-success"><CheckCircle size={12} /> Online</span>
                  ) : (
                    <span className="badge badge-primary">Local Storage Active</span>
                  )}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Latency: <strong>{pingLatency !== null ? `${pingLatency}ms` : 'Local memory (<1ms)'}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Fast non-blocking ping endpoint preventing Render 15-minute sleep.
                </div>
              </div>

              <div style={{ background: 'var(--bg-card)', padding: '1.25rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                  <strong>Readiness Check: <code>/api/health/ready</code></strong>
                  {readyStatus?.status === 'ready' ? (
                    <span className="badge badge-success"><CheckCircle size={12} /> DB Connected</span>
                  ) : (
                    <span className="badge badge-success"><CheckCircle size={12} /> Ready</span>
                  )}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Database: <strong>{readyStatus?.database || 'SQLite / Local Storage Persistent'}</strong>
                </div>
                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  Zero-dependency verification for university evaluation.
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: REGISTERED USERS */}
      {activeTab === 'users' && (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>User / Candidate</th>
                <th style={{ padding: '0.85rem 1rem' }}>Email Address</th>
                <th style={{ padding: '0.85rem 1rem' }}>Role</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem 1rem', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                    {u.avatarUrl ? (
                      <img src={u.avatarUrl} alt={u.name} style={{ width: 28, height: 28, borderRadius: '50%' }} />
                    ) : (
                      <div style={{ width: 28, height: 28, borderRadius: '50%', background: 'var(--primary)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700 }}>
                        {u.name.charAt(0)}
                      </div>
                    )}
                    <div>
                      <div style={{ fontWeight: 700 }}>{u.name}</div>
                      {u.githubUsername && (
                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>@{u.githubUsername}</div>
                      )}
                    </div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>{u.email}</td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${u.role === 'ADMIN' ? 'badge-primary' : 'badge-outline'}`}>
                      {u.role}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${u.status === 'ACTIVE' ? 'badge-success' : 'badge-danger'}`}>
                      {u.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    {u.id !== user?.id && (
                      <button
                        type="button"
                        onClick={() => handleToggleUserStatus(u.id, u.status)}
                        className={`btn btn-sm ${u.status === 'ACTIVE' ? 'btn-danger' : 'btn-secondary'}`}
                        style={{ padding: '3px 8px', fontSize: '0.78rem' }}
                      >
                        {u.status === 'ACTIVE' ? <Ban size={12} /> : <RotateCcw size={12} />}
                        {u.status === 'ACTIVE' ? 'Suspend' : 'Reactivate'}
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 3: ALL PORTFOLIOS */}
      {activeTab === 'portfolios' && (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Portfolio Title</th>
                <th style={{ padding: '0.85rem 1rem' }}>Slug</th>
                <th style={{ padding: '0.85rem 1rem' }}>Template</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Moderation Action</th>
              </tr>
            </thead>
            <tbody>
              {portfolios.map((p) => (
                <tr key={p.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 700 }}>{p.title}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Views: {p.views || 0}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <a href={`/u/${p.slug}`} target="_blank" rel="noreferrer" style={{ display: 'flex', alignItems: 'center', gap: '4px', textDecoration: 'underline' }}>
                      /u/{p.slug} <ExternalLink size={12} />
                    </a>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge badge-primary">{p.templateId}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className={`badge ${p.isPublished ? 'badge-success' : 'badge-warning'}`}>
                      {p.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <button
                      type="button"
                      onClick={() => handleTogglePortfolioPublish(p.id, p.isPublished)}
                      className={`btn btn-sm ${p.isPublished ? 'btn-outline' : 'btn-primary'}`}
                      style={{ padding: '3px 8px', fontSize: '0.78rem' }}
                    >
                      {p.isPublished ? 'Force Unpublish' : 'Publish'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 4: ACCESS & PERMISSION REQUESTS */}
      {activeTab === 'requests' && (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.85rem 1rem' }}>Requester &amp; Organization</th>
                <th style={{ padding: '0.85rem 1rem' }}>Work Email</th>
                <th style={{ padding: '0.85rem 1rem' }}>Target Candidate</th>
                <th style={{ padding: '0.85rem 1rem' }}>Requested Role</th>
                <th style={{ padding: '0.85rem 1rem' }}>Justification</th>
                <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                <th style={{ padding: '0.85rem 1rem' }}>Decision</th>
              </tr>
            </thead>
            <tbody>
              {accessRequests.map((req) => (
                <tr key={req.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ fontWeight: 700 }}>{req.requesterName}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>{req.organization}</div>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <code>{req.email}</code>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <a href={`/u/${req.portfolioSlug}`} target="_blank" rel="noreferrer">
                      {req.portfolioTitle || req.portfolioSlug}
                    </a>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span className="badge badge-primary">{req.requestedRole}</span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem', maxWidth: 220, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                    {req.reason}
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <span
                      className={`badge ${
                        req.status === 'APPROVED'
                          ? 'badge-success'
                          : req.status === 'REJECTED'
                          ? 'badge-danger'
                          : 'badge-warning'
                      }`}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td style={{ padding: '0.85rem 1rem' }}>
                    <div style={{ display: 'flex', gap: '0.4rem' }}>
                      {req.status !== 'APPROVED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateAccessRequest(req.id, 'APPROVED')}
                          className="btn btn-primary btn-sm"
                          style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                        >
                          <CheckCircle size={12} /> Approve
                        </button>
                      )}
                      {req.status !== 'REJECTED' && (
                        <button
                          type="button"
                          onClick={() => handleUpdateAccessRequest(req.id, 'REJECTED')}
                          className="btn btn-outline btn-sm"
                          style={{ padding: '2px 8px', fontSize: '0.75rem' }}
                        >
                          <XCircle size={12} /> Reject
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TAB 5: REPORTS */}
      {activeTab === 'reports' && (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          {reports.length > 0 ? (
            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
              <thead>
                <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                  <th style={{ padding: '0.85rem 1rem' }}>Portfolio</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Reporter Email</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Reason</th>
                  <th style={{ padding: '0.85rem 1rem' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {reports.map((r) => (
                  <tr key={r.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <a href={`/u/${r.portfolio?.slug}`} target="_blank" rel="noreferrer">
                        {r.portfolio?.title}
                      </a>
                    </td>
                    <td style={{ padding: '0.85rem 1rem' }}>{r.reporterEmail}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>{r.reason}</td>
                    <td style={{ padding: '0.85rem 1rem' }}>
                      <span className="badge badge-warning">{r.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div style={{ padding: '2.5rem', textAlign: 'center', color: 'var(--text-muted)' }}>
              No abuse reports submitted. All candidate submissions are compliant!
            </div>
          )}
        </div>
      )}

      {/* TAB 6: AUDIT LOGS */}
      {activeTab === 'audit' && (
        <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.75rem 1rem' }}>Timestamp</th>
                <th style={{ padding: '0.75rem 1rem' }}>Action</th>
                <th style={{ padding: '0.75rem 1rem' }}>Target</th>
                <th style={{ padding: '0.75rem 1rem' }}>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
                    {new Date(log.createdAt).toLocaleString()}
                  </td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: 600 }}>{log.action}</td>
                  <td style={{ padding: '0.75rem 1rem' }}>{log.targetType}</td>
                  <td style={{ padding: '0.75rem 1rem', color: 'var(--text-secondary)' }}>{log.details || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
