import FieldCard from "@/components/FieldCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <main>
      <div className="top-section flex flex-col justify-center items-center">
        <div className="text-center flex flex-col justify-center items-center gap-4">
          <h1>Know if you are Job ready</h1>
          <h2>experience a real interview now </h2>
          <div>
            <h3>signup to Syntheview To tale ypu first interview</h3>
            <h3>in you preffered field</h3>
          </div>
        </div>
        <div className="btns flex justify-center items-center gap-5">
          <Button><Link href='/sign-in'>get started &gt</Link>;</Button>
          <Button><Link href='/about'>Know More ...</Link></Button>
        </div>
      </div>
      <div className="image-sliders">
       stacked carasoul

       <FieldCard/>
      </div>
    </main>
  );
}