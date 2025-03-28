import { gradients } from "@/assets/colors";
import Head from "next/head";

export default function PrivacyPolicy() {
  return (
    <>
      <Head>
        <title>Workist.in - Privacy Policy</title>
        <meta
          name="description"
          content="Workist.in Privacy Policy - Learn how we protect your data."
        />
      </Head>
      <div
        className="flex flex-col min-h-screen"
        style={{ background: gradients.gradientbackground }}
      >
        <div className="container mx-auto px-4 py-10 md:py-20">
          <h1 className="text-3xl md:text-5xl font-normal text-center text-black mb-8">
            Privacy Policy for Workist.in
          </h1>

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-xl">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              1. Introduction
            </h2>
            <p className="text-gray-700 mb-6">
              Welcome to Workist.in. We are committed to protecting your privacy
              and ensuring you have a positive experience on our platform. This
              Privacy Policy outlines our practices regarding the collection,
              use, and disclosure of your information when you use our website
              Workist.in (the "Platform"). Workist.in is a platform that allows
              users to sell referrals to other users. This policy is designed to
              be transparent about how we handle your data in the context of
              these services. By using Workist.in, you consent to the data
              practices described in this policy. If you do not agree with any
              part of this Privacy Policy, please do not use our Platform.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              2. Information We Collect
            </h2>
            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              2.1 Personal Information
            </h3>
            <p className="text-gray-700 mb-4">
              We collect personal information that you voluntarily provide to us
              when you register on Workist.in, create a profile, sell or
              purchase referrals, or contact us. This may include:
              <ul className="list-disc list-inside mb-4">
                <li>Your name</li>
                <li>Email address</li>
                <li>Contact number</li>
                <li>
                  Profile information (e.g., skills, experience, location)
                </li>
                <li>Payment information (for transactions)</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </p>

            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              2.2 Referral Information
            </h3>
            <p className="text-gray-700 mb-4">
              As a platform for selling referrals, we collect information
              related to the referrals you list or purchase, including:
              <ul className="list-disc list-inside mb-4">
                <li>Job details for referrals</li>
                <li>Referral recipient information (if you provide it)</li>
                <li>Transaction details for referral sales and purchases</li>
              </ul>
            </p>

            <h3 className="text-xl font-semibold mb-2 text-gray-800">
              2.3 Usage Data
            </h3>
            <p className="text-gray-700 mb-6">
              We automatically collect certain information when you use
              Workist.in, such as:
              <ul className="list-disc list-inside mb-4">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Device information</li>
                <li>Pages you visit</li>
                <li>Time spent on pages</li>
                <li>Links you click</li>
                <li>Cookies (see section 7)</li>
              </ul>
              This data helps us understand how you use the Platform and improve
              our services.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              3. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-6">
              We use the information we collect for various purposes, including:
              <ul className="list-disc list-inside mb-4">
                <li>To provide and maintain our Platform</li>
                <li>To facilitate the selling and purchasing of referrals</li>
                <li>To process transactions and payments</li>
                <li>To personalize your experience on Workist.in</li>
                <li>
                  To communicate with you, including responding to your
                  inquiries and providing customer support
                </li>
                <li>
                  To send you updates, promotional materials, and other
                  information (in accordance with your preferences)
                </li>
                <li>
                  To monitor the usage of the Platform and ensure its security
                </li>
                <li>
                  To detect, prevent, and address technical issues, fraud, and
                  abuse
                </li>
                <li>To comply with legal obligations</li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              4. Sharing and Disclosure of Your Information
            </h2>
            <p className="text-gray-700 mb-6">
              We may share your information in the following circumstances:
              <ul className="list-disc list-inside mb-4">
                <li>
                  <span className="font-semibold">With other users:</span> To
                  facilitate referral transactions, certain information may be
                  shared between users involved in a transaction. For example,
                  if you sell a referral, the buyer may see limited information
                  from your profile.
                </li>
                <li>
                  <span className="font-semibold">With service providers:</span>{" "}
                  We may employ third-party companies and individuals to
                  facilitate our Platform, provide services on our behalf (e.g.,
                  payment processing, data analytics, email delivery), and
                  assist us in analyzing how our Platform is used. These third
                  parties have access to your Personal Information only to
                  perform these tasks on our behalf and are obligated not to
                  disclose or use it for any other purpose.
                </li>
                <li>
                  <span className="font-semibold">For legal reasons:</span> We
                  may disclose your Personal Information if required to do so by
                  law or in response to valid requests by public authorities
                  (e.g., a court or a government agency).
                </li>
                <li>
                  <span className="font-semibold">Business transfers:</span> In
                  connection with any merger, sale of company assets, financing,
                  or acquisition of all or a portion of our business by another
                  company, or in the unlikely event that Workist.in goes out of
                  business or enters bankruptcy, user information would likely
                  be among the assets transferred.
                </li>
                <li>
                  <span className="font-semibold">With your consent:</span> We
                  may disclose your Personal Information for any other purpose
                  with your consent.
                </li>
              </ul>
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              5. Data Security
            </h2>
            <p className="text-gray-700 mb-6">
              We take reasonable measures to protect your Personal Information
              from unauthorized access, use, or disclosure. These measures
              include [Describe security measures, e.g., encryption, firewalls,
              secure servers, access controls]. However, no method of
              transmission over the Internet, or method of electronic storage,
              is 100% secure. Therefore, while we strive to use commercially
              acceptable means to protect your Personal Information, we cannot
              guarantee its absolute security.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              6. Your Data Protection Rights
            </h2>
            <p className="text-gray-700 mb-6">
              You have certain rights regarding your personal information,
              including:
              <ul className="list-disc list-inside mb-4">
                <li>
                  <span className="font-semibold">Access:</span> You have the
                  right to access the personal information we hold about you.
                </li>
                <li>
                  <span className="font-semibold">Correction:</span> You have
                  the right to request that we correct any inaccurate or
                  incomplete personal information.
                </li>
                <li>
                  <span className="font-semibold">Deletion:</span> You have the
                  right to request that we delete your personal information,
                  under certain conditions.
                </li>
                <li>
                  <span className="font-semibold">
                    Objection to processing:
                  </span>{" "}
                  You have the right to object to the processing of your
                  personal information in certain situations.
                </li>
                <li>
                  <span className="font-semibold">
                    Restriction of processing:
                  </span>{" "}
                  You have the right to request that we restrict the processing
                  of your personal information under certain circumstances.
                </li>
                <li>
                  <span className="font-semibold">Data portability:</span> You
                  have the right to receive your personal information in a
                  structured, commonly used and machine-readable format and, if
                  technically feasible, to have it transmitted to another
                  controller.
                </li>
                <li>
                  <span className="font-semibold">Withdraw consent:</span> If we
                  are processing your personal information based on your
                  consent, you have the right to withdraw your consent at any
                  time.
                </li>
              </ul>
              To exercise these rights, please contact us using the information
              in section 11.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              7. Cookies and Tracking Technologies
            </h2>
            <p className="text-gray-700 mb-6">
              We use cookies and similar tracking technologies to collect and
              use information. Cookies are files with a small amount of data
              which may include an anonymous unique identifier. Cookies are sent
              to your browser from a website and stored on your device's
              browser. We use cookies for purposes such as:
              <ul className="list-disc list-inside mb-4">
                <li>
                  <span className="font-semibold">Authentication:</span> To
                  remember you and keep you logged in.
                </li>
                <li>
                  <span className="font-semibold">Personalization:</span> To
                  remember your preferences and settings.
                </li>
                <li>
                  <span className="font-semibold">Analytics:</span> To
                  understand how you use our Platform and to improve it.
                </li>
              </ul>
              You can instruct your browser to refuse all cookies or to indicate
              when a cookie is being sent. However, if you do not accept
              cookies, you may not be able to use some portions of our Platform.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              8. Third-Party Links
            </h2>
            <p className="text-gray-700 mb-6">
              Our Platform may contain links to third-party websites or services
              that are not owned or controlled by Workist.in. We are not
              responsible for the privacy practices of these third parties. We
              encourage you to review the privacy policies of any third-party
              websites or services you visit.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              9. Children's Privacy
            </h2>
            <p className="text-gray-700 mb-6">
              Workist.in is not intended for use by children under the age of
              [Specify Age, e.g., 16]. We do not knowingly collect personal
              information from children under this age. If you are a parent or
              guardian and you are aware that your child has provided us with
              Personal Information, please contact us. If we become aware that
              we have collected Personal Information from children without
              verification of parental consent, we take steps to remove that
              information from our servers.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              10. Changes to This Privacy Policy
            </h2>
            <p className="text-gray-700 mb-6">
              We may update our Privacy Policy from time to time. We will notify
              you of any changes by posting the new Privacy Policy on this page.
              We will let you know via email and/or a prominent notice on our
              Platform, prior to the change becoming effective and update the
              "effective date" at the top of this Privacy Policy. You are
              advised to review this Privacy Policy periodically for any
              changes. Changes to this Privacy Policy are effective when they
              are posted on this page.
            </p>

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              11. Contact Us
            </h2>
            <p className="text-gray-700 mb-6">
              If you have any questions or concerns about this Privacy Policy,
              please contact us at:
              <ul className="list-disc list-inside mb-4">
                <li>Email: [Your Company Email Address]</li>
                <li>Address: [Your Company Address]</li>
              </ul>
            </p>

            <p className="text-gray-500 text-sm">
              Last updated: February 26, 2025
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
