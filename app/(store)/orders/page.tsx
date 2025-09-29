export const dynamic = "force-dynamic";
import { formatCurrency } from "@/lib/formatCurrency";
import { imageUrl } from "@/lib/imageUrl";
import { getMyOrders } from "@/sanity/lib/orders/getMyOrders";
import { auth } from "@clerk/nextjs/server";
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import Image from "next/image";

async function Orders() {
  const { userId } = await auth();
  const { isEnabled } = await draftMode();

  // Require login for real users, but allow draft previews
  if (!userId && !isEnabled) {
    return redirect("/");
  }

  // In preview mode, use a dummy userId or fetch preview data
  const orders = userId ? await getMyOrders(userId) : [];

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 p-4">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-lg w-full max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-8">
          My Orders
        </h1>

        {orders.length === 0 ? (
          <div className="text-center text-gray-600">
            <p>
              {isEnabled
                ? "Draft mode enabled — showing preview (no real orders)"
                : "You have not placed any orders"}
            </p>
          </div>
        ) : (
          <div className="space-y-6 sm:space-y-8">
            {orders.map((order) => (
              <div
                key={order.orderNumber}
                className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
              >
                {/* Order Header */}
                <div className="p-4 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1 font-bold">
                        Order Number
                      </p>
                      <p className="text-sm text-green-600 break-all">
                        {order.orderNumber}
                      </p>
                    </div>
                    <div className="sm:text-right">
                      <p className="text-sm text-gray-600 mb-1">Order Date</p>
                      <p className="font-medium">
                        {order.orderDate
                          ? new Date(order.orderDate).toLocaleDateString()
                          : "N/A"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Body */}
                <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center p-4 sm:p-6">
                  <div className="flex items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-sm ${
                        order.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <div className="sm:text-right">
                    <p className="text-sm text-gray-600 mb-1">Total Amount</p>
                    <p className="font-bold text-lg">
                      {formatCurrency(order.totalPrice ?? 0, order.currency)}
                    </p>
                  </div>
                </div>

                {/* Discount Block */}
                {order.amountDiscount ? (
                  <div className="mt-4 p-3 sm:p-4 bg-red-50 rounded-lg">
                    <p className="text-red-600 font-medium mb-1 text-sm sm:text-base">
                      Discount Applied:{" "}
                      {formatCurrency(order.amountDiscount, order.currency)}
                    </p>
                    <p className="text-sm text-gray-600">
                      Original Subtotal:{" "}
                      {formatCurrency(
                        (order.totalPrice ?? 0) + order.amountDiscount,
                        order.currency
                      )}
                    </p>
                  </div>
                ) : null}

                {/* Divider before items */}
                <hr className="my-4 border-gray-200" />

                {/* Order Items */}
                <div className="px-4 py-3 sm:px-6 sm:py-4">
                  <p className="text-sm font-semibold text-gray-600 mb-3 sm:mb-4">
                    Order Items
                  </p>
                  <div className="space-y-3 sm:space-y-4">
                    {order.products?.map((product) => (
                      <div
                        key={product.product?._id}
                        className="flex items-center justify-between gap-3 py-2 border-b last:border-b-0"
                      >
                        <div className="flex items-center gap-3">
                          {product.product?.image ? (
                            <div className="relative h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md overflow-hidden">
                              <Image
                                src={imageUrl(product.product.image).url()}
                                alt={product.product?.name ?? ""}
                                className="object-cover"
                                fill
                              />
                            </div>
                          ) : (
                            <div className="h-14 w-14 sm:h-16 sm:w-16 flex-shrink-0 rounded-md bg-gray-200 flex items-center justify-center text-gray-500 text-xs">
                              No Image
                            </div>
                          )}

                          <div>
                            <p className="text-gray-900 font-medium">
                              {product.product?.name ?? "Unnamed Product"}
                            </p>
                            <p className="text-sm text-gray-500">
                              Qty: {product.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="text-sm font-semibold text-gray-700">
                          {formatCurrency(
                            (product.product?.price ?? 0) *
                              (product.quantity ?? 1),
                            order.currency
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
