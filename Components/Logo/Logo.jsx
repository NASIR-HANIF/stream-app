import { Icon } from "../../Tailwind/page";

const Logo = ({...rest})=>{
    const design = (
        <>
            <div className="flex items-center gap-3">
                <Icon {...rest}>play_circle</Icon>
                <h1 className="text-red-500 font-bold text-2xl" 
                >Stream just</h1>
            </div>
        </>
    );
    return design
}

export default Logo