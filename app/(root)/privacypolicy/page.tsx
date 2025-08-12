"use client";
import React, { useState } from "react";
import { Colors, gradients } from "@/assets/colors";
import Navbar from "@/components/pages/landing/Navbar";
import Head from "next/head";
import Footer from "@/components/Footer";

export default function PrivacyPolicy() {
  const [isTrialModalOpen, setIsTrialModalOpen] = useState(false);

  return (
    <>
      <div>
        <div
          className="flex flex-col min-h-screen"
          style={{ background: Colors.light }}
        >
          <Navbar onOpenTrialModal={() => setIsTrialModalOpen(true)} />
          <Head>
            <title>Workist.in - Privacy Policy</title>
            <meta
              name="description"
              content="Workist.in Privacy Policy - Full details on how we collect, store, process, share, and protect your personal data."
            />
          </Head>
          <div
            className="flex flex-col min-h-screen"
            style={{ background: gradients.gradientbackground }}
          >
            <div className="container mx-auto px-4 py-10 md:py-20">
              <h1 className="text-3xl md:text-5xl font-bold text-center mb-8">
                Privacy Policy for Workist.in
              </h1>

              <div className="bg-white p-6 md:p-10 rounded-lg shadow-xl space-y-8">
                {/* 1. Introduction */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
                  <p className="mb-4">
                    We, at <strong>Workist Internet Private Limited</strong>{" "}
                    ("Workist", "we", "our", or "us"), respect your online
                    privacy and are committed to providing transparency
                    regarding the collection, usage, and protection of your
                    personal information.
                  </p>
                  <p>
                    This Privacy Policy (“Policy”) applies to your interaction
                    with:
                  </p>
                  <ul className="list-disc list-inside mb-4">
                    <li>The Workist.in website and associated subdomains</li>
                    <li>Our official mobile applications</li>
                    <li>
                      Other services, products, APIs, and tools provided through
                      our digital platforms
                    </li>
                  </ul>
                  <p>
                    By accessing or using our services, you agree to this
                    Policy. If you do not agree, please discontinue using our
                    Platform.
                  </p>
                </section>

                {/* 2. Definitions */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    2. Key Definitions
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>
                      <strong>Personal Information (PI):</strong> Data that can
                      identify you directly or indirectly — e.g., name, email,
                      contact numbers, location, government IDs.
                    </li>
                    <li>
                      <strong>Usage Data:</strong> Technical data about how you
                      use our Platform, such as IP, browser type, device info.
                    </li>
                    <li>
                      <strong>Cookies:</strong> Small files stored in your
                      browser to improve user experience and track preferences.
                    </li>
                    <li>
                      <strong>Processing:</strong> Any operation performed on
                      personal data including storage, retrieval, sharing, or
                      deletion.
                    </li>
                  </ul>
                </section>

                {/* 3. Types of Information We Collect */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    3. Information We Collect
                  </h2>

                  <h3 className="font-semibold text-xl mt-4 mb-2">
                    3.1 Personal Information You Provide
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Name, age, gender, and contact details</li>
                    <li>Email and password (hashed)</li>
                    <li>Employment history, skills, resume/CV data</li>
                    <li>Educational qualifications</li>
                    <li>
                      Payment and billing details (processed via secure third
                      parties)
                    </li>
                    <li>
                      Social media handles if you link accounts (Google,
                      LinkedIn, etc.)
                    </li>
                  </ul>

                  <h3 className="font-semibold text-xl mt-4 mb-2">
                    3.2 Automatically Collected Data
                  </h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>IP address and geolocation</li>
                    <li>Browser, device type, OS</li>
                    <li>Session duration, clicks, page views</li>
                  </ul>

                  <h3 className="font-semibold text-xl mt-4 mb-2">
                    3.3 Cookies and Tracking Data
                  </h3>
                  <p className="mb-2">We use various types of cookies:</p>
                  <ul className="list-disc list-inside">
                    <li>Essential (login functionality)</li>
                    <li>Analytics (Google Analytics, internal tools)</li>
                    <li>Preferences (remember your settings)</li>
                    <li>Advertising (targeted job ads and remarketing)</li>
                  </ul>

                  <h3 className="font-semibold text-xl mt-4 mb-2">
                    3.4 Optional Sensitive Personal Data
                  </h3>
                  <p>
                    Workist may offer forms that request sensitive data such as
                    caste category or diversity preference — sharing is
                    voluntary.
                  </p>
                </section>

                {/* 4. Purpose of Processing */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    4. How We Use Your Information
                  </h2>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Match job seekers with recruiters efficiently</li>
                    <li>
                      Enable community features, discussion forums, and Q&A
                    </li>
                    <li>Personalize recommendations and job alerts</li>
                    <li>Prevent fraud, ensure security, and enforce terms</li>
                    <li>
                      Conduct analytics, A/B testing, and engagement improvement
                    </li>
                    <li>Comply with legal and regulatory requirements</li>
                  </ul>
                </section>

                {/* 5. Legal Basis */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    5. Legal Grounds for Processing
                  </h2>
                  <ul className="list-disc list-inside">
                    <li>Consent (e.g., marketing communications)</li>
                    <li>
                      Contractual necessity (e.g., providing requested services)
                    </li>
                    <li>Legitimate interests (e.g., preventing spam/fraud)</li>
                    <li>Legal obligations (e.g., retention required by law)</li>
                  </ul>
                </section>

                {/* 6. Cookie Policy */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    6. Cookie & Tracking Policy
                  </h2>
                  <p className="mb-2">
                    Cookies and tracking technology are used for authentication,
                    analytics, advertising, and personalization. You can learn
                    more and manage settings via your browser:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>
                      Chrome –{" "}
                      <a
                        href="https://support.google.com/chrome/answer/95647"
                        className="text-blue-600"
                      >
                        Manage Cookies
                      </a>
                    </li>
                    <li>
                      Firefox –{" "}
                      <a
                        href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences"
                        className="text-blue-600"
                      >
                        Manage Cookies
                      </a>
                    </li>
                    <li>
                      Safari –{" "}
                      <a
                        href="https://support.apple.com/en-in/guide/safari/sfri11471/mac"
                        className="text-blue-600"
                      >
                        Manage Cookies
                      </a>
                    </li>
                  </ul>
                </section>

                {/* 7. Sharing Info */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    7. Sharing & Disclosure
                  </h2>
                  <ul className="list-disc list-inside">
                    <li>Employers & recruiters (if you apply or opt-in)</li>
                    <li>Cloud hosting and database providers</li>
                    <li>Advertising networks (Google Ads, Facebook Ads)</li>
                    <li>Law enforcement (where legally required)</li>
                    <li>During mergers, acquisitions, or asset sales</li>
                  </ul>
                </section>

                {/* 8. Data Retention */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">8. Data Retention</h2>
                  <p>
                    We delete or anonymize data when it is no longer needed,
                    unless retention is required by law.
                  </p>
                </section>

                {/* 9. Your Rights */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    9. Your Rights as a User
                  </h2>
                  <ul className="list-disc list-inside">
                    <li>Access and copy your data</li>
                    <li>Rectify inaccurate data</li>
                    <li>Request deletion</li>
                    <li>Restrict processing</li>
                    <li>Withdraw consent</li>
                    <li>Data portability</li>
                  </ul>
                </section>

                {/* 10. Children's Privacy */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    10. Children & Age Limitations
                  </h2>
                  <p>
                    Workist.in is not for users under 18. Use under
                    parental/guardian supervision only if local laws allow.
                  </p>
                </section>

                {/* 11. Security */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    11. Security Measures
                  </h2>
                  <p>
                    We use secure servers, encryption protocols, firewalls, and
                    limited employee access to protect your data. Still, no
                    method of transmission over the Internet is 100% secure.
                  </p>
                </section>

                {/* 12. International Transfers */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    12. International Data Transfers
                  </h2>
                  <p>
                    Your data may be transferred to and processed in other
                    countries, with safeguards in place as per applicable data
                    laws.
                  </p>
                </section>

                {/* 13. Updates */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    13. Updates to This Policy
                  </h2>
                  <p>
                    We may amend this Policy at any time. Changes will be posted
                    here with an updated “Last Updated” date.
                  </p>
                </section>

                {/* 14. Contact */}
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    14. Contact & Grievance Redressal
                  </h2>
                  <p>
                    Email:{" "}
                    <a
                      href="mailto:privacy@workist.in"
                      className="text-blue-600"
                    >
                      privacy@workist.in
                    </a>
                    <br />
                    Address: Workist, Saket Mall, New Delhi, India
                  </p>
                </section>
                <section>
                  <h2 className="text-2xl font-bold mb-4">
                    15. What third-party cookies does workist.in use?
                  </h2>
                  <p className="mb-2">
                    Please note that the third parties (advertising networks and
                    providers of external services like web traffic analysis
                    services) may also use cookies on our Services. Cookies on
                    our sites. Also, note that the names of cookies, pixels and
                    other technologies may change over time. We use trusted
                    partners to help us service advertising, who may place
                    cookies on your device. We also pull through content from
                    social networks into our own pages, such as embedded
                    Facebook feeds. The social networks, such as Facebook,
                    Google, etc. may themselves also put cookies on your
                    machine. If a user logs into Facebook, Twitter or Google+
                    via our website, they will leave a cookie on the users
                    computer. This is the same process as if the user logs into
                    these social networks directly. We also use Google Analytics
                    on our Services to help us analyse how our Services are
                    used. Google Analytics uses performance cookies to track
                    customers interactions. For example, by using cookies,
                    Google can tell us which pages our users view, which are
                    most popular, what time of day our websites are visited,
                    whether visitors have been to our websites before, what
                    website referred the visitor to our websites, and other
                    similar information. All of this information is anonymized.
                    We suggest that you should check the respective privacy
                    policies for these external services to help you understand
                    what data these organisations hold about you and how they
                    process it.
                  </p>
                  <ul className="list-disc list-inside">
                    <li>
                      Google AdSense –{" "}
                      <a
                        href="https://policies.google.com/technologies/ads"
                        className="text-blue-600"
                      >
                        AdSense
                      </a>
                    </li>
                    <li>
                      Google Analytics –{" "}
                      <a
                        href="https://www.google.com/analytics/learn/privacy.html"
                        className="text-blue-600"
                      >
                        See policy
                      </a>
                    </li>
                    <li>
                      Google Tag Manager –{" "}
                      <a
                        href="https://www.google.com/analytics/tag-manager/faq/"
                        className="text-blue-600"
                      >
                        Google Tag Manager: policy
                      </a>
                    </li>
                  </ul>
                </section>

                <p className="text-gray-500 text-sm">
                  Last updated: August 13, 2025
                </p>
              </div>
            </div>
          </div>

          <Footer />
        </div>
      </div>
    </>
  );
}
