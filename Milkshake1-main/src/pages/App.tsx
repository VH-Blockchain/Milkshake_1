import React, { Suspense, useEffect, useState, createContext } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";
import * as bsc from '@binance-chain/bsc-use-wallet'
import styled from "styled-components";
import Popups from "../components/Popups";
import Web3ReactManager from "../components/Web3ReactManager";
import { EN, allLanguages } from "../constants/localisation/languageCodes";
import { LanguageContext } from "../hooks/LanguageContext";
import { TranslationsContext } from "../hooks/TranslationsContext";
// import TopLabelCard from '../components/TopLabelCard/TopLabelCard'
import Menu from "../components/Menu";
import Header from "../common/header/Header";
import Footer from "../common/footer/Footer";
import Banner from "../common/Banner";
import Home from "./Home";
import Farm from "./Farm";
// import Pool from "./Pool";
import Lottery from "./Lottery";
import PostDraw from "./PostDraw";
import Dra from "./Dra";
// import ErrorPage from "./404";

const AppWrapper = styled.div`
  display: flex;
  flex-flow: column;
  overflow-x: hidden;
`;

const BodyWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
  z-index: 1;
  background-repeat: no-repeat;
`;

const Marginer = styled.div`
  margin-top: 5rem;
`;

export default function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<any>(undefined);
  const [translatedLanguage, setTranslatedLanguage] = useState<any>(undefined);
  const [translations, setTranslations] = useState<Array<any>>([]);

  const milkAddress = "0xc9bCF3f71E37579A4A42591B09c9dd93Dfe27965";
  const masterChefAddress = "0x9c19eB54c759c9369C788D6554f08Bb6cAdab10d";
  const lotteryAddress = "0xc4E8Ce0AE31623B6D43Fd9946AE9B75354ad9ba2";
  const rpcUrl = "https://bsc-dataseed.binance.org/"

  // all connectivity code starts===================================================

  return (
    <Suspense fallback={null}>
      <HashRouter>
        <AppWrapper>
        <bsc.UseWalletProvider
            chainId={56}
            connectors={{
              walletconnect: { rpcUrl },
              bsc,
            }}
          >
          <LanguageContext.Provider
            value={{
              selectedLanguage,
              setSelectedLanguage,
              translatedLanguage,
              setTranslatedLanguage,
            }}
          >
            <TranslationsContext.Provider
              value={{ translations, setTranslations }}
            >
              <Menu />
              <Header />
              <BodyWrapper>
                <Popups />
                <Web3ReactManager>
                  <Switch>
                    <Route exact strict path="/" component={Home} />
                    <Route exact strict path="/lotto" component={Lottery} />
                    <Route
                      exact
                      strict
                      path="/post-draw"
                      component={PostDraw}
                    />
                    <Route exact strict path="/farm" component={Farm} />
                    {/* <Route exact strict path="/farm" component={Farm} />
                    <Route exact strict path="/pool" component={Pool} />
                    <Route exact strict path="/next-draw" component={Lottery} />
                    <Route exact strict path="/post-draw" component={PostDraw} />
                    <Route exact strict path="/dra" component={Dra} />
                    <Route exact strict path="/404" component={ErrorPage} /> */}
                  </Switch>
                </Web3ReactManager>
                <Marginer />
              </BodyWrapper>

              {/* <div style={{marginBottom:"15rem"}}/> */}
              <Footer />
            </TranslationsContext.Provider>
          </LanguageContext.Provider>
          </bsc.UseWalletProvider>
        </AppWrapper>
      </HashRouter>
    </Suspense>
  );
}
