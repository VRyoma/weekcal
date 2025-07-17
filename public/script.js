// テーマ設定
const themes = {
    // ライトモード
    lightRed: { bg: '#FEF2F2', text: '#1F2937', accent: '#FEE2E2', border: '#FCA5A5', primary: '#EF4444' },
    lightOrange: { bg: '#FFF7ED', text: '#1F2937', accent: '#FFEDD5', border: '#FDBA74', primary: '#F97316' },
    lightYellow: { bg: '#FFFBEB', text: '#1F2937', accent: '#FEF3C7', border: '#FCD34D', primary: '#EAB308' },
    lightGreen: { bg: '#F0FDF4', text: '#1F2937', accent: '#DCFCE7', border: '#86EFAC', primary: '#22C55E' },
    lightBlue: { bg: '#EFF6FF', text: '#1F2937', accent: '#DBEAFE', border: '#93C5FD', primary: '#3B82F6' },
    lightIndigo: { bg: '#EEF2FF', text: '#1F2937', accent: '#E0E7FF', border: '#A5B4FC', primary: '#6366F1' },
    lightPurple: { bg: '#FAF5FF', text: '#1F2937', accent: '#F3E8FF', border: '#C4B5FD', primary: '#8B5CF6' },
    
    // ダークモード
    darkRed: { bg: '#1A0A0A', text: '#FFFFFF', accent: '#3A0A0A', border: '#DC2626', primary: '#EF4444' },
    darkOrange: { bg: '#1A0F0A', text: '#FFFFFF', accent: '#3A1F0A', border: '#EA580C', primary: '#F97316' },
    darkYellow: { bg: '#1A1A0A', text: '#FFFFFF', accent: '#3A2A0A', border: '#CA8A04', primary: '#EAB308' },
    darkGreen: { bg: '#0A1A0A', text: '#FFFFFF', accent: '#0A3A0A', border: '#16A34A', primary: '#22C55E' },
    darkBlue: { bg: '#0A0A1A', text: '#FFFFFF', accent: '#0A0A3A', border: '#2563EB', primary: '#3B82F6' },
    darkIndigo: { bg: '#0A0A1A', text: '#FFFFFF', accent: '#0A0A3A', border: '#4338CA', primary: '#6366F1' },
    darkPurple: { bg: '#1A0A1A', text: '#FFFFFF', accent: '#3A0A2A', border: '#7C3AED', primary: '#8B5CF6' },
    
    // モノクロテーマ
    lightMonochrome: { bg: '#FFFFFF', text: '#1F2937', accent: '#F3F4F6', border: '#9CA3AF', primary: '#374151' },
    darkMonochrome: { bg: '#0A0A0A', text: '#FFFFFF', accent: '#1A1A1A', border: '#6B7280', primary: '#D1D5DB' }
};

const themeNames = {
    // ライトモード
    lightRed: '赤（ライト）',
    lightOrange: '橙（ライト）',
    lightYellow: '黄（ライト）',
    lightGreen: '緑（ライト）',
    lightBlue: '青（ライト）',
    lightIndigo: '藍（ライト）',
    lightPurple: '紫（ライト）',
    
    // ダークモード
    darkRed: '赤（ダーク）',
    darkOrange: '橙（ダーク）',
    darkYellow: '黄（ダーク）',
    darkGreen: '緑（ダーク）',
    darkBlue: '青（ダーク）',
    darkIndigo: '藍（ダーク）',
    darkPurple: '紫（ダーク）',
    
    // モノクロテーマ
    lightMonochrome: '白（ライト）',
    darkMonochrome: '黒（ダーク）'
};

const days = [
    { key: 'sunday', label: '日', shortLabel: 'SUN' },
    { key: 'monday', label: '月', shortLabel: 'MON' },
    { key: 'tuesday', label: '火', shortLabel: 'TUE' },
    { key: 'wednesday', label: '水', shortLabel: 'WED' },
    { key: 'thursday', label: '木', shortLabel: 'THU' },
    { key: 'friday', label: '金', shortLabel: 'FRI' },
    { key: 'saturday', label: '土', shortLabel: 'SAT' }
];

// 状態管理
let currentTheme = 'lightBlue';
let schedules = {
    sunday: '',
    monday: '',
    tuesday: '',
    wednesday: '',
    thursday: '',
    friday: '',
    saturday: ''
};
let holidays = {
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false
};
let mainTitle = 'WEEKLY SCHEDULE';
let weeklyTitle = '一言メッセージ';
let weeklyMessage = '';
let characterImage = null;
let imagePosition = 'center'; // 画像位置の設定
let imageSize = 560; // 画像サイズの設定
let weekStartDay = 'sunday'; // 週の開始曜日（sunday, monday, saturday）

// localStorage キー
const STORAGE_KEYS = {
    THEME: 'weeklySchedule_theme',
    SCHEDULES: 'weeklySchedule_schedules',
    HOLIDAYS: 'weeklySchedule_holidays',
    MAIN_TITLE: 'weeklySchedule_mainTitle',
    TITLE: 'weeklySchedule_title',
    MESSAGE: 'weeklySchedule_message',
    IMAGE: 'weeklySchedule_image',
    IMAGE_POSITION: 'weeklySchedule_imagePosition',
    IMAGE_SIZE: 'weeklySchedule_imageSize',
    WEEK_START_DAY: 'weeklySchedule_weekStartDay'
};

