import * as React from "react";
import useApi from "@/hooks/useApi";
import { GetAllUserData } from "@/apis";
import { UserProfile } from "@/types";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import BasicInfo from "./profile/BasicInfo";
import Experience from "./profile/Experience";
import Social from "./profile/Social";

export default function UpdateProfilePage() {
  const defaultUserProfile: UserProfile = {
    college: "MNNIT Allahabad",
    company: "Rapipay",
    course: "computer science",
    createdAt: null, // Use new Date() if you want the current date
    email: "gauravyadav00729@gmail.com",
    gender: "male",
    id: 0,
    name: "gaurav yadav",
    phone_no: "75248944398",
    username: "anon_anon",
    uuid: "00000000-0000-0000-0000-000000000000",
    image:
      "https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
    country: "India",
    bio: "This is my first bio. I am feeling so much good to develop this.This will go beyond!!!",
    expertise: [
      "Software Engineering",
      "Web Development",
      "Project Management",
    ],
    seniority_level: "Senior Developer",
    work_experience: [
      {
        role: "Software Developer",
        company: "Rapipay",
        industry: ["Fintech", "Software"],
        start_date: new Date(2018, 0, 1), // January 1, 2018
        end_date: null, // currently employed
        brief: "Developing scalable web applications.",
      },
    ],
    education: [
      {
        university_or_college: "MNNIT Allahabad",
        field_of_study: "Computer Science",
        timeline: "2012 - 2016",
      },
    ],
    linkedin: "https://www.linkedin.com/in/gaurav-yadav",
    twitter: "https://twitter.com/gaurav_yadav",
    website: "https://gauravyadav.com",
  };

  const [userdata, setUserdata] =
    React.useState<UserProfile>(defaultUserProfile);
  const [loading, setLoading] = React.useState(false); // eslint-disable-line
  const { makeApiCall } = useApi();
  // eslint-disable-next-line
  const [img, setImg] = React.useState<string | ArrayBuffer | null>(null);
  // eslint-disable-next-line
  const imgRef = React.useRef(null);
  // eslint-disable-next-line
  const handleSubmit = (e: any) => {
    e.preventDefault();
    // createPost({ text, img });
  };

  function updateUserData<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K],
  ): void {
    console.log("Running update function --- ", key, "----", value);
    setUserdata((currentData) => ({
      ...currentData,
      [key]: value,
    }));
  }
  // eslint-disable-next-line
  const handleImgChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  React.useEffect(() => {
    setLoading(true);
    makeApiCall(GetAllUserData())
      .then((response) => {
        if (response !== undefined) {
          console.log("ALL USER DATA FETCHED inside update", response);
          setUserdata(response);
        }
      })
      .catch((error) => console.error(error, "error in fetching user"))
      .finally(() => {
        setLoading(false);
      });
  }, [makeApiCall]);

  const handleUpdate = React.useCallback(() => {}, []);

  const tabs = [
    {
      id: "basic_info",
      label: "Basic Info",
      content: (
        <BasicInfo
          user={userdata}
          onSubmit={handleUpdate}
          onUpdateInfo={updateUserData}
        />
      ),
    },
    {
      id: "experience",
      label: "Experience",
      content: (
        <Experience
          user={userdata}
          onSubmit={handleUpdate}
          onUpdateInfo={updateUserData}
        />
      ),
    },
    {
      id: "social",
      label: "Social Links",
      content: (
        <Social
          user={userdata}
          onSubmit={handleUpdate}
          onUpdateInfo={updateUserData}
        />
      ),
    },
  ];

  return (
    <>
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Profile Update
      </h2>

      <div className="flex w-full flex-col">
        <Tabs aria-label="Dynamic tabs" items={tabs} radius={"full"}>
          {(item) => (
            <Tab key={item.id} title={item.label}>
              <Card>
                <CardBody>{item.content}</CardBody>
              </Card>
            </Tab>
          )}
        </Tabs>
      </div>
    </>
  );
}
