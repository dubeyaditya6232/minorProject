import './featured.css';
import useFetch from '../hooks/useFetch';

const Featured = () => {

    const { data, loading, error, reFetch } = useFetch(
        "/hotels/countByCity?cities=ranchi,delhi,mumbai"
    )
    console.log(data);
    return (
        <div className='featured'>
            {loading ? ("Loading please wait") : (
                <>
                    <div className='featuredItem'>
                        <img className='featuredImg' alt="Lonavola" src="https://cf.bstatic.com/xdata/images/city/square250/684682.webp?k=30cf9de93f2a0f87eed7d2d0d9b3e6eccd5dcf3a4b68b4e0151c0800ddc84af7&o="></img>
                        <div className='featuredTitles'>
                            <h1>Ranchi</h1>
                            <h1>{data[0]} properties</h1>
                        </div>
                    </div>
                    <div className='featuredItem'>
                        <img className='featuredImg' alt="Goa" src="https://cf.bstatic.com/xdata/images/region/square250/49646.webp?k=b7f38878b9164ee38e0b99c4d4646dbea76b7bf4add8464b1aa75e4c9d0efc6e&o="></img>
                        <div className='featuredTitles'>
                            <h1>Delhi</h1>
                            <h1>{data[1]} properties</h1>
                        </div>
                    </div>
                    <div className='featuredItem'>
                        <img className='featuredImg' alt="Delhi" src="https://cf.bstatic.com/xdata/images/city/square250/684765.webp?k=3f7d20034c13ac7686520ac1ccf1621337a1e59860abfd9cbd96f8d66b4fc138&o="></img>
                        <div className='featuredTitles'>
                            <h1>Mumbai</h1>
                            <h1>{data[2]} properties</h1>
                        </div>
                    </div>
                </>
            )
            }
        </div>
    )
}

export default Featured