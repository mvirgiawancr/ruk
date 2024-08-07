import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { parseISO } from 'date-fns';

export async function POST(req: Request) {
  try {
    const { id_petugas, nama, no_telepon, alamat, plat_bus, tanggal_sewa, tanggal_kembali } = await req.json();

    if (!id_petugas || !nama || !no_telepon || !alamat || !plat_bus || !tanggal_sewa || !tanggal_kembali) {
      return NextResponse.json({ error: 'Semua field harus diisi' }, { status: 400 });
    }

    // Check if the bus is already booked for the given date range
    const existingBooking = await prisma.sewa_bus.findFirst({
      where: {
        plat_bus: plat_bus,
        OR: [
          {
            tanggal_sewa: {
              lte: parseISO(tanggal_kembali),
            },
            tanggal_kembali: {
              gte: parseISO(tanggal_sewa),
            },
          },
        ],
      },
    });

    if (existingBooking) {
      return NextResponse.json({ error: 'Bus sudah disewa pada tanggal tersebut' }, { status: 400 });
    }

    // Find bus ID by plat_bus
    const bus = await prisma.data_bus.findMany({
      where: {
          plat_bus: plat_bus,
      },
  });

    if (!bus) {
      return NextResponse.json({ error: 'Bus tidak ditemukan' }, { status: 404 });
    }

    const busId = bus[0].id_bus;

    // Create a new booking
    const newBooking = await prisma.pelanggan.create({
      data: {
        nama: nama,
        no_telepon: no_telepon,
        alamat: alamat,
        Sewa_bus: {
          create: {
            id_petugas: Number(id_petugas),
            plat_bus: plat_bus,
            id_bus: busId,
            tanggal_sewa: parseISO(tanggal_sewa),
            tanggal_kembali: parseISO(tanggal_kembali),
          },
        },
      },
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