// データ保存関数
function saveData() {
    try {
        localStorage.setItem(STORAGE_KEYS.THEME, currentTheme);
        localStorage.setItem(STORAGE_KEYS.SCHEDULES, JSON.stringify(schedules));
        localStorage.setItem(STORAGE_KEYS.HOLIDAYS, JSON.stringify(holidays));
        localStorage.setItem(STORAGE_KEYS.MAIN_TITLE, mainTitle);
        localStorage.setItem(STORAGE_KEYS.TITLE, weeklyTitle);
        localStorage.setItem(STORAGE_KEYS.MESSAGE, weeklyMessage);
        
        // 画像が存在する場合はBase64で保存
        if (characterImage) {
            const canvas = document.createElement('canvas');
            canvas.width = characterImage.width;
            canvas.height = characterImage.height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(characterImage, 0, 0);
            const imageData = canvas.toDataURL('image/png');
            localStorage.setItem(STORAGE_KEYS.IMAGE, imageData);
        } else {
            localStorage.removeItem(STORAGE_KEYS.IMAGE);
        }
        
        // 画像位置を保存
        localStorage.setItem(STORAGE_KEYS.IMAGE_POSITION, imagePosition);
        
        // 画像サイズを保存
        localStorage.setItem(STORAGE_KEYS.IMAGE_SIZE, imageSize.toString());
        
        // 週の開始曜日を保存
        localStorage.setItem(STORAGE_KEYS.WEEK_START_DAY, weekStartDay);
        
        console.log('データを保存しました');
    } catch (error) {
        console.error('データ保存エラー:', error);
    }
}

// データ復元関数
function loadData() {
    try {
        // テーマの復元
        const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME);
        if (savedTheme && themes[savedTheme]) {
            currentTheme = savedTheme;
        }

        // スケジュールの復元
        const savedSchedules = localStorage.getItem(STORAGE_KEYS.SCHEDULES);
        if (savedSchedules) {
            schedules = JSON.parse(savedSchedules);
        }

        // 祝日の復元
        const savedHolidays = localStorage.getItem(STORAGE_KEYS.HOLIDAYS);
        if (savedHolidays) {
            holidays = JSON.parse(savedHolidays);
        }

        // メインタイトルの復元
        const savedMainTitle = localStorage.getItem(STORAGE_KEYS.MAIN_TITLE);
        if (savedMainTitle) {
            mainTitle = savedMainTitle;
        }

        // タイトルの復元
        const savedTitle = localStorage.getItem(STORAGE_KEYS.TITLE);
        if (savedTitle) {
            weeklyTitle = savedTitle;
        }

        // メッセージの復元
        const savedMessage = localStorage.getItem(STORAGE_KEYS.MESSAGE);
        if (savedMessage) {
            weeklyMessage = savedMessage;
        }

        // 画像の復元
        const savedImage = localStorage.getItem(STORAGE_KEYS.IMAGE);
        if (savedImage) {
            const img = new Image();
            img.onload = function() {
                characterImage = img;
                const uploadSuccess = document.getElementById('uploadSuccess');
                uploadSuccess.classList.remove('hidden');
                
                // 画像サイズ調整コントロールを表示
                const imageSizeControl = document.getElementById('imageSizeControl');
                if (imageSizeControl) {
                    imageSizeControl.style.display = 'block';
                }
                
                generateImage();
            };
            img.src = savedImage;
        }

        // 画像位置の復元
        const savedImagePosition = localStorage.getItem(STORAGE_KEYS.IMAGE_POSITION);
        if (savedImagePosition) {
            imagePosition = savedImagePosition;
        }

        // 画像サイズの復元
        const savedImageSize = localStorage.getItem(STORAGE_KEYS.IMAGE_SIZE);
        if (savedImageSize) {
            imageSize = parseInt(savedImageSize);
        }

        // 週の開始曜日の復元
        const savedWeekStartDay = localStorage.getItem(STORAGE_KEYS.WEEK_START_DAY);
        if (savedWeekStartDay) {
            weekStartDay = savedWeekStartDay;
        }

        console.log('データを復元しました');
    } catch (error) {
        console.error('データ復元エラー:', error);
    }
}

// データクリア関数
function clearData() {
    try {
        localStorage.removeItem(STORAGE_KEYS.THEME);
        localStorage.removeItem(STORAGE_KEYS.SCHEDULES);
        localStorage.removeItem(STORAGE_KEYS.HOLIDAYS);
        localStorage.removeItem(STORAGE_KEYS.TITLE);
        localStorage.removeItem(STORAGE_KEYS.MESSAGE);
        localStorage.removeItem(STORAGE_KEYS.IMAGE);
        
        // 状態をリセット
        currentTheme = 'lightBlue';
        schedules = {
            sunday: '', monday: '', tuesday: '', wednesday: '',
            thursday: '', friday: '', saturday: ''
        };
        holidays = {
            monday: false, tuesday: false, wednesday: false,
            thursday: false, friday: false
        };
        mainTitle = 'WEEKLY SCHEDULE';
        weeklyTitle = '一言メッセージ';
        weeklyMessage = '';
        characterImage = null;
        imagePosition = 'center';
        
        // UIを更新
        initializeThemeGrid();
        initializeScheduleGrid();
        document.getElementById('mainTitle').value = mainTitle;
        document.getElementById('weeklyTitle').value = weeklyTitle;
        document.getElementById('weeklyMessage').value = '';
        document.getElementById('uploadSuccess').classList.add('hidden');
        
        // 画像位置のラジオボタンを更新
        const centerRadio = document.querySelector('input[name="imagePosition"][value="center"]');
        const bottomRadio = document.querySelector('input[name="imagePosition"][value="bottom"]');
        if (centerRadio && bottomRadio) {
            centerRadio.checked = imagePosition === 'center';
            bottomRadio.checked = imagePosition === 'bottom';
        }
        
        generateImage();
        
        console.log('データをクリアしました');
    } catch (error) {
        console.error('データクリアエラー:', error);
    }
}

