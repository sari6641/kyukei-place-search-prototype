const maps = {
  '1F': {
    restArea: null, 
    walls: `
      <polyline points="150,80 150,20 165,20 165,80 200,80 200,20 215,20 215,80 215,190 240,190 240,300 135,300 135,260 110,260 110,190 110,160 150,160 150,80" fill="none" stroke="#333" stroke-width="2"/>
      
      <rect x="20" y="190" width="90" height="70" fill="none" stroke="#333" stroke-width="2"/>
      <text x="45" y="230" font-size="12" fill="#333">iArena</text>
      
      <rect x="150" y="300" width="90" height="70" fill="none" stroke="#333" stroke-width="2"/>
      <text x="160" y="340" font-size="12" fill="#333">大講義室</text>

      <rect x="165" y="90" width="40" height="50" fill="none" stroke="#333" stroke-width="2"/>
      <rect x="168" y="158" width="37" height="25" fill="none" stroke="#333" stroke-width="2"/>
      <rect x="170" y="200" width="30" height="40" fill="none" stroke="#333" stroke-width="2"/>
      <line x1="170" y1="225" x2="200" y2="225" stroke="#333" stroke-width="2"/>
      <line x1="170" y1="230" x2="200" y2="230" stroke="#333" stroke-width="2"/>
      <line x1="170" y1="235" x2="200" y2="235" stroke="#333" stroke-width="2"/>


      <image href="WCM.png" x="168" y="108" width="9" height="19" />
      <image href="WCW.png" x="194" y="108" width="9" height="19" />

      <image href="elev.png" x="170" y="160" width="20" height="20" />

      <image href="stair.png" x="170" y="202" width="20" height="20" />

      <text x="110" y="285" font-size="20" font-weight="bold" fill="#333">↑</text>
      <text x="70" y="295" font-size="12" fill="#333">Entrance</text>

      <image href="stair.png" x="135" y="262" width="15" height="15" />
    `,
    seats: [
      [120, 160, true], [135, 170, true], [120, 180],
      [225, 195, true], [225, 220], [225, 245], 
      [205, 245, true], [185, 250], [165, 250], 
      [225, 270], [205, 270]
    ]
  },
  '2F': {
    isPreparing: true 
  },
  '3F': {
    // 休憩エリアの範囲を新しい壁の座標に合わせて調整
    restArea: { x: 100, y: 250, width: 100, height: 145, name: "下部休憩エリア" },
    walls: `
      <polyline points="90,-20 215,-20 215,80 250,80 250,300 215,300 215,410 90,410 90,-20" fill="none" stroke="#333" stroke-width="2"/>
      
      <rect x="110" y="-20" width="85" height="70" fill="none" stroke="#333" stroke-width="2"/>
      
      <rect x="110" y="115" width="85" height="70" fill="none" stroke="#333" stroke-width="2"/>

      <rect x="130" y="210" width="45" height="35" fill="none" stroke="#333" stroke-width="2"/>
      <image href="WCM.png" x="115" y="152" width="12" height="25" />
      <image href="WCW.png" x="178" y="152" width="12" height="25" />
      
      <image href="elev.png" x="135" y="212" width="28" height="28" />
      
      <polyline points="120,360 120,350 180,350 180,360" fill="none" stroke="#333"/>
      
      <image href="stair.png" x="150" y="20" width="28" height="28" />
      <image href="stair.png" x="60" y="215" width="28" height="28" />
      <image href="stair.png" x="60" y="350" width="28" height="28" />
    `,
    seats: [
      // 壁の右シフトに合わせて座席位置も微調整
      [130, 80], [170, 65, true],
      [125, 275, true], [125, 300, true], [125, 325, true],
      [165, 275, true], [165, 300, true], [165, 325, true],
      [125, 355, true], [145, 355, true], [165, 355, true],
      [235, 130, true], [235, 190,], [235, 255, true]
    ]
  },
  '4F': {
    isPreparing: true 
  }
};

let building = 'さつき校舎';
let floor = '1F'; 

let scale = 1;
let translateX = 0;
let translateY = 0;

