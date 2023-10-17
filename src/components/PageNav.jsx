import { NavLink } from "react-router-dom"
import styles from './PageNav.module.css'
import Logo from '../components/Logo'
function PageNav() {
    return (
        <nav className={styles.nav}>
              <Logo />
            <ul className={styles.ul}>
                <li>
                      {/* we can use NavNavLink instead NavLink
                    to get active class
                    <Link to="/">Home</Link> */}
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    <NavLink to="/product">Product</NavLink>
                </li>
                <li>
                    <NavLink to="/login" className={styles.ctaLink}>Login</NavLink>
                </li>
            </ul>
        </nav>
    )
}

export default PageNav
