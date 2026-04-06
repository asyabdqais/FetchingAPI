import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
}

interface SuratData {
  namaLatin: string;
  arti: string;
  tempatTurun: string;
  jumlahAyat: number;
  deskripsi: string;
  audioFull: Record<string, string>;
  ayat: Ayat[];
}

export default function SuratDetail() {
  const { id } = useParams();
  const [data, setData] = useState<SuratData | null>(null);
  const [qari, setQari] = useState("05");

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuratDetail = async () => {
      try {
        setError(null);
        const response = await fetch(`https://equran.id/api/v2/surat/${id}`);
        if (!response.ok) {
          throw new Error("Gagal mengambil detail surah");
        }
        const d = await response.json();
        setData(d.data);
      } catch (err: unknown) {
        const error = err instanceof Error ? err.message : "Unknown error";
        setError(error || "Terjadi kesalahan saat memuat data");
      }
    };

    fetchSuratDetail();
  }, [id]);

  if (error) return <p className="text-center p-10 text-red-500">{error}</p>;
  if (!data)
    return (
      <p className="text-center p-10 animate-pulse text-teal-600">
        Memuat detail...
      </p>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-6">
        <Link
          to="/"
          className="text-teal-600 hover:text-teal-800 font-bold mb-6 inline-block"
        >
          &larr; Kembali ke Beranda
        </Link>

        <div className="text-center mb-8 border-b pb-6">
          <h1 className="text-4xl font-bold text-teal-800 mb-2">
            {data.namaLatin}
          </h1>
          <p className="text-gray-500 mb-4">
            {data.arti} • {data.tempatTurun} • {data.jumlahAyat} Ayat
          </p>

          <div
            className="text-gray-700 bg-teal-50 p-4 rounded-lg text-sm md:text-base leading-relaxed text-justify mb-6 shadow-inner"
            dangerouslySetInnerHTML={{ __html: data.deskripsi }}
          />

          <div className="mt-6 flex flex-col items-center gap-3">
            <select
              value={qari}
              onChange={(e) => setQari(e.target.value)}
              className="px-4 py-2 bg-teal-50 border border-teal-200 rounded-lg text-teal-800 font-medium outline-none"
            >
              <option value="01">Abdullah Al-Juhany</option>
              <option value="02">Abdul Muhsin Al-Qasim</option>
              <option value="03">Abdurrahman as-Sudais</option>
              <option value="04">Ibrahim Al-Dossari</option>
              <option value="05">Misyari Rasyid Al-Afasi</option>
            </select>
            <audio
              src={data.audioFull[qari]}
              controls
              className="w-full max-w-sm rounded-lg"
            />
          </div>
        </div>

        <div className="space-y-6">
          {data.ayat.map((a: Ayat) => (
            <div key={a.nomorAyat} className="border-b border-gray-100 pb-6">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-teal-100 text-teal-800 w-8 h-8 flex items-center justify-center rounded-full font-bold shadow-sm">
                  {a.nomorAyat}
                </span>
                <p
                  className="text-right text-3xl font-arabic text-gray-800 grow ml-4 leading-relaxed"
                  dir="rtl"
                >
                  {a.teksArab}
                </p>
              </div>
              <p className="text-teal-700 italic font-medium mb-1">
                {a.teksLatin}
              </p>
              <p className="text-gray-600 text-sm leading-relaxed">
                {a.teksIndonesia}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
