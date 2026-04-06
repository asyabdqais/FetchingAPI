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
    <div className="min-h-screen bg-linear-to-br from-teal-50 to-emerald-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-teal-800 tracking-tight mb-4 drop-shadow-sm">
            Al-Qur'an Digital
          </h1>
          <p className="text-teal-600 text-lg md:text-xl max-w-2xl mx-auto">
            Baca dan dengarkan lantunan ayat suci Al-Qur'an dengan nyaman.
          </p>
        </div>

        {isLoading ? (
          <div className="flex flex-col justify-center items-center h-64 space-y-4">
            <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-lg text-teal-700 font-medium animate-pulse">
              Memuat data Surah...
            </p>
          </div>
        ) : error ? (
          <div className="bg-red-50 border-l-4 border-red-500 p-6 rounded-lg shadow-md flex items-center justify-between max-w-3xl mx-auto">
            <div className="flex items-center">
              <svg
                className="w-8 h-8 text-red-500 mr-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-red-700 text-lg font-medium">{error}</p>
            </div>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-md font-semibold transition-colors"
            >
              Coba Lagi
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {suratList.map((surat) => (
              <Link
                to={`/surat/${surat.nomor}`}
                key={surat.nomor}
                className="bg-white rounded-2xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden border border-teal-100 flex flex-col group relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-teal-50 to-transparent rounded-bl-full -z-10 opacity-50 group-hover:opacity-100 transition-opacity"></div>

                <div className="p-6 grow">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 shrink-0 rounded-xl bg-linear-to-br from-teal-500 to-emerald-500 flex items-center justify-center text-white font-bold text-lg shadow-md transform group-hover:scale-110 transition-transform">
                        {surat.nomor}
                      </div>
                      <div>
                        <h2 className="text-2xl font-bold text-gray-800">
                          {surat.namaLatin}
                        </h2>
                        <span className="inline-block px-3 py-1 bg-teal-100 text-teal-800 text-xs font-semibold rounded-full mt-1 capitalize shadow-sm">
                          {surat.arti}
                        </span>
                      </div>
                    </div>
                    <div
                      className="text-4xl font-arabic text-teal-600 group-hover:text-teal-700 transition-colors drop-shadow-sm select-none"
                      dir="rtl"
                    >
                      {surat.nama}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2 font-medium px-1">
                    <span className="flex items-center">
                      <svg
                        className="w-4 h-4 mr-1 text-teal-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                      {surat.tempatTurun}
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-300"></span>
                    <span>{surat.jumlahAyat} Ayat</span>
                  </div>
                </div>

                <div className="bg-linear-to-r from-teal-50 to-emerald-50 p-3 border-t border-teal-100 text-center">
                  <p className="text-sm text-teal-800 font-semibold">
                    Klik untuk membaca ayat & audio &rarr;
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default QuranPage;
