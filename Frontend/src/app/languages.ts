export interface LocalePack {
    //////////////////
    //    Global    //
    //////////////////
    BACK_BTN_TEXT: string;
    BACK_BTN_ARIA: string;

    //////////////////
    // User Profile //
    //////////////////
    // Navigation / Headers
    PROFILE_ARIA_MAIN: string;
    IDENTITY_PROFILE_TITLE: string;

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

    // Language Selection Configuration
    LANGUAGE_SELECTION_TITLE: string;
    LANGUAGE_SELECTION_ARIA: string;
    LANGUAGE_OPTION_ENG_US: string;
    LANGUAGE_OPTION_JAP: string;
    LANGUAGE_OPTION_RUS: string;
    
    // Theme Selector Options
    THEME_OPTION_LIGHT: string;
    THEME_OPTION_DARK: string;
    THEME_OPTION_AMBER: string;
    THEME_OPTION_MATRIX: string;
    THEME_OPTION_HIGH_CONTRAST_BLACK: string;
    THEME_OPTION_HIGH_CONTRAST_WHITE: string;
    THEME_OPTION_HIGH_CONTRAST_BEIGE: string;
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
    ACCOUNT_SETTINGS_TITLE: string;
    UPDATE_USER_LABEL: string;
    UPDATE_USER_PLACEHOLDER: string;
    CHANGE_PASS_LABEL: string;
    CHANGE_PASS_PLACEHOLDER: string;
    CONFIRM_PASS_LABEL: string;
    CONFIRM_PASS_PLACEHOLDER: string;
    PASS_REQUIREMENTS_ARIA: string;
    SAVE_CHANGES_BTN: string;

    // Eye Toggle Accessibility Script Targets
    SHOW_PASS_ARIA: string;
    HIDE_PASS_ARIA: string;
    SHOW_CONFIRM_ARIA: string;
    HIDE_CONFIRM_ARIA: string;

    // Destructive Actions Area (Danger Zone)
    DANGER_ZONE_TITLE: string;
    DANGER_ZONE_WARN: string;
    DANGER_ZONE_BTN: string;

    //////////////////
    //  Login Page  //
    //////////////////
    LOGIN_PORTAL_ARIA: string;
    LOGIN_HEADER_WELCOME_BACK: string;
    LOGIN_HEADER_FIRST_TIME: string;
    LOGIN_SUBTITLE_MANAGE: string;
    LOGIN_FIELD_EMAIL: string;
    LOGIN_PLACEHOLDER_EMAIL: string;
    LOGIN_FIELD_PASSWORD: string;
    LOGIN_PLACEHOLDER_PASSWORD: string;
    LOGIN_CHECKBOX_REMEMBER: string;
    LOGIN_BTN_SIGNIN_ARIA: string;
    LOGIN_BTN_SIGNIN_TEXT: string;
    LOGIN_FOOTER_NAV_ARIA: string;
    LOGIN_FOOTER_TEXT: string;
    LOGIN_FOOTER_LINK: string;

    ///////////////////
    // Register Page //
    ///////////////////
    REG_PORTAL_ARIA: string;
    REG_HEADER_TITLE: string;
    REG_SUBTITLE_JOIN: string;
    REG_LABEL_USERNAME: string;
    REG_PLACEHOLDER_USERNAME: string;
    REG_PLACEHOLDER_PASSWORD: string;
    REG_LABEL_CONFIRM_PASSWORD: string;
    REG_PLACEHOLDER_CONFIRM_PASSWORD: string;
    REG_REQUIREMENTS_ARIA: string;
    REG_BTN_SUBMIT_ARIA: string;
    REG_BTN_SUBMIT_TEXT: string;
    REG_FOOTER_TEXT: string;
    REG_FOOTER_LINK: string;

    ///////////////////
    //   Dashbaord   //
    ///////////////////
    DASHBOARD_MAIN_CANVAS_LABEL: string;
    DASHBOARD_MAIN_HEADER: string;
    DASHBOARD_NAV_ARIA: string;
    DASHBOARD_PROFILE_BTN: string;
    DASHBOARD_LOGOUT_ARIA: string;
    DASHBOARD_LOGOUT_BTN: string;
    DASHBOARD_CREATE_PROJECT_HEADER: string;
    DASHBOARD_PROJECT_TITLE_LABEL: string;
    DASHBOARD_PROJECT_TITLE_PLACEHOLDER: string;
    DASHBOARD_DESCRIPTION_LABEL: string;
    DASHBOARD_DESCRIPTION_PLACEHOLDER: string;
    DASHBOARD_CREATE_BTN_ARIA: string;
    DASHBOARD_CREATE_BTN_TEXT: string;
    DASHBOARD_YOUR_PROJECTS_HEADER: string;
    DASHBOARD_EMPTY_MESSAGE: string;
    DASHBOARD_PROJECT_CARD_ARIA: string;
    DASHBOARD_DELETE_PROJECT_ARIA: string;
    DASHBOARD_NO_DESCRIPTION_FALLBACK: string;
    DASHBOARD_OPEN_BOARD_ARIA: string;
    DASHBOARD_OPEN_BOARD_TEXT: string;
}