// 初期化
document.addEventListener('DOMContentLoaded', function() {
    loadData(); // 保存されたデータを復元
    initializeThemeGrid();
    initializeScheduleGrid();
    initializeEventListeners();
    initializeShareButtons(); // シェアボタンの表示制御を追加
    initializeWeekStartDayListeners(); // 週の開始曜日のイベントリスナーを追加
    
    // 強制的に画像を再生成
    setTimeout(() => {
        generateImage();
    }, 100);
    
    // タイトルとメッセージフィールドの値を復元
    document.getElementById('mainTitle').value = mainTitle;
    document.getElementById('weeklyTitle').value = weeklyTitle;
    document.getElementById('weeklyMessage').value = weeklyMessage;
    
    // 画像位置のラジオボタンを設定
    const centerRadio = document.querySelector('input[name="imagePosition"][value="center"]');
    const bottomRadio = document.querySelector('input[name="imagePosition"][value="bottom"]');
    if (centerRadio && bottomRadio) {
        centerRadio.checked = imagePosition === 'center';
        bottomRadio.checked = imagePosition === 'bottom';
    }
});

function initializeThemeGrid() {
    const themeGrid = document.getElementById('themeGrid');
    themeGrid.innerHTML = '';

    // ライトモードとダークモードを分けて表示
    const lightThemes = ['lightMonochrome', 'lightRed', 'lightOrange', 'lightYellow', 'lightGreen', 'lightBlue', 'lightIndigo', 'lightPurple'];
    const darkThemes = ['darkMonochrome', 'darkRed', 'darkOrange', 'darkYellow', 'darkGreen', 'darkBlue', 'darkIndigo', 'darkPurple'];

    // ライトモードセクション
    const lightSection = document.createElement('div');
    lightSection.className = 'mb-4';
    lightSection.innerHTML = '<h3 class="text-sm font-semibold text-gray-600 mb-2">ライトモード</h3>';
    const lightGrid = document.createElement('div');
    lightGrid.className = 'grid grid-cols-8 gap-2';
    lightSection.appendChild(lightGrid);

    lightThemes.forEach(color => {
        const button = createThemeButton(color);
        lightGrid.appendChild(button);
    });

    // ダークモードセクション
    const darkSection = document.createElement('div');
    darkSection.innerHTML = '<h3 class="text-sm font-semibold text-gray-600 mb-2">ダークモード</h3>';
    const darkGrid = document.createElement('div');
    darkGrid.className = 'grid grid-cols-8 gap-2';
    darkSection.appendChild(darkGrid);

    darkThemes.forEach(color => {
        const button = createThemeButton(color);
        darkGrid.appendChild(button);
    });

    themeGrid.appendChild(lightSection);
    themeGrid.appendChild(darkSection);
}

function createThemeButton(color) {
    const button = document.createElement('button');
    button.className = `relative p-3 rounded-lg border-2 transition-all cursor-pointer font-bold text-xs transform scale-100 hover:scale-105 ${currentTheme === color ? 'border-blue-500 shadow-lg scale-105' : ''}`;
    button.style.backgroundColor = themes[color].bg;
    button.style.color = themes[color].text;
    button.style.borderColor = currentTheme === color ? themes[color].primary : themes[color].border;
    button.innerHTML = `
        <div>${themeNames[color].split('（')[0]}</div>
        ${currentTheme === color ? `<div class="absolute top-1 right-1 w-2 h-2 rounded-full" style="background-color: ${themes[color].primary}"></div>` : ''}
    `;
    button.onclick = () => setTheme(color);
    return button;
}

