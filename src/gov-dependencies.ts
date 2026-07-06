export interface ReusedCodeEntry {
  name: string;
  URL: string;
}

// each dependency gets its own entry with the repository URL where the source code is hosted
export const USWDS: ReusedCodeEntry = {
  name: "U.S. Web Design System (USWDS)",
  URL: "https://github.com/uswds/uswds",
};
const PUBLIC_SANS: ReusedCodeEntry = {
  name: "Public Sans (GSA / USWDS)",
  URL: "https://public-sans.digital.gov/",
};
const EIGHTEEN_F: ReusedCodeEntry = {
  name: "18F (GSA / TTS)",
  URL: "https://github.com/18F",
};
const GSA: ReusedCodeEntry = {
  name: "U.S. General Services Administration (GSA)",
  URL: "https://github.com/GSA",
};
const GSA_TTS: ReusedCodeEntry = {
  name: "GSA Technology Transformation Services (TTS)",
  URL: "https://github.com/GSA-TTS",
};
const SAM_GOV: ReusedCodeEntry = {
  name: "SAM.gov (GSA)",
  URL: "https://sam.gov/",
};
const SAM_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "SAM.gov Design System (GSA)",
  URL: "https://github.com/GSA/sam-design-system",
};
const CODE_GOV: ReusedCodeEntry = {
  name: "Code.gov (GSA)",
  URL: "https://github.com/GSA/code-gov",
};
const OPENACR: ReusedCodeEntry = {
  name: "OpenACR (GSA)",
  URL: "https://github.com/GSA/openacr",
};
const GSA_DAP: ReusedCodeEntry = {
  name: "GSA Digital Analytics Program",
  URL: "https://github.com/18F/analytics-reporter",
};
const LOGIN_GOV: ReusedCodeEntry = {
  name: "Login.gov Identity Design System (18F)",
  URL: "https://design.login.gov/",
};
const FEC_STYLE: ReusedCodeEntry = {
  name: "Federal Election Commission (FEC) style (18F)",
  URL: "https://github.com/18F/fec-style",
};
const USDS: ReusedCodeEntry = {
  name: "U.S. Digital Service (USDS)",
  URL: "https://www.usds.gov/",
};
const PIF: ReusedCodeEntry = {
  name: "Presidential Innovation Fellows (GSA)",
  URL: "https://github.com/presidential-innovation-fellows",
};
const MYUSA: ReusedCodeEntry = {
  name: "MyUSA (GSA Innovation Toolkit)",
  URL: "https://github.com/Innovation-Toolkit",
};

export const USWDS_COMPILE: ReusedCodeEntry = {
  name: "USWDS Compile",
  URL: "https://github.com/uswds/uswds-compile",
};

export const CMS_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "CMS Design System",
  URL: "https://github.com/CMSgov/design-system",
};

export const CMS_DS_HEALTHCARE_GOV: ReusedCodeEntry = {
  name: "CMS Design System - HealthCare.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-healthcare-gov",
};

export const CMS_DS_MEDICARE_GOV: ReusedCodeEntry = {
  name: "CMS Design System - Medicare.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-medicare-gov",
};

export const CMS_DS_CMS_GOV: ReusedCodeEntry = {
  name: "CMS Design System - CMS.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-cms-gov",
};

