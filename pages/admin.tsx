import { prisma } from '../lib/prisma';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async () => {
  const orders = await prisma.order.findMany();
  const commissionRate = 0.1;
  const totalCommission = orders.reduce((sum, o) => sum + o.amount * commissionRate, 0);

  return {
    props: {
      totalCommission,
    },
  };
};

export default function Admin({ totalCommission }: { totalCommission: number }) {
  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-4">Admin Dashboard</h1>
      <p>Total Commission Earned: ${totalCommission.toFixed(2)}</p>
    </div>
  );
}
