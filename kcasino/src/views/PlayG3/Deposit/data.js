import { convertMoney } from "@/utils/PlayG3";
import { converTime } from "@/utils";
import i18n from "@/locales/i18n";

export const columns = [
  {
    field: "index",
    header: "#",
    isIndex: true,
  },
  {
    field: "de_member_account",
    header: "depositUser",
  },
  {
    field: "de_status",
    header: "status",
    isStatus: true,
    callback: (status) => {
      return i18n.global.t(status)
    }
  },
  {
    field: "de_created",
    callback: (date) => {
      return converTime(date,true);
    },
    header: "dateOfRequest",
  },
  {
    field: "de_money",
    callback: (amount) => {
      return convertMoney(amount);
    },
    header: "depositAmount",
  },
];


export const listDeposit = [
  {
    de_member_account: "test",
    de_status: "COMPLETED",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "COMPLETED",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "REQUEST",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "ADMIN_CANCEL",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "REQUEST",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "REQUEST",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "REQUEST",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "REQUEST",
    de_created: "12/2/2018",
    de_money: 121222,
  },
  {
    de_member_account: "test",
    de_status: "REQUEST",
    de_created: "12/2/2018",
    de_money: 121222,
  },
];