// Helper to build a MongoDB query for search
const buildSearchQuery = (search) => {
    if (!search) return {}; // If no search term, return an empty query (fetch all products)

    return {
        $or: [
            { title: { $regex: search, $options: "i" } }, // Case-insensitive match on 'name'
            { description: { $regex: search, $options: "i" } }, // Match on 'description'
        ],
    };
};

module.exports = { buildSearchQuery };
