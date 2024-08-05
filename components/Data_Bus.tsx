import React from "react";
import { PrismaClient } from "@prisma/client";
import EditBus from "./KelolaBus/EditBus";
import HapusBus from "./KelolaBus/HapusBus";
const prisma = new PrismaClient();

const getDataBus = async () => {
  const data = await prisma.data_bus.findMany();
  return data;
};

const Data_Bus = async () => {
  const bus = await getDataBus();
  return (
    <div className="overflow-x-auto mt-4 px-4">
      <table className="table">
        <thead>
          <tr>
            <th>Id Bus</th>
            <th>Kapasitas Bagasi</th>
            <th>Jumlah Kursi</th>
            <th>Kelas</th>
            <th>Harga Sewa Bus</th>
            <th>Harga Sewa Bagasi</th>
            <th>Harga Tiket</th>
            <th>Jenis Bus</th>
            <th>Kota Asal</th>
            <th>Kota Tujuan</th>
            <th>Plat Bus</th>
          </tr>
        </thead>
        <tbody>
          {bus.map((data) => (
            <tr key={data.id_bus}>
              <td>{data.id_bus}</td>
              <td>{data.kapasitas_bagasi}</td>
              <td>{data.jumlah_kursi}</td>
              <td>{data.kelas}</td>
              <td>{data.harga_sewa_bus}</td>
              <td>{data.harga_sewa_bagasi}</td>
              <td>{data.harga_tiket}</td>
              <td>{data.jenis_bus}</td>
              <td>{data.kota_asal}</td>
              <td>{data.kota_tujuan}</td>
              <td>{data.plat_bus}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data_Bus;
