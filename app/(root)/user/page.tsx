"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { GetUniversalProfileApi } from "@/apis";
import useApi from "@/hooks/useApi";
import { ProfileDetailsType } from "@/types";
import { Chip } from "@nextui-org/react";

const emptyProfileDetails: ProfileDetailsType = {
  email: "",
  uuid: "",
  name: "",
  gender: "",
  country: "",
  bio: "",
  expertise: "",
  seniority: "",
  work_experience: [],
  education: [],
  current_organisation: "",
  tagline: "",
  skill: [],
  social_urls: [],
  applies: 0,
  referal_code: "",
  username: "",
};

export default function UniversalProfile() {
  const searchParams = useSearchParams();
  const username = searchParams?.get("username") ?? "";
  const { makeApiCall } = useApi();
  const [profileDetails, setProfileDetails] =
    React.useState<ProfileDetailsType>(emptyProfileDetails);
  const [loading, setLoading] = React.useState(false);

  const fetchUserData = React.useCallback(() => {
    if (!username) return;
    setLoading(true);
    makeApiCall(GetUniversalProfileApi(username))
      .then((response) => {
        setProfileDetails(response?.data);
      })
      .catch((error) => console.error("Failed to fetch profile:", error))
      .finally(() => setLoading(false));
  }, [username, makeApiCall]);

  React.useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const {
    name,
    email,
    gender,
    country,
    bio,
    expertise,
    seniority,
    current_organisation,
    tagline,
    work_experience,
    education,
    skill,
    social_urls,
  } = profileDetails;

  return (
    <section className="min-h-screen w-full bg-white px-6 py-8 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-black mb-6">{name}'s Profile</h1>

      {/* Primary Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-700 mb-10">
        <div>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Gender:</strong> {gender}
          </p>
          <p>
            <strong>Country:</strong> {country}
          </p>
          <p>
            <strong>Current Organisation:</strong> {current_organisation}
          </p>
          <p>
            <strong>Seniority:</strong> {seniority}
          </p>
        </div>
        <div>
          <p>
            <strong>Tagline:</strong> {tagline}
          </p>
          <p>
            <strong>Expertise:</strong> {expertise}
          </p>
          <p>
            <strong>Skills:</strong>
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {skill?.map((sk, i) => (
              <Chip key={i} color="primary" variant="bordered" size="sm">
                {sk}
              </Chip>
            ))}
          </div>
        </div>
      </div>

      {/* Bio Section with dangerouslySetInnerHTML */}
      {bio && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black mb-2">About</h2>
          <div
            className="prose max-w-none bg-gray-50 rounded-md p-4 text-black"
            dangerouslySetInnerHTML={{ __html: bio }}
          />
        </div>
      )}

      {/* Work Experience */}
      {work_experience?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black mb-2">
            Work Experience
          </h2>
          <div className="space-y-4">
            {work_experience.map((exp, index) => (
              <div key={index} className="p-4 border rounded shadow-sm">
                <p className="font-semibold">
                  {exp.role} at {exp.company}
                </p>
                <p className="text-sm text-gray-600">
                  {exp.employmentType} | {exp.location}
                </p>
                <p className="text-sm text-gray-600">
                  {exp.duration.start} - {exp.duration.end || "Present"} (
                  {exp.duration.years} yrs)
                </p>
                <p>
                  <strong>Skills:</strong> {exp.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Education */}
      {education?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black mb-2">Education</h2>
          <div className="space-y-4">
            {education.map((edu, index) => (
              <div key={index} className="p-4 border rounded shadow-sm">
                <p className="font-semibold">
                  {edu.degree} at {edu.universityName}
                </p>
                <p className="text-sm text-gray-600">
                  {edu.duration.start} - {edu.duration.end || "Present"} (
                  {edu.duration.years} yrs)
                </p>
                <p>
                  <strong>Skills:</strong> {edu.skills.join(", ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Social Links */}
      {social_urls?.length > 0 && (
        <div className="mb-10">
          <h2 className="text-xl font-semibold text-black mb-2">
            Social Links
          </h2>
          <ul className="list-disc list-inside text-blue-600 space-y-1">
            {social_urls.map((social, index) => (
              <li key={index}>
                <a
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {social.platform}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}
