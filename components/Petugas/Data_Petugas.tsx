import React from "react";
import { PrismaClient } from "@prisma/client";
import EditPetugas from "./EditPetugas";
import HapusPetugas from "./HapusPetugas";
const prisma = new PrismaClient();

const getDataBus = async () => {
  const data = await prisma.petugas.findMany();
  return data;
};

const Data_Petugas = async () => {
  const petugas = await getDataBus();
  return (
    <div className="overflow-x-auto mt-4 px-16">
      <table className="table">
        <thead>
          <tr>
            <th>Id Petugas</th>
            <th>Nama Petugas</th>
            <th>No Telepon</th>
            <th>Posisi</th>
          </tr>
        </thead>
        <tbody>
          {petugas.map((data) => (
            <tr key={data.id_petugas}>
              <td>{data.id_petugas}</td>
              <td>{data.nama}</td>
              <td>{data.no_telepon}</td>
              <td>{data.posisi}</td>
              <td>
                <EditPetugas petugas={data} />
              </td>
              <td>
                <HapusPetugas petugas={data} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Data_Petugas;
