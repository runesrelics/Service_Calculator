function formatGP(amount) {
    if (amount >= 1000000) {
        return `${Math.floor(amount / 1000000)}M`;
    } else if (amount >= 1000) {
        return `${Math.floor(amount / 1000)}K`;
    }
    return amount.toString();
}

module.exports = {
    formatGP
};