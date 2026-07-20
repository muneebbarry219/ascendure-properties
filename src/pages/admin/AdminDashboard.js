import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart, Area, LineChart, Line,
  CartesianGrid, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell,
  BarChart, Bar
} from 'recharts';
import { useAuth } from '../../context/AuthContext';
import AdminPropertyForm from './AdminPropertyForm';

const AdminDashboard = () => {
  const { token, email, logout } = useAuth();
  const [tab, setTab] = useState('overview');
  const [properties, setProperties] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [stats, setStats] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const authHeaders = useMemo(() => ({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }), [token]);

  const inquiriesMonthly = useMemo(() => {
    const now = new Date();
    const labels = Array.from({ length: 12 }, (_, i) => {
      const d = new Date(now.getFullYear(), now.getMonth() - (11 - i), 1);
      return d.toLocaleString(undefined, { month: 'short' });
    });
    const base = Array(12).fill(0);
    inquiries.forEach((inq) => {
      const d = new Date(inq.createdAt);
      const diffMonths = (d.getFullYear() - now.getFullYear()) * 12 + (d.getMonth() - now.getMonth());
      const idx = 11 + diffMonths; // position in last 12 months
      if (idx >= 0 && idx < 12) base[idx] += 1;
    });
    return { labels, counts: base };
  }, [inquiries]);

  const inquiriesTopProps = useMemo(() => {
    const map = new Map();
    inquiries.forEach((i) => {
      const title = (i.property && i.property.title) ? i.property.title : (typeof i.property === 'string' ? i.property : 'Unknown');
      map.set(title, (map.get(title) || 0) + 1);
    });
    const arr = Array.from(map.entries()).map(([name, value]) => ({ name, value }));
    arr.sort((a, b) => b.value - a.value);
    return arr.slice(0, 5);
  }, [inquiries]);

  const analyticsBars = useMemo(() => {
    const rows = properties.map((p) => ({
      name: p.title,
      Views: p.analytics?.views || 0,
      Inquiries: p.analytics?.inquiries || 0,
      Shares: p.analytics?.shares || 0
    }));
    rows.sort((a, b) => (b.Views + b.Inquiries * 1.5 + b.Shares) - (a.Views + a.Inquiries * 1.5 + a.Shares));
    return rows.slice(0, 10);
  }, [properties]);

  const countries = useMemo(() => {
    const map = new Map();
    properties.forEach((p) => {
      const c = (p.country || 'Unknown').trim() || 'Unknown';
      map.set(c, (map.get(c) || 0) + 1);
    });
    const arr = Array.from(map.entries()).map(([name, count]) => ({ name, count }));
    arr.sort((a, b) => b.count - a.count);
    return arr;
  }, [properties]);

  const load = async () => {
    try {
      const [pRes, iRes, sRes] = await Promise.all([
        fetch('/api/properties'),
        fetch('/api/inquiries', { headers: { Authorization: `Bearer ${token}` } }),
        fetch('/api/admin/stats', { headers: { Authorization: `Bearer ${token}` } })
      ]);
      const p = await pRes.json();
      const i = iRes.ok ? await iRes.json() : [];
      const s = sRes.ok ? await sRes.json() : null;
      setProperties(p);
      setInquiries(i);
      setStats(s);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => { load(); }, []);

  const toggleFlag = async (id, field, value) => {
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'PUT', headers: authHeaders, body: JSON.stringify({ [field]: value }) });
      if (res.ok) load();
    } catch (e) { console.error(e); }
  };

  const removeProperty = async (id) => {
    if (!window.confirm('Delete this property? This cannot be undone.')) return;
    try {
      const res = await fetch(`/api/properties/${id}`, { method: 'DELETE', headers: { Authorization: `Bearer ${token}` } });
      if (res.ok) load();
    } catch (e) { console.error(e); }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">{email}</span>
            <button onClick={logout} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 text-sm">Logout</button>
          </div>
        </div>

        <div className="flex space-x-3 mb-6">
          {['overview','properties','inquiries','analytics'].map(t => (
            <button key={t} onClick={()=>setTab(t)} className={`px-4 py-2 rounded-lg text-sm ${tab===t? 'bg-yellow-500 text-white':'bg-white border'}`}>{t.charAt(0).toUpperCase()+t.slice(1)}</button>
          ))}
        </div>

        {tab === 'overview' && (
          <div className="space-y-6">
            {/* KPI cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-orange-500 text-white p-6 rounded-xl shadow relative overflow-hidden">
                <div className="text-sm opacity-90">Total Properties</div>
                <div className="text-4xl font-extrabold mt-2">{stats?.totals?.properties ?? properties.length}</div>
                <div className="text-xs mt-2 opacity-90">{(stats?.totals?.lastMonthProperties ?? 0)} last month</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Properties for Sale</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-3xl font-bold">{stats?.totals?.sale ?? properties.filter(p=>p.purpose!== 'rent').length}</div>
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-indigo-600 font-semibold text-sm">{stats?.composition?.salePct ?? 0}%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Properties for Rent</div>
                <div className="flex items-center justify-between mt-2">
                  <div className="text-3xl font-bold">{stats?.totals?.rent ?? properties.filter(p=>p.purpose=== 'rent').length}</div>
                  <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                    <span className="text-green-600 font-semibold text-sm">{stats ? (100 - (stats.composition?.salePct||0)) : 0}%</span>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Inquiries</div>
                <div className="text-3xl font-bold mt-2">{stats?.totals?.inquiries ?? inquiries.length}</div>
              </div>
            </div>

            {/* Charts row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
                <div className="font-semibold mb-4">Overview</div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={(stats?.monthly?.labels||[]).map((m,idx)=>({
                      name: m,
                      Sale: stats?.monthly?.sale?.[idx]||0,
                      Rent: stats?.monthly?.rent?.[idx]||0
                    }))} margin={{ left: 0, right: 0, top: 10, bottom: 0 }}>
                      <defs>
                        <linearGradient id="c1" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.02}/>
                        </linearGradient>
                        <linearGradient id="c2" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#22c55e" stopOpacity={0.35}/>
                          <stop offset="95%" stopColor="#22c55e" stopOpacity={0.02}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="Sale" stroke="#3b82f6" fill="url(#c1)" />
                      <Area type="monotone" dataKey="Rent" stroke="#22c55e" fill="url(#c2)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <div className="font-semibold mb-4">Composition</div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Sale', value: stats?.totals?.sale ?? properties.filter(p=>p.purpose!=='rent').length },
                          { name: 'Rent', value: stats?.totals?.rent ?? properties.filter(p=>p.purpose==='rent').length }
                        ]}
                        innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value"
                      >
                        <Cell fill="#6d28d9" />
                        <Cell fill="#f59e0b" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            {/* Regions and activity */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="font-semibold mb-4">Properties by Country</div>
                <div className="space-y-3">
                  {countries.map(r=> (
                    <div key={r.name}>
                      <div className="flex justify-between text-sm mb-1"><span>{r.name}</span><span>{r.count}</span></div>
                      <div className="h-2 bg-gray-100 rounded"><div className="h-2 bg-indigo-600 rounded" style={{ width: `${Math.min(100, ((r.count||0)/Math.max(1, properties.length||0))*100)}%` }} /></div>
                    </div>
                  ))}
                  {countries.length===0 && (
                    <div className="text-sm text-gray-500">No country data yet.</div>
                  )}
                </div>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <div className="font-semibold mb-4">Activity (last 12 months)</div>
                <div className="h-48">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={(stats?.monthly?.labels||[]).map((m,idx)=>({ name:m, Total:(stats?.monthly?.total?.[idx]||0) }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="Total" stroke="#0ea5e9" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        )}

        {tab === 'properties' && (
          <div className="bg-white rounded-xl shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <div className="font-semibold">Manage Properties</div>
              <button onClick={()=>{ setEditing(null); setShowForm(true); }} className="px-4 py-2 bg-yellow-500 text-white rounded">New Property</button>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="text-left border-b">
                    <th className="py-3 pr-4">Title</th>
                    <th className="py-3 pr-4">Price</th>
                    <th className="py-3 pr-4">City</th>
                    <th className="py-3 pr-4">Tags</th>
                    <th className="py-3 pr-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((p)=> (
                    <tr key={p._id} className="border-b">
                      <td className="py-3 pr-4 font-medium">{p.title}</td>
                      <td className="py-3 pr-4">{p.price?.toLocaleString()} {p.currency||'AED'}</td>
                      <td className="py-3 pr-4">{p.city||''}</td>
                      <td className="py-3 pr-4 space-x-2">
                        {['verified','readyToMove','offPlan','paymentPlan','brandNew','featured'].map((flag)=> (
                          <label key={flag} className="inline-flex items-center space-x-1 mr-2">
                            <input type="checkbox" checked={!!p[flag]} onChange={(e)=>toggleFlag(p._id, flag, e.target.checked)} />
                            <span className="text-xs capitalize">{flag}</span>
                          </label>
                        ))}
                      </td>
                      <td className="py-3 pr-4">
                        <button onClick={()=>{ setEditing(p); setShowForm(true); }} className="px-3 py-1 bg-gray-100 rounded mr-2">Edit</button>
                        <button onClick={()=>removeProperty(p._id)} className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === 'inquiries' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Total Inquiries</div>
                <div className="text-3xl font-bold mt-2">{inquiries.length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Last 7 Days</div>
                <div className="text-3xl font-bold mt-2">{inquiries.filter(i => (Date.now() - new Date(i.createdAt).getTime()) < 7*24*60*60*1000).length}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Today</div>
                <div className="text-3xl font-bold mt-2">{inquiries.filter(i => new Date(i.createdAt).toDateString() === new Date().toDateString()).length}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-white p-6 rounded-xl shadow">
                <div className="font-semibold mb-4">Inquiries (last 12 months)</div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={inquiriesMonthly.labels.map((m, idx) => ({ name: m, Inquiries: inquiriesMonthly.counts[idx] }))}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis allowDecimals={false} />
                      <Tooltip />
                      <Line type="monotone" dataKey="Inquiries" stroke="#ef4444" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="font-semibold mb-4">Top Properties by Inquiries</div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={inquiriesTopProps} layout="vertical" margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" allowDecimals={false} />
                      <YAxis type="category" dataKey="name" width={120} />
                      <Tooltip />
                      <Bar dataKey="value" fill="#f59e0b" radius={[4,4,4,4]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow p-6">
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left border-b">
                      <th className="py-3 pr-4">When</th>
                      <th className="py-3 pr-4">Name</th>
                      <th className="py-3 pr-4">Email</th>
                      <th className="py-3 pr-4">Phone</th>
                      <th className="py-3 pr-4">Property</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inquiries.map((i)=> (
                      <tr key={i._id} className="border-b">
                        <td className="py-3 pr-4">{new Date(i.createdAt).toLocaleString()}</td>
                        <td className="py-3 pr-4">{i.name}</td>
                        <td className="py-3 pr-4">{i.email}</td>
                        <td className="py-3 pr-4">{i.phone}</td>
                        <td className="py-3 pr-4">{i.property?.title || i.property}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {tab === 'analytics' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Total Views</div>
                <div className="text-3xl font-bold mt-2">{properties.reduce((s,p)=> s + (p.analytics?.views||0), 0)}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Total Inquiries</div>
                <div className="text-3xl font-bold mt-2">{properties.reduce((s,p)=> s + (p.analytics?.inquiries||0), 0)}</div>
              </div>
              <div className="bg-white p-6 rounded-xl shadow">
                <div className="text-gray-500 text-sm">Total Shares</div>
                <div className="text-3xl font-bold mt-2">{properties.reduce((s,p)=> s + (p.analytics?.shares||0), 0)}</div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <div className="font-semibold mb-4">Top Properties (engagement)</div>
              <div className="h-96">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsBars} margin={{ left: 10, right: 10, top: 10, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" tick={false} />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="Views" fill="#3b82f6" radius={[4,4,0,0]} />
                    <Bar dataKey="Inquiries" fill="#f59e0b" radius={[4,4,0,0]} />
                    <Bar dataKey="Shares" fill="#10b981" radius={[4,4,0,0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        )}
      </div>
      {showForm && (
        <AdminPropertyForm
          editing={editing}
          onClose={()=> setShowForm(false)}
          onSaved={load}
        />
      )}
    </div>
  );
};

export default AdminDashboard;
