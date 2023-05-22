import { Notice } from "view-ui-plus";

export const info = (msg, i = "Hey !") => {
    Notice.info({
        title: i,
        desc: msg,
    });
};
export const success = (msg, i = "Great!") => {
    Notice.success({
        title: i,
        desc: msg,
    });
};
export const warning = (msg, i = "Hey!") => {
    Notice.warning({
        title: i,
        desc: msg,
    });
};
export const error = (msg, i = "Oops!") => {
    Notice.error({
        title: i,
        desc: msg,
    });
};
export const swr = () => {
    Notice.error({
        title: "Oops",
        desc: "Something went wrong, please try again later. 😨😨😨",
    });
};
