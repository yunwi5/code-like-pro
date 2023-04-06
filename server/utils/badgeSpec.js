const {
    BadgeCategory,
    BadgeCategoryList,
    BadgeAmountOptions,
    BadgeAmountOptionsList,
    BadgeRarityOptions,
} = require('../models/enums');

// Get the badge specs requested by the user, if it exists.
const getRequestedBadgeSpec = (category, amountRequested) => {
    // If the category is invalid, return null to indicate nothing matched
    if (!BadgeCategoryList.includes(category)) return null;
    // If the amount is invalid, return null to indicate nothing matched
    if (!BadgeAmountOptionsList.includes(amountRequested)) return null;

    switch (category) {
        case BadgeCategory.CREATION:
            return creationBadgeSpecs[amountRequested];
        case BadgeCategory.SOLVING:
            return solvingBadgeSpecs[amountRequested];
        case BadgeCategory.SHOWCASE:
            return showcaseBadgeSpecs[amountRequested];
        default:
            return null;
    }
};

const creationBadgeSpecs = {
    [BadgeAmountOptions.N]: {
        name: 'Creating 1+ exercises',
        category: BadgeCategory.CREATION,
        description: 'You created 1 or more exercises',
        rarity: BadgeRarityOptions.N,
    },
    [BadgeAmountOptions.R]: {
        name: 'Creating 5+ exercises',
        category: BadgeCategory.CREATION,
        description: 'You created 5 or more exercises',
        rarity: BadgeRarityOptions.R,
    },
    [BadgeAmountOptions.SR]: {
        name: 'Creating 10+ exercises',
        category: BadgeCategory.CREATION,
        description: 'You created 10 or more exercises',
        rarity: BadgeRarityOptions.SR,
    },
    [BadgeAmountOptions.UR]: {
        name: 'Creating 50+ exercises',
        category: BadgeCategory.CREATION,
        description: 'You created 50 or more exercises',
        rarity: BadgeRarityOptions.UR,
    },
};

const solvingBadgeSpecs = {
    [BadgeAmountOptions.N]: {
        name: 'Solving 1+ exercises',
        category: BadgeCategory.SOLVING,
        description: 'You solved 1 or more exercises',
        rarity: BadgeRarityOptions.N,
    },
    [BadgeAmountOptions.R]: {
        name: 'Solving 5+ exercises',
        category: BadgeCategory.SOLVING,
        description: 'You solved 5 or more exercises',
        rarity: BadgeRarityOptions.R,
    },
    [BadgeAmountOptions.SR]: {
        name: 'Solving 10+ exercises',
        category: BadgeCategory.SOLVING,
        description: 'You solved 10 or more exercises',
        rarity: BadgeRarityOptions.SR,
    },
    [BadgeAmountOptions.UR]: {
        name: 'Solving 50+ exercises',
        category: BadgeCategory.SOLVING,
        description: 'You solved 50 or more exercises',
        rarity: BadgeRarityOptions.UR,
    },
};

const showcaseBadgeSpecs = {
    [BadgeAmountOptions.N]: {
        name: 'Showcasing 1+ solutions',
        category: BadgeCategory.SHOWCASE,
        description: 'You showcased 1 or more exercise solutions',
        rarity: BadgeRarityOptions.N,
    },
    [BadgeAmountOptions.R]: {
        name: 'Showcasing 5+ solutions',
        category: BadgeCategory.SHOWCASE,
        description: 'You showcased 5 or more exercise solutions',
        rarity: BadgeRarityOptions.R,
    },
    [BadgeAmountOptions.SR]: {
        name: 'Showcasing 10+ solutions',
        category: BadgeCategory.SHOWCASE,
        description: 'You showcased 10 or more exercise solutions',
        rarity: BadgeRarityOptions.SR,
    },
    [BadgeAmountOptions.UR]: {
        name: 'Showcasing 50+ solutions',
        category: BadgeCategory.SHOWCASE,
        description: 'You showcased 50 or more exercise solutions',
        rarity: BadgeRarityOptions.UR,
    },
};

module.exports = {
    getRequestedBadgeSpec,
    creationBadgeSpecs,
    solvingBadgeSpecs,
    showcaseBadgeSpecs,
};
