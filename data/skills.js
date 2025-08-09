const SKILL_EMOJIS = {
    attack: '<:RR_att:1400796252374831175>',
    strength: '<:RR_str:1400796400073310258>',
    defence: '<:RR_def:1400796261246042143>',
    ranged: '<:RR_range:1400796291004633199>',
    prayer: '<:RR_prayer:1400796288332599336>',
    magic: '<:RR_magic:1400796284495069214>',
    runecrafting: '<:RR_runecrafting:1400796293483331604>',
    construction: '<:RR_constructionskill:1400796254270652552>',
    hitpoints: '<:RR_hp:1400796275779043339>',
    agility: '<:RR_agility:1400796250173083699>',
    herblore: '<:RR_herblore:1400796273753325579>',
    thieving: '<:RR_thieving:1400796304048783541>',
    crafting: '<:RR_crafting:1400796258989506650>',
    fletching: '<:RR_fletching:1400796271924740176>',
    slayer: '<:RR_slayer:1400796295911964683>',
    hunter: '<:RR_hunter:1400796281126781009>',
    mining: '<:RR_mining:1400796286218670133>',
    smithing: '<:RR_smithing:1400796298336276504>',
    fishing: '<:RR_fishing:1400796269601099797>',
    cooking: '<:RR_cookingskill:1400796256632311868>',
    firemaking: '<:RR_firemaking:1400796267130388490>',
    woodcutting: '<:RR_woodcutting:1400796306552782938>',
    farming: '<:RR_farming:1400796263498121296>'
};

const skills = {
    attack: {
        name: "Attack",
        emoji: SKILL_EMOJIS.attack,
        usd_per_xp: 0.000006 // $6 per million XP
    },
    strength: {
        name: "Strength",
        emoji: SKILL_EMOJIS.strength,
        usd_per_xp: 0.000006 // $6 per million XP
    },
    defence: {
        name: "Defence",
        emoji: SKILL_EMOJIS.defence,
        usd_per_xp: 0.000006 // $6 per million XP
    },
    ranged: {
        name: "Ranged",
        emoji: SKILL_EMOJIS.ranged,
        usd_per_xp: 0.00000594 // $5.94 per million XP
    },
    prayer: {
        name: "Prayer",
        emoji: SKILL_EMOJIS.prayer,
        usd_per_xp: 0.00000719 // $7.19 per million XP
    },
    magic: {
        name: "Magic",
        emoji: SKILL_EMOJIS.magic,
        usd_per_xp: 0.00001519 // $15.19 per million XP
    },
    runecrafting: {
        name: "Runecrafting",
        emoji: SKILL_EMOJIS.runecrafting,
        usd_per_xp: 0.00002349 // $23.49 per million XP
    },
    construction: {
        name: "Construction",
        emoji: SKILL_EMOJIS.construction,
        usd_per_xp: 0.00000655 // $6.55 per million XP
    },
    placeholder_hp: {
        name: "Hitpoints",
        emoji: SKILL_EMOJIS.hitpoints,
        usd_per_xp: 0 // Placeholder
    },
    agility: {
        name: "Agility",
        emoji: SKILL_EMOJIS.agility,
        usd_per_xp: 0.00002025 // $20.25 per million XP
    },
    herblore: {
        name: "Herblore",
        emoji: SKILL_EMOJIS.herblore,
        usd_per_xp: 0.00000504 // $5.04 per million XP
    },
    thieving: {
        name: "Thieving",
        emoji: SKILL_EMOJIS.thieving,
        usd_per_xp: 0.00001542 // $15.42 per million XP
    },
    crafting: {
        name: "Crafting",
        emoji: SKILL_EMOJIS.crafting,
        usd_per_xp: 0.00001199 // $11.99 per million XP
    },
    fletching: {
        name: "Fletching",
        emoji: SKILL_EMOJIS.fletching,
        usd_per_xp: 0.00000760 // $7.60 per million XP
    },
    slayer: {
        name: "Slayer",
        emoji: SKILL_EMOJIS.slayer,
        usd_per_xp: 0.00003022 // $30.22 per million XP
    },
    hunter: {
        name: "Hunter",
        emoji: SKILL_EMOJIS.hunter,
        usd_per_xp: 0.00001128 // $11.28 per million XP
    },
    mining: {
        name: "Mining",
        emoji: SKILL_EMOJIS.mining,
        usd_per_xp: 0.00002349 // $23.49 per million XP
    },
    smithing: {
        name: "Smithing",
        emoji: SKILL_EMOJIS.smithing,
        usd_per_xp: 0.00002401 // $24.01 per million XP
    },
    fishing: {
        name: "Fishing",
        emoji: SKILL_EMOJIS.fishing,
        usd_per_xp: 0.00002278 // $22.78 per million XP
    },
    cooking: {
        name: "Cooking",
        emoji: SKILL_EMOJIS.cooking,
        usd_per_xp: 0.00000417 // $4.17 per million XP
    },
    firemaking: {
        name: "Firemaking",
        emoji: SKILL_EMOJIS.firemaking,
        usd_per_xp: 0.00000557 // $5.57 per million XP
    },
    woodcutting: {
        name: "Woodcutting",
        emoji: SKILL_EMOJIS.woodcutting,
        usd_per_xp: 0.00001304 // $13.04 per million XP
    },
    farming: {
        name: "Farming",
        emoji: SKILL_EMOJIS.farming,
        usd_per_xp: 0.00001988 // $19.88 per million XP
    }
};

module.exports = skills;