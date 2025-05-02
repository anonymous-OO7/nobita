import { gradients } from "@/assets/colors";
import Head from "next/head";

export default function CancellationRefundPolicy() {
  return (
    <>
      <Head>
        <title>Workist.in - Cancellation and Refund Policy</title>
        <meta
          name="description"
          content="Workist.in Cancellation and Refund Policy - Learn about our fair practices."
        />
      </Head>
      <div
        className="flex flex-col min-h-screen"
        style={{ background: gradients.gradientbackground }}
      >
        <div className="container mx-auto px-4 py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl font-normal text-center text-black mb-8">
            Cancellation and Refund Policy for Workist.in
          </h1>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl space-y-6 text-gray-700">
            <p>
              <strong>Effective Date:</strong> February 26, 2025
            </p>
            <ol className="list-decimal list-inside space-y-4">
              <li>
                <strong>Order Cancellation:</strong>
                Cancellations will be considered only if requested immediately
                after placing the order. If the order has already been processed
                by our vendors/merchants, cancellation requests may not be
                entertained.
              </li>
              <li>
                <strong>Non-Cancellable Products:</strong>
                Cancellation requests are not accepted for perishable items such
                as flowers, food items, etc. However, if the product is found to
                be of poor quality, a refund or replacement may be considered
                upon verification.
              </li>
              <li>
                <strong>Damaged or Defective Products:</strong>
                If you receive damaged or defective items, please report it to
                our Customer Service team within 7 days of delivery. The issue
                will be verified and handled accordingly by the concerned
                merchant.
              </li>
              <li>
                <strong>Product Not as Described:</strong>
                If the received product is not as shown on the website or does
                not meet expectations, please notify our Customer Service team
                within 7 days of delivery. We will investigate the issue and
                take appropriate action.
              </li>
              <li>
                <strong>Warranty-Backed Products:</strong>
                For products covered under a manufacturer’s warranty, please
                contact the manufacturer directly for assistance.
              </li>
              <li>
                <strong>Refund Process:</strong>
                Once a refund is approved by Workist.in, it will be processed
                within 6-8 business days and credited back to the customer.
              </li>
            </ol>

            <p className="text-gray-500 text-sm">Last updated: May 2, 2025</p>
          </div>
        </div>
      </div>
    </>
  );
}
