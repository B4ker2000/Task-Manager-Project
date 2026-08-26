export interface LocalePack {
    // Navigation / Headers
    PROFILE_ARIA_MAIN: string;
    BACK_BTN_TEXT: string;
    BACK_BTN_ARIA: string;
    IDENTITY_PROFILE_TITLE: string;

    // States
    SYNCING_CREDENTIALS: string;

    // Section 1: Core Account Details
    CORE_ACCOUNT_ARIA: string;
    SECURITY_LEVEL_LABEL: string;
    REGISTERED_EMAIL_LABEL: string;
    DATABASE_RECORD_LABEL: string;

    // Section 2: Metrics
    SYSTEM_METRICS_TITLE: string;
    ASSIGNED_ITEMS_LABEL: string;
    ASSIGNED_ITEMS_ARIA: string;
    COMPLETED_TASKS_LABEL: string;
    COMPLETED_TASKS_ARIA: string;

    // Section 3: Configuration Panel
    WORKSPACE_TITLE: string;
    THEME_LABEL: string;
    FONT_LABEL: string;
    COLORBLIND_LABEL: string;
    
    // Theme Dropdown Labels
    THEME_LIGHT: string;
    THEME_DARK: string;
    THEME_AMBER: string;
    THEME_MATRIX: string;
    THEME_HIGH_CONTRAST_BLACK: string;
    THEME_HIGH_CONTRAST_WHITE: string;
    THEME_HIGH_CONTRAST_BEIGE: string;
    THEME_WIN98: string;
    THEME_WINXP: string;
    THEME_VISTA: string;
    THEME_WIN7: string;
    THEME_AERO: string;
    THEME_BA: string;

    // left from last time, will be organized!
    THEME_DEFAULT: string;
    SAVE_CHANGES: string;
    DANGER_ZONE: string;
    DELETE_ACCOUNT: string;
    BACK_DASHBOARD: string;
    CREATE_TASK_TITLE: string;
}

