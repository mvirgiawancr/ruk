import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: Request) {
  try {
    const { nama, no_telepon, posisi } = await request.json();

    // Validasi input
    if (!nama || !no_telepon || !posisi) {
      return NextResponse.json(
        { error: 'Semua field harus diisi!' },
        { status: 400 }
      );
    }

    // Buat petugas baru
    const petugas = await prisma.petugas.create({
      data: {
        nama,
        no_telepon,
        posisi,
      },
    });

    return NextResponse.json(petugas, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Terjadi kesalahan pada server.' },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
