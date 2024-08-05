import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();
import { TiArrowBack } from "react-icons/ti";
import HapusSewaBus from "./HapusSewaBus";
const getPelanggan = async () => {
  const res = await prisma.sewa_bus.findMany({
    include: {
      pelanggan: true,
      petugas: true,
    },
  });
  return res;
};

const Data_SewaBus = async () => {
  const tiket = await getPelanggan();
  return (
    <>
      <Link href={"/penyewaanbus"} className="btn btn-ghost mt-2">
        <TiArrowBack className="" />
      </Link>
      <div className="overflow-hidden px-16">
        <table className="table w-full mt-12">
          <thead>
            <tr>
              <th>Id Sewa Bus</th>
              <th>Id Bus</th>
              <th>Nama Pelanggan</th>
              <th>Nama Petugas</th>
              <th>Tanggal Sewa</th>
              <th>Tanggal Kembali</th>
            </tr>
          </thead>
          <tbody>
            {tiket.map((data, index) => (
              <tr key={index}>
                <td>{data.id_sewa_bus}</td>
                <td>{data.id_bus}</td>
                <td>{data.pelanggan?.nama || "Tidak Diketahui"}</td>
                <td>{data.petugas?.nama || "Tidak Diketahui"}</td>
                <td>{data.tanggal_sewa.toLocaleDateString()}</td>
                <td>{data.tanggal_kembali.toLocaleDateString()}</td>
                <td>
                  <HapusSewaBus
                    sewaBus={{
                      id_sewa_bus: data.id_sewa_bus,
                      plat_bus: data.plat_bus,
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

export default Data_SewaBus;