export const DICTIONARY: Record<string, LocalePack> = {
    en: {
        PROFILE_ARIA_MAIN: "User Profile Settings",
        BACK_BTN_TEXT: "← Back to Workspace",
        BACK_BTN_ARIA: "Back to primary task dashboard canvas",
        IDENTITY_PROFILE_TITLE: "Your Workspace Identity Profile",

        // States
        SYNCING_CREDENTIALS: "Syncing secure cloud identity credentials...",

        // Section 1: Core Account Details
        CORE_ACCOUNT_ARIA: "Core Account Details",
        SECURITY_LEVEL_LABEL: "Security Level:",
        REGISTERED_EMAIL_LABEL: "Registered Email:",
        DATABASE_RECORD_LABEL: "Database Record ID:",

        // Section 2: Metrics
        SYSTEM_METRICS_TITLE: "System Action Metrics",
        ASSIGNED_ITEMS_LABEL: "Assigned Work Items",
        ASSIGNED_ITEMS_ARIA: "Assigned Work Items",
        COMPLETED_TASKS_LABEL: "Completed Tasks",
        COMPLETED_TASKS_ARIA: "Completed Tasks",

        // Section 3: Configuration Panel
        WORKSPACE_TITLE: "Workspace Environment Preferences",
        THEME_LABEL: "Visual Application Theme:",
        FONT_LABEL: "Font Style:",
        COLORBLIND_LABEL: "Colorblind Filter:",
    
        // Theme Dropdown Labels
        THEME_LIGHT: "Professional Light Mode",
        THEME_DARK: "Dark Workspace Canvas",
        THEME_AMBER: "Vintage Amber CRT Terminal",
        THEME_MATRIX: "Vintage Green Matrix CRT Terminal",
        THEME_HIGH_CONTRAST_BLACK: "High Contrast (Black)",
        THEME_HIGH_CONTRAST_WHITE: "High Contrast (White)",
        THEME_HIGH_CONTRAST_BEIGE: "High Contrast (Beige Desert)",
        THEME_WIN98: "Retro Windows 95/98",
        THEME_WINXP: "Nostalgic Windows XP (Luna Blue)",
        THEME_VISTA: "Classic Windows Vista",
        THEME_WIN7: "Classic Windows 7",
        THEME_AERO: "Frutiger Aero (Vibrant Eco-Cyber)",
        THEME_BA: "Schale Workspace (Blue Archive)"
    },

    ja: {
        PROFILE_ARIA_MAIN: "ユーザー設定",
        BACK_BTN_TEXT: "← ダッシュボードに戻る",
        BACK_BTN_ARIA: "ダッシュボードに戻る",
        IDENTITY_PROFILE_TITLE: "プロフィール<ruby>画面<rt>がめん</rt></ruby>",

        // States
        SYNCING_CREDENTIALS: "クラウドデータを同期中...",

        // Section 1: Core Account Details
        CORE_ACCOUNT_ARIA: "アカウント詳細",
        SECURITY_LEVEL_LABEL: "権限レベル:",
        REGISTERED_EMAIL_LABEL: "メールアドレス:",
        DATABASE_RECORD_LABEL: "登録ID:",

        // Section 2: Metrics
        SYSTEM_METRICS_TITLE: "タスク統計情報",
        ASSIGNED_ITEMS_LABEL: "担当タスク数",
        ASSIGNED_ITEMS_ARIA: "担当タスク数",
        COMPLETED_TASKS_LABEL: "完了タスク数",
        COMPLETED_TASKS_ARIA: "完了タスク数",

        // Section 3: Configuration Panel
        WORKSPACE_TITLE: "環境設定",
        THEME_LABEL: "画面テーマ設定:",
        FONT_LABEL: "フォント設定:",
        COLORBLIND_LABEL: "色覚補正設定:",
    
        // Theme Dropdown Labels
        THEME_LIGHT: "ライトモード",
        THEME_DARK: "ダークモード",
        THEME_AMBER: "レトロアンバー端末",
        THEME_MATRIX: "グリーンマトリクス端末",
        THEME_HIGH_CONTRAST_BLACK: "高コントラスト (黒)",
        THEME_HIGH_CONTRAST_WHITE: "高コントラスト (白)",
        THEME_HIGH_CONTRAST_BEIGE: "高コントラスト (ベージュ)",
        THEME_WIN98: "レトロ Windows 95/98",
        THEME_WINXP: "ノスタルジック Windows XP",
        THEME_VISTA: "クラシック Windows Vista",
        THEME_WIN7: "クラシック Windows 7",
        THEME_AERO: "フルティガー・エアロ",
        THEME_BA: "シャーレの部室 (ブルーアーカイブ)"
    },

    ru: {
        PROFILE_ARIA_MAIN: "Настройки профиля пользователя",
        BACK_BTN_TEXT: "← Назад к рабочей области",
        BACK_BTN_ARIA: "Вернуться на главную панель задач",
        IDENTITY_PROFILE_TITLE: "Ваш рабочий профиль",

        // States
        SYNCING_CREDENTIALS: "Синхронизация учетных данных с облаком...",

        // Section 1: Core Account Details
        CORE_ACCOUNT_ARIA: "Основные данные учетной записи",
        SECURITY_LEVEL_LABEL: "Уровень доступа:",
        REGISTERED_EMAIL_LABEL: "Зарегистрированный Email:",
        DATABASE_RECORD_LABEL: "Идентификатор записи базы данных:",

        // Section 2: Metrics
        SYSTEM_METRICS_TITLE: "Метрики системных действий",
        ASSIGNED_ITEMS_LABEL: "Назначенные рабочие элементы",
        ASSIGNED_ITEMS_ARIA: "Назначенные рабочие элементы",
        COMPLETED_TASKS_LABEL: "Выполненные задачи",
        COMPLETED_TASKS_ARIA: "Выполненные задачи",

        // Section 3: Configuration Panel
        WORKSPACE_TITLE: "Настройки рабочей среды",
        THEME_LABEL: "Визуальная тема приложения:",
        FONT_LABEL: "Стиль шрифта:",
        COLORBLIND_LABEL: "Цветовой фильтр:",
    
        // Theme Dropdown Labels
        THEME_LIGHT: "Профессиональный светлый режим",
        THEME_DARK: "Темный холст рабочей области",
        THEME_AMBER: "Винтажный янтарный ЭЛТ-терминал",
        THEME_MATRIX: "Винтажный зеленый ЭЛТ-терминал",
        THEME_HIGH_CONTRAST_BLACK: "Высокая контрастность (Черная)",
        THEME_HIGH_CONTRAST_WHITE: "Высокая контрастность (Белая)",
        THEME_HIGH_CONTRAST_BEIGE: "Высокая контрастность (Бежевая пустыня)",
        THEME_WIN98: "Ретро Windows 95/98",
        THEME_WINXP: "Ностальгическая Windows XP (Luna Blue)",
        THEME_VISTA: "Классическая Windows Vista",
        THEME_WIN7: "Классическая Windows 7",
        THEME_AERO: "Frutiger Aero (Эко-Кибер)",
        THEME_BA: "Рабочая область Шале (Blue Archive)"
    }
};