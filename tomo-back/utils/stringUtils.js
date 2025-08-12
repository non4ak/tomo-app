const stripTags = (html) => {
    return html.replace(/<[^>]*>/g, "").trim();
};

module.exports = {
    stripTags
};
