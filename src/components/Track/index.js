import { useParams } from "react-router-dom";
import NavBar from "../NavBar";

const Track = () => {
    const { id } = useParams();
    return (
        <div class="bg-gray-900 h-full flex-col content-center">
            <NavBar />
            <div class="text-white">
                <h2>Track id: {id}</h2>
            </div>
        </div>
    );
}

export default Track;