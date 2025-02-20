// import { cookies } from "next/headers";
// import ProfileClient from "./ProfileComponent";

//     const getUserDetails = async () => {
//      const getCookie = async (name: string) => {
//       return (await cookies()).get(name)?.value ?? "";
//      }
//      const sessionTokenAuthJs = await getCookie("authjs.session-token");
//      console.log(sessionTokenAuthJs + "thos os ");
//       try {
//         const response = await fetch(`${process.env.PRODUCTION_URL}/api/getMyDetals`, {
//           method: "GET",
//           headers: {
//             'Content-Type': "application/json",
//             Cookie: `authjs.session-token=${sessionTokenAuthJs}`
            
//           },
//           next: {revalidate: 50},
//           credentials: "include"
          
          
//         });
//         if (response.ok) {
//           console.log(process.env.PRODUCTION_URL)
//           const { user } = await response.json();
          
//           return user;
//         }
//       } catch (error) {
//         console.error("Error fetching user details:", error);
//       }
//     };

//     const getProjects = async () => {
//        const getCookie = async (name: string) => {
//       return (await cookies()).get(name)?.value ?? "";
//      }
//      const sessionTokenAuthJs = await getCookie("authjs.session-token");
//       try {
//         const response = await fetch(`${process.env.PRODUCTION_URL}/api/project`, {
//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             Cookie: `authjs.session-token=${sessionTokenAuthJs}`
            
//           },
//           next: {revalidate: 50},
//           credentials: "include",
          
          
         
//         });
//         if (response.ok) {
//           const  {projects}  = await response.json();
//           return projects
//         }
//       } catch (error) {
//         console.error("Error fetching projects:", error);
//       }
//     };




// const page = async () => {
//   const projects = await getProjects();
//   const user = await getUserDetails();
  
  
  
//   return (
    
      
      
//       <ProfileClient allProjects={projects} userDetails={user}/>
    
    

//   )
// }

// export default page;


"use client";

import React, { useEffect, useState } from "react";


import ProfileSkeleton from "@/components/ui/ProfileSkeleton";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

import ProfileClient from "./ProfileComponent";

interface UserDetailsType {
  username: string;
  college: {
    name: string;
    city: string;
  };
  email: string;
  githubUsername: string;
  profileImage: string;
}

interface ProjectDetailType {
  title: string;
  description: string;
  currentlyWorking: boolean;
  authorName: string;
  githubLink: string;
}

function Profile() {
  const [userDetails, setUserDetails] = useState<UserDetailsType | null>(null);
  const [allProjects, setAllProjects] = useState<ProjectDetailType[] | null>(null);
  const { data: session } = useSession();

  if (!session) {
    redirect("/signin");
  }

  useEffect(() => {
   ;

    const getUserDetails = async () => {
      

      try {
        const response = await fetch(`/api/getMyDetals`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
        });

        if (response.ok) {
          const { user } = await response.json();
          setUserDetails(user);
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const getProjects = async () => {
      

      try {
        const response = await fetch(`/api/project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            
          },
          credentials: "include",
        });

        if (response.ok) {
          const { projects } = await response.json();
          setAllProjects(projects);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    getUserDetails();
    getProjects();
  }, []);

  if (!userDetails) {
    return <ProfileSkeleton />;
  }

  return (
    
            <ProfileClient allProjects={allProjects || []} userDetails={userDetails} />
          
  );
}

export default Profile;
