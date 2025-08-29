import { Button } from "@/components/ui/button";
import Link from "next/link";

const Homepage = () => {
    return (
        <main>
            <div className="top-section flex flex-col justify-center items-center">
                <div className="text-center flex flex-col justify-center items-center gap-4">
                    <h1>welcome User , How are you </h1>
                    <h1>doing today?</h1>
                </div>
                <div className="btns flex justify-center items-center gap-5">
                    <Button><Link href='/interviews'>Take a Interview &gt;</Link></Button>
                    <Button><Link href='/interviews-working'>How interviews work? ...</Link></Button>
                </div>
            </div>
            <div className="Intyerviews-sliders">
                standard carasoul
            </div>
        </main>
    );
}

export default Homepage
