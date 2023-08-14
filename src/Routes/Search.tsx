import {useLocation} from "react-router";
import ResultsSlider from "../Components/ResultsSlider";

function Search() {
    const location = useLocation();
    const keyword = new URLSearchParams(location.search).get("keyword");





    return (
        <div className="wrapper h-[1000px] w-full">
            <div className="mb-20" />
            <div className="flex flex-col gap-48">
                <ResultsSlider type="movie" section={keyword || ""} />
                <ResultsSlider type="tv" section={keyword || ""} />
            </div>
        </div>
    );
}

export default Search;