function initializeScheduleGrid() {
    const scheduleGrid = document.getElementById('scheduleGrid');
    scheduleGrid.innerHTML = '';

    const orderedDays = getOrderedDays();
    orderedDays.forEach(day => {
        const row = document.createElement('div');
        row.className = 'flex items-center gap-3 flex-wrap';

        // 祝日判定を修正
        const isHoliday = holidays[day.key] || day.key === 'sunday';
        const isSaturday = day.key === 'saturday';
        
        // カラーテーマに応じた色分け
        let dayColor;
        if (isHoliday) {
            // 祝日・日曜日は赤系
            dayColor = '#E74C3C';
        } else if (isSaturday) {
            // 土曜日は青系
            dayColor = '#3498DB';
        } else {
            // 平日はテーマカラー
            dayColor = themes[currentTheme].primary;
        }

        // CSSクラスも色に応じて設定
        let dayClass;
        if (isHoliday) {
            dayClass = 'bg-red-500';
        } else if (isSaturday) {
            dayClass = 'bg-blue-500';
        } else {
            // 平日はテーマに応じた色を使用
            dayClass = 'bg-blue-600'; // デフォルト
        }

        row.innerHTML = `
            <div class="w-20 text-center p-2 rounded-lg text-white font-bold shadow-md flex-shrink-0 ${dayClass}" style="background-color: ${dayColor}">
                <div class="text-lg">${day.label}</div>
                <div class="text-xs opacity-80">${day.shortLabel}</div>
            </div>
            <input type="text" class="flex-1 min-w-48 p-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all" 
                   id="schedule_${day.key}" 
                   value="${schedules[day.key]}" 
                   placeholder="予定を入力...">
            ${day.key !== 'sunday' && day.key !== 'saturday' ? `
                <label class="flex items-center gap-2 cursor-pointer flex-shrink-0">
                    <input type="checkbox" id="holiday_${day.key}" ${holidays[day.key] ? 'checked' : ''} class="w-5 h-5 cursor-pointer accent-red-500">
                    <span class="text-sm text-gray-600 whitespace-nowrap">祝日</span>
                </label>
            ` : ''}
        `;
        scheduleGrid.appendChild(row);
    });

    // スケジュール入力のイベントリスナーを即座に追加
    days.forEach(day => {
        const input = document.getElementById(`schedule_${day.key}`);
        if (input) {
            input.addEventListener('input', (e) => {
                schedules[day.key] = e.target.value;
                saveData(); // データを保存
                generateImage();
            });
        }
    });

    // 祝日チェックボックスのイベントリスナーを即座に追加
    days.forEach(day => {
        if (day.key !== 'sunday' && day.key !== 'saturday') {
            const holidayCheckbox = document.getElementById(`holiday_${day.key}`);
            if (holidayCheckbox) {
                holidayCheckbox.addEventListener('change', (e) => {
                    holidays[day.key] = e.target.checked;
                    saveData(); // データを保存
                    // スケジュール入力欄をクリアせずに色だけ更新
                    updateScheduleColors();
                    generateImage();
                });
            }
        }
    });
}

// スケジュールの色を更新する関数（HTMLを再生成せずに色だけ変更）
function updateScheduleColors() {
    days.forEach(day => {
        const dayElement = document.querySelector(`#schedule_${day.key}`).parentElement.querySelector('div');
        const isHoliday = holidays[day.key] || day.key === 'sunday';
        const isSaturday = day.key === 'saturday';
        
        // カラーテーマに応じた色分け
        let dayColor;
        if (isHoliday) {
            // 祝日・日曜日は赤系
            dayColor = '#E74C3C';
        } else if (isSaturday) {
            // 土曜日は青系
            dayColor = '#3498DB';
        } else {
            // 平日はテーマカラー
            dayColor = themes[currentTheme].primary;
        }

        // CSSクラスも色に応じて設定
        let dayClass;
        if (isHoliday) {
            dayClass = 'bg-red-500';
        } else if (isSaturday) {
            dayClass = 'bg-blue-500';
        } else {
            // 平日はテーマに応じた色を使用
            dayClass = 'bg-blue-600'; // デフォルト
        }

        // クラスとスタイルを更新
        dayElement.className = `w-20 text-center p-2 rounded-lg text-white font-bold shadow-md flex-shrink-0 ${dayClass}`;
        dayElement.style.backgroundColor = dayColor;
    });
}

function initializeEventListeners() {
    // メインタイトル入力のイベントリスナー
    document.getElementById('mainTitle').addEventListener('input', (e) => {
        mainTitle = e.target.value;
        saveData(); // データを保存
        generateImage();
    });

    // タイトル入力のイベントリスナー
    document.getElementById('weeklyTitle').addEventListener('input', (e) => {
        weeklyTitle = e.target.value;
        saveData(); // データを保存
        generateImage();
    });

    // メッセージ入力のイベントリスナー
    document.getElementById('weeklyMessage').addEventListener('input', (e) => {
        weeklyMessage = e.target.value;
        saveData(); // データを保存
        generateImage();
    });

    // 画像アップロードのイベントリスナー
    document.getElementById('imageInput').addEventListener('change', handleImageUpload);

    // 画像位置選択のイベントリスナー
    document.querySelectorAll('input[name="imagePosition"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            imagePosition = e.target.value;
            saveData(); // データを保存
            generateImage();
        });
    });

    // 画像サイズ調整のイベントリスナー
    const imageSizeSlider = document.getElementById('imageSizeSlider');
    const imageSizeValue = document.getElementById('imageSizeValue');
    const imageSizeControl = document.getElementById('imageSizeControl');
    
    if (imageSizeSlider && imageSizeValue) {
        imageSizeSlider.value = imageSize;
        imageSizeValue.textContent = imageSize + 'px';
        
        imageSizeSlider.addEventListener('input', (e) => {
            imageSize = parseInt(e.target.value);
            imageSizeValue.textContent = imageSize + 'px';
            saveData(); // データを保存
            generateImage();
        });
    }
}

function setTheme(theme) {
    currentTheme = theme;
    saveData(); // データを保存
    initializeThemeGrid();
    // スケジュール入力欄をクリアせずに色だけ更新
    updateScheduleColors();
    generateImage();
}

