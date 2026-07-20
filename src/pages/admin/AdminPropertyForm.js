import React, { useEffect, useMemo, useState, memo } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProperty } from '../../context/PropertyContext';

const initialState = {
  title: '', slug: '', purpose: 'buy', category: 'residential', subType: '', status: 'Available', verified: false, readyToMove: false, offPlan: false, paymentPlan: false, brandNew: false, featured: false,
  price: '', currency: 'AED', address: '', city: '', country: '', bedrooms: 0, bathrooms: 0, sqft: 0,
  images: [], description: '',
  information: { type: '', purposeLabel: '', furnishing: '', referenceNo: '', completion: '', averageRent: '', addedOn: '' },
  features: { general: [], kitchenBathrooms: [], viewOptions: [], securityMaintenance: [], leisureLifestyle: [], convenience: [], communityFacilities: [] },
  lifestyle: [], developer: ''
};

const toArray = (val) => {
  if (Array.isArray(val)) return val;
  if (!val) return [];
  return String(val).split(',').map(s=>s.trim()).filter(Boolean);
};

const TextField = memo(({label, type='text', value, onChange}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <input
      type={type}
      value={String(value ?? '')}
      onChange={onChange}
      className="w-full px-3 py-2 border rounded"
    />
  </div>
));

const CheckField = memo(({label, checked, onChange}) => (
  <label className="inline-flex items-center space-x-2 mr-4">
    <input
      type="checkbox"
      checked={!!checked}
      onChange={onChange}
    />
    <span className="text-sm">{label}</span>
  </label>
));

const FeaturesField = memo(({label, value, onChange}) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label} (comma-separated)</label>
    <textarea rows={2} value={value} onChange={onChange} className="w-full px-3 py-2 border rounded" />
  </div>
));

