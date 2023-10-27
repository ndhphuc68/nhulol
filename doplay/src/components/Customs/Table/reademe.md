những dòng dữ liệu sẽ không hiển thị ra : id_row, columnHide;

const setting = {
id_row: "id_item",
bgColumns: "#F2F2F2",
actionType: "indirect",
columnHide: 'column4',
columnViewHideColumMobile: 'column2'


[//]: # (  áp dụng cho row có trạng thái active)

    stateRow: {
        rowActiveStyles: {
            'color': '#3F3F46',
            'font-size': '16px',
            'font-weight': '700'
        },
        activeByData: 'status',
        conditionActive: 'Unread'
    }

};
};
const columns = {
column1: {
label: "column",
keySuccess: "success",
keyWarn: "warn",
keyError: "error",
styles: [],
},
column2: {
label: "column column 2",
isAction: true,
styles: [],
},
column3: {
label: "column column column 3",
styles: [],
isAction: false,
actionComponent: `<div> <img alt="icon-up" style="width: 18px; height: 18px" src=${require("@/assets/icon/commons/up.png")} /></div>`,
},
actions: {
label: "action",
type: "component",
component: () => ActionIndirect,
styles: [],
},
};
const rows = [
{
id_item: "1",
column1: "success",
column2: "ok",
column3: "ok",
column4: 'So 4 ne'
},
{
id_item: "2",
column1: "error",
column2: "ok",
column3: "ok",
column4: 'So 4 ne'
},
{
id_item: "3",
column1: "warn",
column2: "/pppppppppppp",
column3: "ttttttttt",
column4: 'So 4 ne'
},
{
id_item: "4",
column1: "số 1 nè",
column2: "yyyyyyyyyy",
column3: "ddd",
column4: 'So 4 ne'
},
{
id_item: "5",
column1: "số 1 nè",
column2: "content",
column3: "content",
column4: 'So 4 ne'
},
{
id_item: "6",
column1: "số 1 nè",
column2: "content",
column3: "content",
column4: 'So 4 ne'
},
{
id_item: "7",
column1: "số 1 nè",
column2: "content",
column3: "content",
column4: 'So 4 ne'
},
{
id_item: "8",
column1: "số 1 nè",
column2: "content",
column3: "content",
column4: 'So 4 ne'
},
{
id_item: "9",
column1: "số 1 nè",
column2: "content",
column3: "content",
column4: 'So 4 ne'
},
];
