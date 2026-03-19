import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import StatusClient from './StatusClient';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

async function getStats() {
  const totalMembers = await prisma.member.count({
    where: { approved: true }
  });
  
  const settings = await prisma.systemSetting.findFirst() || {
    supportCount2026: 0,
    operationYears: 1,
  };

  return {
    totalMembers,
    supportCount2026: settings.supportCount2026,
    operationYears: settings.operationYears,
  };
}

async function getMembers() {
  return await prisma.member.findMany({
    where: { approved: true },
    orderBy: { name: 'asc' },
  });
}

export default async function StatusPage() {
  const stats = await getStats();
  const members = await getMembers();

  return (
    <>
      <Header />
      <main>
        <StatusClient initialStats={stats} initialMembers={members} />
      </main>
      <Footer />
    </>
  );
}
