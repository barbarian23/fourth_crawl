export const getListTdTag = paragraph => {
    var regex = "[<][t][d][^>]+>[^<]+<\/td>/gm";
    return found = paragraph.match(regex);
}

export const getListMiddleNumber = paragraph => {
    var regex = "([>]|[\s])[\d][^<]+</gm";
    return found = paragraph.match(regex);
}

export const getListNumberMoney = paragraph => {
    var regex = "[\d]+[^<]+/gm";
    return found = paragraph.match(regex);
}


