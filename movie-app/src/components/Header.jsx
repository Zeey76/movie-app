import {Film} from "lucide-react"
import "../index.css"
function Header() {
    return (
        <div className="flex w-full bg-black">
            <Film className="w-8 h-8 text-purple-600"/>
            <h1 className="hidden text-purple-700">CineVibe</h1>
        </div>
    )
}
export default Header