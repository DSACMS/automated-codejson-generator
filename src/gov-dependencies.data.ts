/**
 * The federal packages that reusedCode is matched against. Every entry points
 * at the repository its source is hosted in, and is only listed once its
 * registry metadata resolves to a repo under a verified government org.
 *
 * This file is kept current by the updater in src/gov-update, which edits it as
 * text rather than regenerating it. Editing by hand is fine, but keep the shape
 * the updater expects: one const per entry in alphabetical order, referenced
 * from the maps below. src/gov-update/codegen.ts has the details.
 */

export interface ReusedCodeEntry {
  name: string;
  URL: string;
}

const ABCMRT16: ReusedCodeEntry = {
  name: "abcmrt16 (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/abcmrt16",
};

const ABOUT_YML_VALIDATOR: ReusedCodeEntry = {
  name: "about-yml-validator (18F (GSA))",
  URL: "https://github.com/18F/about-yml-validator",
};

const ACCESSTIME: ReusedCodeEntry = {
  name: "accessTime (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/accessTime",
};

const ACCORDION: ReusedCodeEntry = {
  name: "accordion (18F (GSA))",
  URL: "https://github.com/18F/accordion",
};

const ADL_XAPIWRAPPER: ReusedCodeEntry = {
  name: "adl-xapiwrapper (Advanced Distributed Learning Initiative (DoD))",
  URL: "https://github.com/adlnet/xapiwrapper-node",
};

const AERIE_CLI: ReusedCodeEntry = {
  name: "aerie-cli (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/aerie-cli",
};

const AFFINIS: ReusedCodeEntry = {
  name: "affinis (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/affinis",
};

const AIT_CORE: ReusedCodeEntry = {
  name: "ait-core (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/ait-core",
};

const AIT_DSN: ReusedCodeEntry = {
  name: "ait-dsn (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/ait-dsn",
};

const AIT_GUI: ReusedCodeEntry = {
  name: "ait-gui (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/ait-gui",
};

const ALIGNMENTVIEWER: ReusedCodeEntry = {
  name: "AlignmentViewer (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/AlignmentViewer",
};

const AMORTIZE: ReusedCodeEntry = {
  name: "amortize (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/amortize",
};

const ANALPHIPY: ReusedCodeEntry = {
  name: "analphipy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/analphipy",
};

const ANALYTICS_REPORTER: ReusedCodeEntry = {
  name: "analytics-reporter (18F (GSA))",
  URL: "https://github.com/18F/analytics-reporter",
};

const ANMS_ACE: ReusedCodeEntry = {
  name: "anms-ace (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/anms-ace",
};

const ANMS_CAMP: ReusedCodeEntry = {
  name: "anms-CAmp (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/anms-camp",
};

const ATOMGPT: ReusedCodeEntry = {
  name: "atomgpt (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/atomgpt",
};

const ATOMICCOMPONENT: ReusedCodeEntry = {
  name: "AtomicComponent (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/AtomicComponent",
};

const ATOMMAN: ReusedCodeEntry = {
  name: "atomman (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/atomman",
};

const ATOMVISION: ReusedCodeEntry = {
  name: "atomvision (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/atomvision",
};

const BART_SURVIVAL: ReusedCodeEntry = {
  name: "BART-Survival (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/BART-Survival",
};

const BATCHEE: ReusedCodeEntry = {
  name: "batchee (NASA)",
  URL: "https://github.com/nasa/batchee",
};

const BEAAPI: ReusedCodeEntry = {
  name: "beaapi (U.S. Bureau of Economic Analysis)",
  URL: "https://github.com/us-bea/beaapi",
};

const BEMS_THEME_REACT_STARTER: ReusedCodeEntry = {
  name: "bems-theme-react-starter (U.S. Customs and Border Protection)",
  URL: "https://github.com/US-CBP/bems-theme-react-starter",
};

const BENTO_MDF: ReusedCodeEntry = {
  name: "bento-mdf (NCI Center for Biomedical Informatics and IT)",
  URL: "https://github.com/cbiit/bento-mdf",
};

const BENTO_STS: ReusedCodeEntry = {
  name: "bento-sts (NCI Center for Biomedical Informatics and IT)",
  URL: "https://github.com/CBIIT/bento-sts",
};

const BINGO: ReusedCodeEntry = {
  name: "bingo (NASA)",
  URL: "https://github.com/nasa/bingo",
};

const BIOSEQ: ReusedCodeEntry = {
  name: "bioseq (Centers for Disease Control and Prevention)",
  URL: "https://github.com/cdcgov/bioseq-js",
};

const BLOB_UTILS: ReusedCodeEntry = {
  name: "blob_utils (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/blob_utils",
};

const BMDS: ReusedCodeEntry = {
  name: "BMDS (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/BMDS",
};

const BMDS_UI: ReusedCodeEntry = {
  name: "bmds-ui (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/bmds-ui",
};

const BOTO3_MISSING: ReusedCodeEntry = {
  name: "boto3-missing (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/boto3-missing",
};

const BRITECHARTS: ReusedCodeEntry = {
  name: "britecharts (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/britecharts",
};

const CBIITSS_REACT_COMPONENTS: ReusedCodeEntry = {
  name: "react-components (NCI Center for Biomedical Informatics and IT)",
  URL: "https://github.com/cbiit/cbiitss-react-components",
};

const CBP_THEME: ReusedCodeEntry = {
  name: "cbp-theme (U.S. Customs and Border Protection)",
  URL: "https://github.com/US-CBP/cbp-theme",
};

const CC_PLUGIN_GLIDER: ReusedCodeEntry = {
  name: "cc-plugin-glider (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/cc-plugin-glider",
};

const CC_PLUGIN_NCEI: ReusedCodeEntry = {
  name: "cc-plugin-ncei (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/cc-plugin-ncei",
};

const CC_PLUGIN_OG: ReusedCodeEntry = {
  name: "cc-plugin-og (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/cc-plugin-og",
};

const CC_PLUGIN_SGRID: ReusedCodeEntry = {
  name: "cc-plugin-sgrid (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/cc-plugin-sgrid",
};

const CC_PLUGIN_UGRID: ReusedCodeEntry = {
  name: "cc-plugin-ugrid (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/cc-plugin-ugrid",
};

const CCDB5_UI: ReusedCodeEntry = {
  name: "ccdb5-ui (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/ccdb5-ui",
};

const CDC_MAP: ReusedCodeEntry = {
  name: "map (Centers for Disease Control and Prevention)",
  URL: "https://github.com/cdcgov/cdc-open-viz",
};

const CERTBOT_PKCS12: ReusedCodeEntry = {
  name: "certbot-pkcs12 (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/certbot-pkcs12",
};

const CF_BLUE_GREEN_PKG: ReusedCodeEntry = {
  name: "cf-blue-green (18F (GSA))",
  URL: "https://github.com/18f/cf-blue-green",
};

const CF_COMPONENT_DEMO: ReusedCodeEntry = {
  name: "cf-component-demo (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cf-component-demo",
};

const CF_GRUNT_CONFIG: ReusedCodeEntry = {
  name: "cf-grunt-config (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cf-grunt-config",
};

const CF_THEME_CFPB: ReusedCodeEntry = {
  name: "cf-theme-cfpb (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cf-theme-cfpb",
};

const CFA_SIMULATOR: ReusedCodeEntry = {
  name: "cfa-simulator (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/cfa-simulator",
};

const CFASODAPY: ReusedCodeEntry = {
  name: "cfasodapy (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/cfasodapy",
};

const CFGOV_DJANGO_SETUP: ReusedCodeEntry = {
  name: "cfgov-django-setup (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cfgov-django-setup",
};

const CFGOV_SHEER_TEMPLATES: ReusedCodeEntry = {
  name: "cfgov-sheer-templates (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cfgov-sheer-templates",
};

const CFPB_ANALYTICS: ReusedCodeEntry = {
  name: "cfpb-analytics (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cfpb-analytics",
};

const CFPB_ATOMIC_COMPONENT: ReusedCodeEntry = {
  name: "atomic-component (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/atomic-component",
};

const CFPB_BUTTONS: ReusedCodeEntry = {
  name: "buttons (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/buttons",
};

const CFPB_CFPB_ATOMIC_COMPONENT: ReusedCodeEntry = {
  name: "cfpb-atomic-component (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-atomic-component",
};

const CFPB_CFPB_BUTTONS: ReusedCodeEntry = {
  name: "cfpb-buttons (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-buttons",
};

const CFPB_CFPB_CORE: ReusedCodeEntry = {
  name: "cfpb-core (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-core",
};

const CFPB_CFPB_EXPANDABLES: ReusedCodeEntry = {
  name: "cfpb-expandables (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-expandables",
};

const CFPB_CFPB_FORMS: ReusedCodeEntry = {
  name: "cfpb-forms (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-forms",
};

const CFPB_CFPB_GRID: ReusedCodeEntry = {
  name: "cfpb-grid (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-grid",
};

const CFPB_CFPB_ICONS: ReusedCodeEntry = {
  name: "cfpb-icons (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-icons",
};

const CFPB_CFPB_LAYOUT: ReusedCodeEntry = {
  name: "cfpb-layout (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-layout",
};

const CFPB_CFPB_NOTIFICATIONS: ReusedCodeEntry = {
  name: "cfpb-notifications (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-notifications",
};

const CFPB_CFPB_PAGINATION: ReusedCodeEntry = {
  name: "cfpb-pagination (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-pagination",
};

const CFPB_CFPB_TABLES: ReusedCodeEntry = {
  name: "cfpb-tables (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-tables",
};

const CFPB_CFPB_TYPOGRAPHY: ReusedCodeEntry = {
  name: "cfpb-typography (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/cfpb-typography",
};

const CFPB_CHART_BUILDER: ReusedCodeEntry = {
  name: "cfpb-chart-builder (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cfpb-chart-builder",
};

const CFPB_CORE: ReusedCodeEntry = {
  name: "core (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/core",
};

const CFPB_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "cfpb-design-system (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/design-system",
};

const CFPB_EXPANDABLES: ReusedCodeEntry = {
  name: "expandables (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/expandables",
};

const CFPB_FORMS: ReusedCodeEntry = {
  name: "forms (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/forms",
};

const CFPB_FRONT_END: ReusedCodeEntry = {
  name: "cfpb-front-end (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/front-end",
};

const CFPB_GRID: ReusedCodeEntry = {
  name: "grid (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/grid",
};

const CFPB_ICONS: ReusedCodeEntry = {
  name: "icons (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/icons",
};

const CFPB_LAYOUT: ReusedCodeEntry = {
  name: "layout (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/layout",
};

const CFPB_NETLIFY_CMS: ReusedCodeEntry = {
  name: "netlify-cms (Consumer Financial Protection Bureau)",
  URL: "https://github.com/netlify/netlify-cms",
};

const CFPB_NOTIFICATIONS: ReusedCodeEntry = {
  name: "notifications (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/notifications",
};

const CFPB_PAGINATION: ReusedCodeEntry = {
  name: "pagination (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/pagination",
};

const CFPB_TABLES: ReusedCodeEntry = {
  name: "tables (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/tables",
};

const CFPB_TYPOGRAPHY: ReusedCodeEntry = {
  name: "typography (Consumer Financial Protection Bureau)",
  URL: "https://www.npmjs.com/package/@cfpb/typography",
};

const CHEMNLP: ReusedCodeEntry = {
  name: "chemnlp (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/chemnlp",
};

const CHILTEPIN: ReusedCodeEntry = {
  name: "chiltepin (NOAA Global Systems Laboratory)",
  URL: "https://github.com/noaa-gsl/chiltepin",
};

const CHIPSFF: ReusedCodeEntry = {
  name: "chipsff (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/chipsff",
};

const CISO: ReusedCodeEntry = {
  name: "ciso (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/ciso",
};

const CITYSDK: ReusedCodeEntry = {
  name: "citysdk (U.S. Census Bureau)",
  URL: "https://github.com/uscensusbureau/citysdk",
};

const CKANEXT_DATAGOVCATALOG: ReusedCodeEntry = {
  name: "ckanext-datagovcatalog (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ckanext-datagovcatalog",
};

const CKANEXT_DATAGOVTHEME: ReusedCodeEntry = {
  name: "ckanext-datagovtheme (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ckanext-datagovtheme",
};

const CKANEXT_DATAJSON_PKG: ReusedCodeEntry = {
  name: "ckanext-datajson (U.S. General Services Administration)",
  URL: "https://github.com/gsa/ckanext-datajson",
};

const CKANEXT_GEODATAGOV: ReusedCodeEntry = {
  name: "ckanext-geodatagov (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ckanext-geodatagov",
};

const CKANEXT_GOOGLEANALYTICSBASIC: ReusedCodeEntry = {
  name: "ckanext-googleanalyticsbasic (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ckanext-googleanalyticsbasic",
};

const CKANEXT_METRICS_DASHBOARD: ReusedCodeEntry = {
  name: "ckanext-metrics_dashboard (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ckanext-metrics_dashboard",
};

const CKANEXT_USMETADATA: ReusedCodeEntry = {
  name: "ckanext-usmetadata (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ckanext-usmetadata",
};

const CMOMY: ReusedCodeEntry = {
  name: "cmomy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/cmomy",
};

const CMS_COMMON: ReusedCodeEntry = {
  name: "cms-common (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/cms-common",
};

const CMSGOV_HPT_VALIDATOR: ReusedCodeEntry = {
  name: "hpt-validator (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/cmsgov/hpt-validator",
};

const CMSGOV_HPT_VALIDATOR_CLI: ReusedCodeEntry = {
  name: "hpt-validator-cli (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/cmsgov/hpt-validator-cli",
};

const CMSGOV_MEDICARE_SITE_PACKAGE: ReusedCodeEntry = {
  name: "medicare-site-package (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/@cmsgov/medicare-site-package",
};

const CMSGOV_QPP_DESIGN_SYSTEM_CORE: ReusedCodeEntry = {
  name: "qpp-design-system-core (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/cmsgov/qpp-design-system",
};

const CMSGOV_QPP_SHARED_API_VERSIONING_NODE: ReusedCodeEntry = {
  name: "qpp-shared-api-versioning-node (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/cmsgov/qpp-shared-api-versioning-node",
};

const CMSGOV_QPP_STYLE_ANGULAR: ReusedCodeEntry = {
  name: "qpp-style-angular (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/@cmsgov/qpp-style-angular",
};

const CMSGOV_REQUEST_VERSION: ReusedCodeEntry = {
  name: "request-version (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/@cmsgov/request-version",
};

export const CMS_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "CMS Design System",
  URL: "https://github.com/CMSgov/design-system",
};

export const CMS_DS_CMS_GOV: ReusedCodeEntry = {
  name: "CMS Design System - CMS.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-cms-gov",
};

export const CMS_DS_HEALTHCARE_GOV: ReusedCodeEntry = {
  name: "CMS Design System - HealthCare.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-healthcare-gov",
};

export const CMS_DS_MEDICARE_GOV: ReusedCodeEntry = {
  name: "CMS Design System - Medicare.gov",
  URL: "https://github.com/CMSgov/design-system/tree/main/packages/ds-medicare-gov",
};

const CODE_CLERK: ReusedCodeEntry = {
  name: "code-clerk (U.S. General Services Administration)",
  URL: "https://github.com/GSA/code-clerk",
};

const CODE_GOV_ABOUT_PAGE: ReusedCodeEntry = {
  name: "about-page (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-about-page",
};

const CODE_GOV_API_CLIENT: ReusedCodeEntry = {
  name: "api-client (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-api-client",
};

const CODE_GOV_CAUTIOUS: ReusedCodeEntry = {
  name: "cautious (U.S. General Services Administration)",
  URL: "https://github.com/gsa/cautious",
};

const CODE_GOV_CODE_GOV_ADAPTER: ReusedCodeEntry = {
  name: "code-gov-adapter (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-adapters",
};

const CODE_GOV_CODE_GOV_FONT: ReusedCodeEntry = {
  name: "code-gov-font (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-font",
};

const CODE_GOV_CODE_GOV_STYLE: ReusedCodeEntry = {
  name: "code-gov-style (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-style",
};

const CODE_GOV_CODE_GOV_VALIDATOR: ReusedCodeEntry = {
  name: "code-gov-validator (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-validator",
};

const CODE_GOV_CODING_LANGUAGES: ReusedCodeEntry = {
  name: "coding-languages (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-coding-languages",
};

const CODE_GOV_COMPLIANCE_DASHBOARD_WEB_COMPONENT: ReusedCodeEntry = {
  name: "compliance-dashboard-web-component (U.S. General Services Administration)",
  URL: "https://github.com/gsa/compliance-dashboard-web-component",
};

const CODE_GOV_FSCP_REACT_COMPONENT: ReusedCodeEntry = {
  name: "fscp-react-component (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-fscp-react-component",
};

const CODE_GOV_JSON_SCHEMA_VALIDATOR_WEB_COMPONENT: ReusedCodeEntry = {
  name: "json-schema-validator-web-component (U.S. General Services Administration)",
  URL: "https://github.com/gsa/json-schema-validator-web-component",
};

const CODE_GOV_JSON_SCHEMA_WEB_COMPONENT: ReusedCodeEntry = {
  name: "json-schema-web-component (U.S. General Services Administration)",
  URL: "https://github.com/gsa/json-schema-web-component",
};