const AdminPropertyForm = ({ onClose, onSaved, editing }) => {
  const { token } = useAuth();
  const { refreshProperties } = useProperty();
  const [form, setForm] = useState(() => editing ? {
    ...initialState,
    ...editing,
    images: editing.images || [],
    information: { ...initialState.information, ...(editing.information||{}) },
    features: { ...initialState.features, ...(editing.features||{}) },
    lifestyle: editing.lifestyle || []
  } : initialState);
  const headers = useMemo(()=>({ 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }),[token]);
  const [uploading, setUploading] = useState(false);
  const countryOptions = ['UAE', 'Saudi Arabia', 'Montenegro', 'Spain', 'United Arab Emirates', 'KSA'];

  // Helpers for nested field access using dot paths
  const getByPath = (obj, path) => {
    if (!path) return '';
    return path.split('.').reduce((acc, key) => (acc && acc[key] !== undefined ? acc[key] : ''), obj);
  };

  const setByPath = (obj, path, value) => {
    const keys = String(path).split('.');
    const clone = { ...obj };
    let cur = clone;
    for (let i = 0; i < keys.length - 1; i++) {
      const k = keys[i];
      cur[k] = typeof cur[k] === 'object' && cur[k] !== null ? { ...cur[k] } : {};
      cur = cur[k];
    }
    cur[keys[keys.length - 1]] = value;
    return clone;
  };

  const handleUpload = async (files) => {
    if (!files?.length) return;
    setUploading(true);
    try {
      const fd = new FormData();
      Array.from(files).forEach(f => fd.append('images', f));
      const res = await fetch('/api/properties/upload', { method: 'POST', headers: { Authorization: `Bearer ${token}` }, body: fd });
      const data = await res.json();
      setForm((prev) => ({ ...prev, images: [...(prev.images||[]), ...(data.urls||[])] }));
    } catch (err) {
      console.error('Upload failed', err);
      alert('Image upload failed. Please ensure the API server is running on port 4000 and try again.');
    } finally { setUploading(false); }
  };

  const save = async (e) => {
    e.preventDefault();
    const body = {
      ...form,
      price: Number(form.price||0),
      bedrooms: Number(form.bedrooms||0),
      bathrooms: Number(form.bathrooms||0),
      sqft: Number(form.sqft||0),
      information: { ...form.information, addedOn: form.information.addedOn ? new Date(form.information.addedOn) : undefined },
      features: {
        general: toArray(form.features.general),
        kitchenBathrooms: toArray(form.features.kitchenBathrooms),
        viewOptions: toArray(form.features.viewOptions),
        securityMaintenance: toArray(form.features.securityMaintenance),
        leisureLifestyle: toArray(form.features.leisureLifestyle),
        convenience: toArray(form.features.convenience),
        communityFacilities: toArray(form.features.communityFacilities)
      },
      lifestyle: toArray(form.lifestyle)
    };
    const url = editing? `/api/properties/${editing._id}` : '/api/properties';
    const method = editing? 'PUT' : 'POST';
    const res = await fetch(url, { method, headers, body: JSON.stringify(body) });
    if (res.ok) {
      await refreshProperties();
      onSaved && onSaved();
      onClose();
    }
  };

  

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center p-4 z-50">
      <div className="bg-white w-full max-w-4xl rounded-xl shadow-xl p-6 overflow-y-auto max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">{editing? 'Edit Property' : 'New Property'}</h2>
          <button onClick={onClose} className="text-sm px-3 py-1 bg-gray-100 rounded">Close</button>
        </div>
        <form onSubmit={save} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField label="Title" value={getByPath(form,'title')} onChange={(e)=>setForm(prev=>setByPath(prev,'title', e.target.value))} />
            <TextField label="Slug" value={getByPath(form,'slug')} onChange={(e)=>setForm(prev=>setByPath(prev,'slug', e.target.value))} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Purpose</label>
              <select value={form.purpose} onChange={(e)=>setForm({...form, purpose:e.target.value})} className="w-full px-3 py-2 border rounded">
                <option value="buy">Buy</option>
                <option value="rent">Rent</option>
                <option value="off-plan">Off-Plan</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select value={form.category} onChange={(e)=>setForm({...form, category:e.target.value})} className="w-full px-3 py-2 border rounded">
                <option value="residential">Residential</option>
                <option value="commercial">Commercial</option>
              </select>
            </div>
            <TextField label="Sub Type (e.g., Villa, Apartment, Office, Shop)" value={getByPath(form,'subType')} onChange={(e)=>setForm(prev=>setByPath(prev,'subType', e.target.value))} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select value={form.status} onChange={(e)=>setForm({...form, status:e.target.value})} className="w-full px-3 py-2 border rounded">
                <option>Available</option>
                <option>Under Construction</option>
                <option>Sold</option>
                <option>Rented</option>
              </select>
            </div>
            <TextField label="Price" type="number" value={getByPath(form,'price')} onChange={(e)=>setForm(prev=>setByPath(prev,'price', e.target.value))} />
            <TextField label="Currency" value={getByPath(form,'currency')} onChange={(e)=>setForm(prev=>setByPath(prev,'currency', e.target.value))} />
            <TextField label="Address" value={getByPath(form,'address')} onChange={(e)=>setForm(prev=>setByPath(prev,'address', e.target.value))} />
            <TextField label="City" value={getByPath(form,'city')} onChange={(e)=>setForm(prev=>setByPath(prev,'city', e.target.value))} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
              <select value={form.country} onChange={(e)=>setForm({...form, country:e.target.value})} className="w-full px-3 py-2 border rounded">
                <option value="">Select Country</option>
                {countryOptions.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <TextField label="Bedrooms" type="number" value={getByPath(form,'bedrooms')} onChange={(e)=>setForm(prev=>setByPath(prev,'bedrooms', e.target.value))} />
            <TextField label="Bathrooms" type="number" value={getByPath(form,'bathrooms')} onChange={(e)=>setForm(prev=>setByPath(prev,'bathrooms', e.target.value))} />
            <TextField label="Sqft" type="number" value={getByPath(form,'sqft')} onChange={(e)=>setForm(prev=>setByPath(prev,'sqft', e.target.value))} />
          </div>

          <div className="space-x-3">
            <CheckField label="Verified" checked={getByPath(form,'verified')} onChange={(e)=>setForm(prev=>setByPath(prev,'verified', e.target.checked))} />
            <CheckField label="Ready to Move" checked={getByPath(form,'readyToMove')} onChange={(e)=>setForm(prev=>setByPath(prev,'readyToMove', e.target.checked))} />
            <CheckField label="Off Plan" checked={getByPath(form,'offPlan')} onChange={(e)=>setForm(prev=>setByPath(prev,'offPlan', e.target.checked))} />
            <CheckField label="Payment Plan" checked={getByPath(form,'paymentPlan')} onChange={(e)=>setForm(prev=>setByPath(prev,'paymentPlan', e.target.checked))} />
            <CheckField label="Brand New" checked={getByPath(form,'brandNew')} onChange={(e)=>setForm(prev=>setByPath(prev,'brandNew', e.target.checked))} />
            <CheckField label="Featured" checked={getByPath(form,'featured')} onChange={(e)=>setForm(prev=>setByPath(prev,'featured', e.target.checked))} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea rows={4} value={form.description} onChange={(e)=>setForm({...form, description:e.target.value})} className="w-full px-3 py-2 border rounded" />
          </div>

          <TextField label="Developer" value={getByPath(form,'developer')} onChange={(e)=>setForm(prev=>setByPath(prev,'developer', e.target.value))} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <TextField label="Info: Type" value={getByPath(form,'information.type')} onChange={(e)=>setForm(prev=>setByPath(prev,'information.type', e.target.value))} />
            <TextField label="Info: Purpose" value={getByPath(form,'information.purposeLabel')} onChange={(e)=>setForm(prev=>setByPath(prev,'information.purposeLabel', e.target.value))} />
            <TextField label="Info: Furnishing" value={getByPath(form,'information.furnishing')} onChange={(e)=>setForm(prev=>setByPath(prev,'information.furnishing', e.target.value))} />
            <TextField label="Info: Reference No." value={getByPath(form,'information.referenceNo')} onChange={(e)=>setForm(prev=>setByPath(prev,'information.referenceNo', e.target.value))} />
            <TextField label="Info: Completion" value={getByPath(form,'information.completion')} onChange={(e)=>setForm(prev=>setByPath(prev,'information.completion', e.target.value))} />
            <TextField label="Info: Average Rent" value={getByPath(form,'information.averageRent')} onChange={(e)=>setForm(prev=>setByPath(prev,'information.averageRent', e.target.value))} />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Info: Added On</label>
              <input type="date" value={form.information.addedOn? new Date(form.information.addedOn).toISOString().slice(0,10): ''} onChange={(e)=>setForm({...form, information:{...form.information, addedOn: e.target.value}})} className="w-full px-3 py-2 border rounded" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FeaturesField label="Features: General" value={Array.isArray(form.features.general)? form.features.general.join(', ') : form.features.general} onChange={(e)=>setForm(prev=>({...prev, features:{...prev.features, general: e.target.value}}))} />
            <FeaturesField label="Features: Kitchen & Bathrooms" value={Array.isArray(form.features.kitchenBathrooms)? form.features.kitchenBathrooms.join(', ') : form.features.kitchenBathrooms} onChange={(e)=>setForm(prev=>({...prev, features:{...prev.features, kitchenBathrooms: e.target.value}}))} />
            <FeaturesField label="View Options" value={Array.isArray(form.features.viewOptions)? form.features.viewOptions.join(', ') : form.features.viewOptions} onChange={(e)=>setForm(prev=>({...prev, features:{...prev.features, viewOptions: e.target.value}}))} />
            <FeaturesField label="Security & Maintenance" value={Array.isArray(form.features.securityMaintenance)? form.features.securityMaintenance.join(', ') : form.features.securityMaintenance} onChange={(e)=>setForm(prev=>({...prev, features:{...prev.features, securityMaintenance: e.target.value}}))} />
            <FeaturesField label="Leisure & Lifestyle" value={Array.isArray(form.features.leisureLifestyle)? form.features.leisureLifestyle.join(', ') : form.features.leisureLifestyle} onChange={(e)=>setForm(prev=>({...prev, features:{...prev.features, leisureLifestyle: e.target.value}}))} />
            <FeaturesField label="Convenience" value={Array.isArray(form.features.convenience)? form.features.convenience.join(', ') : form.features.convenience} onChange={(e)=>setForm(prev=>({...prev, features:{...prev.features, convenience: e.target.value}}))} />
            <FeaturesField label="Community Facilities" value={Array.isArray(form.features.communityFacilities)? form.features.communityFacilities.join(', ') : form.features.communityFacilities} onChange={(e)=>setForm(prev=>({...prev, features:{...prev.features, communityFacilities: e.target.value}}))} />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Lifestyle tags (comma-separated)</label>
            <input type="text" value={Array.isArray(form.lifestyle)? form.lifestyle.join(', ') : form.lifestyle} onChange={(e)=>setForm({...form, lifestyle: e.target.value})} className="w-full px-3 py-2 border rounded" />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Images</label>
            <input type="file" accept="image/*" multiple onChange={(e)=>handleUpload(e.target.files)} />
            {uploading && <div className="text-sm text-gray-500">Uploading...</div>}
            <div className="flex flex-wrap gap-2">
              {(form.images||[]).map((url)=> (
                <img key={url} src={url} alt="img" className="w-20 h-20 object-cover rounded" />
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-100 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-yellow-500 text-white rounded">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminPropertyForm;
