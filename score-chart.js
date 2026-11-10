import {t} from './i18n.js?v=20261110-care';
import {models,expertScore} from './scores.js?v=20261110-care';

const chart=document.getElementById('score-chart');

export function renderScoreChart(){
 const entries=[...models,{id:t('人类专家'),brand:'Expert',icon:'expert.svg',color:'#bc4927',score:expertScore}];
 const grid=document.createElement('div');grid.className='chart-grid';grid.setAttribute('aria-hidden','true');
 for(const tick of [100,80,60,40,20,0]){const row=document.createElement('div');row.className='chart-grid-line';row.style.bottom=`${tick}%`;const label=document.createElement('span');label.textContent=tick;row.append(label);grid.append(row);}
 const bars=document.createElement('div');bars.className='chart-bars';bars.style.setProperty('--chart-count',String(entries.length));
 for(const entry of entries){
  const unknown=entry.score===null;
  const item=document.createElement('div');item.className='chart-item';item.setAttribute('aria-label',`${entry.id}：${unknown?t('未知'):entry.score+' '+t('分，示意评分')}`);
  const track=document.createElement('div');track.className='chart-track';
  const bar=document.createElement('div');bar.className=`chart-bar${unknown?' unknown':entry.score===0?' zero':''}`;if(!unknown){bar.style.height=`${entry.score}%`;bar.style.backgroundColor=entry.color;}
  const value=document.createElement('strong');value.className='chart-value';value.textContent=unknown?'?':entry.score;bar.append(value);track.append(bar);
  const label=document.createElement('div');label.className='chart-label';
  const icon=document.createElement('img');icon.src=`./assets/models/${entry.icon}`;icon.alt=entry.brand;icon.width=26;icon.height=26;
  const name=document.createElement('span');name.textContent=entry.id;label.append(icon,name);item.append(track,label);bars.append(item);
 }
 chart.replaceChildren(grid,bars);
}
