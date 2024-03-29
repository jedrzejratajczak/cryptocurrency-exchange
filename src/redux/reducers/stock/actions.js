import axios from 'axios';
import { BASE_CURRENCY } from '../../../utils/constants';
import { snackActions } from '../../../utils/SnackbarUtils';

const BASE_URL = 'https://api.coingecko.com/api/v3/coins/markets';
const NO_CONNECTION_SNACKBAR_KEY = 'noConnection';
const AVAILABLE_STOCKS = [
  'bitcoin',
  'ethereum',
  'cardano',
  'dogecoin',
  'ripple',
  'polkadot',
  'uniswap',
  'chainlink',
  'litecoin',
  'stellar'
];

export const STOCK_GET_INIT = 'stock/get/init';
export const STOCK_GET_SUCCESS = 'stock/get/success';
export const STOCK_GET_FAILURE = 'stock/get/failure';

export const getStockInit = () => ({ type: STOCK_GET_INIT });

export const getStockFail = (error) => ({
  type: STOCK_GET_FAILURE,
  payload: { error }
});

export const getStockSuccess = (stockData) => ({
  type: STOCK_GET_SUCCESS,
  payload: { stockData }
});

const fetchStockData = async () => {
  const cacheBuster = Math.round(new Date().getTime() / 1000);
  const url = `${BASE_URL}?vs_currency=${BASE_CURRENCY}&ids=${AVAILABLE_STOCKS.join(',')}&cb=${cacheBuster}`;
  const { data } = await axios.get(url);
  return data;
};

export const getTickers = () => async (dispatch) => {
  dispatch(getStockInit());
  try {
    const data = await fetchStockData();
    dispatch(getStockSuccess(data));
    snackActions.dismiss(NO_CONNECTION_SNACKBAR_KEY);
  } catch (error) {
    dispatch(getStockFail(error.message));
    snackActions.toast(error.message, {
      variant: 'error',
      preventDuplicate: true,
      persist: true,
      key: NO_CONNECTION_SNACKBAR_KEY
    });
  }
};
