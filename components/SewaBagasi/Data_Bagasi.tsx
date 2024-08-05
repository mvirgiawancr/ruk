import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();
import { TiArrowBack } from "react-icons/ti";
import HapusSewaBagasi from "./HapusSewaBagasi";
const getPelanggan = async () => {
  const res = await prisma.sewa_Bagasi.findMany({
    include: {
      pelanggan: true,
      petugas: true,
    },
  });
  return res;
};

const Data_Bagasi = async () => {
  const tiket = await getPelanggan();
  return (
    <>
      <Link href={"/penyewaanbagasi"} className="btn btn-ghost mt-2">
        <TiArrowBack className="" />
      </Link>
      <div className="overflow-hidden px-16">
        <table className="table w-full mt-12">
          <thead>
            <tr>
              <th>Id Sewa Bagasi</th>
              <th>Berat</th>
              <th>Nama Pelanggan</th>
              <th>Nama Petugas</th>
              <th>Id Bus</th>
            </tr>
          </thead>
          <tbody>
            {tiket.map((data, index) => (
              <tr key={index}>
                <td>{data.id_sewa_bagasi}</td>
                <td>{data.berat}</td>
                <td>{data.pelanggan?.nama || "Tidak Diketahui"}</td>
                <td>{data.petugas?.nama || "Tidak Diketahui"}</td>
                <td>{data.id_bus}</td>
                <td>
                  <HapusSewaBagasi
                    sewaBagasi={{
                      id_sewa_bagasi: data.id_sewa_bagasi,
                      id_bus: Number(data.id_bus),
                      berat: data.berat,
                    }}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <BeliTiket bus={idBusData} /> */}
      </div>
    </>
  );
};

export default Data_Bagasi;
