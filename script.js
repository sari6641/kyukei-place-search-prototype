
const maps = {
  '1F': {
    walls: `
        <!-- 左上のくぼみ -->
    <line x1="10" y1="70" x2="90" y2="70" stroke="#333"/>
    <line x1="90" y1="70" x2="90" y2="10" stroke="#333"/>

    <!-- 上中央の小部屋 -->
    <rect x="120" y="60" width="30" height="35"
          fill="none" stroke="#333"/>

    <!-- 右上の壁 -->
    <line x1="200" y1="10" x2="200" y2="105" stroke="#333"/>
    <line x1="200" y1="105" x2="290" y2="105" stroke="#333"/>

    <!-- 中央の柱 -->
    <rect x="100" y="145" width="85" height="115"
          fill="none" stroke="#333"/>

    <!-- 左下の壁 -->
    <line x1="45" y1="300" x2="10" y2="300" stroke="#333"/>
    <line x1="45" y1="300" x2="45" y2="370" stroke="#333"/>

    <!-- 下の壁 -->
    <line x1="65" y1="335" x2="290" y2="335"
          stroke="#333"/>
    <line x1="65" y1="335" x2="65" y2="370"
          stroke="#333"/>
    `,
    seats: [
      [231,110],[271,125],
      [271,165],[231,205],
      [271,225],[186,225],
      [121,290],[156,290],
      [231,255],[271,285],
      [186,200]
    ]
  },

  '2F': {
    walls: `<rect x="10" y="10" width="280" height="360" rx="20" fill="#efefef" stroke="#333" stroke-width="2"/>
  <line x1="80" y1="20" x2="80" y2="360" stroke="#999"/>
  <line x1="220" y1="20" x2="220" y2="360" stroke="#999"/>
  <rect x="120" y="110" width="60" height="60" fill="none" stroke="#666"/>`,
    seats: [
      [140,55],[165,55],
      [125,230],[165,230],
      [125,260],[165,260],
      [125,290],[165,290]
    ]
  },

  '3F': {
    walls: `<rect x="10" y="10" width="280" height="360" rx="20" fill="#efefef" stroke="#333" stroke-width="2"/>
  <line x1="80" y1="20" x2="80" y2="360" stroke="#999"/>
  <line x1="220" y1="20" x2="220" y2="360" stroke="#999"/>
  <rect x="120" y="110" width="60" height="60" fill="none" stroke="#666"/>`,
    seats: [
      [140,55],[165,55],
      [125,230],[165,230],
      [125,260],[165,260],
      [125,290],[165,290]
    ]
  },

  '4F': {
    walls: `<rect x="10" y="10" width="280" height="360" rx="20" fill="#efefef" stroke="#333" stroke-width="2"/>
  <line x1="80" y1="20" x2="80" y2="360" stroke="#999"/>
  <line x1="220" y1="20" x2="220" y2="360" stroke="#999"/>
  <rect x="120" y="110" width="60" height="60" fill="none" stroke="#666"/>`,
    seats: [
      [140,55],[165,55],
      [125,230],[165,230],
      [125,260],[165,260],
      [125,290],[165,290]
    ]
  }
};

let building='さつき校舎';
let floor='3F';

function renderSeats() {

  const mapData = maps[floor];

  document.getElementById('walls').innerHTML =
    mapData.walls;

  const g = document.getElementById('seats');
  g.innerHTML = '';

  let free = 0;

  mapData.seats.forEach(([x,y]) => {

    const available = Math.random() > 0.45;

    if (available) free++;

    const color =
      available ? '#6acb86' : '#ef6d6d';

    g.innerHTML += `
      <rect
        x="${x}"
        y="${y}"
        width="12"
        height="12"
        rx="2"
        fill="${color}"
      />
    `;
  });

  document.getElementById('status').textContent =
    `空席数: ${free}席`;

  document.getElementById('floor').textContent =
    floor;
}



['1F','2F','3F','4F'].forEach(f=>{
 const btn=document.createElement('button');
 btn.textContent=f;
 btn.onclick=()=>{floor=f;renderSeats();};
 document.getElementById('floors').appendChild(btn);
});

renderSeats();