function handleImageUpload(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            const img = new Image();
            img.onload = function() {
                characterImage = img;
                const uploadSuccess = document.getElementById('uploadSuccess');
                uploadSuccess.classList.remove('hidden');
                
                // 画像サイズ調整コントロールを表示
                const imageSizeControl = document.getElementById('imageSizeControl');
                if (imageSizeControl) {
                    imageSizeControl.style.display = 'block';
                }
                
                saveData(); // データを保存
                generateImage();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
}

function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

function generateImage() {
    const canvas = document.getElementById('previewCanvas');
    const ctx = canvas.getContext('2d');
    const theme = themes[currentTheme];
    
    // キャンバスサイズを固定（1920x1080）
    canvas.width = 1920;
    canvas.height = 1080;
    
    // 背景をテーマに応じて設定
    ctx.save();
    ctx.globalAlpha = 1.0;
    if (currentTheme.startsWith('light')) {
        ctx.fillStyle = '#fff';
    } else {
        ctx.fillStyle = '#000';
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.restore();
    
    // デバッグ用：キャンバスサイズをログ出力
    console.log('Canvas size:', canvas.width, 'x', canvas.height);
    
    // スケーリングを無効にして実際のピクセルサイズで描画
    ctx.imageSmoothingEnabled = false;
    
    // クリアガラス風グラデーション背景
    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    if (currentTheme.startsWith('light')) {
        // ライトモード用グラデーション
        gradient.addColorStop(0, theme.bg);
        gradient.addColorStop(0.3, theme.accent + '80');
        gradient.addColorStop(0.7, theme.primary + '40');
        gradient.addColorStop(1, theme.accent);
    } else {
        // ダークモード用グラデーション（より強く）
        gradient.addColorStop(0, theme.bg);
        gradient.addColorStop(0.3, theme.accent + '80');
        gradient.addColorStop(0.7, theme.primary + '60');
        gradient.addColorStop(1, theme.accent + 'A0');
    }
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // ガラス効果のオーバーレイ
    const glassOverlay = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width * 0.8);
    glassOverlay.addColorStop(0, currentTheme.startsWith('light') ? 'rgba(255, 255, 255, 0.1)' : 'rgba(255, 255, 255, 0.02)');
    glassOverlay.addColorStop(0.5, 'rgba(255, 255, 255, 0.02)');
    glassOverlay.addColorStop(1, 'rgba(255, 255, 255, 0)');
    ctx.fillStyle = glassOverlay;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // タイトル部分
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 5;
    
    // タイトル背景（各曜日の枠と同じ幅に統一・角丸・ガラス風・光彩&シャドウ）
    const titleBg = ctx.createLinearGradient(56, 25, 1144, 120);
    titleBg.addColorStop(0, theme.primary + '10');
    titleBg.addColorStop(0.3, theme.primary + '30');
    titleBg.addColorStop(0.7, theme.accent + '20');
    titleBg.addColorStop(1, theme.primary + '10');
    // 外側光彩
    ctx.save();
    ctx.shadowColor = 'rgba(255,255,255,0.25)';
    ctx.shadowBlur = 32;
    ctx.shadowOffsetY = 0;
    ctx.fillStyle = titleBg;
    roundRect(ctx, 56, 25, 1088, 95, 32);
    ctx.fill();
    ctx.restore();
    // シャドウ
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.10)';
    ctx.shadowBlur = 18;
    ctx.shadowOffsetY = 4;
    ctx.fillStyle = 'rgba(255,255,255,0)'; // 透明でシャドウだけ
    roundRect(ctx, 56, 25, 1088, 95, 32);
    ctx.fill();
    ctx.restore();
    // 白半透明レイヤーでガラス感（さらに薄く）
    ctx.save();
    ctx.globalAlpha = 0.10;
    ctx.fillStyle = 'rgba(255,255,255,1)';
    roundRect(ctx, 56, 25, 1088, 95, 32);
    ctx.fill();
    ctx.restore();
    
    ctx.fillStyle = theme.text;
    ctx.font = 'bold 58px "Hiragino UD Sans", "UD新ゴ", "BIZ UDPGothic", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(mainTitle, 56 + 1088 / 2, 25 + 95 / 2);
    ctx.restore();
    
    // 曜日ごとのスケジュール
    const startY = 145;
    const boxHeight = 95; // 高さを適度に調整
    const boxWidth = 1088;
    const spacing = 11; // 間隔も適度に調整
    const cornerRadius = 16;
    
    // 背景ボックス
    ctx.fillStyle = currentTheme.startsWith('light')
        ? theme.accent + 'A0'
        : theme.accent + '80';
    roundRect(ctx, 24, startY - 16, boxWidth + 40, (boxHeight + spacing) * 7 + 24, 32);
    ctx.fill();
    
    const orderedDays = getOrderedDays();
    orderedDays.forEach((day, index) => {
        const y = startY + (boxHeight + spacing) * index;
        const isHoliday = holidays[day.key] || day.key === 'sunday';
        const isSaturday = day.key === 'saturday';
        
        // メインボックス
        ctx.fillStyle = currentTheme.startsWith('light')
            ? theme.bg + 'F0'
            : theme.bg + 'F0';
        roundRect(ctx, 56, y, boxWidth - 56, boxHeight, cornerRadius);
        ctx.fill();
        ctx.restore();
        
        // 曜日ラベル部分
        ctx.save();
        // カラーテーマに応じた色分け
        let dayColor;
        if (isHoliday) {
            // 祝日・日曜日は赤系
            dayColor = '#E74C3C';
        } else if (isSaturday) {
            // 土曜日は青系
            dayColor = '#3498DB';
        } else {
            // 平日はテーマカラー
            dayColor = theme.primary;
        }
        
        ctx.fillStyle = dayColor;
        roundRect(ctx, 56, y, 120, boxHeight, cornerRadius);
        ctx.fill();
        
        // 曜日テキスト
        ctx.fillStyle = currentTheme.startsWith('light') ? '#FFFFFF' : theme.bg;
        ctx.font = 'bold 30px "Hiragino UD Sans", "UD新ゴ", "BIZ UDPGothic", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(day.label, 116, y + 47);
        
        ctx.font = '15px "Hiragino UD Sans", "UD新ゴ", "BIZ UDPGothic", sans-serif';
        ctx.fillText(day.shortLabel, 116, y + 65);
        ctx.restore();
        
        // スケジュールテキスト
        ctx.fillStyle = theme.text;
        ctx.textAlign = 'left';
        
        const text = schedules[day.key];
        const maxWidth = boxWidth - 240;
        const maxHeight = boxHeight - 18; // 上下の余白を考慮（適度に調整）
        
        // 文字列の幅と高さを計算して最適なフォントサイズを決定
        let fontSize = 150; // 開始サイズを非常に大きく設定
        let textMetrics;
        
        do {
            ctx.font = `bold ${fontSize}px sans-serif`;
            textMetrics = ctx.measureText(text);
            fontSize--;
        } while ((textMetrics.width > maxWidth || fontSize * 1.2 > maxHeight) && fontSize > 40);
        
        // 最終的なフォントサイズを設定
        ctx.font = `bold ${fontSize}px sans-serif`;
        console.log('Schedule fontSize:', fontSize);
        
        // テキストを複数行に分割して表示
        const words = text.split('');
        const lines = [];
        let currentLine = '';
        
        for (let i = 0; i < words.length; i++) {
            const testLine = currentLine + words[i];
            const testWidth = ctx.measureText(testLine).width;
            
            if (testWidth > maxWidth && currentLine !== '') {
                lines.push(currentLine);
                currentLine = words[i];
            } else {
                currentLine = testLine;
            }
        }
        if (currentLine !== '') {
            lines.push(currentLine);
        }
        
        // 最大3行まで表示
        const maxLines = 3;
        const displayLines = lines.slice(0, maxLines);
        
        // 行間隔を計算
        const lineHeight = fontSize * 1.2;
        const totalHeight = displayLines.length * lineHeight;
        const textStartY = y + (boxHeight - totalHeight) / 2;
        
        // 各行を描画
        displayLines.forEach((line, index) => {
            const lineY = textStartY + (index * lineHeight) + fontSize;
            ctx.fillText(line, 192, lineY);
        });
    });
    
    // キャラクター画像を描画（メッセージ欄の前に描画）
    if (characterImage) {
        const imgWidth = imageSize;
        const imgHeight = characterImage.height * (imgWidth / characterImage.width);
        
        // 元の位置（右から500px）を基準点としてX座標を計算
        const originalImgX = canvas.width - 375; // 元の位置（右から500px）
        const imgX = originalImgX - imgWidth / 2; // 基準点から画像の中心を計算
        
        // 画像位置に応じてY座標を計算
        let imgY;
        if (imagePosition === 'center') {
            // 上下中央寄せ
            imgY = canvas.height / 2 - imgHeight / 2;
        } else {
            // 下寄せ（画像の一番下にぴったり）
            imgY = canvas.height - imgHeight;
        }
        
        // 影を描画（画像の形状に合わせる）
        ctx.save();
        ctx.globalCompositeOperation = 'multiply';
        ctx.globalAlpha = 0.15;
        
        // ブラー効果を追加
        ctx.filter = 'blur(8px)';
        
        // 影用の画像を描画（少しずらした位置）
        ctx.drawImage(characterImage, imgX + 12, imgY + 12, imgWidth, imgHeight);
        ctx.restore();
        
        // 実際の画像を描画（影の上に重ねる）
        ctx.drawImage(characterImage, imgX, imgY, imgWidth, imgHeight);
    }
    
    // 右上に透かしを描画
    ctx.save();
    ctx.font = 'bold 28px "Hiragino UD Sans", "UD新ゴ", "BIZ UDPGothic", sans-serif';
    ctx.globalAlpha = 0.13;
    ctx.fillStyle = theme.text;
    ctx.textAlign = 'right';
    ctx.textBaseline = 'top';
    ctx.fillText('#週間スケジュール画像メーカー', canvas.width - 60, 32);
    ctx.globalAlpha = 1.0;
    ctx.restore();
    
    // 今週の目標・メッセージ欄（キャラクター画像の後に描画）
    const messageBoxHeight = 140;
    const messageY = canvas.height - messageBoxHeight - 25; // 土曜日の枠との重複を避けるため余白を調整
    
    ctx.save();
    ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
    ctx.shadowBlur = 12;
    ctx.shadowOffsetY = 3;
    
    // メッセージボックス（画面いっぱいの横幅）
    ctx.fillStyle = currentTheme.startsWith('light')
        ? theme.bg + 'F0'
        : theme.bg + 'F0';
    roundRect(ctx, 56, messageY, canvas.width - 112, 140, cornerRadius);
    ctx.fill();
    
    // メッセージラベル（幅を広げる）
    ctx.fillStyle = theme.primary;
    roundRect(ctx, 56, messageY, 200, 140, cornerRadius);
    ctx.fill();
    
    ctx.fillStyle = currentTheme.startsWith('light') ? '#FFFFFF' : theme.bg;
    ctx.textAlign = 'center';
    
    // タイトルの文字サイズを文字数に応じて調整
    let titleFontSize = 24; // 開始サイズ
    if (weeklyTitle.length > 8) {
        titleFontSize = 20;
    } else if (weeklyTitle.length > 6) {
        titleFontSize = 22;
    }
    
    ctx.font = `bold ${titleFontSize}px sans-serif`;
    
    // タイトルを1行で表示（上下中央寄せ）
    ctx.fillText(weeklyTitle, 156, messageY + 80);
    ctx.restore();
    
    // メッセージテキスト
    ctx.fillStyle = theme.text;
    ctx.textAlign = 'left';
    
    const message = weeklyMessage;
    const messageMaxWidth = canvas.width - 320; // タイトル部分を広げた分を調整（余白をさらに増やす）
    const messageMaxHeight = 140 - 20; // メッセージボックスの高さから余白を引く
    
    // 文字列の幅と高さを計算して最適なフォントサイズを決定
    let messageFontSize = 120; // 開始サイズを非常に大きく設定
    let messageTextMetrics;
    
    // 4行表示時の文字サイズ調整
    const maxLines = 4;
    const lineHeight = 1.2;
    const maxFontSizeForLines = messageMaxHeight / (maxLines * lineHeight) * 0.8; // さらに小さく調整
    
    do {
        ctx.font = `bold ${messageFontSize}px sans-serif`;
        messageTextMetrics = ctx.measureText(message);
        messageFontSize--;
    } while ((messageTextMetrics.width > messageMaxWidth || messageFontSize * lineHeight > maxFontSizeForLines) && messageFontSize > 25);
    
    // 最終的なフォントサイズを設定
    ctx.font = `bold ${messageFontSize}px sans-serif`;
    console.log('Message fontSize:', messageFontSize);
    
    // メッセージを複数行に分割して表示
    const messageWords = message.split('');
    const messageLines = [];
    let currentMessageLine = '';
    
    for (let i = 0; i < messageWords.length; i++) {
        const testLine = currentMessageLine + messageWords[i];
        const testWidth = ctx.measureText(testLine).width;
        
        if (testWidth > messageMaxWidth && currentMessageLine !== '') {
            messageLines.push(currentMessageLine);
            currentMessageLine = messageWords[i];
        } else {
            currentMessageLine = testLine;
        }
    }
    if (currentMessageLine !== '') {
        messageLines.push(currentMessageLine);
    }
    
    // 改行文字（\n）で分割された行も考慮
    const finalMessageLines = [];
    messageLines.forEach(line => {
        const subLines = line.split('\n');
        finalMessageLines.push(...subLines);
    });
    
    // 最大4行まで表示
    const maxMessageLines = 4;
    const displayMessageLines = finalMessageLines.slice(0, maxMessageLines);
    
    // 行数に応じて文字サイズを調整
    if (displayMessageLines.length === 1) {
        messageFontSize = Math.min(80, messageMaxHeight * 0.8); // 1行の場合は大きく
    } else if (displayMessageLines.length === 2) {
        messageFontSize = Math.min(60, messageMaxHeight * 0.6); // 2行の場合は中程度
    } else if (displayMessageLines.length === 3) {
        messageFontSize = Math.min(50, messageMaxHeight * 0.3); // 3行の場合は少し小さく
    } else {
        // 4行の場合は既存の計算を使用
        messageFontSize = Math.max(messageFontSize, 25); // 最小25px
    }
    
    // 調整後のフォントサイズを再設定
    ctx.font = `bold ${messageFontSize}px sans-serif`;
    
    // 行間隔を計算
    const messageLineHeight = messageFontSize * 1.2;
    const totalMessageHeight = displayMessageLines.length * messageLineHeight;
    const messageStartY = messageY + (140 - totalMessageHeight) / 2;
    
    // 各行を描画
    displayMessageLines.forEach((line, index) => {
        const lineY = messageStartY + (index * messageLineHeight) + messageFontSize;
        ctx.fillText(line, 275, lineY);
    });
}