const CODE_GOV_SITE_MAP_GENERATOR: ReusedCodeEntry = {
  name: "site-map-generator (U.S. General Services Administration)",
  URL: "https://github.com/gsa/code-gov-site-map-generator",
};

const CODEJSON_CORE: ReusedCodeEntry = {
  name: "codejson-core (CMS Digital Service)",
  URL: "https://github.com/dsacms/codejson-core",
};

const CODEJSON_CROSSWALK: ReusedCodeEntry = {
  name: "codejson-crosswalk (CMS Digital Service)",
  URL: "https://github.com/DSACMS/codejson-crosswalk",
};

const CODEJSON_INDEX_GENERATOR: ReusedCodeEntry = {
  name: "codejson-index-generator (CMS Digital Service)",
  URL: "https://github.com/dsacms/codejson-index-generator",
};

const COMPASS_ROSE_UI: ReusedCodeEntry = {
  name: "compass-rose-ui (NOAA Office of Response and Restoration)",
  URL: "https://github.com/NOAA-ORR-ERD/compass-rose-ui",
};

const COMPLIANCE_CHECKER: ReusedCodeEntry = {
  name: "compliance-checker (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/compliance-checker",
};

const CONDOR: ReusedCodeEntry = {
  name: "condor (NASA)",
  URL: "https://github.com/nasa/condor",
};

const CONSUL_ANNOUNCER: ReusedCodeEntry = {
  name: "consul-announcer (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/consul-announcer",
};

const CONTINGENCY_TOOLS: ReusedCodeEntry = {
  name: "contingency-tools (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/contingency",
};

const CONTRACTING_COOKBOOK_CLIENT: ReusedCodeEntry = {
  name: "contracting-cookbook-client (18F (GSA))",
  URL: "https://github.com/18F/contracting-cookbook-client",
};

const CORE_CACHE_MANAGER_APP: ReusedCodeEntry = {
  name: "core_cache_manager_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_cache_manager_app",
};

const CORE_COMPOSER_APP: ReusedCodeEntry = {
  name: "core_composer_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_composer_app",
};

const CORE_CURATE_APP: ReusedCodeEntry = {
  name: "core_curate_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_curate_app",
};

const CORE_CURATE_REGISTRY_APP: ReusedCodeEntry = {
  name: "core_curate_registry_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_curate_registry_app",
};

const CORE_CUSTOM_QUERIES_APP: ReusedCodeEntry = {
  name: "core_custom_queries_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_custom_queries_app",
};

const CORE_DASHBOARD_APP: ReusedCodeEntry = {
  name: "core_dashboard_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_dashboard_app",
};

const CORE_DASHBOARD_COMMON_APP: ReusedCodeEntry = {
  name: "core_dashboard_common_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_dashboard_common_app",
};

const CORE_DASHBOARD_REGISTRY_APP: ReusedCodeEntry = {
  name: "core_dashboard_registry_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_dashboard_registry_app",
};

const CORE_ELASTICSEARCH_APP: ReusedCodeEntry = {
  name: "core_elasticsearch_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_elasticsearch_app",
};

const CORE_EXPLORE_COMMON_APP: ReusedCodeEntry = {
  name: "core_explore_common_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_common_app",
};

const CORE_EXPLORE_EXAMPLE_APP: ReusedCodeEntry = {
  name: "core_explore_example_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_example_app",
};

const CORE_EXPLORE_FEDERATED_SEARCH_APP: ReusedCodeEntry = {
  name: "core_explore_federated_search_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_federated_search_app",
};

const CORE_EXPLORE_KEYWORD_APP: ReusedCodeEntry = {
  name: "core_explore_keyword_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_keyword_app",
};

const CORE_EXPLORE_KEYWORD_REGISTRY_APP: ReusedCodeEntry = {
  name: "core_explore_keyword_registry_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_keyword_registry_app",
};

const CORE_EXPLORE_OAIPMH_APP: ReusedCodeEntry = {
  name: "core_explore_oaipmh_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_oaipmh_app",
};

const CORE_EXPLORE_PERIODIC_TABLE_APP: ReusedCodeEntry = {
  name: "core_explore_periodic_table_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_periodic_table_app",
};

const CORE_EXPLORE_TREE_APP: ReusedCodeEntry = {
  name: "core_explore_tree_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_explore_tree_app",
};

const CORE_EXPORTERS_APP: ReusedCodeEntry = {
  name: "core_exporters_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_exporters_app",
};

const CORE_FEDERATED_SEARCH_APP: ReusedCodeEntry = {
  name: "core_federated_search_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_federated_search_app",
};

const CORE_JSON_APP: ReusedCodeEntry = {
  name: "core_json_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_json_app",
};

const CORE_LINKED_RECORDS_APP: ReusedCodeEntry = {
  name: "core_linked_records_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_linked_records_app",
};

const CORE_MAIN_APP: ReusedCodeEntry = {
  name: "core_main_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_main_app",
};

const CORE_MAIN_REGISTRY_APP: ReusedCodeEntry = {
  name: "core_main_registry_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_main_registry_app",
};

const CORE_MODULE_ADVANCED_BLOB_HOST_APP: ReusedCodeEntry = {
  name: "core_module_advanced_blob_host_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_advanced_blob_host_app",
};

const CORE_MODULE_AUTO_KEY_APP: ReusedCodeEntry = {
  name: "core_module_auto_key_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_auto_key_app",
};

const CORE_MODULE_AUTO_KEY_INTEGER_SEQUENCE_APP: ReusedCodeEntry = {
  name: "core_module_auto_key_integer_sequence_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_auto_key_integer_sequence_app",
};

const CORE_MODULE_AUTO_KEYREF_APP: ReusedCodeEntry = {
  name: "core_module_auto_keyref_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_auto_keyref_app",
};

const CORE_MODULE_BLOB_HOST_APP: ReusedCodeEntry = {
  name: "core_module_blob_host_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_blob_host_app",
};

const CORE_MODULE_CHEMICAL_COMPOSITION_APP: ReusedCodeEntry = {
  name: "core_module_chemical_composition_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_chemical_composition_app",
};

const CORE_MODULE_CHEMICAL_COMPOSITION_SIMPLE_APP: ReusedCodeEntry = {
  name: "core_module_chemical_composition_simple_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_chemical_composition_simple_app",
};

const CORE_MODULE_EXCEL_UPLOADER_APP: ReusedCodeEntry = {
  name: "core_module_excel_uploader_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_excel_uploader_app",
};

const CORE_MODULE_FANCY_TREE_REGISTRY_APP: ReusedCodeEntry = {
  name: "core_module_fancy_tree_registry_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_fancy_tree_registry_app",
};

const CORE_MODULE_LOCAL_ID_REGISTRY_APP: ReusedCodeEntry = {
  name: "core_module_local_id_registry_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_local_id_registry_app",
};

const CORE_MODULE_PERIODIC_TABLE_APP: ReusedCodeEntry = {
  name: "core_module_periodic_table_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_periodic_table_app",
};

const CORE_MODULE_RAW_XML_APP: ReusedCodeEntry = {
  name: "core_module_raw_xml_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_raw_xml_app",
};

const CORE_MODULE_REMOTE_BLOB_HOST_APP: ReusedCodeEntry = {
  name: "core_module_remote_blob_host_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_remote_blob_host_app",
};

const CORE_MODULE_STATUS_REGISTRY_APP: ReusedCodeEntry = {
  name: "core_module_status_registry_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_status_registry_app",
};

const CORE_MODULE_TEXT_AREA_APP: ReusedCodeEntry = {
  name: "core_module_text_area_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_module_text_area_app",
};

const CORE_OAIPMH_COMMON_APP: ReusedCodeEntry = {
  name: "core_oaipmh_common_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_oaipmh_common_app",
};

const CORE_OAIPMH_HARVESTER_APP: ReusedCodeEntry = {
  name: "core_oaipmh_harvester_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_oaipmh_harvester_app",
};

const CORE_OAIPMH_PROVIDER_APP: ReusedCodeEntry = {
  name: "core_oaipmh_provider_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_oaipmh_provider_app",
};

const CORE_PARSER_APP: ReusedCodeEntry = {
  name: "core_parser_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_parser_app",
};

const CORE_SCHEMA_VIEWER_APP: ReusedCodeEntry = {
  name: "core_schema_viewer_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_schema_viewer_app",
};

const CORE_SEMANTIC_SEARCH_APP: ReusedCodeEntry = {
  name: "core_semantic_search_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_semantic_search_app",
};

const CORE_USER_REGISTRATION_APP: ReusedCodeEntry = {
  name: "core_user_registration_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_user_registration_app",
};

const CORE_VISUALIZATION_APP: ReusedCodeEntry = {
  name: "core_visualization_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_visualization_app",
};

const CORE_VISUALIZATION_INSITU_APP: ReusedCodeEntry = {
  name: "core_visualization_insitu_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_visualization_insitu_app",
};

const CORE_WEBSITE_APP: ReusedCodeEntry = {
  name: "core_website_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_website_app",
};

const CORL: ReusedCodeEntry = {
  name: "CoRL (Air Force Research Laboratory ACT3)",
  URL: "https://github.com/act3-ace/CoRL",
};

const CPC_GEOFILES: ReusedCodeEntry = {
  name: "cpc.geofiles (NOAA Climate Prediction Center)",
  URL: "https://github.com/noaa-nws-cpc/cpc.geofiles",
};

const CPC_GEOGRIDS: ReusedCodeEntry = {
  name: "cpc.geogrids (NOAA Climate Prediction Center)",
  URL: "https://github.com/noaa-nws-cpc/cpc.geogrids",
};

const CPC_GEOPLOT: ReusedCodeEntry = {
  name: "cpc.geoplot (NOAA Climate Prediction Center)",
  URL: "https://github.com/noaa-nws-cpc/cpc.geoplot",
};

const CTRL_F: ReusedCodeEntry = {
  name: "ctrl-f (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/ctrl-f",
};

const CTX_PYTHON: ReusedCodeEntry = {
  name: "ctx-python (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/ctx-python",
};

const CUMULUS_MESSAGE_ADAPTER: ReusedCodeEntry = {
  name: "cumulus-message-adapter (NASA)",
  URL: "https://github.com/nasa/cumulus-message-adapter",
};

const DATA_UPLOAD_MANAGER: ReusedCodeEntry = {
  name: "data-upload-manager (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/data-upload-manager",
};

const DATARETRIEVAL_PYTHON: ReusedCodeEntry = {
  name: "dataretrieval-python (U.S. Geological Survey)",
  URL: "https://github.com/DOI-USGS/dataretrieval-python",
};

const DIOPTRA: ReusedCodeEntry = {
  name: "dioptra (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/dioptra",
};

const DJANGO_CACHE_TOOLS: ReusedCodeEntry = {
  name: "django-cache-tools (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/django-cache-tools",
};

const DJANGO_FLAGS: ReusedCodeEntry = {
  name: "django-flags (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/django-flags",
};

const DJANGO_MYSQL_SSL: ReusedCodeEntry = {
  name: "django-mysql-ssl (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/django-mysql-ssl",
};

const DJANGO_TABULAR_EXPORT: ReusedCodeEntry = {
  name: "django-tabular-export (Library of Congress)",
  URL: "https://github.com/LibraryOfCongress/django-tabular-export",
};

const DOCKER_CONTROL_CENTER: ReusedCodeEntry = {
  name: "docker-control-center (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/docker-control-center",
};

const DODCERTS: ReusedCodeEntry = {
  name: "dodcerts (U.S. Army Engineer Research and Development Center)",
  URL: "https://github.com/erdc/dodcerts",
};

const DORADO_SENSITIVITY: ReusedCodeEntry = {
  name: "dorado-sensitivity (NASA)",
  URL: "https://github.com/nasa/dorado-sensitivity",
};

const EARTHDATA_HASHDIFF: ReusedCodeEntry = {
  name: "earthdata-hashdiff (NASA)",
  URL: "https://github.com/nasa/earthdata-hashdiff",
};

const EARTHDATA_VARINFO: ReusedCodeEntry = {
  name: "earthdata-varinfo (NASA)",
  URL: "https://github.com/nasa/earthdata-varinfo",
};

const EARTHQUAKE_LATEST_EARTHQUAKES: ReusedCodeEntry = {
  name: "earthquake-latest-earthquakes (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-latest-earthquakes",
};

const EARTHQUAKE_WEBSITE: ReusedCodeEntry = {
  name: "earthquake-website (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-website",
};

const EGI_PYNETSTATION: ReusedCodeEntry = {
  name: "egi-pynetstation (NIMH Section on Functional Imaging Methods (NIH))",
  URL: "https://github.com/nimh-sfim/egi-pynetstation",
};

const EISPAC: ReusedCodeEntry = {
  name: "eispac (U.S. Naval Research Laboratory)",
  URL: "https://github.com/USNavalResearchLaboratory/eispac",
};

const EMOJI_SEARCH: ReusedCodeEntry = {
  name: "emoji_search (18F (GSA))",
  URL: "https://github.com/18F/emoji_search",
};

const ENDPOINT_JS: ReusedCodeEntry = {
  name: "endpoint.js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/endpoint.js",
};

const EPITOME: ReusedCodeEntry = {
  name: "epitome (NASA Planetary Data System)",
  URL: "https://github.com/nasa-pds-engineering-node/epitome",
};

const ESLINT_CONFIG_OPENSPHERE: ReusedCodeEntry = {
  name: "eslint-config-opensphere (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/eslint-config-opensphere",
};

const ESLINT_PLUGIN_OPENSPHERE: ReusedCodeEntry = {
  name: "eslint-plugin-opensphere (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/eslint-plugin-opensphere",
};

const ETSPY: ReusedCodeEntry = {
  name: "etspy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/etspy",
};

const EXITSCRIPT: ReusedCodeEntry = {
  name: "exitscript (U.S. Department of Justice)",
  URL: "https://github.com/usdoj/exitscript",
};

const EXOSCENE: ReusedCodeEntry = {
  name: "exoscene (NASA)",
  URL: "https://github.com/nasa/exoscene",
};

const FASTATOOLS: ReusedCodeEntry = {
  name: "fastatools (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/fastatools",
};

const FDNS_JS_SDK: ReusedCodeEntry = {
  name: "fdns-js-sdk (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/fdns-js-sdk",
};

const FDNS_UI_REACT: ReusedCodeEntry = {
  name: "fdns-ui-react (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/fdns-ui-react",
};

const FEC_STYLE: ReusedCodeEntry = {
  name: "fec-style (18F (GSA))",
  URL: "https://github.com/18F/fec-style",
};

const FILE_LOCKED_OPERATION: ReusedCodeEntry = {
  name: "file-locked-operation (18F (GSA))",
  URL: "https://github.com/18F/file-locked-operation",
};

const FLUXPART: ReusedCodeEntry = {
  name: "fluxpart (USDA ARS U.S. Salinity Laboratory)",
  URL: "https://github.com/usda-ars-ussl/fluxpart",
};

const FORMAT_USD: ReusedCodeEntry = {
  name: "format-usd (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/format-usd",
};

const FORT_PYMDWIZARD: ReusedCodeEntry = {
  name: "fort-pymdwizard (U.S. Geological Survey)",
  URL: "https://github.com/DOI-USGS/fort-pymdwizard",
};

const FPP: ReusedCodeEntry = {
  name: "fpp (NASA)",
  URL: "https://github.com/nasa/fpp",
};

const FUZZY_STATE_SEARCH: ReusedCodeEntry = {
  name: "fuzzy-state-search (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/fuzzy-state-search",
};

const FV3GRID: ReusedCodeEntry = {
  name: "fv3grid (NOAA Air Resources Laboratory)",
  URL: "https://github.com/noaa-oar-arl/fv3grid",
};

const GCN_KAFKA_JS: ReusedCodeEntry = {
  name: "gcn-kafka-js (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/gcn-kafka-js",
};

const GENEFLOW2: ReusedCodeEntry = {
  name: "geneflow2 (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/geneflow2",
};

const GENERATOR_CF: ReusedCodeEntry = {
  name: "generator-cf (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/generator-cf",
};

const GENERATOR_CF_COMPONENT: ReusedCodeEntry = {
  name: "generator-cf-component (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/generator-cf-component",
};

const GENERATOR_NODE_CFPB: ReusedCodeEntry = {
  name: "generator-node-cfpb (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/generator-node-cfpb",
};

const GENESIGNET: ReusedCodeEntry = {
  name: "GeneSigNet (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/GeneSigNet",
};

const GEO_PREPPER: ReusedCodeEntry = {
  name: "geo_prepper (NICHD Bioinformatics and Scientific Programming Core (NIH))",
  URL: "https://github.com/NICHD-BSPC/geo_prepper",
};

const GFF3TOOLKIT: ReusedCodeEntry = {
  name: "GFF3toolkit (USDA National Agricultural Library)",
  URL: "https://github.com/NAL-i5K/GFF3toolkit",
};

const GHAD: ReusedCodeEntry = {
  name: "ghad (18F (GSA))",
  URL: "https://github.com/18F/ghad",
};

const GITHUB_CHANGELOG: ReusedCodeEntry = {
  name: "github-changelog (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/github-changelog",
};

