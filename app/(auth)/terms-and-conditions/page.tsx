"use client";
import React, { useState } from "react";
import { Colors, gradients } from "@/assets/colors";
import Footer from "@/components/Footer";
import Navbar from "@/components/pages/landing/Navbar";
import Head from "next/head";

export default function TermsAndConditions() {
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
                  <strong>Last updated:</strong> August 13, 2025
                </p>

                <p>
                  These Terms and Conditions, along with our Privacy Policy and
                  any other applicable terms (collectively referred to as
                  “Terms”), constitute a binding agreement between you ("User",
                  "you", "your") and GAURAV KUMAR YADAV ("we", "us", "our", or
                  "Website Owner") regarding your use of our website and
                  services ("Services").
                </p>

                <ol className="list-decimal list-inside space-y-4">
                  <li>
                    By using our website or availing our Services, you agree
                    that you have read, understood, and accepted these Terms
                    (including our Privacy Policy).
                  </li>
                  <li>
                    We reserve the right to modify these Terms at any time. It
                    is your responsibility to check the Terms periodically for
                    updates.
                  </li>
                  <li>
                    You must provide true, accurate, and complete information
                    during registration and are responsible for all activities
                    under your account.
                  </li>
                  <li>
                    We do not guarantee the accuracy, completeness, or
                    suitability of any information or material on the website.
                    You acknowledge that such content may contain errors, and we
                    disclaim liability to the fullest extent permitted by law.
                  </li>
                  <li>
                    Your use of our website and Services is at your own risk.
                    You are responsible for ensuring the Services meet your
                    specific needs.
                  </li>
                  <li>
                    All content on the website is proprietary. You may not claim
                    intellectual property rights or reuse any content without
                    authorization.
                  </li>
                  <li>
                    Unauthorized use of the website or Services may result in
                    legal action.
                  </li>
                  <li>
                    You agree to pay all charges associated with using our
                    Services.
                  </li>
                  <li>
                    You must not use our Services for any illegal or
                    unauthorized purpose under Indian or local laws.
                  </li>
                  <li>
                    Our website may contain links to third-party websites. Your
                    use of those sites is governed by their own terms and
                    policies.
                  </li>
                  <li>
                    Initiating a transaction constitutes a legally binding
                    contract between you and us for the availed Services.
                  </li>
                  <li>
                    You are entitled to request a refund if we are unable to
                    provide the promised Service. Refund timelines depend on the
                    nature of the Service. Refunds must be requested within the
                    time frame specified in our refund policy.
                  </li>
                  <li>
                    We are not liable for delays or failures due to force
                    majeure events beyond our control.
                  </li>
                  <li>
                    These Terms shall be governed by and construed under the
                    laws of India.
                  </li>
                  <li>
                    All disputes are subject to the exclusive jurisdiction of
                    courts located in Phulpur, Uttar Pradesh.
                  </li>
                  <li>
                    Any communication or concern regarding these Terms must be
                    submitted through the contact details provided on our
                    website.
                  </li>
                </ol>

                <p className="text-gray-500 text-sm">
                  If you do not agree to these Terms, please discontinue use of
                  our website and Services.
                </p>

                {/* --- Additional Clauses from Jobaaj General Rules --- */}
                <section className="space-y-4">
                  <h2 className="text-xl font-semibold mt-8">
                    Additional General Rules
                  </h2>
                  <p>
                    The terms “We” / “Us” / “Our” / “Company” individually and
                    collectively refer to Workist Internet Private Limited and
                    the terms “Visitor” / “User” refer to the users. This page
                    states the Terms and Conditions under which you may visit
                    this website. Please read this page carefully. If you do not
                    accept the Terms and Conditions stated here, we would
                    request you to exit this site. The Company, its business
                    divisions and/or subsidiaries, associate companies or
                    investments (domestic or foreign) reserve the right to
                    revise these Terms and Conditions at any time by updating
                    this posting. You should visit this page periodically to
                    re-appraise yourself of the Terms and Conditions, as they
                    are binding on all users of this Website.
                  </p>

                  <h3 className="font-semibold">Use of Content</h3>
                  <p>
                    All logos, brands, marks, headings, labels, names,
                    signatures, numerals, shapes, or any combinations thereof,
                    appearing in this site — unless otherwise noted — are
                    properties owned or used under license by the Company and/or
                    its associate entities. The use of these properties or any
                    other content on this site, except as provided in these
                    terms or in the site content, is strictly prohibited. You
                    may not sell or modify the content of this Website or
                    reproduce, display, publicly perform, distribute, or
                    otherwise use the materials in any way for any public or
                    commercial purpose without prior written permission.
                  </p>

                  <h3 className="font-semibold">Acceptable Website Use</h3>
                  <p className="font-semibold">(A) Security Rules</p>
                  <ul className="list-disc list-inside">
                    <li>
                      Accessing data not intended for you or logging into a
                      server or account which you are not authorised to access.
                    </li>
                    <li>
                      Attempting to probe, scan, or test system/network
                      vulnerabilities or to breach authentication measures
                      without authorisation.
                    </li>
                    <li>
                      Attempting to interfere with service to any user, host, or
                      network, including by submitting a virus, “Trojan horse”,
                      overloading, “flooding”, “mail bombing” or “crashing”.
                    </li>
                    <li>
                      Sending unsolicited electronic mail, promotions, or
                      advertisements.
                    </li>
                  </ul>
                  <p>
                    Violations may result in civil or criminal liability. The
                    Company may investigate and cooperate with law enforcement
                    authorities to prosecute such violations.
                  </p>

                  <p className="font-semibold">(B) General Rules</p>
                  <p>
                    Visitors may not use the Website to transmit, distribute or
                    store material:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>
                      That could encourage conduct constituting a criminal
                      offense or violate applicable law.
                    </li>
                    <li>
                      That infringes intellectual property rights, privacy or
                      other personal rights of others.
                    </li>
                    <li>
                      That is defamatory, obscene, threatening, abusive,
                      hateful, or otherwise objectionable.
                    </li>
                  </ul>

                  <h3 className="font-semibold">Indemnity</h3>
                  <p>
                    The User agrees to indemnify and hold harmless the Company,
                    its officers, directors, employees, and agents from any
                    claims, actions, liabilities, losses, or damages arising
                    from their use of Workist.in or their breach of these Terms.
                  </p>

                  <h3 className="font-semibold">Liability</h3>
                  <p>
                    The User agrees that neither the Company nor its group
                    companies, directors, officers, or employees shall be liable
                    for any direct, indirect, incidental, special,
                    consequential, or exemplary damages resulting from:
                  </p>
                  <ul className="list-disc list-inside">
                    <li>Use or inability to use the Service</li>
                    <li>Cost of procurement of substitute goods/services</li>
                    <li>Unauthorized access to or alteration of user data</li>
                    <li>Any third-party content or conduct on the Service</li>
                  </ul>
                  <p>
                    In no event shall the Company’s total liability exceed the
                    amount paid by the User (if any) related to the cause of
                    action.
                  </p>

                  <h3 className="font-semibold">
                    Disclaimer of Consequential Damages
                  </h3>
                  <p>
                    In no event shall the Company or any associated entities be
                    liable for damages including, without limitation, incidental
                    and consequential damages, lost profits, or data loss,
                    arising from the use of, or inability to use, the Website or
                    its content, whether under warranty, contract, tort, or any
                    other legal theory, and whether or not advised of the
                    possibility of such damages.
                  </p>
                </section>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}
