import {useState} from 'react';
import './App.css';

import Home from "./components/screens/home/Home";
import Navigation from "./components/navigation/Navigation";
import Account from "./components/screens/Account/Account";


const App: React.FC = () => {
    const savedPage = localStorage.getItem('activePage') || 'home';

    const [page, setPage] = useState(savedPage);

    const handlePageChange = (page: string) => {
        setPage(page);
        localStorage.setItem('activePage', page);
    }

    return (
        <div className="app-container">
            <div className="content">
                <Navigation onPageChange={handlePageChange} page={page}/>
                <div className="main-content">
                    {page === 'home' && <Home/>}
                    {page === 'account' && <Account/>}
                </div>
            </div>
        </div>
    );
}

export default App;