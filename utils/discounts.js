const ROLE_DISCOUNTS = {
    'Eternal': 0.03,  // 3% discount
    'Relic': 0.05     // 5% discount
};

function getDiscount(member) {
    if (!member) return 0;

    // Find the highest discount role the member has
    let maxDiscount = 0;
    for (const [roleName, discount] of Object.entries(ROLE_DISCOUNTS)) {
        if (member.roles.cache.some(role => role.name === roleName)) {
            maxDiscount = Math.max(maxDiscount, discount);
        }
    }
    return maxDiscount;
}

function applyDiscount(price, discount) {
    return price * (1 - discount);
}

module.exports = {
    ROLE_DISCOUNTS,
    getDiscount,
    applyDiscount
};