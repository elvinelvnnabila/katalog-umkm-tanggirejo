import { ImageUploadField } from "@/components/admin/image-upload-field";

type UmkmOption = { id: string; nama_usaha: string };

type ProdukFormProps = {
  action: (formData: FormData) => void;
  umkmList: UmkmOption[];
  defaultValues?: {
    umkm_id?: string;
    nama_produk?: string;
    deskripsi?: string;
    harga?: number;
    foto_url?: string;
    marketplace_url?: string;
  };
  submitLabel?: string;
};

export function ProdukForm({
  action,
  umkmList,
  defaultValues = {},
  submitLabel = "Simpan",
}: ProdukFormProps) {
  return (
    <form action={action} className="mt-6 max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium">UMKM *</label>
        <select name="umkm_id" required defaultValue={defaultValues.umkm_id} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="">Pilih UMKM</option>
          {umkmList.map((u) => (
            <option key={u.id} value={u.id}>{u.nama_usaha}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Nama Produk *</label>
        <input name="nama_produk" required defaultValue={defaultValues.nama_produk} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea name="deskripsi" rows={3} defaultValue={defaultValues.deskripsi} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Harga (Rp) *</label>
        <input name="harga" type="number" required defaultValue={defaultValues.harga} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <ImageUploadField name="foto_url" defaultValue={defaultValues.foto_url} label="Foto Produk" />

      <div>
        <label className="block text-sm font-medium">Link Marketplace</label>
        <input name="marketplace_url" defaultValue={defaultValues.marketplace_url} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <button type="submit" className="rounded-xl bg-green-800 px-6 py-3 text-sm font-semibold text-white hover:bg-green-900">
        {submitLabel}
      </button>
    </form>
  );
}