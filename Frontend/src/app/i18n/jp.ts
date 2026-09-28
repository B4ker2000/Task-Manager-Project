import { LocalePack } from './locale-pack.interface';

export const JapanesePack: LocalePack = {
    GLOBAL: {
        GENERIC_LOADING: "<ruby>読<rt aria-hidden=\"true\">よ</rt></ruby>み<ruby>込<rt aria-hidden=\"true\">こ</rt></ruby>み<ruby>中<rt aria-hidden=\"true\">ちょう</rt></ruby>...",
        BACK_BTN_TEXT: "ダッシュボードに<ruby>戻<rt aria-hidden=\"true\">もど</rt>る</ruby>",
        BACK_BTN_ARIA: "メインプロジェクトのダッシュボードに戻る",

        // Dynamic Date Formatting Pattern
        DATE_FORMAT: "yyyy年M月d日",

        // Email & Password Fields
        FIELD_EMAIL: "メールアドレス",
        PLACEHOLDER_EMAIL: "メールアドレスを入力...",
        FIELD_PASSWORD: "パスワード",
        PLACEHOLDER_PASSWORD: "パスワードを入力...",

        // Footer Navigation Aria
        FOOTER_NAV_ARIA: "認証ページのナビゲーションリンク",

        // Eye Toggle Accessibility Script Targets
        SHOW_PASS_ARIA: "パスワードを表示する",
        HIDE_PASS_ARIA: "パスワードを非表示にする",
        SHOW_CONFIRM_ARIA: "確認用パスワードを表示する",
        HIDE_CONFIRM_ARIA: "確認用パスワードを非表示にする",

        // Language Selection Configuration
        LANGUAGE_SELECTION_TITLE: "<ruby>言語<rt aria-hidden=\"true\">げんご</rt></ruby>の<ruby>選択<rt aria-hidden=\"true\">せんたく</rt></ruby>:",
        LANGUAGE_SELECTION_ARIA: "アプリケーションの表示言語選択ドロップダウンリスト",
        LANGUAGE_OPTION_EN_US: "American English (アメリカ英語)",
        LANGUAGE_OPTION_EN_UK: "British English (イギリス英語)",
        LANGUAGE_OPTION_JP: "日本語",
        LANGUAGE_OPTION_RU: "Русский (ロシア語)",
        LANGUAGE_OPTION_FA: "فارسی (ペルシャ語)",

        // User Roles
        ROLE_OWNER: "オーナー",
        ROLE_MEMBER: "メンバー",
        ROLE_VIEWER: "ゲスト",

        // Language direction format
        DIRECTION: "ltr"
    },

    POPUP: {
        // Success Actions
        SUCCESS_PROFILE_REMOVED_TITLE: "アカウント<ruby>削除完了<rt aria-hidden=\"true\">さくじょかんりょう</rt></ruby>",
        SUCCESS_PROFILE_REMOVED_BODY: "プロフィール<ruby>情報<rt aria-hidden=\"true\">じょうほう</rt></ruby>が<ruby>正常<rt aria-hidden=\"true\">せいじょう</rt></ruby>に<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>されました。",
        SUCCESS_USER_INFO_UPDATED_TITLE: "プロフィール<ruby>更新<rt aria-hidden=\"true\">こうしん</rt></ruby>",
        SUCCESS_USER_INFO_UPDATED_BODY: "アカウント<ruby>情報<rt aria-hidden=\"true\">じょうほう</rt></ruby>が<ruby>正常<rt aria-hidden=\"true\">せいじょう</rt></ruby>に<ruby>更新<rt aria-hidden=\"true\">こうしん</rt></ruby>されました。",
        SUCCESS_INVITATION_ACCEPTED_TITLE: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>承認<rt aria-hidden=\"true\">しょうにん</rt></ruby>しました",
        SUCCESS_INVITATION_ACCEPTED_BODY: "プロジェクトに<ruby>正常<rt aria-hidden=\"true\">せいじょう</rt></ruby>に<ruby>参加<rt aria-hidden=\"true\">さんか</rt></ruby>しました。",
        SUCCESS_INVITATION_DECLINED_TITLE: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>辞退<rt aria-hidden=\"true\">じたい</rt></ruby>しました",
        SUCCESS_INVITATION_DECLINED_BODY: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>正常<rt aria-hidden=\"true\">せいじょう</rt></ruby>に<ruby>辞退<rt aria-hidden=\"true\">じたい</rt></ruby>しました。",
        SUCCESS_INVITATION_SENT_TITLE: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>送信<rt aria-hidden=\"true\">そうしん</rt></ruby>しました",
        SUCCESS_INVITATION_SENT_BODY: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>正常<rt aria-hidden=\"true\">せいじょう</rt></ruby>に<ruby>送信<rt aria-hidden=\"true\">そうしん</rt></ruby>しました。",
        SUCCESS_REGISTER_TITLE: "<ruby>登録<rt aria-hidden=\"true\">とうろく</rt></ruby>が<ruby>完了<rt aria-hidden=\"true\">かんりょう</rt></ruby>しました！",
        SUCCESS_REGISTER_BODY: "アカウントが<ruby>正常<rt aria-hidden=\"true\">せいじょう</rt></ruby>に<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>されました！ログインページへ<ruby>移動<rt aria-hidden=\"true\">いどう</rt></ruby>します...",

        // Warning Actions
        WARNING_EMPTY_FIELDS_TITLE: "<ruby>未入力<rt aria-hidden=\"true\">みにゅうりょく</rt></ruby>の<ruby>項目<rt aria-hidden=\"true\">こおうもく</rt></ruby>",
        WARNING_EMPTY_FIELDS_BODY: "プロフィールの<ruby>更新内容<rt aria-hidden=\"true\">こうしんないよう</rt></ruby>を<ruby>保存<rt aria-hidden=\"true\">ほぞん</rt></ruby>するには、<ruby>少<rt aria-hidden=\"true\">すく</rt></ruby>なくとも1つのフィールドに<ruby>入力<rt aria-hidden=\"true\">にゅうりょく</rt></ruby>してください！", 
        WARNING_IDENTICAL_USERNAME_TITLE: "<ruby>同<rt aria-hidden=\"true\">おな</rt></ruby>じユーザー<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby>", 
        WARNING_IDENTICAL_USERNAME_BODY: "<ruby>新<rt aria-hidden=\"true\">あたら</rt></ruby>しいユーザー<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby>は、<ruby>現在<rt aria-hidden=\"true\">げんざい</rt></ruby>のユーザー<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby>と<ruby>異<rt aria-hidden=\"true\">こと</rt></ruby>なるものを<ruby>設定<rt aria-hidden=\"true\">せってい</rt></ruby>してください！", 
        WARNING_NEW_PASSWORD_MISMATCH_TITLE: "パスワードの<ruby>不<rt aria-hidden=\"true\">ふい</rt></ruby>一<ruby>致<rt aria-hidden=\"true\">ち</rt></ruby>",
        WARNING_NEW_PASSWORD_MISMATCH_BODY: "<ruby>入力<rt aria-hidden=\"true\">みにゅうりょく</rt></ruby>された<ruby>新<rt aria-hidden=\"true\">あたら</rt></ruby>しいパスワードが一<ruby>致<rt aria-hidden=\"true\">ち</rt></ruby>しません。",  
        WARNING_DELETE_PROFILE_TITLE: "<ruby>重大<rt aria-hidden=\"true\">じゅうだい</rt></ruby>なアクセシビリティ<ruby>警告<rt aria-hidden=\"true\">けいこく</rt></ruby>",
        WARNING_DELETE_PROFILE_BODY: "<ruby>本当<rt aria-hidden=\"true\">ほんとう</rt></ruby>にワークスペースのプロフィールを<ruby>完全<rt aria-hidden=\"true\">かんぜん</rt></ruby>に<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>してもよろしいですか？",
        WARNING_NEW_PASSWORD_TITLE: "パスワードの<ruby>確認<rt aria-hidden=\"true\">かくにん </rt></ruby>",
        WARNING_NEW_PASSWORD_BODY: "<ruby>新<rt aria-hidden=\"true\">あたら</rt></ruby>しいセキュリティパスワードを<ruby>再入力<rt aria-hidden=\"true\">さいにゅうりょく</rt></ruby>して<ruby>確認<rt aria-hidden=\"true\">かくにん</rt></ruby>してください。", 
        WARNING_DELETE_PROJECT_TITLE: "プロジェクトの<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>",
        WARNING_DELETE_PROJECT_BODY: "このプロジェクト、および<ruby>関連<rt aria-hidden=\"true\">かんれん</rt></ruby>するすべてのタスクを<ruby>本当<rt aria-hidden=\"true\">ほんとう</rt></ruby>に<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>してもよろしいですか？この<ruby>操作<rt aria-hidden=\"true\">そうさ</rt></ruby>は<ruby>取<rt aria-hidden=\"true\">と</rt></ruby>り<ruby>消<rt aria-hidden=\"true\">け</rt></ruby>せません。",
        WARNING_DELETE_TASK_TITLE: "タスクの<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>",
        WARNING_DELETE_TASK_BODY: "このタスクを<ruby>完全<rt aria-hidden=\"true\">かんぜん</rt></ruby>に<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>してもよろしいですか？",
        WARNING_DELETE_CATEGORY_TITLE: "タグの<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>",
        WARNING_DELETE_CATEGORY_BODY_PART_1: "<ruby>本当<rt aria-hidden=\"true\">ほんとう</rt></ruby>にカテゴリタグ ",
        WARNING_DELETE_CATEGORY_BODY_PART_2: " を<ruby>永久<rt aria-hidden=\"true\">えいきゅう</rt></ruby>に<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>しますか？このタグを<ruby>使用<rt aria-hidden=\"true\">しよう</rt></ruby>しているタスクからタグ<ruby>情報<rt aria-hidden=\"true\">じょうほう</rt></ruby>が<ruby>解除<rt aria-hidden=\"true\">かいじょ</rt></ruby>されます。",
        WARNING_REMOVE_MEMBER_TITLE: "メンバーの<ruby>除外<rt aria-hidden=\"true\">じょがい</rt></ruby>",
        WARNING_REMOVE_MEMBER_BODY_PART_1: "<ruby>本当<rt aria-hidden=\"true\">ほんとう</rt></ruby>にユーザー ",
        WARNING_REMOVE_MEMBER_BODY_PART_2: " をこのプロジェクトのワークスペースから<ruby>除外<rt aria-hidden=\"true\">じょがい</rt></ruby>してもよろしいですか？",
        WARNING_LEAVE_PROJECT_TITLE: "プロジェクトからの<ruby>脱退<rt aria-hidden=\"true\">だったい</rt></ruby>",
        WARNING_LEAVE_PROJECT_BODY: "<ruby>本当<rt aria-hidden=\"true\">ほんとう</rt></ruby>にこのプロジェクトスペースから<ruby>脱退<rt aria-hidden=\"true\">だったい</rt></ruby>してもよろしいですか？このボードに<ruby>対<rt aria-hidden=\"true\">たい</rt></ruby>するすべてのアクセス<ruby>権<rt aria-hidden=\"true\">けん</rt></ruby>が<ruby>失<rt aria-hidden=\"true\">うしな</rt></ruby>われます！",
        WARNING_INVITATION_DECLINE_TITLE: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>辞退<rt aria-hidden=\"true\">じたい</rt></ruby>する",
        WARNING_INVITATION_DECLINE_BODY: "この<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>辞退<rt aria-hidden=\"true\">じたい</rt></ruby>してもよろしいですか？",
        WARNING_INVALID_EMAIL_INPUT_TITLE: "メールアドレスが<ruby>無効<rt aria-hidden=\"true\">むこう</rt></ruby>です",
        WARNING_INVALID_EMAIL_INPUT_BODY: "<ruby>有効<rt aria-hidden=\"true\">ゆうこう</rt></ruby>なメールアドレスを<ruby>入力<rt aria-hidden=\"true\">にゅうりょく</rt></ruby>してください。",
        WARNING_ALREADY_MEMBER_TITLE: "ユーザーは<ruby>既<rt aria-hidden=\"true\">すで</rt></ruby>に<ruby>参加<rt aria-hidden=\"true\">さんか</rt></ruby>しています",
        WARNING_ALREADY_MEMBER_BODY_PART_1: "ユーザー <strong>{email}</strong> は、",
        WARNING_ALREADY_MEMBER_BODY_PART_2: "<strong>{role}</strong> <ruby>権限<rt aria-hidden=\"true\">けんげん</rt></ruby>でこのプロジェクトに<ruby>参加<rt aria-hidden=\"true\">さんか</rt></ruby>しています。",
        WARNING_INVITATION_PENDING_TITLE: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>の<ruby>回答待<rt aria-hidden=\"true\">かいとうま</rt></ruby>ち",
        WARNING_INVITATION_PENDING_BODY: "<strong>{email}</strong> への<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>は<ruby>送信<rt aria-hidden=\"true\">そうしん</rt></ruby>され、<ruby>回答<rt aria-hidden=\"true\">かいとう</rt></ruby>を<ruby>待<rt aria-hidden=\"true\">ま</rt></ruby>っています。",

        // Danger Actions
        DANGER_FINAL_WARNING_TITLE: "<ruby>最終確認<rt aria-hidden=\"true\">さいしゅうかくにん</rt></ruby>",
        DANGER_FINAL_WARNING_BODY: "この<ruby>操作<rt aria-hidden=\"true\">そうさ</rt></ruby>を<ruby>行<rt aria-hidden=\"true\">おこな</rt></ruby>うと、システムデータベースからすべての<ruby>記録<rt aria-hidden=\"true\">きろく</rt></ruby>が<ruby>完全<rt aria-hidden=\"true\">かんぜん</rt></ruby>に<ruby>消去<rt aria-hidden=\"true\">しょうきょ</rt></ruby>されます。この<ruby>操作<rt aria-hidden=\"true\">そうさ</rt></ruby>は<ruby>取<rt aria-hidden=\"true\">と</rt></ruby>り<ruby>消<rt aria-hidden=\"true\">け</rt></ruby>すことができません。<ruby>続行<rt aria-hidden=\"true\">ぞっこう</rt></ruby>しますか？",
        DANGER_ACCESS_DENIED_TITLE: "アクセス<ruby>拒否<rt aria-hidden=\"true\">きょひ</rt></ruby>！",
        DANGER_TASK_DELETE_ACCESS_DENIED_BODY: "タスクを<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>する<ruby>権限<rt aria-hidden=\"true\">けんげん</rt></ruby>がありません。この<ruby>操作<rt aria-hidden=\"true\">そうさ</rt></ruby>はプロジェクトのオーナーのみ<ruby>可能<rt aria-hidden=\"true\">かのう</rt></ruby>です。",
        ERROR_GENERIC_TITLE: "エラーが<ruby>発生<rt aria-hidden=\"true\">はっせい</rt></ruby>しました",
        ERROR_TASK_DELETE_BODY: "タスクの<ruby>削除処理<rt aria-hidden=\"true\">さくじょしょり</rt></ruby>に<ruby>失敗<rt aria-hidden=\"true\">しっぱい</rt></ruby>しました。もう一<ruby>度<rt aria-hidden=\"true\">ど</rt></ruby>お<ruby>試<rt aria-hidden=\"true\">ため</rt></ruby>しください。",
        ERROR_SOLE_OWNER_BODY: "プロジェクトから<ruby>脱退<rt aria-hidden=\"true\">だったい</rt></ruby>できませんでした。<ruby>脱退<rt aria-hidden=\"true\">だったい</rt></ruby>する<ruby>前<rt aria-hidden=\"true\">まえ</rt></ruby>に<ruby>別<rt aria-hidden=\"true\">べつ</rt></ruby>の<ruby>共同<rt aria-hidden=\"true\">きょうどう</rt></ruby>オーナーを<ruby>指定<rt aria-hidden=\"true\">してい</rt></ruby>するか、ダッシュボードからプロジェクト<ruby>自体<rt aria-hidden=\"true\">じたい</rt></ruby>を<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>してください。",
        ERROR_INVITE_FAILED_BODY: "メンバーの<ruby>招待処理<rt aria-hidden=\"true\">しょうたいしょり</rt></ruby>に<ruby>失敗<rt aria-hidden=\"true\">しっぱい</rt></ruby>しました。<ruby>未入力<rt aria-hidden=\"true\">にゅうりょく</rt></ruby>されたメールアドレスが<ruby>正<rt aria-hidden=\"true\">ただ</rt></ruby>しいかご<ruby>確認<rt aria-hidden=\"true\">かくにん</rt></ruby>ください。",
        ERROR_INVITATION_ACCEPT_FAILED_BODY: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>承認<rt aria-hidden=\"true\">しょうにん</rt></ruby>できませんでした。",
        ERROR_INVITATION_DECLINE_FAILED_BODY: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>を<ruby>辞退<rt aria-hidden=\"true\">じたい</rt></ruby>できませんでした。",
        DANGER_UNAUTHORIZED_TASK_ACCESS: "<ruby>他<rt aria-hidden=\"true\">ほか</rt></ruby>のチームメンバーに<ruby>割<rt aria-hidden=\"true\">わ</rt></ruby>り<ruby>当<rt aria-hidden=\"true\">あ</rt></ruby>てられたタスクカードを<ruby>変更<rt aria-hidden=\"true\">へんこう</rt></ruby>する<ruby>権限<rt aria-hidden=\"true\">けんげん</rt></ruby>がありません。",
        DANGER_UNAUTHORIZED_TASK_APPROVE: "プロジェクトマネージャーのみがタスクを<ruby>承認<rt aria-hidden=\"true\">しょうにん</rt></ruby>し、「<ruby>完了<rt aria-hidden=\"true\">かんりょう</rt></ruby>」<ruby>列<rt aria-hidden=\"true\">れつ</rt></ruby>に<ruby>移動<rt aria-hidden=\"true\">いどう</rt></ruby>できます。",
        DANGER_REGISTRATION_FAILURE_BODY: "<ruby>登録<rt aria-hidden=\"true\">とうろく</rt></ruby>に<ruby>失敗<rt aria-hidden=\"true\">しっぱい</rt></ruby>しました。<ruby>後<rt aria-hidden=\"true\">のち</rt>ほどもう一<ruby>度<rt aria-hidden=\"true\">ど</rt></ruby>お<ruby>試<rt aria-hidden=\"true\">ため</rt></ruby>しください。",
        DANGER_USER_INFO_UPDATE_FAILED_TITLE: "<ruby>更新<rt aria-hidden=\"true\">こうしん</rt></ruby>に<ruby>失敗<rt aria-hidden=\"true\">しっぱい</rt></ruby>しました！",
        DANGER_USER_INFO_UPDATE_FAILED_BODY: "ユーザー<ruby>情報<rt aria-hidden=\"true\">じょうほう</rt></ruby>の<ruby>更新<rt aria-hidden=\"true\">こうしん</rt></ruby>に<ruby>失敗<rt aria-hidden=\"true\">しっぱい</rt></ruby>しました。後<rt aria-hidden=\"true\">のち</rt></ruby>ほどもう一<ruby>度<rt aria-hidden=\"true\">ど</rt></ruby>お<ruby>試<rt aria-hidden=\"true\">ため</rt></ruby>しください。",
        DANGER_PROFILE_DESTRUCTION_FAILED: "アカウントの<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>に<ruby>失敗<rt aria-hidden=\"true\">しっぱい</rt></ruby>しました： ",
        DANGER_PROJECT_CREATION_FAILED_BODY: "プロジェクトの<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>に<ruby>失敗<rt aria-hidden=\"true\">しっぱい</rt></ruby>しました: ",
        ERROR_EMAIL_ALREADY_EXISTS_BODY: "そのメールアドレスのアカウントは<ruby>既<rt aria-hidden=\"true\">すで</rt></ruby>に<ruby>存在<rt aria-hidden=\"true\">そんざい</rt></ruby>します！<ruby>別<rt aria-hidden=\"true\">べつ</rt></ruby>のメールアドレスを<ruby>試<rt aria-hidden=\"true\">ため</rt></ruby>すか、ログインしてください。",
        
        // Button Layouts
        BTN_PROCEED: "<ruby>続行<rt aria-hidden=\"true\">ぞっこう</rt></ruby>する",
        BTN_CANCEL: "キャンセル",
        BTN_CLOSE: "<ruby>閉<rt aria-hidden=\"true\">と</rt></ruby>じる"
    },

    PROFILE: {
        // Navigation / Headers
        ARIA_MAIN: "ユーザー設定ページ",
        IDENTITY_TITLE: "プロフィール<ruby>画面<rt aria-hidden=\"true\">がめん</rt></ruby>",
        
        // States
        SYNCING_CREDENTIALS: "データを<ruby>同期中<rt aria-hidden=\"true\">どうきちゅう</rt></ruby>...",

        // =========================================================================
        // SECTION 1: CORE ACCOUNT DETAILS
        // =========================================================================
        CORE_ACCOUNT_ARIA: "アカウント詳細情報セクション",
        SECURITY_LEVEL_LABEL: "<ruby>権限<rt aria-hidden=\"true\">けんげん</rt></ruby>レベル:",
        REGISTERED_EMAIL_LABEL: "メールアドレス:",
        DATABASE_RECORD_LABEL: "<ruby>登録<rt aria-hidden=\"true\">とうろく</rt></ruby> ID:",
        
        // =========================================================================
        // SECTION 2: SYSTEM ACTION METRICS
        // =========================================================================
        SYSTEM_METRICS_TITLE: "タスク<ruby>統計情報<rt aria-hidden=\"true\">とうけいじょうほう</rt></ruby>",
        ASSIGNED_ITEMS_LABEL: "<ruby>担当<rt aria-hidden=\"true\">たんとう</rt></ruby>タスク<ruby>数<rt aria-hidden=\"true\">すう</rt></ruby>",
        ASSIGNED_ITEMS_ARIA: "現在、{value}個のアクティブなタスクを追跡しています。",
        COMPLETED_TASKS_LABEL: "<ruby>完了<rt aria-hidden=\"true\">かんりょう</rt></ruby>タスク<ruby>数<rt aria-hidden=\"true\">すう</rt></ruby>",
        COMPLETED_TASKS_ARIA: "これまでに{value}個のタスクを正常に完了してアーカイブしました。",
    
        // =========================================================================
        // SECTION 3: WORKSPACE PREFERENCES CARD
        // =========================================================================
        WORKSPACE_TITLE: "<ruby>環境設定<rt aria-hidden=\"true\">かんきょうせってい</rt></ruby>",
        THEME_LABEL: "<ruby>画面<rt aria-hidden=\"true\">がめん</rt></ruby>テーマ<ruby>設定<rt aria-hidden=\"true\">せってい</rt></ruby>:",
        THEME_ARIA: "表示テーマレイアウト設定の選択",

        // Theme Selector Options
        THEME_OPTION_LIGHT_TEXT: "☀️ ライトモード",
        THEME_OPTION_LIGHT_ARIA: "ライトモード",
        THEME_OPTION_DARK_TEXT: "🌙 ダークモード",
        THEME_OPTION_DARK_ARIA: "ダークモード",
        THEME_OPTION_AMBER_TEXT: "💽 レトロアンバー端末",
        THEME_OPTION_AMBER_ARIA: "レトロアンバー端末",
        THEME_OPTION_MATRIX_TEXT: "📟 グリーンマトリクス端末",
        THEME_OPTION_MATRIX_ARIA: "グリーンマトリクス端末",
        THEME_OPTION_HC_BLACK_TEXT: "🌓 高コントラスト・黒",
        THEME_OPTION_HC_BLACK_ARIA: "高コントラスト・黒",
        THEME_OPTION_HC_WHITE_TEXT: "⬜️ 高コントラスト・白",
        THEME_OPTION_HC_WHITE_ARIA: "高コントラスト・白",
        THEME_OPTION_HC_BEIGE_TEXT: "🏜️ 高コントラスト・ベージュ",
        THEME_OPTION_HC_BEIGE_ARIA: "高コントラスト・ベージュ",
        THEME_OPTION_WIN98_TEXT: "💾 レトロ Windows 95/98",
        THEME_OPTION_WIN98_ARIA: "レトロ Windows 95/98",
        THEME_OPTION_WINXP_TEXT: "💿 ノスタルジック Windows XP",
        THEME_OPTION_WINXP_ARIA: "ノスタルジック Windows XP",
        THEME_OPTION_VISTA_TEXT: "📀 クラシック Windows Vista",
        THEME_OPTION_VISTA_ARIA: "クラシック Windows Vista",
        THEME_OPTION_WIN7_TEXT: "🫧 Classic Windows 7",
        THEME_OPTION_WIN7_ARIA: "Classic Windows 7",
        THEME_OPTION_AERO_TEXT: "🍃 フルティガー・エアロ",
        THEME_OPTION_AERO_ARIA: "フルティガー・エアロ",
        THEME_OPTION_BA_TEXT: "🔮 シャーレの部室 (ブルーアーカイブ)",
        THEME_OPTION_BA_ARIA: "シャーレの部室 (ブルーアーカイブ)",
        THEME_OPTION_HL_TEXT: "☢️ 『Half-Life』のユーザーインターフェース",
        THEME_OPTION_HL_ARIA: "『Half-life』のユーザーインターフェース",

        // Typography Interface Config
        FONT_LABEL: "<ruby>書体<rt aria-hidden=\"true\">しょたい</rt></ruby>スタイル:",
        FONT_ARIA: "表示フォントスタイル選択ドロップダウンメニュー",
        FONT_DESCRIPTION: "アプリケーションワークスペースのデフォルト表示フォントを変更します。",
        FONT_OPTION_DEFAULT: "テーマのデフォルト",
        FONT_OPTION_LEGI_TEXT: "🧼 高視認性フォント（Atkinson Hyperlegible）",
        FONT_OPTION_LEGI_ARIA: "高視認性フォント（Atkinson Hyperlegible）",
        FONT_OPTION_DYS_TEXT: "📖 失読症配慮フォント（OpenDyslexic）",
        FONT_OPTION_DYS_ARIA: "失読症配慮フォント（OpenDyslexic）",

        // Deficiency Matrix Elements
        COLORBLIND_LABEL: "<ruby>色覚<rt aria-hidden=\"true\">しきかく</rt></ruby>フィルター:",
        COLORBLIND_ARIA: "色覚補正フィルター選択ドロップダウンメニュー",
        COLORBLIND_OPTION_NONE: "なし",
        COLORBLIND_OPTION_PRO: "第1色覚（赤色特性サポート）",
        COLORBLIND_OPTION_DEU: "第2色覚（緑色特性サポート）",
        COLORBLIND_OPTION_TRI: "第3色覚（青黄色特性サポート）",
        COLORBLIND_OPTION_GRA: "グレースケール（モノクロ）",
        
        // =========================================================================
        // SECTION 4: ACCOUNT MANAGEMENT FORM
        // =========================================================================
        ACCOUNT_SETTINGS_TITLE: "アカウント<ruby>管理設定<rt aria-hidden=\"true\">かんりせってい</rt></ruby>",
        UPDATE_USER_LABEL: "ユーザー<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby>の<ruby>変更<rt aria-hidden=\"true\">へんこう</rt></ruby>",
        UPDATE_USER_PLACEHOLDER: "新しいユーザー名を入力...",
        CHANGE_PASS_LABEL: "パスワードの<ruby>変更<rt aria-hidden=\"true\">へんこう</rt></ruby>",
        CHANGE_PASS_PLACEHOLDER: "新しいパスワードを入力...",
        CONFIRM_PASS_LABEL: "<ruby>新<rt aria-hidden=\"true\">あたら</rt></ruby>しいパスワードの<ruby>確認<rt aria-hidden=\"true\">かくにん</rt></ruby>",
        CONFIRM_PASS_PLACEHOLDER: "新しいパスワードを再入力...",
        PASS_REQUIREMENTS_ARIA: "パスワードの変更を安全に確定するには、両方のパスワードフィールドが一致している必要があります。",
        SAVE_CHANGES_BTN_TEXT: "プロファイルの<ruby>変更<rt aria-hidden=\"true\">へんこう</rt></ruby>を<ruby>保存<rt aria-hidden=\"true\">ほぞん</rt></ruby>",
        SAVE_CHANGES_BTN_ARIA: "プロフィールの変更内容を保存します",

        // ⚠️ 危険エリア（Danger Zone）
        DANGER_ZONE_TITLE: "<ruby>危険<rt aria-hidden=\"true\">きけん</rt></ruby>ゾーン",
        DANGER_ZONE_WARN_TEXT: "アカウントを<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>すると、ワークスペースへのアクセス<ruby>権<rt aria-hidden=\"true\">けん</rt></ruby>が<ruby>完全<rt aria-hidden=\"true\">かんぜん</rt></ruby>に<ruby>消失<rt aria-hidden=\"true\">しょうしつ</rt></ruby>します！<br>この<ruby>操作<rt aria-hidden=\"true\">そうさ</rt></ruby>は<ruby>取消<rt aria-hidden=\"true\">とりけし</rt></ruby>できません。",
        DANGER_ZONE_WARN_ARIA: "アカウントを削除すると、ワークスペースへのアクセス権が完全に消失します！この操作は取消できません。",
        DANGER_ZONE_BTN_TEXT: "アカウントを<ruby>完全<rt aria-hidden=\"true\">かんぜん</rt></ruby>に<ruby>削除<rt aria-hidden=\"true\">さくじょ</rt></ruby>する",
        DANGER_ZONE_BTN_ARIA: "データベースからアカウントを永久に削除します"
    },
    
    LOGIN: {
        PORTAL_ARIA: "アカウント認証ページ",
        HEADER_WELCOME_BACK: "お<ruby>帰<rt aria-hidden=\"true\">かえ</rt></ruby>りなさい",
        HEADER_FIRST_TIME: "タスクマネージャーへようこそ",
        SUBTITLE_MANAGE: "ログインして、プロジェクトやタスクを<ruby>管理<rt aria-hidden=\"true\">かんり</rt></ruby>しましょう",
        CHECKBOX_REMEMBER: "ログイン<ruby>状態<rt aria-hidden=\"true\">じょうたい</rt></ruby>を<ruby>保持<rt aria-hidden=\"true\">ほじ</rt></ruby>する",
        BTN_SIGNIN_TEXT: "サインイン",
        BTN_SIGNIN_ARIA: "アカウントにサインインしてダッシュボードを開きます",
        FOOTER_TEXT: "<ruby>初<rt aria-hidden=\"true\">はじ</rt></ruby>めてのご<ruby>利用<rt aria-hidden=\"true\">りよう</rt></ruby>ですか？<br>",
        FOOTER_LINK_TEXT: "<ruby>新<rt aria-hidden=\"true\">あたら</rt></ruby>しいアカウントを<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>する",
        FOOTER_LINK_ARIA: "新規アカウント作成ページへ移動します",
        ERROR_FALLBACK: "メールアドレスまたはパスワードが<ruby>正<rt aria-hidden=\"true\">ただ</rt></ruby>しくありません。もう<ruby>一<rt aria-hidden=\"true\">いち</rt></ruby><ruby>度<rt aria-hidden=\"true\">ど</rt></ruby>お<ruby>試<rt aria-hidden=\"true\">ため</rt></ruby>しください。"
    },

    REGISTER: {
        PORTAL_ARIA: "新規アカウント作成ページ",
        HEADER_TITLE: "アカウントの<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        SUBTITLE_JOIN: "プロジェクト<ruby>管理<rt aria-hidden=\"true\">かんり</rt></ruby>プラットフォームに<ruby>参加<rt aria-hidden=\"true\">さんか</rt></ruby>しましょう！",
        LABEL_USERNAME: "ユーザー<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby>",
        PLACEHOLDER_USERNAME: "一意の表示名を入力...",
        PLACEHOLDER_PASSWORD: "安全なパスワードを作成...",
        LABEL_CONFIRM_PASSWORD: "パスワードの<ruby>確認<rt aria-hidden=\"true\">かくにん</rt></ruby>",
        PLACEHOLDER_CONFIRM_PASSWORD: "パスワードを再入力...",
        REQUIREMENTS_ARIA: "登録を送信する前に、両方のパスワードフィールドが完全に一致している必要があります。",
        BTN_SUBMIT_TEXT: "<ruby>新規登録<rt aria-hidden=\"true\">しんきとうろく</rt></ruby>",
        BTN_SUBMIT_ARIA: "入力した認証情報を送信してアカウントを登録します",
        FOOTER_TEXT: "すでにアカウントをお<ruby>持<rt aria-hidden=\"true\">も</rt></ruby>ちですか？",
        FOOTER_LINK_TEXT: "ログイン<ruby>画面<rt aria-hidden=\"true\">がめん</rt></ruby>に<ruby>戻<rt aria-hidden=\"true\">もど</rt></ruby>る",
        FOOTER_LINK_ARIA: "サインイン画面に戻ります"
    },

    DASHBOARD: {
        MAIN_CANVAS_LABEL: "メインプロジェクトダッシュボード表示",
        MAIN_HEADER: "タスクマネージャーワークスペース",
        NAV_ARIA: "アカウントナビゲーションショートカットリンク",
        PROFILE_BTN: "ユーザープロフィール",
        LOGOUT_BTN: "サインアウト",
        LOGOUT_ARIA: "現在のセッションから安全にサインアウトします",
        INVITATION_HEADER: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>されたプロジェクト",
        INVITATION_ARIA: "プロジェクトへの招待リスト。招待の件数: {value}",
        INVITATION_DETAILS_ARIA: "プロジェクトへの招待の詳細: {title}",
        INVITATION_DESCRIPTION_TEXT: "このプロジェクトに<ruby>次<rt aria-hidden=\"true\">つぎ</rt></ruby>の<ruby>役割<rt aria-hidden=\"true\">やくわり</rt></ruby>で<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>されています: ",
        INVITATION_DESCRIPTION_ARIA: "このプロジェクトに、次の役割で招待されています: {role}",
        INVITATION_EXPIRY_TEXT: "<ruby>招待<rt aria-hidden=\"true\">しょうたい</rt></ruby>の<ruby>有効期限<rt aria-hidden=\"true\">ゆうこうきげん</rt></ruby>: ",
        INVITATION_EXPIRY_ARIA: "この招待の有効期限: {value}",
        INVITATION_ACCEPT_BTN: "<ruby>承認<rt aria-hidden=\"true\">しょうにん</rt></ruby>",
        INVITATION_DECLINE_BTN: "<ruby>辞退<rt aria-hidden=\"true\">じたい</rt></ruby>",
        CREATE_PROJECT_HEADER: "<ruby>新規<rt aria-hidden=\"true\">しんき</rt></ruby>プロジェクトの<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        PROJECT_TITLE_LABEL: "プロジェクト<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby>",
        PROJECT_TITLE_PLACEHOLDER: "例：ウェブサイトの刷新",
        DESCRIPTION_LABEL: "<ruby>説明<rt aria-hidden=\"true\">せつめい</rt></ruby>",
        DESCRIPTION_PLACEHOLDER: "プロジェクトの目標を記述してください...",
        CREATE_BTN_TEXT: "プロジェクトを<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        CREATE_BTN_ARIA: "フォームを送信して新しいプロジェクトスペースを作成します",
        YOUR_PROJECTS_HEADER: "マイプロジェクト",
        EMPTY_MESSAGE: "プロジェクトが<ruby>見<rt aria-hidden=\"true\">み</rt></ruby>つかりません。<ruby>新<rt aria-hidden=\"true\">あたら</rt></ruby>しく<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>して<ruby>開始<rt aria-hidden=\"true\">かいし</rt></ruby>しましょう！",
        PROJECT_CARD_ARIA: "プロジェクトスペース: {value}",
        DELETE_PROJECT_ARIA: "プロジェクトを完全に削除: {value}",
        NO_DESCRIPTION_FALLBACK: "説明はありません。",
        OPEN_BOARD_TEXT: "ボードを<ruby>開<rt aria-hidden=\"true\">ひら</rt></ruby>く",
        OPEN_BOARD_ARIA: "プロジェクトのタスクボードを開く: {value}"
    },

    TASKBOARD: {
        // Header / Navigation & Modal Buttons
        MAIN_CANVAS_ARIA: "プロジェクトタスクボード<ruby>概要<rt aria-hidden=\"true\">がいよう</rt></ruby>: {title}",
        HEADER_TITLE: "プロジェクトボード（{title}）",
        HEADER_ABANDON_TEXT: "スペースを<ruby>離脱<rt aria-hidden=\"true\">りだつ</rt></ruby>する",
        HEADER_ABANDON_ARIA: "このプロジェクトワークスペースから完全に退出します",
        HEADER_CREATE_TAG_TEXT: "タグを<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        HEADER_CREATE_TAG_ARIA: "新しいカテゴリタグを作成するオーバーレイを開きます",
        HEADER_CREATE_TASK_TEXT: "タスクを<ruby>追加<rt aria-hidden=\"true\">ついか</rt></ruby>",
        HEADER_CREATE_TASK_ARIA: "新しいタスク項目を追加するオーバーレイを開きます",
        REORDER_MENU_ARIA: "同じ列内でタスクカード「{title}」を上下に並べ替えます",
        REORDER_MOVE_TOP: "<ruby>最上部<rt aria-hidden=\"true\">さいじょうぶ</rt></ruby>に<ruby>移動<rt aria-hidden=\"true\">いどう</rt></ruby>",
        REORDER_MOVE_UP: "<ruby>上<rt aria-hidden=\"true\">うえ</rt></ruby>に<ruby>移動<rt aria-hidden=\"true\">いどう</rt></ruby>する",
        REORDER_MOVE_DOWN: "<ruby>下<rt aria-hidden=\"true\">した</rt></ruby>に<ruby>移動<rt aria-hidden=\"true\">いどう</rt></ruby>する",
        REORDER_MOVE_BOTTOM: "<ruby>最下部<rt aria-hidden=\"true\">さいかぶ</rt></ruby>に<ruby>移動<rt aria-hidden=\"true\">いどう</rt></ruby>",

        // Task Crew & Invitation
        CREW_PANEL_HEADER: "プロジェクトチーム・タグ<ruby>管理<rt aria-hidden=\"true\">かんり</rt></ruby>ワークスペース",
        INVITE_FORM_ARIA: "このスペースに新しいチームメンバーの招待フォーム",
        INVITE_PLACEHOLDER: "メンバーの登録メールアドレスを入力...",
        INVITE_INPUT_ARIA: "招待メンバーのメールアドレス入力フィールド",
        INVITE_ROLE_ARIA: "割り当てる権限レベルの選択ドロップダウン",
        INVITE_OPTION_OWNER: "共同所有者 / 管理者",
        INVITE_OPTION_MEMBER: "一般メンバー",
        INVITE_OPTION_VIEWER: "閲覧専用ユーザー",
        INVITE_SUBMIT_ARIA: "招待リクエストを送信してメンバーを追加するボタン",
        INVITE_SUBMIT_BTN: "メンバーを追加",
        ROSTER_HEADER: "<ruby>現在<rt aria-hidden=\"true\">げんざい</rt></ruby>のプロジェクトメンバー",
        ROSTER_BADGE_ARIA: "割り当てられた役割: {role}",
        ROSTER_REMOVE_ARIA: "ユーザー {email} をプロジェクトから削除します",

        // Tags/Categories
        TAGS_HEADER: "<ruby>利用可能<rt aria-hidden=\"true\">りようかのう</rt></ruby>なプロジェクトタグ",
        TAGS_FALLBACK: "このプロジェクトに<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>されたカスタムタグはまだありません",
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
        USER_ARIA: "担当者名でタスクを絞り込む",
        USER_ALL: "すべてのタスク",
        USER_UNASSIGNED: "未割り当てのタスク",
        PROGRESS_LABEL: "プロジェクト<ruby>完了<rt aria-hidden=\"true\">かんりょう</rt></ruby>の<ruby>進捗状況<rt aria-hidden=\"true\">しんちょくじょうきょう</rt></ruby>:",
        PROGRESS_ARIA: "プロジェクト全体の完了進捗トラッカー。現在 {value} パーセントです。",

        // Mobile Column Selector
        MOBILE_TABS_ARIA: "モバイルタスクボードの列ビュー切り替えコントロール",
        MOBILE_TAB_PENDING_TEXT: "<ruby>保留中<rt aria-hidden=\"true\">ほりうちゅう</rt></ruby>",
        MOBILE_TAB_PENDING_ARIA: "保留中タスクの列を表示します",
        MOBILE_TAB_PROGRESS_TEXT: "<ruby>進行中<rt aria-hidden=\"true\">しんこうちゅう</rt></ruby>＆レビュー",
        MOBILE_TAB_PROGRESS_ARIA: "進行中およびレビュー中タスクの列を表示します",
        MOBILE_TAB_COMPLETED_TEXT: "<ruby>完了済<rt aria-hidden=\"true\">かんりょうず</rt></ruby>み",
        MOBILE_TAB_COMPLETED_ARIA: "完了済みタスクの列を表示します",

        // =========================================================================
        // Pending Column (保留中レーン)
        // =========================================================================
        COLUMN_PENDING_TITLE: "保留中 ({value})",
        LANE_PENDING_ARIA: "保留中のタスク追跡リストレーン。アイテムが {value} 個含まれています。",
        TASK_CARD_ARIA: "タスクカード: {value}",
        TASK_CARD_CATEGORY_ARIA: "割り当てられたカテゴリタグ: {value}",
        TASK_DELETE_ARIA: "タスクカードを削除: {value}",
        TASK_DESCRIPTION_FALLBACK: "説明はありません。",
        
        // Task Assignee
        TASK_ASSIGNEE_LABEL: "<ruby>担当者<rt aria-hidden=\"true\">たんとうしゃ</rt></ruby>:",
        TASK_ASSIGNEE_ARIA: "タスク {value} にスタッフを割り当てます",
        TASK_ASSIGNEE_UNASSIGNED: "未割り当て",
        
        // Task Tag/Category
        TASK_CATEGORY_LABEL: "カテゴリ:",
        TASK_CATEGORY_ARIA_ASSIGN: "タスク {value} に分類タグを割り当てます",
        TASK_CATEGORY_NONE: "カテゴリなし",

        // Task Priority
        TASK_PRIORITY_ARIA: "優先度レベル: {value}",
        TASK_PRIORITY_HIGH: "<ruby>高<rt aria-hidden=\"true\">こう</rt></ruby>",
        TASK_PRIORITY_MEDIUM: "<ruby>中<rt aria-hidden=\"true\">ちゅう</rt></ruby>",
        TASK_PRIORITY_LOW: "<ruby>低<rt aria-hidden=\"true\">てい</rt></ruby>",
        TASK_DEADLINE_ARIA: "タスクの締切日: {value}",

        // Start Button
        TASK_ACTION_START_TEXT: "<ruby>開始<rt aria-hidden=\"true\">かいし</rt></ruby>する",
        TASK_ACTION_START_ARIA: "タスク {value} を開始します。カードを進行中レーンに移動します。",
    
        // =========================================================================
        // In-Progress & Review Column (進行中＆レビューレーン)
        // =========================================================================
        COLUMN_INPROGRESS_TITLE: "進行中／レビュー ({value})",
        LANE_INPROGRESS_ARIA: "進行中およびレビュー中のタスク追跡リストレーン。アイテムが {value} 個含まれています。",
        TASK_CARD_STATUS_ARIA: "タスクカード: {value1}、現在のステータス: {value2}",
        REVIEW_BANNER_TEXT: "PMレビュー<ruby>待ち<rt aria-hidden=\"true\">まち</rt></ruby>",
        REVIEW_BANNER_ARIA: "警告：{value} はプロジェクトマネージャーの承認レビュー待ちです。",

        // Related Buttons
        BTN_BACK_TEXT: "<ruby>戻<rt aria-hidden=\"true\">もど</rt>す</ruby>",
        BTN_BACK_ARIA: "{value} を前の保留中レーンに戻します",
        BTN_SUBMIT_REVIEW_TEXT: "レビューを<ruby>依頼<rt aria-hidden=\"true\">いらい</rt></ruby>",
        BTN_SUBMIT_REVIEW_ARIA: "プロジェクトマネージャーの承認レビュー用に {value} を提出します",
        BTN_CANCEL_REVIEW_TEXT: "依頼を<ruby>取消<rt aria-hidden=\"true\">とりけし</rt></ruby>",
        BTN_CANCEL_REVIEW_ARIA: "レビュー依頼をキャンセルし、{value} を進行中に戻します",
        BTN_REJECT_TEXT: "<ruby>差戻<rt aria-hidden=\"true\">さしもど</rt></ruby>し",
        BTN_REJECT_ARIA: "レビュー依頼を却下し、{value} を進行中レーンに戻します",
        BTN_APPROVE_TEXT: "タスクを<ruby>承認<rt aria-hidden=\"true\">しょうにん</rt></ruby>",
        BTN_APPROVE_ARIA: "レビューを承認し、{value} を完了済みレーンに移動します",

        // =========================================================================
        // Completed Column (完了済みレーン)
        // =========================================================================
        COLUMN_COMPLETED_TITLE: "完了済み ({value})",
        LANE_COMPLETED_ARIA: "完了済みタスクのアーカイブリストレーン。終了したアイテムが {value} 個含まれています。",
        TASK_CARD_COMPLETED_ARIA: "完了したタスクカード: {value}",
        BADGE_DONE_TEXT: "<ruby>完了<rt aria-hidden=\"true\">かんりょう</rt></ruby>",
        BADGE_DONE_ARIA: "タスク処理状態：完了",
        FINISHED_ASSIGNEE_ARIA: "終了したタスク {value} の割り当てスタッフ",
        FINISHED_CATEGORY_ARIA: "終了したタスク {value} の分類カテゴリ",
        FINISHED_PRIORITY_ARIA: "元の優先度レベル: {value}",
        
        // Related Button
        REOPEN_TEXT: "<ruby>再開<rt aria-hidden=\"true\">さいかい</rt></ruby>する",
        REOPEN_ARIA: "タスクアイテム {value} を再開します。カードを作業中の進行中レーンに戻します。",

        // Create a new Task Modal
        MODAL_TASK_HEADER_TEXT: "<ruby>新規<rt aria-hidden=\"true\">しんき</rt></ruby>タスクの<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        MODAL_TASK_HEADER_ARIA: "新規タスクの作成",
        MODAL_TASK_TITLE_LABEL: "タスク<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby> *",
        MODAL_TASK_TITLE_PLACEHOLDER: "例：データベーススキーマの設計",
        MODAL_TASK_DESC_LABEL: "<ruby>説明<rt aria-hidden=\"true\">せつめい</rt></ruby>",
        MODAL_TASK_DESC_PLACEHOLDER: "具体的なタスクの詳細を入力してください...",
        MODAL_TASK_PRIORITY_LABEL: "<ruby>優先度階層<rt aria-hidden=\"true\">ゆうせんどかいそう</rt></ruby>",
        MODAL_TASK_DEADLINE_LABEL: "<ruby>締切日<rt aria-hidden=\"true\">しめきりび</rt></ruby>",
        MODAL_TASK_DEADLINE_KEYBOARD_ARIA: "キーボードナビゲーションの注意：TabキーまたはEscapeキーを押すとカレンダー選択から抜けます。",
        MODAL_TASK_DEADLINE_INPUT_ARIA: "カレンダーで指定された完了日。",
        MODAL_TASK_CANCEL_BTN: "キャンセル",
        MODAL_TASK_CANCEL_ARIA: "タスク追加用フォームを閉じます",
        MODAL_TASK_SUBMIT_BTN: "タスクを<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        MODAL_TASK_SUBMIT_ARIA: "入力された仕様で新しいタスクを作成します",
    
        // Create a new Tag/Category Modal
        MODAL_TAG_HEADER: "<ruby>新<rt aria-hidden=\"true\">あたら</rt></ruby>しいワークスペースタグの<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        MODAL_TAG_NAME_LABEL: "タグ<ruby>名<rt aria-hidden=\"true\">めい</rt></ruby>:",
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
        MODAL_TAG_SUBMIT_BTN: "タグを<ruby>作成<rt aria-hidden=\"true\">さくせい</rt></ruby>",
        MODAL_TAG_SUBMIT_ARIA: "指定されたパラメータで新しいワークスペース分類タグを作成します"
    }
};