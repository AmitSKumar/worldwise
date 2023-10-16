import { NavLink } from "react-router-dom"

function PageNav() {
    return (
        <nav>
            <ul>
                <li>
                    {/* we can use NavNavLink instead NavLink
                    to get active class
                    <Link to="/">Home</Link> */}
                    <NavLink to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
