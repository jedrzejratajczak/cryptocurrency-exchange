import React from 'react';
import databaseService from './services/databaseService';
import { USERS_PROFILES } from './utils/constants';
import SiteHeading from './containers/SiteHeading';
import MarketPage from './containers/MarketPage';
import { wrapper } from './App.module.scss';

const App = () => {
  databaseService.setItem(USERS_PROFILES, [{
    userId: 1,
    funds: {
      ETH: 5,
      USD: 10
    }
  }]);
  return (
    <div className={wrapper}>
      <SiteHeading />
      <MarketPage />
    </div>
  );
};

export default App;
