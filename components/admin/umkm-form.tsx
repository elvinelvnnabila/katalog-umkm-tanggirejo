import { ImageUploadField } from "@/components/admin/image-upload-field";

type Kategori = { id: string; nama: string };

type UmkmFormProps = {
  action: (formData: FormData) => void;
  kategoriList: Kategori[];
  defaultValues?: {
    nama_usaha?: string;
    nama_pemilik?: string;
    kategori_id?: string;
    deskripsi?: string;
    alamat?: string;
    whatsapp?: string;
    maps_url?: string;
    marketplace_url?: string;
    instagram?: string;
    jam_operasional?: string;
    foto_url?: string;
  };
  submitLabel?: string;
};

export function UmkmForm({
  action,
  kategoriList,
  defaultValues = {},
  submitLabel = "Simpan",
}: UmkmFormProps) {
  return (
    <form action={action} className="mt-6 max-w-2xl space-y-5">
      <div>
        <label className="block text-sm font-medium">Nama Usaha *</label>
        <input name="nama_usaha" required defaultValue={defaultValues.nama_usaha} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Nama Pemilik</label>
        <input name="nama_pemilik" defaultValue={defaultValues.nama_pemilik} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Kategori *</label>
        <select name="kategori_id" required defaultValue={defaultValues.kategori_id} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm">
          <option value="">Pilih kategori</option>
          {kategoriList.map((k) => (
            <option key={k.id} value={k.id}>{k.nama}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium">Deskripsi</label>
        <textarea name="deskripsi" rows={3} defaultValue={defaultValues.deskripsi} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Alamat</label>
        <input name="alamat" defaultValue={defaultValues.alamat} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">WhatsApp (format: 62812xxxx, tanpa +)</label>
        <input name="whatsapp" defaultValue={defaultValues.whatsapp} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Jam Operasional</label>
        <input name="jam_operasional" placeholder="08.00 - 17.00 WIB" defaultValue={defaultValues.jam_operasional} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Link Google Maps</label>
        <input name="maps_url" defaultValue={defaultValues.maps_url} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Link Marketplace</label>
        <input name="marketplace_url" defaultValue={defaultValues.marketplace_url} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <div>
        <label className="block text-sm font-medium">Instagram</label>
        <input name="instagram" defaultValue={defaultValues.instagram} className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm" />
      </div>

      <ImageUploadField name="foto_url" defaultValue={defaultValues.foto_url} label="Foto UMKM" />

      <button type="submit" className="rounded-xl bg-green-800 px-6 py-3 text-sm font-semibold text-white hover:bg-green-900">
        {submitLabel}
      </button>
    </form>
  );
}