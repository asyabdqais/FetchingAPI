import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

interface Surat {
  nomor: number;
  nama: string;
  namaLatin: string;
  jumlahAyat: number;
  tempatTurun: string;
  arti: string;
  deskripsi: string;
}

const QuranPage = () => {
  const [suratList, setSuratList] = useState<Surat[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuran = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("https://equran.id/api/v2/surat");
        if (!response.ok) {
          throw new Error("Gagal mengambil data dari API");
        }
        const data = await response.json();
        setSuratList(data.data);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat memuat data",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchQuran();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Al-Qur'an Digital</h1>
      <p className="text-center mb-8 text-gray-600">
        Baca dan dengarkan ayat suci Al-Qur'an dengan nyaman.
      </p>
      <div>
        <Link
          to="/Doa"
          className="text-blue-500 mb-4 block text-center hover:text-blue-700 font-medium"
        >
          Doa
        </Link>
      </div>


      {isLoading && <p className="text-center">Memuat data Surah...</p>}

      {error && <p className="text-center text-red-500">{error}</p>}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg">
          {suratList.map((surat) => (
            <div
              key={surat.nomor}
              className="bg-green-100 border rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="text-center mb-4">
                <span className="text-2xl font-bold text-blue-600">
                  {surat.nomor}
                </span>
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {surat.namaLatin}
              </h2>
              <p className="text-gray-600 mb-2">{surat.arti}</p>
              <p className="text-sm text-gray-500">
                {surat.jumlahAyat} Ayat • {surat.tempatTurun}
              </p>
              <Link
                to={`/surat/${surat.nomor}`}
                className="block mt-4 text-center text-blue-500 hover:text-blue-700 font-medium"
              >
                Baca Surah
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default QuranPage;
