import { useEffect, useState } from "react";

interface DoaItem {
  id:  number;
  grup: string;
  nama: string;
  ar: string;
  tr: string;
  idn: string;
  tentang: string;
}

const Doa = () => {
  const [doaList, setDoaList] = useState<DoaItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchDoa = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch("https://equran.id/api/doa");
        if (!response.ok) {
          throw new Error("Gagal mengambil data doa");
        }
        const data = await response.json();
        console.log(data);
        setDoaList(data.data);
      } catch (err: unknown) {
        setError(
          err instanceof Error
            ? err.message
            : "Terjadi kesalahan saat memuat data doa",
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchDoa();
  }, []);
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-4">Ini Adalah Halaman Doa</h1>
      <p className="text-center text-gray-600 mb-4">Pilih doa untuk melihat detailnya.</p>

      {isLoading && <p className="text-center">Memuat data doa...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}

      <div>
        {doaList.map((doa) => (
          <div key={doa.id} className="bg-white border rounded-lg p-4 mb-4">
            <h2 className="text-xl font-bold mb-2">{doa.nama}</h2>
            <p className="text-gray-600">{doa.ar}</p>
            <p className="text-gray-600">{doa.tr}</p>
            <p className="text-gray-600">{doa.idn}</p>
            <p className="text-gray-600">{doa.tentang}</p>
          </div>
        ))}

      </div>





    </div>


  );
}


export default Doa;