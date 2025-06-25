import { cookies } from "next/headers";
import { redirect } from 'next/navigation'

const App=async ()=> {
  const API_URI=process.env.NEXT_PUBLIC_BACKEND_API_URI
  const token=(await cookies()).get('user_token')
  if(!token) {
    redirect('/auth/login-page')
  }
  const response=await fetch(`${API_URI}/api/user/profile`,{
    headers:{
      Cookie:`user_token=${token?.value}`
    },cache:'no-store'})
  const data=await response.json()
  if(data?.user?.email) {
    redirect('/cattle-management')
  }
  if(!data?.user.email) {
    redirect('/auth/login-page')
  }
}

export default App