const CMS_CMCS: ReusedCodeEntry = {
  name: "CMS Enterprise (CMCS)",
  URL: "https://github.com/Enterprise-CMCS",
};
const CMS_EASI: ReusedCodeEntry = {
  name: "CMS EASi",
  URL: "https://github.com/CMSgov/easi-app",
};
const CMS_BLUE_BUTTON: ReusedCodeEntry = {
  name: "CMS Blue Button 2.0 SDK",
  URL: "https://bluebutton.cms.gov/",
};
const CMS_MRF_VALIDATOR: ReusedCodeEntry = {
  name: "CMS Hospital Price Transparency Validator",
  URL: "https://github.com/CMSgov/hpt-validator",
};
const QPP: ReusedCodeEntry = {
  name: "CMS Quality Payment Program (QPP)",
  URL: "https://github.com/CMSgov",
};
const QPP_MEASURES_DATA: ReusedCodeEntry = {
  name: "CMS Quality Payment Program (QPP) Measures Data",
  URL: "https://github.com/CMSgov/qpp-measures-data",
};
const QPP_SUBMISSIONS_SCHEMA: ReusedCodeEntry = {
  name: "CMS Quality Payment Program (QPP) Submissions Schema",
  URL: "https://github.com/CMSgov/qpp-submissions-schema",
};
const CDC: ReusedCodeEntry = {
  name: "Centers for Disease Control and Prevention (CDC)",
  URL: "https://github.com/CDCgov",
};
const CDC_OPEN_VIZ: ReusedCodeEntry = {
  name: "CDC Open Viz",
  URL: "https://github.com/CDCgov/cdc-open-viz",
};
const CDC_CFA_SIMULATOR: ReusedCodeEntry = {
  name: "CDC CFA Simulator",
  URL: "https://github.com/CDCgov/cfa-simulator",
};
const HHS_COMMON_GRANTS: ReusedCodeEntry = {
  name: "HHS Simpler Grants (CommonGrants)",
  URL: "https://github.com/HHS/simpler-grants-protocol",
};
const HHS_TTA_HUB: ReusedCodeEntry = {
  name: "HHS Head Start TTA Hub",
  URL: "https://github.com/HHS/Head-Start-TTADP",
};
const HHS_GRANTSOLUTIONS: ReusedCodeEntry = {
  name: "HHS GrantSolutions (ACF)",
  URL: "https://www.grantsolutions.gov/",
};
const NLM_NCBI: ReusedCodeEntry = {
  name: "National Library of Medicine (NLM / NCBI)",
  URL: "https://github.com/ncbi",
};

const CFPB: ReusedCodeEntry = {
  name: "Consumer Financial Protection Bureau (CFPB)",
  URL: "https://github.com/cfpb",
};
const CFPB_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "Consumer Financial Protection Bureau (CFPB) Design System",
  URL: "https://cfpb.github.io/design-system/",
};
const CFPB_CAPITAL: ReusedCodeEntry = {
  name: "CFPB Capital Framework",
  URL: "https://github.com/cfpb/capital-framework",
};
const CFPB_CHART_BUILDER: ReusedCodeEntry = {
  name: "CFPB Chart Builder",
  URL: "https://github.com/cfpb/cfpb-chart-builder",
};
const CFPB_AMORTIZE: ReusedCodeEntry = {
  name: "CFPB Capital Framework (amortize)",
  URL: "https://github.com/cfpb",
};
const CFPB_FORMAT_USD: ReusedCodeEntry = {
  name: "CFPB Capital Framework (format-usd)",
  URL: "https://github.com/cfpb",
};

const VA: ReusedCodeEntry = {
  name: "Department of Veterans Affairs (VA)",
  URL: "https://github.com/department-of-veterans-affairs",
};
const VA_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "VA Design System",
  URL: "https://design.va.gov/",
};

const NASA_JPL: ReusedCodeEntry = {
  name: "NASA Jet Propulsion Laboratory (JPL)",
  URL: "https://github.com/nasa-jpl",
};
const NASA_WORLDWIND: ReusedCodeEntry = {
  name: "NASA WorldWind",
  URL: "https://worldwind.arc.nasa.gov/",
};
const NASA_TERRA: ReusedCodeEntry = {
  name: "NASA Terra UI",
  URL: "https://github.com/nasa/terra-ui-components",
};
const NASA_GCN: ReusedCodeEntry = {
  name: "NASA General Coordinates Network (GCN)",
  URL: "https://gcn.nasa.gov/",
};
const NASA_EARTHDATA: ReusedCodeEntry = {
  name: "NASA Earthdata",
  URL: "https://www.earthdata.nasa.gov/",
};
const NASA_CUMULUS: ReusedCodeEntry = {
  name: "NASA Cumulus",
  URL: "https://github.com/nasa/cumulus",
};
const NASA_EARTHDATA_PUB: ReusedCodeEntry = {
  name: "NASA Earthdata Pub",
  URL: "https://github.com/eosdis-nasa",
};
const NASA_EARTHDATA_SEARCH: ReusedCodeEntry = {
  name: "NASA Earthdata Search",
  URL: "https://search.earthdata.nasa.gov/",
};
const NASA_GES_DISC: ReusedCodeEntry = {
  name: "NASA GES DISC",
  URL: "https://disc.gsfc.nasa.gov/",
};
const NASA_GIBS: ReusedCodeEntry = {
  name: "NASA Global Imagery Browse Services (GIBS / Worldview)",
  URL: "https://github.com/nasa-gibs",
};
const NASA_WDS: ReusedCodeEntry = {
  name: "NASA Web Design System",
  URL: "https://nasa.github.io/nasawds-site/",
};
const OPEN_MCT: ReusedCodeEntry = {
  name: "NASA Open MCT",
  URL: "https://nasa.github.io/openmct/",
};
const SERVIR: ReusedCodeEntry = {
  name: "SERVIR (NASA / USAID)",
  URL: "https://servirglobal.net/",
};

