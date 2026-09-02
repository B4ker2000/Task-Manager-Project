export interface LocalePack {
    GLOBAL: {
        BACK_BTN_TEXT: string;
        BACK_BTN_ARIA: string;

        // Email & Password Fields
        FIELD_EMAIL: string;
        PLACEHOLDER_EMAIL: string;
        FIELD_PASSWORD: string;
        PLACEHOLDER_PASSWORD: string;

        // Footer Navigation Aria
        FOOTER_NAV_ARIA: string;

        // Eye Toggle Accessibility Script Targets
        SHOW_PASS_ARIA: string;
        HIDE_PASS_ARIA: string;
        SHOW_CONFIRM_ARIA: string;
        HIDE_CONFIRM_ARIA: string;

        // Language Selection Configuration
        LANGUAGE_SELECTION_TITLE_TEXT: string;
        LANGUAGE_SELECTION_TITLE_ARIA: string;
        LANGUAGE_SELECTION_ARIA: string;
        LANGUAGE_OPTION_EN_US: string;
        LANGUAGE_OPTION_JP: string;
        LANGUAGE_OPTION_RU: string;
    };
    
    PROFILE: {
        // Navigation / Headers
        ARIA_MAIN: string;
        IDENTITY_TITLE_TEXT: string;
        IDENTITY_TITLE_ARIA: string;

        // States
        SYNCING_CREDENTIALS_TEXT: string;
        SYNCING_CREDENTIALS_ARIA: string;

        // =========================================================================
        // SECTION 1: CORE ACCOUNT DETAILS
        // =========================================================================
        CORE_ACCOUNT_ARIA: string;
        SECURITY_LEVEL_LABEL_TEXT: string;
        SECURITY_LEVEL_LABEL_ARIA: string;
        REGISTERED_EMAIL_LABEL: string;
        DATABASE_RECORD_LABEL_TEXT: string;
        DATABASE_RECORD_LABEL_ARIA: string;

        // =========================================================================
        // SECTION 2: SYSTEM ACTION METRICS
        // =========================================================================
        SYSTEM_METRICS_TITLE_TEXT: string;
        SYSTEM_METRICS_TITLE_ARIA: string;
        ASSIGNED_ITEMS_LABEL: string;
        ASSIGNED_ITEMS_ARIA: string;
        COMPLETED_TASKS_LABEL: string;
        COMPLETED_TASKS_ARIA: string;

        // =========================================================================
        // SECTION 3: WORKSPACE PREFERENCES CARD
        // =========================================================================
        WORKSPACE_TITLE_TEXT: string;
        WORKSPACE_TITLE_ARIA: string;
        THEME_LABEL: string;
        THEME_ARIA: string;
    
        // Theme Selector Options
        THEME_OPTION_LIGHT: string;
        THEME_OPTION_DARK: string;
        THEME_OPTION_AMBER: string;
        THEME_OPTION_MATRIX: string;
        THEME_OPTION_HC_BLACK: string;
        THEME_OPTION_HC_WHITE: string;
        THEME_OPTION_HC_BEIGE: string;
        THEME_OPTION_WIN98: string;
        THEME_OPTION_WINXP: string;
        THEME_OPTION_VISTA: string;
        THEME_OPTION_WIN7: string;
        THEME_OPTION_AERO: string;
        THEME_OPTION_BA: string;

        // Typography Interface Config
        FONT_LABEL: string;
        FONT_ARIA: string;
        FONT_DESCRIPTION: string;
        FONT_OPTION_DEFAULT: string;
        FONT_OPTION_LEGI: string;
        FONT_OPTION_DYS: string;

        // Deficiency Matrix Elements
        COLORBLIND_LABEL: string;
        COLORBLIND_ARIA: string;
        COLORBLIND_OPTION_NONE: string;
        COLORBLIND_OPTION_DEU: string;
        COLORBLIND_OPTION_PRO: string;
        COLORBLIND_OPTION_TRI: string;
        COLORBLIND_OPTION_GRA: string;

        // =========================================================================
        // SECTION 4: ACCOUNT MANAGEMENT FORM
        // =========================================================================
        ACCOUNT_SETTINGS_TITLE_TEXT: string;
        ACCOUNT_SETTINGS_TITLE_ARIA: string;
        UPDATE_USER_LABEL: string;
        UPDATE_USER_ARIA: string;
        UPDATE_USER_PLACEHOLDER: string;
        CHANGE_PASS_LABEL: string;
        CHANGE_PASS_ARIA: string;
        CHANGE_PASS_PLACEHOLDER: string;
        CONFIRM_PASS_LABEL: string;
        CONFIRM_PASS_ARIA: string;
        CONFIRM_PASS_PLACEHOLDER: string;
        PASS_REQUIREMENTS_ARIA: string;
        SAVE_CHANGES_BTN_TEXT: string;
        SAVE_CHANGES_BTN_ARIA: string;

        // Destructive Actions Area (Danger Zone)
        DANGER_ZONE_TITLE_TEXT: string;
        DANGER_ZONE_TITLE_ARIA: string;
        DANGER_ZONE_WARN_TEXT: string;
        DANGER_ZONE_WARN_ARIA: string;
        DANGER_ZONE_BTN_TEXT: string;
        DANGER_ZONE_BTN_ARIA: string;
    };

    LOGIN: {
        PORTAL_ARIA: string;
        HEADER_WELCOME_BACK_TEXT: string;
        HEADER_WELCOME_BACK_ARIA: string;
        HEADER_FIRST_TIME: string;
        SUBTITLE_MANAGE_TEXT: string;
        SUBTITLE_MANAGE_ARIA: string;
        CHECKBOX_REMEMBER_TEXT: string;
        CHECKBOX_REMEMBER_ARIA: string;
        BTN_SIGNIN_TEXT: string;
        BTN_SIGNIN_ARIA: string;
        FOOTER_TEXT: string;
        FOOTER_ARIA: string;
        FOOTER_LINK_TEXT: string;
        FOOTER_LINK_ARIA: string;
    };

    REGISTER: {
        PORTAL_ARIA: string;
        HEADER_TITLE_TEXT: string;
        HEADER_TITLE_ARIA: string;
        SUBTITLE_JOIN_TEXT: string;
        SUBTITLE_JOIN_ARIA: string;
        LABEL_USERNAME_TEXT: string;
        LABEL_USERNAME_ARIA: string;
        PLACEHOLDER_USERNAME: string;
        PLACEHOLDER_PASSWORD: string;
        LABEL_CONFIRM_PASSWORD_TEXT: string;
        LABEL_CONFIRM_PASSWORD_ARIA: string;
        PLACEHOLDER_CONFIRM_PASSWORD: string;
        REQUIREMENTS_ARIA: string;
        BTN_SUBMIT_TEXT: string;
        BTN_SUBMIT_ARIA: string;
        FOOTER_TEXT: string;
        FOOTER_ARIA: string;
        FOOTER_LINK_TEXT: string;
        FOOTER_LINK_ARIA: string;
    };

    DASHBOARD: {
        MAIN_CANVAS_LABEL: string;
        MAIN_HEADER: string;
        NAV_ARIA: string;
        PROFILE_BTN: string;
        LOGOUT_ARIA: string;
        LOGOUT_BTN: string;
        CREATE_PROJECT_HEADER_TEXT: string;
        CREATE_PROJECT_HEADER_ARIA: string;
        PROJECT_TITLE_LABEL_TEXT: string;
        PROJECT_TITLE_LABEL_ARIA: string;
        PROJECT_TITLE_PLACEHOLDER: string;
        DESCRIPTION_LABEL_TEXT: string;
        DESCRIPTION_LABEL_ARIA: string;
        DESCRIPTION_PLACEHOLDER: string;
        CREATE_BTN_TEXT: string;
        CREATE_BTN_ARIA: string;
        YOUR_PROJECTS_HEADER: string;
        EMPTY_MESSAGE_TEXT: string;
        EMPTY_MESSAGE_ARIA: string;
        PROJECT_CARD_ARIA: string;
        DELETE_PROJECT_ARIA: string;
        NO_DESCRIPTION_FALLBACK: string;
        OPEN_BOARD_TEXT: string;
        OPEN_BOARD_ARIA: string;
    };

    TASKBOARD: {
        // Header / Navigation & Modal Buttons
        MAIN_CANVAS_ARIA: string;
        HEADER_TITLE: string;
        HEADER_ABANDON_TEXT: string;
        HEADER_ABANDON_ARIA: string;
        HEADER_CREATE_TAG_TEXT: string;
        HEADER_CREATE_TAG_ARIA: string;
        HEADER_CREATE_TASK_TEXT: string;
        HEADER_CREATE_TASK_ARIA: string;

        // Task Crew & Invitation
        CREW_PANEL_HEADER_TEXT: string;
        CREW_PANEL_HEADER_ARIA: string;
        INVITE_FORM_ARIA: string;
        INVITE_PLACEHOLDER: string;
        INVITE_INPUT_ARIA: string;
        INVITE_ROLE_ARIA: string;
        INVITE_OPTION_MEMBER: string;
        INVITE_OPTION_OWNER: string;
        INVITE_SUBMIT_ARIA: string;
        INVITE_SUBMIT_BTN: string;
        ROSTER_HEADER_TEXT: string;
        ROSTER_HEADER_ARIA: string;
        ROSTER_BADGE_ARIA: string;
        ROSTER_REMOVE_ARIA: string;

        // Tags/Categories
        TAGS_HEADER_TEXT: string;
        TAGS_HEADER_ARIA: string;
        TAGS_FALLBACK_TEXT: string;
        TAGS_FALLBACK_ARIA: string;
        TAGS_PILL_ARIA: string;
        TAG_DELETE_ARIA: string;

        // Filters & Progress Bar
        SEARCH_FILTER_HUB_ARIA: string;
        SEARCH_PLACEHOLDER: string;
        SEARCH_ARIA: string;
        PRIORITY_ARIA: string;
        PRIORITY_ALL: string;
        PRIORITY_HIGH: string;
        PRIORITY_MEDIUM: string;
        PRIORITY_LOW: string;
        CATEGORY_ARIA: string;
        CATEGORY_ALL: string;
        CATEGORY_UNASSIGNED: string;
        PROGRESS_LABEL_TEXT: string;
        PROGRESS_LABEL_ARIA: string;
        PROGRESS_ARIA: string;

        // Mobile Column Selector
        MOBILE_TABS_ARIA: string;
        MOBILE_TAB_PENDING_TEXT: string;
        MOBILE_TAB_PENDING_ARIA: string;
        MOBILE_TAB_PROGRESS_TEXT: string;
        MOBILE_TAB_PROGRESS_ARIA: string;
        MOBILE_TAB_COMPLETED_TEXT: string;
        MOBILE_TAB_COMPLETED_ARIA: string;

        // =========================================================================
        // Pending Column
        // =========================================================================
        COLUMN_PENDING_TITLE: string;
        LANE_PENDING_ARIA: string;
        TASK_CARD_ARIA: string;
        TASK_CATEGORY_ARIA: string;
        TASK_DELETE_ARIA: string;
        TASK_DESCRIPTION_FALLBACK: string;
            
        // Task Asignee
        TASK_ASSIGNEE_LABEL: string;
        TASK_ASSIGNEE_ARIA: string;
        TASK_ASSIGNEE_UNASSIGNED: string;
            
        // Task Tag/Category
        TASK_CATEGORY_LABEL: string;
        TASK_CATEGORY_ARIA_ASSIGN: string;
        TASK_CATEGORY_NONE: string;

        // Task Priority
        TASK_PRIORITY_ARIA: string;
        TASK_PRIORITY_HIGH_TEXT: string;
        TASK_PRIORITY_HIGH_ARIA: string;
        TASK_PRIORITY_MEDIUM_TEXT: string;
        TASK_PRIORITY_MEDIUM_ARIA: string;
        TASK_PRIORITY_LOW_TEXT: string;
        TASK_PRIORITY_LOW_ARIA: string;
        TASK_DEADLINE_ARIA: string;

        // Start Button
        TASK_ACTION_START_TEXT: string;
        TASK_ACTION_START_ARIA: string;
        
        // =========================================================================
        // In-preogress/Review Column
        // =========================================================================
        COLUMN_INPROGRESS_TITLE: string;
        LANE_INPROGRESS_ARIA: string;
        TASK_CARD_STATUS_ARIA: string;
        REVIEW_BANNER_TEXT: string;
        REVIEW_BANNER_ARIA: string;

        // Related Buttons
        BTN_BACK_TEXT: string;
        BTN_BACK_ARIA: string;
        BTN_SUBMIT_REVIEW_TEXT: string;
        BTN_SUBMIT_REVIEW_ARIA: string;
        BTN_CANCEL_REVIEW_TEXT: string;
        BTN_CANCEL_REVIEW_ARIA: string;
        BTN_REJECT_TEXT: string;
        BTN_REJECT_ARIA: string;
        BTN_APPROVE_TEXT: string;
        BTN_APPROVE_ARIA: string;

        // =========================================================================
        // Completed Column
        // =========================================================================
        COLUMN_COMPLETED_TITLE: string;
        LANE_COMPLETED_ARIA: string;
        TASK_CARD_COMPLETED_ARIA: string;
        BADGE_DONE_TEXT: string;
        BADGE_DONE_ARIA: string;
        FINISHED_ASSIGNEE_ARIA: string;
        FINISHED_CATEGORY_ARIA: string;
        FINISHED_PRIORITY_ARIA: string;

        // Related Button
        REOPEN_TEXT: string;
        REOPEN_ARIA: string;

        // Create a new Task Modal
        MODAL_TASK_HEADER_TEXT: string;
        MODAL_TASK_HEADER_ARIA: string;
        MODAL_TASK_TITLE_LABEL_TEXT: string;
        MODAL_TASK_TITLE_LABEL_ARIA: string;
        MODAL_TASK_TITLE_PLACEHOLDER: string;
        MODAL_TASK_DESC_LABEL_TEXT: string;
        MODAL_TASK_DESC_LABEL_ARIA: string;
        MODAL_TASK_DESC_PLACEHOLDER: string;
        MODAL_TASK_PRIORITY_LABEL_TEXT: string;
        MODAL_TASK_PRIORITY_LABEL_ARIA: string;
        MODAL_TASK_DEADLINE_LABEL: string;
        MODAL_TASK_DEADLINE_KEYBOARD_ARIA: string;
        MODAL_TASK_DEADLINE_INPUT_ARIA: string;
        MODAL_TASK_CANCEL_BTN: string;
        MODAL_TASK_CANCEL_ARIA: string;
        MODAL_TASK_SUBMIT_BTN: string;
        MODAL_TASK_SUBMIT_ARIA: string;
        
        // Create a new Tag/Category Modal
        MODAL_TAG_HEADER_TEXT: string;
        MODAL_TAG_HEADER_ARIA: string;
        MODAL_TAG_NAME_LABEL_TEXT: string;
        MODAL_TAG_NAME_LABEL_ARIA: string;
        MODAL_TAG_NAME_PLACEHOLDER: string;
        MODAL_TAG_COLOR_LABEL: string;
        MODAL_TAG_COLOR_ARIA: string;

        MODAL_TAG_COLOR_RED: string;
        MODAL_TAG_COLOR_BLUE: string;
        MODAL_TAG_COLOR_GREEN: string;
        MODAL_TAG_COLOR_ORANGE: string;
        MODAL_TAG_COLOR_PURPLE: string;

        MODAL_TAG_CANCEL_BTN: string;
        MODAL_TAG_CANCEL_ARIA: string;
        MODAL_TAG_SUBMIT_BTN: string;
        MODAL_TAG_SUBMIT_ARIA: string;
    };
}