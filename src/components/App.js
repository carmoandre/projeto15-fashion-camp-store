import { BrowserRouter, Switch, Route } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import { useState } from "react";
import UserContext from "../contexts/UserContext";
import Login from "./Login";
import Home from "./Home/Home";
import Register from "./Register";

export default function App() {
    const [user, setUser] = useState(null);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            <BrowserRouter>
                <ResetCSS />
                <GlobalStyle />
                <Switch>
                    <Route path="/sign-in" exact component={Login} />
                </Switch>
                <Switch>
                    <Route path="/sign-up" exact component={Register} />
                </Switch>
                <Switch>
                    <Route path="/" exact component={Home} />
                </Switch>
            </BrowserRouter>
        </UserContext.Provider>
    );
}

const ResetCSS = createGlobalStyle`
    /* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
    */
   html, body, div, span, applet, object, iframe,
    h1, h2, h3, h4, h5, h6, p, blockquote, pre,
    a, abbr, acronym, address, big, cite, code,
    del, dfn, em, img, ins, kbd, q, s, samp,
    small, strike, strong, sub, sup, tt, var,
    b, u, i, center,
    dl, dt, dd, ol, ul, li,
    fieldset, form, label, legend,
    table, caption, tbody, tfoot, thead, tr, th, td,
    article, aside, canvas, details, embed, 
    figure, figcaption, footer, header, hgroup, 
    menu, nav, output, ruby, section, summary,
    time, mark, audio, video {
        margin: 0;
        padding: 0;
        border: 0;
        font-size: 100%;
        font: inherit;
        vertical-align: baseline;
    }
    /* HTML5 display-role reset for older browsers */
    article, aside, details, figcaption, figure, 
    footer, header, hgroup, menu, nav, section {
        display: block;
    }
    body {
        line-height: 1;
    }
    ol, ul {
        list-style: none;
    }
    blockquote, q {
        quotes: none;
    }
    blockquote:before, blockquote:after,
    q:before, q:after {
        content: '';
        content: none;
    }
    table {
        border-collapse: collapse;
        border-spacing: 0;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
    * {
        box-sizing: border-box;
    }
    strong {
        font-weight: bold;
    }
`;

const GlobalStyle = createGlobalStyle`
    body {
        background: #0A1931;
        font-family: 'Open Sans', sans-serif;
    }

    input {
        font-family: 'Open Sans', sans-serif;
    }
`;

//colors:
//#0A1931
//#185ADB
//#FFC947
//#EFEFEF

//fonts:
//font-family: 'Open Sans', sans-serif;
//font-family: 'Permanent Marker', cursive;
