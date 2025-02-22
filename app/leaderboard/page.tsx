import { cookies } from "next/headers";
import LeaderBoardClient from "./leaderBoardClient";


const getProjects = async () => {
    const getCookie = async (name: string) => {
      return (await cookies()).get(name)?.value ?? "";
     }
     const sessionTokenAuthJs = await getCookie("authjs.session-token");

     const res = await fetch(`${process.env.PRODUCTION_URL}/api/project/topprojects`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
             
        Cookie: `authjs.session-token=${sessionTokenAuthJs}`
        }
     })

     if(res.ok){
        const data = await res.json();
        return data
     } else {
        console.log("Error fetching data")
     }

}

const page = async () => {
    const projects = await getProjects();
    console.log(projects);


    return (
        <div className="w-3/4">

            <LeaderBoardClient topProjects={projects}/>

        </div>
        
    )
}

export default page;