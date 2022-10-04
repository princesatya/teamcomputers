import { URL_RESOLVER } from '../assets/graphql';
import { apiHandler } from '../api';
import { endpoint } from '../api/endpoint';

export const getSampleCurrencyFormat = (currency, value) => {
  switch (currency) {
    case "NGN":
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency,
      }).format(value);
    case "KES":
      return new Intl.NumberFormat("sw-KE", {
        style: "currency",
        currency,
      }).format(value);
    case "USD":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency,
      }).format(value);
    case "EUR":
      return new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency,
      }).format(value);
    case "GBP":
      return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "GBP",
      }).format(value);
    case "XAF":
      return new Intl.NumberFormat("fr-CM", {
        style: "currency",
        currency: "XAF",
      }).format(value);
    case "INR":
      return new Intl.NumberFormat("en-IN", {
        style: "currency",
        currency,
      }).format(value);
    default:
      return new Intl.NumberFormat("en-NG", {
        style: "currency",
        currency: currency || "INR",
      }).format(value);
  }
};

export const getUrlResolver = async (url_key) => {
  const result = await apiHandler({
    url: endpoint.GRAPHQL_URL,
    method: 'POST',
    data: {
      "base_url": endpoint.API_BASE_URL,
      "variables": {url: url_key + ".html"},
      "query": URL_RESOLVER
    },
  });
  return result.data;
  // if (!result.data.error_code) {
  //     dispatch(saveProductlist(result.data.products?.items));
  // }
}

