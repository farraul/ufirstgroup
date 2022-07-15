import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';



const Header = () => {

    const history = useNavigate();

    const goUrl = (url) => {
        history(url);
    }

    return (
        <div className="header-menu">
            <button className="header-menu__links" onClick={() => goUrl("/")}>Home</button>
            <button className="header-menu__links" onClick={() => goUrl("/logs")}>Logs</button>


        </div>
    )

}

export default Header;