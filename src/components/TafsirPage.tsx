import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface TafsirItem {
  ayat: number;
  teks: string;
}

interface TafsirData {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
  tafsir: TafsirItem[];
}

function TafsirPage() {
  const { id, ayatId } = useParams();
  const [data, setData] = useState<TafsirData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTafsir = async () => {
      try {
        setError(null);
        const response = await fetch(`https://equran.id/api/v2/tafsir/${id}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil data tafsir");
        }
        const d = await response.json();
        setData(d.data);
      } catch (err: unknown) {
        const errorMsg = err instanceof Error ? err.message : "Unknown error";
        setError(errorMsg || "Terjadi kesalahan saat memuat tafsir");
      }
    };

    if (id) {
      fetchTafsir();
    }
  }, [id]);

  if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
  if (!data)
    return (
      <p className="text-center p-10 animate-pulse text-teal-600">
        Memuat tafsir...
      </p>
    );

  const tafsirList = ayatId
    ? data.tafsir.filter((t) => t.ayat === parseInt(ayatId))
    : data.tafsir;

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <Link
          to={`/surat/${id}`}
          className="text-teal-600 hover:text-teal-800 font-bold mb-6 inline-block"
        >
          &larr; Kembali ke Surat
        </Link>
        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">
            Tafsir {data.namaLatin} {ayatId ? `Ayat ${ayatId}` : ""}
          </h1>
          <p className="text-gray-500 mb-4">
            {data.arti} • {data.tempatTurun} • {data.jumlahAyat} Ayat
          </p>
        </div>

        <div className="space-y-8">
          {tafsirList.length > 0 ? (
            tafsirList.map((t) => (
              <div key={t.ayat} className="border-b border-gray-100 pb-8">
                <h2 className="text-2xl font-semibold text-teal-700 mb-4">
                  Ayat {t.ayat}
                </h2>
                <div className="text-gray-700 leading-relaxed text-justify whitespace-pre-wrap">
                  {t.teks}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Tafsir tidak ditemukan.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TafsirPage;