const NGA: ReusedCodeEntry = {
  name: "National Geospatial-Intelligence Agency (NGA)",
  URL: "https://github.com/ngageoint",
};
const DOD: ReusedCodeEntry = {
  name: "U.S. Department of Defense",
  URL: "https://github.com/deptofdefense",
};
const NAVY_NUWC: ReusedCodeEntry = {
  name: "Navy NUWC Division Newport (STIG Manager)",
  URL: "https://github.com/NUWCDIVNPT",
};
const NAVY_PSNS: ReusedCodeEntry = {
  name: "Puget Sound Naval Shipyard (PSNS-IMF)",
  URL: "https://github.com/PSNS-IMF",
};
const ARMY_ERDC: ReusedCodeEntry = {
  name: "U.S. Army ERDC (Information Technology Lab)",
  URL: "https://github.com/erdc-itl",
};
const ARMY_CORPS: ReusedCodeEntry = {
  name: "U.S. Army Corps of Engineers (CorpsMap / CRREL)",
  URL: "https://github.com/crrel",
};
const ARMY_MILSYM: ReusedCodeEntry = {
  name: "U.S. Army Mission Command (mil-sym)",
  URL: "https://github.com/missioncommand",
};
const ARMY_CMAPI: ReusedCodeEntry = {
  name: "U.S. Army Mission Command (CMAPI)",
  URL: "https://github.com/missioncommand",
};
const NSA: ReusedCodeEntry = {
  name: "National Security Agency (NSA)",
  URL: "https://github.com/NationalSecurityAgency",
};
const NSA_SKILLTREE: ReusedCodeEntry = {
  name: "SkillTree (NSA)",
  URL: "https://github.com/NationalSecurityAgency/skills-service",
};
const ADL: ReusedCodeEntry = {
  name: "Advanced Distributed Learning (ADL) Initiative (DoD)",
  URL: "https://github.com/adlnet",
};
const ADL_CMI5: ReusedCodeEntry = {
  name: "ADL cmi5 / CATAPULT (DoD)",
  URL: "https://github.com/adlnet/CATAPULT",
};

const CBP: ReusedCodeEntry = {
  name: "U.S. Customs and Border Protection (CBP)",
  URL: "https://github.com/US-CBP",
};
const CBP_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "U.S. Customs and Border Protection (CBP) Design System",
  URL: "https://github.com/US-CBP",
};
const STATE_GPA: ReusedCodeEntry = {
  name: "State Dept GPA Design Lab (IIP)",
  URL: "https://github.com/IIP-Design",
};
const USCIS: ReusedCodeEntry = {
  name: "U.S. Citizenship and Immigration Services (USCIS)",
  URL: "https://github.com/USCIS",
};
const USPTO: ReusedCodeEntry = {
  name: "U.S. Patent and Trademark Office (USPTO) Design System",
  URL: "https://github.com/uspto",
};
const DOJ: ReusedCodeEntry = {
  name: "U.S. Department of Justice (DOJ)",
  URL: "https://github.com/usdoj",
};
const NARA: ReusedCodeEntry = {
  name: "U.S. National Archives and Records Administration (NARA)",
  URL: "https://github.com/usnationalarchives",
};
const SBA: ReusedCodeEntry = {
  name: "U.S. Small Business Administration (SBA)",
  URL: "https://github.com/USSBA",
};
const DOL_OFLC: ReusedCodeEntry = {
  name: "U.S. Department of Labor (DOL) OFLC",
  URL: "https://www.dol.gov/agencies/eta/foreign-labor",
};
const SSA: ReusedCodeEntry = {
  name: "Social Security Administration (SSA)",
  URL: "https://www.ssa.gov/",
};
const CENSUS: ReusedCodeEntry = {
  name: "U.S. Census Bureau",
  URL: "https://www.census.gov/",
};
const CENSUS_CITYSDK: ReusedCodeEntry = {
  name: "U.S. Census Bureau CitySDK",
  URL: "https://github.com/uscensusbureau/citysdk",
};