const GLOSSARY: ReusedCodeEntry = {
  name: "glossary (18F (GSA))",
  URL: "https://github.com/18F/glossary",
};

const GOVDELIVERY: ReusedCodeEntry = {
  name: "govdelivery (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/govdelivery",
};

const H5WASM: ReusedCodeEntry = {
  name: "h5wasm (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/h5wasm",
};

const HARMONY_BROWSE_IMAGE_GENERATOR: ReusedCodeEntry = {
  name: "harmony-browse-image-generator (NASA)",
  URL: "https://github.com/nasa/harmony-browse-image-generator",
};

const HARMONY_PY: ReusedCodeEntry = {
  name: "harmony-py (NASA)",
  URL: "https://github.com/nasa/harmony-py",
};

const HARMONY_SERVICE_LIB_PY: ReusedCodeEntry = {
  name: "harmony-service-lib-py (NASA)",
  URL: "https://github.com/nasa/harmony-service-lib-py",
};

const HAZDEV_GEOSERVE_WS: ReusedCodeEntry = {
  name: "hazdev-geoserve-ws (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-geoserve-ws",
};

const HAZDEV_LEAFLET: ReusedCodeEntry = {
  name: "hazdev-leaflet (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-leaflet",
};

const HAZDEV_LOCATION_VIEW: ReusedCodeEntry = {
  name: "hazdev-location-view (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-location-view",
};

const HAZDEV_TABLIST: ReusedCodeEntry = {
  name: "hazdev-tablist (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-tablist",
};

const HAZDEV_TEMPLATE: ReusedCodeEntry = {
  name: "hazdev-template (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-template",
};

const HITIPS: ReusedCodeEntry = {
  name: "HiTIPS (NCI Center for Biomedical Informatics and IT)",
  URL: "https://github.com/CBIIT/HiTIPS",
};

const HMAC_AUTHENTICATION_NPM: ReusedCodeEntry = {
  name: "hmac-authentication-npm (18F (GSA))",
  URL: "https://github.com/18F/hmac-authentication-npm",
};

const HMAC_AUTHENTICATION_PY: ReusedCodeEntry = {
  name: "hmac_authentication_py (18F (GSA))",
  URL: "https://github.com/18F/hmac_authentication_py",
};

const HMDA_EXPLORER: ReusedCodeEntry = {
  name: "hmda-explorer (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hmda-explorer",
};

const HMDA_UI_MODULES: ReusedCodeEntry = {
  name: "hmda-ui-modules (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hmda-ui-modules",
};

const HOBO_PY: ReusedCodeEntry = {
  name: "hobo-py (National Park Service)",
  URL: "https://github.com/nationalparkservice/hobo-py",
};

const HUBOT_ACROGOV: ReusedCodeEntry = {
  name: "hubot-acrogov (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hubot-acrogov",
};

const HUBOT_AWS_CFPB: ReusedCodeEntry = {
  name: "hubot-aws-cfpb (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hubot-aws-cfpb",
};

const HUBOT_CFPB_INDEXER: ReusedCodeEntry = {
  name: "hubot-cfpb-indexer (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hubot-cfpb-indexer",
};

const HUBOT_NEW_RELIC_ALERTS: ReusedCodeEntry = {
  name: "hubot-new-relic-alerts (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hubot-new-relic-alerts",
};

const HUBOT_ONBOARDING: ReusedCodeEntry = {
  name: "hubot-onboarding (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hubot-onboarding",
};

const HUBOT_SCRIPTS_US_FEDERAL_HOLIDAYS_REMINDER: ReusedCodeEntry = {
  name: "hubot-scripts-us-federal-holidays-reminder (18F (GSA))",
  URL: "https://github.com/18F/hubot-scripts-us-federal-holidays-reminder",
};

const HYBRIDQ: ReusedCodeEntry = {
  name: "hybridq (NASA)",
  URL: "https://github.com/nasa/hybridq",
};

const HYDROID: ReusedCodeEntry = {
  name: "HYDROID (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/HYDROID",
};

const HYDROTOOLS: ReusedCodeEntry = {
  name: "hydrotools (NOAA Office of Water Prediction)",
  URL: "https://github.com/NOAA-OWP/hydrotools",
};

const ICN3D: ReusedCodeEntry = {
  name: "icn3d (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/icn3d",
};

const IDENTITY_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "identity-design-system (18F (GSA))",
  URL: "https://github.com/18F/identity-design-system",
};

const IMPPY3D: ReusedCodeEntry = {
  name: "imppy3d (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/imppy3d",
};

const INTELLIGIBILITY: ReusedCodeEntry = {
  name: "intelligibility (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/intelligibility",
};

const INTERMAT: ReusedCodeEntry = {
  name: "intermat (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/intermat",
};

const IO_MODEL_BUILDER: ReusedCodeEntry = {
  name: "IO-Model-Builder (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/IO-Model-Builder",
};

const IPYMESH: ReusedCodeEntry = {
  name: "ipymesh (U.S. Army Engineer Research and Development Center)",
  URL: "https://github.com/erdc/ipymesh",
};

const JOBRUNNER: ReusedCodeEntry = {
  name: "jobrunner (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/jobrunner",
};

const JSFIVE: ReusedCodeEntry = {
  name: "jsfive (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/jsfive",
};

const JUDI: ReusedCodeEntry = {
  name: "JUDI (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/JUDI",
};

const JUMBO_MORTGAGE: ReusedCodeEntry = {
  name: "jumbo-mortgage (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/jumbo-mortgage",
};

const KAMODO: ReusedCodeEntry = {
  name: "Kamodo (NASA)",
  URL: "https://github.com/nasa/Kamodo",
};

const LABBENCH: ReusedCodeEntry = {
  name: "labbench (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/labbench",
};

const LASSO_ISSUES: ReusedCodeEntry = {
  name: "lasso-issues (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/lasso-issues",
};

const LASSO_RELEASERS: ReusedCodeEntry = {
  name: "lasso-releasers (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/lasso-releasers",
};

const LASSO_REPORTS: ReusedCodeEntry = {
  name: "lasso-reports (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/lasso-reports",
};

const LASSO_REQUIREMENTS: ReusedCodeEntry = {
  name: "lasso-requirements (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/lasso-requirements",
};

const LDD_MANAGER: ReusedCodeEntry = {
  name: "ldd-manager (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/ldd-manager",
};

const LIGHTHOUSE_OAS_TESTS: ReusedCodeEntry = {
  name: "lighthouse-oas-tests (Department of Veterans Affairs)",
  URL: "https://github.com/department-of-veterans-affairs/lighthouse-oas-tests",
};

const LINKIFY_CITATIONS: ReusedCodeEntry = {
  name: "linkify-citations (18F (GSA))",
  URL: "https://github.com/18F/linkify-citations",
};

const LITHOSPHERE: ReusedCodeEntry = {
  name: "LithoSphere (NASA AMMOS)",
  URL: "https://github.com/NASA-AMMOS/LithoSphere",
};

const LOAN_CALC: ReusedCodeEntry = {
  name: "loan-calc (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/loan-calc",
};

const LUNR_SERVER: ReusedCodeEntry = {
  name: "lunr-server (18F (GSA))",
  URL: "https://github.com/18F/lunr-server",
};

const MACPRO_SECURITY_HUB_SYNC: ReusedCodeEntry = {
  name: "macpro-security-hub-sync (CMS Enterprise (CMCS))",
  URL: "https://github.com/enterprise-cmcs/macpro-security-hub-sync",
};

const MADCERT: ReusedCodeEntry = {
  name: "MADCert (National Security Agency)",
  URL: "https://github.com/NationalSecurityAgency/MADCert",
};

const MATERIALITE: ReusedCodeEntry = {
  name: "materialite (NASA)",
  URL: "https://github.com/nasa/materialite",
};

const MCP_DATA_CHECK: ReusedCodeEntry = {
  name: "mcp-data-check (GSA Technology Transformation Services)",
  URL: "https://github.com/GSA-TTS/mcp-data-check",
};

const MCV_QOE_TVO: ReusedCodeEntry = {
  name: "MCV-QOE-TVO (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/MCV-QOE-TVO",
};

const MCVQOE: ReusedCodeEntry = {
  name: "mcvqoe (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/mcvqoe",
};

const MCVQOE_BASE: ReusedCodeEntry = {
  name: "mcvqoe-base (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/mcvqoe-base",
};

const MICROPURCHASEDATA: ReusedCodeEntry = {
  name: "micropurchasedata (18F (GSA))",
  URL: "https://github.com/18F/micropurchasedata",
};

const MIKA: ReusedCodeEntry = {
  name: "mika (NASA)",
  URL: "https://github.com/nasa/mika",
};

const MLMCPY: ReusedCodeEntry = {
  name: "MLMCPy (NASA)",
  URL: "https://github.com/nasa/MLMCPy",
};

const MODFLOW_SETUP: ReusedCodeEntry = {
  name: "modflow-setup (U.S. Geological Survey)",
  URL: "https://github.com/DOI-USGS/modflow-setup",
};

const MODULE_UTILITIES: ReusedCodeEntry = {
  name: "module-utilities (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/module-utilities",
};

const MOUTH2EAR: ReusedCodeEntry = {
  name: "mouth2ear (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/mouth2ear",
};

const MXMCPY: ReusedCodeEntry = {
  name: "MXMCPy (NASA)",
  URL: "https://github.com/nasa/MXMCPy",
};

const NAIF_PDS4_BUNDLER: ReusedCodeEntry = {
  name: "naif-pds4-bundler (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/naif-pds4-bundler",
};

const NARA_NODE: ReusedCodeEntry = {
  name: "nara-node (U.S. National Archives)",
  URL: "https://github.com/usnationalarchives/nara-node",
};

const NDA_TOOLS: ReusedCodeEntry = {
  name: "nda-tools (NIMH Data Archive (NIH))",
  URL: "https://github.com/NDAR/nda-tools",
};

const NESTOR_QT: ReusedCodeEntry = {
  name: "nestor-qt (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/nestor-qt",
};

const NFFLR: ReusedCodeEntry = {
  name: "nfflr (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/nfflr",
};

const NGX_CBP_THEME: ReusedCodeEntry = {
  name: "ngx-cbp-theme (U.S. Customs and Border Protection)",
  URL: "https://github.com/US-CBP/ngx-cbp-theme",
};

const NOAABATHYMETRY: ReusedCodeEntry = {
  name: "noaabathymetry (NOAA Office of Coast Survey)",
  URL: "https://github.com/noaa-ocs-hydrography/noaabathymetry",
};

const NODE_CONTINUA11Y_ACCEPTANCE: ReusedCodeEntry = {
  name: "node-continua11y-acceptance (18F (GSA))",
  URL: "https://github.com/18F/node-continua11y-acceptance",
};

const NODE_CONTINUA11Y_CI_REPORTER: ReusedCodeEntry = {
  name: "node-continua11y-ci-reporter (18F (GSA))",
  URL: "https://github.com/18F/node-continua11y-ci-reporter",
};

const NODE_CONTINUA11Y_REPORTS: ReusedCodeEntry = {
  name: "node-continua11y-reports (18F (GSA))",
  URL: "https://github.com/18F/node-continua11y-reports",
};

const NODE_FDSH_CLIENT: ReusedCodeEntry = {
  name: "node-fdsh-client (Presidential Innovation Fellows (GSA))",
  URL: "https://github.com/presidential-innovation-fellows/node-fdsh-client",
};

const NODE_WCAG: ReusedCodeEntry = {
  name: "node-wcag (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/node-wcag",
};

const NODE_WCAG_CLI: ReusedCodeEntry = {
  name: "node-wcag-cli (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/node-wcag-cli",
};

const OBJECTIFIED: ReusedCodeEntry = {
  name: "objectified (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/objectified",
};

const ONBOARDING_SCHEDULER: ReusedCodeEntry = {
  name: "onboarding-scheduler (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/onboarding-scheduler",
};

const OPEN_NOTEBOOK: ReusedCodeEntry = {
  name: "open-notebook (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/open-notebook",
};

const OPENMCT: ReusedCodeEntry = {
  name: "openmct (NASA)",
  URL: "https://github.com/nasa/openmct",
};

const OPENMCT_MCWS: ReusedCodeEntry = {
  name: "openmct-mcws (NASA AMMOS)",
  URL: "https://github.com/NASA-AMMOS/openmct-mcws",
};

const OPENSEADRAGONFILTERING: ReusedCodeEntry = {
  name: "OpenSeadragonFiltering (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/OpenSeadragonFiltering",
};

const OPENSPHERE_ASM: ReusedCodeEntry = {
  name: "opensphere-asm (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/opensphere-asm",
};

const OPENSPHERE_BUILD_CLOSURE_HELPER: ReusedCodeEntry = {
  name: "opensphere-build-closure-helper (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/opensphere-build-closure-helper",
};

const OPENSPHERE_BUILD_DOCS: ReusedCodeEntry = {
  name: "opensphere-build-docs (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/opensphere-build-docs",
};

const OPENSPHERE_BUILD_INDEX: ReusedCodeEntry = {
  name: "opensphere-build-index (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/opensphere-build-index",
};

const OPENSPHERE_BUILD_RESOLVER: ReusedCodeEntry = {
  name: "opensphere-build-resolver (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/opensphere-build-resolver",
};

const OPENSPHERE_STATE_SCHEMA: ReusedCodeEntry = {
  name: "opensphere-state-schema (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/opensphere-state-schema",
};

const OVERALL_LOAN_COST: ReusedCodeEntry = {
  name: "overall-loan-cost (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/overall-loan-cost",
};

const OWNING_A_HOME: ReusedCodeEntry = {
  name: "owning-a-home (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/owning-a-home",
};

const PA11Y_REPORTER_CI: ReusedCodeEntry = {
  name: "pa11y-reporter-ci (18F (GSA))",
  URL: "https://github.com/18F/pa11y-reporter-ci",
};

const PAGES_SERVER: ReusedCodeEntry = {
  name: "pages-server (18F (GSA))",
  URL: "https://github.com/18F/pages-server",
};

const PATRISTIC: ReusedCodeEntry = {
  name: "patristic (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/patristic",
};

const PDS_GITHUB_UTIL: ReusedCodeEntry = {
  name: "pds-github-util (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/pds-github-util",
};

const PKG_3DTILESRENDERERJS: ReusedCodeEntry = {
  name: "3DTilesRendererJS (NASA AMMOS)",
  URL: "https://github.com/NASA-AMMOS/3DTilesRendererJS",
};

const PODAACPY_2: ReusedCodeEntry = {
  name: "podaacpy (NASA)",
  URL: "https://github.com/nasa/podaacpy",
};

const POREREFINER: ReusedCodeEntry = {
  name: "porerefiner (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/porerefiner",
};

const POTENTIALS: ReusedCodeEntry = {
  name: "potentials (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/potentials",
};

const PRICE_TRANSPARENCY_GUIDE_VALIDATOR: ReusedCodeEntry = {
  name: "price-transparency-guide-validator (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/CMSgov/price-transparency-guide-validator",
};

const PROG_SERVER: ReusedCodeEntry = {
  name: "prog_server (NASA)",
  URL: "https://github.com/nasa/prog_server",
};

const PROGPY: ReusedCodeEntry = {
  name: "progpy (NASA)",
  URL: "https://github.com/nasa/progpy",
};

const PSHTT: ReusedCodeEntry = {
  name: "pshtt (Cybersecurity and Infrastructure Security Agency)",
  URL: "https://github.com/cisagov/pshtt",
};

const PSUD: ReusedCodeEntry = {
  name: "psud (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/psud",
};

const PYAQSAPI: ReusedCodeEntry = {
  name: "pyaqsapi (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/pyaqsapi",
};

const PYBEEPOP: ReusedCodeEntry = {
  name: "pybeepop (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/pybeepop",
};

const PYCAP_DSS: ReusedCodeEntry = {
  name: "pycap-dss (U.S. Geological Survey)",
  URL: "https://github.com/DOI-USGS/pycap-dss",
};

const PYCDCS: ReusedCodeEntry = {
  name: "pycdcs (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pycdcs",
};

const PYHAPPYORNOT: ReusedCodeEntry = {
  name: "pyHappyOrNot (18F (GSA))",
  URL: "https://github.com/18F/pyHappyOrNot",
};

const PYHYPERSCATTERING: ReusedCodeEntry = {
  name: "pyhyperscattering (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pyhyperscattering",
};

const PYMCR: ReusedCodeEntry = {
  name: "pyMCR (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pyMCR",
};

const PYNSSP: ReusedCodeEntry = {
  name: "pynssp (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/pynssp",
};

const PYNUCOS: ReusedCodeEntry = {
  name: "PyNUCOS (NOAA Office of Response and Restoration)",
  URL: "https://github.com/NOAA-ORR-ERD/PyNUCOS",
};

const PYPRISM: ReusedCodeEntry = {
  name: "pyprism (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pyprism",
};

const PYPRMS: ReusedCodeEntry = {
  name: "pyPRMS (U.S. Geological Survey)",
  URL: "https://github.com/DOI-USGS/pyPRMS",
};

const PYPROJECT2CONDA: ReusedCodeEntry = {
  name: "pyproject2conda (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pyproject2conda",
};