function renderSeats() {
  const mapData = maps[floor];

  if (mapData.isPreparing) {
    document.getElementById('walls').innerHTML = `
      <text x="150" y="190" font-size="16" font-weight="bold" text-anchor="middle" fill="#666">ただいま準備中です</text>
    `;
    document.getElementById('areas').innerHTML = '';
    document.getElementById('seats').innerHTML = '';
    document.getElementById('status').textContent = '準備中...';
    document.getElementById('floor').textContent = floor;
    updateButtonState();
    return;
  }

  document.getElementById('walls').innerHTML = mapData.walls;

  let seatsHTML = '';
  let free = 0;
  let totalSeats = mapData.seats.length;

  mapData.seats.forEach(([x, y, hasCharge]) => {
    const available = Math.random() > 0.45;
    if (available) free++;

    const color = available ? '#6acb86' : '#ef6d6d';
    // まず座席（四角形）を描画する
    seatsHTML += `<rect x="${x}" y="${y}" width="12" height="12" rx="2" fill="${color}" />`;

    // もし hasCharge が true なら、その上に雷マークを重ねる
    if (hasCharge) {
      // 12×12の四角形の中に少し小さく(8×8)中央に配置する調整をしています。
      // 大きさや位置を変えたい場合は、x, y, width, height の数値を微調整してください。
      seatsHTML += `<image href="biribirima-ku.png" x="${x}" y="${y}" width="12" height="12" />`;
    }
  });
  document.getElementById('seats').innerHTML = seatsHTML;

  const occupiedSeats = totalSeats - free;
  const usageRate = totalSeats > 0 ? (occupiedSeats / totalSeats) : 0; 

  // if (mapData.restArea) {
  //   let areaColor = 'rgba(106, 203, 134, 0.3)'; 
  //   if (usageRate > 0.7) areaColor = 'rgba(239, 109, 109, 0.4)';  
  //   else if (usageRate > 0.4) areaColor = 'rgba(244, 208, 63, 0.4)'; 

  //   const a = mapData.restArea;
  //   document.getElementById('areas').innerHTML = `
  //     <rect x="${a.x}" y="${a.y}" width="${a.width}" height="${a.height}" 
  //           fill="${areaColor}" stroke="#333" stroke-dasharray="4" rx="5"/>
  //     <text x="${a.x + 5}" y="${a.y + 20}" font-size="12" font-weight="bold" fill="#333">${a.name}</text>
  //   `;
  // } else {
  //   document.getElementById('areas').innerHTML = ''; 
  // }

  document.getElementById('status').textContent = `全体の空席数: ${free}席 / 満席率: ${Math.round(usageRate * 100)}%`;
  document.getElementById('floor').textContent = floor;

  updateButtonState();
}

function updateButtonState() {
  const buttons = document.querySelectorAll('.floor-buttons button');
  buttons.forEach(btn => {
    if (btn.textContent === floor) {
      btn.classList.add('active'); 
    } else {
      btn.classList.remove('active');
    }
  });
}

function zoomMap(factor) {
  scale *= factor;
  scale = Math.min(Math.max(scale, 0.5), 3);
  applyTransform();
}

function resetMap() {
  scale = 1;
  translateX = 0;
  translateY = 0;
  applyTransform();
}

function applyTransform() {
  const viewport = document.getElementById('map-viewport');
  viewport.setAttribute('transform', `translate(${translateX}, ${translateY}) scale(${scale})`);
}

let isDragging = false;
let startX, startY;
const container = document.getElementById('map-container');

// --- PC用（マウスイベント） ---
container.addEventListener('mousedown', (e) => {
  isDragging = true;
  startX = e.clientX - translateX;
  startY = e.clientY - translateY;
});

window.addEventListener('mousemove', (e) => {
  if (!isDragging) return;
  translateX = e.clientX - startX;
  translateY = e.clientY - startY;
  applyTransform();
});

window.addEventListener('mouseup', () => {
  isDragging = false;
});

// --- スマホ用（タッチイベント） ---
container.addEventListener('touchstart', (e) => {
  isDragging = true;
  // タッチ位置は e.touches[0] に格納されている
  startX = e.touches[0].clientX - translateX;
  startY = e.touches[0].clientY - translateY;
});

window.addEventListener('touchmove', (e) => {
  if (!isDragging) return;
  
  // スマホの画面自体がスクロールするのを防ぐ
  if (e.cancelable) {
    e.preventDefault();
  }

  translateX = e.touches[0].clientX - startX;
  translateY = e.touches[0].clientY - startY;
  applyTransform();
}, { passive: false }); // preventDefault() を機能させるために必須

window.addEventListener('touchend', () => {
  isDragging = false;
});

function changeBuilding() {
  alert('他の校舎データは現在準備中です。');
}

['1F', '2F', '3F', '4F'].forEach(f => {
  const btn = document.createElement('button');
  btn.textContent = f;
  btn.onclick = () => {
    floor = f;
    renderSeats();
  };
  document.getElementById('floors').appendChild(btn);
});

// --- 写真ボードの表示・非表示切り替え処理 ---
function togglePhotoBoard() {
  const board = document.getElementById('photo-board');
  board.classList.toggle('hidden');
}

// ボード上でのドラッグ操作がマップの移動に干渉しないようにする
const photoBoard = document.getElementById('photo-board');
if (photoBoard) {
  // PC用のマウスイベントをブロック
  photoBoard.addEventListener('mousedown', (e) => {
    e.stopPropagation();
  });
  // スマホ用のタッチイベントをブロック
  photoBoard.addEventListener('touchstart', (e) => {
    e.stopPropagation();
  });
}

renderSeats();