export const DICTIONARY: Record<string, LocalePack> = {
    en: {
        BACK_BTN_TEXT: "← Back to Dashboard",
        BACK_BTN_ARIA: "Back to primary task dashboard canvas",
        PROFILE_ARIA_MAIN: "User Profile Settings",
        IDENTITY_PROFILE_TITLE: "Your Workspace Identity Profile",
        SYNCING_CREDENTIALS: "Syncing secure cloud identity credentials...",
        CORE_ACCOUNT_ARIA: "Core Account Details",
        SECURITY_LEVEL_LABEL: "Security Level:",
        REGISTERED_EMAIL_LABEL: "Registered Email:",
        DATABASE_RECORD_LABEL: "Database Record ID:",
        SYSTEM_METRICS_TITLE: "System Action Metrics",
        ASSIGNED_ITEMS_LABEL: "Assigned Work Items",
        ASSIGNED_ITEMS_ARIA: "Assigned Work Items",
        COMPLETED_TASKS_LABEL: "Completed Tasks",
        COMPLETED_TASKS_ARIA: "Completed Tasks",
        WORKSPACE_TITLE: "Workspace Environment Preferences",
        THEME_LABEL: "Visual Application Theme:",
        LANGUAGE_SELECTION_TITLE: "Application Language:",
        LANGUAGE_SELECTION_ARIA: "Application display language selector dropdown",
        LANGUAGE_OPTION_ENG_US: "English (US)",
        LANGUAGE_OPTION_JAP: "日本語 (Japanese)",
        LANGUAGE_OPTION_RUS: "Русский (Russian)",
        THEME_OPTION_LIGHT: "☀️ Professional Light Mode",
        THEME_OPTION_DARK: "🌙 Dark Workspace Canvas",
        THEME_OPTION_AMBER: "💽 Vintage Amber CRT Terminal",
        THEME_OPTION_MATRIX: "📟 Vintage Green Matrix CRT Terminal",
        THEME_OPTION_HIGH_CONTRAST_BLACK: "🌓 High Contrast (Black)",
        THEME_OPTION_HIGH_CONTRAST_WHITE: "⬜️ High Contrast (White)",
        THEME_OPTION_HIGH_CONTRAST_BEIGE: "🏜️ High Contrast (Beige Desert)",
        THEME_OPTION_WIN98: "💾 Retro Windows 95/98",
        THEME_OPTION_WINXP: "💿 Nostalgic Windows XP (Luna Blue)",
        THEME_OPTION_VISTA: "📀 Classic Windows Vista",
        THEME_OPTION_WIN7: "🫧 Classic Windows 7",
        THEME_OPTION_AERO: "🍃 Frutiger Aero (Vibrant Eco-Cyber)",
        THEME_OPTION_BA: "🔮 Schale Workspace (Blue Archive)",
        FONT_LABEL: "Font Style:",
        FONT_ARIA: "Typography interface font layout switch dropdown",
        FONT_DESCRIPTION: "Changes the default display typeface for the application workspace",
        FONT_OPTION_DEFAULT: "Theme Default",
        FONT_OPTION_LEGI: "🧼 High-Legibility",
        FONT_OPTION_DYS: "📖 Easy-to-Read (Dyslexia Friendly)",
        COLORBLIND_LABEL: "Colorblind Filter:",
        COLORBLIND_ARIA: "Colorblind filter correction simulation matrix selector dropdown",
        COLORBLIND_OPTION_NONE: "None",
        COLORBLIND_OPTION_DEU: "Deuteranopia (Green Weakness)",
        COLORBLIND_OPTION_PRO: "Protanopia (Red Weakness)",
        COLORBLIND_OPTION_TRI: "Tritanopia (Blue Weakness)",
        COLORBLIND_OPTION_GRA: "Grayscale (Monochrome)",
        ACCOUNT_SETTINGS_TITLE: "Account Management Settings",
        UPDATE_USER_LABEL: "Update Username",
        UPDATE_USER_PLACEHOLDER: "Enter new username...",
        CHANGE_PASS_LABEL: "Change Security Password",
        CHANGE_PASS_PLACEHOLDER: "Enter new password...",
        CONFIRM_PASS_LABEL: "Confirm New Password",
        CONFIRM_PASS_PLACEHOLDER: "Retype your new password...",
        PASS_REQUIREMENTS_ARIA: "Passwords must match before modifications can commit securely.",
        SAVE_CHANGES_BTN: "Save Profile Changes",
        SHOW_PASS_ARIA: "Show plain text password",
        HIDE_PASS_ARIA: "Hide plain text password",
        SHOW_CONFIRM_ARIA: "Show plain text confirmation password",
        HIDE_CONFIRM_ARIA: "Hide plain text confirmation password",
        DANGER_ZONE_TITLE: "Danger Zone",
        DANGER_ZONE_WARN: "Deleting your account clears your workspace access profiles completely!<br>This action cannot be reversed.",
        DANGER_ZONE_BTN: "Permanently Delete Account",
        //////////////////////////////////////////////////////
        LOGIN_PORTAL_ARIA: "Account Authentication Portal",
        LOGIN_HEADER_WELCOME_BACK: "Welcome Back",
        LOGIN_HEADER_FIRST_TIME: "Welcome to Task Manager",
        LOGIN_SUBTITLE_MANAGE: "Log in to manage your projects and tasks",
        LOGIN_FIELD_EMAIL: "Email Address",
        LOGIN_PLACEHOLDER_EMAIL: "enter your email here",
        LOGIN_FIELD_PASSWORD: "Password",
        LOGIN_PLACEHOLDER_PASSWORD: "enter password...",
        LOGIN_CHECKBOX_REMEMBER: "Remember Me",
        LOGIN_BTN_SIGNIN_ARIA: "Sign in securely to your workspace canvas",
        LOGIN_BTN_SIGNIN_TEXT: "Sign in",
        LOGIN_FOOTER_NAV_ARIA: "Alternative entry link",
        LOGIN_FOOTER_TEXT: "New to the workspace? ",
        LOGIN_FOOTER_LINK: "Create a New Account",

        REG_PORTAL_ARIA: "Account Creation Portal",
        REG_HEADER_TITLE: "Create Workspace Account",
        REG_SUBTITLE_JOIN: "Join the project management platform!",
        REG_LABEL_USERNAME: "Username",
        REG_PLACEHOLDER_USERNAME: "Pick a unique display name...",
        REG_PLACEHOLDER_PASSWORD: "Create a secure password...",
        REG_LABEL_CONFIRM_PASSWORD: "Confirm Password",
        REG_PLACEHOLDER_CONFIRM_PASSWORD: "Retype your password...",
        REG_REQUIREMENTS_ARIA: "Both password fields must match exactly before registration requests can submit.",
        REG_BTN_SUBMIT_ARIA: "Submit credentials to register your new account",
        REG_BTN_SUBMIT_TEXT: "Sign Up",
        REG_FOOTER_TEXT: "Already have an account? ",
        REG_FOOTER_LINK: "Back to Sign In",

        DASHBOARD_MAIN_CANVAS_LABEL: "Main Projects Dashboard Canvas",
        DASHBOARD_MAIN_HEADER: "Task Manager Workspace",
        DASHBOARD_NAV_ARIA: "Account navigation shortcuts",
        DASHBOARD_PROFILE_BTN: "User Profile",
        DASHBOARD_LOGOUT_ARIA: "Sign out of your workspace session securely",
        DASHBOARD_LOGOUT_BTN: "Sign Out",
        DASHBOARD_CREATE_PROJECT_HEADER: "Create New Project",
        DASHBOARD_PROJECT_TITLE_LABEL: "Project Title",
        DASHBOARD_PROJECT_TITLE_PLACEHOLDER: "e.g. Website Overhaul",
        DASHBOARD_DESCRIPTION_LABEL: "Description",
        DASHBOARD_DESCRIPTION_PLACEHOLDER: "Describe the project goal...",
        DASHBOARD_CREATE_BTN_ARIA: "Submit form to create new project space",
        DASHBOARD_CREATE_BTN_TEXT: "Create Project",
        DASHBOARD_YOUR_PROJECTS_HEADER: "Your Projects",
        DASHBOARD_EMPTY_MESSAGE: "No projects found. Create one to get started!",
        DASHBOARD_NO_DESCRIPTION_FALLBACK: "No description provided.",
        DASHBOARD_OPEN_BOARD_TEXT: "Open Project Board",

        // Dynamic localization functions to ensure perfect sentence structures across all languages
        DASHBOARD_PROJECT_CARD_ARIA: "Project space: {title}",
        DASHBOARD_DELETE_PROJECT_ARIA: "Permanently delete project: {title}",
        DASHBOARD_OPEN_BOARD_ARIA: "Open task board for project: {title}",
    },

    ja: {
        BACK_BTN_TEXT: "← ダッシュボードに<ruby>戻<rt>もど</rt></ruby>る",
        BACK_BTN_ARIA: "ダッシュボードに戻る",
        PROFILE_ARIA_MAIN: "ユーザー<ruby>設<rt>せっ</rt>定<rt>てい</rt></ruby>",
        IDENTITY_PROFILE_TITLE: "プロフィール<ruby>画<rt>が</rt>面<rt>めん</rt></ruby>",
        SYNCING_CREDENTIALS: "データを<ruby>同<rt>どう</rt>期<rt>き</rt>中<rt>ちゅう</rt></ruby>...",
        CORE_ACCOUNT_ARIA: "アカウント<ruby>詳<rt>しょう</rt>細<rt>さい</rt></ruby>",
        SECURITY_LEVEL_LABEL: "<ruby>権<rt>けん</rt>限<rt>げん</rt></ruby>レベル:",
        REGISTERED_EMAIL_LABEL: "メールアドレス:",
        DATABASE_RECORD_LABEL: "<ruby>登<rt>とう</rt>録<rt>ろく</rt></ruby> ID:",
        SYSTEM_METRICS_TITLE: "タスク<ruby>統<rt>とう</rt>計<rt>けい</rt>情<rt>じょう</rt>報<rt>ほう</rt></ruby>",
        ASSIGNED_ITEMS_LABEL: "<ruby>担<rt>たん</rt>当<rt>とう</rt></ruby>タスク<ruby>数<rt>すう</rt></ruby>",
        ASSIGNED_ITEMS_ARIA: "担当タスク数",
        COMPLETED_TASKS_LABEL: "<ruby>完<rt>かん</rt>了<rt>りょう</rt></ruby>タスク<ruby>数<rt>すう</rt></ruby>",
        COMPLETED_TASKS_ARIA: "完了タスク数",
        WORKSPACE_TITLE: "<ruby>環<rt>かん</rt>境<rt>きょう</rt>設<rt>せっ</rt>定<rt>てい</rt></ruby>",
        THEME_LABEL: "<ruby>画<rt>が</rt>面<rt>めん</rt></ruby>テーマ<ruby>設<rt>せっ</rt>定<rt>てい</rt></ruby>:",
        LANGUAGE_SELECTION_TITLE: "<ruby>言<rt>げん</rt>語<rt>ご</rt></ruby>の<ruby>選<rt>せん</rt>択<rt>たく</rt></ruby>:",
        LANGUAGE_SELECTION_ARIA: "<ruby>言<rt>げん</rt>語<rt>ご</rt></ruby><ruby>選<rt>せん</rt>択<rt>たく</rt></ruby>ドロップダウンメニュー",
        LANGUAGE_OPTION_ENG_US: "<ruby>英<rt>えい</rt></ruby><ruby>語<rt>ご</rt></ruby> (English US)",
        LANGUAGE_OPTION_JAP: "<ruby>日<rt>に</rt>本<rt>ほん</rt>語<rt>ご</rt></ruby> (Japanese)",
        LANGUAGE_OPTION_RUS: "ロシア<ruby>語<rt>ご</rt></ruby> (Russian)",
        THEME_OPTION_LIGHT: "☀️ ライトモード",
        THEME_OPTION_DARK: "🌙 ダークモード",
        THEME_OPTION_AMBER: "💽 レトロアンバー<ruby>端<rt>たん</rt>末<rt>まつ</rt></ruby>",
        THEME_OPTION_MATRIX: "📟 グリーンマトリクス<ruby>端<rt>たん</rt>末<rt>まつ</rt></ruby>",
        THEME_OPTION_HIGH_CONTRAST_BLACK: "🌓⬜<ruby>高<rt>こう</rt></ruby>コントラスト・<ruby>黒<rt>くろ</rt></ruby>",
        THEME_OPTION_HIGH_CONTRAST_WHITE: "⬜️<ruby>高<rt>こう</rt></ruby>コントラスト・<ruby>白<rt>しろ</rt></ruby>",
        THEME_OPTION_HIGH_CONTRAST_BEIGE: "🏜️<ruby>高<rt>こう</rt></ruby>コントラスト・ベージュ",
        THEME_OPTION_WIN98: "💾 レトロ Windows 95/98",
        THEME_OPTION_WINXP: "💿 ノスタルジック Windows XP",
        THEME_OPTION_VISTA: "📀 クラシック Windows Vista",
        THEME_OPTION_WIN7: "🫧 クラシック Windows 7",
        THEME_OPTION_AERO: "🍃 フルティガー・エアロ",
        THEME_OPTION_BA: "🔮 シャーレの<ruby>部<rt>ぶ</rt>室<rt>しつ</rt></ruby> (ブルーアーカイブ)",
        FONT_LABEL: "フォント<ruby>設<rt>せっ</rt>定<rt>てい</rt></ruby>:",
        FONT_ARIA: "フォント変更メニュー",
        FONT_DESCRIPTION: "ワークスペースのデフォルトフォントを変更します。",
        FONT_OPTION_DEFAULT: "テーマデフォルト (レトロ)",
        FONT_OPTION_LEGI: "🧼 <ruby>高<rt>こう</rt>視<rt>し</rt>認<rt>にん</rt>性<rt>せい</rt></ruby>サンセリフ",
        FONT_OPTION_DYS: "📖 <ruby>読<rt>よ</rt></ruby>みやすいフォント (<ruby>読<rt>ど</rt>書<rt>しょ</rt>障<rt>しょう</rt>害<rt>がい</rt></ruby><ruby>対<rt>たい</rt>策<rt>さく</rt></ruby>)",
        COLORBLIND_LABEL: "<ruby>色<rt>しき</rt>覚<rt>かく</rt>補<rt>ほ</rt>正<rt>せい</rt>設<rt>せっ</rt>定<rt>てい</rt></ruby>:",
        COLORBLIND_ARIA: "色覚補正フィルターメニュー",
        COLORBLIND_OPTION_NONE: "なし",
        COLORBLIND_OPTION_DEU: "デュテラノピア (<ruby>緑<rt>みどり</rt></ruby><ruby>弱<rt>じゃく</rt></ruby>)",
        COLORBLIND_OPTION_PRO: "プロタノピア (<ruby>赤<rt>あか</rt></ruby><ruby>弱<rt>じゃく</rt></ruby>)",
        COLORBLIND_OPTION_TRI: "トリタノピア (<ruby>青<rt>あお</rt></ruby><ruby>弱<rt>じゃく</rt></ruby>)",
        COLORBLIND_OPTION_GRA: "グレースケール (<ruby>白<rt>しろ</rt></ruby><ruby>黒<rt>くろ</rt></ruby>)",
        ACCOUNT_SETTINGS_TITLE: "アカウント<ruby>管<rt>かん</rt>理<rt>り</rt>設<rt>せっ</rt>定<rt>てい</rt></ruby>",
        UPDATE_USER_LABEL: "ユーザー<ruby>名<rt>めい</rt></ruby>の<ruby>更<rt>こう</rt>新<rt>しん</rt></ruby>",
        UPDATE_USER_PLACEHOLDER: "新しいユーザー名を入力してください...",
        CHANGE_PASS_LABEL: "パスワードの<ruby>変<rt>へん</rt>更<rt>こう</rt></ruby>",
        CHANGE_PASS_PLACEHOLDER: "新しいパスワードを入力してください...",
        CONFIRM_PASS_LABEL: "パスワードの<ruby>確<rt>かく</rt>認<rt>にん</rt></ruby>",
        CONFIRM_PASS_PLACEHOLDER: "パスワードをもう一度入力してください...",
        PASS_REQUIREMENTS_ARIA: "変更を保存するには、両方のパスワードが一致する必要があります。",
        SAVE_CHANGES_BTN: "プロファイル<ruby>変<rt>へん</rt>更<rt>こう</rt></ruby>を<ruby>保<rt>ほ</rt>存<rt>ぞん</rt></ruby>",
        SHOW_PASS_ARIA: "パスワードを表示する",
        HIDE_PASS_ARIA: "パスワードを非表示にする",
        SHOW_CONFIRM_ARIA: "確認用パスワードを表示する",
        HIDE_CONFIRM_ARIA: "確認用パスワードを非表示にする",
        DANGER_ZONE_TITLE: "<ruby>危<rt>き</rt>険<rt>けん</rt>地<rt>ち</rt>帯<rt>たい</rt></ruby>",
        DANGER_ZONE_WARN: "アカウントを削除すると、ワークスペースのデータが完全に消去されます！<br>この操作は取り消せません。",
        DANGER_ZONE_BTN: "アカウントを<ruby>永<rt>えい</rt>久<rt>きゅう</rt></ruby>に<ruby>削<rt>さく</rt>除<rt>じょ</rt></ruby>する",
        //////////////////////////////////////////////////////
        LOGIN_PORTAL_ARIA: "Account Authentication Portal",
        LOGIN_HEADER_WELCOME_BACK: "Welcome Back",
        LOGIN_HEADER_FIRST_TIME: "Welcome to Task Manager",
        LOGIN_SUBTITLE_MANAGE: "Log in to manage your projects and tasks",
        LOGIN_FIELD_EMAIL: "Email Address",
        LOGIN_PLACEHOLDER_EMAIL: "enter your email here",
        LOGIN_FIELD_PASSWORD: "Password",
        LOGIN_PLACEHOLDER_PASSWORD: "enter password...",
        LOGIN_CHECKBOX_REMEMBER: "Remember Me",
        LOGIN_BTN_SIGNIN_ARIA: "Sign in securely to your workspace canvas",
        LOGIN_BTN_SIGNIN_TEXT: "Sign in",
        LOGIN_FOOTER_NAV_ARIA: "Alternative entry links",
        LOGIN_FOOTER_TEXT: "New to the workspace?",
        LOGIN_FOOTER_LINK: "Create a New Account",

        REG_PORTAL_ARIA: "Account Creation Portal",
        REG_HEADER_TITLE: "Create Workspace Account",
        REG_SUBTITLE_JOIN: "Join the project management platform!",
        REG_LABEL_USERNAME: "Username",
        REG_PLACEHOLDER_USERNAME: "Pick a unique display name...",
        REG_PLACEHOLDER_PASSWORD: "Create a secure password...",
        REG_LABEL_CONFIRM_PASSWORD: "Confirm Password",
        REG_PLACEHOLDER_CONFIRM_PASSWORD: "Retype your password...",
        REG_REQUIREMENTS_ARIA: "Both password fields must match exactly before registration requests can submit.",
        REG_BTN_SUBMIT_ARIA: "Submit credentials to register your new account",
        REG_BTN_SUBMIT_TEXT: "Sign Up",
        REG_FOOTER_TEXT: "Already have an account? ",
        REG_FOOTER_LINK: "Back to Sign In",

        DASHBOARD_MAIN_CANVAS_LABEL: "Main Projects Dashboard Canvas",
        DASHBOARD_MAIN_HEADER: "Task Manager Workspace",
        DASHBOARD_NAV_ARIA: "Account navigation shortcuts",
        DASHBOARD_PROFILE_BTN: "User Profile",
        DASHBOARD_LOGOUT_ARIA: "Sign out of your workspace session securely",
        DASHBOARD_LOGOUT_BTN: "Sign Out",
        DASHBOARD_CREATE_PROJECT_HEADER: "Create New Project",
        DASHBOARD_PROJECT_TITLE_LABEL: "Project Title",
        DASHBOARD_PROJECT_TITLE_PLACEHOLDER: "e.g. Website Overhaul",
        DASHBOARD_DESCRIPTION_LABEL: "Description",
        DASHBOARD_DESCRIPTION_PLACEHOLDER: "Describe the project goal...",
        DASHBOARD_CREATE_BTN_ARIA: "Submit form to create new project space",
        DASHBOARD_CREATE_BTN_TEXT: "Create Project",
        DASHBOARD_YOUR_PROJECTS_HEADER: "Your Projects",
        DASHBOARD_EMPTY_MESSAGE: "No projects found. Create one to get started!",
        DASHBOARD_NO_DESCRIPTION_FALLBACK: "No description provided.",
        DASHBOARD_OPEN_BOARD_TEXT: "Open Project Board",

        // Dynamic localization functions to ensure perfect sentence structures across all languages
        DASHBOARD_PROJECT_CARD_ARIA: "Project space: {title}",
        DASHBOARD_DELETE_PROJECT_ARIA: "Permanently delete project: {title}",
        DASHBOARD_OPEN_BOARD_ARIA: "Open task board for project: {title}",
    },

    ru: {
        BACK_BTN_TEXT: "← Назад к рабочей области",
        BACK_BTN_ARIA: "Вернуться на главную панель задач",
        PROFILE_ARIA_MAIN: "Настройки профиля пользователя",
        IDENTITY_PROFILE_TITLE: "Ваш рабочий профиль",
        SYNCING_CREDENTIALS: "Синхронизация учетных данных с облаком...",
        CORE_ACCOUNT_ARIA: "Основные данные учетной записи",
        SECURITY_LEVEL_LABEL: "Уровень доступа:",
        REGISTERED_EMAIL_LABEL: "Зарегистрированный Email:",
        DATABASE_RECORD_LABEL: "Идентификатор записи базы данных:",
        SYSTEM_METRICS_TITLE: "Метрики системных действий",
        ASSIGNED_ITEMS_LABEL: "Назначенные рабочие элементы",
        ASSIGNED_ITEMS_ARIA: "Назначенные рабочие элементы",
        COMPLETED_TASKS_LABEL: "Выполненные задачи",
        COMPLETED_TASKS_ARIA: "Выполненные задачи",
        WORKSPACE_TITLE: "Настройки рабочей среды",
        THEME_LABEL: "Визуальная тема приложения:",
        LANGUAGE_SELECTION_TITLE: "Язык приложения:",
        LANGUAGE_SELECTION_ARIA: "Выпадающий список выбора языка интерфейса",
        LANGUAGE_OPTION_ENG_US: "English (Английский)",
        LANGUAGE_OPTION_JAP: "日本語 (Японский)",
        LANGUAGE_OPTION_RUS: "Русский (Russian)",
        THEME_OPTION_LIGHT: "☀️ Профессиональный светлый режим",
        THEME_OPTION_DARK: "🌙 Темный холст рабочей области",
        THEME_OPTION_AMBER: "💽 Винтажный янтарный ЭЛТ-терминал",
        THEME_OPTION_MATRIX: "📟 Винтажный зеленый ЭЛТ-терминал",
        THEME_OPTION_HIGH_CONTRAST_BLACK: "🌓 Высокая контрастность (Черная)",
        THEME_OPTION_HIGH_CONTRAST_WHITE: "⬜️ Высокая контрастность (Белая)",
        THEME_OPTION_HIGH_CONTRAST_BEIGE: "🏜️ Высокая контрастность (Бежевая пустыня)",
        THEME_OPTION_WIN98: "💾 Ретро Windows 95/98",
        THEME_OPTION_WINXP: "💿 Ностальгическая Windows XP (Luna Blue)",
        THEME_OPTION_VISTA: "📀 Классическая Windows Vista",
        THEME_OPTION_WIN7: "🫧 Классическая Windows 7",
        THEME_OPTION_AERO: "🍃 Frutiger Aero (Эко-Кибер)",
        THEME_OPTION_BA: "🔮 Рабочая область Шале (Blue Archive)",
        FONT_LABEL: "Стиль шрифта:",
        FONT_ARIA: "Выпадающий список выбора шрифта интерфейса",
        FONT_DESCRIPTION: "Изменяет шрифт отображения текста по умолчанию в рабочей области",
        FONT_OPTION_DEFAULT: "По умолчанию (Ретро)",
        FONT_OPTION_LEGI: "🧼 Высококонтрастный без засечек",
        FONT_OPTION_DYS: "📖 Удобный для чтения (при дислексии)",
        COLORBLIND_LABEL: "Цветовой фильтр:",
        COLORBLIND_ARIA: "Выпадающий список выбора фильтра цветокоррекции",
        COLORBLIND_OPTION_NONE: "Нет",
        COLORBLIND_OPTION_DEU: "Дейтеранопия (проблемы с зеленым)",
        COLORBLIND_OPTION_PRO: "Протанопия (проблемы с красным)",
        COLORBLIND_OPTION_TRI: "Тританопия (проблемы с синим)",
        COLORBLIND_OPTION_GRA: "Оттенки серого (Монохромный)",
        ACCOUNT_SETTINGS_TITLE: "Управление учетной записью",
        UPDATE_USER_LABEL: "Обновить имя пользователя",
        UPDATE_USER_PLACEHOLDER: "Введите новое имя пользователя...",
        CHANGE_PASS_LABEL: "Изменить пароль безопасности",
        CHANGE_PASS_PLACEHOLDER: "Введите новый пароль...",
        CONFIRM_PASS_LABEL: "Подтвердите новый пароль",
        CONFIRM_PASS_PLACEHOLDER: "Повторите новый пароль...",
        PASS_REQUIREMENTS_ARIA: "Пароли должны совпадать перед безопасным сохранением изменений.",
        SAVE_CHANGES_BTN: "Сохранить изменения профиля",
        SHOW_PASS_ARIA: "Показать скрытый пароль",
        HIDE_PASS_ARIA: "Скрыть читаемый пароль",
        SHOW_CONFIRM_ARIA: "Показать скрытый пароль подтверждения",
        HIDE_CONFIRM_ARIA: "Скрыть читаемый пароль подтверждения",
        DANGER_ZONE_TITLE: "Опасная зона",
        DANGER_ZONE_WARN: "Удаление учетной записи полностью очистит ваш рабочий профиль!<br>Это действие необратимо.",
        DANGER_ZONE_BTN: "Безвозвратно удалить аккаунт",
        //////////////////////////////////////////////////////
        LOGIN_PORTAL_ARIA: "Account Authentication Portal",
        LOGIN_HEADER_WELCOME_BACK: "Welcome Back",
        LOGIN_HEADER_FIRST_TIME: "Welcome to Task Manager",
        LOGIN_SUBTITLE_MANAGE: "Log in to manage your projects and tasks",
        LOGIN_FIELD_EMAIL: "Email Address",
        LOGIN_PLACEHOLDER_EMAIL: "enter your email here",
        LOGIN_FIELD_PASSWORD: "Password",
        LOGIN_PLACEHOLDER_PASSWORD: "enter password...",
        LOGIN_CHECKBOX_REMEMBER: "Remember Me",
        LOGIN_BTN_SIGNIN_ARIA: "Sign in securely to your workspace canvas",
        LOGIN_BTN_SIGNIN_TEXT: "Sign in",
        LOGIN_FOOTER_NAV_ARIA: "Alternative entry links",
        LOGIN_FOOTER_TEXT: "New to the workspace?",
        LOGIN_FOOTER_LINK: "Create a New Account",

        REG_PORTAL_ARIA: "Account Creation Portal",
        REG_HEADER_TITLE: "Create Workspace Account",
        REG_SUBTITLE_JOIN: "Join the project management platform!",
        REG_LABEL_USERNAME: "Username",
        REG_PLACEHOLDER_USERNAME: "Pick a unique display name...",
        REG_PLACEHOLDER_PASSWORD: "Create a secure password...",
        REG_LABEL_CONFIRM_PASSWORD: "Confirm Password",
        REG_PLACEHOLDER_CONFIRM_PASSWORD: "Retype your password...",
        REG_REQUIREMENTS_ARIA: "Both password fields must match exactly before registration requests can submit.",
        REG_BTN_SUBMIT_ARIA: "Submit credentials to register your new account",
        REG_BTN_SUBMIT_TEXT: "Sign Up",
        REG_FOOTER_TEXT: "Already have an account? ",
        REG_FOOTER_LINK: "Back to Sign In",

        DASHBOARD_MAIN_CANVAS_LABEL: "Main Projects Dashboard Canvas",
        DASHBOARD_MAIN_HEADER: "Task Manager Workspace",
        DASHBOARD_NAV_ARIA: "Account navigation shortcuts",
        DASHBOARD_PROFILE_BTN: "User Profile",
        DASHBOARD_LOGOUT_ARIA: "Sign out of your workspace session securely",
        DASHBOARD_LOGOUT_BTN: "Sign Out",
        DASHBOARD_CREATE_PROJECT_HEADER: "Create New Project",
        DASHBOARD_PROJECT_TITLE_LABEL: "Project Title",
        DASHBOARD_PROJECT_TITLE_PLACEHOLDER: "e.g. Website Overhaul",
        DASHBOARD_DESCRIPTION_LABEL: "Description",
        DASHBOARD_DESCRIPTION_PLACEHOLDER: "Describe the project goal...",
        DASHBOARD_CREATE_BTN_ARIA: "Submit form to create new project space",
        DASHBOARD_CREATE_BTN_TEXT: "Create Project",
        DASHBOARD_YOUR_PROJECTS_HEADER: "Your Projects",
        DASHBOARD_EMPTY_MESSAGE: "No projects found. Create one to get started!",
        DASHBOARD_NO_DESCRIPTION_FALLBACK: "No description provided.",
        DASHBOARD_OPEN_BOARD_TEXT: "Open Project Board",

        // Dynamic localization functions to ensure perfect sentence structures across all languages
        DASHBOARD_PROJECT_CARD_ARIA: "Project space: {title}",
        DASHBOARD_DELETE_PROJECT_ARIA: "Permanently delete project: {title}",
        DASHBOARD_OPEN_BOARD_ARIA: "Open task board for project: {title}",
    }
};