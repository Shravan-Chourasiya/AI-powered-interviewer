// import Image from 'next/image'
// import React from 'react'
// import { Bookmark } from 'lucide-react'
// import { Button } from './ui/button'
import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
// const FieldCard = (logourl:string, fieldTitle:string, description:string, noOfRounds:number, interviewTime:number) => {
//     return (
//         <>
//             <div>
//                 <header>
//                     <div>
//                         <div>
//                             <Image src={logourl} height={5} width={5} alt='Logo'></Image>
//                         </div>
//                         <div>
//                             `${fieldTitle}`
//                         </div>
//                         <div>
//                             <Button>
//                                 <Bookmark />
//                             </Button>
//                         </div>
//                     </div>
//                 </header>
//                 <main>
//                     <div>`${description}`</div>
//                     <div>
//                         <div>`Time : ${interviewTime}`</div>
//                     </div>
//                 </main>
//             </div>
//         </>
//     )
// }
const FieldCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Card Title</CardTitle>
                <CardAction>Card Action</CardAction>
            </CardHeader>
            <CardContent>
                <p>Card Content</p>
            </CardContent>
            <CardFooter>
                <p>Card Footer</p>
            </CardFooter>
        </Card>
    )
}

export default FieldCard;
