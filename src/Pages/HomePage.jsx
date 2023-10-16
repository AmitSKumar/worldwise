
import PageNav from "../components/PageNav"

function HomePage() {
    return (
        <div>
            <PageNav />
            <h1>WorldWise</h1>
            {/* if we use anchor tag eah time 
            it will refresh the page
            <a href="/pricing">pricing</a> */}
            {/* <Link to='/pricing' >Pricing</Link> */}
        </div>
    )
}

export default HomePage