const USGS: ReusedCodeEntry = {
  name: "U.S. Geological Survey (USGS)",
  URL: "https://www.usgs.gov/",
};
const USGS_EHP: ReusedCodeEntry = {
  name: "USGS Earthquake Hazards Program (hazdev)",
  URL: "https://earthquake.usgs.gov/",
};
const USGS_NSHMP: ReusedCodeEntry = {
  name: "USGS National Seismic Hazard Model (NSHMP)",
  URL: "https://code.usgs.gov/ghsc/nshmp",
};
const NPS_NPMAP: ReusedCodeEntry = {
  name: "National Park Service (NPS) NPMap",
  URL: "https://github.com/nationalparkservice",
};
const USFWS: ReusedCodeEntry = {
  name: "U.S. Fish and Wildlife Service (USFWS)",
  URL: "https://github.com/USFWS",
};
const NOAA_GSL: ReusedCodeEntry = {
  name: "NOAA Global Systems Laboratory",
  URL: "https://gsl.noaa.gov/",
};
const NOAA_ORR: ReusedCodeEntry = {
  name: "NOAA Office of Response and Restoration (ORR / ERD)",
  URL: "https://github.com/NOAA-ORR-ERD",
};
const NOAA_IOOS: ReusedCodeEntry = {
  name: "NOAA Integrated Ocean Observing System (IOOS)",
  URL: "https://github.com/ioos",
};

const EPA_NGST: ReusedCodeEntry = {
  name: "U.S. Environmental Protection Agency (EPA) NGST",
  URL: "https://github.com/usepa/ngst-js-library",
};
const EPA_CAMD: ReusedCodeEntry = {
  name: "EPA Clean Air Markets Division (CAMD / EASEY)",
  URL: "https://github.com/US-EPA-CAMD",
};
const FAA: ReusedCodeEntry = {
  name: "FAA Aviation Data Portal",
  URL: "https://github.com/FAA-Aviation-Data-Portal",
};
const TAX_COURT: ReusedCodeEntry = {
  name: "U.S. Tax Court (DAWSON)",
  URL: "https://github.com/ustaxcourt",
};
const USDA_FSA: ReusedCodeEntry = {
  name: "USDA FPAC / FSA Design System",
  URL: "https://usda-fsa.github.io/fsa-design-system/",
};
const USDA_FPAC: ReusedCodeEntry = {
  name: "USDA FPAC Design System",
  URL: "https://github.com/USDA-FPAC/fds-style",
};
const USDA_FOREST_SERVICE: ReusedCodeEntry = {
  name: "USDA Forest Service",
  URL: "https://www.fs.usda.gov/",
};
const PNNL: ReusedCodeEntry = {
  name: "Pacific Northwest National Laboratory (PNNL)",
  URL: "https://github.com/pnnl",
};
const ORNL: ReusedCodeEntry = {
  name: "Oak Ridge National Laboratory (ORNL)",
  URL: "https://code.ornl.gov/",
};
const SANDIA: ReusedCodeEntry = {
  name: "Sandia National Laboratories",
  URL: "https://gitlab.sandia.gov/",
};

