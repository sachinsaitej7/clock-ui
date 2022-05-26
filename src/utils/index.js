export const getSummaryData = (items) => { 
    let total = 0;
    let totalItems = 0;
    let totalDiscount = 0;
    items.forEach((item) => {
        total += item.price * item.quantity;
        totalItems += item.quantity;
        totalDiscount += item.discount * item.quantity;
    });
    return { total, totalItems, totalDiscount };
};