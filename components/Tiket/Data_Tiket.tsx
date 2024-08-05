import { PrismaClient } from "@prisma/client";
import Link from "next/link";
const prisma = new PrismaClient();
import { TiArrowBack } from "react-icons/ti";
import HapusTiket from "./Hapus_Tiket";
const getPelanggan = async () => {
  const res = await prisma.tiket.findMany({
    include: {
      pelanggan: true,
      petugas: true,
    },
  });
  return res;
};

const Data_Tiket = async () => {
  const tiket = await getPelanggan();
  return (
    <>
      <Link href={"/tiket"} className="btn btn-ghost mt-2">
        <TiArrowBack className="" />
      </Link>
      <div className="overflow-hidden px-16">
        <table className="table w-full mt-12">
          <thead>
            <tr>
              <th>Id Tiket</th>
              <th>Id Bus</th>
              <th>Nama Pelanggan</th>
              <th>Nama Petugas</th>
              <th>Kelas</th>
              <th>No Kursi</th>
            </tr>
          </thead>
          <tbody>
            {tiket.map((data, index) => (
              <tr key={index}>
                <td>{data.id_tiket}</td>
                <td>{data.id_bus}</td>
                <td>{data.pelanggan?.nama || "Tidak Diketahui"}</td>
                <td>{data.petugas?.nama || "Tidak Diketahui"}</td>
                <td>{data.kelas}</td>
                <td>{data.no_kursi}</td>
                <td>
                  <HapusTiket
                    tiket={{
                      id_tiket: data.id_tiket,
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

export default Data_Tiket;
