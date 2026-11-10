import {t,getLanguage} from './i18n.js?v=20261110-care';
import {openDialog,closeDialog,nudge,pulse} from './motion.js?v=20261021-motion';
const inbox='shijia.ge@hexafuture.cn';
const finePointer=matchMedia('(pointer: fine)');
export function prepareSubmission(values,language='zh'){
 const en=language==='en';
 const subject=`HMF · ${en?'Video submission':'操作视频审核'} · ${values.operation.trim().replace(/[\r\n]/g,' ')}`;
 const body=[`${en?'Skill / task':'操作名称'}: ${values.operation.trim()}`,`${en?'Video':'视频链接'}: ${values.video.trim()}`,`${en?'Name / team':'姓名 / 团队'}: ${values.name.trim()}`,`${en?'Contact email':'联系邮箱'}: ${values.email.trim()}`,values.notes.trim()?`\n${en?'Notes':'补充说明'}:\n${values.notes.trim()}`:''].filter(Boolean).join('\n');
 return {subject,body,mailto:`mailto:${inbox}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`};
}
export function initSubmission(){
 const dialog=document.getElementById('submission-dialog');
 const form=document.getElementById('submission-form');
 const status=document.getElementById('submission-status');
 const setStatus=text=>{status.textContent=text;pulse(status);};
 // Focus the first field only with a mouse; on touch screens the keyboard would cover the sheet.
 document.getElementById('open-submission').addEventListener('click',e=>{status.textContent='';openDialog(dialog,e.currentTarget);if(finePointer.matches)form.elements.operation.focus({preventScroll:true});});
 document.getElementById('close-submission').addEventListener('click',()=>closeDialog(dialog));
 dialog.addEventListener('cancel',e=>{e.preventDefault();closeDialog(dialog);});
 dialog.addEventListener('click',e=>{if(e.target!==dialog)return;const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDialog(dialog);});
 const prepare=()=>{
  const video=form.elements.video;
  video.setCustomValidity('');
  if(video.value&&!/^https?:\/\//i.test(video.value))video.setCustomValidity(getLanguage()==='en'?'Use an http:// or https:// video link.':'请填写 http:// 或 https:// 视频链接。');
  if(!form.reportValidity()){nudge(form.querySelector(':invalid'));return null;}
  return prepareSubmission(Object.fromEntries(new FormData(form)),getLanguage());
 };
 form.elements.video.addEventListener('input',()=>form.elements.video.setCustomValidity(''));
 form.addEventListener('submit',e=>{
  e.preventDefault();const draft=prepare();if(!draft)return;
  const a=document.createElement('a');a.href=draft.mailto;a.click();
  setStatus(t('邮件已准备好，请在邮箱中确认发送。')+' '+t('未打开邮箱？可以下载邮件草稿。'));
 });
 document.getElementById('download-submission').addEventListener('click',()=>{
  const draft=prepare();if(!draft)return;
  const encoded=btoa(String.fromCharCode(...new TextEncoder().encode(draft.subject)));
  const eml=`To: ${inbox}\r\nSubject: =?UTF-8?B?${encoded}?=\r\nMIME-Version: 1.0\r\nContent-Type: text/plain; charset=UTF-8\r\nContent-Transfer-Encoding: 8bit\r\nX-Unsent: 1\r\n\r\n${draft.body.replace(/\n/g,'\r\n')}`;
  const url=URL.createObjectURL(new Blob([eml],{type:'message/rfc822'}));
  const a=document.createElement('a');a.href=url;a.download='HMF-video-submission.eml';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
  setStatus(t('邮件草稿已下载，尚未发送。'));
 });
}
