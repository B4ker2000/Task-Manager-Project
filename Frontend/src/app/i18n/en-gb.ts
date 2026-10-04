import { LocalePack } from './locale-pack.interface';

export const EnglishUKPack: LocalePack = {
    GLOBAL: {
        GENERIC_LOADING: "Now Loading...",
        BACK_BTN_TEXT: "Back to Dashboard",
        BACK_BTN_ARIA: "Back to main project dashboard",

        // Dynamic Date Formatting Pattern
        DATE_FORMAT: "d MMM yyyy",

        // Email & Password Fields
        FIELD_EMAIL: "Email Address",
        PLACEHOLDER_EMAIL: "Enter your email here...",
        FIELD_PASSWORD: "Password",
        PLACEHOLDER_PASSWORD: "Enter password...",

        // Footer Navigation Links
        FOOTER_NAV_ARIA: "Authentication page navigation link",

        // Eye Toggle Accessibility Script Targets
        SHOW_PASS_ARIA: "Show password",
        HIDE_PASS_ARIA: "Hide password",
        SHOW_CONFIRM_ARIA: "Show confirmation password",
        HIDE_CONFIRM_ARIA: "Hide confirmation password",

        // Language Selection Configuration
        LANGUAGE_SELECTION_TITLE: "Application Language:",
        LANGUAGE_SELECTION_ARIA: "Select application language",
        LANGUAGE_OPTION_EN_US: "American English",
        LANGUAGE_OPTION_EN_UK: "British English",
        LANGUAGE_OPTION_JP: "日本語 (Japanese)",
        LANGUAGE_OPTION_RU: "Русский (Russian)",
        LANGUAGE_OPTION_FA: "فارسی (Persian)",

        // User Roles
        ROLE_OWNER: "Owner",
        ROLE_MEMBER: "Member",
        ROLE_VIEWER: "Viewer",

        // Language direction format
        DIRECTION: "ltr"
    },

    POPUP: {
        // Success Actions
        SUCCESS_PROFILE_REMOVED_TITLE: "Profile Removed",
        SUCCESS_PROFILE_REMOVED_BODY: "Your identity profile was successfully removed.",
        SUCCESS_USER_INFO_UPDATED_TITLE: "Profile Updated",
        SUCCESS_USER_INFO_UPDATED_BODY: "Account information updated.",
        SUCCESS_INVITATION_ACCEPTED_TITLE: "Invitation accepted",
        SUCCESS_INVITATION_ACCEPTED_BODY: "You have joined the project successfully.",
        SUCCESS_INVITATION_DECLINED_TITLE: "Invitation declined",
        SUCCESS_INVITATION_DECLINED_BODY: "The project invitation was declined successfully.",
        SUCCESS_INVITATION_SENT_TITLE: "Invitation sent",
        SUCCESS_INVITATION_SENT_BODY: "Invitation sent successfully.",
        SUCCESS_REGISTER_TITLE: "Registration Successful!",
        SUCCESS_REGISTER_BODY: "Account created successfully! Redirecting you to login...",

        // Warning Actions
        WARNING_EMPTY_FIELDS_TITLE: "Empty Fields",
        WARNING_EMPTY_FIELDS_BODY: "Please fill out at least one field to save profile updates!", 
        WARNING_IDENTICAL_USERNAME_TITLE: "Identical Username", 
        WARNING_IDENTICAL_USERNAME_BODY: "Your new username must be different from your current one!", 
        WARNING_NEW_PASSWORD_MISMATCH_TITLE: "Security Mismatch",
        WARNING_NEW_PASSWORD_MISMATCH_BODY: "Your updated passwords do not match.", 
        WARNING_DELETE_PROFILE_TITLE: "CRITICAL ACCESSIBILITY ALERT!",
        WARNING_DELETE_PROFILE_BODY: "Are you sure you want to permanently delete your workspace profile?",
        WARNING_NEW_PASSWORD_TITLE: "Confirm Password", 
        WARNING_NEW_PASSWORD_BODY: "Please confirm your new security password.", 
        WARNING_DELETE_PROJECT_TITLE: "Delete Project",
        WARNING_DELETE_PROJECT_BODY: "Are you sure you want to delete this project and all its associated tasks?",
        WARNING_DELETE_TASK_TITLE: "Delete Task",
        WARNING_DELETE_TASK_BODY: "Are you sure you want to delete this task completely?",
        WARNING_DELETE_CATEGORY_TITLE: "Delete Tag",
        WARNING_DELETE_CATEGORY_BODY_PART_1: "Are you sure you want to permanently delete the ",
        WARNING_DELETE_CATEGORY_BODY_PART_2: " tag? Any tasks using this categorisation tag will have it removed.",
        WARNING_REMOVE_MEMBER_TITLE: "Remove Team Member",
        WARNING_REMOVE_MEMBER_BODY_PART_1: "Are you sure you want to remove ",
        WARNING_REMOVE_MEMBER_BODY_PART_2: " from this project workspace room?",
        WARNING_LEAVE_PROJECT_TITLE: "Leave Project Workspace",
        WARNING_LEAVE_PROJECT_BODY: "Are you absolutely sure you want to resign and leave this project workspace? You will lose all access to this board layout!",
        WARNING_INVITATION_DECLINE_TITLE: "Decline invitation",
        WARNING_INVITATION_DECLINE_BODY: "Are you sure you want to decline the invitation?",
        WARNING_INVALID_EMAIL_INPUT_TITLE: "Invalid email address.",
        WARNING_INVALID_EMAIL_INPUT_BODY: "Please enter a valid email address first.",
        WARNING_ALREADY_MEMBER_TITLE: "Already a Member",
        WARNING_ALREADY_MEMBER_BODY_PART_1: "User <strong>{email}</strong> ",
        WARNING_ALREADY_MEMBER_BODY_PART_2: "is already part of the team under the <strong>{role}</strong> role.",
        WARNING_INVITATION_PENDING_TITLE: "Invitation Pending",
        WARNING_INVITATION_PENDING_BODY: "An invitation for <strong>{email}</strong> has already been sent and is currently pending approval.",

        // Danger Actions
        DANGER_FINAL_WARNING_TITLE: "FINAL WARNING",
        DANGER_FINAL_WARNING_BODY: "This completely wipes out all your records from the system database. This action cannot be reversed. Proceed?",
        DANGER_ACCESS_DENIED_TITLE: "Access Denied!",
        DANGER_TASK_DELETE_ACCESS_DENIED_BODY: "Only the project Owner holds permission to delete workspace items.",
        ERROR_GENERIC_TITLE: "Error Encountered",
        ERROR_TASK_DELETE_BODY: "Failed to complete task deletion. Please try again.",
        ERROR_SOLE_OWNER_BODY: "Failed to process project resignation request.",
        ERROR_INVITE_FAILED_BODY: "The invitation could not be sent. Please check the email address and try again.",
        ERROR_INVITATION_ACCEPT_FAILED_BODY: "The invitation could not be accepted.",
        ERROR_INVITATION_DECLINE_FAILED_BODY: "The invitation could not be declined.",
        DANGER_UNAUTHORIZED_TASK_ACCESS: "You are not authorized to modify a task card assigned to another teammate!",
        DANGER_UNAUTHORIZED_TASK_APPROVE: "Only a Project Manager can approve tasks and move them to the 'Completed' column!",
        DANGER_REGISTRATION_FAILURE_BODY: "Registration failed. Please try again later.",
        DANGER_USER_INFO_UPDATE_FAILED_TITLE: "Update Failed!",
        DANGER_USER_INFO_UPDATE_FAILED_BODY: "Failed to update user information. Please try again later.",
        DANGER_PROFILE_DESTRUCTION_FAILED: "Account destruction failed: ",
        DANGER_PROJECT_CREATION_FAILED_BODY: "Failed to create a project: ",
        ERROR_EMAIL_ALREADY_EXISTS_BODY: "An account with this email already exists! Try another email or try logging in.",

        // Button Layouts
        BTN_PROCEED: "Proceed",
        BTN_CANCEL: "Cancel",
        BTN_CLOSE: "Close"
    },

    PROFILE: {
        // Navigation / Headers
        ARIA_MAIN: "User Profile Settings page",
        IDENTITY_TITLE: "Your Workspace Identity Profile",

        // States
        SYNCING_CREDENTIALS: "Syncing secure cloud identity credentials...",

        // =========================================================================
        // SECTION 1: CORE ACCOUNT DETAILS
        // =========================================================================
        CORE_ACCOUNT_ARIA: "Core Account details section",
        SECURITY_LEVEL_LABEL: "Security Level:",
        REGISTERED_EMAIL_LABEL: "Registered Email:",
        DATABASE_RECORD_LABEL: "Database Record ID:",

        // =========================================================================
        // SECTION 2: SYSTEM ACTION METRICS
        // =========================================================================
        SYSTEM_METRICS_TITLE: "System Action Metrics",
        ASSIGNED_ITEMS_LABEL: "Assigned Work Items",
        ASSIGNED_ITEMS_ARIA: "Currently tracking {value} active operational tasks.",
        COMPLETED_TASKS_LABEL: "Completed Tasks",
        COMPLETED_TASKS_ARIA: "Successfully completed and archived {value} finished tasks.",
        
        // =========================================================================
        // SECTION 3: WORKSPACE PREFERENCES CARD
        // =========================================================================
        WORKSPACE_TITLE: "Workspace Environment Preferences",
        THEME_LABEL: "Visual Application Theme:",
        THEME_ARIA: "Select visual application theme layout",

        // Theme Selector Options
        THEME_OPTION_LIGHT_TEXT: "☀️ Professional Light Mode",
        THEME_OPTION_LIGHT_ARIA: "Professional light mode",
        THEME_OPTION_DARK_TEXT: "🌙 Dark Workspace Canvas",
        THEME_OPTION_DARK_ARIA: "Dark workspace canvas",
        THEME_OPTION_AMBER_TEXT: "💽 Vintage Amber CRT Terminal",
        THEME_OPTION_AMBER_ARIA: "Vintage amber CRT terminal",
        THEME_OPTION_MATRIX_TEXT: "📟 Vintage Green Matrix CRT Terminal",
        THEME_OPTION_MATRIX_ARIA: "Vintage green matrix CRT terminal",
        THEME_OPTION_HC_BLACK_TEXT: "🌓 High Contrast (Black)",
        THEME_OPTION_HC_BLACK_ARIA: "High contrast (Black)",
        THEME_OPTION_HC_WHITE_TEXT: "⬜️ High Contrast (White)",
        THEME_OPTION_HC_WHITE_ARIA: "High contrast (White)",
        THEME_OPTION_HC_BEIGE_TEXT: "🏜️ High Contrast (Beige Desert)",
        THEME_OPTION_HC_BEIGE_ARIA: "High contrast (Beige desert)",
        THEME_OPTION_WIN98_TEXT: "💾 Retro Windows 95/98",
        THEME_OPTION_WIN98_ARIA: "Retro windows 95/98",
        THEME_OPTION_WINXP_TEXT: "💿 Nostalgic Windows XP (Luna Blue)",
        THEME_OPTION_WINXP_ARIA: "Nostalgic windows XP (Luna blue)",
        THEME_OPTION_VISTA_TEXT: "📀 Classic Windows Vista",
        THEME_OPTION_VISTA_ARIA: "Classic windows vista",
        THEME_OPTION_WIN7_TEXT: "🫧 Classic Windows 7",
        THEME_OPTION_WIN7_ARIA: "Classic windows 7",
        THEME_OPTION_AERO_TEXT: "🍃 Frutiger Aero (Vibrant Eco-Cyber)",
        THEME_OPTION_AERO_ARIA: "Frutiger aero (Vibrant eco-cyber)",
        THEME_OPTION_BA_TEXT: "🔮 SCHALE workspace (Blue Archive)",
        THEME_OPTION_BA_ARIA: "SCHALE workspace (Blue archive)",
        THEME_OPTION_HL_TEXT: "☢️ Half-Life User Interface",
        THEME_OPTION_HL_ARIA: "Half-life user interface",

        // Typography Interface Config
        FONT_LABEL: "Font Style:",
        FONT_ARIA: "Select typography interface font",
        FONT_DESCRIPTION: "Changes the default display typeface for the application workspace",
        FONT_OPTION_DEFAULT: "Theme Default",
        FONT_OPTION_LEGI_TEXT: "🧼 High-Legibility",
        FONT_OPTION_LEGI_ARIA: "High-Legibility",
        FONT_OPTION_DYS_TEXT: "📖 Easy-to-Read (Dyslexia Friendly)",
        FONT_OPTION_DYS_ARIA: "Easy-to-Read (Dyslexia friendly)",

        // Deficiency Matrix Elements
        COLORBLIND_LABEL: "Colourblind Filter:",
        COLORBLIND_ARIA: "Select colourblind filter correction simulation matrix",
        COLORBLIND_OPTION_NONE: "None",
        COLORBLIND_OPTION_PRO: "Protanopia (Red Weakness)",
        COLORBLIND_OPTION_DEU: "Deuteranopia (Green Weakness)",
        COLORBLIND_OPTION_TRI: "Tritanopia (Blue Weakness)",
        COLORBLIND_OPTION_GRA: "Greyscale (Monochrome)",
        
        // =========================================================================
        // SECTION 4: ACCOUNT MANAGEMENT FORM
        // =========================================================================
        ACCOUNT_SETTINGS_TITLE: "Account Management Settings",
        UPDATE_USER_LABEL: "Update Username",
        UPDATE_USER_PLACEHOLDER: "Enter new username...",
        CHANGE_PASS_LABEL: "Change Password",
        CHANGE_PASS_PLACEHOLDER: "Enter new password...",
        CONFIRM_PASS_LABEL: "Confirm New Password",
        CONFIRM_PASS_PLACEHOLDER: "Retype your new password...",
        PASS_REQUIREMENTS_ARIA: "Passwords must match before modifications can commit securely",
        SAVE_CHANGES_BTN_TEXT: "Save Profile Changes",
        SAVE_CHANGES_BTN_ARIA: "Save profile changes",

        // Destructive Actions Area (Danger Zone)
        DANGER_ZONE_TITLE: "Danger Zone",
        DANGER_ZONE_WARN_TEXT: "Deleting your account clears your workspace access profiles completely!<br>This action cannot be reversed.",
        DANGER_ZONE_WARN_ARIA: "Deleting your account clears your workspace access profiles completely! This action cannot be reversed.",
        DANGER_ZONE_BTN_TEXT: "Permanently Delete Account",
        DANGER_ZONE_BTN_ARIA: "Permanently delete account"
    },
    
    LOGIN: {
        PORTAL_ARIA: "Account authentication portal",
        HEADER_WELCOME_BACK: "Welcome Back",
        HEADER_FIRST_TIME: "Welcome to Task Manager",
        SUBTITLE_MANAGE: "Log in to manage your projects and tasks",
        CHECKBOX_REMEMBER: "Remember me",
        BTN_SIGNIN_ARIA: "Sign in to your account dashboard",
        BTN_SIGNIN_TEXT: "Sign in",
        FOOTER_TEXT: "New to the workspace? ",
        FOOTER_LINK_TEXT: "Create a New Account",
        FOOTER_LINK_ARIA: "Navigate to account creation profile",
        ERROR_FALLBACK: "Invalid email or password. Please try again."
    },

    REGISTER: {
        PORTAL_ARIA: "Account creation portal",
        HEADER_TITLE: "Create Workspace Account",
        SUBTITLE_JOIN: "Join the project management platform!",
        LABEL_USERNAME: "Username",
        PLACEHOLDER_USERNAME: "Pick a unique display name...",
        PLACEHOLDER_PASSWORD: "Create a secure password...",
        LABEL_CONFIRM_PASSWORD: "Confirm Password",
        PLACEHOLDER_CONFIRM_PASSWORD: "Retype your password...",
        REQUIREMENTS_ARIA: "Both password fields must match exactly before registration requests can submit",
        BTN_SUBMIT_TEXT: "Sign Up",
        BTN_SUBMIT_ARIA: "Submit credentials to register your new account",
        FOOTER_TEXT: "Already have an account? ",
        FOOTER_LINK_TEXT: "Back to Sign In",
        FOOTER_LINK_ARIA: "Navigate back to login screen"
    },

    DASHBOARD: {
        MAIN_CANVAS_LABEL: "Main projects dashboard canvas",
        MAIN_HEADER: "Task Manager Workspace",
        NAV_ARIA: "Account navigation shortcuts",
        PROFILE_BTN: "User Profile",
        LOGOUT_ARIA: "Sign out of your session securely",
        LOGOUT_BTN: "Sign Out",
        INVITATION_HEADER: "Project Invitations",
        INVITATION_ARIA: "Project invitation list, containing {value} pending invitation(s)",
        INVITATION_DETAILS_ARIA: "Project invitation details for {title}",
        INVITATION_DESCRIPTION_TEXT: "You have been invited to join this project as ",
        INVITATION_DESCRIPTION_ARIA: "You have been invited to join this project under the role {role}",
        INVITATION_EXPIRY_TEXT: "Invitation expires on: ",
        INVITATION_EXPIRY_ARIA: "This invitation will expire at {value}",
        INVITATION_ACCEPT_BTN: "Accept",
        INVITATION_DECLINE_BTN: "Decline",
        CREATE_PROJECT_HEADER: "Create New Project",
        PROJECT_TITLE_LABEL: "Project Title",
        PROJECT_TITLE_PLACEHOLDER: "e.g. Website Redesign",
        DESCRIPTION_LABEL: "Description",
        DESCRIPTION_PLACEHOLDER: "Describe the project goal...",
        CREATE_BTN_TEXT: "Create Project",
        CREATE_BTN_ARIA: "Submit form to create a new project workspace",
        YOUR_PROJECTS_HEADER: "Your Projects",
        EMPTY_MESSAGE: "No projects found. Create one to get started!",

        // Dynamic localization functions to ensure perfect sentence structures across all languages
        PROJECT_CARD_ARIA: "Project workspace: {value}",
        DELETE_PROJECT_ARIA: "Permanently delete project workspace: {value}",
        NO_DESCRIPTION_FALLBACK: "No description provided.",
        COMPLETION_DATA_HEADER_TEXT: "Completed / total:",
        COMPLETION_DATA_HEADER_ARIA: "Number of tasks completed compared to total number of tasks with the same priority level Project {value} has",
        BADGE_ALL_TASKS_DONE_TEXT: "All project tasks complete!",
        TASK_COMPARISON_ARIA: " of {value} tasks completed with priority ",
        PROJECT_HAS_NO_TASKS: "This project has no tasks yet, create or wait for some to be created!",
        OPEN_BOARD_TEXT: "Open Project Board",
        OPEN_BOARD_ARIA: "Open task board overview for project: {value}"
    },

    TASKBOARD: {
        // Header / Navigation & Modal Buttons
        MAIN_CANVAS_ARIA: "Project task board overview for: {title}",
        HEADER_TITLE: "Project Board ({title})",
        HEADER_ABANDON_TEXT: "Leave Project",
        HEADER_ABANDON_ARIA: "Leave this project workspace completely",
        HEADER_CREATE_TAG_TEXT: "Create Workspace Tag",
        HEADER_CREATE_TAG_ARIA: "Create a new workspace category tag",
        HEADER_CREATE_TASK_TEXT: "Add New Task",
        HEADER_CREATE_TASK_ARIA: "Add a new task item",
        REORDER_MENU_ARIA: "Reorder task card {title} up and down in the same column",
        REORDER_MOVE_TOP: "Move to Top",
        REORDER_MOVE_UP: "Move Up",
        REORDER_MOVE_DOWN: "Move Down",
        REORDER_MOVE_BOTTOM: "Move to Bottom",

        // Task Crew & Invitation
        CREW_PANEL_HEADER: "Project Team and Tags Management",
        INVITE_FORM_ARIA: "Invite new team member",
        INVITE_PLACEHOLDER: "Enter teammate's registered email address...",
        INVITE_INPUT_ARIA: "Teammate email address",
        INVITE_ROLE_ARIA: "Assigned project member role level",
        INVITE_OPTION_OWNER: "Co-Owner / Admin",
        INVITE_OPTION_MEMBER: "Regular Member",
        INVITE_OPTION_VIEWER: "Read-Only Viewer",
        INVITE_SUBMIT_ARIA: "Submit invitation request",
        INVITE_SUBMIT_BTN: "Add Member",
        ROSTER_HEADER: "Current Project Crew",
        ROSTER_BADGE_ARIA: "Assigned Role: {role}",
        ROSTER_REMOVE_ARIA: "Remove user {email} from project crew",

        // Tags/Categories
        TAGS_HEADER: "Available Project Tags",
        TAGS_FALLBACK: "No custom tags created for this project yet",
        TAGS_PILL_ARIA: "Tag: {value1} with {value2} assigned items",
        TAG_DELETE_ARIA: "Permanently delete project tag: {name}",

        // Filters & Progress Bar
        SEARCH_FILTER_HUB_ARIA: "Task board item filtering controls",
        SEARCH_PLACEHOLDER: "Search tasks by title...",
        SEARCH_ARIA: "Filter tasks by text title keyword",
        PRIORITY_ARIA: "Filter tasks by assigned priority level",
        PRIORITY_ALL: "All Priorities",
        PRIORITY_HIGH: "High Priority",
        PRIORITY_MEDIUM: "Medium Priority",
        PRIORITY_LOW: "Low Priority",
        CATEGORY_ARIA: "Filter tasks by active project category tag assignment",
        CATEGORY_ALL: "All Tags",
        CATEGORY_UNASSIGNED: "Unassigned Tasks",
        USER_ARIA: "Filter tasks by assignee name",
        USER_ALL: "All Tasks",
        USER_UNASSIGNED: "Unassigned Tasks",
        PROGRESS_LABEL: "Project Completion Progress:",
        PROGRESS_ARIA: "Overall project completion progress tracker. Currently at {value} per cent.",

        // Mobile Column Selector
        MOBILE_TABS_ARIA: "Mobile task board column selector",
        MOBILE_TAB_PENDING_TEXT: "Pending",
        MOBILE_TAB_PENDING_ARIA: "View Pending tasks column",
        MOBILE_TAB_PROGRESS_TEXT: "Progress & Review",
        MOBILE_TAB_PROGRESS_ARIA: "View Tasks In Progress and Review column",
        MOBILE_TAB_COMPLETED_TEXT: "Completed",
        MOBILE_TAB_COMPLETED_ARIA: "View Completed tasks column",

        // =========================================================================
        // Pending Column
        // =========================================================================
        COLUMN_PENDING_TITLE: "Pending ({value})",
        LANE_PENDING_ARIA: "Pending task tracking list column. Contains {value} items.",
        TASK_CARD_ARIA: "Task item card: {value}",
        TASK_CARD_CATEGORY_ARIA: "Assigned Category Tag: {value}",
        TASK_DELETE_ARIA: "Delete task card: {value}",
        TASK_DESCRIPTION_FALLBACK: "No details provided.",
        
        // Task Assignee
        TASK_ASSIGNEE_LABEL: "Assignee:",
        TASK_ASSIGNEE_ARIA: "Assign team member to task {value}",
        TASK_ASSIGNEE_UNASSIGNED: "Unassigned",
        
        // Task Tag/Category
        TASK_CATEGORY_LABEL: "Category:",
        TASK_CATEGORY_ARIA_ASSIGN: "Assign classification tag to task {value}",
        TASK_CATEGORY_NONE: "No Category",

        // Task Priority
        TASK_PRIORITY_ARIA: "Priority level: {value}",
        TASK_PRIORITY_HIGH: "High",
        TASK_PRIORITY_MEDIUM: "Medium",
        TASK_PRIORITY_LOW: "Low",
        TASK_DEADLINE_ARIA: "Task deadline calendar date: {value}",

        // Start Button
        TASK_ACTION_START_TEXT: "Start",
        TASK_ACTION_START_ARIA: "Start work item: {value}. Moves card to In Progress column.",
    
        // =========================================================================
        // In-Progress & Review Column
        // =========================================================================
        COLUMN_INPROGRESS_TITLE: "In Progress & Review ({value})",
        LANE_INPROGRESS_ARIA: "In Progress and Review tracking column. Contains {value} items.",
        TASK_CARD_STATUS_ARIA: "Task item card: {value1}. Current status is: {value2}",
        REVIEW_BANNER_TEXT: "Pending PM Review",
        REVIEW_BANNER_ARIA: "Alert: {value} is pending project manager validation review.",

        // Related Buttons
        BTN_BACK_TEXT: "Back",
        BTN_BACK_ARIA: "Move {value} backward to Pending column",
        BTN_SUBMIT_REVIEW_TEXT: "Submit Review",
        BTN_SUBMIT_REVIEW_ARIA: "Submit {value} for Project Manager approval review",
        BTN_CANCEL_REVIEW_TEXT: "Cancel Review Request",
        BTN_CANCEL_REVIEW_ARIA: "Cancel review request and return {value} to In Progress column",
        BTN_REJECT_TEXT: "Reject",
        BTN_REJECT_ARIA: "Reject review request and return {value} to working list",
        BTN_APPROVE_TEXT: "Approve Task",
        BTN_APPROVE_ARIA: "Approve review and transition {value} into Completed column",

        // =========================================================================
        // Completed Column
        // =========================================================================
        COLUMN_COMPLETED_TITLE: "Completed ({value})",
        LANE_COMPLETED_ARIA: "Completed task archive column. Contains {value} finished items.",
        TASK_CARD_COMPLETED_ARIA: "Completed task card: {value}",
        BADGE_DONE_TEXT: "Done",
        BADGE_DONE_ARIA: "Task processing state: Done",
        FINISHED_ASSIGNEE_ARIA: "Assigned team member for finished task {value}",
        FINISHED_CATEGORY_ARIA: "Classification category for finished task {value}",
        FINISHED_PRIORITY_ARIA: "Original priority level: {value}",
        
        // Related Button
        REOPEN_TEXT: "Reopen",
        REOPEN_ARIA: "Reopen task item: {value}. Returns card back to working In Progress column.",

        // Create a new Task Modal
        MODAL_TASK_HEADER_TEXT: "Create New Task Specification",
        MODAL_TASK_HEADER_ARIA: "Create New Task Specification",
        MODAL_TASK_TITLE_LABEL: "Task Title",
        MODAL_TASK_TITLE_PLACEHOLDER: "e.g. Design database schema",
        MODAL_TASK_DESC_LABEL: "Description",
        MODAL_TASK_DESC_PLACEHOLDER: "Provide actionable details...",
        MODAL_TASK_PRIORITY_LABEL: "Select task priority tier",
        MODAL_TASK_DEADLINE_LABEL: "Deadline",
        MODAL_TASK_DEADLINE_KEYBOARD_ARIA: "Keyboard navigation note: Press the Tab key or Escape key to exit the calendar selector grid",
        MODAL_TASK_DEADLINE_INPUT_ARIA: "Designated calendar completion date",
        MODAL_TASK_CANCEL_BTN: "Cancel",
        MODAL_TASK_CANCEL_ARIA: "Dismiss task specification form overlay",
        MODAL_TASK_SUBMIT_BTN: "Create Task",
        MODAL_TASK_SUBMIT_ARIA: "Create new task item",
    
        // Create a new Tag/Category Modal
        MODAL_TAG_HEADER: "Create New Workspace Tag",
        MODAL_TAG_NAME_LABEL: "Tag Name",
        MODAL_TAG_NAME_PLACEHOLDER: "e.g., Frontend, Testing, Bug...",
        MODAL_TAG_COLOR_LABEL: "Tag Theme Colour:",
        MODAL_TAG_COLOR_ARIA: "Select categorisation badge background colour",

        // Color Selection Text Items 
        MODAL_TAG_COLOR_RED: "Crimson Red (High Contrast)",
        MODAL_TAG_COLOR_BLUE: "Electric Blue (High Contrast)",
        MODAL_TAG_COLOR_GREEN: "Forest Green (High Contrast)",
        MODAL_TAG_COLOR_ORANGE: "Deep Orange (High Contrast)",
        MODAL_TAG_COLOR_PURPLE: "Royal Purple (High Contrast)",

        MODAL_TAG_CANCEL_BTN: "Cancel",
        MODAL_TAG_CANCEL_ARIA: "Dismiss workspace tag creation layout form",
        MODAL_TAG_SUBMIT_BTN: "Create Tag",
        MODAL_TAG_SUBMIT_ARIA: "Create workspace classification tag"
    }
};