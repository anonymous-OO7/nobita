import { gradients } from "@/assets/colors";
import Head from "next/head";

export default function TermsAndConditions() {
  return (
    <>
      <Head>
        <title>Workist.in - Terms and Conditions</title>
        <meta
          name="description"
          content="Workist.in Terms and Conditions - Know your rights and obligations while using our services."
        />
      </Head>
      <div
        className="flex flex-col min-h-screen"
        style={{ background: gradients.gradientbackground }}
      >
        <div className="container mx-auto px-4 py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl font-normal text-center text-black mb-8">
            Terms and Conditions
          </h1>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl space-y-6 text-gray-700">
            <p>
              <strong>Last updated:</strong> May 2, 2025
            </p>

            <p>
              These Terms and Conditions, along with our Privacy Policy and any
              other applicable terms (collectively referred to as “Terms”),
              constitute a binding agreement between you ("User", "you", "your")
              and GAURAV KUMAR YADAV ("we", "us", "our", or "Website Owner")
              regarding your use of our website and services ("Services").
            </p>

            <ol className="list-decimal list-inside space-y-4">
              <li>
                By using our website or availing our Services, you agree that
                you have read, understood, and accepted these Terms (including
                our Privacy Policy).
              </li>
              <li>
                We reserve the right to modify these Terms at any time. It is
                your responsibility to check the Terms periodically for updates.
              </li>
              <li>
                You must provide true, accurate, and complete information during
                registration and are responsible for all activities under your
                account.
              </li>
              <li>
                We do not guarantee the accuracy, completeness, or suitability
                of any information or material on the website. You acknowledge
                that such content may contain errors, and we disclaim liability
                to the fullest extent permitted by law.
              </li>
              <li>
                Your use of our website and Services is at your own risk. You
                are responsible for ensuring the Services meet your specific
                needs.
              </li>
              <li>
                All content on the website is proprietary. You may not claim
                intellectual property rights or reuse any content without
                authorization.
              </li>
              <li>
                Unauthorized use of the website or Services may result in legal
                action.
              </li>
              <li>
                You agree to pay all charges associated with using our Services.
              </li>
              <li>
                You must not use our Services for any illegal or unauthorized
                purpose under Indian or local laws.
              </li>
              <li>
                Our website may contain links to third-party websites. Your use
                of those sites is governed by their own terms and policies.
              </li>
              <li>
                Initiating a transaction constitutes a legally binding contract
                between you and us for the availed Services.
              </li>
              <li>
                You are entitled to request a refund if we are unable to provide
                the promised Service. Refund timelines depend on the nature of
                the Service. Refunds must be requested within the time frame
                specified in our refund policy.
              </li>
              <li>
                We are not liable for delays or failures due to force majeure
                events beyond our control.
              </li>
              <li>
                These Terms shall be governed by and construed under the laws of
                India.
              </li>
              <li>
                All disputes are subject to the exclusive jurisdiction of courts
                located in Phulpur, Uttar Pradesh.
              </li>
              <li>
                Any communication or concern regarding these Terms must be
                submitted through the contact details provided on our website.
              </li>
            </ol>

            <p className="text-gray-500 text-sm">
              If you do not agree to these Terms, please discontinue use of our
              website and Services.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
