import {useState} from 'react';
import './App.css';

import Home from "./components/screens/home/Home";
import Navigation from "./components/navigation/Navigation";
import Account from "./components/screens/account/Account";
import Control from "./components/screens/control/Control";
import NotifyToaster from "./components/notify_toaster/NotifyToaster";
import OrderPage from "./components/screens/order/OrderPage";


const App: React.FC = () => {
    const [page, setPage] = useState('home');

    const handlePageChange = (page: string) => {
        setPage(page);
    }

    return (
        <div className="app-container">
            <div className="content">
                <Navigation onPageChange={handlePageChange} page={page}/>
                <div className="main-content">
                    {page === 'home' && <Home/>}
                    {page === 'account' && <Account/>}
                    {page === 'control' && <Control/>}
                    {page === 'orders' && <OrderPage/>}
                </div>
            </div>
            <NotifyToaster/>
        </div>
    );
}

export default App;