import { converTime } from "@/utils/PlayG3";

export const columns = [
  {
    field: "index",
    header: "#",
    isIndex: true,
  },
  {
    field: "cu_question",
    header: "title",
    callback: (data) => {
      return data?.length > 50 ? data?.slice(0, 50) + "..." : data;
    },
    isTitle: true,
  },
  {
    field: "cu_status",
    header: "status",
    isStatus: true,
  },
  {
    field: "cu_created",
    callback: (date) => {
      return converTime(date);
    },
    header: "date",
    isDate: true,
  },
];

export const infoTable = [
  {
    cu_idx: 0,
    cu_question: "Question 1",
    cu_status: "COMPLETE",
    cu_created: "20220715",
    cu_answer: "kkk ok ok 1 1000",
    de_end_date: "20220715",
    de_status: "COMPLETED",
  },
  {
    cu_idx: 1,
    cu_question: "Question 1",
    cu_status: "ACTIVE",
    cu_created: "20220715",
    cu_answer: "kkk ok ok 1 1000",
    de_end_date: "20220715",
    de_memo: "Lorem",
    de_detail: "Detail",
    de_status: "COMPLETED",
  },
  {
    cu_idx: 2,
    cu_question: "Question 1",
    cu_status: "ACTIVE",
    cu_created: "20220715",
    cu_answer: "kkk ok ok 1 1000",
    de_end_date: "20220715",
    de_memo: "Lorem",
    de_detail: "Detail",
    de_status: "REQUEST",
  },
  {
    cu_idx: 3,
    cu_question: "Question 1",
    cu_status: "FAILED",
    cu_created: "20220715",
    cu_answer: "kkk ok ok 1 1000",
    de_end_date: "20220715",
    de_memo: "Lorem",
    de_detail: "Detail",
    de_status: "REQUEST",
  },
  {
    cu_idx: 4,
    cu_question: "Question 1",
    cu_status: "FAILED",
    cu_created: "20220715",
    cu_answer: "kkk ok ok 1 1000",
    de_end_date: "20220715",
    de_memo: "Lorem",
    de_detail: "Detail",
    de_status: "REQUEST",
  },
  {
    cu_idx: 5,
    cu_question: "Question 1",
    cu_status: "ACTIVE",
    cu_created: "20220715",
    cu_answer: "kkk ok ok 1 1000",
    de_end_date: "20220715",
    de_memo: "Lorem",
    de_detail: "Detail",
    de_status: "REQUEST",
  },
  {
    cu_idx: 6,
    cu_question: "Question 1",
    cu_status: "COMPLETE",
    cu_answer: "kkk ok ok 1 1000",
    cu_created: "20220715",
    de_end_date: "20220715",
    de_memo: "Lorem",
    de_detail: "Detail",
    de_status: "ADMIN_CANCEL",
  },
];
