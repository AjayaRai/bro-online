import React from 'react';
import './App.css';
import Header from "./Header";
import Sidebar from "./Sidebar";
import Feed from "./Feed";
import Widgets from "./Widgets";
import Login from "./Login";
import {useStateValue} from "./StateProvider";

function App() {
    const [{user}, dispatch] = useStateValue();

    return (
        <div className="app">
            {/* 3:09:00 goes into more dept about REDUX... and how the access of the content works via data layer; in other ways, only the logged in user can go to the site */}

            {!user ? (
                <Login />
            ) : (
                <>
                    <Header />

                    <div className="app__body">
                        <Sidebar />
                        <Feed />
                        {/*<Widgets />*/}
                    </div>
                </>
            )}
        </div>
    );
}

export default App;
