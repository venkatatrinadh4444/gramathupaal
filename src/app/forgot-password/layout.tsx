import { Metadata } from "next"

export const metadata:Metadata={
    title:'Forgot password for gramathupaal project',
    description:'Dedicated page for forgot password'
}


export default function ForgotPasswordLayout({children}:{children:React.ReactNode}) {
    return (
        <div>
            {children}
        </div>
    )
}