import React, { Suspense } from 'react';
import { Route, Switch } from 'react-router-dom';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import OurStore from './components/ourStore/OurStore';
import Error from './components/Error';
import Header from './components/header/Header';
import CardList from './components/cardList/CardList';
import CardDetail from './components/cardDetail/CardDetail';
import Login from './components/auth/Login';
import SignUp from './components/auth/SignUp';


function Router() {

    return (
        <>
            <Switch>
                <Route exact path="/" component={CardList} />
                <Route exact path="/cart/:id" component={CardDetail } />
                <Route exact path="/our-store" component={OurStore} />
                <Route exact path="/about" component={About} />
                <Route exact path="/contact" component={Contact} />
                <Route path="/signup" component={SignUp} />
                <Route path="/login" component={Login} />
                <Route exact path="*" component={Error} />
            </Switch>
        </>
    );
}

export default Router;
