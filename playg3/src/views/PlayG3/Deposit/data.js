import { convertMoney, formatDate } from "@/utils/PlayG3";

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
  },
  {
    field: "de_created",
    callback: (date) => {
      return formatDate(date);
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