const PYSIPS: ReusedCodeEntry = {
  name: "pysips (NASA)",
  URL: "https://github.com/nasa/pysips",
};

const PYTHON_CMR: ReusedCodeEntry = {
  name: "python_cmr (NASA)",
  URL: "https://github.com/nasa/python_cmr",
};

const QARRAYRUN: ReusedCodeEntry = {
  name: "qarrayrun (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/qarrayrun",
};

const QPP_FILE_UPLOAD_API_CLIENT: ReusedCodeEntry = {
  name: "qpp-file-upload-api-client (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/CMSgov/qpp-file-upload-api-client",
};

const QPP_MEASURES_DATA: ReusedCodeEntry = {
  name: "qpp-measures-data (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/CMSgov/qpp-measures-data",
};

const QPP_SHARED_HEALTHCHECK_NODE: ReusedCodeEntry = {
  name: "qpp-shared-healthcheck-node (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/CMSgov/qpp-shared-healthcheck-node",
};

const QPP_SHARED_LOGGER_NODE: ReusedCodeEntry = {
  name: "qpp-shared-logger-node (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/CMSgov/qpp-shared-logger-node",
};

const QPP_SUBMISSIONS_SCHEMA: ReusedCodeEntry = {
  name: "qpp-submissions-schema (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/CMSgov/qpp-submissions-schema",
};

const QU: ReusedCodeEntry = {
  name: "qu (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/qu",
};

const RADBELT: ReusedCodeEntry = {
  name: "radbelt (NASA)",
  URL: "https://github.com/nasa/radbelt",
};

const RDBMS_SUBSETTER: ReusedCodeEntry = {
  name: "rdbms-subsetter (18F (GSA))",
  URL: "https://github.com/18F/rdbms-subsetter",
};

const READ2ME: ReusedCodeEntry = {
  name: "read2me (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/read2me",
};

const REFCHOOSER: ReusedCodeEntry = {
  name: "refchooser (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/refchooser",
};

const REGDOWN: ReusedCodeEntry = {
  name: "regdown (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/regdown",
};

const REGISTRY: ReusedCodeEntry = {
  name: "registry (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/registry",
};

const SARPY: ReusedCodeEntry = {
  name: "sarpy (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/sarpy",
};

const SAS2DB: ReusedCodeEntry = {
  name: "sas2db (xD (U.S. Census Bureau))",
  URL: "https://github.com/XDgov/sas2db",
};

const SCPOPCORN: ReusedCodeEntry = {
  name: "scPopCorn (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/scPopCorn",
};

const SDNIST: ReusedCodeEntry = {
  name: "SDNist (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/SDNist",
};

const SEED_IMAGES: ReusedCodeEntry = {
  name: "seed-images (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/seed-images",
};

const SENDAK: ReusedCodeEntry = {
  name: "Sendak (18F (GSA))",
  URL: "https://github.com/18F/Sendak",
};

const SENDAK_USAGE: ReusedCodeEntry = {
  name: "sendak-usage (18F (GSA))",
  URL: "https://github.com/18F/sendak-usage",
};

const SENSOFF: ReusedCodeEntry = {
  name: "sensoff (USDA ARS U.S. Salinity Laboratory)",
  URL: "https://github.com/usda-ars-ussl/sensoff",
};

const SEQ_JSON_SCHEMA: ReusedCodeEntry = {
  name: "seq-json-schema (NASA AMMOS)",
  URL: "https://github.com/NASA-AMMOS/seq-json-schema",
};

const SEROTOOLS: ReusedCodeEntry = {
  name: "serotools (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/serotools",
};

const SFRMAKER: ReusedCodeEntry = {
  name: "sfrmaker (U.S. Geological Survey)",
  URL: "https://github.com/DOI-USGS/sfrmaker",
};

const SHAKECAST: ReusedCodeEntry = {
  name: "shakecast (U.S. Geological Survey)",
  URL: "https://github.com/usgs/shakecast",
};

const SHAKECAST_AEBM: ReusedCodeEntry = {
  name: "shakecast-aebm (U.S. Geological Survey)",
  URL: "https://github.com/usgs/shakecast-aebm",
};

const SIGNALS_UTILS: ReusedCodeEntry = {
  name: "signals_utils (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/signals_utils",
};

const SIMPLE_FEATURES_JS: ReusedCodeEntry = {
  name: "simple-features-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/simple-features-js",
};

const SIMPLE_FEATURES_WKB_JS: ReusedCodeEntry = {
  name: "simple-features-wkb-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/simple-features-wkb-js",
};

const SIMPROCESD: ReusedCodeEntry = {
  name: "simprocesd (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/simprocesd",
};

const SINGULARJS: ReusedCodeEntry = {
  name: "singularjs (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/singularjs",
};

const SMCPY: ReusedCodeEntry = {
  name: "SMCPy (NASA)",
  URL: "https://github.com/nasa/SMCPy",
};

const SNP_MUTATOR: ReusedCodeEntry = {
  name: "snp-mutator (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/snp-mutator",
};

const SNP_PIPELINE: ReusedCodeEntry = {
  name: "snp-pipeline (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/snp-pipeline",
};

const SQL_INSERT_WRITER: ReusedCodeEntry = {
  name: "sql_insert_writer (18F (GSA))",
  URL: "https://github.com/18F/sql_insert_writer",
};

const SQLITE_DISSECT: ReusedCodeEntry = {
  name: "sqlite-dissect (DoD Cyber Crime Center (DC3))",
  URL: "https://github.com/dod-cyber-crime-center/sqlite-dissect",
};

const SROMPY: ReusedCodeEntry = {
  name: "SROMPy (NASA)",
  URL: "https://github.com/nasa/SROMPy",
};

const SSMDEVICES: ReusedCodeEntry = {
  name: "ssmdevices (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/ssmdevices",
};

const STANDARDS2: ReusedCodeEntry = {
  name: "standards2 (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/standards2",
};

const STAY_POSITIVE: ReusedCodeEntry = {
  name: "stay-positive (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/stay-positive",
};

const STIGMAN_WATCHER: ReusedCodeEntry = {
  name: "stigman-watcher (Naval Undersea Warfare Center Division Newport)",
  URL: "https://github.com/nuwcdivnpt/stigman-watcher",
};

const STITCHEE: ReusedCodeEntry = {
  name: "stitchee (NASA)",
  URL: "https://github.com/nasa/stitchee",
};

const STUDENT_DEBT_CALCULATOR: ReusedCodeEntry = {
  name: "student-debt-calculator (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/student-debt-calculator",
};

const STYLELINT_CONFIG_OPENSPHERE: ReusedCodeEntry = {
  name: "stylelint-config-opensphere (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/stylelint-config-opensphere",
};

const TB3PY: ReusedCodeEntry = {
  name: "tb3py (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/tb3py",
};

const TERMSEQ_PEAKS: ReusedCodeEntry = {
  name: "termseq-peaks (NICHD Bioinformatics and Scientific Programming Core (NIH))",
  URL: "https://github.com/NICHD-BSPC/termseq-peaks",
};

const TERRA_UI_COMPONENTS: ReusedCodeEntry = {
  name: "terra-ui-components (NASA)",
  URL: "https://github.com/nasa/terra-ui-components",
};

const THERMOEXTRAP: ReusedCodeEntry = {
  name: "thermoextrap (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/thermoextrap",
};

const TIDYTREE: ReusedCodeEntry = {
  name: "TidyTree (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/TidyTree",
};

const TIME2READ: ReusedCodeEntry = {
  name: "time2read (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/time2read",
};

const TIMECRAFTJS: ReusedCodeEntry = {
  name: "timecraftjs (NASA AMMOS)",
  URL: "https://github.com/NASA-AMMOS/timecraftjs",
};

const TK_BUILDER: ReusedCodeEntry = {
  name: "tk_builder (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/tk_builder",
};

const TMMC_LNPY: ReusedCodeEntry = {
  name: "tmmc-lnpy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/tmmc-lnpy",
};

const TN93: ReusedCodeEntry = {
  name: "tn93 (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/tn93",
};

const TN93_JS: ReusedCodeEntry = {
  name: "tn93.js (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/tn93.js",
};

const TRUSTYMAIL: ReusedCodeEntry = {
  name: "trustymail (Cybersecurity and Infrastructure Security Agency)",
  URL: "https://github.com/cisagov/trustymail",
};

const UNFORMAT_USD: ReusedCodeEntry = {
  name: "unformat-usd (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/unformat-usd",
};

const US_FORMS_SYSTEM: ReusedCodeEntry = {
  name: "us-forms-system (U.S. Digital Service)",
  URL: "https://github.com/usds/us-forms-system",
};

export const USWDS: ReusedCodeEntry = {
  name: "U.S. Web Design System (USWDS)",
  URL: "https://github.com/uswds/uswds",
};

export const USWDS_COMPILE: ReusedCodeEntry = {
  name: "USWDS Compile",
  URL: "https://github.com/uswds/uswds-compile",
};

const UV_WORKON: ReusedCodeEntry = {
  name: "uv-workon (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/uv-workon",
};

const VAX: ReusedCodeEntry = {
  name: "vax (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/vax",
};

const VCFTOOLZ: ReusedCodeEntry = {
  name: "vcftoolz (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/vcftoolz",
};

const VETS_JSON_SCHEMA: ReusedCodeEntry = {
  name: "vets-json-schema (Department of Veterans Affairs)",
  URL: "https://github.com/department-of-veterans-affairs/vets-json-schema",
};

const VHR_CLOUDMASK: ReusedCodeEntry = {
  name: "vhr-cloudmask (NASA Center for Climate Simulation)",
  URL: "https://github.com/nasa-nccs-hpda/vhr-cloudmask",
};

const VICA: ReusedCodeEntry = {
  name: "vica (USDA ARS Genomics and Bioinformatics Research Unit)",
  URL: "https://github.com/usda-ars-gbru/vica",
};

const WAGTAIL_CONTENT_AUDIT: ReusedCodeEntry = {
  name: "wagtail-content-audit (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/wagtail-content-audit",
};

const WAGTAIL_COPYABLEMODELADMIN: ReusedCodeEntry = {
  name: "wagtail-copyablemodeladmin (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/wagtail-copyablemodeladmin",
};

const WAGTAIL_FLAGS: ReusedCodeEntry = {
  name: "wagtail-flags (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/wagtail-flags",
};

const WAGTAIL_INVENTORY: ReusedCodeEntry = {
  name: "wagtail-inventory (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/wagtail-inventory",
};

const WAGTAIL_SHARING: ReusedCodeEntry = {
  name: "wagtail-sharing (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/wagtail-sharing",
};

const WAGTAIL_TREEMODELADMIN: ReusedCodeEntry = {
  name: "wagtail-treemodeladmin (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/wagtail-treemodeladmin",
};

const WEBWORLDWIND: ReusedCodeEntry = {
  name: "WebWorldWind (NASA WorldWind)",
  URL: "https://github.com/NASAWorldWind/WebWorldWind",
};

const WORLDVIEW_COMPONENTS: ReusedCodeEntry = {
  name: "worldview-components (NASA Global Imagery Browse Services)",
  URL: "https://github.com/nasa-gibs/worldview-components",
};

const XML_UTILS: ReusedCodeEntry = {
  name: "xml_utils (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/xml_utils",
};

const ZARR_EOSDIS_STORE: ReusedCodeEntry = {
  name: "zarr-eosdis-store (NASA)",
  URL: "https://github.com/nasa/zarr-eosdis-store",
};

const ZYRA: ReusedCodeEntry = {
  name: "zyra (NOAA Global Systems Laboratory)",
  URL: "https://github.com/NOAA-GSL/zyra",
};

const CTOS_MEVAL: ReusedCodeEntry = {
  name: "ctos-meval (NCI Center for Biomedical Informatics and IT)",
  URL: "https://github.com/cbiit/meval",
};

const CUMULUS_CUMULUS_MESSAGE_ADAPTER_JS: ReusedCodeEntry = {
  name: "cumulus-message-adapter-js (NASA)",
  URL: "https://github.com/nasa/cumulus-message-adapter-js",
};

const DATAMODELDICT: ReusedCodeEntry = {
  name: "datamodeldict (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/DataModelDict",
};

const DEPARTMENT_OF_VETERANS_AFFAIRS_REACT_JSONSCHEMA_FORM: ReusedCodeEntry = {
  name: "react-jsonschema-form (Department of Veterans Affairs)",
  URL: "https://github.com/department-of-veterans-affairs/react-jsonschema-form",
};

const DEPTOFDEFENSE_COVID19_CALCULATOR: ReusedCodeEntry = {
  name: "covid19-calculator (Code.mil)",
  URL: "https://github.com/code-dot-mil/covid19-calculator",
};

const DESIGN_SYSTEM_REACT: ReusedCodeEntry = {
  name: "design-system-react (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/design-system-react",
};

const DETECTION_LIMITS: ReusedCodeEntry = {
  name: "detection-limits (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/detection_limits",
};

const DICAUGMENT: ReusedCodeEntry = {
  name: "DICaugment (DIDSR (Aldo Badano, Director))",
  URL: "https://github.com/didsr/dicaugment",
};

const DRAGODIS: ReusedCodeEntry = {
  name: "dragodis (DoD Cyber Crime Center (DC3))",
  URL: "https://github.com/dod-cyber-crime-center/dragodis",
};

const DTDANALYZER: ReusedCodeEntry = {
  name: "dtdanalyzer (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/dtdanalyzer",
};

const DYNAMODB_AUTOINCREMENT: ReusedCodeEntry = {
  name: "dynamodb-autoincrement (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/python-dynamodb-autoincrement",
};

const EARTHQUAKE_CPT: ReusedCodeEntry = {
  name: "earthquake-cpt (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-cpt",
};

const EARTHQUAKE_HAZARD_TOOL: ReusedCodeEntry = {
  name: "earthquake-hazard-tool (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-hazard-tool",
};

const EARTHQUAKE_LIST_WIDGET: ReusedCodeEntry = {
  name: "earthquake-list-widget (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-list-widget",
};

const EARTHQUAKE_RTGM_CALCULATOR: ReusedCodeEntry = {
  name: "earthquake-rtgm-calculator (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-rtgm-calculator",
};

const EARTHQUAKE_USDESIGN: ReusedCodeEntry = {
  name: "earthquake-usdesign (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-usdesign",
};

const EDSC_ECHOFORMS: ReusedCodeEntry = {
  name: "echoforms (NASA)",
  URL: "https://github.com/nasa/edsc-echoforms",
};

const EDSC_GEO_UTILS: ReusedCodeEntry = {
  name: "geo-utils (NASA)",
  URL: "https://github.com/nasa/edsc-geo",
};

const EDSC_SMART_HANDOFFS: ReusedCodeEntry = {
  name: "smart-handoffs (NASA)",
  URL: "https://github.com/nasa/edsc-smart-handoffs",
};

const EDSC_TIMELINE: ReusedCodeEntry = {
  name: "timeline (NASA)",
  URL: "https://github.com/nasa/edsc-timeline",
};

const ELINKAPI: ReusedCodeEntry = {
  name: "elinkapi (DOE CODE)",
  URL: "https://github.com/doecode/elinkapi",
};

const ENTERPRISE_CMCS_MACPRO_SERVERLESS_RUNNING_STAGES: ReusedCodeEntry = {
  name: "macpro-serverless-running-stages (CMS Enterprise (CMCS))",
  URL: "https://github.com/enterprise-cmcs/macpro-serverless-running-stages",
};

const ENTERPRISE_CMCS_SERVERLESS_WAF_PLUGIN: ReusedCodeEntry = {
  name: "serverless-waf-plugin (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/cmsgov/serverless-cms-waf",
};

const ERDC_ITL_SIMPLE_LOGGER: ReusedCodeEntry = {
  name: "simple-logger (ERDC ITL)",
  URL: "https://github.com/erdc-itl/node-logger",
};

const ERDDAPY: ReusedCodeEntry = {
  name: "erddapy (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/erddapy",
};

const FAA_AVIATION_DATA_PORTAL_TFRS: ReusedCodeEntry = {
  name: "tfrs (Federal Aviation Administration Weather Camera Program)",
  URL: "https://github.com/faa-aviation-data-portal/tfrs",
};

const FAST_SHARED_CLIENT: ReusedCodeEntry = {
  name: "fast-shared-client (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/fast-shared-client",
};

const FIPY: ReusedCodeEntry = {
  name: "fipy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/fipy",
};

const FREMOR: ReusedCodeEntry = {
  name: "fremor (NOAA - Geophysical Fluid Dynamics Laboratory)",
  URL: "https://github.com/noaa-gfdl/fremor",
};

const GCN_KAFKA: ReusedCodeEntry = {
  name: "gcn-kafka (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/gcn-kafka-python",
};

const GENERATOR_18F: ReusedCodeEntry = {
  name: "generator-18f (18F (GSA))",
  URL: "https://github.com/18f/18f-cli",
};

const GENERATOR_ENERGYAPPS: ReusedCodeEntry = {
  name: "generator-energyapps (E APPS)",
  URL: "https://github.com/energyapps/generator-energyapps",
};

const GEOMETRY_UTILS: ReusedCodeEntry = {
  name: "geometry_utils (NOAA Office of Response and Restoration)",
  URL: "https://github.com/noaa-orr-erd/geometry_utils",
};

