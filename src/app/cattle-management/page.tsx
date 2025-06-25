import { cookies } from "next/headers"
import AllAnimals from "./AllAnimals"


const CattleManagement=async()=> {
    const token=(await cookies()).get('user_token')
    const API_URI=process.env.NEXT_PUBLIC_BACKEND_API_URI
    const response=await fetch(`${API_URI}/api/dashboard/animal/all-animals`,{
        headers:{Cookie:`user_token=${token?.value}`},cache:'no-store'})
    const allAnimals=await response.json()

    return (
        <div className="flex-1 overflow-hidden mr-4">
            <AllAnimals allAnimalDetails={allAnimals.allCattles}/>
        </div>
    )
}

export default CattleManagement