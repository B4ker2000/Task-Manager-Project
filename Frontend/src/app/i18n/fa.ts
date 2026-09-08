import { LocalePack } from './locale-pack.interface';

export const PersianPack: LocalePack = {
    GLOBAL: {
        GENERIC_LOADING: "در حال بارگذاری...",
        BACK_BTN_TEXT: "بازگشت به داشبورد",
        BACK_BTN_ARIA: "برگشت به صفحه اصلی داشبورد پروژه",

        // Dynamic Date Formatting Pattern
        DATE_FORMAT: "yyyy/M/d",

        // Email & Password Fields
        FIELD_EMAIL: "آدرس ایمیل",
        PLACEHOLDER_EMAIL: "ایمیل خود را وارد کنید...",
        FIELD_PASSWORD: "رمز عبور",
        PLACEHOLDER_PASSWORD: "رمز عبور خود را وارد کنید...",

        // Footer Navigation Links
        FOOTER_NAV_ARIA: "پیوندهای دسترسی صفحه احراز هویت",

        // Eye Toggle Accessibility Script Targets
        SHOW_PASS_ARIA: "نمایش رمز عبور به صورت متن ساده",
        HIDE_PASS_ARIA: "پنهان کردن رمز عبور",
        SHOW_CONFIRM_ARIA: "نمایش تاییدیه رمز عبور به صورت متن ساده",
        HIDE_CONFIRM_ARIA: "پنهان کردن تاییدیه رمز عبور",

        // Language Selection Configuration
        LANGUAGE_SELECTION_TITLE: "زبان برنامه:",
        LANGUAGE_SELECTION_ARIA: "منوی کشویی انتخاب زبان نمایش برنامه",
        LANGUAGE_OPTION_EN_US: "English (US) (انگلیسی آمریکا)",
        LANGUAGE_OPTION_EN_UK: "English (UK) (انگلیسی بریتانیا)",
        LANGUAGE_OPTION_JP: "日本語 (ژاپنی)",
        LANGUAGE_OPTION_RU: "Русский (روسی)",
        LANGUAGE_OPTION_FA: "فارسی",

        // Language direction format
        DIRECTION: "rtl"
    },

    POPUP: {
        // Success Actions
        SUCCESS_PROFILE_REMOVED_TITLE: "حذف پروفایل",
        SUCCESS_PROFILE_REMOVED_BODY: "اطلاعات حساب کاربری شما با موفقیت حذف گردید.",
        SUCCESS_USER_INFO_UPDATED_TITLE: "بروزرسانی پروفایل",
        SUCCESS_USER_INFO_UPDATED_BODY: "اطلاعات پروفایل شما با موفقیت بروزرسانی شد.",

        // Warning Actions
        WARNING_EMPTY_FIELDS_TITLE: "فیلدهای خالی",
        WARNING_EMPTY_FIELDS_BODY: "لطفاً حداقل یکی از فیلدها را برای ذخیره تغییرات پروفایل پر کنید!", 
        WARNING_IDENTICAL_USERNAME_TITLE: "نام کاربری تکراری", 
        WARNING_IDENTICAL_USERNAME_BODY: "نام کاربری جدید شما باید متفاوت از نام کاربری فعلی شما باشد!", 
        WARNING_NEW_PASSWORD_MISMATCH_TITLE: "عدم تطابق امنیتی",
        WARNING_NEW_PASSWORD_MISMATCH_BODY: "رمز عبور جدید شما با تاییدیه آن مطابقت ندارد!", 
        WARNING_DELETE_PROFILE_TITLE: "هشدار دسترسی بحرانی!",
        WARNING_DELETE_PROFILE_BODY: "آیا واقعاً می‌خواهید حساب کاربری و اطلاعات خود را برای همیشه حذف کنید؟",
        WARNING_NEW_PASSWORD_TITLE: "تایید رمز عبور", 
        WARNING_NEW_PASSWORD_BODY: "لطفاً رمز عبور جدید خود را تایید کنید.", 
        WARNING_DELETE_PROJECT_TITLE: "حذف پروژه",
        WARNING_DELETE_PROJECT_BODY: "آیا مطمئن هستید که می‌خواهید این پروژه و تمام وظایف مربوط به آن را حذف کنید؟",
        WARNING_DELETE_TASK_TITLE: "حذف وظیفه",
        WARNING_DELETE_TASK_BODY: "آیا مطمئن هستید که می‌خواهید این وظیفه را حذف کنید؟",
        WARNING_DELETE_CATEGORY_TITLE: "حذف برچسب",
        WARNING_DELETE_CATEGORY_BODY_PART_1: "آیا مطمئن هستید که می‌خواهید برچسب «",
        WARNING_DELETE_CATEGORY_BODY_PART_2: "» را حذف کنید؟ این برچسب از تمام وظایف مربوطه جدا خواهد شد.",
        WARNING_REMOVE_MEMBER_TITLE: "حذف عضو تیم",
        WARNING_REMOVE_MEMBER_BODY_PART_1: "آیا مطمئن هستید که می‌خواهید کاربر ",
        WARNING_REMOVE_MEMBER_BODY_PART_2: " را از این پروژه حذف کنید؟",
        WARNING_LEAVE_PROJECT_TITLE: "خروج از پروژه",
        WARNING_LEAVE_PROJECT_BODY: "آیا واقعاً مطمئن هستید که می‌خواهید از این پروژه خارج شوید؟ دسترسی شما به این بورد کاملاً قطع خواهد شد!",

        // Danger Actions
        DANGER_FINAL_WARNING_TITLE: "اخطار نهایی",
        DANGER_FINAL_WARNING_BODY: "این عمل تمام داده‌ها و اطلاعات شما را از پایگاه داده حذف خواهد کرد. این کار غیرقابل بازگشت است. ادامه می‌دهید؟",
        DANGER_ACCESS_DENIED_TITLE: "خطای عدم دسترسی!",
        DANGER_TASK_DELETE_ACCESS_DENIED_BODY: "خطای دسترسی! فقط صاحبان پروژه اجازه حذف آیتم‌ها را دارند.",
        ERROR_GENERIC_TITLE: "خطایی رخ داد",
        ERROR_TASK_DELETE_BODY: "حذف وظیفه با خطا مواجه شد. لطفاً دوباره امتحان کنید.",
        ERROR_SOLE_OWNER_BODY: "خطایی در هنگام خروج از پروژه رخ داد! شما تنها مالک این پروژه هستید.",
        ERROR_INVITE_FAILED_BODY: "خطایی در دعوت عضو جدید رخ داد. لطفاً ایمیل را بررسی کنید.",

        // Button Layouts
        BTN_PROCEED: "ادامه",
        BTN_CANCEL: "لغو",
        BTN_CLOSE: "بستن"
    },

    PROFILE: {
        // Navigation / Headers
        ARIA_MAIN: "تنظیمات پروفایل کاربر",
        IDENTITY_TITLE: "پروفایل کاربری شما",

        // States
        SYNCING_CREDENTIALS: "در حال همگام‌سازی اعتبارات امنیتی ابری...",

        // =========================================================================
        // SECTION 1: CORE ACCOUNT DETAILS
        // =========================================================================
        CORE_ACCOUNT_ARIA: "بخش جزئیات اصلی حساب کاربری",
        SECURITY_LEVEL_LABEL: "سطح دسترسی امنیتی:",
        REGISTERED_EMAIL_LABEL: "ایمیل ثبت شده:",
        DATABASE_RECORD_LABEL: "شناسه رکورد پایگاه داده:",

        // =========================================================================
        // SECTION 2: SYSTEM ACTION METRICS
        // =========================================================================
        SYSTEM_METRICS_TITLE: "شاخص‌های عملکرد سیستم",
        ASSIGNED_ITEMS_LABEL: "وظایف محول شده",
        ASSIGNED_ITEMS_ARIA: "در حال حاضر {value} وظیفه فعال برای شما ردیابی می‌شود.",
        COMPLETED_TASKS_LABEL: "وظایف تکمیل شده",
        COMPLETED_TASKS_ARIA: "تعداد {value} وظیفه با موفقیت تکمیل و بایگانی شده است.",
        
        // =========================================================================
        // SECTION 3: WORKSPACE PREFERENCES CARD
        // =========================================================================
        WORKSPACE_TITLE: "تنظیمات محیط کاری",
        THEME_LABEL: "پوسته ظاهری برنامه:",
        THEME_ARIA: "انتخاب پوسته ظاهری محیط برنامه",

        // Theme Selector Options
        THEME_OPTION_LIGHT: "☀️ محیط کاری روشن",
        THEME_OPTION_DARK: "🌙 محیط کاری تاریک",
        THEME_OPTION_AMBER: "💽 ترمینال قدیمی CRT نارنجی",
        THEME_OPTION_MATRIX: "📟 ترمینال قدیمی CRT سبز ماتریس",
        THEME_OPTION_HC_BLACK: "🌓 کنتراست بالا (مشکی)",
        THEME_OPTION_HC_WHITE: "⬜️ کنتراست بالا (سفید)",
        THEME_OPTION_HC_BEIGE: "🏜️ کنتراست بالا (بژ کویری)",
        THEME_OPTION_WIN98: "💾 Windows 95/98 خاطره‌انگیز",
        THEME_OPTION_WINXP: "💿 Windows XP (Luna Blue) نوستالژی",
        THEME_OPTION_VISTA: "📀 Windows Vista کلاسیک",
        THEME_OPTION_WIN7: "🫧 Windows 7 کلاسیک",
        THEME_OPTION_AERO: "🍃 فروتیگر ایرو (محیط زیست سایبری)",
        THEME_OPTION_BA: "🔮 محیط کاری شاله (بلو آرکایو)",

        // Typography Interface Config
        FONT_LABEL: "سبک قلم (فونت):",
        FONT_ARIA: "منوی انتخاب قلم نوشتاری برنامه",
        FONT_DESCRIPTION: "تغییر قلم پیش‌فرض نمایش متن‌ها در کل فضای کاری برنامه",
        FONT_OPTION_DEFAULT: "پیش‌فرض پوسته انتخابی",
        FONT_OPTION_LEGI: "🧼 خوانایی بالا",
        FONT_OPTION_DYS: "📖 آسان برای خواندن (مناسب برای افراد مبتلا به نارساخوانی)",

        // Deficiency Matrix Elements
        COLORBLIND_LABEL: "فیلتر کوررنگی:",
        COLORBLIND_ARIA: "منوی انتخاب ماتریس تصحیح شبیه‌سازی فیلتر کوررنگی",
        COLORBLIND_OPTION_NONE: "بدون فیلتر",
        COLORBLIND_OPTION_PRO: "پـروتانـوپـیا (ضعف رنگ قرمز)",
        COLORBLIND_OPTION_DEU: "دوتـرانـوپـیا (ضعف رنگ سبز)",
        COLORBLIND_OPTION_TRI: "تـریتانـوپـیا (ضعف رنگ آبی)",
        COLORBLIND_OPTION_GRA: "مقیاس خاکستری (سیاه و سفید)",
        
        // =========================================================================
        // SECTION 4: ACCOUNT MANAGEMENT FORM
        // =========================================================================
        ACCOUNT_SETTINGS_TITLE: "تنظیمات مدیریت حساب کاربری",
        UPDATE_USER_LABEL: "بروزرسانی نام کاربری",
        UPDATE_USER_PLACEHOLDER: "نام کاربری جدید را وارد کنید...",
        CHANGE_PASS_LABEL: "تغییر رمز عبور امنیتی",
        CHANGE_PASS_PLACEHOLDER: "رمز عبور جدید را وارد کنید...",
        CONFIRM_PASS_LABEL: "تایید رمز عبور جدید",
        CONFIRM_PASS_PLACEHOLDER: "رمز عبور جدید را دوباره تایپ کنید...",
        PASS_REQUIREMENTS_ARIA: "رمزهای عبور باید قبل از اعمال تغییرات کاملاً با یکدیگر مطابقت داشته باشند.",
        SAVE_CHANGES_BTN_TEXT: "ذخیره تغییرات پروفایل",
        SAVE_CHANGES_BTN_ARIA: "ذخیره تغییرات پروفایل کاربری",

        // Destructive Actions Area (Danger Zone)
        DANGER_ZONE_TITLE: "منطقه خطر",
        DANGER_ZONE_WARN_TEXT: "حذف حساب کاربری باعث از بین رفتن کامل دسترسی شما به فضاهای کاری می‌شود!<br>این اقدام غیرقابل بازگشت است.",
        DANGER_ZONE_WARN_ARIA: "حذف حساب کاربری باعث از بین رفتن کامل دسترسی شما به فضاهای کاری می‌شود! این اقدام غیرقابل بازگشت است.",
        DANGER_ZONE_BTN_TEXT: "حذف دائمی حساب کاربری",
        DANGER_ZONE_BTN_ARIA: "حذف دائمی و غیرقابل بازگشت حساب کاربری از پایگاه داده"
    },
    
    LOGIN: {
        PORTAL_ARIA: "صفحه ورود و احراز هویت حساب کاربری",
        HEADER_WELCOME_BACK: "خوش آمدید",
        HEADER_FIRST_TIME: "به برنامه مدیریت وظایف خوش آمدید",
        SUBTITLE_MANAGE: "برای مدیریت پروژه‌ها و وظایف خود وارد شوید",
        CHECKBOX_REMEMBER: "مرا به خاطر بسپار",
        BTN_SIGNIN_ARIA: "ورود ایمن به سیستم مدیریت وظایف",
        BTN_SIGNIN_TEXT: "ورود به حساب",
        FOOTER_TEXT: "هنوز عضو نشده‌اید؟ ",
        FOOTER_LINK_TEXT: "ایجاد حساب کاربری جدید",
        FOOTER_LINK_ARIA: "هدایت به صفحه ایجاد حساب کاربری جدید",
        ERROR_FALLBACK: "ایمیل یا رمز عبور اشتباه است. لطفاً دوباره امتحان کنید."
    },

    REGISTER: {
        PORTAL_ARIA: "صفحه ایجاد حساب کاربری جدید",
        HEADER_TITLE: "ایجاد حساب کاربری جدید",
        SUBTITLE_JOIN: "به پلتفرم مدیریت پروژه بپیوندید!",
        LABEL_USERNAME: "نام کاربری",
        PLACEHOLDER_USERNAME: "یک نام کاربری یکتا انتخاب کنید...",
        PLACEHOLDER_PASSWORD: "یک رمز عبور امن بسازید...",
        LABEL_CONFIRM_PASSWORD: "تایید رمز عبور",
        PLACEHOLDER_CONFIRM_PASSWORD: "رمز عبور خود را دوباره وارد کنید...",
        REQUIREMENTS_ARIA: "هر دو فیلد رمز عبور باید قبل از ارسال درخواست ثبت‌نام کاملاً یکسان باشند.",
        BTN_SUBMIT_TEXT: "ثبت نام",
        BTN_SUBMIT_ARIA: "ارسال اطلاعات جهت ثبت نام حساب کاربری جدید",
        FOOTER_TEXT: "قبلاً ثبت نام کرده‌اید؟ ",
        FOOTER_LINK_TEXT: "ورود به حساب کاربری",
        FOOTER_LINK_ARIA: "هدایت به صفحه ورود به حساب کاربری"
    },

    DASHBOARD: {
        MAIN_CANVAS_LABEL: "نمای داشبورد اصلی پروژه‌ها",
        MAIN_HEADER: "فضای کاری مدیریت وظایف",
        NAV_ARIA: "لینک‌های ناوبری سریع حساب کاربری",
        PROFILE_BTN: "پروفایل کاربر",
        LOGOUT_ARIA: "خروج امن از نشست فعال حساب کاربری",
        LOGOUT_BTN: "خروج از حساب",
        CREATE_PROJECT_HEADER: "ایجاد پروژه جدید",
        PROJECT_TITLE_LABEL: "عنوان پروژه",
        PROJECT_TITLE_PLACEHOLDER: "مانند: بازسازی کامل وب‌سایت",
        DESCRIPTION_LABEL: "توضیحات پروژه",
        DESCRIPTION_PLACEHOLDER: "هدف از اجرای این پروژه را شرح دهید...",
        CREATE_BTN_TEXT: "ایجاد پروژه",
        CREATE_BTN_ARIA: "ارسال فرم جهت ایجاد فضای کاری پروژه جدید",
        YOUR_PROJECTS_HEADER: "پروژه‌های شما",
        EMPTY_MESSAGE: "پروژه‌ای یافت نشد. برای شروع یک پروژه ایجاد کنید!",

        // Dynamic localization functions to ensure perfect sentence structures across all languages
        PROJECT_CARD_ARIA: "فضای کاری پروژه: {value}",
        DELETE_PROJECT_ARIA: "حذف دائمی فضای کاری پروژه: {value}",
        NO_DESCRIPTION_FALLBACK: "توضیحاتی برای این پروژه ثبت نشده است.",
        OPEN_BOARD_TEXT: "باز کردن بورد پروژه",
        OPEN_BOARD_ARIA: "باز کردن بورد وظایف پروژه: {value}"
    },

    TASKBOARD: {
        // Header / Navigation & Modal Buttons
        MAIN_CANVAS_ARIA: "نمای بورد وظایف پروژه برای: {title}",
        HEADER_TITLE: "بورد پروژه ({title})",
        HEADER_ABANDON_TEXT: "ترک فضای پروژه",
        HEADER_ABANDON_ARIA: "ترک کامل و دائم فضای کاری این پروژه",
        HEADER_CREATE_TAG_TEXT: "ایجاد برچسب",
        HEADER_CREATE_TAG_ARIA: "باز کردن پنجره ایجاد برچسب دسته‌بندی جدید پروژه",
        HEADER_CREATE_TASK_TEXT: "افزودن وظیفه جدید",
        HEADER_CREATE_TASK_ARIA: "باز کردن پنجره افزودن کارت وظیفه جدید به پروژه",

        // Task Crew & Invitation
        CREW_PANEL_HEADER: "مدیریت اعضای تیم و برچسب‌های پروژه",
        INVITE_FORM_ARIA: "فرم دعوت عضو جدید به تیم پروژه",
        INVITE_PLACEHOLDER: "آدرس ایمیل هم‌تیمی خود را وارد کنید...",
        INVITE_INPUT_ARIA: "فیلد ورود ایمیل هم‌تیمی",
        INVITE_ROLE_ARIA: "انتخاب سطح دسترسی امنیتی عضو در پروژه",
        INVITE_OPTION_MEMBER: "عضو عادی",
        INVITE_OPTION_VIEWER: "مهمان",
        INVITE_OPTION_OWNER: "مالک مشترک / مدیر سیستم",
        INVITE_SUBMIT_ARIA: "ارسال درخواست دعوت به پروژه",
        INVITE_SUBMIT_BTN: "افزودن عضو",
        ROSTER_HEADER: "اعضای فعلی تیم پروژه",
        ROSTER_BADGE_ARIA: "نقش محول شده: {role}",
        ROSTER_REMOVE_ARIA: "حذف کاربر {email} از لیست اعضای تیم پروژه",

        // Tags/Categories
        TAGS_HEADER: "برچسب‌های موجود در پروژه",
        TAGS_FALLBACK: "هنوز برچسب اختصاصی برای این پروژه ایجاد نشده است.",
        TAGS_PILL_ARIA: "برچسب: {value1} با {value2} وظیفۀ متصل",
        TAG_DELETE_ARIA: "حذف دائمی برچسب پروژه: {name}",

        // Filters & Progress Bar
        SEARCH_FILTER_HUB_ARIA: "بخش ابزارهای فیلترینگ و جستجوی بورد وظایف",
        SEARCH_PLACEHOLDER: "جستجوی وظایف...",
        SEARCH_ARIA: "فیلتر کردن وظایف بر اساس کلمه کلیدی عنوان",
        PRIORITY_ARIA: "فیلتر کردن وظایف بر اساس سطح اولویت بندی شده",
        PRIORITY_ALL: "همه اولویت‌ها",
        PRIORITY_HIGH: "اولویت بالا",
        PRIORITY_MEDIUM: "اولویت متوسط",
        PRIORITY_LOW: "اولویت پایین",
        CATEGORY_ARIA: "فیلتر کردن وظایف بر اساس برچسب متصل شده",
        CATEGORY_ALL: "همه برچسب‌ها",
        CATEGORY_UNASSIGNED: "وظایف بدون برچسب",
        PROGRESS_LABEL: "میزان پیشرفت پروژه:",
        PROGRESS_ARIA: "شاخص کل پیشرفت پروژه. در حال حاضر {value} درصد.",

        // Mobile Column Selector
        MOBILE_TABS_ARIA: "ستون‌های بورد وظایف در نمای موبایل",
        MOBILE_TAB_PENDING_TEXT: "در انتظار",
        MOBILE_TAB_PENDING_ARIA: "نمایش ستون وظایف در انتظار",
        MOBILE_TAB_PROGRESS_TEXT: "در حال اجرا و بررسی",
        MOBILE_TAB_PROGRESS_ARIA: "نمایش ستون وظایف در حال اجرا و در انتظار بررسی مدیر",
        MOBILE_TAB_COMPLETED_TEXT: "تکمیل شده",
        MOBILE_TAB_COMPLETED_ARIA: "نمایش ستون وظایف تکمیل و بایگانی شده",

        // =========================================================================
        // Pending Column
        // =========================================================================
        COLUMN_PENDING_TITLE: "در انتظار ({value})",
        LANE_PENDING_ARIA: "ستون ردیابی وظایف در انتظار بررسی. شامل {value} آیتم.",
        TASK_CARD_ARIA: "کارت وظیفه: {value}",
        TASK_CARD_CATEGORY_ARIA: "برچسب این کارت: {value}",
        TASK_DELETE_ARIA: "حذف کارت وظیفه: {value}",
        TASK_DESCRIPTION_FALLBACK: "جزئیاتی برای این وظیفه ثبت نشده است.",
        
        // Task Assignee
        TASK_ASSIGNEE_LABEL: "مسئول وظیفه:",
        TASK_ASSIGNEE_ARIA: "تعیین مسئول تیم برای انجام وظیفه {value}",
        TASK_ASSIGNEE_UNASSIGNED: "بدون مسئول",
        
        // Task Tag/Category
        TASK_CATEGORY_LABEL: "برچسب:",
        TASK_CATEGORY_ARIA_ASSIGN: "اتصال برچسب دسته‌بندی به وظیفه {value}",
        TASK_CATEGORY_NONE: "بدون برچسب",

        // Task Priority
        TASK_PRIORITY_ARIA: "سطح اولویت: {value}",
        TASK_PRIORITY_HIGH: "بالا",
        TASK_PRIORITY_MEDIUM: "متوسط",
        TASK_PRIORITY_LOW: "پایین",
        TASK_DEADLINE_ARIA: "تاریخ مهلت انجام وظیفه: {value}",

        // Start Button
        TASK_ACTION_START_TEXT: "شروع کار",
        TASK_ACTION_START_ARIA: "شروع کار روی وظیفه: {value}. انتقال وظیفه  به ستون در حال اجرا.",
    
        // =========================================================================
        // In-Progress & Review Column
        // =========================================================================
        COLUMN_INPROGRESS_TITLE: "در حال اجرا و بررسی ({value})",
        LANE_INPROGRESS_ARIA: "ستون ردیابی وظایف در حال اجرا و تایید. شامل {value} آیتم.",
        TASK_CARD_STATUS_ARIA: "کارت وظیفه: {value1}. وضعیت فعلی: {value2}",
        REVIEW_BANNER_TEXT: "در انتظار بررسی مدیر پروژه",
        REVIEW_BANNER_ARIA: "هشدار: وظیفه {value} در انتظار تایید نهایی مدیر پروژه است.",

        // Related Buttons
        BTN_BACK_TEXT: "بازگشت",
        BTN_BACK_ARIA: "انتقال معکوس وظیفه {value} به ستون در انتظار",
        BTN_SUBMIT_REVIEW_TEXT: "ارسال برای بررسی",
        BTN_SUBMIT_REVIEW_ARIA: "ارسال وظیفه {value} جهت بررسی و تایید مدیر پروژه",
        BTN_CANCEL_REVIEW_TEXT: "لغو درخواست بررسی",
        BTN_CANCEL_REVIEW_ARIA: "لغو درخواست بررسی و بازگرداندن وظیفه {value} به وضعیت در حال اجرا",
        BTN_REJECT_TEXT: "رد تایید",
        BTN_REJECT_ARIA: "رد درخواست تایید و بازگرداندن وظیفه {value} به جریان کار",
        BTN_APPROVE_TEXT: "تایید نهایی وظیفه",
        BTN_APPROVE_ARIA: "تایید نهایی بررسی و انتقال وظیفه {value} به ستون تکمیل شده",

        // =========================================================================
        // Completed Column
        // =========================================================================
        COLUMN_COMPLETED_TITLE: "تکمیل شده ({value})",
        LANE_COMPLETED_ARIA: "ستون آرشیو وظایف تکمیل شده. شامل {value} آیتم پایان یافته.",
        TASK_CARD_COMPLETED_ARIA: "کارت وظیفه تکمیل شده: {value}",
        BADGE_DONE_TEXT: "انجام شد",
        BADGE_DONE_ARIA: "وضعیت نهایی کار: انجام شد",
        FINISHED_ASSIGNEE_ARIA: "مسئول انجام‌دهنده وظیفه پایان یافته {value}",
        FINISHED_CATEGORY_ARIA: "برچسب دسته‌بندی وظیفه پایان یافته {value}",
        FINISHED_PRIORITY_ARIA: "اولویت اصلی وظیفه: {value}",
        
        // Related Button
        REOPEN_TEXT: "بازگشایی مجدد",
        REOPEN_ARIA: "بازگشایی مجدد وظیفه: {value}. انتقال مجدد کارت به ستون جریان کار در حال اجرا.",

        // Create a new Task Modal
        MODAL_TASK_HEADER_TEXT: "مشخصات وظیفه جدید پروژه",
        MODAL_TASK_HEADER_ARIA: "مشخصات وظیفه جدید پروژه",
        MODAL_TASK_TITLE_LABEL: "عنوان وظیفه",
        MODAL_TASK_TITLE_PLACEHOLDER: "مانند: طراحی پایگاه داده",
        MODAL_TASK_DESC_LABEL: "توضیحات و جزئیات انجام",
        MODAL_TASK_DESC_PLACEHOLDER: "جزئیات قابل اجرا را بنویسید...",
        MODAL_TASK_PRIORITY_LABEL: "سطح اولویت کار",
        MODAL_TASK_DEADLINE_LABEL: "مهلت انجام",
        MODAL_TASK_DEADLINE_KEYBOARD_ARIA: "راهنمای صفحه کلید: برای خروج از تقویم کلید Tab یا Escape را فشار دهید.",
        MODAL_TASK_DEADLINE_INPUT_ARIA: "فیلد تعیین تاریخ نهایی اتمام وظیفه.",
        MODAL_TASK_CANCEL_BTN: "انصراف",
        MODAL_TASK_CANCEL_ARIA: "بستن پنجره فرم مشخصات وظیفه جدید",
        MODAL_TASK_SUBMIT_BTN: "ایجاد وظیفه",
        MODAL_TASK_SUBMIT_ARIA: "تایید داده‌ها جهت ایجاد کارت وظیفه جدید در پروژه",
    
        // Create a new Tag/Category Modal
        MODAL_TAG_HEADER: "ایجاد برچسب فضای کاری جدید",
        MODAL_TAG_NAME_LABEL: "نام برچسب:",
        MODAL_TAG_NAME_PLACEHOLDER: "مانند: فرانت‌اند، تست سیستم، خطایابی...",
        MODAL_TAG_COLOR_LABEL: "رنگ تم برچسب:",
        MODAL_TAG_COLOR_ARIA: "منوی انتخاب رنگ پس‌زمینه برچسب جهت ردیابی بصری",

        // Color Selection Text Items 
        MODAL_TAG_COLOR_RED: "قرمز یاقوتی (کنتراست بالا)",
        MODAL_TAG_COLOR_BLUE: "آبی الکتریکی (کنتراست بالا)",
        MODAL_TAG_COLOR_GREEN: "سبز جنگلی (کنتراست بالا)",
        MODAL_TAG_COLOR_ORANGE: "نارنجی تیره (کنتراست بالا)",
        MODAL_TAG_COLOR_PURPLE: "بنفش سلطنتی (کنتراست بالا)",

        MODAL_TAG_CANCEL_BTN: "انصراف",
        MODAL_TAG_CANCEL_ARIA: "بستن فرم ایجاد برچسب جدید پروژه",
        MODAL_TAG_SUBMIT_BTN: "ایجاد برچسب",
        MODAL_TAG_SUBMIT_ARIA: "تایید مشخصات جهت ایجاد برچسب دسته‌بندی جدید"
    }
};