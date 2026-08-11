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

const ASTROTIME: ReusedCodeEntry = {
  name: "astrotime (NASA Center for Climate Simulation)",
  URL: "https://github.com/nasa-nccs-hpda/astrotime",
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

const BEMS_THEME_REACT_STARTER: ReusedCodeEntry = {
  name: "bems-theme-react-starter (U.S. Customs and Border Protection)",
  URL: "https://github.com/US-CBP/bems-theme-react-starter",
};

const BENTO_STS: ReusedCodeEntry = {
  name: "bento-sts (NCI Center for Biomedical Informatics and IT)",
  URL: "https://github.com/CBIIT/bento-sts",
};

const BINGO: ReusedCodeEntry = {
  name: "bingo (NASA)",
  URL: "https://github.com/nasa/bingo",
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

const BRITECHARTS: ReusedCodeEntry = {
  name: "britecharts (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/britecharts",
};

const CAPITAL_FRAMEWORK: ReusedCodeEntry = {
  name: "capital-framework (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/capital-framework",
};

const CASE_IMPLEMENTATION_PROV_O: ReusedCodeEntry = {
  name: "CASE-Implementation-PROV-O (CASE Ontology (NIST / DC3))",
  URL: "https://github.com/usnistgov/CASE-Implementation-PROV-O",
};

const CASE_UTILITIES_PYTHON: ReusedCodeEntry = {
  name: "CASE-Utilities-Python (CASE Ontology (NIST / DC3))",
  URL: "https://github.com/usnistgov/CASE-Utilities-Python",
};

const CBP_THEME: ReusedCodeEntry = {
  name: "cbp-theme (U.S. Customs and Border Protection)",
  URL: "https://github.com/US-CBP/cbp-theme",
};

const CCDB5_UI: ReusedCodeEntry = {
  name: "ccdb5-ui (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/ccdb5-ui",
};

const CF_BLUE_GREEN: ReusedCodeEntry = {
  name: "cf-blue-green (cloud.gov (GSA))",
  URL: "https://github.com/cloud-gov/cf-blue-green",
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

const CFPB_CHART_BUILDER: ReusedCodeEntry = {
  name: "cfpb-chart-builder (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/cfpb-chart-builder",
};

const CFPB_DESIGN_SYSTEM: ReusedCodeEntry = {
  name: "cfpb-design-system (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/design-system",
};

const CG_STYLE: ReusedCodeEntry = {
  name: "cg-style (cloud.gov (GSA))",
  URL: "https://github.com/cloud-gov/cg-style",
};

const CHIPSFF: ReusedCodeEntry = {
  name: "chipsff (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/chipsff",
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

const CKANEXT_DATAJSON: ReusedCodeEntry = {
  name: "ckanext-datajson (U.S. Department of Health and Human Services)",
  URL: "https://github.com/HHS/ckanext-datajson",
};

const CKANEXT_DCAT_USMETADATA: ReusedCodeEntry = {
  name: "ckanext-dcat_usmetadata (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ckanext-dcat_usmetadata",
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

const CMAPI_KOTLIN: ReusedCodeEntry = {
  name: "cmapi-kotlin (U.S. Army Mission Command)",
  URL: "https://github.com/missioncommand/cmapi-kotlin",
};

const CMOMY: ReusedCodeEntry = {
  name: "cmomy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/cmomy",
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

const CODE_GOV_FRONT_END: ReusedCodeEntry = {
  name: "code-gov-front-end (U.S. General Services Administration)",
  URL: "https://github.com/GSA/code-gov-front-end",
};

const CODEJSON_CROSSWALK: ReusedCodeEntry = {
  name: "codejson-crosswalk (CMS Digital Service)",
  URL: "https://github.com/DSACMS/codejson-crosswalk",
};

const COMPASS_ROSE_UI: ReusedCodeEntry = {
  name: "compass-rose-ui (NOAA Office of Response and Restoration)",
  URL: "https://github.com/NOAA-ORR-ERD/compass-rose-ui",
};

const CON_PCA_CICD: ReusedCodeEntry = {
  name: "con-pca-cicd (Cybersecurity and Infrastructure Security Agency)",
  URL: "https://github.com/cisagov/con-pca-cicd",
};

const CONDOR: ReusedCodeEntry = {
  name: "condor (NASA)",
  URL: "https://github.com/nasa/condor",
};

const CONSUL_ANNOUNCER: ReusedCodeEntry = {
  name: "consul-announcer (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/consul-announcer",
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

const CUMULUS: ReusedCodeEntry = {
  name: "cumulus (NASA)",
  URL: "https://github.com/nasa/cumulus",
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

const DEEP_ARCHIVE: ReusedCodeEntry = {
  name: "deep-archive (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/deep-archive",
};

const DETECTION_LIMITS: ReusedCodeEntry = {
  name: "detection_limits (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/detection_limits",
};

const DEVELOPMENT: ReusedCodeEntry = {
  name: "development (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/development",
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

const DJANGO_USWDS_FORMS: ReusedCodeEntry = {
  name: "django-uswds-forms (18F (GSA))",
  URL: "https://github.com/18F/django-uswds-forms",
};

const DMARC_IMPORT: ReusedCodeEntry = {
  name: "dmarc-import (Cybersecurity and Infrastructure Security Agency)",
  URL: "https://github.com/cisagov/dmarc-import",
};

const DOCKER_CONTROL_CENTER: ReusedCodeEntry = {
  name: "docker-control-center (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/docker-control-center",
};

const DODCERTS: ReusedCodeEntry = {
  name: "dodcerts (U.S. Army Engineer Research and Development Center)",
  URL: "https://github.com/erdc/dodcerts",
};

const DOI_SERVICE: ReusedCodeEntry = {
  name: "doi-service (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/doi-service",
};

const DOMAIN_SCAN: ReusedCodeEntry = {
  name: "domain-scan (18F (GSA))",
  URL: "https://github.com/18F/domain-scan",
};

const DORADO_SENSITIVITY: ReusedCodeEntry = {
  name: "dorado-sensitivity (NASA)",
  URL: "https://github.com/nasa/dorado-sensitivity",
};

const E_MANIFEST: ReusedCodeEntry = {
  name: "e-Manifest (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/e-Manifest",
};

const EARTHDATA_HASHDIFF: ReusedCodeEntry = {
  name: "earthdata-hashdiff (NASA)",
  URL: "https://github.com/nasa/earthdata-hashdiff",
};

const EARTHDATA_VARINFO: ReusedCodeEntry = {
  name: "earthdata-varinfo (NASA)",
  URL: "https://github.com/nasa/earthdata-varinfo",
};

const EARTHQUAKE_EVENTPAGES: ReusedCodeEntry = {
  name: "earthquake-eventpages (U.S. Geological Survey)",
  URL: "https://github.com/usgs/earthquake-eventpages",
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

const ELASTIC_BLAST: ReusedCodeEntry = {
  name: "elastic-blast (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/elastic-blast",
};

const EMOJI_SEARCH: ReusedCodeEntry = {
  name: "emoji_search (18F (GSA))",
  URL: "https://github.com/18F/emoji_search",
};

const ENDPOINT_JS: ReusedCodeEntry = {
  name: "endpoint.js (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/endpoint.js",
};

const EO_VALIDATION: ReusedCodeEntry = {
  name: "eo-validation (NASA Center for Climate Simulation)",
  URL: "https://github.com/nasa-nccs-hpda/eo-validation",
};

const EPITOME: ReusedCodeEntry = {
  name: "epitome (NASA Planetary Data System)",
  URL: "https://github.com/nasa-pds-engineering-node/epitome",
};

const ESI_UTILS_TIME: ReusedCodeEntry = {
  name: "esi-utils-time (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/ghsc/esi/esi-utils-time",
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

const FAM_IM_EIS3_UIX: ReusedCodeEntry = {
  name: "FAM-IM-EIS3--UIX (USDA Forest Service)",
  URL: "https://code.fs.usda.gov/forest-service/FAM-IM-EIS3--UIX",
};

const FASTATOOLS: ReusedCodeEntry = {
  name: "fastatools (FDA Center for Food Safety and Applied Nutrition)",
  URL: "https://github.com/CFSAN-Biostatistics/fastatools",
};

const FCPGTOOLS: ReusedCodeEntry = {
  name: "FCPGtools (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/StreamStats/data-preparation/cpg/FCPGtools",
};

const FDNS_JS_SDK: ReusedCodeEntry = {
  name: "fdns-js-sdk (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/fdns-js-sdk",
};

const FDNS_UI_REACT: ReusedCodeEntry = {
  name: "fdns-ui-react (Centers for Disease Control and Prevention)",
  URL: "https://github.com/CDCgov/fdns-ui-react",
};

const FDTOOL: ReusedCodeEntry = {
  name: "FDTool (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/FDTool",
};

const FEC_STYLE: ReusedCodeEntry = {
  name: "fec-style (18F (GSA))",
  URL: "https://github.com/18F/fec-style",
};

const FILE_LOCKED_OPERATION: ReusedCodeEntry = {
  name: "file-locked-operation (18F (GSA))",
  URL: "https://github.com/18F/file-locked-operation",
};

const FLUTILE: ReusedCodeEntry = {
  name: "flutile (USDA National Animal Disease Center)",
  URL: "https://github.com/flu-crew/flutile",
};

const FLUVPARTICLE: ReusedCodeEntry = {
  name: "fluvparticle (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/wma/nhgf/fluvparticle",
};

const FLUXPART: ReusedCodeEntry = {
  name: "fluxpart (USDA ARS U.S. Salinity Laboratory)",
  URL: "https://github.com/usda-ars-ussl/fluxpart",
};

const FMDTOOLS: ReusedCodeEntry = {
  name: "fmdtools (NASA)",
  URL: "https://github.com/nasa/fmdtools",
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

const FPRIME: ReusedCodeEntry = {
  name: "fprime (NASA)",
  URL: "https://github.com/nasa/fprime",
};

const FPRIME_GDS: ReusedCodeEntry = {
  name: "fprime-gds (NASA)",
  URL: "https://github.com/nasa/fprime-gds",
};

const FPRIME_TOOLS: ReusedCodeEntry = {
  name: "fprime-tools (NASA)",
  URL: "https://github.com/nasa/fprime-tools",
};

const FSA_STYLE: ReusedCodeEntry = {
  name: "fsa-style (USDA Farm Production and Conservation)",
  URL: "https://github.com/usda-fsa/fsa-style",
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

const GDPTOOLS: ReusedCodeEntry = {
  name: "gdptools (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/wma/nhgf/toolsteam/gdptools",
};

const GDPTOOLS_PYGEOAPI_PLUGIN: ReusedCodeEntry = {
  name: "gdptools-pygeoapi-plugin (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/wma/nhgf/toolsteam/gdptools-pygeoapi-plugin",
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

const GEOCAMUTILWEB: ReusedCodeEntry = {
  name: "geocamUtilWeb (NASA Ames GeoCam)",
  URL: "https://github.com/geocam/geocamUtilWeb",
};

const GEOCOLOR: ReusedCodeEntry = {
  name: "geocolor (Naval Research Laboratory GeoIPS)",
  URL: "https://github.com/NRLMMD-GEOIPS/geocolor",
};

const GEOIPS: ReusedCodeEntry = {
  name: "geoips (Naval Research Laboratory GeoIPS)",
  URL: "https://github.com/NRLMMD-GEOIPS/geoips",
};

const GEOIPS_CLAVRX: ReusedCodeEntry = {
  name: "geoips_clavrx (Naval Research Laboratory GeoIPS)",
  URL: "https://github.com/NRLMMD-GEOIPS/geoips_clavrx",
};

const GFF3TOOLKIT: ReusedCodeEntry = {
  name: "GFF3toolkit (USDA National Agricultural Library)",
  URL: "https://github.com/NAL-i5K/GFF3toolkit",
};

const GHAD: ReusedCodeEntry = {
  name: "ghad (18F (GSA))",
  URL: "https://github.com/18F/ghad",
};

const GIST_ANGULAR_POPOVERS: ReusedCodeEntry = {
  name: "gist-angular-popovers (Oak Ridge National Laboratory)",
  URL: "https://code.ornl.gov/idt/gist-angular-popovers",
};

const GITHUB_CHANGELOG: ReusedCodeEntry = {
  name: "github-changelog (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/github-changelog",
};

const GLOSSARY: ReusedCodeEntry = {
  name: "glossary (18F (GSA))",
  URL: "https://github.com/18F/glossary",
};

const GME: ReusedCodeEntry = {
  name: "GME (U.S. International Trade Commission)",
  URL: "https://github.com/USITC-Gravity-Group/GME",
};

const GOVDELIVERY: ReusedCodeEntry = {
  name: "govdelivery (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/govdelivery",
};

const GTAX: ReusedCodeEntry = {
  name: "gtax (NLM Division of Intramural Research (NIH))",
  URL: "https://github.com/NLM-DIR/gtax",
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

const HMDA_PLATFORM: ReusedCodeEntry = {
  name: "hmda-platform (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hmda-platform",
};

const HMDA_TOOLS: ReusedCodeEntry = {
  name: "hmda-tools (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/hmda-tools",
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

const HUBOT_CF_NOTIFICATIONS: ReusedCodeEntry = {
  name: "hubot-cf-notifications (cloud.gov (GSA))",
  URL: "https://github.com/cloud-gov/hubot-cf-notifications",
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

const IPV6_PYTHON: ReusedCodeEntry = {
  name: "ipv6_python (NASA)",
  URL: "https://github.com/nasa/ipv6_python",
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

const JSNUCOS: ReusedCodeEntry = {
  name: "jsNUCOS (NOAA Office of Response and Restoration)",
  URL: "https://github.com/NOAA-ORR-ERD/jsNUCOS",
};

const JUDI: ReusedCodeEntry = {
  name: "JUDI (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/JUDI",
};

const JUMBO_MORTGAGE: ReusedCodeEntry = {
  name: "jumbo-mortgage (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/jumbo-mortgage",
};

const JUSTICE40_TOOL: ReusedCodeEntry = {
  name: "justice40-tool (U.S. Digital Service)",
  URL: "https://github.com/usds/justice40-tool",
};

const KAMODO: ReusedCodeEntry = {
  name: "Kamodo (NASA)",
  URL: "https://github.com/nasa/Kamodo",
};

const LABBENCH: ReusedCodeEntry = {
  name: "labbench (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/labbench",
};

const LASERTRAM: ReusedCodeEntry = {
  name: "lasertram (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/vsc/petro/tools/lasertram",
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

const LFMF: ReusedCodeEntry = {
  name: "LFMF (National Telecommunications and Information Administration)",
  URL: "https://github.com/NTIA/LFMF-python",
};

const LIBHDF5_WASM: ReusedCodeEntry = {
  name: "libhdf5-wasm (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/libhdf5-wasm",
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

const MICROSECRETS: ReusedCodeEntry = {
  name: "microsecrets (U.S. Department of Homeland Security)",
  URL: "https://github.com/dhs-gov/microsecrets",
};

const MIKA: ReusedCodeEntry = {
  name: "mika (NASA)",
  URL: "https://github.com/nasa/mika",
};

const MISR_TOOLKIT: ReusedCodeEntry = {
  name: "Misr-Toolkit (NASA)",
  URL: "https://github.com/nasa/Misr-Toolkit",
};

const MLMCPY: ReusedCodeEntry = {
  name: "MLMCPy (NASA)",
  URL: "https://github.com/nasa/MLMCPy",
};

const MODFLOW_SETUP: ReusedCodeEntry = {
  name: "modflow-setup (U.S. Geological Survey)",
  URL: "https://github.com/DOI-USGS/modflow-setup",
};

const MODISCONVERTER: ReusedCodeEntry = {
  name: "modisconverter (NASA)",
  URL: "https://github.com/nasa/modisconverter",
};

const MODULE_UTILITIES: ReusedCodeEntry = {
  name: "module-utilities (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/module-utilities",
};

const MOSAIC: ReusedCodeEntry = {
  name: "mosaic (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/mosaic",
};

const MOUTH2EAR: ReusedCodeEntry = {
  name: "mouth2ear (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/mouth2ear",
};

const MRGEO: ReusedCodeEntry = {
  name: "mrgeo (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/mrgeo",
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

const NGX_USWDS: ReusedCodeEntry = {
  name: "ngx-uswds (U.S. General Services Administration)",
  URL: "https://github.com/GSA/ngx-uswds",
};

const NIMBUS: ReusedCodeEntry = {
  name: "nimbus (U.S. Department of Homeland Security)",
  URL: "https://github.com/dhs-gov/nimbus",
};

const NLDI_FLOWTOOLS: ReusedCodeEntry = {
  name: "nldi-flowtools (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/wma/nhgf/toolsteam/nldi-flowtools",
};

const NLDI_XSTOOL: ReusedCodeEntry = {
  name: "nldi-xstool (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/wma/nhgf/toolsteam/nldi-xstool",
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

const OCTOFLUDB: ReusedCodeEntry = {
  name: "octofludb (USDA National Animal Disease Center)",
  URL: "https://github.com/flu-crew/octofludb",
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

const P2108: ReusedCodeEntry = {
  name: "p2108 (National Telecommunications and Information Administration)",
  URL: "https://github.com/NTIA/p2108",
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

const PDS_API: ReusedCodeEntry = {
  name: "pds-api (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/pds-api",
};

const PDS_GITHUB_UTIL: ReusedCodeEntry = {
  name: "pds-github-util (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/pds-github-util",
};

const PEPPI: ReusedCodeEntry = {
  name: "peppi (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/peppi",
};

const PKG_18F_SCAFFOLDING: ReusedCodeEntry = {
  name: "18f-scaffolding (18F (GSA))",
  URL: "https://github.com/18F/18f-scaffolding",
};

const PKG_3DTILESRENDERERJS: ReusedCodeEntry = {
  name: "3DTilesRendererJS (NASA AMMOS)",
  URL: "https://github.com/NASA-AMMOS/3DTilesRendererJS",
};

const PLAG: ReusedCodeEntry = {
  name: "plag (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/vsc/petro/tools/plag",
};

const PM4NGS: ReusedCodeEntry = {
  name: "pm4ngs (NLM Division of Intramural Research (NIH))",
  URL: "https://github.com/NLM-DIR/pm4ngs",
};

const PMPS_UI: ReusedCodeEntry = {
  name: "pmps-ui (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/pmps/pmps-ui",
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

const PRESENT_VALUE: ReusedCodeEntry = {
  name: "present-value (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/present-value",
};

const PRICE_TRANSPARENCY_GUIDE_VALIDATOR: ReusedCodeEntry = {
  name: "price-transparency-guide-validator (Centers for Medicare & Medicaid Services)",
  URL: "https://github.com/CMSgov/price-transparency-guide-validator",
};

const PROG_ALGS: ReusedCodeEntry = {
  name: "prog_algs (NASA)",
  URL: "https://github.com/nasa/prog_algs",
};

const PROG_MODELS: ReusedCodeEntry = {
  name: "prog_models (NASA)",
  URL: "https://github.com/nasa/prog_models",
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

const PUBLIC_SANS: ReusedCodeEntry = {
  name: "public-sans (U.S. Web Design System)",
  URL: "https://github.com/uswds/public-sans",
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

const PYCAX: ReusedCodeEntry = {
  name: "pycax (NOAA Northwest Fisheries Science Center)",
  URL: "https://github.com/noaa-nwfsc/pycax",
};

const PYCCD: ReusedCodeEntry = {
  name: "pyccd (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/lcmap/pyccd",
};

const PYCDCS: ReusedCodeEntry = {
  name: "pycdcs (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pycdcs",
};

const PYHAPPYORNOT: ReusedCodeEntry = {
  name: "pyHappyOrNot (18F (GSA))",
  URL: "https://github.com/18F/pyHappyOrNot",
};

const PYHIDRA: ReusedCodeEntry = {
  name: "pyhidra (DoD Cyber Crime Center (DC3))",
  URL: "https://github.com/dod-cyber-crime-center/pyhidra",
};

const PYHYPERSCATTERING: ReusedCodeEntry = {
  name: "pyhyperscattering (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pyhyperscattering",
};

const PYMAXSPOTS: ReusedCodeEntry = {
  name: "pymaxspots (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/gmegsc/pymaxspots",
};

const PYMCR: ReusedCodeEntry = {
  name: "pyMCR (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/pyMCR",
};

const PYNIMS: ReusedCodeEntry = {
  name: "pynims (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/WiM/usgs-imagery/sdk/pynims",
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

const PYSATSI: ReusedCodeEntry = {
  name: "pySATSI (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/esc/pySATSI",
};

const PYSIPS: ReusedCodeEntry = {
  name: "pysips (NASA)",
  URL: "https://github.com/nasa/pysips",
};

const PYTHON_CMR: ReusedCodeEntry = {
  name: "python_cmr (NASA)",
  URL: "https://github.com/nasa/python_cmr",
};

const PYTORCH_CANEY: ReusedCodeEntry = {
  name: "pytorch-caney (NASA Center for Climate Simulation)",
  URL: "https://github.com/nasa-nccs-hpda/pytorch-caney",
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

const QUEST: ReusedCodeEntry = {
  name: "quest (U.S. Army Engineer Research and Development Center)",
  URL: "https://github.com/erdc/quest",
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

const REGISTRY_CLIENT: ReusedCodeEntry = {
  name: "registry-client (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/registry-client",
};

const REGISTRY_SWEEPERS: ReusedCodeEntry = {
  name: "registry-sweepers (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/registry-sweepers",
};

const SARPY: ReusedCodeEntry = {
  name: "sarpy (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/sarpy",
};

const SARPY_APPS: ReusedCodeEntry = {
  name: "sarpy_apps (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/sarpy_apps",
};

const SAS2DB: ReusedCodeEntry = {
  name: "sas2db (xD (U.S. Census Bureau))",
  URL: "https://github.com/XDgov/sas2db",
};

const SCIENCEBASEPY: ReusedCodeEntry = {
  name: "sciencebasepy (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/sas/sdm/sciencebasepy",
};

const SCPOPCORN: ReusedCodeEntry = {
  name: "scPopCorn (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/scPopCorn",
};

const SCRUB: ReusedCodeEntry = {
  name: "scrub (NASA)",
  URL: "https://github.com/nasa/scrub",
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

const SENSORTOOLKIT: ReusedCodeEntry = {
  name: "sensortoolkit (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/sensortoolkit",
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

const SIMPLER_GRANTS_GOV: ReusedCodeEntry = {
  name: "simpler-grants-gov (U.S. Department of Health and Human Services)",
  URL: "https://github.com/HHS/simpler-grants-gov",
};

const SIMPROCESD: ReusedCodeEntry = {
  name: "simprocesd (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/simprocesd",
};

const SINGULARJS: ReusedCodeEntry = {
  name: "singularjs (NCBI (NLM / NIH))",
  URL: "https://github.com/ncbi/singularjs",
};

const SKHASH: ReusedCodeEntry = {
  name: "SKHASH (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/esc/SKHASH",
};

const SMCPY: ReusedCodeEntry = {
  name: "SMCPy (NASA)",
  URL: "https://github.com/nasa/SMCPy",
};

const SMOT: ReusedCodeEntry = {
  name: "smot (USDA National Animal Disease Center)",
  URL: "https://github.com/flu-crew/smot",
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

const STANDARD_KNOWLEDGE: ReusedCodeEntry = {
  name: "standard_knowledge (U.S. Integrated Ocean Observing System (NOAA))",
  URL: "https://github.com/ioos/standard_knowledge",
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

const STORMWATER_MANAGEMENT_MODEL: ReusedCodeEntry = {
  name: "Stormwater-Management-Model (U.S. Environmental Protection Agency)",
  URL: "https://github.com/USEPA/Stormwater-Management-Model",
};

const STUDENT_DEBT_CALCULATOR: ReusedCodeEntry = {
  name: "student-debt-calculator (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/student-debt-calculator",
};

const STYLELINT_CONFIG_OPENSPHERE: ReusedCodeEntry = {
  name: "stylelint-config-opensphere (National Geospatial-Intelligence Agency)",
  URL: "https://github.com/ngageoint/stylelint-config-opensphere",
};

const SYMBOL_LIBRARY: ReusedCodeEntry = {
  name: "symbol-library (National Park Service)",
  URL: "https://github.com/nationalparkservice/symbol-library",
};

const TB3PY: ReusedCodeEntry = {
  name: "tb3py (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/tb3py",
};

const TENSORFLOW_CANEY: ReusedCodeEntry = {
  name: "tensorflow-caney (NASA Center for Climate Simulation)",
  URL: "https://github.com/nasa-nccs-hpda/tensorflow-caney",
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

const TRAVIS_WAIT_IMPROVED: ReusedCodeEntry = {
  name: "travis-wait-improved (Cybersecurity and Infrastructure Security Agency)",
  URL: "https://github.com/cisagov/travis-wait-improved",
};

const TRUSTYMAIL: ReusedCodeEntry = {
  name: "trustymail (Cybersecurity and Infrastructure Security Agency)",
  URL: "https://github.com/cisagov/trustymail",
};

const TURBOWAVE: ReusedCodeEntry = {
  name: "turboWAVE (U.S. Naval Research Laboratory)",
  URL: "https://github.com/USNavalResearchLaboratory/turboWAVE",
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

const VHR_COMPOSITE: ReusedCodeEntry = {
  name: "vhr-composite (NASA Center for Climate Simulation)",
  URL: "https://github.com/nasa-nccs-hpda/vhr-composite",
};

const VICA: ReusedCodeEntry = {
  name: "vica (USDA ARS Genomics and Bioinformatics Research Unit)",
  URL: "https://github.com/usda-ars-gbru/vica",
};

const VIPERSCI: ReusedCodeEntry = {
  name: "vipersci (NASA Ames NeoGeography Toolkit)",
  URL: "https://github.com/NeoGeographyToolkit/vipersci",
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

const WDFN_VIZ: ReusedCodeEntry = {
  name: "wdfn-viz (U.S. Geological Survey)",
  URL: "https://code.usgs.gov/wma/iow/wdfn-viz",
};

const WEB_ANALYTICS: ReusedCodeEntry = {
  name: "web-analytics (NASA Planetary Data System)",
  URL: "https://github.com/NASA-PDS/web-analytics",
};

const WEBWORLDWIND: ReusedCodeEntry = {
  name: "WebWorldWind (NASA WorldWind)",
  URL: "https://github.com/NASAWorldWind/WebWorldWind",
};

const WORLDVIEW_COMPONENTS: ReusedCodeEntry = {
  name: "worldview-components (NASA Global Imagery Browse Services)",
  URL: "https://github.com/nasa-gibs/worldview-components",
};

const XAPIWRAPPER: ReusedCodeEntry = {
  name: "xAPIWrapper (Advanced Distributed Learning Initiative (DoD))",
  URL: "https://github.com/adlnet/xAPIWrapper",
};

const XAPIWRAPPER_NODE: ReusedCodeEntry = {
  name: "xapiwrapper-node (Advanced Distributed Learning Initiative (DoD))",
  URL: "https://github.com/adlnet-archive/xapiwrapper-node",
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

const CORE_FILE_PREVIEW_APP: ReusedCodeEntry = {
  name: "core_file_preview_app (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/core_file_preview_app",
};

const CTREFPROP: ReusedCodeEntry = {
  name: "ctrefprop (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/REFPROP-wrappers",
};

const DATAMODELDICT: ReusedCodeEntry = {
  name: "datamodeldict (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/DataModelDict",
};

const DESIGN_SYSTEM_REACT: ReusedCodeEntry = {
  name: "design-system-react (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/design-system-react",
};

const FIPY: ReusedCodeEntry = {
  name: "fipy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/fipy",
};

const IPRPY: ReusedCodeEntry = {
  name: "iprpy (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/iprPy",
};

const NEMO: ReusedCodeEntry = {
  name: "nemo (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/NEMO",
};

const NRSS: ReusedCodeEntry = {
  name: "nrss (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/NRSS",
};

const OSCAL_DEEP_DIFF: ReusedCodeEntry = {
  name: "oscal-deep-diff (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/oscal-deep-diff",
};

const RENTAL_ASSISTANCE_FINDER: ReusedCodeEntry = {
  name: "rental-assistance-finder (Consumer Financial Protection Bureau)",
  URL: "https://github.com/cfpb/rental-assistance-finder",
};

const TEQP: ReusedCodeEntry = {
  name: "teqp (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/teqp",
};

const YABADABA: ReusedCodeEntry = {
  name: "yabadaba (National Institute of Standards and Technology)",
  URL: "https://github.com/usnistgov/yabadaba",
};

// npm packages, keyed by lowercased package name
export const GOV_DEPENDENCIES: Record<string, ReusedCodeEntry> = {
  "@enterprise-cmcs/macpro-security-hub-sync": MACPRO_SECURITY_HUB_SYNC,
  "@nasaworldwind/worldwind": WEBWORLDWIND,
  "@ngageoint/simple-features-wkb-js": SIMPLE_FEATURES_WKB_JS,
  "@ngageoint/simple-features-js": SIMPLE_FEATURES_JS,
  "@cmsgov/design-system": CMS_DESIGN_SYSTEM,
  "@cmsgov/ds-cms-gov": CMS_DS_CMS_GOV,
  "@cmsgov/ds-healthcare-gov": CMS_DS_HEALTHCARE_GOV,
  "@cmsgov/ds-medicare-gov": CMS_DS_MEDICARE_GOV,
  "@uswds/compile": USWDS_COMPILE,
  "@uswds/uswds": USWDS,
  "@cfpb/jumbo-mortgage": JUMBO_MORTGAGE,
  "@cfpb/student-debt-calculator": STUDENT_DEBT_CALCULATOR,
  "@cfpb/object-assign": ATOMICCOMPONENT,
  "@cfpb/function-bind": ATOMICCOMPONENT,
  "@cfpb/dom-closest": ATOMICCOMPONENT,
  "@cfpb/ccdb5-ui": CCDB5_UI,
  "@cfpb/cfpb-analytics": CFPB_ANALYTICS,
  "@cfpb/browserslist-config": CFPB_ANALYTICS,
  "@cfpb/britecharts": BRITECHARTS,
  "@cfpb/cfpb-design-system": CFPB_DESIGN_SYSTEM,
  "@cfpb/rental-assistance-finder": RENTAL_ASSISTANCE_FINDER,
  "@cfpb/design-system-react": DESIGN_SYSTEM_REACT,
  "@oscal/oscal-deep-diff": OSCAL_DEEP_DIFF,
  "18f-pages-server": PAGES_SERVER,
  "3d-tiles-renderer": PKG_3DTILESRENDERERJS,
  "about-yml-validator": ABOUT_YML_VALIDATOR,
  "adl-xapiwrapper": XAPIWRAPPER_NODE,
  "alignment-viewer": ALIGNMENTVIEWER,
  amortize: AMORTIZE,
  "analytics-reporter": ANALYTICS_REPORTER,
  "aria-accordion": ACCORDION,
  "atomic-component": ATOMICCOMPONENT,
  "bems-theme-react-starter": BEMS_THEME_REACT_STARTER,
  "capital-framework": CAPITAL_FRAMEWORK,
  "cbp-ds": CBP_THEME,
  "cbp-theme": CBP_THEME,
  "cbp-theme-react-starter": BEMS_THEME_REACT_STARTER,
  "cf-atomic-component": CAPITAL_FRAMEWORK,
  "cf-blue-green": CF_BLUE_GREEN,
  "cf-buttons": CAPITAL_FRAMEWORK,
  "cf-component-demo": CF_COMPONENT_DEMO,
  "cf-core": CAPITAL_FRAMEWORK,
  "cf-expandables": CAPITAL_FRAMEWORK,
  "cf-forms": CAPITAL_FRAMEWORK,
  "cf-grid": CAPITAL_FRAMEWORK,
  "cf-grunt-config": CF_GRUNT_CONFIG,
  "cf-icons": CAPITAL_FRAMEWORK,
  "cf-layout": CAPITAL_FRAMEWORK,
  "cf-notification": CAPITAL_FRAMEWORK,
  "cf-notifications": CAPITAL_FRAMEWORK,
  "cf-pagination": CAPITAL_FRAMEWORK,
  "cf-tables": CAPITAL_FRAMEWORK,
  "cf-theme-cfpb": CF_THEME_CFPB,
  "cf-typography": CAPITAL_FRAMEWORK,
  "cfasim-ui": CFA_SIMULATOR,
  "cfgov-sheer-templates": CFGOV_SHEER_TEMPLATES,
  "cfpb-chart-builder": CFPB_CHART_BUILDER,
  "cfpb-chart-builder-canary": CFPB_CHART_BUILDER,
  "cfpb-front-end": DEVELOPMENT,
  "cg-style": CG_STYLE,
  citysdk: CITYSDK,
  "cmapi-kotlin": CMAPI_KOTLIN,
  "cms-mrf-validator": PRICE_TRANSPARENCY_GUIDE_VALIDATOR,
  "code-clerk": CODE_CLERK,
  "code-gov-front-end": CODE_GOV_FRONT_END,
  "codejson-crosswalk": CODEJSON_CROSSWALK,
  "compass-rose-ui": COMPASS_ROSE_UI,
  "continua11y-acceptance": NODE_CONTINUA11Y_ACCEPTANCE,
  "continua11y-ci-reporter": NODE_CONTINUA11Y_CI_REPORTER,
  "continua11y-reports": NODE_CONTINUA11Y_REPORTS,
  "contracting-cookbook": CONTRACTING_COOKBOOK_CLIENT,
  "create-terra-ui-app": TERRA_UI_COMPONENTS,
  "ctrl-f": CTRL_F,
  "data-api": QU,
  "dom-class-list": ATOMICCOMPONENT,
  "earthquake-eventpages": EARTHQUAKE_EVENTPAGES,
  "earthquake-latest-earthquakes": EARTHQUAKE_LATEST_EARTHQUAKES,
  "earthquake-website": EARTHQUAKE_WEBSITE,
  "element-data-set": ATOMICCOMPONENT,
  endpointjs: ENDPOINT_JS,
  "eslint-config-opensphere": ESLINT_CONFIG_OPENSPHERE,
  "eslint-plugin-opensphere": ESLINT_PLUGIN_OPENSPHERE,
  exitscript: EXITSCRIPT,
  "fam-style": FAM_IM_EIS3_UIX,
  "fdns-js-sdk": FDNS_JS_SDK,
  "fdns-ui-react": FDNS_UI_REACT,
  "fdsh-client": NODE_FDSH_CLIENT,
  "fec-style": FEC_STYLE,
  "file-locked-operation": FILE_LOCKED_OPERATION,
  "format-usd": FORMAT_USD,
  "fsa-style": FSA_STYLE,
  "fuzzy-state-search": FUZZY_STATE_SEARCH,
  "gcn-kafka": GCN_KAFKA_JS,
  "generator-18f": PKG_18F_SCAFFOLDING,
  "generator-cf": GENERATOR_CF,
  "generator-cf-component": GENERATOR_CF_COMPONENT,
  "generator-node-cfpb": GENERATOR_NODE_CFPB,
  ghad: GHAD,
  "gist-angular-popovers": GIST_ANGULAR_POPOVERS,
  "glossary-panel": GLOSSARY,
  h5wasm: H5WASM,
  "hazdev-geoserve-ws": HAZDEV_GEOSERVE_WS,
  "hazdev-leaflet": HAZDEV_LEAFLET,
  "hazdev-location-view": HAZDEV_LOCATION_VIEW,
  "hazdev-tablist": HAZDEV_TABLIST,
  "hazdev-template": HAZDEV_TEMPLATE,
  "hdf5-wasm-tools": LIBHDF5_WASM,
  "hmac-authentication": HMAC_AUTHENTICATION_NPM,
  "hmda-explorer": HMDA_EXPLORER,
  "hmda-file-parser": HMDA_PLATFORM,
  "hmda-ui": HMDA_UI_MODULES,
  "hubot-acrogov": HUBOT_ACROGOV,
  "hubot-aws-cfpb": HUBOT_AWS_CFPB,
  "hubot-cf-notifications": HUBOT_CF_NOTIFICATIONS,
  "hubot-cfpb-indexer": HUBOT_CFPB_INDEXER,
  "hubot-new-relic-alerts": HUBOT_NEW_RELIC_ALERTS,
  "hubot-onboarding": HUBOT_ONBOARDING,
  "hubot-scripts-us-federal-holidays-reminder":
    HUBOT_SCRIPTS_US_FEDERAL_HOLIDAYS_REMINDER,
  icn3d: ICN3D,
  "identity-style-guide": IDENTITY_DESIGN_SYSTEM,
  "ipymesh-widgets": IPYMESH,
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
  "ngx-uswds": NGX_USWDS,
  npmaki: SYMBOL_LIBRARY,
  nucos: JSNUCOS,
  objectified: OBJECTIFIED,
  "onboarding-scheduler": ONBOARDING_SCHEDULER,
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
  "pa11y-reporter-ci": PA11Y_REPORTER_CI,
  patristic: PATRISTIC,
  "pmps-ui": PMPS_UI,
  "present-value": PRESENT_VALUE,
  "public-sans": PUBLIC_SANS,
  "qpp-file-upload-api-client": QPP_FILE_UPLOAD_API_CLIENT,
  "qpp-measures-data": QPP_MEASURES_DATA,
  "qpp-shared-healthcheck-node": QPP_SHARED_HEALTHCHECK_NODE,
  "qpp-shared-logger-node": QPP_SHARED_LOGGER_NODE,
  "qpp-submissions-schema": QPP_SUBMISSIONS_SCHEMA,
  read2me: READ2ME,
  "report-granules": CUMULUS,
  "report-pdrs": CUMULUS,
  "seed-images": SEED_IMAGES,
  sendak: SENDAK,
  "sendak-usage": SENDAK_USAGE,
  singularjs: SINGULARJS,
  standard_knowledge_js: STANDARD_KNOWLEDGE,
  "stay-positive": STAY_POSITIVE,
  "stigman-watcher": STIGMAN_WATCHER,
  "student-debt-calc": STUDENT_DEBT_CALCULATOR,
  "stylelint-config-opensphere": STYLELINT_CONFIG_OPENSPHERE,
  tidytree: TIDYTREE,
  time2read: TIME2READ,
  timecraftjs: TIMECRAFTJS,
  tn93: TN93_JS,
  "type-checkers": ATOMICCOMPONENT,
  "unformat-usd": UNFORMAT_USD,
  "us-forms-system": US_FORMS_SYSTEM,
  uswds: USWDS,
  vax: VAX,
  "vets-json-schema": VETS_JSON_SCHEMA,
  wcag: NODE_WCAG,
  "wcag-cli": NODE_WCAG_CLI,
  "wdfn-viz": WDFN_VIZ,
  "worldview-components": WORLDVIEW_COMPONENTS,
  xapiwrapper: XAPIWRAPPER,
};

// PyPI packages, keyed by normalized name: lowercased, with runs of - _ . collapsed
export const GOV_DEPENDENCIES_PYPI: Record<string, ReusedCodeEntry> = {
  abcmrt16: ABCMRT16,
  analphipy: ANALPHIPY,
  astrotime: ASTROTIME,
  atomman: ATOMMAN,
  atomvision: ATOMVISION,
  "bart-survival": BART_SURVIVAL,
  batchee: BATCHEE,
  "bento-sts": BENTO_STS,
  "bingo-nasa": BINGO,
  "blob-utils": BLOB_UTILS,
  "bmds-ui": BMDS_UI,
  "case-prov": CASE_IMPLEMENTATION_PROV_O,
  "case-utils": CASE_UTILITIES_PYTHON,
  cdcs: PYCDCS,
  cfasim: CFA_SIMULATOR,
  cfasodapy: CFASODAPY,
  "cfgov-setup": CFGOV_DJANGO_SETUP,
  chipsff: CHIPSFF,
  "ckanext-datagovcatalog": CKANEXT_DATAGOVCATALOG,
  "ckanext-datagovtheme": CKANEXT_DATAGOVTHEME,
  "ckanext-datajson": CKANEXT_DATAJSON,
  "ckanext-dcat-usmetadata": CKANEXT_DCAT_USMETADATA,
  "ckanext-geodatagov": CKANEXT_GEODATAGOV,
  "ckanext-googleanalyticsbasic": CKANEXT_GOOGLEANALYTICSBASIC,
  "ckanext-metrics-dashboard": CKANEXT_METRICS_DASHBOARD,
  "ckanext-usmetadata": CKANEXT_USMETADATA,
  cmomy: CMOMY,
  condor: CONDOR,
  "consul-announcer": CONSUL_ANNOUNCER,
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
  "core-file-preview-app": CORE_FILE_PREVIEW_APP,
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
  "cpa-data-services": CON_PCA_CICD,
  cpadataservices: CON_PCA_CICD,
  "cpc-geofiles": CPC_GEOFILES,
  "cpc-geogrids": CPC_GEOGRIDS,
  "cpc-geoplot": CPC_GEOPLOT,
  ctrefprop: CTREFPROP,
  "ctx-python": CTX_PYTHON,
  "cumulus-message-adapter": CUMULUS_MESSAGE_ADAPTER,
  datamodeldict: DATAMODELDICT,
  dataretrieval: DATARETRIEVAL_PYTHON,
  "detection-limits": DETECTION_LIMITS,
  "dioptra-platform": DIOPTRA,
  "django-cache-tools": DJANGO_CACHE_TOOLS,
  "django-flags": DJANGO_FLAGS,
  "django-mysql-ssl": DJANGO_MYSQL_SSL,
  "django-tabular-export": DJANGO_TABULAR_EXPORT,
  "django-uswds-forms": DJANGO_USWDS_FORMS,
  "dmarc-import": DMARC_IMPORT,
  "docker-compose-control-center": DOCKER_CONTROL_CENTER,
  dodcerts: DODCERTS,
  "domain-scan": DOMAIN_SCAN,
  "dorado-sensitivity": DORADO_SENSITIVITY,
  "earthdata-hashdiff": EARTHDATA_HASHDIFF,
  "earthdata-varinfo": EARTHDATA_VARINFO,
  "egi-pynetstation": EGI_PYNETSTATION,
  eispac: EISPAC,
  "elastic-blast": ELASTIC_BLAST,
  emanifest: E_MANIFEST,
  "eo-validation": EO_VALIDATION,
  epaswmm: STORMWATER_MANAGEMENT_MODEL,
  "erdc-quest": QUEST,
  "esi-utils-time": ESI_UTILS_TIME,
  etspy: ETSPY,
  exoscene: EXOSCENE,
  fastatools: FASTATOOLS,
  fcpgtools: FCPGTOOLS,
  fdtool: FDTOOL,
  fipy: FIPY,
  flutile: FLUTILE,
  "fluvial-particle": FLUVPARTICLE,
  fluxpart: FLUXPART,
  fmdtools: FMDTOOLS,
  fprime: FPRIME,
  "fprime-fpp": FPP,
  "fprime-gds": FPRIME_GDS,
  "fprime-tools": FPRIME_TOOLS,
  fv3grid: FV3GRID,
  gdptools: GDPTOOLS,
  "gdptools-pygeoapi-plugin": GDPTOOLS_PYGEOAPI_PLUGIN,
  geneflow: GENEFLOW2,
  genesignet: GENESIGNET,
  "geo-prepper": GEO_PREPPER,
  geocamutil: GEOCAMUTILWEB,
  geocolor: GEOCOLOR,
  geoips: GEOIPS,
  "geoips-clavrx": GEOIPS_CLAVRX,
  gff3tool: GFF3TOOLKIT,
  "github-changelog": GITHUB_CHANGELOG,
  gme: GME,
  govdelivery: GOVDELIVERY,
  "grants-shared": SIMPLER_GRANTS_GOV,
  gtax: GTAX,
  "harmony-py": HARMONY_PY,
  "harmony-service-lib": HARMONY_SERVICE_LIB_PY,
  hitips: HITIPS,
  "hmac-authentication": HMAC_AUTHENTICATION_PY,
  "hmda-tools": HMDA_TOOLS,
  hobo: HOBO_PY,
  "hybig-py": HARMONY_BROWSE_IMAGE_GENERATOR,
  hybridq: HYBRIDQ,
  hydroid: HYDROID,
  "hydrotools-gcp-client": HYDROTOOLS,
  icn3dpy: ICN3D,
  imppy3d: IMPPY3D,
  intermat: INTERMAT,
  "io-model-builder": IO_MODEL_BUILDER,
  iprpy: IPRPY,
  ipv6: IPV6_PYTHON,
  jobrunner: JOBRUNNER,
  judi: JUDI,
  "justice40-data-pipeline": JUSTICE40_TOOL,
  "kamodo-ccmc": KAMODO,
  labbench: LABBENCH,
  lasertram: LASERTRAM,
  "lasso-issues": LASSO_ISSUES,
  "lasso-releasers": LASSO_RELEASERS,
  "lasso-reports": LASSO_REPORTS,
  "lasso-requirements": LASSO_REQUIREMENTS,
  "lcmap-pyccd": PYCCD,
  materialite: MATERIALITE,
  "mcp-data-check": MCP_DATA_CHECK,
  mcvqoe: MCVQOE,
  "mcvqoe-accesstime": ACCESSTIME,
  "mcvqoe-base": MCVQOE_BASE,
  "mcvqoe-intelligibility": INTELLIGIBILITY,
  "mcvqoe-mouth2ear": MOUTH2EAR,
  "mcvqoe-psud": PSUD,
  "mcvqoe-tvo": MCV_QOE_TVO,
  microsecrets: MICROSECRETS,
  misrtoolkit: MISR_TOOLKIT,
  mlmcpy: MLMCPY,
  "modflow-setup": MODFLOW_SETUP,
  modisconverter: MODISCONVERTER,
  "module-utilities": MODULE_UTILITIES,
  "mosaic-nist": MOSAIC,
  mxmcpy: MXMCPY,
  "naif-pds4-bundler": NAIF_PDS4_BUNDLER,
  "nasa-mika": MIKA,
  "nasa-scrub": SCRUB,
  "nda-tools": NDA_TOOLS,
  nemo: NEMO,
  "nestor-qt": NESTOR_QT,
  nfflr: NFFLR,
  nimbus: NIMBUS,
  "nldi-flowtools": NLDI_FLOWTOOLS,
  "nldi-xstool": NLDI_XSTOOL,
  noaabathymetry: NOAABATHYMETRY,
  nrss: NRSS,
  octofludb: OCTOFLUDB,
  "open-notebook": OPEN_NOTEBOOK,
  "pds-api": PDS_API,
  "pds-data-upload-manager": DATA_UPLOAD_MANAGER,
  "pds-deeparchive": DEEP_ARCHIVE,
  "pds-doi-core": DOI_SERVICE,
  "pds-doi-service": DOI_SERVICE,
  "pds-epitome": EPITOME,
  "pds-github-util": PDS_GITHUB_UTIL,
  "pds-ldd-manager": LDD_MANAGER,
  "pds-peppi": PEPPI,
  "pds-registry": REGISTRY,
  "pds-registry-client": REGISTRY_CLIENT,
  "pds-registry-sweepers": REGISTRY_SWEEPERS,
  "pds-updart": PEPPI,
  "pds-web-analytics": WEB_ANALYTICS,
  plagioclase: PLAG,
  pm4ngs: PM4NGS,
  podaacpy: PODAACPY_2,
  porerefiner: POREREFINER,
  potentials: POTENTIALS,
  "prog-algs": PROG_ALGS,
  "prog-models": PROG_MODELS,
  "prog-server": PROG_SERVER,
  progpy: PROGPY,
  "proplib-lfmf": LFMF,
  "proplib-p2108": P2108,
  pshtt: PSHTT,
  pyaqsapi: PYAQSAPI,
  "pybeepop-plus": PYBEEPOP,
  pybmds: BMDS,
  "pycap-dss": PYCAP_DSS,
  "pycast-usgs": SHAKECAST,
  "pycax-client": PYCAX,
  pyhappyornot: PYHAPPYORNOT,
  pyhidra: PYHIDRA,
  pyhyperscattering: PYHYPERSCATTERING,
  pymaxspots: PYMAXSPOTS,
  pymcr: PYMCR,
  pymdwizard: FORT_PYMDWIZARD,
  pymrgeo: MRGEO,
  pynims: PYNIMS,
  pynssp: PYNSSP,
  pynucos: PYNUCOS,
  pyprism: PYPRISM,
  pyprms: PYPRMS,
  pyproject2conda: PYPROJECT2CONDA,
  pysatsi: PYSATSI,
  pysips: PYSIPS,
  "python-cmr": PYTHON_CMR,
  "pytorch-caney": PYTORCH_CANEY,
  qarrayrun: QARRAYRUN,
  radbelt: RADBELT,
  "rdbms-subsetter": RDBMS_SUBSETTER,
  refchooser: REFCHOOSER,
  regdown: REGDOWN,
  "registry-sweepers": REGISTRY_SWEEPERS,
  sarpy: SARPY,
  "sarpy-apps": SARPY_APPS,
  sas2db: SAS2DB,
  sciencebasepy: SCIENCEBASEPY,
  scpopcorn: SCPOPCORN,
  sdnist: SDNIST,
  sensoff: SENSOFF,
  sensortoolkit: SENSORTOOLKIT,
  "seq-json-schema": SEQ_JSON_SCHEMA,
  serotools: SEROTOOLS,
  sfrmaker: SFRMAKER,
  "shakecast-aebm": SHAKECAST_AEBM,
  "signals-utils": SIGNALS_UTILS,
  simprocesd: SIMPROCESD,
  skhash: SKHASH,
  "slack-emoji-search": EMOJI_SEARCH,
  smcpy: SMCPY,
  smot: SMOT,
  "snp-mutator": SNP_MUTATOR,
  "snp-pipeline": SNP_PIPELINE,
  "sql-insert-writer": SQL_INSERT_WRITER,
  "sqlite-dissect": SQLITE_DISSECT,
  srompy: SROMPY,
  ssmdevices: SSMDEVICES,
  stitchee: STITCHEE,
  tb3py: TB3PY,
  "tensorflow-caney": TENSORFLOW_CANEY,
  teqp: TEQP,
  "termseq-peaks": TERMSEQ_PEAKS,
  thermoextrap: THERMOEXTRAP,
  "tk-builder": TK_BUILDER,
  "tmmc-lnpy": TMMC_LNPY,
  tn93: TN93,
  "travis-wait-improved": TRAVIS_WAIT_IMPROVED,
  trustymail: TRUSTYMAIL,
  twutils: TURBOWAVE,
  "usgs-shakecast": SHAKECAST,
  "uv-workon": UV_WORKON,
  vcftoolz: VCFTOOLZ,
  "vhr-cloudmask": VHR_CLOUDMASK,
  "vhr-composite": VHR_COMPOSITE,
  vica: VICA,
  vipersci: VIPERSCI,
  "wagtail-content-audit": WAGTAIL_CONTENT_AUDIT,
  "wagtail-copyablemodeladmin": WAGTAIL_COPYABLEMODELADMIN,
  "wagtail-flags": WAGTAIL_FLAGS,
  "wagtail-inventory": WAGTAIL_INVENTORY,
  "wagtail-sharing": WAGTAIL_SHARING,
  "wagtail-treemodeladmin": WAGTAIL_TREEMODELADMIN,
  "xml-utils": XML_UTILS,
  yabadaba: YABADABA,
  "zarr-eosdis-store": ZARR_EOSDIS_STORE,
  zyra: ZYRA,
};
