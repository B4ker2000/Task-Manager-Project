import { LocalePack } from './locale-pack.interface';

export const JapanesePack: LocalePack = {
    GLOBAL: {
        BACK_BTN_TEXT: "← ダッシュボードに<ruby>戻<rt>もど</rt>る</ruby>",
        BACK_BTN_ARIA: "ダッシュボードに戻る",

        // Email & Password Fields
        FIELD_EMAIL: "メールアドレス",
        PLACEHOLDER_EMAIL: "メールアドレスを入力...",
        FIELD_PASSWORD: "パスワード",
        PLACEHOLDER_PASSWORD: "パスワードを入力...",

        // Footer Navigation Aria
        FOOTER_NAV_ARIA: "別のアカウント作成リンク",

        // Eye Toggle Accessibility Script Targets
        SHOW_PASS_ARIA: "パスワードを表示する",
        HIDE_PASS_ARIA: "パスワードを非表示にする",
        SHOW_CONFIRM_ARIA: "確認用パスワードを表示する",
        HIDE_CONFIRM_ARIA: "確認用パスワードを非表示にする",

        // Language Selection Configuration
        LANGUAGE_SELECTION_TITLE: "<ruby>言語<rt>げんご</rt></ruby>の<ruby>選択<rt>せんたく</rt></ruby>:",
        LANGUAGE_SELECTION_ARIA: "言語選択ドロップダウンメニュー",
        LANGUAGE_OPTION_EN_US: "英語 (English US)",
        LANGUAGE_OPTION_JP: "日本語 (Japanese)",
        LANGUAGE_OPTION_RU: "ロシア語 (Russian)"
    },

    PROFILE: {
        // Navigation / Headers
        ARIA_MAIN: "ユーザー設定",
        IDENTITY_TITLE: "プロフィール<ruby>画面<rt>がめん</rt></ruby>",
        
        // States
        SYNCING_CREDENTIALS: "データを<ruby>同期中<rt>どうきちゅう</rt></ruby>...",

        // =========================================================================
        // SECTION 1: CORE ACCOUNT DETAILS
        // =========================================================================
        CORE_ACCOUNT_ARIA: "アカウント詳細情報",
        SECURITY_LEVEL_LABEL: "<ruby>権限<rt>けんげん</rt></ruby>レベル:",
        REGISTERED_EMAIL_LABEL: "メールアドレス:",
        DATABASE_RECORD_LABEL: "<ruby>登録<rt>とうろく</rt></ruby> ID:",
        
        // =========================================================================
        // SECTION 2: SYSTEM ACTION METRICS
        // =========================================================================
        SYSTEM_METRICS_TITLE: "タスク<ruby>統計情報<rt>とうけいじょうほう</rt></ruby>",
        ASSIGNED_ITEMS_LABEL: "<ruby>担当<rt>たんとう</rt></ruby>タスク<ruby>数<rt>すう</rt></ruby>",
        ASSIGNED_ITEMS_ARIA: "現在、{value}個のアクティブなタスクを追跡しています。",
        COMPLETED_TASKS_LABEL: "<ruby>完了<rt>かんりょう</rt></ruby>タスク<ruby>数<rt>すう</rt></ruby>",
        COMPLETED_TASKS_ARIA: "これまでに{value}個のタスクを正常に完了してアーカイブしました。",
    
        // =========================================================================
        // SECTION 3: WORKSPACE PREFERENCES CARD
        // =========================================================================
        WORKSPACE_TITLE: "<ruby>環境設定<rt>かんきょうせってい</rt></ruby>",
        THEME_LABEL: "<ruby>画面<rt>がめん</rt></ruby>テーマ<ruby>設定<rt>せってい</rt></ruby>:",

        // Theme Selector Options (Skips rubies for dropdown readability)
        THEME_OPTION_LIGHT: "☀️ ライトモード",
        THEME_OPTION_DARK: "🌙 ダークモード",
        THEME_OPTION_AMBER: "💽 レトロアンバー端末",
        THEME_OPTION_MATRIX: "📟 グリーンマトリクス端末",
        THEME_OPTION_HC_BLACK: "🌓⬜ 高コントラスト・黒",
        THEME_OPTION_HC_WHITE: "⬜️ 高コントラスト・白",
        THEME_OPTION_HC_BEIGE: "🏜️ 高コントラスト・ベージュ",
        THEME_OPTION_WIN98: "💾 レトロ Windows 95/98",
        THEME_OPTION_WINXP: "💿 ノスタルジック Windows XP",
        THEME_OPTION_VISTA: "📀 クラシック Windows Vista",
        THEME_OPTION_WIN7: "🫧 Classic Windows 7",
        THEME_OPTION_AERO: "🍃 フルティガー・エアロ",
        THEME_OPTION_BA: "🔮 シャーレの部室 (ブルーアーカイブ)",

        // Typography Interface Config
        FONT_LABEL: "<ruby>書体<rt>しょたい</rt></ruby>スタイル:",
        FONT_ARIA: "フォントスタイル選択ドロップダウンメニュー",
        FONT_DESCRIPTION: "アプリケーションワークスペースのデフォルト表示フォントを変更します。",
        FONT_OPTION_DEFAULT: "テーマのデフォルト",
        FONT_OPTION_LEGI: "🧼 高視認性フォント（Atkinson Hyperlegible）",
        FONT_OPTION_DYS: "📖 失読症配慮フォント（OpenDyslexic）",

        // Deficiency Matrix Elements
        COLORBLIND_LABEL: "<ruby>色覚<rt>しきかく</rt></ruby>フィルター:",
        COLORBLIND_ARIA: "色覚補正フィルター選択ドロップダウンメニュー",
        COLORBLIND_OPTION_NONE: "なし",
        COLORBLIND_OPTION_DEU: "第2色覚（緑色特性サポート）",
        COLORBLIND_OPTION_PRO: "第1色覚（赤色特性サポート）",
        COLORBLIND_OPTION_TRI: "第3色覚（青黄色特性サポート）",
        COLORBLIND_OPTION_GRA: "グレースケール（モノクロ）",
        
        // =========================================================================
        // SECTION 4: ACCOUNT MANAGEMENT FORM
        // =========================================================================
        ACCOUNT_SETTINGS_TITLE: "アカウント<ruby>管理<rt>かんり</rt></ruby><ruby>設定<rt>せってい</rt></ruby>",
        UPDATE_USER_LABEL: "ユーザー名の<ruby>変更<rt>へんこう</rt></ruby>",
        UPDATE_USER_PLACEHOLDER: "新しいユーザー名を入力...",
        CHANGE_PASS_LABEL: "<ruby>新<rt>あたら</rt></ruby>しいパスワード",
        CHANGE_PASS_PLACEHOLDER: "新しいパスワードを入力...",
        CONFIRM_PASS_LABEL: "<ruby>新<rt>あたら</rt></ruby>しいパスワード（<ruby>確認<rt>かくにん</rt></ruby>）",
        CONFIRM_PASS_PLACEHOLDER: "もう一度パスワードを入力...",
        PASS_REQUIREMENTS_ARIA: "変更を安全に適用するには、両方のパスワードフィールドが一致している必要があります。",
        SAVE_CHANGES_BTN: "プロファイルの<ruby>変更<rt>へんこう</rt></ruby>を<ruby>保存<rt>ほぞん</rt></ruby>",

        // Destructive Actions Area (Danger Zone)
        DANGER_ZONE_TITLE: "<ruby>危険<rt>きけん</rt></ruby>ゾーン",
        DANGER_ZONE_WARN: "アカウントを<ruby>削除<rt>さくじょ</rt></ruby>すると、ワークスペースへのアクセス<ruby>権<rt>けん</rt></ruby>が<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>消失<rt>しょおしつ</rt></ruby>します！<br>この<ruby>操作<rt>そうさ</rt></ruby>は<ruby>取消<rt>とりけし</rt></ruby>できません。",
        DANGER_ZONE_BTN: "アカウントを<ruby>完全<rt>かんぜん</rt></ruby>に<ruby>削除<rt>さくじょ</rt></ruby>する"
    },
    
    LOGIN: {
        PORTAL_ARIA: "アカウント認証ポータル",
        HEADER_WELCOME_BACK: "お<ruby>帰<rt>かえ</rt>りなさい</ruby>",
        HEADER_FIRST_TIME: "タスクマネージャーへようこそ",
        SUBTITLE_MANAGE: "ログインしてプロジェクトとタスクを<ruby>管理<rt>かんり</rt></ruby>しましょう",
        CHECKBOX_REMEMBER: "ログイン<ruby>状態<rt>じょおたい</rt></ruby>を<ruby>保持<rt>ほじ</rt></ruby>する",
        BTN_SIGNIN_ARIA: "ワークスペースに<ruby>安全<rt>あんぜん</rt></ruby>にログインするボタン",
        BTN_SIGNIN_TEXT: "ログイン",
        FOOTER_TEXT: "初めてのご<ruby>利用<rt>りよう</rt></ruby>ですか？",
        FOOTER_LINK: "<ruby>新規<rt>しんき</rt></ruby>アカウントの<ruby>作成<rt>さくせい</rt></ruby>"
    },

    REGISTER: {
        PORTAL_ARIA: "アカウント作成ポータル",
        HEADER_TITLE: "アカウントの<ruby>作成<rt>さくせい</rt></ruby>",
        SUBTITLE_JOIN: "プロジェクト<ruby>管理<rt>かんり</rt></ruby>プラットフォームに<ruby>参加<rt>さんか</rt></ruby>しましょう！",
        LABEL_USERNAME: "ユーザー<ruby>名<rt>めい</rt></ruby>",
        PLACEHOLDER_USERNAME: "ユニークな表示名を入力...",
        PLACEHOLDER_PASSWORD: "安全なパスワードを作成...",
        LABEL_CONFIRM_PASSWORD: "パスワード（<ruby>確認<rt>かくにん</rt></ruby>）",
        PLACEHOLDER_CONFIRM_PASSWORD: "パスワードを再入力...",
        REQUIREMENTS_ARIA: "アカウント作成要求を送信するには、両方のパスワードフィールドが正確に一致している必要があります。",
        BTN_SUBMIT_TEXT: "アカウント<ruby>作成<rt>さじゅせい</rt></ruby>",
        BTN_SUBMIT_ARIA: "入力された情報で新しいアカウントを登録するボタン",
        FOOTER_TEXT: "すでにアカウントをお<ruby>持<rt>も</rt></ruby>ちですか？",
        FOOTER_LINK: "ログイン<ruby>画面<rt>がめん</rt></ruby>に<ruby>戻<rt>もど</rt></ruby>る"
    },

    DASHBOARD: {
        MAIN_CANVAS_LABEL: "メインプロジェクトダッシュボード画面",
        MAIN_HEADER: "タスクマネージャーワークスペース",
        NAV_ARIA: "アカウントナビゲーションショートカット",
        PROFILE_BTN: "ユーザープロフィール",
        LOGOUT_ARIA: "ワークスペースセッションから安全にサインアウトするボタン",
        LOGOUT_BTN: "サインアウト",
        CREATE_PROJECT_HEADER: "<ruby>新規<rt>しんき</rt></ruby>プロジェクトの<ruby>作成<rt>さくせい</rt></ruby>",
        PROJECT_TITLE_LABEL: "プロジェクト名",
        PROJECT_TITLE_PLACEHOLDER: "例：ウェブサイトのオーバーホール",
        DESCRIPTION_LABEL: "<ruby>説明<rt>せつめい</rt></ruby>",
        DESCRIPTION_PLACEHOLDER: "プロジェクトの目標を入力してください...",
        CREATE_BTN_ARIA: "フォームを送信して新しいプロジェクトスペースを作成するボタン",
        CREATE_BTN_TEXT: "プロジェクトを<ruby>作成<rt>さくせい</rt></ruby>",
        YOUR_PROJECTS_HEADER: "あなたのプロジェクト",
        EMPTY_MESSAGE: "プロジェクトが<ruby>見<rt>み</rt></ruby>つかりません。<ruby>新<rt>あたら</rt></ruby>しく<ruby>作成<rt>さくせい</rt></ruby>して<ruby>開始<rt>かいし</rt></ruby>しましょう！",

        PROJECT_CARD_ARIA: "プロジェクトスペース: {value}",
        DELETE_PROJECT_ARIA: "プロジェクトを完全に削除: {value}",
        NO_DESCRIPTION_FALLBACK: "説明はありません。",
        OPEN_BOARD_TEXT: "ボードを開く",
        OPEN_BOARD_ARIA: "プロジェクトのタスクボードを開く: {value}"
    },

    TASKBOARD: {
        // Header / Navigation & Modal Buttons
        MAIN_CANVAS_ARIA: "プロジェクトタスクボード: {value}",
        HEADER_TITLE: "プロジェクトボード ({value})",
        HEADER_ABANDON_TEXT: "スペースを<ruby>離脱<rt>りだつ</rt></ruby>する",
        HEADER_ABANDON_ARIA: "このプロジェクトワークスペースから完全に離脱します",
        HEADER_CREATE_TAG_TEXT: "タグを<ruby>作成<rt>さくせい</rt></ruby>",
        HEADER_CREATE_TAG_ARIA: "オーバーレイウィンドウを開いて新しいワークスペースタグを作成します",
        HEADER_CREATE_TASK_TEXT: "タスクを<ruby>追加<rt>ついか</rt></ruby>",
        HEADER_CREATE_TASK_ARIA: "オーバーレイウィンドウを開いて新しいタスクを追加します",

        // Task Crew & Invitation
        CREW_PANEL_HEADER: "プロジェクトチーム＆タグ<ruby>管理<rt>かんり</rt></ruby>ワークスペース",
        INVITE_FORM_ARIA: "このスペースに新しいチームメンバーを招待するフォーム",
        INVITE_PLACEHOLDER: "チームメイトの登録済みメールアドレスを入力...",
        INVITE_INPUT_ARIA: "チームメイトのメールアドレス入力フィールド",
        INVITE_ROLE_ARIA: "割り当てられたプロジェクト管理権限レベル",
        INVITE_OPTION_MEMBER: "一般メンバー",
        INVITE_OPTION_OWNER: "共同所有者 / 管理者",
        INVITE_SUBMIT_ARIA: "招待リクエストを送信してメンバーを追加するボタン",
        INVITE_SUBMIT_BTN: "メンバーを追加",
        ROSTER_HEADER: "<ruby>現在<rt>げんざい</rt></ruby>のプロジェクトメンバー",
        ROSTER_BADGE_ARIA: "割り当てられた役割: {value}",
        ROSTER_REMOVE_ARIA: "プロジェクトメンバーから {value} を削除します",

        // Tags/Categories
        TAGS_HEADER: "<ruby>利用可能<rt>りよおかのお</rt></ruby>なプロジェクトタグ",
        TAGS_FALLBACK: "このプロジェクトに<ruby>作成<rt>さくせい</rt></ruby>されたカスタムタグはまだありません",
        TAGS_PILL_ARIA: "タグ: {value1} （割り当てアイテム数: {value2}）",
        TAG_DELETE_ARIA: "プロジェクトタグを完全に削除: {value}",

        // Filters & Progress Bar
        SEARCH_FILTER_HUB_ARIA: "タスクボードアイテムのフィルタリングハブ",
        SEARCH_PLACEHOLDER: "タイトルでタスクを検索...",
        SEARCH_ARIA: "テキストタイトルのキーワードでタスクをフィルタリングします",
        PRIORITY_ARIA: "指定された優先度レベルでタスクをフィルタリングします",
        PRIORITY_ALL: "すべての優先度",
        PRIORITY_HIGH: "高優先度",
        PRIORITY_MEDIUM: "中優先度",
        PRIORITY_LOW: "低優先度",
        CATEGORY_ARIA: "アクティブなカテゴリタグの割り当てでタスクをフィルタリングします",
        CATEGORY_ALL: "すべてのタグ",
        CATEGORY_UNASSIGNED: "未割り当てのタスク",
        PROGRESS_LABEL: "プロジェクト<ruby>完了<rt>かんりょお</rt></ruby>の<ruby>進捗状況<rt>しんちょくじょおきょお</rt></ruby>:",
        PROGRESS_ARIA: "プロジェクト全体の完了進捗トラッカー。現在 {value} パーセントです。",

        // Mobile Column Selector
        MOBILE_TABS_ARIA: "モバイルタスクボードの列ビュー切り替えコントロール",
        MOBILE_TAB_PENDING_TEXT: "<ruby>保留中<rt>ほりうちゅう</rt></ruby>",
        MOBILE_TAB_PENDING_ARIA: "保留中タスクの列を表示します",
        MOBILE_TAB_PROGRESS_TEXT: "<ruby>進行中<rt>しんこうちゅう</rt></ruby>＆レビュー",
        MOBILE_TAB_PROGRESS_ARIA: "進行中およびレビュー中タスクの列を表示します",
        MOBILE_TAB_COMPLETED_TEXT: "<ruby>完了済<rt>かんりょうず</rt></ruby>み",
        MOBILE_TAB_COMPLETED_ARIA: "完了済みタスクの列を表示します",

        // =========================================================================
        // Pending Column (保留中レーン)
        // =========================================================================
        COLUMN_PENDING_TITLE: "保留中 ({value})",
        LANE_PENDING_ARIA: "保留中のタスク追跡リストレーン。アイテムが {value} 個含まれています。",
        TASK_CARD_ARIA: "タスクカード: {value}",
        TASK_CATEGORY_ARIA: "割り当てられたカテゴリタグ: {value}",
        TASK_DELETE_ARIA: "タスクカードを削除: {value}",
        TASK_DESCRIPTION_FALLBACK: "説明はありません。",
        
        // Task Assignee
        TASK_ASSIGNEE_LABEL: "<ruby>担当者<rt>たんとうしゃ</rt></ruby>:",
        TASK_ASSIGNEE_ARIA: "タスク {value} にスタッフを割り当てます",
        TASK_ASSIGNEE_UNASSIGNED: "未割り当て",
        
        // Task Tag/Category
        TASK_CATEGORY_LABEL: "カテゴリ:",
        TASK_CATEGORY_ARIA_ASSIGN: "タスク {value} に分類タグを割り当てます",
        TASK_CATEGORY_NONE: "カテゴリなし",

        // Task Priority
        TASK_PRIORITY_ARIA: "優先度レベル: {value}",
        TASK_PRIORITY_HIGH: "<ruby>高<rt>たか</rt></ruby>",
        TASK_PRIORITY_MEDIUM: "中",
        TASK_PRIORITY_LOW: "低",
        TASK_DEADLINE_ARIA: "タスクの締切日: {value}",

        // Start Button
        TASK_ACTION_START_TEXT: "<ruby>開始<rt>かいし</rt></ruby>する →",
        TASK_ACTION_START_ARIA: "タスク {value} を開始します。カードを進行中レーンに移動します。",
    
        // =========================================================================
        // In-Progress & Review Column (進行中＆レビューレーン)
        // =========================================================================
        COLUMN_INPROGRESS_TITLE: "進行中／レビュー ({value})",
        LANE_INPROGRESS_ARIA: "進行中およびレビュー中のタスク追跡リストレーン。アイテムが {value} 個含まれています。",
        TASK_CARD_STATUS_ARIA: "タスクカード: {value1}、現在のステータス: {value2}",
        REVIEW_BANNER_TEXT: "PMレビュー<ruby>待ち<rt>まち</rt></ruby>",
        REVIEW_BANNER_ARIA: "警告：{value} はプロジェクトマネージャーの承認レビュー待ちです。",

        // Related Buttons
        BTN_BACK_TEXT: "← <ruby>戻す<rt>もどす</rt></ruby>",
        BTN_BACK_ARIA: "{value} を前の保留中レーンに戻します",
        BTN_SUBMIT_REVIEW_TEXT: "レビューを<ruby>依頼<rt>いらい</rt></ruby> →",
        BTN_SUBMIT_REVIEW_ARIA: "プロジェクトマネージャーの承認レビュー用に {value} を提出します",
        BTN_CANCEL_REVIEW_TEXT: "← 依頼を<ruby>取消<rt>とりけし</rt></ruby>",
        BTN_CANCEL_REVIEW_ARIA: "レビュー依頼をキャンセルし、{value} を進行中に戻します",
        BTN_REJECT_TEXT: "<ruby>差戻<rt>さしもど</rt></ruby>し",
        BTN_REJECT_ARIA: "レビュー依頼を却下し、{value} を進行中レーンに戻します",
        BTN_APPROVE_TEXT: "タスクを<ruby>承認<rt>しょうにん</rt></ruby>",
        BTN_APPROVE_ARIA: "レビューを承認し、{value} を完了済みレーンに移動します",

        // =========================================================================
        // Completed Column (完了済みレーン)
        // =========================================================================
        COLUMN_COMPLETED_TITLE: "完了済み ({value})",
        LANE_COMPLETED_ARIA: "完了済みタスクのアーカイブリストレーン。終了したアイテムが {value} 個含まれています。",
        TASK_CARD_COMPLETED_ARIA: "完了したタスクカード: {value}",
        BADGE_DONE_TEXT: "完了",
        BADGE_DONE_ARIA: "タスク処理状態：完了",
        FINISHED_ASSIGNEE_ARIA: "終了したタスク {value} の割り当てスタッフ",
        FINISHED_CATEGORY_ARIA: "終了したタスク {value} の分類カテゴリ",
        FINISHED_PRIORITY_ARIA: "元の優先度レベル: {value}",
        
        // Related Button
        REOPEN_TEXT: "← <ruby>再開<rt>さいかい</rt></ruby>する",
        REOPEN_ARIA: "タスクアイテム {value} を再開します。カードを作業中の進行中レーンに戻します。",

        // Create a new Task Modal
        MODAL_TASK_HEADER: "<ruby>新規<rt>しんき</rt></ruby>タスクの<ruby>作成<rt>さくせい</rt></ruby>",
        MODAL_TASK_TITLE_LABEL: "タスク<ruby>名<rt>めい</rt></ruby> *",
        MODAL_TASK_TITLE_PLACEHOLDER: "例：データベーススキーマの設計",
        MODAL_TASK_DESC_LABEL: "<ruby>説明<rt>せつめい</rt></ruby>",
        MODAL_TASK_DESC_PLACEHOLDER: "具体的なタスクの詳細を入力してください...",
        MODAL_TASK_PRIORITY_LABEL: "<ruby>優先度<rt>ゆうせんど</rt></ruby>階層",
        MODAL_TASK_DEADLINE_LABEL: "<ruby>締切日<rt>しめきりび</rt></ruby>",
        MODAL_TASK_DEADLINE_KEYBOARD_ARIA: "キーボードナビゲーションの注意：TabキーまたはEscapeキーを押すとカレンダー選択から抜けます。",
        MODAL_TASK_DEADLINE_INPUT_ARIA: "カレンダーで指定された完了日。",
        MODAL_TASK_CANCEL_BTN: "キャンセル",
        MODAL_TASK_CANCEL_ARIA: "タスク追加用フォームを閉じます",
        MODAL_TASK_SUBMIT_BTN: "タスクを作成",
        MODAL_TASK_SUBMIT_ARIA: "入力された仕様で新しいタスクを作成します",
    
        // Create a new Tag/Category Modal
        MODAL_TAG_HEADER: "新しいワークスペースタグの<ruby>作成<rt>さくせい</rt></ruby>",
        MODAL_TAG_NAME_LABEL: "タグ<ruby>名<rt>めい</rt></ruby>:",
        MODAL_TAG_NAME_PLACEHOLDER: "例：フロントエンド、テスト、バグ...",
        MODAL_TAG_COLOR_LABEL: "タグカラー:",
        MODAL_TAG_COLOR_ARIA: "分類バッジの背景色（視覚的識別用カラー）を選択します",

        // Color Selection Text Items (Dropdown elements - safely skip rubies per rule)
        MODAL_TAG_COLOR_RED: "クリムゾンレッド (高コントラスト)",
        MODAL_TAG_COLOR_BLUE: "エレクトリックブルー (高コントラスト)",
        MODAL_TAG_COLOR_GREEN: "フォレストグリーン (高コントラスト)",
        MODAL_TAG_COLOR_ORANGE: "ディープオレンジ (高コントラスト)",
        MODAL_TAG_COLOR_PURPLE: "ロイヤルパープル (高コントラスト)",

        MODAL_TAG_CANCEL_BTN: "キャンセル",
        MODAL_TAG_CANCEL_ARIA: "ワークスペースタグ作成用フォームを閉じます",
        MODAL_TAG_SUBMIT_BTN: "タグを作成",
        MODAL_TAG_SUBMIT_ARIA: "指定されたパラメータで新しいワークスペース分類タグを作成します"
    }
};