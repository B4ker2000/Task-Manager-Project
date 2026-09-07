import { LocalePack } from './locale-pack.interface';

export const RussianPack: LocalePack = {
    GLOBAL: {
        GENERIC_LOADING: "Загрузка...",
        BACK_BTN_TEXT: "Назад к рабочей области",
        BACK_BTN_ARIA: "Вернуться на главную панель задач",

        // Dynamic Date Formatting Pattern (US Standard)
        DATE_FORMAT: "dd.MM.yyyy",

        // Email & Password Fields
        FIELD_EMAIL: "Адрес электронной почты",
        PLACEHOLDER_EMAIL: "Введите ваш email...",
        FIELD_PASSWORD: "Пароль",
        PLACEHOLDER_PASSWORD: "Введите пароль...",

        // Footer Navigation Links
        FOOTER_NAV_ARIA: "Альтернативная ссылка для входа",

        // Eye Toggle Accessibility Script Targets
        SHOW_PASS_ARIA: "Показать пароль",
        HIDE_PASS_ARIA: "Скрыть пароль",
        SHOW_CONFIRM_ARIA: "Показать пароль подтверждения",
        HIDE_CONFIRM_ARIA: "Скрыть пароль подтверждения",
        
        // Language Selection Configuration
        LANGUAGE_SELECTION_TITLE: "Язык приложения:",
        LANGUAGE_SELECTION_ARIA: "Выбор языка интерфейса",
        LANGUAGE_OPTION_EN_US: "American English (Американский Английский)",
        LANGUAGE_OPTION_EN_UK: "British English (Британский Английский)",
        LANGUAGE_OPTION_JP: "日本語 (Японский)",
        LANGUAGE_OPTION_RU: "Русский",

        // Language direction format
        DIRECTION: "ltr"
    },

    POPUP: {
        // Success Actions
        SUCCESS_PROFILE_REMOVED_TITLE: "Профиль удален",
        SUCCESS_PROFILE_REMOVED_BODY: "Ваш профиль пользователя был успешно удален.",
        SUCCESS_USER_INFO_UPDATED_TITLE: "Профиль обновлен",
        SUCCESS_USER_INFO_UPDATED_BODY: "Данные учетной записи успешно изменены.",
        SUCCESS_TASK_CREATED: "Задача успешно создана!",
        SUCCESS_TAG_CREATED: "Категория успешно привязана к задаче!",

        // Warning Actions
        WARNING_EMPTY_FIELDS_TITLE: "Пустые поля",
        WARNING_EMPTY_FIELDS_BODY: "Пожалуйста, заполните хотя бы одно поле для обновления профиля!", 
        WARNING_IDENTICAL_USERNAME_TITLE: "Имя пользователя совпадает", 
        WARNING_IDENTICAL_USERNAME_BODY: "Новое имя пользователя должно отличаться от текущего!", 
        WARNING_NEW_PASSWORD_MISMATCH_TITLE: "Несовпадение паролей",
        WARNING_NEW_PASSWORD_MISMATCH_BODY: "Введенные новые пароли не совпадают.", 
        WARNING_DELETE_PROFILE_TITLE: "КРИТИЧЕСКОЕ ПРЕДУПРЕЖДЕНИЕ!",
        WARNING_DELETE_PROFILE_BODY: "Вы уверены, что хотите навсегда удалить свой профиль?",
        WARNING_NEW_PASSWORD_TITLE: "Подтверждение пароля", 
        WARNING_NEW_PASSWORD_BODY: "Пожалуйста, подтвердите ваш новый пароль безопасности.", 
        WARNING_DELETE_PROJECT_TITLE: "Удаление проекта",
        WARNING_DELETE_PROJECT_BODY: "Вы уверены, что хотите удалить этот проект и все связанные с ним задачи?",
        WARNING_DELETE_TASK_TITLE: "Удаление задачи",
        WARNING_DELETE_TASK_BODY: "Вы уверены, что хотите полностью удалить эту задачу?",
        WARNING_DELETE_CATEGORY_TITLE: "Удаление тега",
        WARNING_DELETE_CATEGORY_BODY_PART_1: "Вы уверены, что хотите навсегда удалить тег ",
        WARNING_DELETE_CATEGORY_BODY_PART_2: "? Он будет убран из всех связанных задач.",
        WARNING_REMOVE_MEMBER_TITLE: "Исключение из команды",
        WARNING_REMOVE_MEMBER_BODY_PART_1: "Вы уверены, что хотите удалить пользователя ",
        WARNING_REMOVE_MEMBER_BODY_PART_2: " из рабочего пространства этого проекта?",
        WARNING_LEAVE_PROJECT_TITLE: "Выход из проекта",
        WARNING_LEAVE_PROJECT_BODY: "Вы абсолютно уверены, что хотите покинуть этот проект? Вы полностью потеряете доступ к этой доске задач!",

        // Danger Actions
        DANGER_FINAL_WARNING_TITLE: "ПОСЛЕДНЕЕ ПРЕДУПРЕЖДЕНИЕ",
        DANGER_FINAL_WARNING_BODY: "Это действие полностью сотрет все ваши записи из базы данных системы. Это действие нельзя отменить. Продолжить?",
        DANGER_ACCESS_DENIED_TITLE: "Доступ запрещен!",
        DANGER_TASK_DELETE_ACCESS_DENIED_BODY: "Только создатель проекта имеет разрешение на удаление рабочих элементов.",
        ERROR_GENERIC_TITLE: "Произошла ошибка",
        ERROR_TASK_DELETE_BODY: "Не удалось завершить удаление задачи. Пожалуйста, попробуйте еще раз.",
        ERROR_SOLE_OWNER_BODY: "Не удалось выйти из проекта. Назначьте другого владельца перед уходом.",
        ERROR_INVITE_FAILED_BODY: "Не удалось пригласить пользователя. Пожалуйста, проверьте корректность آدرس электронной почты.",

        // Button Layouts
        BTN_PROCEED: "Продолжить",
        BTN_CANCEL: "Отмена",
        BTN_CLOSE: "Закрыть"
    },

    PROFILE: {
        // Navigation / Headers
        ARIA_MAIN: "Настройки профиля пользователя",
        IDENTITY_TITLE: "Ваш рабочий профиль",

        // States
        SYNCING_CREDENTIALS: "Синхронизация учетных данных с облаком...",
        
        // =========================================================================
        // SECTION 1: CORE ACCOUNT DETAILS
        // =========================================================================
        CORE_ACCOUNT_ARIA: "Основные данные учетной записи",
        SECURITY_LEVEL_LABEL: "Уровень доступа:",
        REGISTERED_EMAIL_LABEL: "Зарегистрированный Email:",
        DATABASE_RECORD_LABEL: "Идентификатор записи базы данных:",
        
        // =========================================================================
        // SECTION 2: SYSTEM ACTION METRICS
        // =========================================================================
        SYSTEM_METRICS_TITLE: "Метрики системных действий",
        ASSIGNED_ITEMS_LABEL: "Назначенные рабочие элементы",
        ASSIGNED_ITEMS_ARIA: "В настоящее время отслеживается задач в рабочей области: {value}.",
        COMPLETED_TASKS_LABEL: "Выполненные задачи",
        COMPLETED_TASKS_ARIA: "Количество успешно завершенных и архивированных задач проекта: {value}.",
        
        // =========================================================================
        // SECTION 3: WORKSPACE PREFERENCES CARD
        // =========================================================================
        WORKSPACE_TITLE: "Настройки рабочей среды",
        THEME_LABEL: "Визуальная тема приложения:",
        THEME_ARIA: "Выбор визуальной темы приложения",

        // Theme Selector Options
        THEME_OPTION_LIGHT: "☀️ Профессиональный светлый режим",
        THEME_OPTION_DARK: "🌙 Темный холст рабочей области",
        THEME_OPTION_AMBER: "💽 Винтажный янтарный ЭЛТ-терминал",
        THEME_OPTION_MATRIX: "📟 Винтажный зеленый ЭЛТ-терминал",
        THEME_OPTION_HC_BLACK: "🌓 Высокая контрастность (Черная)",
        THEME_OPTION_HC_WHITE: "⬜️ Высокая контрастность (Белая)",
        THEME_OPTION_HC_BEIGE: "🏜️ Высокая контрастность (Бежевая пустыня)",
        THEME_OPTION_WIN98: "💾 Ретро Windows 95/98",
        THEME_OPTION_WINXP: "💿 Ностальгическая Windows XP (Luna Blue)",
        THEME_OPTION_VISTA: "📀 Классическая Windows Vista",
        THEME_OPTION_WIN7: "🫧 Классическая Windows 7",
        THEME_OPTION_AERO: "🍃 Frutiger Aero (Эко-Кибер)",
        THEME_OPTION_BA: "🔮 Тема Шале (Blue Archive)",

        // Typography Interface Config
        FONT_LABEL: "Стиль шрифта:",
        FONT_ARIA: "Выбор шрифта интерфейса",
        FONT_DESCRIPTION: "Изменяет шрифт отображения текста по умолчанию в рабочей области",
        FONT_OPTION_DEFAULT: "По умолчанию",
        FONT_OPTION_LEGI: "🧼 Шрифт высокой читаемости",
        FONT_OPTION_DYS: "📖 Удобный для чтения (при дислексии)",

        // Deficiency Matrix Elements
        COLORBLIND_LABEL: "Цветовой фильтр:",
        COLORBLIND_ARIA: "Выбор фильтра цветокоррекции",
        COLORBLIND_OPTION_NONE: "Нет",
        COLORBLIND_OPTION_DEU: "Дейтеранопия (сниженное восприятие зеленого)",
        COLORBLIND_OPTION_PRO: "Протанопия (сниженное восприятие красного)",
        COLORBLIND_OPTION_TRI: "Тританопия (сниженное восприятие синего)",
        COLORBLIND_OPTION_GRA: "Оттенки серого (Монохромный)",
        
        // =========================================================================
        // SECTION 4: ACCOUNT MANAGEMENT FORM
        // =========================================================================
        ACCOUNT_SETTINGS_TITLE: "Управление учетной записью",
        UPDATE_USER_LABEL: "Обновить имя пользователя",
        UPDATE_USER_PLACEHOLDER: "Введите новое имя пользователя...",
        CHANGE_PASS_LABEL: "Изменить пароль безопасности",
        CHANGE_PASS_PLACEHOLDER: "Введите новый пароль...",
        CONFIRM_PASS_LABEL: "Подтвердите новый пароль",
        CONFIRM_PASS_PLACEHOLDER: "Повторите новый пароль...",
        PASS_REQUIREMENTS_ARIA: "Пароли должны совпадать перед безопасным сохранением изменений",
        SAVE_CHANGES_BTN_TEXT: "Сохранить изменения профиля",
        SAVE_CHANGES_BTN_ARIA: "Сохранить изменения профиля",

        // Destructive Actions Area (Danger Zone)
        DANGER_ZONE_TITLE: "Опасная зона",
        DANGER_ZONE_WARN_TEXT: "Удаление учетной записи полностью очистит ваш рабочий профиль!<br>Это действие необратимо.",
        DANGER_ZONE_WARN_ARIA: "Удаление учетной записи полностью очистит ваш рабочий профиль! Это действие необратимо.",
        DANGER_ZONE_BTN_TEXT: "Безвозвратно удалить аккаунт",
        DANGER_ZONE_BTN_ARIA: "Безвозвратно удалить аккаунт"
    },

    LOGIN: {
        PORTAL_ARIA: "Портал аутентификации аккаунта",
        HEADER_WELCOME_BACK: "С возвращением",
        HEADER_FIRST_TIME: "Добро пожаловать в Менеджер задач",
        SUBTITLE_MANAGE: "Войдите в систему для управления проектами и задачами",
        CHECKBOX_REMEMBER: "Запомнить меня",
        BTN_SIGNIN_ARIA: "Безопасный вход в рабочую область",
        BTN_SIGNIN_TEXT: "Войти",
        FOOTER_TEXT: "Впервые в рабочей области? ",
        FOOTER_LINK_TEXT: "Создать новый аккаунт",
        FOOTER_LINK_ARIA: "Создать новый аккаунт",
        ERROR_FALLBACK: "Неверный адрес электронной почты или пароль. Пожалуйста, попробуйте еще раз."
    },

    REGISTER: {
        PORTAL_ARIA: "Портал создания учетной записи",
        HEADER_TITLE: "Создать рабочий аккаунт",
        SUBTITLE_JOIN: "Присоединяйтесь к платформе управления проектами!",
        LABEL_USERNAME: "Имя пользователя",
        PLACEHOLDER_USERNAME: "Выберите уникальное отображаемое имя...",
        PLACEHOLDER_PASSWORD: "Создайте надежный пароль...",
        LABEL_CONFIRM_PASSWORD: "Подтверждение пароля",
        PLACEHOLDER_CONFIRM_PASSWORD: "Введите пароль еще раз...",
        REQUIREMENTS_ARIA: "Оба поля пароля должны точно совпадать перед отправкой запроса на регистрацию",
        BTN_SUBMIT_TEXT: "Зарегистрироваться",
        BTN_SUBMIT_ARIA: "Отправить учетные данные для регистрации нового аккаунта",
        FOOTER_TEXT: "Уже есть аккаунт? ",
        FOOTER_LINK_TEXT: "Вернуться ко входу",
        FOOTER_LINK_ARIA: "Вернуться ко входу"
    },

    DASHBOARD: {
        MAIN_CANVAS_LABEL: "Основная панель управления проектами",
        MAIN_HEADER: "Рабочая область Менеджера задач",
        NAV_ARIA: "Быстрые ссылки навигации по аккаунту",
        PROFILE_BTN: "Профиль пользователя",
        LOGOUT_ARIA: "Безопасный выход из текущей рабочей сессии",
        LOGOUT_BTN: "Выйти",
        CREATE_PROJECT_HEADER: "Создать новый проект",
        PROJECT_TITLE_LABEL: "Название проекта",
        PROJECT_TITLE_PLACEHOLDER: "Например, Обновление веб-сайта",
        DESCRIPTION_LABEL: "Описание",
        DESCRIPTION_PLACEHOLDER: "Опишите цель проекта...",
        CREATE_BTN_TEXT: "Создать проект",
        CREATE_BTN_ARIA: "Отправить форму для создания нового пространства проекта",
        YOUR_PROJECTS_HEADER: "Ваши проекты",
        EMPTY_MESSAGE: "Проекты не найдены. Создайте новый проект, чтобы начать работу!",

        // Dynamic localization functions to ensure perfect sentence structures across all languages
        PROJECT_CARD_ARIA: "Пространство проекта: {value}",
        DELETE_PROJECT_ARIA: "Безвозвратно удалить проект: {value}",
        NO_DESCRIPTION_FALLBACK: "Описание отсутствует.",
        OPEN_BOARD_TEXT: "Открыть доску проекта",
        OPEN_BOARD_ARIA: "Открыть доску задач для проекта: {value}"
    },

    TASKBOARD: {
        // Header / Navigation & Modal Buttons
        MAIN_CANVAS_ARIA: "Доска задач проекта: {value}",
        HEADER_TITLE: "Доска проекта ({value})",
        HEADER_ABANDON_TEXT: "Покинуть пространство",
        HEADER_ABANDON_ARIA: "Полностью покинуть это рабочее пространство проекта",
        HEADER_CREATE_TAG_TEXT: "Создать тег пространства",
        HEADER_CREATE_TAG_ARIA: "Открыть модальное окно для создания нового тега рабочей области",
        HEADER_CREATE_TASK_TEXT: "Добавить задачу",
        HEADER_CREATE_TASK_ARIA: "Открыть модальное окно для добавления новой задачи",

        // Task Crew & Invitation
        CREW_PANEL_HEADER: "Рабочая область управления командой и тегами проекта",
        INVITE_FORM_ARIA: "Пригласить нового участника команды в это пространство",
        INVITE_PLACEHOLDER: "Введите зарегистрированный email участника...",
        INVITE_INPUT_ARIA: "Поле ввода адреса электронной почты участника",
        INVITE_ROLE_ARIA: "Назначенный уровень административного доступа к проекту",
        INVITE_OPTION_MEMBER: "Обычный участник",
        INVITE_OPTION_VIEWER: "Только для чтения (Наблюдатель)",
        INVITE_OPTION_OWNER: "Совладелец / Админ",
        INVITE_SUBMIT_ARIA: "Отправить запрос на добавление участника",
        INVITE_SUBMIT_BTN: "Добавить участника",
        ROSTER_HEADER: "Текущий состав команды",
        ROSTER_BADGE_ARIA: "Назначенная роль: {value}",
        ROSTER_REMOVE_ARIA: "Удалить пользователя {value} из команды проекта",

        // Tags/Categories
        TAGS_HEADER: "Доступные теги проекта",
        TAGS_FALLBACK: "Для этого проекта еще не создано ни одного тега",
        TAGS_PILL_ARIA: "Тег: {value1}. Количество назначенных элементов: {value2}",
        TAG_DELETE_ARIA: "Безвозвратно удалить тег проекта: {value}",

        // Filters & Progress Bar
        SEARCH_FILTER_HUB_ARIA: "Центр фильтрации задач на доске",
        SEARCH_PLACEHOLDER: "Поиск задач по названию...",
        SEARCH_ARIA: "Фильтрация задач по ключевому слову в названии",
        PRIORITY_ARIA: "Фильтрация задач по назначенному уровню приоритета",
        PRIORITY_ALL: "Все приоритеты",
        PRIORITY_HIGH: "Высокий приоритет",
        PRIORITY_MEDIUM: "Средний приоритет",
        PRIORITY_LOW: "Низкий приоритет",
        CATEGORY_ARIA: "Фильтрация задач по активному тегу категории",
        CATEGORY_ALL: "Все теги",
        CATEGORY_UNASSIGNED: "Задачи без категории",
        PROGRESS_LABEL: "Прогресс выполнения проекта:",
        PROGRESS_ARIA: "Общий трекер выполнения проекта. Прогресс: {value}%.",

        // Mobile Column Selector
        MOBILE_TABS_ARIA: "Переключение колонок доски на мобильных устройствах",
        MOBILE_TAB_PENDING_TEXT: "В ожидании",
        MOBILE_TAB_PENDING_ARIA: "Показать колонку задач в ожидании",
        MOBILE_TAB_PROGRESS_TEXT: "В работе и ревью",
        MOBILE_TAB_PROGRESS_ARIA: "Показать колонку задач в работе и на проверке",
        MOBILE_TAB_COMPLETED_TEXT: "Завершено",
        MOBILE_TAB_COMPLETED_ARIA: "Показать колонку завершенных задач",

        // =========================================================================
        // Pending Column (В ожидании)
        // =========================================================================
        COLUMN_PENDING_TITLE: "В ожидании ({value})",
        LANE_PENDING_ARIA: "Дорожка отслеживания задач в ожидании. Содержит элементов: {value}.",
        TASK_CARD_ARIA: "Карточка задачи: {value}",
        TASK_CARD_CATEGORY_ARIA: "Назначенный тег категории: {value}",
        TASK_DELETE_ARIA: "Удалить карточку задачи: {value}",
        TASK_DESCRIPTION_FALLBACK: "Описание отсутствует.",
        
        // Task Assignee
        TASK_ASSIGNEE_LABEL: "Исполнитель:",
        TASK_ASSIGNEE_ARIA: "Назначить сотрудника на задачу {value}",
        TASK_ASSIGNEE_UNASSIGNED: "Не назначено",
        
        // Task Tag/Category
        TASK_CATEGORY_LABEL: "Категория:",
        TASK_CATEGORY_ARIA_ASSIGN: "Назначить классификационный тег для задачи {value}",
        TASK_CATEGORY_NONE: "Без категории",

        // Task Priority
        TASK_PRIORITY_ARIA: "Уровень приоритета: {value}",
        TASK_PRIORITY_HIGH: "Высокий",
        TASK_PRIORITY_MEDIUM: "Средний",
        TASK_PRIORITY_LOW: "Низкий",
        TASK_DEADLINE_ARIA: "Календарная дата дедлайна задачи: {value}",

        // Start Button
        TASK_ACTION_START_TEXT: "Начать",
        TASK_ACTION_START_ARIA: "Начать выполнение задачи: {value}. Перемещает карточку в колонку задач в работе.",
    
        // =========================================================================
        // In-Progress & Review Column (В работе и ревью)
        // =========================================================================
        COLUMN_INPROGRESS_TITLE: "В работе и ревью ({value})",
        LANE_INPROGRESS_ARIA: "Дорожка отслеживания задач в работе и на проверке. Содержит элементов: {value}.",
        TASK_CARD_STATUS_ARIA: "Карточка задачи: {value1}. Текущий статус: {value2}",
        REVIEW_BANNER_TEXT: "Ожидает проверки PM",
        REVIEW_BANNER_ARIA: "Внимание: {value} ожидает проверочного обзора менеджером проекта.",

        // Related Buttons
        BTN_BACK_TEXT: "Назад",
        BTN_BACK_ARIA: "Переместить {value} назад в колонку ожидания",
        BTN_SUBMIT_REVIEW_TEXT: "На проверку",
        BTN_SUBMIT_REVIEW_ARIA: "Отправить {value} на проверку менеджеру проекта",
        BTN_CANCEL_REVIEW_TEXT: "Отменить запрос",
        BTN_CANCEL_REVIEW_ARIA: "Отменить запрос на проверку и вернуть {value} в работу",
        BTN_REJECT_TEXT: "Отклонить",
        BTN_REJECT_ARIA: "Отклонить запрос на проверку и вернуть {value} в процесс работы",
        BTN_APPROVE_TEXT: "Одобрить задачу",
        BTN_APPROVE_ARIA: "Одобрить проверку и перевести {value} в колонку завершенных",

        // =========================================================================
        // Completed Column (Завершено)
        // =========================================================================
        COLUMN_COMPLETED_TITLE: "Завершено ({value})",
        LANE_COMPLETED_ARIA: "Архивная дорожка завершенных задач. Содержит готовых элементов: {value}.",
        TASK_CARD_COMPLETED_ARIA: "Карточка завершенной задачи: {value}",
        BADGE_DONE_TEXT: "Готово",
        BADGE_DONE_ARIA: "Состояние задачи: Выполнено",
        FINISHED_ASSIGNEE_ARIA: "Назначенный сотрудник для завершенной задачи {value}",
        FINISHED_CATEGORY_ARIA: "Классификационная категория для завершенной задачи {value}",
        FINISHED_PRIORITY_ARIA: "Исходный уровень приоритета: {value}",
        
        // Related Button
        REOPEN_TEXT: "Переоткрыть",
        REOPEN_ARIA: "Переоткрыть задачу {value}. Возвращает карточку обратно в колонку задач в работе.",

        // Create a new Task Modal
        MODAL_TASK_HEADER_TEXT: "Создание спецификации новой задачи",
        MODAL_TASK_HEADER_ARIA: "Создание спецификации новой задачи",
        MODAL_TASK_TITLE_LABEL: "Название задачи *",
        MODAL_TASK_TITLE_PLACEHOLDER: "Например, Проектирование схемы БД",
        MODAL_TASK_DESC_LABEL: "Описание",
        MODAL_TASK_DESC_PLACEHOLDER: "Укажите практические детали...",
        MODAL_TASK_PRIORITY_LABEL: "Уровень приоритета",
        MODAL_TASK_DEADLINE_LABEL: "Срок выполнения",
        MODAL_TASK_DEADLINE_KEYBOARD_ARIA: "Примечание для клавиатуры: Нажмите Tab или Escape, чтобы выйти из календаря",
        MODAL_TASK_DEADLINE_INPUT_ARIA: "Установленная календарная дата завершения",
        MODAL_TASK_CANCEL_BTN: "Отмена",
        MODAL_TASK_CANCEL_ARIA: "Закрыть форму добавления спецификации задачи",
        MODAL_TASK_SUBMIT_BTN: "Создать задачу",
        MODAL_TASK_SUBMIT_ARIA: "Создать новую задачу",
    
        // Create a new Tag/Category Modal
        MODAL_TAG_HEADER: "Создать новый тег пространства",
        MODAL_TAG_NAME_LABEL: "Название тега:",
        MODAL_TAG_NAME_PLACEHOLDER: "Например, Фронтенд, Тестирование, Баг...",
        MODAL_TAG_COLOR_LABEL: "Цветовая тема тега:",
        MODAL_TAG_COLOR_ARIA: "Выберите цвет фона для значка категории из палитры",

        // Color Selection Text Items 
        MODAL_TAG_COLOR_RED: "Малиново-красный (Высокий контраст)",
        MODAL_TAG_COLOR_BLUE: "Ярко-синий (Высокий контраст)",
        MODAL_TAG_COLOR_GREEN: "Лесной зеленый (Высокий контраст)",
        MODAL_TAG_COLOR_ORANGE: "Насыщенный оранжевый (Высокий контраст)",
        MODAL_TAG_COLOR_PURPLE: "Королевский пурпурный (Высокий контраст)",

        MODAL_TAG_CANCEL_BTN: "Отмена",
        MODAL_TAG_CANCEL_ARIA: "Закрыть форму создания тега рабочей области",
        MODAL_TAG_SUBMIT_BTN: "Создать тег",
        MODAL_TAG_SUBMIT_ARIA: "Создать новый тег"
    }
};