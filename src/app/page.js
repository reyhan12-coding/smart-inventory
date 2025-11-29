'use client';
import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { 
  AlertTriangle, Package, TrendingUp, Search, Plus, 
  LayoutDashboard, Box, Settings, LogOut, X, Pencil, Trash2, Save
} from 'lucide-react';

export default function Home() {
  // --- STATE MANAGEMENT ---
  const [activeTab, setActiveTab] = useState('dashboard'); // 'dashboard', 'products', 'settings'
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  
  // State untuk Modal & Form
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false); // Mode Edit atau Tambah?
  const [currentId, setCurrentId] = useState(null); // ID barang yang sedang diedit
  
  const [formData, setFormData] = useState({
    name: '', sku: '', category: '', quantity: 0, price: 0, min_stock_alert: 5
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // --- FETCH DATA ---
  useEffect(() => {
    fetchInventory();
  }, []);

  async function fetchInventory() {
    setLoading(true);
    const { data, error } = await supabase
      .from('inventory')
      .select('*')
      .order('id', { ascending: false });
    
    if (error) console.log('error', error);
    else setItems(data || []);
    setLoading(false);
  }

  // --- LOGIC: TAMBAH / EDIT / HAPUS ---

  // 1. Buka Modal untuk Edit
  const handleEditClick = (item) => {
    setIsEditing(true);
    setCurrentId(item.id);
    setFormData({
      name: item.name,
      sku: item.sku,
      category: item.category,
      quantity: item.quantity,
      price: item.price,
      min_stock_alert: item.min_stock_alert
    });
    setIsModalOpen(true);
  };

  // 2. Buka Modal untuk Tambah Baru
  const handleAddClick = () => {
    setIsEditing(false);
    setFormData({ name: '', sku: '', category: '', quantity: 0, price: 0, min_stock_alert: 5 });
    setIsModalOpen(true);
  };

  // 3. Proses Simpan (Bisa Insert atau Update)
  async function handleSave(e) {
    e.preventDefault();
    setIsSubmitting(true);

    if (isEditing) {
      // LOGIC UPDATE
      const { error } = await supabase
        .from('inventory')
        .update(formData)
        .eq('id', currentId);
        
      if (!error) {
        fetchInventory(); // Refresh data
        setIsModalOpen(false);
        alert('Data berhasil diperbarui!');
      } else {
        alert('Gagal update: ' + error.message);
      }
    } else {
      // LOGIC INSERT (TAMBAH BARU)
      const { error } = await supabase
        .from('inventory')
        .insert([formData]);

      if (!error) {
        fetchInventory(); // Refresh data
        setIsModalOpen(false);
        alert('Barang baru berhasil ditambahkan!');
      } else {
        alert('Gagal tambah: ' + error.message);
      }
    }
    setIsSubmitting(false);
  }

  // 4. Logic Hapus
  async function handleDelete(id) {
    if (confirm('Yakin ingin menghapus barang ini? Data tidak bisa dikembalikan.')) {
      const { error } = await supabase.from('inventory').delete().eq('id', id);
      if (!error) {
        fetchInventory();
      } else {
        alert('Gagal hapus: ' + error.message);
      }
    }
  }

  // --- LOGIC UI & CALCULATIONS ---
  const lowStockItems = items.filter(item => item.quantity <= item.min_stock_alert);
  const totalValue = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const filteredItems = items.filter(item => 
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-slate-800">
      
      {/* --- SIDEBAR --- */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed h-full z-10">
        <div className="p-6 flex items-center gap-3 border-b border-slate-100">
          <div className="bg-blue-600 p-2 rounded-lg">
            <Box className="text-white w-6 h-6" />
          </div>
          <span className="font-bold text-xl tracking-tight text-slate-800">Inventku.</span>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <button 
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'dashboard' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <LayoutDashboard className="w-5 h-5" /> Dashboard
          </button>
          <button 
            onClick={() => setActiveTab('products')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'products' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Package className="w-5 h-5" /> Produk
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all ${activeTab === 'settings' ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50'}`}
          >
            <Settings className="w-5 h-5" /> Pengaturan
          </button>
        </nav>

        <div className="p-4 border-t border-slate-100">
          <button className="flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 w-full rounded-xl font-medium transition-all">
            <LogOut className="w-5 h-5" /> Keluar
          </button>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 md:ml-64 p-8 overflow-y-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 capitalize">{activeTab} Overview</h1>
            <p className="text-slate-500 text-sm mt-1">Kelola data inventaris dengan mudah.</p>
          </div>
          {activeTab === 'products' && (
            <button 
              onClick={handleAddClick}
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium shadow-lg shadow-blue-200 flex items-center gap-2 transition-all active:scale-95"
            >
              <Plus className="w-5 h-5" /> Tambah Barang
            </button>
          )}
        </div>

        {/* --- KONTEN DINAMIS BERDASARKAN TAB --- */}
        
        {/* 1. TAB DASHBOARD */}
        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Card */}
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-indigo-50 text-indigo-600 rounded-xl"><Package className="w-8 h-8" /></div>
                <div><p className="text-slate-500 text-sm">Total Item</p><h3 className="text-2xl font-bold">{items.length}</h3></div>
              </div>
              <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4">
                <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl"><TrendingUp className="w-8 h-8" /></div>
                <div><p className="text-slate-500 text-sm">Total Aset</p><h3 className="text-2xl font-bold">Rp {totalValue.toLocaleString('id-ID')}</h3></div>
              </div>
              <div className={`p-6 rounded-2xl border shadow-sm flex items-center gap-4 ${lowStockItems.length > 0 ? 'bg-red-50 border-red-200' : 'bg-white border-slate-100'}`}>
                <div className={`p-4 rounded-xl ${lowStockItems.length > 0 ? 'bg-white text-red-600' : 'bg-slate-50 text-slate-400'}`}><AlertTriangle className="w-8 h-8" /></div>
                <div><p className={`text-sm ${lowStockItems.length > 0 ? 'text-red-600' : 'text-slate-500'}`}>Perlu Restock</p><h3 className={`text-2xl font-bold ${lowStockItems.length > 0 ? 'text-red-700' : 'text-slate-800'}`}>{lowStockItems.length} Item</h3></div>
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <h2 className="font-bold text-lg mb-4">5 Barang Terbaru</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                  <thead className="bg-slate-50 text-xs uppercase font-semibold">
                    <tr><th className="p-3">Nama</th><th className="p-3">Stok</th><th className="p-3">Harga</th></tr>
                  </thead>
                  <tbody>
                    {items.slice(0, 5).map(item => (
                      <tr key={item.id} className="border-b border-slate-50">
                        <td className="p-3 font-medium">{item.name}</td>
                        <td className="p-3">{item.quantity}</td>
                        <td className="p-3">Rp {item.price.toLocaleString('id-ID')}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAB PRODUCTS (TABEL LENGKAP) */}
        {activeTab === 'products' && (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center gap-4">
              <h2 className="font-bold text-lg text-slate-800">Daftar Semua Produk</h2>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input type="text" placeholder="Cari barang..." className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm outline-none focus:ring-2 focus:ring-blue-500" onChange={(e) => setSearchTerm(e.target.value)} />
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-slate-600">
                <thead className="bg-slate-50 text-slate-500 uppercase font-semibold text-xs">
                  <tr>
                    <th className="px-6 py-4">Nama Barang</th>
                    <th className="px-6 py-4">Kategori</th>
                    <th className="px-6 py-4 text-center">Stok</th>
                    <th className="px-6 py-4 text-right">Harga</th>
                    <th className="px-6 py-4 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan="5" className="text-center py-8">Memuat data...</td></tr>
                  ) : filteredItems.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50 transition">
                      <td className="px-6 py-4">
                        <div className="font-medium text-slate-900">{item.name}</div>
                        <div className="text-xs text-slate-400">{item.sku}</div>
                      </td>
                      <td className="px-6 py-4"><span className="bg-slate-100 px-2 py-1 rounded text-xs border">{item.category}</span></td>
                      <td className="px-6 py-4 text-center font-semibold">
                        {item.quantity <= item.min_stock_alert ? <span className="text-red-600">{item.quantity}</span> : item.quantity}
                      </td>
                      <td className="px-6 py-4 text-right">Rp {item.price.toLocaleString('id-ID')}</td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button onClick={() => handleEditClick(item)} className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => handleDelete(item.id)} className="p-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition"><Trash2 className="w-4 h-4" /></button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* 3. TAB SETTINGS (PENGATURAN) */}
        {activeTab === 'settings' && (
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm max-w-2xl">
            <h2 className="text-xl font-bold mb-6">Pengaturan Toko</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Toko</label>
                <input type="text" className="w-full border rounded-lg p-2.5 text-slate-700" defaultValue="Toko Reyhan Maju Jaya" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Email Notifikasi</label>
                <input type="email" className="w-full border rounded-lg p-2.5 text-slate-700" defaultValue="admin@reyhanstore.com" />
              </div>
              <div className="pt-4">
                <button className="bg-slate-800 text-white px-6 py-2.5 rounded-lg hover:bg-slate-900 transition font-medium flex items-center gap-2">
                  <Save className="w-4 h-4" /> Simpan Perubahan
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* --- MODAL (POPUP) --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h3 className="font-bold text-lg text-slate-800">{isEditing ? 'Edit Barang' : 'Tambah Barang Baru'}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-red-500 transition"><X className="w-6 h-6" /></button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nama Barang</label>
                <input required type="text" className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">SKU</label>
                  <input required type="text" className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={formData.sku} onChange={e => setFormData({...formData, sku: e.target.value})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Kategori</label>
                  <select className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="">Pilih...</option>
                    <option value="Elektronik">Elektronik</option>
                    <option value="F&B">F&B</option>
                    <option value="ATK">ATK</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Stok</label>
                  <input required type="number" className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={formData.quantity} onChange={e => setFormData({...formData, quantity: parseInt(e.target.value)})} />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Min. Alert</label>
                  <input required type="number" className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                    value={formData.min_stock_alert} onChange={e => setFormData({...formData, min_stock_alert: parseInt(e.target.value)})} />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Harga (Rp)</label>
                <input required type="number" className="w-full border rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 outline-none" 
                  value={formData.price} onChange={e => setFormData({...formData, price: parseInt(e.target.value)})} />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-200 mt-2 disabled:opacity-50 flex justify-center items-center gap-2"
              >
                {isSubmitting ? 'Menyimpan...' : (isEditing ? 'Simpan Perubahan' : 'Tambah Barang')}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}