function downloadImage() {
    generateImage();
    const canvas = document.getElementById('previewCanvas');
    const link = document.createElement('a');
    link.download = `weekly-schedule-${new Date().toISOString().split('T')[0]}.png`;
    link.href = canvas.toDataURL();
    link.click();
}

// Web Share API用の関数
function webShare() {
    generateImage();
    const canvas = document.getElementById('previewCanvas');
    
    try {
        canvas.toBlob(function(blob) {
            if (blob) {
                const file = new File([blob], 'weekly-schedule.png', { type: 'image/png' });
                
                if (navigator.share) {
                    navigator.share({
                        title: '今週のスケジュール',
                        text: '週間スケジュールを作成しました！ #週間スケジュール画像メーカー https://weekcal.vvil.jp/',
                        files: [file]
                    }).catch(function(error) {
                        console.error('Web Share エラー:', error);
                        alert('シェアに失敗しました。');
                    });
                }
            }
        });
    } catch (error) {
        console.error('Web Share エラー:', error);
        alert('シェアに失敗しました。');
    }
}

// X直接シェア用の関数（スマホ対応版）
function shareToX() {
    // まず先にXのURLを準備（ユーザーアクションとして認識させるため）
    const text = encodeURIComponent('週間スケジュールを作成しました！ #週間スケジュール画像メーカー https://weekcal.vvil.jp/');
    const xUrl = `https://x.com/intent/tweet?text=${text}`;
    
    // モバイルデバイスかどうかを判定
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (isMobile) {
        // モバイルの場合は直接Xを開く（ポップアップブロッカー回避）
        window.location.href = xUrl;
        return;
    }
    
    // PC/デスクトップの場合はクリップボードコピーを試行
    generateImage();
    const canvas = document.getElementById('previewCanvas');
    
    // 先にXを開く（ユーザーアクションとして認識させるため）
    const xWindow = window.open(xUrl, '_blank');
    
    // 画像をクリップボードにコピー（バックグラウンドで実行）
    canvas.toBlob(async function(blob) {
        try {
            // クリップボードAPIが利用可能かチェック
            if (navigator.clipboard && window.ClipboardItem) {
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                
                // 成功メッセージを表示
                showCopyNotification('画像をクリップボードにコピーしました！\nXで Ctrl+V (Cmd+V) で貼り付けできます');
            }
        } catch (error) {
            console.error('クリップボードコピーエラー:', error);
            // エラーでも通知は表示しない（Xは既に開いているため）
        }
    });
}



