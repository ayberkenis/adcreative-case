import Search from "../components/search";

export default function HomePage() {
    return (
        <div className='content'>
            <h1 className='gradient'>Ad Creative Case</h1>
            <Search/>
            <div className="footer">
                <span className="gradient" style={{fontSize: '1.2rem'}}>
                    Thank you for considering my application.
                </span>
                <span>
                <a href="https://github.com/ayberkenis">
                    ayberkenis 
                </a>
                <img src="https://img.icons8.com/material-outlined/24/000000/github.png" alt="GitHub Icon"/>
                </span>
            </div>
        </div>
    );
}
