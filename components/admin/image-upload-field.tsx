"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

type ImageUploadFieldProps = {
  name: string;
  defaultValue?: string;
  label?: string;
};

export function ImageUploadField({ name, defaultValue, label = "Foto" }: ImageUploadFieldProps) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const supabase = createClient();
      const fileExt = file.name.split(".").pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("foto-umkm")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage.from("foto-umkm").getPublicUrl(fileName);
      setUrl(data.publicUrl);
    } catch (err: any) {
      setError(err.message ?? "Gagal upload foto");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium">{label}</label>

      <input type="hidden" name={name} value={url} />

      <div className="mt-2 flex items-center gap-4">
        {url ? (
          <img src={url} alt="Preview" className="h-20 w-20 rounded-lg border border-slate-200 object-cover" />
        ) : (
          <div className="flex h-20 w-20 items-center justify-center rounded-lg border border-dashed border-slate-300 text-2xl text-slate-300">
            🖼️
          </div>
        )}

        <div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="text-sm"
          />
          {uploading && <p className="mt-1 text-xs text-slate-500">Mengunggah...</p>}
          {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </div>
  );
}