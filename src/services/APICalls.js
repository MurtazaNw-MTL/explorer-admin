import { BASE_CALL } from "./baseCall";
const BASE = {
  // USER: "/v1/user",
  PRODUCT: "/product/v1",
  CATEGORY: "/product/v1/category",
  GAME: "/v1/game",
  USER: "/user",
  ROADMAP: "/v1/roadmap",

  TRANSACTION: "/v1/transaction"
};

export const CALL_API = {
  LOGIN: {
    login: async (payload) =>
      await BASE_CALL.post(
        `/admin/login?email=${payload.email}&password=${payload.password}`,
        payload
      ),
    UpdatePassword: async (payload) =>
      await BASE_CALL.put("/admin/update", payload)
  },
  table: {
    data: async (payload) => await BASE_CALL.get(`/table/get`, payload),
    update: async (payload) => await BASE_CALL.put(`/table/update`, payload)
    // UpdatePassword:async (payload)=>await BASE_CALL.put("/admin/update",payload)
  },

  USER: {
    get: async (params) => await BASE_CALL.get(BASE.USER + "/getAll", params),
    create: async (payload) => {
      console.log(payload, "<<<<thisispayload");
      return await BASE_CALL.post(BASE.USER + "/create", payload);
    },
    put: async (payload) => await BASE_CALL.put(BASE.USER + "/update", payload),
    delete: async (address) =>
      await BASE_CALL.delete(BASE.USER + "/remove/" + address, {})
  },

  EthTxsAPIs: {
    update:async (body)=>await BASE_CALL.put(`/admin-tx-eth-controller/update`,body),
    create:async (body)=>await BASE_CALL.post("/admin-tx-eth-controller/create",body),
    get: async (payload) => await BASE_CALL.get(`/admin-tx-eth-controller/get/${payload.hash}`),
    getRemoteTxsDAta:async(payload)=>await BASE_CALL.get("/txs/txs",payload)
  },
  BtcTxsAPIs: {
    update:async (body)=>await BASE_CALL.put(`/admin-tx-btc-controller/update`,body),
    create:async (body)=>await BASE_CALL.post("/admin-tx-btc-controller/create",body),
    get: async (payload) => await BASE_CALL.get(`/admin-tx-btc-controller/get/${payload.hash}`),
    getRemoteTxsDAta:async(payload)=>await BASE_CALL.get("/txs/txs",payload)
  }
};