// keys are lowercased package names; each maps to its own unique entry.
// exact keys take priority over the scope-level fallbacks below
export const GOV_DEPENDENCIES: Record<string, ReusedCodeEntry> = {
  "@uswds/uswds": USWDS,
  "@uswds/compile": USWDS_COMPILE,
  "@cmsgov/design-system": CMS_DESIGN_SYSTEM,
  "@cmsgov/ds-healthcare-gov": CMS_DS_HEALTHCARE_GOV,
  "@cmsgov/ds-medicare-gov": CMS_DS_MEDICARE_GOV,
  "@cmsgov/ds-cms-gov": CMS_DS_CMS_GOV,

  "@uswds": USWDS,
  "@18f": EIGHTEEN_F,
  "@gsa-tts": GSA_TTS,
  "@gsa-sam": SAM_GOV,
  "@sam-design-system": SAM_DESIGN_SYSTEM,
  "@code.gov": CODE_GOV,
  "@openacr": OPENACR,
  "@usds.gov": USDS,
  "@cmsgov": CMS_DESIGN_SYSTEM,
  "@enterprise-cmcs": CMS_CMCS,
  "@easi-platform": CMS_EASI,
  "@cdc": CDC_OPEN_VIZ,
  "@us-gov-cdc": CDC,
  "@cfasim-ui": CDC_CFA_SIMULATOR,
  "@common-grants": HHS_COMMON_GRANTS,
  "@ttahub": HHS_TTA_HUB,
  "@cfpb": CFPB_DESIGN_SYSTEM,
  "@department-of-veterans-affairs": VA_DESIGN_SYSTEM,
  "@va-spl": VA,
  "@nasa-jpl": NASA_JPL,
  "@nasaworldwind": NASA_WORLDWIND,
  "@nasa-terra": NASA_TERRA,
  "@nasa-gcn": NASA_GCN,
  "@nasa-earthdata": NASA_EARTHDATA,
  "@cumulus": NASA_CUMULUS,
  "@edpub": NASA_EARTHDATA_PUB,
  "@edsc": NASA_EARTHDATA_SEARCH,
  "@gesdisc": NASA_GES_DISC,
  "@openmct": OPEN_MCT,
  "@servir": SERVIR,
  "@servirglobal": SERVIR,
  "@ngageoint": NGA,
  "@deptofdefense": DOD,
  "@nuwcdivnpt": NAVY_NUWC,
  "@psns": NAVY_PSNS,
  "@erdc-itl": ARMY_ERDC,
  "@corpsmap": ARMY_CORPS,
  "@io.github.missioncommand": ARMY_MILSYM,
  "@armyc2.c5isr.renderer": ARMY_MILSYM,
  "@skilltree": NSA_SKILLTREE,
  "@cmi5": ADL_CMI5,
  "@cbpds": CBP_DESIGN_SYSTEM,
  "@gpa-lab": STATE_GPA,
  "@nshmp": USGS_NSHMP,
  "@noaa-gsl": NOAA_GSL,
  "@usepa-ngst": EPA_NGST,
  "@us-epa-camd": EPA_CAMD,
  "@faa-aviation-data-portal": FAA,
  "@ustaxcourt": TAX_COURT,

  uswds: USWDS,
  openmct: OPEN_MCT,
  "public-sans": PUBLIC_SANS,
  nasawds: NASA_WDS,
  "fsa-style": USDA_FSA,
  "fds-style": USDA_FPAC,
  "identity-style-guide": LOGIN_GOV,
  "analytics-reporter": GSA_DAP,
  citysdk: CENSUS_CITYSDK,
  "cms-bluebutton-sdk": CMS_BLUE_BUTTON,
  "qpp-measures-data": QPP_MEASURES_DATA,
  "qpp-submissions-schema": QPP_SUBMISSIONS_SCHEMA,
  "cms-mrf-validator": CMS_MRF_VALIDATOR,
  "capital-framework": CFPB_CAPITAL,
  "cfpb-chart-builder": CFPB_CHART_BUILDER,
  amortize: CFPB_AMORTIZE,
  "format-usd": CFPB_FORMAT_USD,

  "18f-pages-server": EIGHTEEN_F,
  "about-yml-validator": EIGHTEEN_F,
  "aria-accordion": EIGHTEEN_F,
  "cf-blue-green": EIGHTEEN_F,
  "cg-style": EIGHTEEN_F,
  "continua11y-acceptance": EIGHTEEN_F,
  "continua11y-ci-reporter": EIGHTEEN_F,
  "continua11y-reports": EIGHTEEN_F,
  "contracting-cookbook": EIGHTEEN_F,
  "fec-style": FEC_STYLE,
  "file-locked-operation": EIGHTEEN_F,
  "generator-18f": EIGHTEEN_F,
  ghad: EIGHTEEN_F,
  "github-webhook-validator": EIGHTEEN_F,
  "glossary-panel": EIGHTEEN_F,
  "hmac-authentication": EIGHTEEN_F,
  "hubot-cf-notifications": EIGHTEEN_F,
  "hubot-scripts-us-federal-holidays-reminder": EIGHTEEN_F,
  "hubot-slack-github-issues": EIGHTEEN_F,
  "linkify-citations": EIGHTEEN_F,
  "lunr-server": EIGHTEEN_F,
  "micropurchase-data": EIGHTEEN_F,
  "oauth2-proxy-authentication": EIGHTEEN_F,
  "pa11y-crawl": EIGHTEEN_F,
  "pa11y-reporter-ci": EIGHTEEN_F,
  "retext-18f-simplify": EIGHTEEN_F,
  sendak: EIGHTEEN_F,
  "sendak-usage": EIGHTEEN_F,
  "stickyfill-web-module": EIGHTEEN_F,
  "team-api-server": EIGHTEEN_F,
  "code-clerk": GSA,
  "code-gov-front-end": CODE_GOV,
  "ng-sidebar-v3": GSA,
  "ngx-uswds": GSA,
  "uswds-extended": GSA,
  "sam-ui-elements": SAM_GOV,
  "us-forms-system": USDS,
  "uswds-vue": USDS,

  "atomic-component": CFPB_CAPITAL,
  "cf-atomic-component": CFPB_CAPITAL,
  "cf-buttons": CFPB_CAPITAL,
  "cf-component-demo": CFPB_CAPITAL,
  "cf-core": CFPB_CAPITAL,
  "cf-expandables": CFPB_CAPITAL,
  "cf-forms": CFPB_CAPITAL,
  "cf-grid": CFPB_CAPITAL,
  "cf-icons": CFPB_CAPITAL,
  "cf-layout": CFPB_CAPITAL,
  "cf-notification": CFPB_CAPITAL,
  "cf-notifications": CFPB_CAPITAL,
  "cf-pagination": CFPB_CAPITAL,
  "cf-tables": CFPB_CAPITAL,
  "cf-theme-cfpb": CFPB_CAPITAL,
  "cf-typography": CFPB_CAPITAL,
  "dom-class-list": CFPB_CAPITAL,
  "element-data-set": CFPB_CAPITAL,
  "type-checkers": CFPB_CAPITAL,
  "generator-cf": CFPB_CAPITAL,
  "generator-cf-component": CFPB_CAPITAL,
  "cf-grunt-config": CFPB,
  "cfgov-sheer-templates": CFPB,
  "cfpb-front-end": CFPB,
  "ctrl-f": CFPB,
  "data-api": CFPB,
  "fuzzy-state-search": CFPB,
  "generator-node-cfpb": CFPB,
  "hmda-file-parser": CFPB,
  "hmda-ui": CFPB,
  "hmda-explorer": CFPB,
  "is-money-usd": CFPB,
  "jumbo-mortgage": CFPB,
  "loan-calc": CFPB,
  objectified: CFPB,
  "onboarding-scheduler": CFPB,
  "overall-loan-cost": CFPB,
  "owning-a-home": CFPB,
  "present-value": CFPB,
  read2me: CFPB,
  "stay-positive": CFPB,
  "student-debt-calc": CFPB,
  time2read: CFPB,
  "unformat-usd": CFPB,
  vax: CFPB,
  wcag: CFPB,
  "wcag-cli": CFPB,
  "hubot-acrogov": CFPB,
  "hubot-aws-cfpb": CFPB,
  "hubot-cfpb-indexer": CFPB,
  "hubot-eavesdrop": CFPB,
  "hubot-new-relic-alerts": CFPB,
  "hubot-onboarding": CFPB,

  "earthquake-cpt": USGS_EHP,
  "earthquake-event-ws": USGS_EHP,
  "earthquake-eventpages": USGS_EHP,
  "earthquake-hazard-tool": USGS_EHP,
  "earthquake-latest-earthquakes": USGS_EHP,
  "earthquake-list-widget": USGS_EHP,
  "earthquake-rtgm-calculator": USGS_EHP,
  "earthquake-usdesign": USGS_EHP,
  "earthquake-website": USGS_EHP,
  "hazdev-accordion": USGS_EHP,
  "hazdev-cache-invalidator": USGS_EHP,
  "hazdev-d3": USGS_EHP,
  "hazdev-geoserve-ws": USGS_EHP,
  "hazdev-leaflet": USGS_EHP,
  "hazdev-location-view": USGS_EHP,
  "hazdev-question-view": USGS_EHP,
  "hazdev-svgimagemap": USGS_EHP,
  "hazdev-tablist": USGS_EHP,
  "hazdev-template": USGS_EHP,
  "hazdev-webutils": USGS_EHP,
  "quakeml-parser-js": USGS_EHP,
  "geomag-baseline-calculator": USGS_EHP,
  "aqts-client": USGS,
  "cra-template-usgs": USGS,
  "pmps-ui": USGS,
  "usgs-ui": USGS,
  "wdfn-viz": USGS,
  "code-json-generator": USGS,
  "passport-microsoft-typescript": USGS,

  endpointjs: NGA,
  "eslint-config-opensphere": NGA,
  "eslint-plugin-opensphere": NGA,
  "opensphere-asm": NGA,
  "opensphere-build-closure-helper": NGA,
  "opensphere-build-docs": NGA,
  "opensphere-build-index": NGA,
  "opensphere-build-resolver": NGA,
  "opensphere-state-schema": NGA,
  "seed-images": NGA,
  "simple-features-js": NGA,
  "simple-features-wkb-js": NGA,
  "stylelint-config-opensphere": NGA,

  "alignment-viewer": CDC,
  bioseq: CDC,
  patristic: CDC,
  tidytree: CDC,
  tn93: CDC,
  "cfasim-ui": CDC_CFA_SIMULATOR,
  "fdns-js-sdk": CDC,
  "fdns-ui-react": CDC,

  "bems-theme-react-starter": CBP,
  "cbp-ds": CBP,
  "cbp-theme": CBP,
  "cbp-theme-react-starter": CBP,
  "ngx-cbp-theme": CBP,

  "qpp-design-system": QPP,
  "qpp-style": QPP,
  "qpp-file-upload-api-client": QPP,
  "qpp-shared-healthcheck-node": QPP,
  "qpp-shared-health-check-node": QPP,
  "qpp-shared-logger-node": QPP,
  "qpp-bsr-excel-tool": QPP,

  loast: VA,
  "vets-json-schema": VA,

  "adl-xapiwrapper": ADL,
  "sandbox-asset-server": ADL,
  "xapi-statement-viewer": ADL,
  xapiwrapper: ADL,

  "create-terra-ui-app": NASA_TERRA,
  "gcn-kafka": NASA_GCN,
  "report-granules": NASA_CUMULUS,
  "report-pdrs": NASA_CUMULUS,
  "test-web-world-wind": NASA_WORLDWIND,
  webww: NASA_WORLDWIND,
  "webworldwind-esa": NASA_WORLDWIND,
  "webworldwind-gisat": NASA_WORLDWIND,
  "ing-vue-froalav3-wysiwyg": NASA_JPL,
  neuralyzer: NASA_JPL,
  "worldview-components": NASA_GIBS,

  "cmapi-kotlin": ARMY_CMAPI,
  "ipymesh-widgets": ARMY_ERDC,
  "stigman-watcher": NAVY_NUWC,
  madcert: NSA,

  npmaki: NPS_NPMAP,
  "npmap-symbol-library": NPS_NPMAP,
  "npmap.js": NPS_NPMAP,

  "fips-county-codes": USFWS,
  "fws-glossary": USFWS,
  "fws-navigation": USFWS,

  "compass-rose-ui": NOAA_ORR,
  nucos: NOAA_ORR,
  "desi-graphics": NOAA_GSL,
  standard_knowledge_js: NOAA_IOOS,

  usptostrap: USPTO,
  "eve-react-templates": USCIS,
  exitscript: DOJ,
  "nara-node": NARA,
  "gov-delivery-node": SBA,
  "fam-style": USDA_FOREST_SERVICE,
  dtdanalyzer: NLM_NCBI,
  oflc_validations: DOL_OFLC,
  "fdsh-client": PIF,
  "passport-myusa": MYUSA,
  "pnnl-buildingid": PNNL,
  "gist-angular-popovers": ORNL,
  "gist-charts": ORNL,
  "op-release-notes": SANDIA,
  "op-snapshot": SANDIA,
  "feedback-tool-sws": SANDIA,
  nobin: CENSUS,
  "dcps-api-store": SSA,
  "auto-save-js": HHS_GRANTSOLUTIONS,
};

export function normalizePackageName(name: string): string {
  return name.trim().toLowerCase();
}

function scopeOf(name: string): string | null {
  if (!name.startsWith("@")) return null;
  const slash = name.indexOf("/");
  return slash > 0 ? name.slice(0, slash) : null;
}

export function lookupGovDependency(name: string): ReusedCodeEntry | undefined {
  const key = normalizePackageName(name);
  if (Object.hasOwn(GOV_DEPENDENCIES, key)) return GOV_DEPENDENCIES[key];

  const scope = scopeOf(key);
  if (scope && Object.hasOwn(GOV_DEPENDENCIES, scope)) {
    return GOV_DEPENDENCIES[scope];
  }
  return undefined;
}