const GLIDERPY: ReusedCodeEntry = {
  name: "gliderpy (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/gliderpy",
};

const GSA_SAM_ICONS: ReusedCodeEntry = {
  name: "icons (U.S. General Services Administration)",
  URL: "https://github.com/gsa/sds-icons",
};

const GSA_SAM_SAM_STYLES: ReusedCodeEntry = {
  name: "sam-styles (U.S. General Services Administration)",
  URL: "https://github.com/gsa/sam-styles",
};

const GSA_SAM_SAM_UI_ELEMENTS: ReusedCodeEntry = {
  name: "sam-ui-elements (U.S. General Services Administration)",
  URL: "https://github.com/gsa/sam-ui-elements",
};

const GSA_TTS_SVELTE_UI_USWDS: ReusedCodeEntry = {
  name: "svelte-ui-uswds (GSA Technology Transformation Services)",
  URL: "https://github.com/gsa-tts/svelte-ui",
};

const GSPY: ReusedCodeEntry = {
  name: "gspy (U.S. Geological Survey)",
  URL: "https://github.com/usgs/gspy",
};

const GTAX_PKG: ReusedCodeEntry = {
  name: "gtax (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/gtax",
};

const GVAL: ReusedCodeEntry = {
  name: "gval (NOAA Office of Water Prediction)",
  URL: "https://github.com/noaa-owp/gval",
};

const HARMONIZE_WQ: ReusedCodeEntry = {
  name: "harmonize_wq (U.S. Environmental Protection Agency)",
  URL: "https://github.com/usepa/harmonize-wq",
};

const HAZDEV_ACCORDION: ReusedCodeEntry = {
  name: "hazdev-accordion (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-accordion",
};

const HAZDEV_D3: ReusedCodeEntry = {
  name: "hazdev-d3 (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-d3",
};

const HAZDEV_NG_GEOSERVE_OUTPUT: ReusedCodeEntry = {
  name: "hazdev-ng-geoserve-output (U.S. Geological Survey)",
  URL: "https://www.npmjs.com/package/hazdev-ng-geoserve-output",
};

const HAZDEV_NG_LOCATION_VIEW: ReusedCodeEntry = {
  name: "hazdev-ng-location-view (U.S. Geological Survey)",
  URL: "https://www.npmjs.com/package/hazdev-ng-location-view",
};

const HAZDEV_NG_TEMPLATE: ReusedCodeEntry = {
  name: "hazdev-ng-template (U.S. Geological Survey)",
  URL: "https://www.npmjs.com/package/hazdev-ng-template",
};

const HAZDEV_QUESTION_VIEW: ReusedCodeEntry = {
  name: "hazdev-question-view (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-question-view",
};

const HAZDEV_SVGIMAGEMAP: ReusedCodeEntry = {
  name: "hazdev-svgimagemap (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-svgimagemap",
};

const HAZDEV_WEBUTILS: ReusedCodeEntry = {
  name: "hazdev-webutils (U.S. Geological Survey)",
  URL: "https://github.com/usgs/hazdev-webutils",
};

const HPX: ReusedCodeEntry = {
  name: "hpx (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/hpx",
};

const HUBOT_CF_NOTIFICATIONS_PKG: ReusedCodeEntry = {
  name: "hubot-cf-notifications (18F (GSA))",
  URL: "https://github.com/18f/hubot-cf-notifications",
};

const IOOS_METRICS: ReusedCodeEntry = {
  name: "ioos_metrics (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/ioos_metrics",
};

const IOOS_PKG_SKELETON: ReusedCodeEntry = {
  name: "ioos-pkg-skeleton (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/ioos-python-package-skeleton",
};

const IOOS_QC: ReusedCodeEntry = {
  name: "ioos-qc (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/ioos_qc",
};

const IPRPY: ReusedCodeEntry = {
  name: "iprpy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/iprPy",
};

const IS_MONEY_USD: ReusedCodeEntry = {
  name: "is-money-usd (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/is-money",
};

const ITSXPRESS: ReusedCodeEntry = {
  name: "itsxpress (USDA ARS Genomics and Bioinformatics Research Unit)",
  URL: "https://github.com/usda-ars-gbru/itsxpress",
};

const KAMODO_CORE_OFFICIAL: ReusedCodeEntry = {
  name: "kamodo-core-official (NASA)",
  URL: "https://github.com/nasa/kamodo-core",
};

const KYOS: ReusedCodeEntry = {
  name: "kyos (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/cfsan-biostatistics/kyos",
};

const LIBPQ_DEV: ReusedCodeEntry = {
  name: "libpq-dev (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/python-libpq-dev",
};

const MICROSECRETS_PKG: ReusedCodeEntry = {
  name: "microsecrets (USCIS)",
  URL: "https://github.com/uscis/microsecrets",
};

const MODEL_CATALOGS: ReusedCodeEntry = {
  name: "model_catalogs (NOAA Office of Response and Restoration)",
  URL: "https://github.com/noaa-orr-erd/model_catalogs",
};

const MWCP: ReusedCodeEntry = {
  name: "mwcp (DoD Cyber Crime Center (DC3))",
  URL: "https://github.com/dod-cyber-crime-center/dc3-mwcp",
};

const NASA_GCN_AFM: ReusedCodeEntry = {
  name: "afm (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/afm",
};

const NASA_GCN_ARCHITECT_FUNCTIONS_SEARCH: ReusedCodeEntry = {
  name: "architect-functions-search (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/architect-functions-search",
};

const NASA_GCN_ARCHITECT_PLUGIN_DYNAMODB_LOCAL: ReusedCodeEntry = {
  name: "architect-plugin-dynamodb-local (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/architect-plugin-dynamodb-local",
};

const NASA_GCN_ARCHITECT_PLUGIN_DYNAMODB_LOCAL_STREAMS: ReusedCodeEntry = {
  name: "architect-plugin-dynamodb-local-streams (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/architect-plugin-dynamodb-local-streams",
};

const NASA_GCN_ARCHITECT_PLUGIN_SEARCH: ReusedCodeEntry = {
  name: "architect-plugin-search (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/architect-plugin-search",
};

const NASA_GCN_ARCHITECT_PLUGIN_TRACING: ReusedCodeEntry = {
  name: "architect-plugin-tracing (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/architect-plugin-tracing",
};

const NASA_GCN_ARCHITECT_PLUGIN_UTILS: ReusedCodeEntry = {
  name: "architect-plugin-utils (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/architect-plugin-utils",
};

const NASA_GCN_DYNAMODB_AUTOINCREMENT: ReusedCodeEntry = {
  name: "dynamodb-autoincrement (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/dynamodb-autoincrement",
};

const NASA_GCN_ESLINT_CONFIG_GITIGNORE: ReusedCodeEntry = {
  name: "eslint-config-gitignore (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/eslint-config-gitignore",
};

const NASA_GCN_RCFILES: ReusedCodeEntry = {
  name: "rcfiles (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/rcfiles",
};

const NASA_GCN_REMARK_REHYPE_ASTRO: ReusedCodeEntry = {
  name: "remark-rehype-astro (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/remark-rehype-astro",
};

const NASA_GCN_REMIX_SEO: ReusedCodeEntry = {
  name: "remix-seo (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/remix-seo",
};

const NASA_GCN_SCHEMA: ReusedCodeEntry = {
  name: "schema (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/gcn-schema",
};

const NASA_HDS_CORE: ReusedCodeEntry = {
  name: "core (NASA)",
  URL: "https://github.com/nasa/hds-core",
};

const NASA_JPL_AERIE_AMPCS: ReusedCodeEntry = {
  name: "aerie-ampcs (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/aerie-ampcs",
};

const NASA_JPL_AERIE_MONACO_EDITOR_CUSTOMIZATIONS: ReusedCodeEntry = {
  name: "aerie-monaco-editor-customizations (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/aerie-monaco-editor-customizations",
};

const NASA_JPL_AERIE_SEQUENCE_LANGUAGES: ReusedCodeEntry = {
  name: "aerie-sequence-languages (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/aerie-sequence-languages",
};

const NASA_JPL_AERIE_TIME_UTILS: ReusedCodeEntry = {
  name: "aerie-time-utils (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/aerie-time-utils",
};

const NASA_JPL_PLANDEV_ACTIONS: ReusedCodeEntry = {
  name: "plandev-actions (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/plandev-actions",
};

const NASA_JPL_PLANDEV_AMPCS: ReusedCodeEntry = {
  name: "plandev-ampcs (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/plandev-ampcs",
};

const NASA_JPL_PLANDEV_SEQUENCE_LANGUAGES: ReusedCodeEntry = {
  name: "plandev-sequence-languages (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/plandev-sequence-languages",
};

const NASA_JPL_PLANDEV_TIME_UTILS: ReusedCodeEntry = {
  name: "plandev-time-utils (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/plandev-time-utils",
};

const NASA_JPL_PLANDEV_TS_USER_CODE_RUNNER: ReusedCodeEntry = {
  name: "plandev-ts-user-code-runner (NASA AMMOS)",
  URL: "https://github.com/nasa-ammos/plandev-ts-user-code-runner",
};

const NASAPDS_ESSENCE: ReusedCodeEntry = {
  name: "essence (NASA Planetary Data System)",
  URL: "https://github.com/nasa-pds-engineering-node/essence",
};

const NASAPDS_WDS: ReusedCodeEntry = {
  name: "wds (NASA Planetary Data System)",
  URL: "https://github.com/nasa-pds/wds",
};

const NASAPDS_WDS_REACT: ReusedCodeEntry = {
  name: "wds-react (NASA Planetary Data System)",
  URL: "https://github.com/nasa-pds/wds-react",
};

const NAVV: ReusedCodeEntry = {
  name: "navv (Cybersecurity and Infrastructure Security Agency)",
  URL: "https://github.com/cisagov/network-architecture-verification-and-validation",
};

const NEMO: ReusedCodeEntry = {
  name: "nemo (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/NEMO",
};

const NEMO_CONTRACTS: ReusedCodeEntry = {
  name: "NEMO-contracts (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/nemo-contracts",
};

const NEMO_CUSTOM_FORMS: ReusedCodeEntry = {
  name: "NEMO-custom-forms (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/nemo-custom-forms",
};

const NEMO_ONLINE_TRAINING: ReusedCodeEntry = {
  name: "NEMO-online-training (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/nemo-online-training",
};

const NEMO_SENSORS: ReusedCodeEntry = {
  name: "NEMO-sensors (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/nemo-sensors",
};

const NGAGEOINT_CLOSURE_WEBPACK_PLUGIN: ReusedCodeEntry = {
  name: "closure-webpack-plugin (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/closure-webpack-plugin",
};

const NGAGEOINT_COLOR_JS: ReusedCodeEntry = {
  name: "color-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/color-js",
};

const NGAGEOINT_GARS_JS: ReusedCodeEntry = {
  name: "gars-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/gars-js",
};

const NGAGEOINT_GEOPACKAGE: ReusedCodeEntry = {
  name: "geopackage (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-js",
};

const NGAGEOINT_GEOPACKAGE_CSV_JS: ReusedCodeEntry = {
  name: "geopackage-csv-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-csv-js",
};

const NGAGEOINT_GEOPACKAGE_GEOJSON_JS: ReusedCodeEntry = {
  name: "geopackage-geojson-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-geojson-js",
};

const NGAGEOINT_GEOPACKAGE_KML_JS: ReusedCodeEntry = {
  name: "geopackage-kml-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-kml-js",
};

const NGAGEOINT_GEOPACKAGE_MBTILES_JS: ReusedCodeEntry = {
  name: "geopackage-mbtiles-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-mbtiles-js",
};

const NGAGEOINT_GEOPACKAGE_MOBILE_OPTIMIZER: ReusedCodeEntry = {
  name: "geopackage-mobile-optimizer (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-mobile-optimizer",
};

const NGAGEOINT_GEOPACKAGE_PBF_JS: ReusedCodeEntry = {
  name: "geopackage-pbf-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-pbf-js",
};

const NGAGEOINT_GEOPACKAGE_SHAPEFILE_JS: ReusedCodeEntry = {
  name: "geopackage-shapefile-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-shapefile-js",
};

const NGAGEOINT_GEOPACKAGE_XYZ_JS: ReusedCodeEntry = {
  name: "geopackage-xyz-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/geopackage-xyz-js",
};

const NGAGEOINT_GRID_JS: ReusedCodeEntry = {
  name: "grid-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/grid-js",
};

const NGAGEOINT_LEAFLET_GEOPACKAGE: ReusedCodeEntry = {
  name: "leaflet-geopackage (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/leaflet-geopackage",
};

const NGAGEOINT_MGRS_JS: ReusedCodeEntry = {
  name: "mgrs-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/mgrs-js",
};

const NGAGEOINT_OPENSPHERE_COVERAGE_LOADER: ReusedCodeEntry = {
  name: "opensphere-coverage-loader (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/opensphere-coverage-loader",
};

const NGAGEOINT_PROJECTIONS_JS: ReusedCodeEntry = {
  name: "projections-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/projections-js",
};

const NGAGEOINT_SIMPLE_FEATURES_GEOJSON_JS: ReusedCodeEntry = {
  name: "simple-features-geojson-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/simple-features-geojson-js",
};

const NGAGEOINT_SIMPLE_FEATURES_PROJ_JS: ReusedCodeEntry = {
  name: "simple-features-proj-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/simple-features-proj-js",
};

const NGAGEOINT_SIMPLE_FEATURES_WKT_JS: ReusedCodeEntry = {
  name: "simple-features-wkt-js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/simple-features-wkt-js",
};

const NGX_CMS_COMMON: ReusedCodeEntry = {
  name: "ngx-cms-common (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/ngx-cms-common",
};

const NGX_CMS_COMMON_APP: ReusedCodeEntry = {
  name: "ngx-cms-common-app (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/ngx-cms-common-app",
};

const NRSS: ReusedCodeEntry = {
  name: "nrss (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/NRSS",
};

const NUCOS: ReusedCodeEntry = {
  name: "nucos (NOAA Office of Response and Restoration)",
  URL: "https://github.com/noaa-orr-erd/nucos",
};

const NUWCDIVNPT_STIG_MANAGER_CLIENT_MODULES: ReusedCodeEntry = {
  name: "stig-manager-client-modules (Naval Undersea Warfare Center Division Newport)",
  URL: "https://github.com/nuwcdivnpt/stig-manager-client-modules",
};

const OAUTH2_PROXY_AUTHENTICATION: ReusedCodeEntry = {
  name: "oauth2-proxy-authentication (18F (GSA))",
  URL: "https://github.com/18f/oauth2-proxy-authentication",
};

const ODVC: ReusedCodeEntry = {
  name: "odvc (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/odvc",
};

const ONEARGOPY: ReusedCodeEntry = {
  name: "oneargopy (Pacific Marine Environmental Laboratory)",
  URL: "https://github.com/noaa-pmel/oneargopy",
};

const OPENACR_OPENACR: ReusedCodeEntry = {
  name: "openacr (U.S. General Services Administration)",
  URL: "https://github.com/gsa/openacr",
};

const OPENAQ_QUALITY_CHECKER: ReusedCodeEntry = {
  name: "openaq-quality-checker (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/openaq/openaq-quality-check",
};

const OSCAL_DEEP_DIFF: ReusedCodeEntry = {
  name: "oscal-deep-diff (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/oscal-deep-diff",
};

const PA11Y_CRAWL: ReusedCodeEntry = {
  name: "pa11y-crawl (18F (GSA))",
  URL: "https://www.npmjs.com/package/pa11y-crawl",
};

const PDS_DOI_SERVICE: ReusedCodeEntry = {
  name: "pds-doi-service (NASA Planetary Data System)",
  URL: "https://github.com/nasa-pds/pds-doi-service",
};

const PETULANT_BEAR: ReusedCodeEntry = {
  name: "petulant-bear (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/petulant-bear",
};

const PKG_18F_18F_ESLINT: ReusedCodeEntry = {
  name: "18f-eslint (18F (GSA))",
  URL: "https://www.npmjs.com/package/@18f/18f-eslint",
};

const PKG_18F_ESLINT_PLUGIN_IDENTITY: ReusedCodeEntry = {
  name: "eslint-plugin-identity (18F (GSA))",
  URL: "https://github.com/18f/identity-idp",
};

const PKG_18F_PRIVATE_EYE: ReusedCodeEntry = {
  name: "private-eye (18F (GSA))",
  URL: "https://github.com/18f/private-eye",
};

const PKG_18F_REDUX_TEXTAREA_DEBOUNCE: ReusedCodeEntry = {
  name: "redux-textarea-debounce (18F (GSA))",
  URL: "https://github.com/18f/redux-textarea-debounce",
};

const PKG_18F_STYLELINT_RULES: ReusedCodeEntry = {
  name: "stylelint-rules (18F (GSA))",
  URL: "https://github.com/18f/stylelint-rules",
};

const PKG_18F_TRELLO_WEBHOOK_SERVER: ReusedCodeEntry = {
  name: "trello-webhook-server (18F (GSA))",
  URL: "https://github.com/18f/trello-webhook-server",
};

const PKG_18F_US_FEDERAL_HOLIDAYS: ReusedCodeEntry = {
  name: "us-federal-holidays (18F (GSA))",
  URL: "https://github.com/18f/us-federal-holidays",
};

