import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

interface Ayat {
  nomorAyat: number;
  teksArab: string;
  teksLatin: string;
  teksIndonesia: string;
  audio: Record<string, string>; // 🔥 audio per ayat
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
  const [qari, setQari] = useState<string>("03");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSuratDetail = async () => {
      try {
        setError(null);

        const response = await fetch(
          `https://equran.id/api/v2/surat/${id}`
        );

        if (!response.ok) {
          throw new Error("Gagal mengambil detail surah");
        }

        const d = await response.json();
        setData(d.data);
      } catch (err: unknown) {
        const error =
          err instanceof Error ? err.message : "Unknown error";
        setError(error);
      }
    };

    fetchSuratDetail();
  }, [id]);

  
  if (error)
    return (
      <p className="text-center p-10 text-red-500">{error}</p>
    );

  
  if (!data)
    return (
      <p className="text-center p-10">Memuat detail...</p>
    );

  return (
    <div className="p-4 min-h-screen mx-auto">
     
      <Link
        to="/"
        className="text-blue-500 mb-4 block"
      >
        &larr; Kembali ke Beranda
      </Link>

      <div className="bg-white border rounded-lg p-6 mb-6 shadow">
        <h1 className="text-3xl font-bold text-center mb-4">
          {data.namaLatin}
        </h1>

        <p className="text-center text-gray-600 mb-4">
          {data.arti} - {data.tempatTurun} -{" "}
          {data.jumlahAyat} Ayat
        </p>

        <div
          className="text-justify mb-4"
          dangerouslySetInnerHTML={{
            __html: data.deskripsi,
          }}
        />

        <div className="text-center">
          <select
            value={qari}
            onChange={(e) =>
              setQari(e.target.value)
            }
            className="border p-2 rounded mb-4"
          >
            <option value="01">
              Abdullah Al-Juhany
            </option>
            <option value="02">
              Abdul Muhsin Al-Qasim
            </option>
            <option value="03">
              Abdurrahman as-Sudais
            </option>
            <option value="04">
              Ibrahim Al-Dossari
            </option>
            <option value="05">
              Misyari Rasyid Al-Afasi
            </option>
          </select>

         
          <audio
            src={data.audioFull[qari]}
            controls
            className="w-full max-w-md mx-auto"
          />
        </div>
      </div>

      
      <div className="min-h-screen bg-gray-50 p-4 rounded-lg shadow">
        {data.ayat.map((a: Ayat) => (
          <div
            key={a.nomorAyat}
            className="bg-white"
          >
            <div className="flex justify-between items-center ">
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-bold">
                {a.nomorAyat}
              </span>

              <p
                className="text-right text-2xl font-bold text-gray-800"
                dir="rtl"
              >
                {a.teksArab}
              </p>
            </div>

            <p className="text-blue-700 italic mb-2">
              {a.teksLatin}
            </p>

            <p className="text-gray-600 mb-4">
              {a.teksIndonesia}
            </p>
            <audio
              src={a.audio[qari]}
              controls
              className="w-full mb-3"
            />

            <Link
              to={`/tafsir/${id}/${a.nomorAyat}`}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              Lihat Tafsir Ayat {a.nomorAyat}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}