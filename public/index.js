const url = 'http://10.0.0.169:3000'
// const url = 'http://192.168.0.241:3000'

const lyrics_space = document.getElementById("lyrics-space")
const hiragana_space = document.getElementById("hiragana")
const portuguese_space = document.getElementById("portuguese")
lyrics_space.innerHTML = "仮面ライダーBLACK<br><br><br>時を超えろ 空を駆けろ この星のため<br>君は見たか 愛が真っ紅に燃えるのを<br>暗い闇の底で 危険な罠が待つ<br><br>信じる奴が 正義(ジャスティス)<br>真実の王者<br>夢を見続ける事が 俺のファンタジー<br>生きることが好きさ 蒼く浮かぶ宇宙<br>時を超えろ 空を駆けろ この星のため<br>熱く燃やせ 涙 流せ 明日という日に<br>仮面ライダー BLACK<br>仮面ライダー BLACK<br><br>黒く光るボディ ハートに血が通う<br>風が運ぶ歌に気持ちがふと揺れる<br><br>支配したがる魔術師(マジシャン)<br><br>妖しげな超能力<br><br>闘う時は 戦士(ソルジャー) 俺の誇りさ<br>この地球が好きさ 心許した友<br><br>永遠に守れ 若さ弾け この愛のため<br><br>現在を燃やせ 強く生きろ 今日という日を<br>仮面ライダー BLACK<br>仮面ライダー BLACK<br><br>信じる奴が 正義(ジャスティス)<br>真実の王者<br>夢を見続ける事が 俺のファンタジー<br>生きることが好きさ 蒼く浮かぶ宇宙<br>時を超えろ 空を駆けろ この星のため<br>熱く燃やせ  涙  流せ 明日という日に<br>仮面ライダー BLACK<br>仮面ライダー BLACK";
let vocabs;

const onOver = (e)=>{
  const id = parseInt(e?.currentTarget?.id,10)
  hiragana_space.innerHTML = vocabs[id]?.hiragana
  portuguese_space.innerHTML = vocabs[id]?.portuguese
}

const scan = () => {
  fetch(url + "/song/", {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: `{"text": "${lyrics_space.innerHTML}"}`,
  })
    .then(response => response.json())
    .then(json => {
      let text = lyrics_space.innerHTML
      vocabs = json?.vocab;
      vocabs.map((value,indice)=>{
        text = text.replace(RegExp(`${value.word}`, 'g'), `<span class="vocab" id="${indice}" onmouseover="onOver(event)">${value.word}</span>`)
      })
      grades = json?.grade;
      Object.keys(grades).forEach((key) => {
        text = text.replace(RegExp(`${key}`, 'g'), `<span class=N${grades[key]?.grade}>${key}</span>`)
      })
      lyrics_space.innerHTML = text
    })
}
scan()

ToggleClass = (class_name) => {
  document.querySelectorAll("." + class_name).forEach(e => e.classList.toggle('on'))
}