const PY_GD: ReusedCodeEntry = {
  name: "py-gd (NOAA Office of Response and Restoration)",
  URL: "https://github.com/noaa-orr-erd/py_gd",
};

const PYEBSDINDEX: ReusedCodeEntry = {
  name: "pyebsdindex (U.S. Naval Research Laboratory)",
  URL: "https://github.com/usnavalresearchlaboratory/pyebsdindex",
};

const PYGCN: ReusedCodeEntry = {
  name: "pygcn (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/pygcn",
};

const PYOOS: ReusedCodeEntry = {
  name: "pyoos (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/pyoos",
};

const PYTEST_KAFKA_BROKER: ReusedCodeEntry = {
  name: "pytest-kafka-broker (NASA General Coordinates Network)",
  URL: "https://github.com/nasa-gcn/pytest-kafka-broker",
};

const PYWATERSHED: ReusedCodeEntry = {
  name: "pywatershed (U.S. Geological Survey)",
  URL: "https://github.com/doi-usgs/pywatershed",
};

const Q2_ITSXPRESS: ReusedCodeEntry = {
  name: "q2_itsxpress (USDA ARS Genomics and Bioinformatics Research Unit)",
  URL: "https://github.com/usda-ars-gbru/q2_itsxpress",
};

const QPP_BSR_EXCEL_TOOL: ReusedCodeEntry = {
  name: "qpp-bsr-excel-tool (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/cmsgov/qpp-bsr-excel-tool",
};

const QPP_SHARED_HEALTH_CHECK_NODE: ReusedCodeEntry = {
  name: "qpp-shared-health-check-node (Centers for Medicare & Medicaid Services)",
  URL: "https://www.npmjs.com/package/qpp-shared-health-check-node",
};

const QPP_STICKYFILLJS: ReusedCodeEntry = {
  name: "qpp-stickyfilljs (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/somepedro/stickyfill",
};

const QPP_STYLE: ReusedCodeEntry = {
  name: "qpp-style (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/cmsgov/qpp-style",
};

const QUAKEML_PARSER_JS: ReusedCodeEntry = {
  name: "quakeml-parser-js (U.S. Geological Survey)",
  URL: "https://github.com/usgs/quakeml-parser-js",
};

const QUARTO_UTILS: ReusedCodeEntry = {
  name: "quarto-utils (U.S. Geological Survey)",
  URL: "https://github.com/doi-usgs/quarto-utils",
};

const REID_HOTA: ReusedCodeEntry = {
  name: "reid_hota (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/reid_hota",
};

const RENTAL_ASSISTANCE_FINDER: ReusedCodeEntry = {
  name: "rental-assistance-finder (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/rental-assistance-finder",
};

const RETEXT_18F_SIMPLIFY: ReusedCodeEntry = {
  name: "retext-18f-simplify (18F (GSA))",
  URL: "https://github.com/18f/retext-simplify",
};

const ROSETTA_SOIL: ReusedCodeEntry = {
  name: "rosetta-soil (USDA ARS U.S. Salinity Laboratory)",
  URL: "https://github.com/usda-ars-ussl/rosetta-soil",
};

const RUGOSA: ReusedCodeEntry = {
  name: "rugosa (DoD Cyber Crime Center (DC3))",
  URL: "https://github.com/dod-cyber-crime-center/rugosa",
};

const RUN_TIME_ASSURANCE: ReusedCodeEntry = {
  name: "run-time-assurance (Air Force Research Laboratory ACT3)",
  URL: "https://github.com/act3-ace/run-time-assurance",
};

const SAFE_AUTONOMY_DYNAMICS: ReusedCodeEntry = {
  name: "safe-autonomy-dynamics (Air Force Research Laboratory ACT3)",
  URL: "https://github.com/act3-ace/safe-autonomy-dynamics",
};

const SAFE_AUTONOMY_SIMS: ReusedCodeEntry = {
  name: "safe-autonomy-sims (Air Force Research Laboratory ACT3)",
  URL: "https://github.com/act3-ace/safe-autonomy-sims",
};

const SAVVY_UTILS: ReusedCodeEntry = {
  name: "savvy-utils (U.S. General Services Administration)",
  URL: "https://www.npmjs.com/package/savvy-utils",
};

const SCIKIT_EIT: ReusedCodeEntry = {
  name: "scikit-eit (U.S. Naval Research Laboratory)",
  URL: "https://github.com/usnavalresearchlaboratory/scikit-eit",
};

const SENTOP: ReusedCodeEntry = {
  name: "sentop (U.S. Department of Homeland Security)",
  URL: "https://github.com/dhs-gov/sentop",
};

const STICKYFILL_WEB_MODULE: ReusedCodeEntry = {
  name: "stickyfill-web-module (18F (GSA))",
  URL: "https://github.com/18f/stickyfill",
};

const TEAM_API_SERVER: ReusedCodeEntry = {
  name: "team-api-server (18F (GSA))",
  URL: "https://github.com/18f/team-api",
};

const TEKRSA_API_WRAP: ReusedCodeEntry = {
  name: "tekrsa-api-wrap (National Telecommunications and Information Administration)",
  URL: "https://github.com/ntia/tekrsa-api-wrap",
};

const TEQP: ReusedCodeEntry = {
  name: "teqp (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/teqp",
};

const TEQPFLSH: ReusedCodeEntry = {
  name: "teqpflsh (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/teqpflsh",
};

const THREDDS_CRAWLER: ReusedCodeEntry = {
  name: "thredds-crawler (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/thredds_crawler",
};

const USDS_GOV_QUESTIONABLE: ReusedCodeEntry = {
  name: "questionable (U.S. Digital Service)",
  URL: "https://github.com/usds/questionable",
};

const USGS_ASTROGEOLOGY_USGSCSM: ReusedCodeEntry = {
  name: "usgscsm (USGS Astrogeology)",
  URL: "https://github.com/usgs-astrogeology/usgscsm",
};

const USTAXCOURT_PAYMENT_PORTAL: ReusedCodeEntry = {
  name: "payment-portal (U.S. Tax Court)",
  URL: "https://github.com/ustaxcourt/ustc-payment-portal",
};

const USTAXCOURT_SHAREPOINT_INTEGRATION: ReusedCodeEntry = {
  name: "sharepoint-integration (U.S. Tax Court)",
  URL: "https://github.com/ustaxcourt/sharepoint-integration",
};

const USTAXCOURT_USTC_PAY_GOV_TEST_SERVER: ReusedCodeEntry = {
  name: "ustc-pay-gov-test-server (U.S. Tax Court)",
  URL: "https://github.com/ustaxcourt/ustc-pay-gov-test-server",
};

const USWDS_ELEMENTS: ReusedCodeEntry = {
  name: "elements (U.S. Web Design System)",
  URL: "https://github.com/uswds/uswds-elements",
};

const USWDS_EXTENDED: ReusedCodeEntry = {
  name: "uswds-extended (U.S. General Services Administration)",
  URL: "https://github.com/gsa/uswds-extended",
};

const USWDS_TOKENS: ReusedCodeEntry = {
  name: "tokens (U.S. Web Design System)",
  URL: "https://github.com/uswds/uswds-tokens",
};

const USWDS_WEB_COMPONENTS: ReusedCodeEntry = {
  name: "web-components (U.S. Web Design System)",
  URL: "https://www.npmjs.com/package/@uswds/web-components",
};

const VYPERDATUM: ReusedCodeEntry = {
  name: "vyperdatum (NOAA Office of Coast Survey)",
  URL: "https://github.com/noaa-ocs-hydrography/vyperdatum",
};

const WDFN_VIZ_PKG: ReusedCodeEntry = {
  name: "wdfn-viz (U.S. Geological Survey)",
  URL: "https://www.npmjs.com/package/wdfn-viz",
};

const WICKEN: ReusedCodeEntry = {
  name: "Wicken (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/wicken",
};

const WIMLIB: ReusedCodeEntry = {
  name: "WIMLib (USGS Web Informatics and Mapping)",
  URL: "https://github.com/usgs-wim/wimlib",
};

const WNTR: ReusedCodeEntry = {
  name: "wntr (U.S. Environmental Protection Agency)",
  URL: "https://github.com/usepa/wntr",
};

const WXMPL: ReusedCodeEntry = {
  name: "wxmpl (NOAA Office of Response and Restoration)",
  URL: "https://github.com/noaa-orr-erd/wxmpl",
};

const XARRAY_SUBSET_GRID: ReusedCodeEntry = {
  name: "xarray-subset-grid (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/xarray-subset-grid",
};

const XWMT: ReusedCodeEntry = {
  name: "xwmt (NOAA - Geophysical Fluid Dynamics Laboratory)",
  URL: "https://github.com/noaa-gfdl/xwmt",
};

const YABADABA: ReusedCodeEntry = {
  name: "yabadaba (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/yabadaba",
};

