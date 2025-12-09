import { useState } from "react"
import "../NavBar/NavBar.sass"
import { AiOutlineHome, AiOutlineMessage, AiOutlineShopping, AiOutlineShoppingCart, AiOutlineUser } from "react-icons/ai"
import { useNavigate } from "react-router"
import { FaBars, FaTimes } from "react-icons/fa"

export default function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [active, setActive] = useState("home")

    const navigate = useNavigate()

    const handleNavigate = (path, id) => {
        setActive(id)
        navigate(path)
        setMenuOpen(false)
    }

    const links = [
        { id: "shop", label: "Shop", icon: <AiOutlineShopping />, path: "/shop" },
        { id: "about", label: "About Us", icon: <AiOutlineUser />, path: "/aboutus" },
        { id: "contact", label: "Contact Us", icon: <AiOutlineMessage />, path: "/contact" },
    ]

    return (
        <nav className="navbar">
            <div className="navbar__container">
                <div className="navbar__left">
                    <div className="navbar__logo" onClick={() => handleNavigate("/", "home")}>
                        <svg width="56" height="57" viewBox="0 0 56 57" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                            <rect width="56" height="57" fill="url(#pattern0_22_3)"/>
                            <defs>
                            <pattern id="pattern0_22_3" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_22_3" transform="scale(0.0178571 0.0175439)"/>
                            </pattern>
                            <image id="image0_22_3" width="56" height="57" preserveAspectRatio="none" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA5CAYAAABj2ui7AAADIUlEQVRoQ+1aMUhyURT+dCjcJGh0apOGoEEEA5GgwSXMjERDIxA0gghqiYIiMJLAIggSpSiICiFoiBoiUJFoqaG2IgjccnHWn3PhyV/5uhL6uC/uARfv8ZzvO9+7556rGmq1Wg1/2AxE0GAw/EmKpJ0kqGdppYJ6Vo+wSwWlgoJXQD6iggvEhScV5JZIcAepoOACceFJBbklEtxBKii4QFx4UkFuiQR3kAoKLhAXnlSQWyLBHaSCggvEhScV5JZIcAepoOACceGpKtjV1YW+vj48Pz+jVCqxQN3d3ejt7cXDwwM+Pj7qwS0WC3p6enB/f49KpcJNqqWDKkG/34+joyMsLS1hdXWVYZqensb29jYCgQBbUyyZTGJmZgYOhwP5fF5L/NxcqgTHxsZwfHzMSO3s7LBACunx8XG2plgikcDc3BzsdjuKxSI3qZYOqgRHRkZwdnaGtbU1bG1tgX4gDYVCiMfj8Pl8OD09reOk9xYWFmCz2XB3d6clfm4uLsFGEYh8Npv9GwQvLi5wfX3NyNAeGx0dZS9SVzFdKuj1etljGAwGcXh4yLi43W4QYdqfJycn+iY4MTGB/f19rKysYHl5mZGZnZ3F5uYm24u0ptju7i4ikQgGBgaQy+W4+0JLB9U9ODQ0BAJOR0Q6nWaY6NFcX19HNBrF5eVlHSd10FgshuHhYTw+PmqJn5urIUHqmLy/zqj5NPNZLqoWOrScYAuxtSTUrwm2JLsGQVT3YH9/Pxu/zGYzaC6tVqswGo1YXFzE7e3tJ2jUcT0eD1t7eXnRAHbzKVQJhsPhenMpl8vo7Oxk0wyNaefn558yZDIZ1lmdTuc38s1DaY+nKkHlHPx6qDeCoeuD/uDggE0tHR0d7Or09PT0jaMuCSrD9v9siCgp+tV0TZCuSjSqmUwmvL294fX19dsZqUuCyh6cnJwENRHFGh3kuiQ4NTWFvb09bGxsYH5+/scWR3Mpza4ulws3NzftaYe/jKraRa1WK7vYXl1doVAo/Bh+cHCQXaVSqRTe399/CaU9H5NfG7anrtpFlQpqV+v2ZKor2J7wYkT9BzSYunS7hP95AAAAAElFTkSuQmCC"/>
                            </defs>
                        </svg>
                    </div>

                    {/* Desktop Links */}
                    <ul className="navbar__links">
                        {links.map(({ id, label, path }) => (
                            <li
                                key={id}
                                className={`navbar__link ${active === id ? "navbar__link--active" : ""}`}
                                onClick={() => handleNavigate(path, id)}
                            >
                                {label}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Actions (Search, Profile, Cart) */}
                <div className="navbar__actions">
                    <div className="navbar__search">
                        <input type="text" placeholder="Searh product..." />
                    </div>

                    <div className="navbar__profile-container">
                        <AiOutlineUser size={24} className="navbar__profile" />
                    </div>

                    <div className="navbar__cart-container">
                        <AiOutlineShoppingCart size={24} className="navbar__cart" />
                    </div>


                    <button
                        className="navbar__menu-toggle"
                        onClick={() => setMenuOpen(true)}
                    >
                        <FaBars size={24} />
                    </button>
                </div> 
            </div>


            {/* Overlay */}
            <div className={`navbar__overlay ${menuOpen ? "navbar__overlay--visible" : ""}`} onClick={() => setMenuOpen(false)}></div>

            {/* Mobile Menu */}
            <div className={`navbar__mobile-menu ${menuOpen ? "navbar__mobile-menu--open" : ""}`}>
                <button className="navbar__mobile-close" onClick={() => setMenuOpen(false)}>
                    <FaTimes size={24} />
                </button>

                <ul className="navbar__mobile-links">
                    {links.map(({ id, label, icon, path }) => (
                        <li
                            key={id}
                            className={`navbar__mobile-link ${active === id ? "navbar__mobile-link--active" : ""}`}
                            onClick={() => handleNavigate(path, id)}
                        >
                            <span className="navbar__mobile-icon">{icon}</span>
                            {label}
                        </li>
                    ))}
                </ul>
            </div>
        </nav>
    )
}