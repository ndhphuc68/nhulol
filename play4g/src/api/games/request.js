import { SSRRequest } from "@/api/axios";
import { BASE_API_URL2, BASE_API_URL } from "@/const";

export const getListGameProvider = async () => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL2,
      url: "/kgn/GetProvider",
      method: "POST",
    });
    return res;
  } catch (e) {
    (e)
  }
};

export const getListGameProviderGGE = async () => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL2,
      url: "/gge/GetProvider",
      method: "POST",
    });
    return res;
  } catch (e) {
    (e)
  }
};

export const getWithdrawAllWhenCloseGame = async (data) => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL,
      url: "/authentication/ooo_browser/withdrawAll",
      method: "POST",
      data,
    });
  } catch (e) {
    console.log(e);
  }
};

export const getListGameCompany = async (data) => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL2,
      url: "kgn/GetGameList",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return res;
  } catch (e) {
    (e)
  }
};

export const getListGameCompanyV3 = async (data) => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL2,
      url: "gge/GetGameList",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data,
    });
    return res;
  } catch (e) {
    (e)
  }
};

export const playGameV3 = async (data) => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL,
      url: "/game/gge/opPlay",
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      data,
    });
    return res;
  } catch (e) {
    (e)
    return null;
  }
};

export const playGame = async (data) => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL,
      url: "/game/play",
      method: "POST",
      headers: {
        "Content-Type": "text/plain",
      },
      data,
    });
    return res;
  } catch (e) {
    (e)
    return null;
  }
};

export const getListGameRequest = async (data) => {
  const res = await SSRRequest({
    baseURL: process.env.VUE_APP_META_API_URL,
    url: "/game/list/get",
    method: "POST",
    data,
  });
  return res;
};

export const getSldGameStartRequest = async (url) => {
  const res = await SSRRequest({
    baseURL: process.env.VUE_APP_META_API_URL,
    url: url,
    method: "GET",
  });
  return res;
};

export const getSldGameRequest = async (data) => {
  const res = await SSRRequest({
    baseURL: process.env.VUE_APP_META_API_URL2,
    url: "/sld/GetProvider",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return res;
};

export const getVavagateStartRequest = async (url) => {
  const res = await SSRRequest({
    baseURL: process.env.VUE_APP_META_API_URL,
    url: url,
    method: "GET",
  });
  return res;
};

export const getSldGameListRequest = async (data) => {
  const res = await SSRRequest({
    baseURL: process.env.VUE_APP_META_API_URL2,
    url: "/sld/GetGameList",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
  return res;
};

export const playGameTOS = async () => {
  try {
    const res = await SSRRequest({
      baseURL: BASE_API_URL,
      url: "/game/TOS/play",
      method: "GET",
      headers: {
        "Content-Type": "text/plain",
      },
    });
    return res;
  } catch (e) {
    (e)
    return null;
  }
};
