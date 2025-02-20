import { cookies } from "next/headers";
import ProfileClient from "./ProfileComponent";
const getCookie = async (name: string) => {
      return (await cookies()).get(name)?.value ?? "";
     }
     const sessionTokenAuthJs = await getCookie("authjs.session-token");
    const getUserDetails = async () => {
     const getCookie = async (name: string) => {
      return (await cookies()).get(name)?.value ?? "";
     }
     const sessionTokenAuthJs = await getCookie("authjs.session-token");
     console.log(sessionTokenAuthJs + "thos os ");
      try {
        const response = await fetch(`${process.env.PRODUCTION_URL}/api/getMyDetals`, {
          method: "GET",
          headers: {
            'Content-Type': "application/json",
            Cookie: `authjs.session-token=${sessionTokenAuthJs}`
            
          },
          next: {revalidate: 50},
          credentials: "include"
          
          
        });
        if (response.ok) {
          console.log(process.env.PRODUCTION_URL)
          const { user } = await response.json();
          
          return user;
        }
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    const getProjects = async () => {
       const getCookie = async (name: string) => {
      return (await cookies()).get(name)?.value ?? "";
     }
     const sessionTokenAuthJs = await getCookie("authjs.session-token");
      try {
        const response = await fetch(`${process.env.PRODUCTION_URL}/api/project`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Cookie: `authjs.session-token=${sessionTokenAuthJs}`
            
          },
          next: {revalidate: 50},
          credentials: "include",
          
          
         
        });
        if (response.ok) {
          const  {projects}  = await response.json();
          return projects
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };




const page = async () => {
  const projects = await getProjects();
  const user = await getUserDetails();
  
  
  
  return (
    <div>
      {sessionTokenAuthJs}
      {process.env.PRODUCTION_URL}
      <ProfileClient allProjects={projects} userDetails={user}/>
    </div>
    

  )
}

export default page;