// シェアボタンの表示制御
function initializeShareButtons() {
    const webShareBtn = document.getElementById('webShareBtn');
    const xShareBtn = document.getElementById('xShareBtn');
    
    // Web Share APIが利用可能かチェック
    if (navigator.share && navigator.canShare && navigator.canShare({ files: [new File([''], 'test.png', { type: 'image/png' })] })) {
        // モバイルデバイスでWeb Share APIが利用可能な場合
        webShareBtn.style.display = 'flex';
        xShareBtn.style.display = 'flex';
    } else {
        // PCやWeb Share API非対応の場合はXシェアのみ表示
        webShareBtn.style.display = 'none';
        xShareBtn.style.display = 'flex';
    }
}

// データクリアボタンの機能を追加（デバッグ用）
function addClearDataButton() {
    const clearButton = document.createElement('button');
    clearButton.textContent = 'データクリア';
    clearButton.className = 'fixed bottom-4 right-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-lg z-50';
    clearButton.onclick = clearData;
    document.body.appendChild(clearButton);
}

// 開発時のみクリアボタンを表示
if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    addClearDataButton();
} 
// 週の開始曜
日に応じて曜日の順番を取得する関数
function getOrderedDays() {
    const dayOrder = {
        'saturday': ['saturday', 'sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday'],
        'sunday': ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'],
        'monday': ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
    };
    
    const orderedKeys = dayOrder[weekStartDay];
    return orderedKeys.map(key => days.find(day => day.key === key));
}

