(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),`serviceWorker`in navigator&&window.addEventListener(`load`,()=>{navigator.serviceWorker.register(`./sw.js`).catch(()=>{})});var e=`poker-gym-v02-stats`,t=`poker-gym-v0-stats`,n=`poker-gym-v02-settings`,r=`poker-gym-install-tip-dismissed`,i=`poker-gym-v021-train-panel-expanded`,a=500,o=[`decision`,`potOdds`,`outs`,`ev`],s=[`mixed`,...o],c=[`learn`,`recall`],l=[`practice`,`rapid`,`snap`],u={"decision-turn-easy":`Turn · 明顯 Call/Fold`,"decision-turn-close":`Turn · 邊界決策`,"decision-flop-easy":`Flop all-in · 明顯決策`,"decision-flop-close":`Flop all-in · 邊界決策`,"pot-third":`1/3 pot sizing`,"pot-half":`1/2 pot sizing`,"pot-two-thirds":`2/3 pot sizing`,"pot-three-quarter":`3/4 pot sizing`,"pot-full":`Pot-size bet`,"pot-random":`Random bet sizing`,"outs-flush":`Flush draw · 9 outs`,"outs-oesd":`Open-ended straight · 8 outs`,"outs-gutshot":`Gutshot · 4 outs`,"outs-overcards":`Two overcards · 6 outs`,"outs-set":`Pocket pair → set · 2 outs`,"ev-positive":`Positive EV`,"ev-negative":`Negative EV`,"ev-close":`Near break-even EV`},d=()=>({total:0,correct:0,numericAttempts:0,absErrorSum:0,responseMsSum:0}),f=()=>({version:2,total:0,correct:0,responseMsSum:0,topics:{decision:d(),potOdds:d(),outs:d(),ev:d()},buckets:{},attempts:[]}),p={topicMode:`mixed`,answerMode:`recall`,pace:`practice`},m=oe(),h=se(),g,_=null,v=null,y=``,b=performance.now(),x=null,S=0,C=``,w=ie(),ee=document.querySelector(`#app`);function te(){return/iphone|ipad|ipod/i.test(window.navigator.userAgent)||window.navigator.platform===`MacIntel`&&window.navigator.maxTouchPoints>1}function ne(){return window.matchMedia(`(display-mode: standalone)`).matches||!!window.navigator.standalone}function re(){return te()&&!ne()&&localStorage.getItem(r)!==`1`}function ie(){let e=localStorage.getItem(i);return e===`1`||e!==`0`&&!window.matchMedia(`(max-width: 600px)`).matches}function ae(){localStorage.setItem(i,w?`1`:`0`)}function oe(){try{let n=localStorage.getItem(e);if(n){let e=JSON.parse(n);if(e.version===2)return e}let r=localStorage.getItem(t);if(r){let e=JSON.parse(r),t=f();t.total=e.total??0,t.correct=e.correct??0;for(let n of[`potOdds`,`ev`,`outs`])t.topics[n].total=e[n]?.total??0,t.topics[n].correct=e[n]?.correct??0;return t}}catch{}return f()}function T(){localStorage.setItem(e,JSON.stringify(m))}function se(){try{let e=localStorage.getItem(n);if(!e)return p;let t=JSON.parse(e);return{topicMode:s.includes(t.topicMode)?t.topicMode:p.topicMode,answerMode:c.includes(t.answerMode)?t.answerMode:p.answerMode,pace:l.includes(t.pace)?t.pace:p.pace}}catch{return p}}function E(){localStorage.setItem(n,JSON.stringify(h))}function D(e){return e[Math.floor(Math.random()*e.length)]}function ce(e){let t=[...e];for(let e=t.length-1;e>0;--e){let n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}function O(e){return Math.round(e*10)/10}function k(e,t){return O(t/(e+t+t)*100)}function le(e,t,n){return O(e*t-(1-e)*n)}function A(e,t=``){return`${e>0?`+`:``}${e}${t}`}function j(e,t=1){return t===0?`${Math.round(e)}`:e.toFixed(t).replace(/\.0$/,``)}function M(e,t){return e.unit===`percent`?`${j(t,e.precision)}%`:e.unit===`outs`?`${j(t,0)} outs`:A(t)}function N(e,t,n){let r=[];for(let n of[e,...t]){let e=O(n);if(Number.isFinite(e)&&!r.includes(e)&&r.push(e),r.length===4)break}let i=5;for(;r.length<4;){let t=O(e+i);r.includes(t)||r.push(t),i+=5}return ce(r.map(e=>({value:e,label:n(e)})))}function ue(e){return m.buckets[e]??d()}function de(e,t=10){return m.attempts.filter(t=>t.bucket===e).slice(-t)}function fe(e){let t=ue(e);if(t.total===0)return 2.5;let n=1-t.correct/t.total,r=de(e),i=r.length===0?n:1-r.filter(e=>e.correct).length/r.length;return Math.min(7,1+n*3+i*2)}function P(e){let t=e.map(e=>fe(e.bucket)),n=t.reduce((e,t)=>e+t,0),r=Math.random()*n;for(let n=0;n<e.length;n+=1)if(r-=t[n],r<=0)return e[n];return e[e.length-1]}var pe=[{bucket:`pot-third`,ratio:1/3},{bucket:`pot-half`,ratio:1/2},{bucket:`pot-two-thirds`,ratio:2/3},{bucket:`pot-three-quarter`,ratio:3/4},{bucket:`pot-full`,ratio:1},{bucket:`pot-random`,ratio:null}];function me(){let e=P(pe),t=D([65,80,95,110,125,140,155,175,190,215,240,275]),n=e.ratio??O((25+Math.floor(Math.random()*96))/100),r=Math.max(10,Math.round(t*n/5)*5),i=k(t,r),a=[O(r/(t+r)*100),O(i-5),O(i+5),O(i+10)].filter(e=>e>0&&e<100);return{kind:`numeric`,topic:`potOdds`,bucket:e.bucket,eyebrow:`POT ODDS`,title:`Call 至少需要多少 Equity？`,detail:[`目前 Pot：${t}`,`對手下注：${r}`,`你需要 Call：${r}`],answer:i,unit:`percent`,precision:1,tolerance:2,choices:N(i,a,e=>`${j(e)}%`),explanation:`${r} ÷ (${t} + ${r} + ${r}) = ${j(i)}%`}}var he=[{bucket:`outs-flush`,answer:9,variants:[[`Hero：A♥ J♥`,`Board：K♥ 7♥ 2♣`,`還有幾張牌可以直接完成同花？`],[`Hero：9♠ 8♠`,`Board：A♠ 4♠ K♦`,`還有幾張牌可以直接完成同花？`],[`Hero：Q♦ 5♦`,`Board：2♦ 8♦ A♣`,`還有幾張牌可以直接完成同花？`]],explanation:`同一花色共有 13 張；手牌與牌面已看見 4 張，因此剩 9 outs。`},{bucket:`outs-oesd`,answer:8,variants:[[`Hero：8♠ 7♦`,`Board：6♣ 9♥ K♠`,`完成順子的直接 outs 有幾張？`],[`Hero：J♣ 10♦`,`Board：9♠ Q♥ 3♣`,`完成順子的直接 outs 有幾張？`],[`Hero：5♠ 4♣`,`Board：3♦ 6♥ K♣`,`完成順子的直接 outs 有幾張？`]],explanation:`Open-ended straight draw 有兩個端點，每個 rank 4 張牌，所以是 8 outs。`},{bucket:`outs-gutshot`,answer:4,variants:[[`Hero：8♠ 7♦`,`Board：5♣ 9♥ J♠`,`完成順子的直接 outs 有幾張？`],[`Hero：J♣ 9♦`,`Board：8♠ Q♥ 2♣`,`完成順子的直接 outs 有幾張？`],[`Hero：6♠ 4♦`,`Board：3♣ 7♥ K♠`,`完成順子的直接 outs 有幾張？`]],explanation:`Gutshot 只有中間一個 rank 能補成順子，因此是 4 outs。`},{bucket:`outs-overcards`,answer:6,variants:[[`Hero：A♠ K♦`,`Board：7♣ 4♥ 2♠`,`只把 A / K 配對視為 outs，共幾張？`],[`Hero：K♣ Q♦`,`Board：J♠ 6♥ 3♣`,`只把 K / Q 配對視為 outs，共幾張？`],[`Hero：A♦ Q♣`,`Board：10♠ 6♦ 2♥`,`只把 A / Q 配對視為 outs，共幾張？`]],explanation:`兩張 overcard 各剩 3 張：3 + 3 = 6 outs。此題刻意假設這些 outs 都是 clean。`},{bucket:`outs-set`,answer:2,variants:[[`Hero：8♠ 8♦`,`Board：K♣ Q♥ 2♠`,`只計算補成三條的 outs，有幾張？`],[`Hero：J♠ J♣`,`Board：A♦ 7♥ 2♣`,`只計算補成三條的 outs，有幾張？`],[`Hero：5♥ 5♣`,`Board：K♠ 10♦ 3♥`,`只計算補成三條的 outs，有幾張？`]],explanation:`Pocket pair 已看見該 rank 的 2 張牌，牌堆中還剩 2 張可補成 set。`}];function ge(){let e=P(he),t=[...D(e.variants)],n=e.answer,r=[n-2,n-1,n+1,n+2].filter(e=>e>0);return{kind:`numeric`,topic:`outs`,bucket:e.bucket,eyebrow:`OUTS`,title:u[e.bucket].split(` · `)[0],detail:t,answer:n,unit:`outs`,precision:0,tolerance:0,choices:N(n,r,e=>`${Math.round(e)} outs`),explanation:`${e.explanation} Rule of 2 / 4：下一張約 ${n*2}%，兩張約 ${n*4}%。`}}var _e=[{bucket:`ev-positive`},{bucket:`ev-negative`},{bucket:`ev-close`}];function ve(e){return Math.abs(e)<=7?`ev-close`:e>0?`ev-positive`:`ev-negative`}function F(){let e=P(_e),t=.5,n=100,r=50,i=0;for(let a=0;a<200&&(t=D([.2,.25,.3,.35,.4,.45,.5,.55,.6,.65,.7]),n=D([40,55,70,85,100,120,145,170,200]),r=D([30,45,60,75,90,110,135]),i=le(t,n,r),ve(i)!==e.bucket);a+=1);let a=[i-20,i-10,i+10,i+20],o=Math.round(t*100);return{kind:`numeric`,topic:`ev`,bucket:e.bucket,eyebrow:`EXPECTED VALUE`,title:`這個決策的 EV 是多少？`,detail:[`勝率：${o}%`,`贏：+${n}`,`輸：-${r}`],answer:i,unit:`ev`,precision:1,tolerance:2,choices:N(i,a,e=>A(e)),explanation:`${t.toFixed(2)} × ${n} − ${(1-t).toFixed(2)} × ${r} = ${A(i)}`}}var ye=[{bucket:`decision-turn-easy`,street:`turn`,close:!1},{bucket:`decision-turn-close`,street:`turn`,close:!0},{bucket:`decision-flop-easy`,street:`flop`,close:!1},{bucket:`decision-flop-close`,street:`flop`,close:!0}];function be(){let e=P(ye),t=e.street===`turn`?2:4,n=120,r=60,i=8,a=25,o=i*t,s=O(o-a);for(let c=0;c<300;c+=1){n=D([70,85,100,120,135,155,180,210,240]);let c=D([1/3,1/2,2/3,3/4,1,1.2]);r=Math.max(10,Math.round(n*c/5)*5),i=D([4,5,6,8,9,10,12]),a=k(n,r),o=i*t,s=O(o-a);let l=Math.abs(s);if(e.close?l>=.5&&l<=5:l>=8)break}let c=o>=a?`call`:`fold`,l=e.street===`turn`?`TURN → RIVER`:`FLOP · ALL-IN`,u=e.street===`turn`?`只剩 1 張牌，使用 outs × 2 粗估`:`確定 all-in、還有 2 張牌，使用 outs × 4 粗估`;return{kind:`decision`,topic:`decision`,bucket:e.bucket,eyebrow:`DECISION`,title:`Call 還是 Fold？`,detail:[`Street：${l}`,`目前 Pot：${n}`,`對手下注：${r}`,`Clean outs：${i}`,u],answer:c,choices:[{label:`Fold`,value:`fold`},{label:`Call`,value:`call`}],requiredEquity:a,estimatedEquity:o,edge:s,explanation:`Required Equity ${j(a)}% · Estimated Equity ${o}% · Edge ${A(s,`%`)} → ${c.toUpperCase()}. ${i} outs × ${t} ≈ ${o}%.`}}function xe(){let e=o.map(e=>{let t=m.topics[e],n=m.attempts.filter(t=>t.topic===e).slice(-12),r=t.total===0?.5:1-t.correct/t.total,i=n.length===0?r:1-n.filter(e=>e.correct).length/n.length;return{topic:e,weight:t.total===0?2.5:Math.min(6,1+r*2.5+i*1.5)}}),t=e.reduce((e,t)=>e+t.weight,0),n=Math.random()*t;for(let t of e)if(n-=t.weight,n<=0)return t.topic;return`decision`}function I(e){return e===`decision`?be():e===`potOdds`?me():e===`outs`?ge():F()}function L(e){return`${e.topic}|${e.bucket}|${e.detail.join(`|`)}`}function Se(){let e=h.topicMode===`mixed`?xe():h.topicMode,t=I(e);for(let n=0;n<6&&L(t)===C;n+=1)t=I(e);return C=L(t),t}function R(e){return{decision:`Decision`,potOdds:`Pot Odds`,outs:`Outs`,ev:`EV`}[e]}function z(e){return e===`mixed`?`Mixed`:R(e)}function B(e){return{practice:`Practice`,rapid:`10s`,snap:`3s`}[e]}function V(e){return e===`learn`?`Choice`:`Recall`}function Ce(e){return e.total===0?`—`:`${Math.round(e.correct/e.total*100)}%`}function we(){return m.total===0?`—`:`${Math.round(m.correct/m.total*100)}%`}function H(e){let t=m.attempts.slice(-e);if(t.length===0)return`—`;let n=t.filter(e=>e.correct).length;return`${Math.round(n/t.length*100)}%`}function Te(){return m.attempts.length===0?null:m.attempts.reduce((e,t)=>e+t.responseMs,0)/m.attempts.length}function Ee(e){let t=m.topics[e];if(t.numericAttempts===0)return`—`;let n=t.absErrorSum/t.numericAttempts;return e===`potOdds`?`${j(n)} pp`:e===`outs`?`${j(n)} outs`:e===`ev`?j(n):`—`}function De(){return Object.entries(m.buckets).filter(([,e])=>e.total>=3).map(([e,t])=>({bucket:e,accuracy:t.correct/t.total,total:t.total})).sort((e,t)=>e.accuracy-t.accuracy||t.total-e.total).slice(0,3)}function U(e){return e.replaceAll(`&`,`&amp;`).replaceAll(`<`,`&lt;`).replaceAll(`>`,`&gt;`).replaceAll(`"`,`&quot;`).replaceAll(`'`,`&#039;`)}function Oe(e,t){return e.topic===`outs`?t===0?`Excellent`:t<=1?`Good`:t<=2?`Needs work`:`Miss`:t<=2?`Excellent`:t<=5?`Good`:t<=10?`Needs work`:`Miss`}function W(){return Math.max(0,performance.now()-b)}function G(e,t,n,r,i){let o=m.topics[e.topic],s=m.buckets[e.bucket]??d();m.total+=1,m.responseMsSum+=n,o.total+=1,o.responseMsSum+=n,s.total+=1,s.responseMsSum+=n,t&&(m.correct+=1,o.correct+=1,s.correct+=1),i!==void 0&&(o.numericAttempts+=1,o.absErrorSum+=i,s.numericAttempts+=1,s.absErrorSum+=i),m.buckets[e.bucket]=s,m.attempts.push({topic:e.topic,bucket:e.bucket,correct:t,absError:i,responseMs:n,timedOut:r,at:Date.now()}),m.attempts.length>a&&(m.attempts=m.attempts.slice(-500)),T()}function K(){x!==null&&(window.clearInterval(x),x=null)}function q(){return h.pace===`rapid`?10:h.pace===`snap`?3:0}function J(){let e=q();if(e===0||_)return;let t=Math.max(0,S-Date.now()),n=t/1e3,r=Math.max(0,Math.min(100,n/e*100)),i=document.querySelector(`#timerValue`),a=document.querySelector(`#timerFill`);i&&(i.textContent=`${n.toFixed(1)}s`),a&&(a.style.width=`${r}%`),t<=0&&(K(),Ae())}function ke(){K();let e=q();e===0||_||(S=Date.now()+e*1e3,J(),x=window.setInterval(J,100))}function Ae(){if(_)return;let e=W();v=null,_={correct:!1,timedOut:!0,title:`Time out`,answerText:g.kind===`numeric`?M(g,g.answer):g.answer.toUpperCase(),userText:`未作答`,grade:`Miss`,responseMs:e},G(g,!1,e,!0),Z()}function Y(e){if(_||g.kind!==`numeric`)return;K();let t=W(),n=O(Math.abs(e-g.answer)),r=h.answerMode===`learn`?n<1e-4:n<=g.tolerance,i=Oe(g,n);v=e,_={correct:r,timedOut:!1,title:i??(r?`Correct`:`Miss`),answerText:M(g,g.answer),userText:M(g,e),grade:i,absError:n,responseMs:t},G(g,r,t,!1,n),Z()}function je(e){if(_||g.kind!==`decision`)return;K();let t=W(),n=e===g.answer;v=e,_={correct:n,timedOut:!1,title:n?`Correct`:`Wrong decision`,answerText:g.answer.toUpperCase(),userText:e.toUpperCase(),responseMs:t},G(g,n,t,!1),Z()}function Me(){let e=q();return e===0||_?``:`
    <div class="timer" aria-label="Timer">
      <div class="timer-row">
        <span>${h.pace===`rapid`?`Rapid`:`Snap`}</span>
        <strong id="timerValue">${e.toFixed(1)}s</strong>
      </div>
      <div class="timer-track"><div class="timer-fill" id="timerFill"></div></div>
    </div>
  `}function Ne(e){if(h.answerMode===`learn`)return`
      <div class="choices">
        ${e.choices.map(t=>{let n=v===t.value,r=_!==null&&t.value===e.answer,i=_!==null&&n&&t.value!==e.answer;return`
            <button
              class="choice ${n?`selected`:``} ${r?`correct`:``} ${i?`wrong`:``}"
              data-numeric-choice="${t.value}"
              ${_?`disabled`:``}
            >${U(t.label)}</button>
          `}).join(``)}
      </div>
    `;let t=e.unit===`percent`?`%`:e.unit===`outs`?` outs`:``,n=e.unit===`ev`,r=e.unit!==`outs`;return`
    <div class="recall-wrap">
      <div class="recall-display ${y?`has-value`:``}" id="numericDisplay">
        <span>${y||`—`}</span><small>${U(t)}</small>
      </div>
      <div class="keypad">
        ${[`1`,`2`,`3`,`4`,`5`,`6`,`7`,`8`,`9`].map(e=>`<button data-key="${e}">${e}</button>`).join(``)}
        <button data-key="sign" ${n?``:`disabled`}>±</button>
        <button data-key="0">0</button>
        <button data-key="dot" ${r?``:`disabled`}>.</button>
        <button class="key-clear" data-key="clear">C</button>
        <button data-key="back">⌫</button>
        <button class="key-submit" id="submitRecall" ${y?``:`disabled`}>OK</button>
      </div>
    </div>
  `}function X(e){return`
    <div class="decision-choices">
      ${e.choices.map(t=>{let n=v===t.value,r=_!==null&&t.value===e.answer,i=_!==null&&n&&t.value!==e.answer;return`
          <button
            class="decision-choice ${t.value} ${n?`selected`:``} ${r?`correct`:``} ${i?`wrong`:``}"
            data-decision="${t.value}"
            ${_?`disabled`:``}
          >${t.label}</button>
        `}).join(``)}
    </div>
  `}function Pe(e){if(!_)return`<div class="hint">先做判斷，再展開公式。</div>`;let t=(_.responseMs/1e3).toFixed(1),n=_.absError===void 0?``:`<span>Δ ${j(_.absError)}${e.kind===`numeric`&&e.unit===`percent`?` pp`:``}</span>`,r=_.correct?`good`:_.grade===`Good`?`warn`:`bad`,i=``;return e.kind===`decision`&&(i=`
      <div class="metric-row">
        <span>Required <strong>${j(e.requiredEquity)}%</strong></span>
        <span>Estimated <strong>${j(e.estimatedEquity,0)}%</strong></span>
        <span>Edge <strong>${A(e.edge,`%`)}</strong></span>
      </div>
    `),`
    <div class="feedback ${r}">
      <div class="feedback-head">
        <div>
          <div class="feedback-title">${_.timedOut?`⏱`:_.correct?`✓`:`✕`} ${U(_.title)}</div>
          <div class="feedback-answer">你：${U(_.userText)} · 答案：${U(_.answerText)}</div>
        </div>
        <div class="feedback-meta">${n}<span>${t}s</span></div>
      </div>
      ${i}
      <p>${U(e.explanation)}</p>
    </div>
    <button class="next" id="nextButton">下一題 →</button>
  `}function Fe(){let e=De();return e.length===0?`<div class="empty-note">每個類型刷至少 3 題後，這裡會開始找你的弱項並提高出題權重。</div>`:`
    <div class="weak-list">
      ${e.map((e,t)=>`
        <div class="weak-item">
          <span class="weak-rank">${t+1}</span>
          <div>
            <strong>${U(u[e.bucket]??e.bucket)}</strong>
            <small>${e.total} 題</small>
          </div>
          <b>${Math.round(e.accuracy*100)}%</b>
        </div>
      `).join(``)}
    </div>
  `}function Z(){let e=g,t=Te();ee.innerHTML=`
    <main class="shell">
      <header class="topbar">
        <div>
          <div class="brand">♠ Poker Gym</div>
          <div class="subtitle">Decision Trainer · V0.2.1</div>
        </div>
        <div class="score">
          <strong>${we()}</strong>
          <span>${m.correct}/${m.total}</span>
        </div>
      </header>

      <section class="control-panel ${w?`expanded`:`collapsed`}">
        <button
          class="control-toggle"
          id="trainPanelToggle"
          type="button"
          aria-expanded="${w}"
          aria-controls="trainPanelBody"
        >
          <span class="control-toggle-title">TRAIN</span>
          <span class="control-summary">
            ${z(h.topicMode)} · ${V(h.answerMode)} · ${B(h.pace)}
          </span>
          <span class="control-chevron" aria-hidden="true">⌄</span>
        </button>

        <div class="control-body" id="trainPanelBody" ${w?``:`hidden`}>
          <nav class="topic-scroll" aria-label="Training topic">
            ${s.map(e=>`
              <button class="topic-pill ${h.topicMode===e?`active`:``}" data-topic-mode="${e}">
                ${z(e)}
              </button>
            `).join(``)}
          </nav>

          <div class="control-grid">
            <div>
              <div class="control-label">ANSWER</div>
              <div class="segment two">
                ${c.map(e=>`
                  <button class="${h.answerMode===e?`active`:``}" data-answer-mode="${e}">
                    ${V(e)}
                  </button>
                `).join(``)}
              </div>
            </div>
            <div>
              <div class="control-label">PACE</div>
              <div class="segment three">
                ${l.map(e=>`
                  <button class="${h.pace===e?`active`:``}" data-pace="${e}">
                    ${B(e)}
                  </button>
                `).join(``)}
              </div>
            </div>
          </div>
        </div>
      </section>

      ${re()?`
        <aside class="install-tip">
          <div>
            <strong>加入 iPhone 主畫面</strong>
            <span>Safari 分享 → 加入主畫面。安裝後可離線使用。</span>
          </div>
          <button id="dismissInstallTip" aria-label="關閉">×</button>
        </aside>
      `:``}

      <section class="question-card">
        <div class="question-topline">
          <div class="eyebrow">${e.eyebrow}</div>
          <span class="bucket-chip">${U(u[e.bucket]??e.bucket)}</span>
        </div>
        <h1>${U(e.title)}</h1>

        ${Me()}

        <div class="scenario">
          ${e.detail.map(e=>`<div>${U(e)}</div>`).join(``)}
        </div>

        ${e.kind===`numeric`?Ne(e):X(e)}
        ${Pe(e)}
      </section>

      <section class="stats">
        <div class="section-title">
          <span>Progress</span>
          <button id="resetButton" class="reset">Reset</button>
        </div>

        <div class="overview-grid">
          <div class="overview"><span>Last 20</span><strong>${H(20)}</strong></div>
          <div class="overview"><span>Last 100</span><strong>${H(100)}</strong></div>
          <div class="overview"><span>Avg time</span><strong>${t===null?`—`:`${(t/1e3).toFixed(1)}s`}</strong></div>
        </div>

        <div class="topic-stats">
          ${o.map(e=>`
            <div class="topic-stat">
              <div><span>${R(e)}</span><strong>${Ce(m.topics[e])}</strong></div>
              <small>${e===`decision`?`${m.topics[e].correct}/${m.topics[e].total}`:`avg Δ ${Ee(e)}`}</small>
            </div>
          `).join(``)}
        </div>

        <div class="subsection-title">Weakness</div>
        ${Fe()}
      </section>

      <footer>
        V0.2 Decision 使用 clean outs + Rule of 2/4 的簡化模型；不處理 range、dirty outs、implied odds、future betting 或 GTO。
      </footer>
    </main>
  `,Le()}function Ie(){let e=document.querySelector(`#numericDisplay`),t=document.querySelector(`#submitRecall`);if(e){let t=e.querySelector(`span`);t&&(t.textContent=y||`—`),e.classList.toggle(`has-value`,y.length>0)}t&&(t.disabled=y.length===0||y===`-`||y===`.`||y===`-.`)}function Q(e){if(!(_||g.kind!==`numeric`)){if(/^\d$/.test(e)){if(y.replace(/[^0-9]/g,``).length>=5)return;y+=e}else if(e===`dot`){if(g.unit===`outs`||y.includes(`.`))return;y||=`0`,y+=`.`}else if(e===`sign`){if(g.unit!==`ev`)return;y=y.startsWith(`-`)?y.slice(1):`-${y}`}else e===`back`?y=y.slice(0,-1):e===`clear`&&(y=``);Ie()}}function $(){K(),_=null,v=null,y=``,g=Se(),b=performance.now(),Z(),ke(),window.scrollTo({top:0,behavior:`smooth`})}function Le(){document.querySelector(`#trainPanelToggle`)?.addEventListener(`click`,()=>{w=!w,ae();let e=document.querySelector(`.control-panel`),t=document.querySelector(`#trainPanelBody`),n=document.querySelector(`#trainPanelToggle`);e?.classList.toggle(`expanded`,w),e?.classList.toggle(`collapsed`,!w),t&&(t.hidden=!w),n?.setAttribute(`aria-expanded`,String(w))}),document.querySelectorAll(`[data-topic-mode]`).forEach(e=>{e.addEventListener(`click`,()=>{h.topicMode=e.dataset.topicMode,E(),$()})}),document.querySelectorAll(`[data-answer-mode]`).forEach(e=>{e.addEventListener(`click`,()=>{h.answerMode=e.dataset.answerMode,E(),$()})}),document.querySelectorAll(`[data-pace]`).forEach(e=>{e.addEventListener(`click`,()=>{h.pace=e.dataset.pace,E(),$()})}),document.querySelectorAll(`[data-numeric-choice]`).forEach(e=>{e.addEventListener(`click`,()=>Y(Number(e.dataset.numericChoice)))}),document.querySelectorAll(`[data-decision]`).forEach(e=>{e.addEventListener(`click`,()=>je(e.dataset.decision))}),document.querySelectorAll(`[data-key]`).forEach(e=>{e.addEventListener(`click`,()=>Q(e.dataset.key??``))}),document.querySelector(`#submitRecall`)?.addEventListener(`click`,()=>{let e=Number(y);y&&Number.isFinite(e)&&Y(e)}),document.querySelector(`#nextButton`)?.addEventListener(`click`,$),document.querySelector(`#dismissInstallTip`)?.addEventListener(`click`,()=>{localStorage.setItem(r,`1`),document.querySelector(`.install-tip`)?.remove()}),document.querySelector(`#resetButton`)?.addEventListener(`click`,()=>{window.confirm(`清除 V0.2 的所有答題統計？`)&&(m=f(),T(),$())})}window.addEventListener(`keydown`,e=>{if(!(_||h.answerMode!==`recall`||g?.kind!==`numeric`)){if(/^\d$/.test(e.key))Q(e.key);else if(e.key===`.`)Q(`dot`);else if(e.key===`Backspace`)Q(`back`);else if(e.key===`Enter`){let e=Number(y);y&&Number.isFinite(e)&&Y(e)}}}),$();