// npm packages, keyed by lowercased package name
export const GOV_DEPENDENCIES: Record<string, ReusedCodeEntry> = {
  "18f-pages-server": PAGES_SERVER,
  "3d-tiles-renderer": PKG_3DTILESRENDERERJS,
  "about-yml-validator": ABOUT_YML_VALIDATOR,
  "adl-xapiwrapper": ADL_XAPIWRAPPER,
  "alignment-viewer": ALIGNMENTVIEWER,
  amortize: AMORTIZE,
  "analytics-reporter": ANALYTICS_REPORTER,
  "aria-accordion": ACCORDION,
  "atomic-component": ATOMICCOMPONENT,
  "bems-theme-react-starter": BEMS_THEME_REACT_STARTER,
  bioseq: BIOSEQ,
  "cbp-ds": CBP_THEME,
  "cf-blue-green": CF_BLUE_GREEN_PKG,
  "cf-component-demo": CF_COMPONENT_DEMO,
  "cf-grunt-config": CF_GRUNT_CONFIG,
  "cf-theme-cfpb": CF_THEME_CFPB,
  "cfgov-sheer-templates": CFGOV_SHEER_TEMPLATES,
  "cfpb-chart-builder": CFPB_CHART_BUILDER,
  "cfpb-front-end": CFPB_FRONT_END,
  citysdk: CITYSDK,
  "cms-common": CMS_COMMON,
  "cms-mrf-validator": PRICE_TRANSPARENCY_GUIDE_VALIDATOR,
  "code-clerk": CODE_CLERK,
  "codejson-core": CODEJSON_CORE,
  "codejson-crosswalk": CODEJSON_CROSSWALK,
  "compass-rose-ui": COMPASS_ROSE_UI,
  "continua11y-acceptance": NODE_CONTINUA11Y_ACCEPTANCE,
  "continua11y-ci-reporter": NODE_CONTINUA11Y_CI_REPORTER,
  "continua11y-reports": NODE_CONTINUA11Y_REPORTS,
  "contracting-cookbook": CONTRACTING_COOKBOOK_CLIENT,
  "ctrl-f": CTRL_F,
  "data-api": QU,
  dtdanalyzer: DTDANALYZER,
  "earthquake-cpt": EARTHQUAKE_CPT,
  "earthquake-hazard-tool": EARTHQUAKE_HAZARD_TOOL,
  "earthquake-latest-earthquakes": EARTHQUAKE_LATEST_EARTHQUAKES,
  "earthquake-list-widget": EARTHQUAKE_LIST_WIDGET,
  "earthquake-rtgm-calculator": EARTHQUAKE_RTGM_CALCULATOR,
  "earthquake-usdesign": EARTHQUAKE_USDESIGN,
  "earthquake-website": EARTHQUAKE_WEBSITE,
  endpointjs: ENDPOINT_JS,
  "eslint-config-opensphere": ESLINT_CONFIG_OPENSPHERE,
  "eslint-plugin-opensphere": ESLINT_PLUGIN_OPENSPHERE,
  exitscript: EXITSCRIPT,
  "fast-shared-client": FAST_SHARED_CLIENT,
  "fdns-js-sdk": FDNS_JS_SDK,
  "fdns-ui-react": FDNS_UI_REACT,
  "fdsh-client": NODE_FDSH_CLIENT,
  "fec-style": FEC_STYLE,
  "file-locked-operation": FILE_LOCKED_OPERATION,
  "format-usd": FORMAT_USD,
  "fuzzy-state-search": FUZZY_STATE_SEARCH,
  "gcn-kafka": GCN_KAFKA_JS,
  "generator-18f": GENERATOR_18F,
  "generator-cf": GENERATOR_CF,
  "generator-cf-component": GENERATOR_CF_COMPONENT,
  "generator-energyapps": GENERATOR_ENERGYAPPS,
  "generator-node-cfpb": GENERATOR_NODE_CFPB,
  ghad: GHAD,
  "glossary-panel": GLOSSARY,
  h5wasm: H5WASM,
  "hazdev-accordion": HAZDEV_ACCORDION,
  "hazdev-d3": HAZDEV_D3,
  "hazdev-geoserve-ws": HAZDEV_GEOSERVE_WS,
  "hazdev-leaflet": HAZDEV_LEAFLET,
  "hazdev-location-view": HAZDEV_LOCATION_VIEW,
  "hazdev-ng-geoserve-output": HAZDEV_NG_GEOSERVE_OUTPUT,
  "hazdev-ng-location-view": HAZDEV_NG_LOCATION_VIEW,
  "hazdev-ng-template": HAZDEV_NG_TEMPLATE,
  "hazdev-question-view": HAZDEV_QUESTION_VIEW,
  "hazdev-svgimagemap": HAZDEV_SVGIMAGEMAP,
  "hazdev-tablist": HAZDEV_TABLIST,
  "hazdev-template": HAZDEV_TEMPLATE,
  "hazdev-webutils": HAZDEV_WEBUTILS,
  "hmac-authentication": HMAC_AUTHENTICATION_NPM,
  "hmda-explorer": HMDA_EXPLORER,
  "hmda-ui": HMDA_UI_MODULES,
  "hubot-acrogov": HUBOT_ACROGOV,
  "hubot-aws-cfpb": HUBOT_AWS_CFPB,
  "hubot-cf-notifications": HUBOT_CF_NOTIFICATIONS_PKG,
  "hubot-cfpb-indexer": HUBOT_CFPB_INDEXER,
  "hubot-new-relic-alerts": HUBOT_NEW_RELIC_ALERTS,
  "hubot-onboarding": HUBOT_ONBOARDING,
  "hubot-scripts-us-federal-holidays-reminder":
    HUBOT_SCRIPTS_US_FEDERAL_HOLIDAYS_REMINDER,
  icn3d: ICN3D,
  "ipymesh-widgets": IPYMESH,
  "is-money-usd": IS_MONEY_USD,
  jsfive: JSFIVE,
  "jumbo-mortgage": JUMBO_MORTGAGE,
  "linkify-citations": LINKIFY_CITATIONS,
  lithosphere: LITHOSPHERE,
  "loan-calc": LOAN_CALC,
  loast: LIGHTHOUSE_OAS_TESTS,
  "lunr-server": LUNR_SERVER,
  madcert: MADCERT,
  "micropurchase-data": MICROPURCHASEDATA,
  "nara-node": NARA_NODE,
  "ncbi-web-standards": STANDARDS2,
  "ngx-cbp-theme": NGX_CBP_THEME,
  "ngx-cms-common": NGX_CMS_COMMON,
  "ngx-cms-common-app": NGX_CMS_COMMON_APP,
  nucos: NUCOS,
  "oauth2-proxy-authentication": OAUTH2_PROXY_AUTHENTICATION,
  objectified: OBJECTIFIED,
  "onboarding-scheduler": ONBOARDING_SCHEDULER,
  "openaq-quality-checker": OPENAQ_QUALITY_CHECKER,
  openmct: OPENMCT,
  "openmct-mcws-plugin": OPENMCT_MCWS,
  "openseadragon-filtering": OPENSEADRAGONFILTERING,
  "opensphere-asm": OPENSPHERE_ASM,
  "opensphere-build-closure-helper": OPENSPHERE_BUILD_CLOSURE_HELPER,
  "opensphere-build-docs": OPENSPHERE_BUILD_DOCS,
  "opensphere-build-index": OPENSPHERE_BUILD_INDEX,
  "opensphere-build-resolver": OPENSPHERE_BUILD_RESOLVER,
  "opensphere-state-schema": OPENSPHERE_STATE_SCHEMA,
  "overall-loan-cost": OVERALL_LOAN_COST,
  "owning-a-home": OWNING_A_HOME,
  "pa11y-crawl": PA11Y_CRAWL,
  "pa11y-reporter-ci": PA11Y_REPORTER_CI,
  patristic: PATRISTIC,
  "qpp-bsr-excel-tool": QPP_BSR_EXCEL_TOOL,
  "qpp-design-system": CMSGOV_QPP_DESIGN_SYSTEM_CORE,
  "qpp-file-upload-api-client": QPP_FILE_UPLOAD_API_CLIENT,
  "qpp-measures-data": QPP_MEASURES_DATA,
  "qpp-shared-health-check-node": QPP_SHARED_HEALTH_CHECK_NODE,
  "qpp-shared-healthcheck-node": QPP_SHARED_HEALTHCHECK_NODE,
  "qpp-shared-logger-node": QPP_SHARED_LOGGER_NODE,
  "qpp-stickyfilljs": QPP_STICKYFILLJS,
  "qpp-style": QPP_STYLE,
  "qpp-submissions-schema": QPP_SUBMISSIONS_SCHEMA,
  "quakeml-parser-js": QUAKEML_PARSER_JS,
  read2me: READ2ME,
  "retext-18f-simplify": RETEXT_18F_SIMPLIFY,
  "savvy-utils": SAVVY_UTILS,
  "seed-images": SEED_IMAGES,
  sendak: SENDAK,
  "sendak-usage": SENDAK_USAGE,
  "simple-features-js": SIMPLE_FEATURES_JS,
  "simple-features-wkb-js": SIMPLE_FEATURES_WKB_JS,
  singularjs: SINGULARJS,
  "stay-positive": STAY_POSITIVE,
  "stickyfill-web-module": STICKYFILL_WEB_MODULE,
  "student-debt-calc": STUDENT_DEBT_CALCULATOR,
  "stylelint-config-opensphere": STYLELINT_CONFIG_OPENSPHERE,
  "team-api-server": TEAM_API_SERVER,
  tidytree: TIDYTREE,
  time2read: TIME2READ,
  timecraftjs: TIMECRAFTJS,
  tn93: TN93_JS,
  "unformat-usd": UNFORMAT_USD,
  "us-forms-system": US_FORMS_SYSTEM,
  "uswds-extended": USWDS_EXTENDED,
  vax: VAX,
  "vets-json-schema": VETS_JSON_SCHEMA,
  wcag: NODE_WCAG,
  "wcag-cli": NODE_WCAG_CLI,
  "wdfn-viz": WDFN_VIZ_PKG,
  "worldview-components": WORLDVIEW_COMPONENTS,
  "@18f/18f-eslint": PKG_18F_18F_ESLINT,
  "@18f/eslint-plugin-identity": PKG_18F_ESLINT_PLUGIN_IDENTITY,
  "@18f/identity-address-search": PKG_18F_ESLINT_PLUGIN_IDENTITY,
  "@18f/identity-build-sass": PKG_18F_ESLINT_PLUGIN_IDENTITY,
  "@18f/identity-components": PKG_18F_ESLINT_PLUGIN_IDENTITY,
  "@18f/identity-design-system": IDENTITY_DESIGN_SYSTEM,
  "@18f/identity-i18n": PKG_18F_ESLINT_PLUGIN_IDENTITY,
  "@18f/identity-normalize-yaml": PKG_18F_ESLINT_PLUGIN_IDENTITY,
  "@18f/identity-stylelint-config": PKG_18F_ESLINT_PLUGIN_IDENTITY,
  "@18f/private-eye": PKG_18F_PRIVATE_EYE,
  "@18f/redux-textarea-debounce": PKG_18F_REDUX_TEXTAREA_DEBOUNCE,
  "@18f/stylelint-rules": PKG_18F_STYLELINT_RULES,
  "@18f/trello-webhook-server": PKG_18F_TRELLO_WEBHOOK_SERVER,
  "@18f/us-federal-holidays": PKG_18F_US_FEDERAL_HOLIDAYS,
  "@cbiitss/react-components": CBIITSS_REACT_COMPONENTS,
  "@cdc/map": CDC_MAP,
  "@cfpb/atomic-component": CFPB_ATOMIC_COMPONENT,
  "@cfpb/britecharts": BRITECHARTS,
  "@cfpb/browserslist-config": CFPB_ANALYTICS,
  "@cfpb/buttons": CFPB_BUTTONS,
  "@cfpb/ccdb5-ui": CCDB5_UI,
  "@cfpb/cfpb-analytics": CFPB_ANALYTICS,
  "@cfpb/cfpb-atomic-component": CFPB_CFPB_ATOMIC_COMPONENT,
  "@cfpb/cfpb-buttons": CFPB_CFPB_BUTTONS,
  "@cfpb/cfpb-core": CFPB_CFPB_CORE,
  "@cfpb/cfpb-design-system": CFPB_DESIGN_SYSTEM,
  "@cfpb/cfpb-expandables": CFPB_CFPB_EXPANDABLES,
  "@cfpb/cfpb-forms": CFPB_CFPB_FORMS,
  "@cfpb/cfpb-grid": CFPB_CFPB_GRID,
  "@cfpb/cfpb-icons": CFPB_CFPB_ICONS,
  "@cfpb/cfpb-layout": CFPB_CFPB_LAYOUT,
  "@cfpb/cfpb-notifications": CFPB_CFPB_NOTIFICATIONS,
  "@cfpb/cfpb-pagination": CFPB_CFPB_PAGINATION,
  "@cfpb/cfpb-tables": CFPB_CFPB_TABLES,
  "@cfpb/cfpb-typography": CFPB_CFPB_TYPOGRAPHY,
  "@cfpb/core": CFPB_CORE,
  "@cfpb/design-system": CFPB_DESIGN_SYSTEM,
  "@cfpb/design-system-react": DESIGN_SYSTEM_REACT,
  "@cfpb/expandables": CFPB_EXPANDABLES,
  "@cfpb/forms": CFPB_FORMS,
  "@cfpb/grid": CFPB_GRID,
  "@cfpb/icons": CFPB_ICONS,
  "@cfpb/jumbo-mortgage": JUMBO_MORTGAGE,
  "@cfpb/layout": CFPB_LAYOUT,
  "@cfpb/netlify-cms": CFPB_NETLIFY_CMS,
  "@cfpb/notifications": CFPB_NOTIFICATIONS,
  "@cfpb/pagination": CFPB_PAGINATION,
  "@cfpb/rental-assistance-finder": RENTAL_ASSISTANCE_FINDER,
  "@cfpb/student-debt-calculator": STUDENT_DEBT_CALCULATOR,
  "@cfpb/tables": CFPB_TABLES,
  "@cfpb/typography": CFPB_TYPOGRAPHY,
  "@cmsgov/design-system": CMS_DESIGN_SYSTEM,
  "@cmsgov/design-system-core": CMS_DESIGN_SYSTEM,
  "@cmsgov/design-system-docs": CMS_DESIGN_SYSTEM,
  "@cmsgov/design-system-layout": CMS_DESIGN_SYSTEM,
  "@cmsgov/design-system-scripts": CMS_DESIGN_SYSTEM,
  "@cmsgov/design-system-support": CMS_DESIGN_SYSTEM,
  "@cmsgov/ds-cms-gov": CMS_DS_CMS_GOV,
  "@cmsgov/ds-healthcare-gov": CMS_DS_HEALTHCARE_GOV,
  "@cmsgov/ds-medicare-gov": CMS_DS_MEDICARE_GOV,
  "@cmsgov/eslint-config-design-system": CMS_DESIGN_SYSTEM,
  "@cmsgov/hpt-validator": CMSGOV_HPT_VALIDATOR,
  "@cmsgov/hpt-validator-cli": CMSGOV_HPT_VALIDATOR_CLI,
  "@cmsgov/medicare-site-package": CMSGOV_MEDICARE_SITE_PACKAGE,
  "@cmsgov/qpp-design-system-core": CMSGOV_QPP_DESIGN_SYSTEM_CORE,
  "@cmsgov/qpp-design-system-support": CMSGOV_QPP_DESIGN_SYSTEM_CORE,
  "@cmsgov/qpp-measures-data": QPP_MEASURES_DATA,
  "@cmsgov/qpp-shared-api-versioning-node":
    CMSGOV_QPP_SHARED_API_VERSIONING_NODE,
  "@cmsgov/qpp-shared-logger-node": QPP_SHARED_LOGGER_NODE,
  "@cmsgov/qpp-style-angular": CMSGOV_QPP_STYLE_ANGULAR,
  "@cmsgov/request-version": CMSGOV_REQUEST_VERSION,
  "@cmsgov/stylelint-config-design-system": CMS_DESIGN_SYSTEM,
  "@code.gov/about-page": CODE_GOV_ABOUT_PAGE,
  "@code.gov/api-client": CODE_GOV_API_CLIENT,
  "@code.gov/cautious": CODE_GOV_CAUTIOUS,
  "@code.gov/code-gov-adapter": CODE_GOV_CODE_GOV_ADAPTER,
  "@code.gov/code-gov-font": CODE_GOV_CODE_GOV_FONT,
  "@code.gov/code-gov-style": CODE_GOV_CODE_GOV_STYLE,
  "@code.gov/code-gov-validator": CODE_GOV_CODE_GOV_VALIDATOR,
  "@code.gov/coding-languages": CODE_GOV_CODING_LANGUAGES,
  "@code.gov/compliance-dashboard-web-component":
    CODE_GOV_COMPLIANCE_DASHBOARD_WEB_COMPONENT,
  "@code.gov/fscp-react-component": CODE_GOV_FSCP_REACT_COMPONENT,
  "@code.gov/json-schema-validator-web-component":
    CODE_GOV_JSON_SCHEMA_VALIDATOR_WEB_COMPONENT,
  "@code.gov/json-schema-web-component": CODE_GOV_JSON_SCHEMA_WEB_COMPONENT,
  "@code.gov/site-map-generator": CODE_GOV_SITE_MAP_GENERATOR,
  "@cumulus/cumulus-message-adapter-js": CUMULUS_CUMULUS_MESSAGE_ADAPTER_JS,
  "@department-of-veterans-affairs/react-jsonschema-form":
    DEPARTMENT_OF_VETERANS_AFFAIRS_REACT_JSONSCHEMA_FORM,
  "@deptofdefense/covid19-calculator": DEPTOFDEFENSE_COVID19_CALCULATOR,
  "@edsc/echoforms": EDSC_ECHOFORMS,
  "@edsc/geo-utils": EDSC_GEO_UTILS,
  "@edsc/smart-handoffs": EDSC_SMART_HANDOFFS,
  "@edsc/timeline": EDSC_TIMELINE,
  "@enterprise-cmcs/macpro-security-hub-sync": MACPRO_SECURITY_HUB_SYNC,
  "@enterprise-cmcs/macpro-serverless-running-stages":
    ENTERPRISE_CMCS_MACPRO_SERVERLESS_RUNNING_STAGES,
  "@enterprise-cmcs/serverless-waf-plugin":
    ENTERPRISE_CMCS_SERVERLESS_WAF_PLUGIN,
  "@erdc-itl/simple-logger": ERDC_ITL_SIMPLE_LOGGER,
  "@faa-aviation-data-portal/tfrs": FAA_AVIATION_DATA_PORTAL_TFRS,
  "@gsa-sam/icons": GSA_SAM_ICONS,
  "@gsa-sam/sam-ui-elements": GSA_SAM_SAM_UI_ELEMENTS,
  "@gsa-tts/svelte-ui-uswds": GSA_TTS_SVELTE_UI_USWDS,
  "@nasa-gcn/afm": NASA_GCN_AFM,
  "@nasa-gcn/architect-functions-search": NASA_GCN_ARCHITECT_FUNCTIONS_SEARCH,
  "@nasa-gcn/architect-plugin-dynamodb-local":
    NASA_GCN_ARCHITECT_PLUGIN_DYNAMODB_LOCAL,
  "@nasa-gcn/architect-plugin-dynamodb-local-streams":
    NASA_GCN_ARCHITECT_PLUGIN_DYNAMODB_LOCAL_STREAMS,
  "@nasa-gcn/architect-plugin-search": NASA_GCN_ARCHITECT_PLUGIN_SEARCH,
  "@nasa-gcn/architect-plugin-tracing": NASA_GCN_ARCHITECT_PLUGIN_TRACING,
  "@nasa-gcn/architect-plugin-utils": NASA_GCN_ARCHITECT_PLUGIN_UTILS,
  "@nasa-gcn/dynamodb-autoincrement": NASA_GCN_DYNAMODB_AUTOINCREMENT,
  "@nasa-gcn/eslint-config-gitignore": NASA_GCN_ESLINT_CONFIG_GITIGNORE,
  "@nasa-gcn/rcfiles": NASA_GCN_RCFILES,
  "@nasa-gcn/remark-rehype-astro": NASA_GCN_REMARK_REHYPE_ASTRO,
  "@nasa-gcn/remix-seo": NASA_GCN_REMIX_SEO,
  "@nasa-gcn/schema": NASA_GCN_SCHEMA,
  "@nasa-hds/core": NASA_HDS_CORE,
  "@nasa-jpl/aerie-ampcs": NASA_JPL_AERIE_AMPCS,
  "@nasa-jpl/aerie-monaco-editor-customizations":
    NASA_JPL_AERIE_MONACO_EDITOR_CUSTOMIZATIONS,
  "@nasa-jpl/aerie-sequence-languages": NASA_JPL_AERIE_SEQUENCE_LANGUAGES,
  "@nasa-jpl/aerie-time-utils": NASA_JPL_AERIE_TIME_UTILS,
  "@nasa-jpl/seq-json-schema": SEQ_JSON_SCHEMA,
  "@nasa-terra/components": TERRA_UI_COMPONENTS,
  "@nasapds/essence": NASAPDS_ESSENCE,
  "@nasapds/wds": NASAPDS_WDS,
  "@nasapds/wds-react": NASAPDS_WDS_REACT,
  "@nasaworldwind/worldwind": WEBWORLDWIND,
  "@ngageoint/closure-webpack-plugin": NGAGEOINT_CLOSURE_WEBPACK_PLUGIN,
  "@ngageoint/color-js": NGAGEOINT_COLOR_JS,
  "@ngageoint/gars-js": NGAGEOINT_GARS_JS,
  "@ngageoint/geopackage": NGAGEOINT_GEOPACKAGE,
  "@ngageoint/geopackage-csv-js": NGAGEOINT_GEOPACKAGE_CSV_JS,
  "@ngageoint/geopackage-geojson-js": NGAGEOINT_GEOPACKAGE_GEOJSON_JS,
  "@ngageoint/geopackage-kml-js": NGAGEOINT_GEOPACKAGE_KML_JS,
  "@ngageoint/geopackage-mbtiles-js": NGAGEOINT_GEOPACKAGE_MBTILES_JS,
  "@ngageoint/geopackage-mobile-optimizer":
    NGAGEOINT_GEOPACKAGE_MOBILE_OPTIMIZER,
  "@ngageoint/geopackage-pbf-js": NGAGEOINT_GEOPACKAGE_PBF_JS,
  "@ngageoint/geopackage-shapefile-js": NGAGEOINT_GEOPACKAGE_SHAPEFILE_JS,
  "@ngageoint/geopackage-xyz-js": NGAGEOINT_GEOPACKAGE_XYZ_JS,
  "@ngageoint/grid-js": NGAGEOINT_GRID_JS,
  "@ngageoint/leaflet-geopackage": NGAGEOINT_LEAFLET_GEOPACKAGE,
  "@ngageoint/mgrs-js": NGAGEOINT_MGRS_JS,
  "@ngageoint/opensphere-coverage-loader": NGAGEOINT_OPENSPHERE_COVERAGE_LOADER,
  "@ngageoint/projections-js": NGAGEOINT_PROJECTIONS_JS,
  "@ngageoint/seed-images": SEED_IMAGES,
  "@ngageoint/simple-features-geojson-js": NGAGEOINT_SIMPLE_FEATURES_GEOJSON_JS,
  "@ngageoint/simple-features-js": SIMPLE_FEATURES_JS,
  "@ngageoint/simple-features-proj-js": NGAGEOINT_SIMPLE_FEATURES_PROJ_JS,
  "@ngageoint/simple-features-wkb-js": SIMPLE_FEATURES_WKB_JS,
  "@ngageoint/simple-features-wkt-js": NGAGEOINT_SIMPLE_FEATURES_WKT_JS,
  "@nuwcdivnpt/stig-manager-client-modules":
    NUWCDIVNPT_STIG_MANAGER_CLIENT_MODULES,
  "@nuwcdivnpt/stigman-watcher": STIGMAN_WATCHER,
  "@openacr/openacr": OPENACR_OPENACR,
  "@oscal/oscal-deep-diff": OSCAL_DEEP_DIFF,
  "@usds.gov/questionable": USDS_GOV_QUESTIONABLE,
  "@usgs-astrogeology/usgscsm": USGS_ASTROGEOLOGY_USGSCSM,
  "@ustaxcourt/payment-portal": USTAXCOURT_PAYMENT_PORTAL,
  "@ustaxcourt/sharepoint-integration": USTAXCOURT_SHAREPOINT_INTEGRATION,
  "@ustaxcourt/ustc-pay-gov-test-server": USTAXCOURT_USTC_PAY_GOV_TEST_SERVER,
  "@uswds/compile": USWDS_COMPILE,
  "@uswds/elements": USWDS_ELEMENTS,
  "@uswds/tokens": USWDS_TOKENS,
  "@uswds/uswds": USWDS,
  "@uswds/web-components": USWDS_WEB_COMPONENTS,
  "@gsa-sam/sam-styles": GSA_SAM_SAM_STYLES,
  "@nasa-jpl/plandev-actions": NASA_JPL_PLANDEV_ACTIONS,
  "@nasa-jpl/plandev-ampcs": NASA_JPL_PLANDEV_AMPCS,
  "@nasa-jpl/plandev-sequence-languages": NASA_JPL_PLANDEV_SEQUENCE_LANGUAGES,
  "@nasa-jpl/plandev-time-utils": NASA_JPL_PLANDEV_TIME_UTILS,
  "@nasa-jpl/plandev-ts-user-code-runner": NASA_JPL_PLANDEV_TS_USER_CODE_RUNNER,
};

