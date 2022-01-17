import { avatarAPI, statuses } from "../../shared/constant";

import Skeleton from "../Skeleton";
import { getRecentTransactions } from "../../services/api/home";
import useSWR from "swr";

export default function LatestTransactions() {
  const { data } = useSWR("home-latest-transactions", () =>
    getRecentTransactions()
  );

  return (
    <div className="bg-white shadow p-4 md:h-[350px]">
      <h1 className="text-2xl">Latest transactions</h1>

      {data ? (
        <table className="w-full">
          <thead>
            <tr className="font-bold">
              <td className="p-2">Customer</td>
              <td>Date</td>
              <td>Amount</td>
              <td>Status</td>
            </tr>
          </thead>

          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className="p-2">
                  <div className="flex items-center gap-2">
                    <img
                      className="w-7 h-7 rounded-full"
                      src={avatarAPI(item.user.username)}
                      alt=""
                    />

                    <span>{item.user.username}</span>
                  </div>
                </td>
                <td>{new Date(item.createdAt).toDateString()}</td>
                <td>${item.amount}</td>
                <td>
                  <span
                    className="px-2 py-1 rounded-xl"
                    style={{
                      color: statuses[item.status].color,
                      background: `${statuses[item.status].color}2d`,
                    }}
                  >
                    {statuses[item.status].name}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div className="flex flex-col items-stretch gap-3 mt-3">
          {[...new Array(5)].map((_, index) => (
            <Skeleton key={index} className="w-full h-10" />
          ))}
        </div>
      )}
    </div>
  );
}
