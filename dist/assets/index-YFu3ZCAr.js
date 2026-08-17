(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(()=>{})});var e=`poker-gym-v0-stats`,t=`poker-gym-install-tip-dismissed`,n=()=>({total:0,correct:0,potOdds:{total:0,correct:0},ev:{total:0,correct:0},outs:{total:0,correct:0}}),r=`mixed`,i,a=!1,o=null,s=f(),c=document.querySelector(`#app`);function l(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)||window.navigator.platform===`MacIntel`&&window.navigator.maxTouchPoints>1}function u(){return l()&&!d()&&localStorage.getItem(t)!==`1`}function d(){return window.matchMedia(`(display-mode: standalone)`).matches||!!window.navigator.standalone}function f(){try{let t=localStorage.getItem(e);return t?{...n(),...JSON.parse(t)}:n()}catch{return n()}}function p(){localStorage.setItem(e,JSON.stringify(s))}function m(e){return e[Math.floor(Math.random()*e.length)]}function h(e){return[...e].sort(()=>Math.random()-.5)}function g(e){return Math.round(e*10)/10}function _(e,t,n){let r=[...new Set([e,...t])].filter(e=>Number.isFinite(e)).slice(0,4);for(;r.length<4;){let t=g(e+(r.length+1)*5);r.includes(t)||r.push(t)}return h(r.map(e=>({value:e,label:n(e)})))}function v(){let e=m([60,80,100,120,150,180,200,240]),t=m([1/3,1/2,2/3,3/4,1]),n=Math.round(e*t/5)*5,r=g(n/(e+n+n)*100),i=[g(n/(e+n)*100),g(r-5),g(r+5),g(r+10)].filter(e=>e>0&&e<100);return{topic:`potOdds`,eyebrow:`POT ODDS`,title:`Call 至少需要多少 Equity？`,detail:[`目前 Pot：${e}`,`對手下注：${n}`,`你需要 Call：${n}`],choices:_(r,i,e=>`${e}%`),answer:r,explanation:`${n} ÷ (${e} + ${n} + ${n}) = ${r}%`}}function y(){let e=m([.25,.3,.35,.4,.45,.5,.6,.65]),t=m([50,80,100,120,150,200]),n=m([30,40,50,60,80,100]),r=Math.round(e*t-(1-e)*n),i=m([[-20,-10,10],[-15,10,20],[-25,-10,15]]);return{topic:`ev`,eyebrow:`EXPECTED VALUE`,title:`這個決策的 EV 是多少？`,detail:[`勝率：${Math.round(e*100)}%`,`贏：+${t}`,`輸：-${n}`],choices:_(r,i.map(e=>r+e),e=>`${e>0?`+`:``}${e}`),answer:r,explanation:`${e.toFixed(2)} × ${t} − ${(1-e).toFixed(2)} × ${n} = ${r>0?`+`:``}${r}`}}var b=[{title:`Flush Draw`,detail:[`Hero：A♥ J♥`,`Board：K♥ 7♥ 2♣`,`還有幾張牌可以直接完成同花？`],answer:9,explanation:`一副牌有 13 張 ♥，目前看見 4 張 ♥，所以剩下 9 outs。約略：下一張 ≈ 18%，兩張 ≈ 36%。`},{title:`Open-ended Straight Draw`,detail:[`Hero：8♠ 7♦`,`Board：6♣ 9♥ K♠`,`完成順子的直接 outs 有幾張？`],answer:8,explanation:`任何 5 或 10 都能完成順子：4 張 5 + 4 張 10 = 8 outs。約略：下一張 ≈ 16%，兩張 ≈ 32%。`},{title:`Gutshot Straight Draw`,detail:[`Hero：8♠ 7♦`,`Board：5♣ J♥ 9♠`,`完成順子的直接 outs 有幾張？`],answer:4,explanation:`只有 4 張 6 能直接補成 5-6-7-8-9，因此是 4 outs。約略：下一張 ≈ 8%，兩張 ≈ 16%。`},{title:`Two Overcards`,detail:[`Hero：A♠ K♦`,`Board：7♣ 4♥ 2♠`,`只把 A / K 配對視為 outs，共幾張？`],answer:6,explanation:`剩下 3 張 A + 3 張 K = 6 outs。這是刻意簡化的訓練題，未處理反向 outs 或對手 range。`}];function x(){let e=m(b),t=[e.answer-2,e.answer-1,e.answer+1,e.answer+2].filter(e=>e>0);return{topic:`outs`,eyebrow:`OUTS`,title:e.title,detail:e.detail,choices:_(e.answer,t,e=>`${e} outs`),answer:e.answer,explanation:e.explanation}}function S(){let e=r===`mixed`?m([`potOdds`,`ev`,`outs`]):r;return e===`potOdds`?v():e===`ev`?y():x()}function C(e){return e.total===0?`—`:`${Math.round(e.correct/e.total*100)}%`}function w(){return s.total===0?`—`:`${Math.round(s.correct/s.total*100)}%`}function T(e){return{potOdds:`Pot Odds`,ev:`EV`,outs:`Outs`}[e]}function E(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function D(){let e=i,t=a&&o===e.answer;c.innerHTML=`
    <main class="shell">
      <header class="topbar">
        <div>
          <div class="brand">♠ Poker Gym</div>
          <div class="subtitle">Math Trainer · V0</div>
        </div>
        <div class="score">
          <strong>${w()}</strong>
          <span>${s.correct}/${s.total}</span>
        </div>
      </header>

      <nav class="modes" aria-label="Training mode">
        ${[`mixed`,`potOdds`,`ev`,`outs`].map(e=>`
              <button class="mode ${r===e?`active`:``}" data-mode="${e}">
                ${e===`mixed`?`Mixed`:T(e)}
              </button>`).join(``)}
      </nav>

      ${u()?`
        <aside class="install-tip">
          <div>
            <strong>加入 iPhone 主畫面</strong>
            <span>Safari 分享 → 加入主畫面。安裝後可像 App 一樣開啟。</span>
          </div>
          <button id="dismissInstallTip" aria-label="關閉">×</button>
        </aside>
      `:``}

      <section class="question-card">
        <div class="eyebrow">${e.eyebrow}</div>
        <h1>${E(e.title)}</h1>

        <div class="scenario">
          ${e.detail.map(e=>`<div>${E(e)}</div>`).join(``)}
        </div>

        <div class="choices">
          ${e.choices.map(t=>{let n=o===t.value,r=a&&t.value===e.answer,i=a&&n&&t.value!==e.answer;return`
                <button
                  class="choice ${n?`selected`:``} ${r?`correct`:``} ${i?`wrong`:``}"
                  data-choice="${t.value}"
                  ${a?`disabled`:``}
                >
                  ${E(t.label)}
                </button>`}).join(``)}
        </div>

        ${a?`
              <div class="feedback ${t?`good`:`bad`}">
                <div class="feedback-title">
                  ${t?`✓ Correct`:`✕ Not quite`}
                </div>
                <div class="feedback-answer">
                  答案：${E(e.choices.find(t=>t.value===e.answer)?.label??String(e.answer))}
                </div>
                <p>${E(e.explanation)}</p>
              </div>

              <button class="next" id="nextButton">下一題 →</button>
            `:`<div class="hint">先憑直覺回答，再看公式。</div>`}
      </section>

      <section class="stats">
        <div class="section-title">
          <span>Progress</span>
          <button id="resetButton" class="reset">Reset</button>
        </div>

        <div class="stat-grid">
          ${[`potOdds`,`ev`,`outs`].map(e=>`
                <div class="stat">
                  <span>${T(e)}</span>
                  <strong>${C(s[e])}</strong>
                  <small>${s[e].correct}/${s[e].total}</small>
                </div>`).join(``)}
        </div>
      </section>

      <footer>
        V0 使用簡化模型；不處理 opponent range、implied odds、reverse outs 或 GTO。
      </footer>
    </main>
  `,O()}function O(){document.querySelectorAll(`[data-mode]`).forEach(e=>{e.addEventListener(`click`,()=>{r=e.dataset.mode,k()})}),document.querySelectorAll(`[data-choice]`).forEach(e=>{e.addEventListener(`click`,()=>{if(a)return;let t=Number(e.dataset.choice);o=t,a=!0;let n=t===i.answer,r=i.topic;s.total+=1,s[r].total+=1,n&&(s.correct+=1,s[r].correct+=1),p(),D()})}),document.querySelector(`#nextButton`)?.addEventListener(`click`,k),document.querySelector(`#dismissInstallTip`)?.addEventListener(`click`,()=>{localStorage.setItem(t,`1`),document.querySelector(`.install-tip`)?.remove()}),document.querySelector(`#resetButton`)?.addEventListener(`click`,()=>{window.confirm(`清除所有答題統計？`)&&(s=n(),p(),D())})}function k(){a=!1,o=null,i=S(),D(),window.scrollTo({top:0,behavior:`smooth`})}i=S(),D();