import React, { ComponentType } from "react";
import {
  Home,
  Package,
  ShoppingBag,
  DollarSign,
  LucideProps,
} from "lucide-react";

const Card = ({
  title,
  value,
  Icon,
}: {
  title: string;
  value: string;
  Icon: ComponentType<LucideProps>;
}) => (
  <div className="rounded-lg bg-white p-6 shadow-sm">
    <div className="mb-4 flex items-center justify-between">
      <h3 className="text-lg font-semibold">{title}</h3>
      <Icon color="#7575ff" />
    </div>
    <p className="text-3xl font-bold">{value}</p>
  </div>
);

const RecentOrders = () => (
  <div className="mt-6 rounded-lg bg-white p-6 shadow-sm">
    <h3 className="mb-4 text-lg font-semibold">سفارش‌های اخیر</h3>
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-4 py-2 text-right rtl:text-left">شماره</th>
            <th className="px-4 py-2 text-right rtl:text-left">مشتری</th>
            <th className="px-4 py-2 text-right rtl:text-left">وضعیت</th>
            <th className="px-4 py-2 text-right rtl:text-left">مجموع</th>
          </tr>
        </thead>
        <tbody>
          {[
            {
              id: "1234",
              customer: "محمد محمودی",
              status: "ارسال شده",
              total: "120.00 تومان",
            },
            {
              id: "1235",
              customer: "سارا جعفری",
              status: "در حال ارسال",
              total: "85.50 تومان",
            },
            {
              id: "1236",
              customer: "علی محمدی",
              status: "تحویل داده شده",
              total: "200.75 تومان",
            },
          ].map((order) => (
            <tr key={order.id} className="border-b">
              <td className="px-4 py-2">{order.id}</td>
              <td className="px-4 py-2">{order.customer}</td>
              <td className="px-4 py-2">{order.status}</td>
              <td className="px-4 py-2">{order.total}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const Dashboard = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        <Card title="همه‌ی سفارشات" value="1,234" Icon={ShoppingBag} />
        <Card title="همه‌ی محصولات" value="567" Icon={Package} />
        <Card title="درآمد" value="12,345,000تومان" Icon={DollarSign} />
        <Card title="مشتریان" value="890" Icon={Home} />
      </div>
      <RecentOrders />
    </>
  );
};

export default Dashboard;