// PyPI packages, keyed by normalized (lowercased, -/_/. collapsed) name
export const GOV_DEPENDENCIES_PYPI: Record<string, ReusedCodeEntry> = {
  abcmrt16: ABCMRT16,
  "aerie-cli": AERIE_CLI,
  affinis: AFFINIS,
  "ait-core": AIT_CORE,
  "ait-dsn": AIT_DSN,
  "ait-gui": AIT_GUI,
  analphipy: ANALPHIPY,
  "anms-ace": ANMS_ACE,
  "anms-camp": ANMS_CAMP,
  atomgpt: ATOMGPT,
  atomman: ATOMMAN,
  atomvision: ATOMVISION,
  "bart-survival": BART_SURVIVAL,
  batchee: BATCHEE,
  beaapi: BEAAPI,
  "bento-mdf": BENTO_MDF,
  "bento-sts": BENTO_STS,
  "bingo-nasa": BINGO,
  "blob-utils": BLOB_UTILS,
  "bmds-ui": BMDS_UI,
  "boto3-missing": BOTO3_MISSING,
  "cc-plugin-glider": CC_PLUGIN_GLIDER,
  "cc-plugin-ncei": CC_PLUGIN_NCEI,
  "cc-plugin-og": CC_PLUGIN_OG,
  "cc-plugin-sgrid": CC_PLUGIN_SGRID,
  "cc-plugin-ugrid": CC_PLUGIN_UGRID,
  cdcs: PYCDCS,
  "certbot-pkcs12": CERTBOT_PKCS12,
  cfasim: CFA_SIMULATOR,
  cfasodapy: CFASODAPY,
  "cfgov-setup": CFGOV_DJANGO_SETUP,
  chemnlp: CHEMNLP,
  chiltepin: CHILTEPIN,
  chipsff: CHIPSFF,
  ciso: CISO,
  "ckanext-datagovcatalog": CKANEXT_DATAGOVCATALOG,
  "ckanext-datagovtheme": CKANEXT_DATAGOVTHEME,
  "ckanext-datajson": CKANEXT_DATAJSON_PKG,
  "ckanext-geodatagov": CKANEXT_GEODATAGOV,
  "ckanext-googleanalyticsbasic": CKANEXT_GOOGLEANALYTICSBASIC,
  "ckanext-metrics-dashboard": CKANEXT_METRICS_DASHBOARD,
  "ckanext-usmetadata": CKANEXT_USMETADATA,
  cmomy: CMOMY,
  "codejson-index-generator": CODEJSON_INDEX_GENERATOR,
  "compliance-checker": COMPLIANCE_CHECKER,
  condor: CONDOR,
  "consul-announcer": CONSUL_ANNOUNCER,
  "contingency-tools": CONTINGENCY_TOOLS,
  "core-cache-manager-app": CORE_CACHE_MANAGER_APP,
  "core-composer-app": CORE_COMPOSER_APP,
  "core-curate-app": CORE_CURATE_APP,
  "core-curate-registry-app": CORE_CURATE_REGISTRY_APP,
  "core-custom-queries-app": CORE_CUSTOM_QUERIES_APP,
  "core-dashboard-app": CORE_DASHBOARD_APP,
  "core-dashboard-common-app": CORE_DASHBOARD_COMMON_APP,
  "core-dashboard-registry-app": CORE_DASHBOARD_REGISTRY_APP,
  "core-elasticsearch-app": CORE_ELASTICSEARCH_APP,
  "core-explore-common-app": CORE_EXPLORE_COMMON_APP,
  "core-explore-example-app": CORE_EXPLORE_EXAMPLE_APP,
  "core-explore-federated-search-app": CORE_EXPLORE_FEDERATED_SEARCH_APP,
  "core-explore-keyword-app": CORE_EXPLORE_KEYWORD_APP,
  "core-explore-keyword-registry-app": CORE_EXPLORE_KEYWORD_REGISTRY_APP,
  "core-explore-oaipmh-app": CORE_EXPLORE_OAIPMH_APP,
  "core-explore-periodic-table-app": CORE_EXPLORE_PERIODIC_TABLE_APP,
  "core-explore-tree-app": CORE_EXPLORE_TREE_APP,
  "core-exporters-app": CORE_EXPORTERS_APP,
  "core-federated-search-app": CORE_FEDERATED_SEARCH_APP,
  "core-json-app": CORE_JSON_APP,
  "core-linked-records-app": CORE_LINKED_RECORDS_APP,
  "core-main-app": CORE_MAIN_APP,
  "core-main-registry-app": CORE_MAIN_REGISTRY_APP,
  "core-module-advanced-blob-host-app": CORE_MODULE_ADVANCED_BLOB_HOST_APP,
  "core-module-auto-key-app": CORE_MODULE_AUTO_KEY_APP,
  "core-module-auto-key-integer-sequence-app":
    CORE_MODULE_AUTO_KEY_INTEGER_SEQUENCE_APP,
  "core-module-auto-keyref-app": CORE_MODULE_AUTO_KEYREF_APP,
  "core-module-blob-host-app": CORE_MODULE_BLOB_HOST_APP,
  "core-module-chemical-composition-app": CORE_MODULE_CHEMICAL_COMPOSITION_APP,
  "core-module-chemical-composition-simple-app":
    CORE_MODULE_CHEMICAL_COMPOSITION_SIMPLE_APP,
  "core-module-excel-uploader-app": CORE_MODULE_EXCEL_UPLOADER_APP,
  "core-module-fancy-tree-registry-app": CORE_MODULE_FANCY_TREE_REGISTRY_APP,
  "core-module-local-id-registry-app": CORE_MODULE_LOCAL_ID_REGISTRY_APP,
  "core-module-periodic-table-app": CORE_MODULE_PERIODIC_TABLE_APP,
  "core-module-raw-xml-app": CORE_MODULE_RAW_XML_APP,
  "core-module-remote-blob-host-app": CORE_MODULE_REMOTE_BLOB_HOST_APP,
  "core-module-status-registry-app": CORE_MODULE_STATUS_REGISTRY_APP,
  "core-module-text-area-app": CORE_MODULE_TEXT_AREA_APP,
  "core-oaipmh-common-app": CORE_OAIPMH_COMMON_APP,
  "core-oaipmh-harvester-app": CORE_OAIPMH_HARVESTER_APP,
  "core-oaipmh-provider-app": CORE_OAIPMH_PROVIDER_APP,
  "core-parser-app": CORE_PARSER_APP,
  "core-schema-viewer-app": CORE_SCHEMA_VIEWER_APP,
  "core-semantic-search-app": CORE_SEMANTIC_SEARCH_APP,
  "core-user-registration-app": CORE_USER_REGISTRATION_APP,
  "core-visualization-app": CORE_VISUALIZATION_APP,
  "core-visualization-insitu-app": CORE_VISUALIZATION_INSITU_APP,
  "core-website-app": CORE_WEBSITE_APP,
  corl: CORL,
  "cpc-geofiles": CPC_GEOFILES,
  "cpc-geogrids": CPC_GEOGRIDS,
  "cpc-geoplot": CPC_GEOPLOT,
  "ctos-meval": CTOS_MEVAL,
  "ctx-python": CTX_PYTHON,
  "cumulus-message-adapter": CUMULUS_MESSAGE_ADAPTER,
  datamodeldict: DATAMODELDICT,
  dataretrieval: DATARETRIEVAL_PYTHON,
  "detection-limits": DETECTION_LIMITS,
  dicaugment: DICAUGMENT,
  "dioptra-platform": DIOPTRA,
  "django-cache-tools": DJANGO_CACHE_TOOLS,
  "django-flags": DJANGO_FLAGS,
  "django-mysql-ssl": DJANGO_MYSQL_SSL,
  "django-tabular-export": DJANGO_TABULAR_EXPORT,
  "docker-compose-control-center": DOCKER_CONTROL_CENTER,
  dodcerts: DODCERTS,
  "dorado-sensitivity": DORADO_SENSITIVITY,
  dragodis: DRAGODIS,
  "dynamodb-autoincrement": DYNAMODB_AUTOINCREMENT,
  "earthdata-hashdiff": EARTHDATA_HASHDIFF,
  "earthdata-varinfo": EARTHDATA_VARINFO,
  "egi-pynetstation": EGI_PYNETSTATION,
  eispac: EISPAC,
  elinkapi: ELINKAPI,
  erddapy: ERDDAPY,
  etspy: ETSPY,
  exoscene: EXOSCENE,
  fastatools: FASTATOOLS,
  fipy: FIPY,
  fluxpart: FLUXPART,
  "fprime-fpp": FPP,
  fremor: FREMOR,
  fv3grid: FV3GRID,
  "gcn-kafka": GCN_KAFKA,
  geneflow: GENEFLOW2,
  genesignet: GENESIGNET,
  "geo-prepper": GEO_PREPPER,
  "geometry-utils": GEOMETRY_UTILS,
  gff3tool: GFF3TOOLKIT,
  "github-changelog": GITHUB_CHANGELOG,
  gliderpy: GLIDERPY,
  govdelivery: GOVDELIVERY,
  gspy: GSPY,
  gtax: GTAX_PKG,
  gval: GVAL,
  "harmonize-wq": HARMONIZE_WQ,
  "harmony-py": HARMONY_PY,
  "harmony-service-lib": HARMONY_SERVICE_LIB_PY,
  hitips: HITIPS,
  "hmac-authentication": HMAC_AUTHENTICATION_PY,
  hobo: HOBO_PY,
  hpx: HPX,
  "hybig-py": HARMONY_BROWSE_IMAGE_GENERATOR,
  hybridq: HYBRIDQ,
  hydroid: HYDROID,
  hydrotools: HYDROTOOLS,
  "hydrotools-waterdata-client": HYDROTOOLS,
  imppy3d: IMPPY3D,
  intermat: INTERMAT,
  "io-model-builder": IO_MODEL_BUILDER,
  "ioos-metrics": IOOS_METRICS,
  "ioos-pkg-skeleton": IOOS_PKG_SKELETON,
  "ioos-qc": IOOS_QC,
  iprpy: IPRPY,
  ipymesh: IPYMESH,
  itsxpress: ITSXPRESS,
  jobrunner: JOBRUNNER,
  judi: JUDI,
  "kamodo-ccmc": KAMODO,
  "kamodo-core-official": KAMODO_CORE_OFFICIAL,
  kyos: KYOS,
  labbench: LABBENCH,
  "lasso-issues": LASSO_ISSUES,
  "lasso-releasers": LASSO_RELEASERS,
  "lasso-reports": LASSO_REPORTS,
  "lasso-requirements": LASSO_REQUIREMENTS,
  "libpq-dev": LIBPQ_DEV,
  materialite: MATERIALITE,
  "mcp-data-check": MCP_DATA_CHECK,
  mcvqoe: MCVQOE,
  "mcvqoe-accesstime": ACCESSTIME,
  "mcvqoe-base": MCVQOE_BASE,
  "mcvqoe-intelligibility": INTELLIGIBILITY,
  "mcvqoe-mouth2ear": MOUTH2EAR,
  "mcvqoe-psud": PSUD,
  "mcvqoe-tvo": MCV_QOE_TVO,
  microsecrets: MICROSECRETS_PKG,
  mlmcpy: MLMCPY,
  "model-catalogs": MODEL_CATALOGS,
  "modflow-setup": MODFLOW_SETUP,
  "module-utilities": MODULE_UTILITIES,
  mwcp: MWCP,
  mxmcpy: MXMCPY,
  "naif-pds4-bundler": NAIF_PDS4_BUNDLER,
  "nasa-mika": MIKA,
  navv: NAVV,
  "nda-tools": NDA_TOOLS,
  nemo: NEMO,
  "nemo-contracts": NEMO_CONTRACTS,
  "nemo-custom-forms": NEMO_CUSTOM_FORMS,
  "nemo-online-training": NEMO_ONLINE_TRAINING,
  "nemo-sensors": NEMO_SENSORS,
  "nestor-qt": NESTOR_QT,
  nfflr: NFFLR,
  noaabathymetry: NOAABATHYMETRY,
  nrss: NRSS,
  odvc: ODVC,
  oneargopy: ONEARGOPY,
  "open-notebook": OPEN_NOTEBOOK,
  "pds-data-upload-manager": DATA_UPLOAD_MANAGER,
  "pds-doi-service": PDS_DOI_SERVICE,
  "pds-epitome": EPITOME,
  "pds-github-util": PDS_GITHUB_UTIL,
  "pds-ldd-manager": LDD_MANAGER,
  "pds-registry": REGISTRY,
  "petulant-bear": PETULANT_BEAR,
  podaacpy: PODAACPY_2,
  porerefiner: POREREFINER,
  potentials: POTENTIALS,
  "prog-server": PROG_SERVER,
  progpy: PROGPY,
  pshtt: PSHTT,
  "py-gd": PY_GD,
  pyaqsapi: PYAQSAPI,
  "pybeepop-plus": PYBEEPOP,
  pybmds: BMDS,
  "pycap-dss": PYCAP_DSS,
  pyebsdindex: PYEBSDINDEX,
  pygcn: PYGCN,
  pyhappyornot: PYHAPPYORNOT,
  pyhyperscattering: PYHYPERSCATTERING,
  pymcr: PYMCR,
  pymdwizard: FORT_PYMDWIZARD,
  pynssp: PYNSSP,
  pynucos: PYNUCOS,
  pyoos: PYOOS,
  pyprism: PYPRISM,
  pyprms: PYPRMS,
  pyproject2conda: PYPROJECT2CONDA,
  pysips: PYSIPS,
  "pytest-kafka-broker": PYTEST_KAFKA_BROKER,
  "python-cmr": PYTHON_CMR,
  pywatershed: PYWATERSHED,
  "q2-itsxpress": Q2_ITSXPRESS,
  qarrayrun: QARRAYRUN,
  "quarto-utils": QUARTO_UTILS,
  radbelt: RADBELT,
  "rdbms-subsetter": RDBMS_SUBSETTER,
  refchooser: REFCHOOSER,
  regdown: REGDOWN,
  "reid-hota": REID_HOTA,
  "rosetta-soil": ROSETTA_SOIL,
  rugosa: RUGOSA,
  "run-time-assurance": RUN_TIME_ASSURANCE,
  "safe-autonomy-dynamics": SAFE_AUTONOMY_DYNAMICS,
  "safe-autonomy-sims": SAFE_AUTONOMY_SIMS,
  sarpy: SARPY,
  sas2db: SAS2DB,
  "scikit-eit": SCIKIT_EIT,
  scpopcorn: SCPOPCORN,
  sdnist: SDNIST,
  sensoff: SENSOFF,
  sentop: SENTOP,
  "seq-json-schema": SEQ_JSON_SCHEMA,
  serotools: SEROTOOLS,
  sfrmaker: SFRMAKER,
  "shakecast-aebm": SHAKECAST_AEBM,
  "signals-utils": SIGNALS_UTILS,
  simprocesd: SIMPROCESD,
  "slack-emoji-search": EMOJI_SEARCH,
  smcpy: SMCPY,
  "snp-mutator": SNP_MUTATOR,
  "snp-pipeline": SNP_PIPELINE,
  "sql-insert-writer": SQL_INSERT_WRITER,
  "sqlite-dissect": SQLITE_DISSECT,
  srompy: SROMPY,
  ssmdevices: SSMDEVICES,
  stitchee: STITCHEE,
  tb3py: TB3PY,
  "tekrsa-api-wrap": TEKRSA_API_WRAP,
  teqp: TEQP,
  teqpflsh: TEQPFLSH,
  "termseq-peaks": TERMSEQ_PEAKS,
  thermoextrap: THERMOEXTRAP,
  "thredds-crawler": THREDDS_CRAWLER,
  "tk-builder": TK_BUILDER,
  "tmmc-lnpy": TMMC_LNPY,
  tn93: TN93,
  trustymail: TRUSTYMAIL,
  "usgs-shakecast": SHAKECAST,
  "uv-workon": UV_WORKON,
  vcftoolz: VCFTOOLZ,
  "vhr-cloudmask": VHR_CLOUDMASK,
  vica: VICA,
  vyperdatum: VYPERDATUM,
  "wagtail-content-audit": WAGTAIL_CONTENT_AUDIT,
  "wagtail-copyablemodeladmin": WAGTAIL_COPYABLEMODELADMIN,
  "wagtail-flags": WAGTAIL_FLAGS,
  "wagtail-inventory": WAGTAIL_INVENTORY,
  "wagtail-sharing": WAGTAIL_SHARING,
  "wagtail-treemodeladmin": WAGTAIL_TREEMODELADMIN,
  wicken: WICKEN,
  wimlib: WIMLIB,
  wntr: WNTR,
  wxmpl: WXMPL,
  "xarray-subset-grid": XARRAY_SUBSET_GRID,
  "xml-utils": XML_UTILS,
  xwmt: XWMT,
  yabadaba: YABADABA,
  "zarr-eosdis-store": ZARR_EOSDIS_STORE,
  zyra: ZYRA,
};
