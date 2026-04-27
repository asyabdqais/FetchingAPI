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
    <div className="p-4">
      <div className="  max-w-full mx-auto border rounded p-4">
        <Link
          to={`/surat/${id}`}
          className="text-blue-500 font-bold mb-4 inline-block"
        >
          &larr; Kembali ke Surat
        </Link>
        <div className="text-center mb-4 border-b pb-4">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Tafsir {data.namaLatin} {ayatId ? `Ayat ${ayatId}` : ""}
          </h1>
          <p className="text-gray-600 italic">
            {data.arti} • {data.tempatTurun} • {data.jumlahAyat} Ayat
          </p>
        </div>

        <div>
          {tafsirList.length > 0 ? (
            tafsirList.map((t) => (
              <div key={t.ayat} className="border-b pb-4 mb-4">
                <h2 className="text-xl font-bold text-gray-700 mb-2">
                  Ayat {t.ayat}
                </h2>
                <p className="text-gray-700 leading-relaxed">{t.teks}</p>
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
