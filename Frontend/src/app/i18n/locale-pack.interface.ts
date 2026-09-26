export interface LocalePack {
    GLOBAL: {
        GENERIC_LOADING: string;
        BACK_BTN_TEXT: string;
        BACK_BTN_ARIA: string;

        // Dynamic Date Formatting Pattern Based on selected language!
        DATE_FORMAT: string;

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
        LANGUAGE_SELECTION_TITLE: string;
        LANGUAGE_SELECTION_ARIA: string;
        LANGUAGE_OPTION_EN_US: string;
        LANGUAGE_OPTION_EN_UK: string;
        LANGUAGE_OPTION_JP: string;
        LANGUAGE_OPTION_RU: string;
        LANGUAGE_OPTION_FA: string;

        // User Roles
        ROLE_OWNER: string;
        ROLE_MEMBER: string;
        ROLE_VIEWER: string;

        // Language direction format
        DIRECTION: 'ltr' | 'rtl'; // Can only be one of these two!
    };

    POPUP: {
        // Success Actions
        SUCCESS_PROFILE_REMOVED_TITLE: string;
        SUCCESS_PROFILE_REMOVED_BODY: string;
        SUCCESS_USER_INFO_UPDATED_TITLE: string;
        SUCCESS_USER_INFO_UPDATED_BODY: string;
        SUCCESS_INVITATION_ACCEPTED_TITLE: string;
        SUCCESS_INVITATION_ACCEPTED_BODY: string;
        SUCCESS_INVITATION_DECLINED_TITLE: string;
        SUCCESS_INVITATION_DECLINED_BODY: string;
        SUCCESS_INVITATION_SENT_TITLE: string;
        SUCCESS_INVITATION_SENT_BODY: string;

        // Warning Actions
        WARNING_EMPTY_FIELDS_TITLE: string;
        WARNING_EMPTY_FIELDS_BODY: string;
        WARNING_IDENTICAL_USERNAME_TITLE: string;
        WARNING_IDENTICAL_USERNAME_BODY: string;
        WARNING_NEW_PASSWORD_MISMATCH_TITLE: string;
        WARNING_NEW_PASSWORD_MISMATCH_BODY: string;
        WARNING_DELETE_PROFILE_TITLE: string;
        WARNING_DELETE_PROFILE_BODY: string;
        WARNING_NEW_PASSWORD_TITLE: string;
        WARNING_NEW_PASSWORD_BODY: string;
        WARNING_DELETE_PROJECT_TITLE: string;
        WARNING_DELETE_PROJECT_BODY: string;
        WARNING_DELETE_TASK_TITLE: string;
        WARNING_DELETE_TASK_BODY: string;
        WARNING_DELETE_CATEGORY_TITLE: string;
        WARNING_DELETE_CATEGORY_BODY_PART_1: string;
        WARNING_DELETE_CATEGORY_BODY_PART_2: string;
        WARNING_REMOVE_MEMBER_TITLE: string;
        WARNING_REMOVE_MEMBER_BODY_PART_1: string;
        WARNING_REMOVE_MEMBER_BODY_PART_2: string;
        WARNING_LEAVE_PROJECT_TITLE: string;
        WARNING_LEAVE_PROJECT_BODY: string;
        WARNING_INVITATION_DECLINE_TITLE: string;
        WARNING_INVITATION_DECLINE_BODY: string;
        WARNING_INVALID_EMAIL_INPUT_TITLE: string;
        WARNING_INVALID_EMAIL_INPUT_BODY: string;
        WARNING_ALREADY_MEMBER_TITLE: string;
        WARNING_ALREADY_MEMBER_BODY_PART_1: string;
        WARNING_ALREADY_MEMBER_BODY_PART_2: string;
        WARNING_INVITATION_PENDING_TITLE: string;
        WARNING_INVITATION_PENDING_BODY: string;

        // Danger Actions
        DANGER_FINAL_WARNING_TITLE: string;
        DANGER_FINAL_WARNING_BODY: string;
        DANGER_ACCESS_DENIED_TITLE: string;
        DANGER_TASK_DELETE_ACCESS_DENIED_BODY: string;
        ERROR_GENERIC_TITLE: string;
        ERROR_TASK_DELETE_BODY: string;
        ERROR_SOLE_OWNER_BODY: string;
        ERROR_INVITE_FAILED_BODY: string;
        ERROR_INVITATION_ACCEPT_FAILED_BODY: string;
        ERROR_INVITATION_DECLINE_FAILED_BODY: string;
        DANGER_UNAUTHORIZED_TASK_ACCESS: string;
        DANGER_UNAUTHORIZED_TASK_APPROVE: string;

        // Button Layouts
        BTN_PROCEED: string;
        BTN_CANCEL: string;
        BTN_CLOSE: string;
    };
    
    PROFILE: {
        // Navigation / Headers
        ARIA_MAIN: string;
        IDENTITY_TITLE: string;

        // States
        SYNCING_CREDENTIALS: string;

        // =========================================================================
        // SECTION 1: CORE ACCOUNT DETAILS
        // =========================================================================
        CORE_ACCOUNT_ARIA: string;
        SECURITY_LEVEL_LABEL: string;
        REGISTERED_EMAIL_LABEL: string;
        DATABASE_RECORD_LABEL: string;

        // =========================================================================
        // SECTION 2: SYSTEM ACTION METRICS
        // =========================================================================
        SYSTEM_METRICS_TITLE: string;
        ASSIGNED_ITEMS_LABEL: string;
        ASSIGNED_ITEMS_ARIA: string;
        COMPLETED_TASKS_LABEL: string;
        COMPLETED_TASKS_ARIA: string;

        // =========================================================================
        // SECTION 3: WORKSPACE PREFERENCES CARD
        // =========================================================================
        WORKSPACE_TITLE: string;
        THEME_LABEL: string;
        THEME_ARIA: string;
    
        // Theme Selector Options
        THEME_OPTION_LIGHT_TEXT: string;
        THEME_OPTION_LIGHT_ARIA: string;
        THEME_OPTION_DARK_TEXT: string;
        THEME_OPTION_DARK_ARIA: string;
        THEME_OPTION_AMBER_TEXT: string;
        THEME_OPTION_AMBER_ARIA: string;
        THEME_OPTION_MATRIX_TEXT: string;
        THEME_OPTION_MATRIX_ARIA: string;
        THEME_OPTION_HC_BLACK_TEXT: string;
        THEME_OPTION_HC_BLACK_ARIA: string;
        THEME_OPTION_HC_WHITE_TEXT: string;
        THEME_OPTION_HC_WHITE_ARIA: string;
        THEME_OPTION_HC_BEIGE_TEXT: string;
        THEME_OPTION_HC_BEIGE_ARIA: string;
        THEME_OPTION_WIN98_TEXT: string;
        THEME_OPTION_WIN98_ARIA: string;
        THEME_OPTION_WINXP_TEXT: string;
        THEME_OPTION_WINXP_ARIA: string;
        THEME_OPTION_VISTA_TEXT: string;
        THEME_OPTION_VISTA_ARIA: string;
        THEME_OPTION_WIN7_TEXT: string;
        THEME_OPTION_WIN7_ARIA: string;
        THEME_OPTION_AERO_TEXT: string;
        THEME_OPTION_AERO_ARIA: string;
        THEME_OPTION_BA_TEXT: string;
        THEME_OPTION_BA_ARIA: string;
        THEME_OPTION_HL_TEXT: string;
        THEME_OPTION_HL_ARIA: string;

        // Typography Interface Config
        FONT_LABEL: string;
        FONT_ARIA: string;
        FONT_DESCRIPTION: string;
        FONT_OPTION_DEFAULT: string;
        FONT_OPTION_LEGI_TEXT: string;
        FONT_OPTION_LEGI_ARIA: string;
        FONT_OPTION_DYS_TEXT: string;
        FONT_OPTION_DYS_ARIA: string;

        // Deficiency Matrix Elements
        COLORBLIND_LABEL: string;
        COLORBLIND_ARIA: string;
        COLORBLIND_OPTION_NONE: string;
        COLORBLIND_OPTION_PRO: string;
        COLORBLIND_OPTION_DEU: string;
        COLORBLIND_OPTION_TRI: string;
        COLORBLIND_OPTION_GRA: string;

        // =========================================================================
        // SECTION 4: ACCOUNT MANAGEMENT FORM
        // =========================================================================
        ACCOUNT_SETTINGS_TITLE: string;
        UPDATE_USER_LABEL: string;
        UPDATE_USER_PLACEHOLDER: string;
        CHANGE_PASS_LABEL: string;
        CHANGE_PASS_PLACEHOLDER: string;
        CONFIRM_PASS_LABEL: string;
        CONFIRM_PASS_PLACEHOLDER: string;
        PASS_REQUIREMENTS_ARIA: string;
        SAVE_CHANGES_BTN_TEXT: string;
        SAVE_CHANGES_BTN_ARIA: string;

        // Destructive Actions Area (Danger Zone)
        DANGER_ZONE_TITLE: string;
        DANGER_ZONE_WARN_TEXT: string;
        DANGER_ZONE_WARN_ARIA: string;
        DANGER_ZONE_BTN_TEXT: string;
        DANGER_ZONE_BTN_ARIA: string;
    };

    LOGIN: {
        PORTAL_ARIA: string;
        HEADER_WELCOME_BACK: string;
        HEADER_FIRST_TIME: string;
        SUBTITLE_MANAGE: string;
        CHECKBOX_REMEMBER: string;
        BTN_SIGNIN_TEXT: string;
        BTN_SIGNIN_ARIA: string;
        FOOTER_TEXT: string;
        FOOTER_LINK_TEXT: string;
        FOOTER_LINK_ARIA: string;
        ERROR_FALLBACK: string;
    };

    REGISTER: {
        PORTAL_ARIA: string;
        HEADER_TITLE: string;
        SUBTITLE_JOIN: string;
        LABEL_USERNAME: string;
        PLACEHOLDER_USERNAME: string;
        PLACEHOLDER_PASSWORD: string;
        LABEL_CONFIRM_PASSWORD: string;
        PLACEHOLDER_CONFIRM_PASSWORD: string;
        REQUIREMENTS_ARIA: string;
        BTN_SUBMIT_TEXT: string;
        BTN_SUBMIT_ARIA: string;
        FOOTER_TEXT: string;
        FOOTER_LINK_TEXT: string;
        FOOTER_LINK_ARIA: string;
    };

    DASHBOARD: {
        MAIN_CANVAS_LABEL: string;
        MAIN_HEADER: string;
        NAV_ARIA: string;
        PROFILE_BTN: string;
        LOGOUT_BTN: string;
        LOGOUT_ARIA: string;
        INVITATION_HEADER: string;
        INVITATION_ARIA: string;
        INVITATION_DETAILS_ARIA: string;
        INVITATION_DESCRIPTION_TEXT: string;
        INVITATION_DESCRIPTION_ARIA: string;
        INVITATION_EXPIRY_TEXT: string;
        INVITATION_EXPIRY_ARIA: string;
        INVITATION_ACCEPT_BTN: string;
        INVITATION_DECLINE_BTN: string;
        CREATE_PROJECT_HEADER: string;
        PROJECT_TITLE_LABEL: string;
        PROJECT_TITLE_PLACEHOLDER: string;
        DESCRIPTION_LABEL: string;
        DESCRIPTION_PLACEHOLDER: string;
        CREATE_BTN_TEXT: string;
        CREATE_BTN_ARIA: string;
        YOUR_PROJECTS_HEADER: string;
        EMPTY_MESSAGE: string;
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
        REORDER_MENU_ARIA: string;
        REORDER_MOVE_TOP: string;
        REORDER_MOVE_UP: string;
        REORDER_MOVE_DOWN: string;
        REORDER_MOVE_BOTTOM: string;

        // Task Crew & Invitation
        CREW_PANEL_HEADER: string;
        INVITE_FORM_ARIA: string;
        INVITE_PLACEHOLDER: string;
        INVITE_INPUT_ARIA: string;
        INVITE_ROLE_ARIA: string;
        INVITE_OPTION_OWNER: string;
        INVITE_OPTION_MEMBER: string;
        INVITE_OPTION_VIEWER: string;
        INVITE_SUBMIT_ARIA: string;
        INVITE_SUBMIT_BTN: string;
        ROSTER_HEADER: string;
        ROSTER_BADGE_ARIA: string;
        ROSTER_REMOVE_ARIA: string;

        // Tags/Categories
        TAGS_HEADER: string;
        TAGS_FALLBACK: string;
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
        USER_ARIA: string;
        USER_ALL: string;
        USER_UNASSIGNED: string;
        PROGRESS_LABEL: string;
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
        TASK_CARD_CATEGORY_ARIA: string;
        TASK_DELETE_ARIA: string;
        TASK_DESCRIPTION_FALLBACK: string;
            
        // Task Assignee
        TASK_ASSIGNEE_LABEL: string;
        TASK_ASSIGNEE_ARIA: string;
        TASK_ASSIGNEE_UNASSIGNED: string;
            
        // Task Tag/Category
        TASK_CATEGORY_LABEL: string;
        TASK_CATEGORY_ARIA_ASSIGN: string;
        TASK_CATEGORY_NONE: string;

        // Task Priority
        TASK_PRIORITY_ARIA: string;
        TASK_PRIORITY_HIGH: string;
        TASK_PRIORITY_MEDIUM: string;
        TASK_PRIORITY_LOW: string;
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
        MODAL_TASK_TITLE_LABEL: string;
        MODAL_TASK_TITLE_PLACEHOLDER: string;
        MODAL_TASK_DESC_LABEL: string;
        MODAL_TASK_DESC_PLACEHOLDER: string;
        MODAL_TASK_PRIORITY_LABEL: string;
        MODAL_TASK_DEADLINE_LABEL: string;
        MODAL_TASK_DEADLINE_KEYBOARD_ARIA: string;
        MODAL_TASK_DEADLINE_INPUT_ARIA: string;
        MODAL_TASK_CANCEL_BTN: string;
        MODAL_TASK_CANCEL_ARIA: string;
        MODAL_TASK_SUBMIT_BTN: string;
        MODAL_TASK_SUBMIT_ARIA: string;
        
        // Create a new Tag/Category Modal
        MODAL_TAG_HEADER: string;
        MODAL_TAG_NAME_LABEL: string;
        MODAL_TAG_NAME_PLACEHOLDER: string;
        MODAL_TAG_COLOR_LABEL: string;
        MODAL_TAG_COLOR_ARIA: string;

        // Color Selection Text Items 
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