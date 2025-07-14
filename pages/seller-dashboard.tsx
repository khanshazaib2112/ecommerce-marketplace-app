import { prisma } from '../lib/prisma';
import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const sellerId = 'seller1';
  const products = await prisma.product.findMany({ where: { sellerId } });
  const orders = await prisma.order.findMany({ where: { sellerId } });
  const totalSales = orders.reduce((sum, o) => sum + o.amount, 0);

  return {
    props: {
      products,
      totalSales,
    },
  };
};

export default function SellerDashboard({ products, totalSales }: { products: any[], totalSales: number }) {
  return (
    <div className="p-10 text-white">
      <h1 className="text-2xl mb-4">Seller Dashboard</h1>
      <p className="mb-6">Total Sales: ${totalSales.toFixed(2)}</p>
      <h2 className="text-xl mb-2">Your Products</h2>
      <ul className="list-disc ml-6">
        {products.map((p) => (
          <li key={p.id}>{p.title} - ${p.price}</li>
        ))}
      </ul>
    </div>
  );
}
