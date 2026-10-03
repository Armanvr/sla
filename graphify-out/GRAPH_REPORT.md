# Graph Report - src  (2026-10-03)

## Corpus Check
- 129 files · ~58,646 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 3 file(s) not represented in the graph (top: .css 3)

## Summary
- 745 nodes · 1175 edges · 15 communities (14 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- Artifact Asset Manifest
- Weapon Asset Manifest
- Team Advancement Effects
- UI Design Primitives
- Hunter Equipment & Constants
- Hunter Data Registry
- Jinwoo Shadows & Weapons
- App Shell & Navigation
- Jinwoo Weapon Icons
- Core Asset Manifest
- Hunter Compare Page
- Shadow Asset Manifest
- Hunter Profile Page
- Home Page & Spotlight

## God Nodes (most connected - your core abstractions)
1. `_ungrouped` - 177 edges
2. `SectionHeader()` - 24 edges
3. `TeamGuidePowerDestruction()` - 17 edges
4. `BackLink()` - 15 edges
5. `DesignSystemPage()` - 15 edges
6. `HunterData` - 14 edges
7. `ComparePage()` - 14 edges
8. `TeamGuideGuildBoss()` - 14 edges
9. `Panel()` - 12 edges
10. `JinwooPanel()` - 11 edges

## Surprising Connections (you probably didn't know these)
- `HunterRoute()` --calls--> `HunterProfile()`  [EXTRACTED]
  router.tsx → components/HunterProfile.tsx
- `TeamGuideGuildBoss()` --calls--> `RunesSection()`  [EXTRACTED]
  pages/TeamGuideGuildBoss.tsx → components/hunter/RunesSection.tsx
- `TeamGuidePowerDestruction()` --calls--> `RunesSection()`  [EXTRACTED]
  pages/TeamGuidePowerDestruction.tsx → components/hunter/RunesSection.tsx
- `HunterEntry` --references--> `HunterData`  [EXTRACTED]
  data/hunters.ts → components/hunter/types.ts
- `HunterCard` --references--> `HunterData`  [EXTRACTED]
  pages/HomePage.tsx → components/hunter/types.ts

## Import Cycles
- None detected.

## Communities (15 total, 1 thin omitted)

### Community 0 - "Artifact Asset Manifest"
Cohesion: 0.01
Nodes (177): _ungrouped, 1.png, 2.png, 3.png, 4.png, Almighty Kargalgan's Boots.png, Almighty Kargalgan's Gloves.png, Almighty Kargalgan's Hat.png (+169 more)

### Community 1 - "Weapon Asset Manifest"
Cohesion: 0.02
Nodes (121): A Conviction and a Calling Icon.png, A Gentle Touch Icon.png, A Guardian's Will Icon.png, Allon's Orb Icon.png, Ancient Grimoire Icon.png, Another Level Icon.png, Arachnid's Hand Crossbow Icon.png, Baruka's Dagger Icon.png (+113 more)

### Community 2 - "Team Advancement Effects"
Cohesion: 0.05
Nodes (62): AggregatedEffect, aggregateTeamEffects(), DECREASE_RE, extractEffects(), INCREASE_RE, normalizeLabel(), ParsedEffect, parseNumber() (+54 more)

### Community 3 - "UI Design Primitives"
Cohesion: 0.08
Nodes (47): sectionTitleStyle, Badge(), Variant, AnchorProps, BaseProps, Button(), ButtonLink(), ButtonProps (+39 more)

### Community 4 - "Hunter Equipment & Constants"
Cohesion: 0.06
Nodes (45): ARMOR_SLOTS, classColors, CORE_SLOTS, elementColors, JEWELRY_SLOTS, rarityColors, skillSectionLabels, statIcons (+37 more)

### Community 5 - "Hunter Data Registry"
Cohesion: 0.04
Nodes (49): data_hunters_agnes_rivera, data_hunters_alicia_blanche, data_hunters_amamiya_mirei, data_hunters_antoine_martinez, data_hunters_baek_yoonho, data_hunters_cha_hae_in, data_hunters_cha_hae_in_pure_sword_princess, data_hunters_charlotte (+41 more)

### Community 6 - "Jinwoo Shadows & Weapons"
Cohesion: 0.07
Nodes (40): CoresSection(), JinwooPanel(), RowLabel(), SHADOWS, SHADOWS_BY_ID, ShadowSlot(), ShadowData, WeaponData (+32 more)

### Community 7 - "App Shell & Navigation"
Cohesion: 0.11
Nodes (24): App(), BottomTabBar(), NAV_ITEMS, NavItem, LINKS, Nav(), NavLink, useClock() (+16 more)

### Community 8 - "Jinwoo Weapon Icons"
Cohesion: 0.07
Nodes (27): Allon's_Orb_Icon.png, Demon_King's_Daggers_Icon.png, Demon_King's_Longsword_Icon.png, Demon_Knight's_Spear_Icon.png, Demonic_Plum_Flower_Sword_Icon.png, Divine_Quarterstaff_Icon.png, Ennio's_Roar_Icon.png, Fan_of_the_Fire_Demon_Icon.png (+19 more)

### Community 9 - "Core Asset Manifest"
Cohesion: 0.09
Nodes (21): Ancient Wraith's Mana Power.png, Ancient Wraith's Obession.png, Ancient Wraith's Right Hand.png, Arrogant Ruler's Gaze.png, Arrogant Ruler's Reflection.png, Arrogant Ruler's Will.png, Condensed Energy I.png, Condensed Energy II.png (+13 more)

### Community 10 - "Hunter Compare Page"
Cohesion: 0.18
Nodes (21): ALL_EQUIP_SLOTS, ColHeader(), CollapsibleGroup(), ComparePage(), computeCoreSlotScore(), computeSlotScore(), CORE_STATS_LIST, CoreCompare() (+13 more)

### Community 11 - "Shadow Asset Manifest"
Cohesion: 0.11
Nodes (18): Beru_General.png, Beste_General.png, Bigrock_General.png, Blades_General.png, Brute_General.png, Cerbie_General.png, Igris_General.png, Iron_General.png (+10 more)

### Community 12 - "Hunter Profile Page"
Cohesion: 0.19
Nodes (15): StatBar(), RunesSection(), BuildRecommendationsSection(), elementSlug, HunterAdvancementsCard(), HunterDetailsSection(), HunterImageCard(), HunterProfile() (+7 more)

### Community 13 - "Home Page & Spotlight"
Cohesion: 0.18
Nodes (15): HunterData, components_hunterprofile_hunterdata, elementSlug, HunterEntry, NewHunterSpotlight(), rarityClass, spotlightCardStyle, Ticker() (+7 more)

## Knowledge Gaps
- **445 isolated node(s):** `Body Armor of Chaotic Desire.png`, `Body Armor of Chaotic Infamy.png`, `Body Armor of Chaotic Wish.png`, `Body Armor of Glorious Arrogance.png`, `Body Armor of Kamish's Obession.png` (+440 more)
  These have ≤1 connection - possible missing edges. (Counts symbols only; 516 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `HunterData` connect `Home Page & Spotlight` to `Team Advancement Effects`, `UI Design Primitives`, `Hunter Equipment & Constants`, `Hunter Data Registry`, `Jinwoo Shadows & Weapons`, `Hunter Profile Page`?**
  _High betweenness centrality (0.028) - this node is a cross-community bridge._
- **Why does `SectionHeader()` connect `UI Design Primitives` to `Hunter Compare Page`, `Team Advancement Effects`, `Hunter Profile Page`, `App Shell & Navigation`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **What connects `Body Armor of Chaotic Desire.png`, `Body Armor of Chaotic Infamy.png`, `Body Armor of Chaotic Wish.png` to the rest of the system?**
  _445 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Artifact Asset Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.011235955056179775 - nodes in this community are weakly interconnected._
- **Should `Weapon Asset Manifest` be split into smaller, more focused modules?**
  _Cohesion score 0.01639344262295082 - nodes in this community are weakly interconnected._
- **Should `Team Advancement Effects` be split into smaller, more focused modules?**
  _Cohesion score 0.0532724505327245 - nodes in this community are weakly interconnected._
- **Should `UI Design Primitives` be split into smaller, more focused modules?**
  _Cohesion score 0.07831677381648158 - nodes in this community are weakly interconnected._