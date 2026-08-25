import { createClient } from '@/lib/supabase/server'

export default async function TestConnection() {
  const supabase = await createClient()
  const { data, error } = await supabase.from('umkm').select('*').limit(1)

  return (
    <div style={{ padding: 20 }}>
      <h1>Test Koneksi Supabase</h1>
      <p>Error: {error ? error.message : 'Tidak ada'}</p>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}