// 週の開始曜日を変更する関数
function changeWeekStartDay(newStartDay) {
    weekStartDay = newStartDay;
    saveData(); // データを保存
    
    // スケジュール入力欄を再生成（入力内容は維持される）
    initializeScheduleGrid();
    
    // 画像を再生成
    generateImage();
}

// 週の開始曜日のイベントリスナーを初期化
function initializeWeekStartDayListeners() {
    document.querySelectorAll('input[name="weekStartDay"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                changeWeekStartDay(e.target.value);
            }
        });
    });
    
    // 保存された値に応じてラジオボタンを設定
    const savedRadio = document.querySelector(`input[name="weekStartDay"][value="${weekStartDay}"]`);
    if (savedRadio) {
        savedRadio.checked = true;
    }
}// 
クリップボードにコピーする関数
function copyToClipboard() {
    generateImage();
    const canvas = document.getElementById('previewCanvas');
    
    canvas.toBlob(async function(blob) {
        try {
            // クリップボードAPIが利用可能かチェック
            if (navigator.clipboard && window.ClipboardItem) {
                const item = new ClipboardItem({ 'image/png': blob });
                await navigator.clipboard.write([item]);
                
                // 成功メッセージを表示
                showCopyNotification('画像をクリップボードにコピーしました！');
            } else {
                // クリップボードAPIが利用できない場合
                showCopyNotification('お使いのブラウザではクリップボード機能がサポートされていません', 'error');
            }
        } catch (error) {
            console.error('クリップボードコピーエラー:', error);
            showCopyNotification('クリップボードへのコピーに失敗しました', 'error');
        }
    });
}

// コピー通知を表示する関数（改良版）
function showCopyNotification(message, type = 'success') {
    // 既存の通知があれば削除
    const existingNotification = document.getElementById('copyNotification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 通知要素を作成
    const notification = document.createElement('div');
    notification.id = 'copyNotification';
    
    const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';
    const icon = type === 'success' 
        ? `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
           </svg>`
        : `<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
             <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
           </svg>`;
    
    notification.className = `fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center gap-2 animate-pulse`;
    notification.innerHTML = `${icon}<span>${message}</span>`;
    
    document.body.appendChild(notification);
    
    // 3秒後に自動で削除
    setTimeout(() => {
        if (notification && notification.parentNode) {
            notification.remove();
        }
    }, 3000);
}