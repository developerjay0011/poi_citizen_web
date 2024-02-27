export const islike = (list: any, userid: string) => {
    if (Array.isArray(list)) {
        var listlikes = [...list];
        listlikes = listlikes?.filter((item) => item?.userid == userid);
        return Array.isArray(listlikes) && listlikes?.length > 0 ? true : false;
    }
    return false;
};

export const Shortlistbytime = (list = []) => {
    const combinedData = [...list];
    combinedData.sort((a: any, b: any) => {
        const dateA = new Date(a.created_date);
        const dateB = new Date(b.created_date);
        return dateB.getTime() - dateA.getTime()
    });
    return Array.isArray(combinedData) && combinedData
}
