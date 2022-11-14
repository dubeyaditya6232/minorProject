import "./featuredProperties.css";
import useFetch from "../hooks/useFetch";

export const FeaturedProperties = () => {
    const { data, loading, error, reFetch } = useFetch(
        "/hotels?feautured=true&limit=4"
    )

    return (
        <div className="fp">
            {
                loading ? ("Loading") : (
                    <>
                        {data.map((item) => (
                            <div className="fpItem" key={item._id}>
                                <img className="fpImg"
                                    alt="Asm"
                                    src={item.photos[0]} />
                                <span className="fpName">{item.name}</span>
                                <span className="fpCity">{item.city} </span>
                                <span className="fpPrice">Starting from ${item.cheapestPrice} </span>
                                {item.rating && <div className="fpRating">
                                    <button>{item.rating}</button>
                                    <span>Excellent</span>
                                </div>}
                            </div>
                        ))}
                    </>
                )
            }

        </div>
    )
}
