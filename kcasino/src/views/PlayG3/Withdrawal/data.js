import { convertMoney, formatDate } from "@/utils/PlayG3";
import { converTime } from "@/utils";

export const columns = [
  {
    field: "index",
    header: "#",
    isIndex: true,
  },
  {
    field: "wi_member_account",
    header: "withdrawUser",
  },
  {
    field: "wi_status",
    header: "status",
    isStatus: true,
  },
  {
    field: "wi_created",
    callback: (date) => {
      return converTime(date,true);
    },
    header: "dateOfRequest",
  },
  {
    field: "wi_money",
    callback: (amount) => {
      return convertMoney(amount);
    },
    header: "withdrawAmount",
  },
];


export const listDeposit = [
  {
    wi_member_account: "test",
    wi_status: "COMPLETED",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "COMPLETED",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "REQUEST",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "ADMIN_CANCEL",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "REQUEST",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "REQUEST",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "REQUEST",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "REQUEST",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
  {
    wi_member_account: "test",
    wi_status: "REQUEST",
    wi_created: "12/2/2018",
    wi_money: 121222,
  },
];