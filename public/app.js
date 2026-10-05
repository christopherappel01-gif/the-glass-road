const socket = io();
const classes = ['Knight','Ranger','Thief','Mage','Monk','Engineer'];
const skills = ['Strength','Agility','Endurance','Awareness','Survival','Stealth','Knowledge','Craft','Influence','Spirit'];
const backgrounds={Noble:{edge:'Influence',text:'Raised around courts, duty and difficult conversations.'},Outlander:{edge:'Survival',text:'Comfortable far from roads, maps and civilisation.'},Scholar:{edge:'Knowledge',text:'Trained to recognise history, symbols and forgotten ideas.'},Sailor:{edge:'Endurance',text:'Used to storms, ropes, cramped quarters and hard work.'},Streetwise:{edge:'Stealth',text:'Quick at reading danger, locks and people who lie.'},Artisan:{edge:'Craft',text:'A practical maker who understands tools and how things fit together.'}};
const classInfo = {
  Knight:{icon:'⚔️',gift:'Guardian — excels at holding the line, protecting allies and forcing a path through danger.',fav:['Strength','Endurance','Influence'],build:{Strength:5,Agility:1,Endurance:4,Awareness:2,Survival:2,Stealth:0,Knowledge:1,Craft:1,Influence:3,Spirit:1}},
  Ranger:{icon:'🏹',gift:'Trailwise — gains +1 to Awareness or Survival checks outdoors.',fav:['Agility','Awareness','Survival'],build:{Strength:1,Agility:4,Endurance:2,Awareness:5,Survival:4,Stealth:2,Knowledge:0,Craft:0,Influence:1,Spirit:1}},
  Thief:{icon:'🗡️',gift:'Shadowstep — built for stealth, infiltration, traps and rapid improvisation.',fav:['Agility','Stealth','Awareness'],build:{Strength:1,Agility:5,Endurance:1,Awareness:4,Survival:2,Stealth:5,Knowledge:0,Craft:1,Influence:1,Spirit:0}},
  Mage:{icon:'✨',gift:'Arcane Sight — gains +1 to Knowledge or Spirit checks involving magic.',fav:['Knowledge','Spirit','Awareness'],build:{Strength:0,Agility:1,Endurance:1,Awareness:3,Survival:1,Stealth:0,Knowledge:5,Craft:2,Influence:2,Spirit:5}},
  Monk:{icon:'🕯️',gift:'Mend — resilient spiritual healer and the party’s calm centre in moments of fear.',fav:['Spirit','Endurance','Influence'],build:{Strength:1,Agility:1,Endurance:4,Awareness:2,Survival:2,Stealth:0,Knowledge:2,Craft:0,Influence:3,Spirit:5}},
  Engineer:{icon:'⚙️',gift:'Improviser — gains +1 to Craft checks; invaluable with mechanisms, repairs and construction.',fav:['Craft','Knowledge','Strength'],build:{Strength:3,Agility:1,Endurance:2,Awareness:2,Survival:1,Stealth:0,Knowledge:4,Craft:5,Influence:1,Spirit:1}}
};
const sceneLoops={waiting_reunion:"assets/loop_mountain.webp",intro:"assets/loop_discovery.webp",briefing:"assets/loop_discovery.webp",forge:"assets/loop_discovery.webp",cliff_excavation:"assets/loop_discovery.webp",first_mile:"assets/loop_discovery.webp",farmstead:"assets/loop_discovery.webp",woodland_edge:"assets/loop_pines.webp",pine_road:"assets/loop_pines.webp",charcoal_camp:"assets/loop_charcoal.webp",stag_stones:"assets/loop_stag.webp",pine_camp:"assets/loop_charcoal.webp",pine_descent:"assets/loop_pines.webp",river_road:"assets/loop_river.webp",ferry_house:"assets/loop_river.webp",drowned_marker:"assets/loop_lowwater.webp",river_hamlet:"assets/loop_lowwater.webp",river_camp:"assets/loop_lowwater.webp",river_exit:"assets/loop_lowwater.webp",broken_span:"assets/loop_broken_span.webp",span_wave1:"assets/loop_broken_span.webp",span_choice:"assets/loop_tone_bridge.webp",span_final:"assets/loop_tone_bridge.webp",after_span:"assets/loop_tone_bridge.webp",hollowmere:"assets/loop_hollowmere.webp",hollow_forge:"assets/loop_under_mountain.webp",hollow_inn:"assets/loop_hollowmere.webp",hollow_records:"assets/loop_hollowmere.webp",mountain_departure:"assets/loop_mountain.webp",ridge1:"assets/loop_mountain.webp",ridge2:"assets/loop_mountain.webp",ridge3:"assets/loop_mountain.webp",tunnel1:"assets/loop_under_mountain.webp",tunnel2:"assets/loop_under_mountain.webp",tunnel3:"assets/loop_under_mountain.webp",pass_reunion:"assets/loop_mountain.webp",final_view:"assets/loop_final.webp",receiver_threshold:"assets/loop_under_mountain.webp",receiver_assault:"assets/loop_under_mountain.webp",keeper_choice:"assets/loop_under_mountain.webp"};
const sceneArt={waiting_reunion:["","Waiting at the Rendezvous"],"intro":["","Brackencliff After the Quake"],"briefing":["","The Expedition Table"],"forge":["","The Forge Before the Road"],"cliff_excavation":["","The First Exposed Mile"],"first_mile":["","The Road Under the Fields"],"farmstead":["","The Last Farm"],"woodland_edge":["","Where the Old Maps End"],"pine_road":["","Under the High Pines"],"charcoal_camp":["","The Charcoal Burner's Camp"],"stag_stones":["","The Stag Stones"],"pine_camp":["","Camp Above the Tern"],"pine_descent":["","The Long Descent"],"river_road":["","Along the River Tern"],"ferry_house":["","The Empty Ferry House"],"drowned_marker":["","The Drowned Marker"],"river_hamlet":["","Three Houses at Lowwater"],"river_camp":["","Rain at Lowwater"],"river_exit":["","The Flooded Approach"],"broken_span":["","The Broken Bridge"],"span_wave1":["","Glass Hounds"],"span_choice":["","The Bridge Wakes"],"span_final":["","The Sound Beneath the Bridge"],"after_span":["","Two Expeditions, One Road"],"hollowmere":["","Hollowmere"],"hollow_forge":["","The Mountain Forge"],"hollow_inn":["","The Lantern Inn"],"hollow_records":["","The Toll-House Archive"],"mountain_departure":["","Leaving Hollowmere"],"ridge1":["","The Wind Stair"],"ridge2":["","The Bell Cairn"],"ridge3":["","The White Ledge"],"tunnel1":["","The Sealed Door"],"tunnel2":["","The Water Chambers"],"tunnel3":["","The Closed Chamber"],"pass_reunion":["","The First Crossing"],"final_view":["","Beyond the Known Maps"]};
const sceneImages={waiting_reunion:"assets/hq_mountain_pass.webp","intro":"assets/brackencliff_v12.webp","briefing":"assets/scene_briefing.webp","forge":"assets/scene_forge.webp","cliff_excavation":"assets/scene_cliff_excavation.webp","first_mile":"assets/first_mile_ai.webp","farmstead":"assets/scene_farmstead.webp","woodland_edge":"assets/hq_greywood_road.webp","pine_road":"assets/hq_greywood_road.webp","charcoal_camp":"assets/hq_charcoal_camp.webp","stag_stones":"assets/hq_stag_stones.webp","pine_camp":"assets/hq_pine_camp.webp","pine_descent":"assets/hq_pine_camp.webp","river_road":"assets/hq_river_road.webp","ferry_house":"assets/hq_river_road.webp","drowned_marker":"assets/hq_lowwater.webp","river_hamlet":"assets/hq_lowwater.webp","river_camp":"assets/hq_lowwater.webp","river_exit":"assets/hq_lowwater.webp","broken_span":"assets/hq_broken_span_hounds.webp","span_wave1":"assets/hq_broken_span_hounds.webp","span_choice":"assets/hq_tone_beneath_bridge.webp","span_final":"assets/hq_tone_beneath_bridge.webp","after_span":"assets/hq_tone_beneath_bridge.webp","hollowmere":"assets/hollowmere_ai.webp","hollow_forge":"assets/hq_under_mountain.webp","hollow_inn":"assets/hollowmere_ai.webp","hollow_records":"assets/hollowmere_ai.webp","mountain_departure":"assets/hq_mountain_pass.webp","ridge1":"assets/hq_mountain_pass.webp","ridge2":"assets/hq_mountain_pass.webp","ridge3":"assets/hq_mountain_pass.webp","tunnel1":"assets/hq_under_mountain.webp","tunnel2":"assets/hq_under_mountain.webp","tunnel3":"assets/hq_under_mountain.webp","pass_reunion":"assets/hq_mountain_pass.webp","final_view":"assets/final_ai.webp"};
const HERO_ASSET_VERSION='v160';
const heroAsset=(file)=>`/assets/${file}?${HERO_ASSET_VERSION}`;
const portraitImages={Knight:['knight_1.webp','knight_2.webp','knight_3.webp'],Ranger:['ranger_1.webp','ranger_2.webp','ranger_3.webp'],Thief:['thief_1.webp','thief_2.webp','thief_3.webp'],Mage:['mage_1.webp','mage_2.webp','mage_3.webp'],Monk:['monk_1.webp','monk_2.webp','monk_3.webp'],Engineer:['engineer_1.webp','engineer_2.webp','engineer_3.webp']};
const portraitFallbacks={Knight:'knight_1.webp',Ranger:'ranger_1.webp',Thief:'thief_1.webp',Mage:'mage_1.webp',Monk:'monk_1.webp',Engineer:'engineer_1.webp'};
const portraitChoice={create:1,join:1};
const portraitPath=(cls,n=1)=>heroAsset(portraitImages[cls]?.[Math.max(0,Math.min(2,Number(n||1)-1))]||portraitImages[cls]?.[0]||'portraits.webp');
const portraitFallback=(cls)=>heroAsset(portraitFallbacks[cls]||'portraits.webp');
const portraitError=(cls)=>`this.onerror=null;this.src='${portraitFallback(cls)}'`;

const flagshipBeats=[
  {id:'intro',scene:'intro',title:'Brackencliff',text:'The Glass Road is uncovered beneath a shattered frontier city.'},
  {id:'pines',scene:'pine_road',title:'The Road Through the Pines',text:'The expedition leaves the mapped world and follows the dark road into older country.'},
  {id:'lowwater',scene:'river_road',title:'River Tern & Lowwater',text:'Rain, river mist and worn settlements test the company’s resolve.'},
  {id:'span',scene:'broken_span',title:'Broken Bridge',text:'The Road answers back. Glass Hounds and a living bridge force a true crisis.'},
  {id:'hollowmere',scene:'hollowmere',title:'Hollowmere',text:'A mountain town of docks, lamps and hidden records deepens the mystery.'},
  {id:'pass',scene:'mountain_departure',title:'Crown Pass',text:'Ancient systems wake beneath the mountains as the route climbs toward revelation.'},
  {id:'finale',scene:'final_view',title:'Beyond the Known Maps',text:'The distant promise of the First Crossing glows beyond the last ascent.'}
];
const flagshipClassNotes={Knight:'Hold the line and protect the company.',Ranger:'Track, scout and survive beyond the maps.',Thief:'Infiltrate, improvise and find unseen paths.',Mage:'Read the Road, its symbols and its power.',Monk:'Steady the party with resolve and healing.',Engineer:'Repair, improvise and master old mechanisms.'};
let flagshipMontageIndex=0,flagshipMontageTimer=null,flagshipClassTimer=null;
function sceneMotionClass(scene){if(/^(broken_span|span_wave1|span_choice|span_final|after_span|receiver_threshold|receiver_assault|keeper_choice)$/.test(scene))return 'scene-motion-danger';if(/^(hollowmere|hollow_inn|hollow_forge|hollow_records|intro|briefing|forge|cliff_excavation|first_mile|farmstead)$/.test(scene))return 'scene-motion-settlement';if(/^(mountain_departure|ridge1|ridge2|ridge3|tunnel1|tunnel2|tunnel3|pass_reunion)$/.test(scene))return 'scene-motion-mountain';if(/^(river_road|ferry_house|drowned_marker|river_hamlet|river_camp|river_exit|pine_road|charcoal_camp|stag_stones|pine_camp|pine_descent)$/.test(scene))return 'scene-motion-travel';if(scene==='final_view')return 'scene-motion-final';return 'scene-motion-road';}
function sceneRevealTone(scene){if(/^(broken_span|span_wave1|span_choice|span_final|after_span|receiver_threshold|receiver_assault|keeper_choice)$/.test(scene))return 'tone-danger';if(/^(hollowmere|hollow_inn|hollow_forge|hollow_records|intro|briefing|forge|cliff_excavation|first_mile|farmstead)$/.test(scene))return 'tone-settlement';if(/^(mountain_departure|ridge1|ridge2|ridge3|tunnel1|tunnel2|tunnel3|pass_reunion|final_view)$/.test(scene))return 'tone-mountain';return 'tone-road';}
function sceneAtmosClass(scene){if(/^(pine_road|charcoal_camp|stag_stones|pine_camp|pine_descent|woodland_edge)$/.test(scene))return 'scene-atmos-forest';if(/^(river_road|ferry_house|drowned_marker|river_hamlet|river_camp|river_exit)$/.test(scene))return 'scene-atmos-river';if(/^(mountain_departure|ridge1|ridge2|ridge3|tunnel1|tunnel2|tunnel3|pass_reunion)$/.test(scene))return 'scene-atmos-mountain';if(/^(broken_span|span_wave1|span_choice|span_final|after_span|receiver_threshold|receiver_assault|keeper_choice)$/.test(scene))return 'scene-atmos-danger';if(/^(hollowmere|hollow_inn|hollow_forge|hollow_records|intro|briefing|forge|cliff_excavation|first_mile|farmstead)$/.test(scene))return 'scene-atmos-settlement';if(scene==='final_view')return 'scene-atmos-final';return 'scene-atmos-road';}
function buildFlagshipMontage(){const stage=$('flagshipMontageStage'),nav=$('flagshipMontageNav');if(!stage||!nav)return;stage.innerHTML=flagshipBeats.map((beat,i)=>`<div class="flagship-montage__slide ${i===0?'active':''}" data-beat="${i}" style="background-image:url('${sceneImages[beat.scene]||sceneImages.intro||'assets/glass_home.svg'}')"><div class="flagship-montage__copy"><div class="eyebrow">STORY BEAT ${i+1}</div><h3>${esc(beat.title)}</h3><p>${esc(beat.text)}</p></div></div>`).join('');nav.innerHTML=flagshipBeats.map((beat,i)=>`<button type="button" class="flagship-montage__beat ${i===0?'active':''}" data-beat="${i}"><div class="flagship-montage__beat-index">${i+1}</div><div><b>${esc(beat.title)}</b><span>${esc(beat.text)}</span></div></button>`).join('');nav.querySelectorAll('.flagship-montage__beat').forEach(btn=>btn.onclick=()=>{setFlagshipBeat(Number(btn.dataset.beat),true);});restartFlagshipMontage();}
function setFlagshipBeat(index,restart=false){const stage=$('flagshipMontageStage'),nav=$('flagshipMontageNav');if(!stage||!nav)return;const slides=[...stage.querySelectorAll('.flagship-montage__slide')],beats=[...nav.querySelectorAll('.flagship-montage__beat')];flagshipMontageIndex=((index%slides.length)+slides.length)%slides.length;slides.forEach((el,i)=>el.classList.toggle('active',i===flagshipMontageIndex));beats.forEach((el,i)=>el.classList.toggle('active',i===flagshipMontageIndex));if(restart)restartFlagshipMontage();}
function restartFlagshipMontage(){clearInterval(flagshipMontageTimer);flagshipMontageTimer=setInterval(()=>setFlagshipBeat(flagshipMontageIndex+1),4600);}
function buildFlagshipClassGallery(){const box=$('flagshipClassGallery');if(!box)return;box.innerHTML=classes.map((cls,idx)=>`<article class="flagship-class-card" data-class-card="${cls}"><div class="flagship-class-card__art"><img src="${portraitPath(cls,1)}" data-variant="1" alt="${cls} portrait" onerror="${portraitError(cls)}"></div><div class="flagship-class-card__body"><div class="eyebrow">${classInfo[cls].icon} ${cls.toUpperCase()}</div><h3>${esc(cls)}</h3><p>${esc(flagshipClassNotes[cls]||classInfo[cls].gift)}</p><div class="flagship-class-card__tag">${esc(classInfo[cls].fav.join(' · '))}</div></div></article>`).join('');clearInterval(flagshipClassTimer);flagshipClassTimer=setInterval(()=>{box.querySelectorAll('[data-class-card]').forEach(card=>{const cls=card.dataset.classCard,img=card.querySelector('img');if(!img)return;const current=Number(img.dataset.variant||1);const next=current>=3?1:current+1;card.classList.add('is-swapping');setTimeout(()=>{img.src=portraitPath(cls,next);img.dataset.variant=String(next);card.classList.remove('is-swapping');},210);});},3800);}
function initFlagshipHome(){buildFlagshipMontage();buildFlagshipClassGallery();}
const npcInfo={
"Mara":{"name":"Mara Vale","img":"assets/npc_mara_ai.webp","tag":"Cartographer"},
"Dain":{"name":"Dain Holt","img":"assets/npc_dain_ai.webp","tag":"Road-captain"},
"Ilyra":{"name":"Ilyra Sen","img":"assets/npc_ilyra_ai.webp","tag":"Interpreter"},
"Rook":{"name":"Cassian Rook","img":"assets/npc_rook_ai.webp","tag":"Rival explorer"},
"Rowan":{"name":"Rowan Marr","img":"assets/npc_rowan_ai.webp","tag":"Brackencliff blacksmith"},
"Sella":{"name":"Master Sella Vorr","img":"assets/npc_sella_ai.webp","tag":"Hollowmere smith"},
"Edda":{"name":"Edda Varn","img":"assets/npc_edda_unique.webp","tag":"Farmer at the last settled road"},
"Beren":{"name":"Beren Quill","img":"assets/npc_beren_unique.webp","tag":"Charcoal burner"},
"Innkeeper":{"name":"Innkeeper","img":"assets/npc_innkeeper_unique.webp","tag":"Lantern Inn keeper"},
"Shepherd":{"name":"Shepherd","img":"assets/npc_shepherd_unique.webp","tag":"Mountain shepherd"},
"Clerk":{"name":"Archive clerk","img":"assets/npc_clerk_unique.webp","tag":"Toll-house clerk"},
"Elder":{"name":"Lowwater elder","img":"assets/npc_elder_unique.webp","tag":"River hamlet elder"},
"Scout":{"name":"Rook's scout","img":"assets/npc_scout_unique.webp","tag":"Rook expedition scout"}
};
let me=null,state=null,myStats=emptyStats(),roomCode='';
let rollRequest=null;
let lastRenderedScene=null;
let audioOn=readJson('glassRoadSfx')===true,ambientOn=readJson('glassRoadAmbient')===true,lastSceneSeen=null,lastRollSeen='',dismissedRollKey='',previousSnapshot=null,suppressNextSceneReveal=false,pendingStoryBridge=null;
let ambientScene=null,ambientMaster=null,ambientNodes=[],ambientTimer=null;
let voiceJoined=false,voiceMuted=false,localVoiceStream=null,voiceAnalyserFrame=null,localSpeaking=false;
const voicePeers=new Map(),voiceSpeaking=new Map();
let voiceRtcConfig={iceServers:[{urls:['stun:stun.l.google.com:19302','stun:stun1.l.google.com:19302','stun:stun2.l.google.com:19302']}]};
let voiceRelayAvailable=false;
const voiceConnectionStates=new Map();
let sessionInfo=readJson('glassRoadSession');
let campaignSave=readJson('glassRoadCampaign');
let privateClues=[];
let autoResumeTried=false;
function readJson(key){try{return JSON.parse(localStorage.getItem(key)||'null')}catch{return null}}
function writeJson(key,value){try{localStorage.setItem(key,JSON.stringify(value))}catch{}}
function clearKey(key){try{localStorage.removeItem(key)}catch{}}

const languageNames={en:'English',nl:'Nederlands',fr:'Français',de:'Deutsch'};
let currentLanguage=readJson('glassRoadLanguage')||'en';
let translationToken=0,translatorInstance=null,translatorLang='';
const translationCache=new Map();
let translationServerAvailable=false;
const uiPhrases={
  'Join Voice':{nl:'Stemchat starten',fr:'Rejoindre le vocal',de:'Sprachchat beitreten'},
  'Mute':{nl:'Dempen',fr:'Couper le micro',de:'Stummschalten'},
  'Unmute':{nl:'Dempen opheffen',fr:'Rétablir le micro',de:'Stummschaltung aufheben'},
  'Leave':{nl:'Verlaten',fr:'Quitter',de:'Verlassen'},
  'Voice Chat':{nl:'Stemchat',fr:'Chat vocal',de:'Sprachchat'},
  'Not connected':{nl:'Niet verbonden',fr:'Non connecté',de:'Nicht verbunden'},
  'Optional':{nl:'Optioneel',fr:'Facultatif',de:'Optional'},
  'My Hero':{nl:'Mijn held',fr:'Mon héros',de:'Mein Held'},
  'Journal':{nl:'Dagboek',fr:'Journal',de:'Journal'},
  'Recap':{nl:'Samenvatting',fr:'Récapitulatif',de:'Rückblick'},
  'Full Screen':{nl:'Volledig scherm',fr:'Plein écran',de:'Vollbild'},
  'Company':{nl:'Gezelschap',fr:'Compagnie',de:'Gruppe'},
  'Objective':{nl:'Doel',fr:'Objectif',de:'Ziel'},
  'Special Items':{nl:'Speciale voorwerpen',fr:'Objets spéciaux',de:'Besondere Gegenstände'},
  'Map of the First Crossing':{nl:'Kaart van de Eerste Oversteek',fr:'Carte de la Première Traversée',de:'Karte der Ersten Überquerung'},
  'Begin the Crossing':{nl:'Begin de oversteek',fr:'Commencer la traversée',de:'Überquerung beginnen'},
  'Create Adventure':{nl:'Avontuur maken',fr:'Créer une aventure',de:'Abenteuer erstellen'},
  'Join Adventure':{nl:'Avontuur betreden',fr:'Rejoindre une aventure',de:'Abenteuer beitreten'},
  'Continue':{nl:'Doorgaan',fr:'Continuer',de:'Weiter'},
  'Close':{nl:'Sluiten',fr:'Fermer',de:'Schließen'},
  'PARTY':{nl:'GROEP',fr:'GROUPE',de:'GRUPPE'},
  'CURRENT MISSION':{nl:'HUIDIGE MISSIE',fr:'MISSION ACTUELLE',de:'AKTUELLE MISSION'},
  'EXPEDITION PACK':{nl:'EXPEDITIEPAKKET',fr:'SAC D’EXPÉDITION',de:'EXPEDITIONSGEPÄCK'},
  'JOURNEY SO FAR':{nl:'REIS TOT NU TOE',fr:'PARCOURS JUSQU’ICI',de:'BISHERIGE REISE'},
  'Main Menu':{nl:'Hoofdmenu',fr:'Menu principal',de:'Hauptmenü'},
  'SFX on':{nl:'Effecten aan',fr:'Effets activés',de:'Effekte an'},
  'SFX off':{nl:'Effecten uit',fr:'Effets coupés',de:'Effekte aus'},
  'Ambience on':{nl:'Sfeer aan',fr:'Ambiance activée',de:'Atmosphäre an'},
  'Ambience off':{nl:'Sfeer uit',fr:'Ambiance coupée',de:'Atmosphäre aus'},
  'Round':{nl:'Ronde',fr:'Tour',de:'Runde'},
  'Hope':{nl:'Hoop',fr:'Espoir',de:'Hoffnung'},
  'Threat':{nl:'Dreiging',fr:'Menace',de:'Gefahr'},
  'Supplies':{nl:'Voorraden',fr:'Provisions',de:'Vorräte'},
  'Finds':{nl:'Vondsten',fr:'Trouvailles',de:'Funde'},
  'Coin':{nl:'Munt',fr:'Pièces',de:'Münzen'},
  'Current Mission':{nl:'Huidige missie',fr:'Mission actuelle',de:'Aktuelle Mission'},
  'Journey so far':{nl:'Reis tot nu toe',fr:'Parcours jusqu’ici',de:'Bisherige Reise'},
  'Conversation':{nl:'Gesprek',fr:'Conversation',de:'Gespräch'},
  'Your turn':{nl:'Jouw beurt',fr:'À vous',de:'Du bist dran'},
  'Language':{nl:'Taal',fr:'Langue',de:'Sprache'},
  'LANGUAGE':{nl:'TAAL',fr:'LANGUE',de:'SPRACHE'},
  'Try direct voice':{nl:'Probeer directe stemchat',fr:'Essayer la voix directe',de:'Direkte Sprachverbindung versuchen'}
};
async function loadTranslationConfig(){try{const r=await fetch('/translation-config',{cache:'no-store'});if(r.ok){const x=await r.json();translationServerAvailable=!!x.configured;}}catch{translationServerAvailable=false;}}
async function loadVoiceConfig(){
  try{const r=await fetch('/voice-config',{cache:'no-store'});if(!r.ok)return;const cfg=await r.json();if(Array.isArray(cfg.iceServers)&&cfg.iceServers.length)voiceRtcConfig={iceServers:cfg.iceServers,iceCandidatePoolSize:4};voiceRelayAvailable=!!cfg.relayAvailable;renderVoiceUi();}catch{}
}
function setLanguageStatus(msg=''){const el=$('languageStatus');if(el)el.textContent=msg;}
async function getBrowserTranslator(target){
  if(target==='en')return null;
  try{const T=window.Translator;if(!T?.create)return null;if(translatorInstance&&translatorLang===target)return translatorInstance;if(T.availability){const a=await T.availability({sourceLanguage:'en',targetLanguage:target});if(a==='unavailable')return null;}translatorInstance=await T.create({sourceLanguage:'en',targetLanguage:target,monitor(m){m.addEventListener?.('downloadprogress',e=>setLanguageStatus(`Downloading ${Math.round((e.loaded||0)*100)}%`));}});translatorLang=target;return translatorInstance;}catch{return null;}
}
async function translateText(text,target=currentLanguage){
  const source=String(text||'').trim();if(!source||target==='en')return source;const key=`${target}|${source}`;if(translationCache.has(key))return translationCache.get(key);const stored=readJson('glassRoadTranslations')||{};if(stored[key]){translationCache.set(key,stored[key]);return stored[key];}
  let out='';const local=await getBrowserTranslator(target);if(local){try{out=await local.translate(source);}catch{out='';}}
  if(!out){try{const r=await fetch('/api/translate',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({text:source,target})});if(r.ok)out=(await r.json()).text||'';}catch{}}
  if(out){translationCache.set(key,out);stored[key]=out;if(Object.keys(stored).length>900){for(const k of Object.keys(stored).slice(0,150))delete stored[k];}writeJson('glassRoadTranslations',stored);return out;}return null;
}
function resetStaticUiToEnglish(){
  document.querySelectorAll('[data-i18n-source]').forEach(el=>{el.textContent=el.dataset.i18nSource||el.textContent;});
}
function applyStaticUiLanguage(lang=currentLanguage){
  document.querySelectorAll('button,h2,.eyebrow,.voice-note,.home-footnote,.hero-banner__microcopy,.language-switcher label').forEach(el=>{
    if(el.closest('#sceneText,#choices,#npcMoment,#callbackPanel,#challenge,#rollResult,#secret'))return;
    if(!el.dataset.i18nSource)el.dataset.i18nSource=el.textContent.trim();
    const full=el.dataset.i18nSource||'',m=full.match(/^([^A-Za-zÀ-ÿ0-9]*)(.*)$/),prefix=m?.[1]||'',core=m?.[2]||full;
    const direct=uiPhrases[core]?.[lang]||uiPhrases[core.toUpperCase()]?.[lang]||uiPhrases[core.replace(/\s+(on|off)$/i,' $1')]?.[lang];
    el.textContent=lang==='en'?full:prefix+(direct||core);
  });
}
function translatableGameElements(){
  const sel='#sceneTitle,#mission,#sceneText p,#storyBridge p,#choices .choice b,#choices .choice span,#npcMoment .eyebrow,#npcMoment h3,#npcMoment p,#callbackPanel p,#passiveInsight p,#secret p,#challenge h3,#challenge p,#challenge .mode,.challenge-explain,.turn-notice,.sidebar .eyebrow,.sidebar h2,.sidebar p,.voice-note,.voice-network';
  return [...document.querySelectorAll(sel)].filter(el=>el && !el.closest('.player-ident,.voice-person'));
}
async function translateCurrentStory(){
  const token=++translationToken,lang=currentLanguage;if(lang==='en'){applyStaticUiLanguage('en');setLanguageStatus('');return true;}
  setLanguageStatus('Translating…');
  const els=translatableGameElements();
  const sources=els.map(el=>{if(!el.dataset.translateSource)el.dataset.translateSource=el.textContent.trim();return el.dataset.translateSource;});
  const results=await Promise.all(sources.map(src=>src?translateText(src,lang):Promise.resolve('')));
  if(token!==translationToken||currentLanguage!==lang)return false;
  const failed=results.some((r,i)=>sources[i]&&!r);
  if(failed){
    els.forEach((el,i)=>{if(sources[i])el.textContent=sources[i];});
    applyStaticUiLanguage('en');
    setLanguageStatus(translationServerAvailable?'Translation temporarily unavailable':'Full translation needs the translation service');
    return false;
  }
  els.forEach((el,i)=>{if(sources[i])el.textContent=results[i]||sources[i];});
  applyStaticUiLanguage(lang);setLanguageStatus(languageNames[lang]||'');return true;
}
const translationNodeMeta=new WeakMap();
let fullTranslationTimer=null,translationApplying=false,translationObserver=null;
function shouldTranslateTextNode(node){
  const p=node?.parentElement;if(!p)return false;const tag=p.tagName;
  if(['SCRIPT','STYLE','NOSCRIPT','TEXTAREA'].includes(tag))return false;
  if(p.closest('[data-no-translate],#languageSelect,.player-ident b,.voice-person b,.room-code-big,.return-pin,.code-input,.journey-map svg'))return false;
  const s=String(node.nodeValue||'');return /[A-Za-zÀ-ÿ]/.test(s)&&s.trim().length>1;
}
function visibleTextNodes(root=document.body){
  const out=[];const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode:n=>shouldTranslateTextNode(n)?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT});
  let n;while((n=walker.nextNode())){const p=n.parentElement;if(!p)continue;const cs=getComputedStyle(p);if(cs.display==='none'||cs.visibility==='hidden')continue;out.push(n);}return out;
}
function sourceForNode(node){let meta=translationNodeMeta.get(node);if(!meta){const raw=String(node.nodeValue||''),m=raw.match(/^(\s*)([\s\S]*?)(\s*)$/);meta={leading:m?.[1]||'',source:m?.[2]||raw,trailing:m?.[3]||''};translationNodeMeta.set(node,meta);}return meta;}
function restoreEnglishPage(){translationApplying=true;try{visibleTextNodes(document.body).forEach(n=>{const m=translationNodeMeta.get(n);if(m)n.nodeValue=m.leading+m.source+m.trailing;});resetStaticUiToEnglish();}finally{translationApplying=false;}}
async function translateVisiblePage(){
  const token=++translationToken,lang=currentLanguage,sel=$('languageSelect');
  if(lang==='en'){restoreEnglishPage();setLanguageStatus('');return true;}
  if(sel)sel.disabled=true;setLanguageStatus('Translating whole page…');
  const nodes=visibleTextNodes(document.body);const jobs=[];
  for(const node of nodes){const m=sourceForNode(node),src=m.source.trim();if(!src)continue;jobs.push({node,meta:m,src});}
  let failed=0,next=0;
  async function worker(){while(next<jobs.length){const j=jobs[next++];const translated=await translateText(j.src,lang);if(token!==translationToken||currentLanguage!==lang)return;if(translated){translationApplying=true;j.node.nodeValue=j.meta.leading+translated+j.meta.trailing;translationApplying=false;}else failed++;}}
  await Promise.all(Array.from({length:Math.min(5,jobs.length||1)},()=>worker()));
  if(token!==translationToken||currentLanguage!==lang){if(sel)sel.disabled=false;return false;}
  applyStaticUiLanguage(lang);if(sel)sel.disabled=false;
  setLanguageStatus(failed?`${languageNames[lang]} · ${failed} items left in English`:`${languageNames[lang]} · translated`);return failed===0;
}
function scheduleFullPageTranslation(delay=80){clearTimeout(fullTranslationTimer);if(currentLanguage==='en')return;fullTranslationTimer=setTimeout(()=>translateVisiblePage(),delay);}
function setupTranslationObserver(){if(translationObserver)return;translationObserver=new MutationObserver(muts=>{if(translationApplying||currentLanguage==='en')return;if(muts.some(m=>m.type==='childList'||m.type==='characterData'))scheduleFullPageTranslation(140);});translationObserver.observe(document.body,{subtree:true,childList:true,characterData:true});}
function setupLanguageSelector(){const sel=$('languageSelect');if(!sel)return;sel.value=currentLanguage;sel.onchange=async()=>{currentLanguage=sel.value;writeJson('glassRoadLanguage',currentLanguage);translatorInstance=null;translatorLang='';translationToken++;if(currentLanguage==='en'){if(state?.phase==='playing'){lastRenderedScene=null;renderGame();}restoreEnglishPage();setLanguageStatus('');return;}if(state?.phase==='playing'){lastRenderedScene=null;renderGame();}applyStaticUiLanguage(currentLanguage);await translateVisiblePage();};applyStaticUiLanguage(currentLanguage);setupTranslationObserver();if(currentLanguage!=='en')setTimeout(()=>translateVisiblePage(),120);}
function clueStorageKey(code=roomCode,id=me){return code&&id?`glassRoadClues_${code}_${id}`:null}
function loadPrivateClues(code=roomCode,id=me){const key=clueStorageKey(code,id);privateClues=key?(readJson(key)||[]):[];return privateClues}
function savePrivateClues(){const key=clueStorageKey();if(key)writeJson(key,privateClues)}

const $=id=>document.getElementById(id);
function emptyStats(){return Object.fromEntries(skills.map(s=>[s,0]));}
function esc(s=''){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function show(id){['home','lobby','game','ended'].forEach(x=>$(x).classList.toggle('hidden',x!==id));}
function showError(msg){const e=$('homeError');e.textContent=msg;e.classList.remove('hidden');clearTimeout(showError.t);showError.t=setTimeout(()=>e.classList.add('hidden'),4500);if(state&&state.phase!=='lobby'&&$('consequenceToast'))showConsequence('Something needs attention',msg,'bad');}
function used(){return skills.reduce((a,s)=>a+Number(myStats[s]||0),0);}
function clearRollRequest(){
  if(rollRequest?.timer)clearTimeout(rollRequest.timer);
  if(rollRequest?.followup)clearTimeout(rollRequest.followup);
  rollRequest=null;
}
function sendChallengeRoll(payload,button){
  if(!state?.pending)return showError('That challenge is no longer active.');
  if(!socket.connected)return showConsequence('Connection interrupted','The game is reconnecting. Wait a moment, then roll again. Your turn is safe.','bad');
  const challengeId=state.pending.challengeId||null;
  if(rollRequest){
    if(rollRequest.challengeId===challengeId)return showConsequence('Roll already in progress','The server is still resolving this roll. If it does not finish, the button will unlock automatically.','good');
    clearRollRequest();
  }
  const original=button?.textContent||'🎲 Roll the Dice';
  if(button){button.disabled=true;button.dataset.rollPending='1';button.textContent='🎲 Sending roll…';}
  let finished=false;
  const recover=(message)=>{
    if(finished)return;
    finished=true;
    const activeButton=rollRequest?.button||button;
    clearRollRequest();
    if(activeButton&&document.body.contains(activeButton)){activeButton.disabled=false;activeButton.dataset.rollPending='';activeButton.textContent='🎲 Retry Roll';}
    showConsequence('Roll did not resolve',message||'The server did not confirm the roll. Your turn is still safe — try the roll again.','bad');
  };
  const timer=setTimeout(()=>recover('No response arrived from the server. Your challenge has not been skipped or failed; press Retry Roll.'),9000);
  rollRequest={challengeId,timer,button,original,startedAt:Date.now()};
  socket.timeout(8000).emit('rollChallenge',{...payload,challengeId},(err,ack)=>{
    if(finished)return;
    if(err)return recover('The connection did not acknowledge the roll. Your challenge is still active; press Retry Roll.');
    if(!ack?.ok){
      clearTimeout(timer);finished=true;
      const activeButton=rollRequest?.button||button;clearRollRequest();
      if(activeButton&&document.body.contains(activeButton)){activeButton.disabled=false;activeButton.dataset.rollPending='';activeButton.textContent='🎲 Retry Roll';}
      showError(ack?.message||'The roll could not be resolved. Please try again.');
      return;
    }
    const req=rollRequest;
    if(req?.challengeId===challengeId&&req.button&&document.body.contains(req.button))req.button.textContent='🎲 Resolving…';
    if(req?.challengeId===challengeId){
      req.followup=setTimeout(()=>{
        if(rollRequest?.challengeId===challengeId&&state?.pending?.challengeId===challengeId&&!state?.pending?.failed){
          const b=rollRequest.button;clearRollRequest();
          if(b&&document.body.contains(b)){b.disabled=false;b.dataset.rollPending='';b.textContent='🎲 Retry Roll';}
          showConsequence('Roll received, scene still waiting','The server received the roll but the scene did not advance. Retry once; duplicate requests are safely rejected.','bad');
        }
      },3500);
    }
  });
}

function player(){return state?.players.find(p=>p.id===me);}
function emitJoin(mode){const name=$(mode+'Name').value.trim(), cls=$(mode+'Class').value, background=$(mode+'Background').value,portrait=portraitChoice[mode]||1;if(!name)return showError('Enter a hero name first.');if(mode==='join'){const code=$('joinCode').value.trim().toUpperCase();if(code.length!==5)return showError('Enter the five-letter room code.');socket.emit('joinRoom',{roomCode:code,name,cls,background,portrait});}else socket.emit('createRoom',{name,cls,background,portrait});}
function refreshSavedCampaignUI(){
  const panel=$('savedCampaignPanel'),rejoin=$('rejoinPanel');campaignSave=readJson('glassRoadCampaign');sessionInfo=readJson('glassRoadSession');
  const available=!!(campaignSave?.saveToken&&sessionInfo?.resumeToken);if(panel)panel.classList.toggle('hidden',!available);
  if(available&&$('savedCampaignInfo')){const when=campaignSave.updatedAt?new Date(campaignSave.updatedAt).toLocaleString():'';$('savedCampaignInfo').textContent=`Saved at ${campaignSave.scene||'your adventure'}, round ${campaignSave.round||1}${when?' · '+when:''}.`; }
  const canRejoin=!!(sessionInfo?.roomCode&&sessionInfo?.resumeToken);if(rejoin)rejoin.classList.toggle('hidden',!canRejoin);if(canRejoin&&$('rejoinInfo'))$('rejoinInfo').textContent=`Last room: ${sessionInfo.roomCode}${sessionInfo.returnPin?' · Return PIN '+sessionInfo.returnPin:''}. Use this if you refreshed or briefly lost connection.`;
}
function storeSession(x){sessionInfo={roomCode:x.roomCode,resumeToken:x.resumeToken,playerId:x.playerId,returnPin:x.returnPin||sessionInfo?.returnPin||null};writeJson('glassRoadSession',sessionInfo);}

function setHomeTab(mode){
  const map={create:'createPanel',join:'joinPanel',return:'returnPanel'};
  const titles={create:['Create a new adventure','Create the room, build your hero, and invite the rest of the company.'],join:["Join a friend's adventure",'Enter the room code, choose your hero, and join the expedition.'],return:['Return to an existing adventure','Use your room code and Return PIN to rejoin a campaign already in progress.']};
  ['create','join','return'].forEach(k=>{
    const panel=$(map[k]),btn=$(k==='create'?'showCreateTab':k==='join'?'showJoinTab':'showReturnTab');
    if(panel) panel.classList.toggle('hidden',k!==mode);
    if(btn) btn.classList.toggle('active',k===mode);
  });
  if($('homeFlowTitle')) $('homeFlowTitle').textContent=titles[mode][0];
  if($('homeFlowText')) $('homeFlowText').textContent=titles[mode][1];
}
function openHomeFlow(mode='create'){
  $('homeFlow')?.classList.remove('hidden');
  setHomeTab(mode);
  if(mode==='create'||mode==='join'){renderClassPreview(mode+'Class',mode+'ClassInfo',mode);renderPortraitPicker(mode);preloadHeroPortraits();}
  requestAnimationFrame(()=>{$('homeFlow')?.scrollIntoView({behavior:'smooth',block:'start'});});
  const focusMap={create:'createName',join:'joinCode',return:'returnCode'};
  setTimeout(()=>$(focusMap[mode])?.focus(),120);
  scheduleFullPageTranslation(120);
}
function closeHomeFlow(){ $('homeFlow')?.classList.add('hidden'); }
function copyText(text,button,label='Copied!'){if(!text)return;const done=()=>{if(button){const old=button.textContent;button.textContent=label;setTimeout(()=>button.textContent=old,1600);}};if(navigator.clipboard?.writeText)navigator.clipboard.writeText(text).then(done).catch(()=>{prompt('Copy this backup key:',text)});else prompt('Copy this backup key:',text);}
function preloadHeroPortraits(){for(const cls of classes){for(const file of (portraitImages[cls]||[])){const img=new Image();img.decoding='async';img.src=heroAsset(file);}}}
function renderPortraitPicker(mode){const cls=$(mode+'Class').value,box=$(mode+'Portraits');if(!box)return;box.innerHTML=portraitImages[cls].map((src,i)=>`<button type="button" class="portrait-choice ${portraitChoice[mode]===i+1?'selected':''}" data-p="${i+1}"><img src="${heroAsset(src)}" onerror="${portraitError(cls)}" alt="${cls} portrait ${i+1}"></button>`).join('');box.querySelectorAll('.portrait-choice').forEach(b=>b.onclick=()=>{portraitChoice[mode]=Number(b.dataset.p);renderPortraitPicker(mode);renderClassPreview(mode+'Class',mode+'ClassInfo',mode);});}
function renderClassPreview(selectId,boxId,mode=selectId.startsWith('create')?'create':'join'){const c=$(selectId).value,i=classInfo[c];$(boxId).innerHTML=`<div class="class-portrait-frame"><img class="class-portrait" src="${portraitPath(c,portraitChoice[mode])}" onerror="${portraitError(c)}" alt="${c} portrait"></div><div><strong>${i.icon} ${c}</strong><br>${i.gift}</div>`;}
['createClass','joinClass'].forEach(id=>{$(id).innerHTML=classes.map(c=>`<option>${c}</option>`).join('');$(id).addEventListener('change',()=>{const mode=id.startsWith('create')?'create':'join';portraitChoice[mode]=1;renderClassPreview(id,id==='createClass'?'createClassInfo':'joinClassInfo',mode);renderPortraitPicker(mode);});});
preloadHeroPortraits();renderClassPreview('createClass','createClassInfo','create');renderClassPreview('joinClass','joinClassInfo','join');renderPortraitPicker('create');renderPortraitPicker('join');
['createBackground','joinBackground'].forEach(id=>{if(!$(id))return;$(id).innerHTML=Object.entries(backgrounds).map(([k,v])=>`<option value="${k}">${k} — ${v.edge}</option>`).join('');});

document.addEventListener('pointerdown',()=>{
  try{if(!(audioOn||ambientOn))return;const AC=window.AudioContext||window.webkitAudioContext;if(AC&&!playSound.ctx)playSound.ctx=new AC();if(playSound.ctx?.state==='suspended')playSound.ctx.resume();if(state?.phase==='playing'&&ambientOn)updateAmbience(state.scene,true);}catch{}
},{once:true});

$('createBtn').onclick=()=>emitJoin('create');$('joinBtn').onclick=()=>emitJoin('join');$('joinCode').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,''));
$('copyRoomBtn').onclick=async()=>{try{await navigator.clipboard.writeText(roomCode);$('copyRoomBtn').textContent='Copied!';setTimeout(()=>$('copyRoomBtn').textContent='Copy code',1400);}catch{$('copyRoomBtn').textContent=roomCode;}};
if($('soundToggle')){ $('soundToggle').textContent=audioOn?'🔊 SFX on':'🔇 SFX off'; $('soundToggle').onclick=()=>{audioOn=!audioOn;writeJson('glassRoadSfx',audioOn);$('soundToggle').textContent=audioOn?'🔊 SFX on':'🔇 SFX off';if(audioOn)playSound('success');else hardSilenceGameAudio();};}
if($('ambientToggle')){$('ambientToggle').textContent=ambientOn?'🌿 Ambience on':'🌿 Ambience off';$('ambientToggle').onclick=()=>{ambientOn=!ambientOn;writeJson('glassRoadAmbient',ambientOn);$('ambientToggle').textContent=ambientOn?'🌿 Ambience on':'🌿 Ambience off';if(ambientOn&&state?.phase==='playing')updateAmbience(state.scene,true);else{stopAmbience();hardSilenceGameAudio();}};}
function updateFullscreenBtn(){const b=$('fullscreenBtn');if(!b)return;b.textContent=document.fullscreenElement?'⤢ Exit Full Screen':'⛶ Full Screen';b.classList.toggle('hidden',!document.documentElement.requestFullscreen);}
if($('fullscreenBtn')){$('fullscreenBtn').onclick=async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen();}catch{}updateFullscreenBtn();};document.addEventListener('fullscreenchange',updateFullscreenBtn);updateFullscreenBtn();}
if($('rejoinLastBtn'))$('rejoinLastBtn').onclick=()=>{sessionInfo=readJson('glassRoadSession');if(!sessionInfo?.roomCode||!sessionInfo?.resumeToken)return showError('No recent room was found.');socket.emit('resumeRoom',{roomCode:sessionInfo.roomCode,resumeToken:sessionInfo.resumeToken});};
if($('continueSavedBtn'))$('continueSavedBtn').onclick=()=>{campaignSave=readJson('glassRoadCampaign');sessionInfo=readJson('glassRoadSession');if(!campaignSave?.saveToken||!sessionInfo?.resumeToken)return showError('No saved campaign was found in this browser.');socket.emit('restoreCampaign',{saveToken:campaignSave.saveToken,resumeToken:sessionInfo.resumeToken});};
if($('copySaveHomeBtn'))$('copySaveHomeBtn').onclick=()=>copyText(readJson('glassRoadCampaign')?.saveToken,$('copySaveHomeBtn'));
if($('forgetSaveBtn'))$('forgetSaveBtn').onclick=()=>{if(confirm('Forget the saved campaign on this browser? This does not stop a room that is currently running.')){clearKey('glassRoadCampaign');clearKey('glassRoadSession');campaignSave=null;sessionInfo=null;refreshSavedCampaignUI();}};
if($('restoreBackupBtn'))$('restoreBackupBtn').onclick=()=>{const key=$('backupKeyInput').value.trim();if(!key)return showError('Paste the campaign backup key first.');socket.emit('restoreCampaign',{saveToken:key,asHost:true});};
refreshSavedCampaignUI();

if($('createAdventureCta')) $('createAdventureCta').onclick=()=>openHomeFlow('create');
if($('joinAdventureCta')) $('joinAdventureCta').onclick=()=>openHomeFlow('join');
if($('showCreateTab')) $('showCreateTab').onclick=()=>setHomeTab('create');
if($('showJoinTab')) $('showJoinTab').onclick=()=>setHomeTab('join');
if($('showReturnTab')) $('showReturnTab').onclick=()=>setHomeTab('return');
if($('homeFlowBack')) $('homeFlowBack').onclick=()=>closeHomeFlow();

if($('returnCode'))$('returnCode').addEventListener('input',e=>e.target.value=e.target.value.toUpperCase().replace(/[^A-Z0-9]/g,''));
if($('returnPin'))$('returnPin').addEventListener('input',e=>e.target.value=e.target.value.replace(/\D/g,'').slice(0,4));
if($('returnAdventureBtn'))$('returnAdventureBtn').onclick=()=>{const code=$('returnCode').value.trim().toUpperCase(),pin=$('returnPin').value.trim();if(code.length!==5)return showError('Enter the five-letter room code.');if(pin.length!==4)return showError('Enter your four-digit Return PIN.');socket.emit('returnToRoom',{roomCode:code,returnPin:pin});};
function returnToMainMenu(){
  if(voiceJoined)leaveVoice();stopAmbience();
  if(state&&me)socket.emit('leaveRoomView');
  me=null;state=null;roomCode='';lastSceneSeen=null;lastRollSeen='';dismissedRollKey='';pendingStoryBridge=null;previousSnapshot=null;show('home');refreshSavedCampaignUI();
}
document.querySelectorAll('.menuBtn').forEach(b=>b.addEventListener('click',()=>{if(confirm('Return to the main menu? Your hero and campaign progress will be kept.'))returnToMainMenu();}));
socket.on('leftRoomView',()=>{show('home');refreshSavedCampaignUI();});

socket.on('errorMsg',showError);
socket.on('rollStarted',x=>{if(rollRequest&&(!x?.challengeId||x.challengeId===rollRequest.challengeId)){const b=rollRequest.button;if(b&&document.body.contains(b))b.textContent='🎲 Rolling…';}});
socket.on('disconnect',()=>{if(rollRequest){clearRollRequest();showConsequence('Connection interrupted','The roll control has been reset. When the connection returns, you can safely try again.','bad');}});
socket.on('connect',()=>{
  refreshSavedCampaignUI();
  if(sessionInfo?.roomCode&&sessionInfo?.resumeToken&&(!autoResumeTried||me)){autoResumeTried=true;socket.emit('resumeRoom',{roomCode:sessionInfo.roomCode,resumeToken:sessionInfo.resumeToken});}
});
socket.on('resumeFailed',()=>{me=null;state=null;show('home');refreshSavedCampaignUI();});
function acceptIdentity(x,resetStats=false){me=x.playerId;roomCode=x.roomCode;storeSession(x);loadPrivateClues(x.roomCode,x.playerId);$('roomCodeBig').textContent=x.roomCode;$('gameRoom').textContent=x.roomCode;if($('returnPinLobby'))$('returnPinLobby').textContent=x.returnPin||sessionInfo?.returnPin||'----';if($('returnPinGame'))$('returnPinGame').textContent=x.returnPin||sessionInfo?.returnPin||'----';if(resetStats)myStats=emptyStats();}
socket.on('joined',x=>{acceptIdentity(x,true);show('lobby');});
socket.on('resumed',x=>{acceptIdentity(x,false);setTimeout(()=>{if(state?.phase==='playing')showConsequence('Welcome back',`You rejoin the company at ${scenes[state.scene]?.title||'the current scene'}. Tap Recap for the last few events.`, 'good');},650);});
socket.on('campaignSave',x=>{campaignSave=x;writeJson('glassRoadCampaign',x);refreshSavedCampaignUI();if($('saveStatus'))$('saveStatus').textContent=`✓ Auto-saved · ${new Date(x.updatedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;});
socket.on('secret',x=>{const box=$('secret');box.innerHTML=`<button class="hint-dismiss-button" type="button" aria-label="Close private insight" title="Close private insight"><span aria-hidden="true">×</span></button><b>🔒 Private ${esc(x.title||'insight')}</b><br>${esc(x.text)}<div class="small muted" style="margin-top:6px">Only your character receives this clue. It has been saved in your Hero sheet.</div>`;box.classList.remove('hidden');box.querySelector('.hint-dismiss-button')?.addEventListener('click',()=>box.classList.add('hidden'));const key=`${x.title||'insight'}|${x.text}`;if(!privateClues.some(c=>c.key===key)){privateClues.unshift({key,title:x.title||'Private insight',text:x.text,seenAt:Date.now()});privateClues=privateClues.slice(0,20);savePrivateClues();}if($('heroSheetModal')&&!$('heroSheetModal').classList.contains('hidden'))renderHeroSheet();});
socket.on('lostArchiveOutcome',x=>{
  const body=$('lostArchiveBody');if(!body)return;
  body.innerHTML=`<div class="lost-archive-result"><div class="eyebrow">MEMORY ADDED TO JOURNAL</div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p><button id="lostArchiveReturn" class="btn btn-primary full" type="button">Return to the main story</button></div>`;
  $('lostArchiveModal')?.classList.remove('hidden');setTimeout(()=>{if($('lostArchiveReturn'))$('lostArchiveReturn').onclick=closeLostArchive;},0);scheduleFullPageTranslation(30);
});
socket.on('state',s=>{
  const old=state;
  if(rollRequest){
    const currentId=rollRequest.challengeId;
    const incomingId=s.pending?.challengeId||null;
    if(!s.pending||s.pending.failed||incomingId!==currentId)clearRollRequest();
  }
  state=s;roomCode=s.code||roomCode;
  if(!me)return;
  const p=s.players.find(x=>x.id===me);if(p?.ready&&used()===0)myStats={...p.stats};
  if(old) handleAtmosphere(old,s);
  try{if(s.phase==='lobby')renderLobby();else if(s.phase==='playing')renderGame();else if(s.phase==='ended')renderEnding();}catch(err){console.error('[render]',err);showConsequence('This route hit a display problem','Your progress is safe. The game has kept the latest state; refresh this tab to continue from the same point.','bad');}renderVoiceUi();syncVoicePeers();if($('heroSheetModal')&&!$('heroSheetModal').classList.contains('hidden'))renderHeroSheet();
});

function renderLobby(){
  show('lobby'); const p=player(); if(!p)return;
  $('youLabel').textContent=`${classInfo[p.cls].icon} ${p.name} — ${p.cls}`;
  $('heroGift').innerHTML=`<b>${classInfo[p.cls].gift.split(' — ')[0]}</b> — ${esc(classInfo[p.cls].gift.split(' — ')[1]||'')}`;
  $('readyBadge').textContent=p.ready?'Ready':'Building';$('readyBadge').classList.toggle('ready',p.ready);
  $('stats').innerHTML='';
  skills.forEach(sk=>{const row=document.createElement('div');row.className='stat '+(classInfo[p.cls].fav.includes(sk)?'favored':'');row.innerHTML=`<span>${classInfo[p.cls].fav.includes(sk)?'<span class="fav-star">★</span> ':''}${sk}</span><button type="button" aria-label="Decrease ${sk}">−</button><strong>${myStats[sk]}</strong><button type="button" aria-label="Increase ${sk}">+</button>`;const bs=row.querySelectorAll('button');bs[0].onclick=()=>{if(!p.ready&&myStats[sk]>0){myStats[sk]--;renderLobby();}};bs[1].onclick=()=>{if(!p.ready&&myStats[sk]<5&&used()<20){myStats[sk]++;renderLobby();}};bs.forEach(b=>b.disabled=p.ready);$('stats').appendChild(row);});
  $('pointsUsed').textContent=used();$('pointsBar').style.width=Math.min(100,used()/20*100)+'%';
  $('recommendedBtn').disabled=p.ready;$('recommendedBtn').onclick=()=>{myStats={...classInfo[p.cls].build};renderLobby();};
  $('readyBtn').disabled=p.ready||used()!==20;$('readyBtn').textContent=p.ready?'✓ Character Locked':'Lock Character';$('readyBtn').onclick=()=>socket.emit('setCharacter',{stats:myStats});
  $('playerCount').textContent=`${state.players.length} / 6`;
  $('lobbyPlayers').innerHTML=state.players.map(x=>playerCard(x,false)).join('');
  const host=state.hostId===me, allReady=state.players.every(x=>x.ready);
  $('startBtn').classList.toggle('hidden',!host);$('startBtn').disabled=!allReady;$('startBtn').onclick=()=>socket.emit('startGame');
  $('lobbyHint').innerHTML=host?(allReady?'<b>Everyone is ready.</b> You can begin the expedition.':'You are the <b>host</b>. Start once every hero shows Ready.'):'Waiting for the host to begin. You can stay on this screen while everyone finishes their hero.';renderVoiceUi();syncVoicePeers();
}
const reputationTitleMap={protector:['Shield of the Company','🛡'],pathfinder:['Wayfinder','🧭'],scholar:['Road-Sage','📖'],negotiator:['Trusted Voice','🗣'],maker:['Fieldwright','⚒'],bold:['First Forward','✦']};
function earnedReputationTitle(p){const reps=p?.reputation||{};const hit=Object.entries(reps).sort((x,y)=>Number(y[1])-Number(x[1])).find(([,v])=>Number(v)>=2);if(!hit)return null;const meta=reputationTitleMap[hit[0]]||[hit[0],'✦'];return {key:hit[0],title:meta[0],icon:meta[1],score:Number(hit[1])};}
function gearConditionText(p){const g=p?.gearUpgrades||{},c=Number(g.condition??3),m=Number(g.maxCondition||3);return c<=0?'Damaged':c<m?`Worn ${c}/${m}`:`Condition ${c}/${m}`;}
function playerCard(p,inGame){const g=(state?.groups||[]).find(x=>(x.playerIds||[]).includes(p.id));const groupTag=state?.groups?.length>1?` · ${esc(g?.name||'Separated')}`:'';const rep=earnedReputationTitle(p);const identity=rep?` · ${rep.icon} ${esc(rep.title)}`:'';const cond=Number(p.gearUpgrades?.condition??3),condition=cond<=1?`<span class="gear-wear ${cond<=0?'broken':''}">${esc(gearConditionText(p))}</span>`:'';return `<div class="player-card ${p.id===me?'you':''} ${inGame&&state.players[state.activeIndex]?.id===p.id?'active':''}"><div class="player-ident"><img class="mini-portrait" src="${portraitPath(p.cls,p.portrait)}" onerror="${portraitError(p.cls)}" alt="${p.cls}"><div><b>${esc(p.name)}</b><div class="small muted">${p.cls} · ${p.background||'Outlander'}${p.talent?' · '+p.talent:''}${identity}${groupTag}</div>${condition}</div></div><div class="small ${p.connected?'ready':'muted'}">${p.connected?'● Online':'○ Away'}${p.ready?' · Ready':''}</div></div>`;}

const scenes={"intro":{"title":"Brackencliff After the Quake","mission":"Meet the expedition, understand why you are here, and decide what matters before anyone steps onto the Glass Road.","text":["","The road is warm even in rain. No mason in the kingdom claims it. No surviving map shows where it goes. Yet fragments of old songs call something like it the Kingless Road — a way that once crossed countries which no longer exist.","Now carts, soldiers, scholars, priests and opportunists crowd the cliff above the excavation. Your company has been chosen because nobody knows whether the first mile will demand strength, caution, scholarship, nerve — or all of them.","Cartographer Mara Vale waits beside a canvas map covered in blank space. Veteran road-captain Dain Holt watches the crowd instead of the road. Ilyra Sen, a young interpreter from the eastern monasteries, keeps one gloved hand over a symbol stitched inside her sleeve.","Before departure, there is time for one question. The Glass Road can wait another minute."],"choices":[["mara","Ask Mara why she believes the road crosses the continent","Conversation · one question"],["dain","Ask Dain what he is expecting to go wrong","Conversation · one question"],["ilyra","Ask Ilyra why she recognises the road-mark","Conversation · one question"]]},"briefing":{"title":"The Expedition Table","mission":"Choose what the company wants to know before the first crossing.","text":["","Dain has arranged the expedition into three wagons: food and tents; tools and rope; records and recovered fragments. He has also insisted that everyone carry enough to walk if the wagons are lost.","Ilyra places a rubbing from the cliff excavation beside the map. The same seven-spoked symbol appears in a monastery manuscript written two hundred years after the road was supposedly forgotten.","You can press for one more piece of information before the company disperses to make ready."],"choices":[["destination","Ask where Mara thinks the road leads","Conversation"],["rivals","Ask who else is trying to reach it","Conversation"],["danger","Ask what the oldest accounts warn about","Conversation"]]},"forge":{"title":"The Forge Before the Road","mission":"Prepare equipment before leaving Brackencliff.","text":["","Rowan refuses to sell miracles. He offers practical work: sharpen and service a weapon for the next hard miles, reforge a fighting edge for lasting offence, or reinforce fittings and guards for better defence.","The company has limited coin. Whoever spends here may carry the benefit for the rest of the journey."],"choices":[["service","Service your weapon or focus","2 Coin · +1 on your next 3 combat checks","coin",2],["reforge","Reforge for offence","5 Coin · permanent +1 on attack-oriented dangerous checks","coin",5],["reinforce","Reinforce for defence","5 Coin · permanent +1 on defence/endurance-oriented dangerous checks","coin",5],["leave","Leave the forge and join the expedition","Continue"]]},"cliff_excavation":{"title":"The First Exposed Mile","mission":"Study the Glass Road before the company commits to it.","text":["","At the excavation edge, a milestone rises from the glass itself. There are no letters on it — only seven shallow grooves, all pointing inland.","Farther down the slope, hoofprints stop at the road and begin again on the other side. The animals refused to step onto it."],"choices":[["study","Study the milestone and the warmth beneath it","Roll together · Knowledge or Awareness"],["test","Test the road physically before taking the wagons","Roll together · Craft or Endurance"],["walk","Walk the first hundred paces and judge by experience","No roll"]]},"first_mile":{"title":"The Road Under the Fields","mission":"Travel slowly enough to notice what the road is doing.","text":["For the first hour, the expedition moves through ordinary country. Sheep fields slope toward the sea. Stone walls divide farms that have stood longer than anyone can remember.","The strange thing is not what the road passes through. It is how cleanly it does so. Walls, drainage ditches and even an old burial mound were built over it, yet the black surface beneath remains unbroken.","Every few hundred paces the warmth underfoot increases, then fades again — almost like a pulse passing along the road."],"choices":[["pulse","Measure the repeating pulses","Quick roll · Craft or Knowledge"],["tracks","Look for signs that someone travelled ahead","Quick roll · Awareness or Survival"],["travel","Keep pace with the wagons and learn the road by walking it","Continue"]]},"farmstead":{"title":"The Last Farm","mission":"Learn what happened here before the road was uncovered.","text":["At midday the company reaches the last occupied farm before the western woodland. The farmer, Edda Varn, has tied strips of white cloth around every gatepost.","She says her cattle began refusing the lower pasture a week before the earthquake. Two nights ago her grandson saw lanterns moving along the buried line of the road — beneath the soil.","She does not want payment. She wants to know whether the expedition will come back if it discovers something dangerous."],"choices":[["promise","Promise Edda you will return with a warning if the road is dangerous","Conversation · relationship matters"],["question","Ask exactly what the boy saw","Conversation · clue"],["dismiss","Thank her but make no promise you may not be able to keep","Decision"]]},"woodland_edge":{"title":"Where the Old Maps End","mission":"Choose how the company will cross the first wild country.","text":["Beyond Edda's farm, the road enters the Greywood. The king's survey ends here because the old forest boundary was never worth contesting.","The Glass Road splits around a low range of wooded hills. One branch follows the River Tern through wet ground and old ferry country. The other climbs into dark pine where ruined watchtowers still appear on ancient maps.","Both branches bend toward the same place: a ruined bridge in the hills known simply as the Broken Bridge."],"choices":[["forest","Take the high pine road","Long route · ruins, height and old watch posts"],["river","Take the River Tern road","Long route · ferry country, floodplain and settlements"]]},"pine_road":{"title":"Under the High Pines","mission":"Follow the Glass Road where the forest has hidden it for centuries.","text":["The northern branch climbs steadily. Pines close above the road until afternoon becomes green twilight.","Here the glass is cracked for the first time. Hairline fractures run across it in star-shaped patterns, but none are deep enough to catch a boot.","Something has been placing small cairns beside the road. The newest stones are still damp with disturbed earth."],"choices":[["cairns","Examine the fresh cairns","Quick roll · Awareness or Knowledge"],["scout","Scout ahead above the road","Solo roll · Survival or Stealth"],["move","Keep the expedition together","Continue"]]},"charcoal_camp":{"title":"The Charcoal Burner's Camp","mission":"Decide whether a frightened stranger is a warning or a distraction.","text":["Smoke leads to a charcoal camp half a mile off the road. Its owner, Beren Quill, has not slept properly in two nights.","He says a well-dressed expedition passed yesterday: six riders, two pack horses and a man called Cassian Rook. They paid for water, asked about the Broken Bridge and laughed when Beren warned them about voices in the trees.","Before leaving, one of Rook's riders carved the seven-spoked road-mark into a pine."],"choices":[["talk","Ask Beren what the voices said","Conversation"],["mark","Study the symbol cut by Rook's people","Quick roll · Knowledge or Craft"],["move","Thank Beren and continue","Continue"]]},"stag_stones":{"title":"The Stag Stones","mission":"Understand why the road passes through a place everyone else avoids.","text":["Near dusk the pines open around a ring of standing stones. Deer skulls hang from old cords between them, all facing away from the road.","The Glass Road runs directly through the centre.","Ilyra stops walking. She says the eastern monasteries use the same arrangement around places considered 'open' — not sacred, not cursed, but open."],"choices":[["ilyra","Ask Ilyra what 'open' means","Conversation · important clue"],["inspect","Inspect the stones and road together","Roll together · Knowledge or Spirit"],["cross","Cross before dark and make camp beyond them","Continue"]]},"pine_camp":{"title":"Camp Above the Tern","mission":"Rest, compare what you have learned, and prepare for the ruined bridge ahead.","text":["The company camps on a shelf above the river valley. Far below, the southern branch of the Glass Road occasionally catches moonlight through the trees.","Someone on that lower route lights a signal fire. It might be another expedition. It might be travellers. It goes out after only three minutes.","For the first time since Brackencliff, everyone has time to eat, repair straps and talk without walking."],"choices":[["rest","Rest properly and refresh the company","Rest · Supplies -1 · Hope +1"],["watch","Keep watch on the distant signal","Quick roll · Awareness"],["gear","Maintain weapons and travelling gear","Quick roll · Craft"]]},"pine_descent":{"title":"The Long Descent","mission":"Reach the Broken Bridge without losing the wagons.","text":["Morning brings rain. The road descends sharply through switchbacks cut into black glass.","The surface is not slippery — but the mud and leaves on top of it are. One wagon begins to slide sideways toward the ravine.","Below, through rain, the Broken Bridge comes into view: an ancient bridge where half the central arch is missing."],"choices":[["wagon","Save the sliding wagon","Team roll · Strength / Craft / Agility"],["abandon","Cut the wagon loose and save the animals","Decision · lose supplies"]]},"river_road":{"title":"Along the River Tern","mission":"Follow the lower road without being trapped by the water.","text":["The southern branch stays close to the River Tern. Willow roots buckle the banks and floodwater has buried long stretches of the road under silt.","Yet whenever the company loses sight of the black glass, the river bends back toward it.","Fresh boot prints appear in the mud beside the road. They belong to more than one group."],"choices":[["tracks","Separate the sets of tracks","Quick roll · Survival or Awareness"],["ford","Test how deep the flooded road runs","Roll together · Survival or Craft"],["move","Keep to the river and continue","Continue"]]},"ferry_house":{"title":"The Empty Ferry House","mission":"Search an abandoned stop without losing too much daylight.","text":["An old ferry house stands beside a chain stretched across the river. The ferry itself is gone.","Inside are recent ashes, a broken wine bottle and a scrap of expensive blue cloth snagged on a nail.","Under the floorboards, someone has scratched a rough map of the Broken Bridge and marked a second route beneath it."],"choices":[["map","Recover and study the scratched map","Quick roll · Knowledge or Awareness"],["ashes","Work out who camped here","Quick roll · Awareness or Streetwise"],["leave","Leave before the river rises","Continue"]]},"drowned_marker":{"title":"The Drowned Marker","mission":"Reach a milestone standing in the river itself.","text":["The Glass Road disappears beneath brown water. Thirty paces out, the top of another milestone rises above the current.","The river flows around it strangely. A narrow line of perfectly still water extends from the marker toward the eastern bank.","Mara wants the inscription. Dain wants nobody swept away for a piece of stone."],"choices":[["reach","Reach the marker and make a rubbing","Roll together · Agility or Endurance"],["observe","Study it from shore and infer what you can","Quick roll · Awareness or Knowledge"],["leave","Do not risk anyone for it","Decision"]]},"river_hamlet":{"title":"Three Houses at Lowwater","mission":"Decide what to do with people who are already afraid of the road.","text":["By late afternoon the expedition reaches three cottages on a raised bank. The residents call the place Lowwater.","They say the Glass Road began humming two nights before the earthquake at Brackencliff, even though the road here was still buried.","One old woman insists a man in a red travelling coat paid her grandson to guide him to the Broken Bridge yesterday."],"choices":[["guide","Ask what the guide knew about the Span","Conversation"],["rook","Ask about the man in the red coat","Conversation · rival clue"],["trade","Trade for food and dry blankets","Spend 1 Coin · Supplies +1"]]},"river_camp":{"title":"Rain at Lowwater","mission":"Use the shelter before the final approach to the Broken Bridge.","text":["Rain turns the river road into a sheet of shallow water. The villagers offer a dry barn for the night.","The expedition could press on, but the Broken Bridge is less than two hours away and the river is still rising.","A safe night now may prevent a worse decision in darkness."],"choices":[["rest","Stay in the barn until dawn","Rest · Supplies -1 · Hope +1"],["listen","Spend the evening listening to local stories","Conversation · possible clue"],["push","Leave before the river rises further","Continue · Threat +1"]]},"river_exit":{"title":"The Flooded Approach","mission":"Reach the Broken Bridge through rising water.","text":["At dawn the Glass Road leaves the river and climbs toward the hills.","The final mile is underwater to the ankle, then the knee. The current is not dangerous yet, but the wagons are slowing.","Through mist, the broken bridge rises ahead."],"choices":[["cross","Bring the wagons through together","Team roll · Endurance / Strength / Survival"],["cache","Cache heavy supplies and move faster","Decision · Supplies -1 · safer approach"]]},"broken_span":{"title":"The Broken Bridge","mission":"Cross a bridge that should not still be standing.","text":["The two branches of the Glass Road reunite before an enormous bridge thrown across a gorge. Half the central arch collapsed centuries ago.","The strange part is what remains: a strip of black glass no wider than a dining table continues across open air where the stone bridge is gone.","On the far side, red-coated Cassian Rook and his expedition are already there. Between you and them, three pale shapes crawl up from beneath the bridge.","They look like hounds until their heads turn. Their bodies are made from layered translucent stone."],"choices":[["stand","Hold the bridge approach while the wagons withdraw","Begin battle"],["rush","Rush the glass causeway before the creatures fully climb","Risky opening"]]},"span_wave1":{"title":"Glass Hounds","mission":"Survive the first rush without being driven onto the broken edge.","text":["The first creature strikes like a thrown stone. Its claws ring against the road and leave white scratches in the glass.","Two more climb over the broken masonry. They do not roar. They make the same low tone the road has been making underfoot since Brackencliff.","The company needs space before it needs victory."],"choices":[["hold","Hold the first rush","Team roll · Strength / Agility / Spirit"]]},"span_choice":{"title":"The Bridge Wakes","mission":"Choose how to change the shape of the fight.","text":["The hounds retreat three paces at once — not frightened, but listening.","One of the seven grooves in the nearest milestone is now glowing. Across the gorge, Rook's people are shouting that the glass beneath them is warming.","You can fight the creatures, manipulate the milestone, or try to reach Rook while the hounds are distracted."],"choices":[["fight","Drive the hounds back by force","Team roll · risky"],["marker","Use the milestone to interrupt them","Roll together · Knowledge or Craft"],["rook","Reach Rook's expedition and combine forces","Roll together · Agility or Influence"]]},"span_final":{"title":"The Sound Beneath the Bridge","mission":"End the encounter before the road decides for you.","text":["The glowing groove brightens. Every hound freezes and turns toward the centre of the broken span.","The road emits a deep note. For one impossible instant, a second bridge appears beneath the missing arch — not solid, but visible like a memory.","The creatures are no longer watching the company. They are watching the road."],"choices":[["quiet","Lower weapons and follow the pattern","Quick roll · Spirit or Awareness"],["strike","Destroy the nearest hound before it moves again","Roll together · Strength or Agility"],["signal","Match the tone using Ilyra's translation and the milestone","Team roll · Knowledge / Spirit / Craft"]]},"after_span":{"title":"Two Expeditions, One Road","mission":"Decide how to deal with Cassian Rook now that both parties survived.","text":["On the far side, Cassian Rook removes his red travelling coat and wrings rain from it as though the last ten minutes were an inconvenience.","He is charming, well-funded and clearly angry that Mara reached the bridge with more people alive than he did.","He admits he knew the road was likely to reactivate. He refuses to say who told him — unless the company gives him something in return."],"choices":[["trade","Trade one clue for one clue","Conversation · mutual exchange"],["press","Press Rook for his source","Roll together · Influence or Awareness"],["refuse","Refuse to share information and part ways","Decision"]]},"hollowmere":{"title":"Hollowmere","mission":"Enter the last real town before the mountain crossing.","text":["Beyond the bridge, the Glass Road runs another six miles through pasture and abandoned orchards before reaching Hollowmere.","The town sits under the first mountain wall. Travellers traditionally stop here because the old king's road climbs into the pass beyond.","Tonight every inn is full. News of the Glass Road travelled faster than the expedition.","Rook's people are somewhere in town. So are merchants, soldiers, pilgrims and at least one scholar claiming the road belongs to the Crown.","For once, nobody is forcing the company onward. Hollowmere is a place to stop, gather rumours, repair equipment, search records — and leave for Crown Pass only when you decide you are ready."],"choices":[["inn","Go to the Lantern Inn and hear what the town knows","Conversation hub"],["forge","Visit Hollowmere's old mountain forge","Equipment upgrade"],["records","Visit the toll-house archive before it closes","Investigation"]]},"hollow_forge":{"title":"The Mountain Forge","mission":"Invest in the equipment that will carry you over the pass.","text":["Hollowmere's forge is older than Brackencliff's walls. Master Sella Vorr examines the scratches left by the glass hounds and immediately stops joking.","She says the damage is not ordinary impact. The hounds 'pulled' at the metal as if testing its shape.","Sella can service gear cheaply, reforge it for lasting offence, reinforce it for defence, or — if the company recovered road-metal — bind a small glass-road fragment into one hero's equipment."],"choices":[["service","Service your equipment","2 Coin · +1 next 3 combat checks","coin",2],["reforge","Reforge for offence","5 Coin · permanent attack +1","coin",5],["reinforce","Reinforce for defence","5 Coin · permanent defence +1","coin",5],["leave","Return to the expedition","Continue"]]},"hollow_inn":{"title":"The Lantern Inn","mission":"Choose which rumour is worth pursuing.","text":["The Lantern Inn is loud enough to hide a conspiracy and crowded enough to create one.","Dain finds a table against the wall. Mara spreads no maps this time. Ilyra listens to three conversations at once.","Three stories repeat around the room: bells heard from the mountain at dawn; a shepherd who saw lights moving beneath the pass; and a royal courier asking whether Rook has already crossed."],"choices":[["bells","Ask about the bells in the mountain","Conversation"],["lights","Ask about the lights beneath the pass","Conversation"],["courier","Find out who sent the royal courier","Conversation"]]},"hollow_records":{"title":"The Toll-House Archive","mission":"Find out what travellers once knew about the first crossing.","text":["The old toll-house is being used as a records office. Most ledgers concern sheep, salt and arguments over bridge fees.","Then Mara finds a book whose pages have been cut out in a neat rectangle.","The surviving index still lists the missing section: 'Road Closure — Eastern Delegation — Year of the White Summer.'"],"choices":[["index","Reconstruct what was removed from the index and surrounding pages","Roll together · Knowledge or Awareness"],["clerk","Persuade the clerk to say who accessed the book recently","Roll together · Influence or Awareness"],["leave","Take note of the missing record and return","Continue"]]},"mountain_departure":{"title":"Leaving Hollowmere","mission":"Choose whether to keep the company together for the first mountain crossing.","text":["At dawn, cloud sits low over the pass. The Glass Road climbs straight toward it.","An old watch station divides the approach. The upper road follows a ridge exposed to weather. A sealed passage beneath the station appears to follow the Glass Road through the mountain itself.","Both routes should meet beyond the first wall. The company may stay together — or split and compare what each route reveals."],"choices":[["ridge","Take the ridge together","Exposed route"],["tunnel","Take the hidden passage together","Underground route"],["split","Split into two groups","Two routes that reunite later"]]},"ridge1":{"title":"The Wind Stair","mission":"Climb above the cloud without losing the road.","text":["The ridge road becomes a staircase cut into black glass and pale granite.","Wind pushes hard enough to make conversation difficult. Far below, Hollowmere shrinks into a cluster of roofs.","Halfway up, the road leaves the mountain face for twenty paces and crosses empty air on a narrow glass shelf."],"choices":[["cross","Cross the exposed shelf together","Team roll · Agility / Endurance / Spirit"],["anchor","Rig a safety line before crossing","Roll together · Craft or Strength"]]},"ridge2":{"title":"The Bell Cairn","mission":"Understand a sound coming from inside the mountain.","text":["Above the cloud, the wind dies. A cairn stands beside the road with seven bronze bells hanging inside it.","No wind reaches them, yet the smallest bell rings every time the Glass Road pulses.","Scratched into the cairn is a sentence in three languages. Ilyra can read only the last words: '...before the second opening.'"],"choices":[["read","Reconstruct the warning","Roll together · Knowledge or Spirit"],["record","Record the pattern and keep moving","Quick roll · Awareness or Craft"]]},"ridge3":{"title":"The White Ledge","mission":"Reach the rendezvous before the weather closes.","text":["Snow begins without warning. The road remains warm enough to melt a black line through it.","Tracks appear ahead: Rook's expedition, moving fast.","One set suddenly leaves the road and ends at the cliff edge."],"choices":[["search","Search for the missing traveller","Roll together · Awareness or Survival"],["move","Keep to the road and make the rendezvous","Continue"]]},"tunnel1":{"title":"The Sealed Door","mission":"Enter a passage nobody has opened in living memory.","text":["Beneath the watch station, a seam in the mountain follows the exact width of the Glass Road.","Touching the seven-spoked mark causes the stone door to withdraw without dust or grinding.","Inside, the road continues under the mountain beside channels filled with faint blue light."],"choices":[["study","Study the mechanism before entering","Quick roll · Craft or Knowledge"],["enter","Enter before the door closes","Continue"]]},"tunnel2":{"title":"The Water Chambers","mission":"Cross a chamber where the road is doing something other than carrying travellers.","text":["The tunnel opens into a vast gallery. Water from the mountain flows across the Glass Road in dozens of narrow channels.","Where each channel crosses the road, the water warms and begins to steam.","Ancient valves stand along the wall. Several are turning by themselves."],"choices":[["valves","Work out what the valves control","Roll together · Craft or Knowledge"],["water","Follow the water and see where the heat goes","Quick roll · Awareness or Survival"],["move","Stay on the road and do not interfere","Continue"]]},"tunnel3":{"title":"The Closed Chamber","mission":"Pass a place the people who built the Road meant to keep sealed.","text":["The hidden passage narrows around a circular door made from dull silver metal.","The Glass Road does not pass through it. Instead, it bends around the chamber like a river around an island.","From behind the door comes one slow knock. Then another."],"choices":[["listen","Listen without opening the chamber","Quick roll · Spirit or Awareness"],["mark","Record the place and move on","Decision"],["open","Attempt to open the sealed chamber","Roll together · Craft or Strength · risky"]]},"pass_reunion":{"title":"The First Crossing","mission":"Reunite, compare what each route revealed, and reach the pass.","text":["The ridge and tunnel routes meet on a broad saddle between mountain walls.","Heroes who travelled separately return with different stories: bells above the clouds; water heated beneath the mountain; tracks vanishing at a cliff; a sealed chamber knocking in the dark.","Ahead, the Glass Road crosses the pass in a dead-straight line.","Then the clouds clear enough to show what lies beyond."],"choices":[["look","Step onto the high marker and see beyond the known maps","Continue"]]},"final_view":{"title":"Beyond the Known Maps","mission":"Decide what this first expedition will tell the world.","text":["East of the pass, the land falls away into a valley no modern map records.","At its centre stands the outline of a city — miles distant, roofless in places, but unmistakably inhabited by light. Seven towers answer one another in sequence.","The Glass Road beneath your feet warms. For the first time, the pulse does not pass under you and continue east.","It stops.","Then something in the distant city answers."],"choices":[["truth","Return to Hollowmere and report exactly what you found","Ending · truth before advantage"],["secret","Keep the city's existence within the expedition for now","Ending · protect the discovery"],["forward","Send a small advance party one mile farther before turning back","Ending · curiosity wins one more step"]]}};

// V1.2 workshop depth
// V1.2 settlement hub: Hollowmere can be explored instead of forcing one stop before departure.
scenes.hollowmere.choices.push(["depart","Leave Hollowmere for Crown Pass","Continue when the company is ready"]);
scenes.forge.choices.splice(3,0,["repair","Repair damaged equipment","1 Coin · restore full condition","coin",1]);
scenes.hollow_forge.choices.splice(3,0,["repair","Repair road-worn equipment","1 Coin · restore full condition","coin",1],["roadsteel","Bind the Glass Hound core into your equipment","4 Coin · unique +1 against Road constructs","item","glass_core"]);


// V1.3 finale: a final battle and an earned sacrifice decision.
Object.assign(scenes,{
  final_view:{title:'Beyond the Known Maps',mission:'Understand what has answered from beyond Crown Pass before deciding whether to approach it.',text:[
    'East of the pass, the land falls away into a valley no modern map records.',
    'At its centre stands the outline of a city — miles distant, roofless in places, but unmistakably inhabited by light. Seven towers answer one another in sequence.',
    'The Glass Road beneath your feet warms. For the first time, the pulse does not pass under you and continue east.',
    'It stops.',
    'Then something in the distant city answers — and a narrow bridge of black glass unfolds from the mountainside below you.'
  ],choices:[['study','Read the answering sequence before moving','Quick roll · Knowledge or Spirit'],['signal','Answer with the Bell Cairn pattern','Roll together · Knowledge or Spirit'],['advance','Approach the far tower carefully','Continue']]},
  receiver_threshold:{title:'Crossing to the Far Tower',mission:"Reach the far tower while the Road's guardians wake around you.",text:[
    'The new bridge is barely wide enough for four people abreast. It hangs over cloud, black glass lit from within by blue-white light.',
    'Halfway across, shapes rise from recesses in the bridge: not hounds this time, but tall jointed guardians built from glass and dark metal.',
    'Behind you, the bridge begins folding itself away from Crown Pass. Ahead, the far tower opens like an eye.',
    'There is no clean retreat. The company has to win enough ground to reach the tower before the bridge withdraws.'
  ],choices:[['hold','Hold back the guardians while everyone crosses','Team battle · risky'],['redirect',"Turn the Road's own signal against the guardians",'Roll together · Craft or Knowledge · risky']]},
  receiver_assault:{title:'The Last Twenty Paces',mission:'Reach the far tower before the bridge disappears.',text:[
    'The first wardens fall, but the Road reacts immediately. Light races beneath your feet and the far tower begins closing.',
    'A second wave steps out of the walls as the bridge fractures behind the company. Mara shouts that one tower is passing control of the Road to the next.',
    'Someone must keep the path stable long enough for the others to reach the far tower’s controls.'
  ],choices:[['push','Make the final push together','Team battle · risky'],['control','Reach the controls and force the tower to stay open','Roll together · Craft or Knowledge · risky']]},
  keeper_choice:{title:'Someone Must Keep the Road Open',mission:'Decide whether anyone should be left behind — or whether there is another way.',text:[
    'The far tower hums with living blue light. At its centre is a circular platform shaped for one person.',
    "Ilyra translates the inscription twice before she is willing to say it aloud: the crossing stays open only while one living person holds it steady. When everyone else passes, the tower closes around that person.",
    "Mara removes her gloves and steps toward the platform. ‘I brought you here. If this is the price, it is mine.’",
    "Dain catches her arm. ‘No. You brought us to the truth. That does not mean you own the cost.’",
    'For the first time since Brackencliff, nobody looks at the Road. Everyone looks at one another.'
  ],choices:[['hero','I will stay. Get the others across.','Sacrifice your hero for the company'],['pass','Ask the others — does someone else volunteer?','Pass the decision to the next hero'],['mara',"Accept Mara's offer",'Mara stays behind'],['dain','Let Dain take her place','Dain stays behind'],['rewrite','Use what you learned to pass the duty between you','Hidden solution · everyone may live','flag','keeper_solution'],['improvise','Try to force another solution from the tower','Very hard · Craft / Knowledge / Spirit'],['sever','Break the far tower instead','No sacrifice · the Road is severed'],['retreat','Refuse the sacrifice and retreat while you can','No sacrifice · accept failure']]}
});
Object.assign(sceneImages,{final_view:'assets/final_ai.webp',receiver_threshold:'assets/hq_under_mountain.webp',receiver_assault:'assets/hq_under_mountain.webp',keeper_choice:'assets/hq_under_mountain.webp'});
Object.assign(sceneArt,{receiver_threshold:['⚔','The bridge to the far tower'],receiver_assault:['⚔','The last twenty paces'],keeper_choice:['◈','Someone must keep the Road open']});

const worldMapConfig={"title":"The Glass Road — First Crossing","baseSvg":"<path class=\"map-road\" d=\"M7,66 C18,60 27,54 37,48 C49,42 57,40 67,34 C78,28 87,24 96,17\"/><path class=\"map-water\" d=\"M25,68 C34,58 39,55 43,46 C48,36 54,35 61,31\"/>","terrain":[{"type":"symbol","x":30,"y":35,"symbol":"♣"},{"type":"symbol","x":36,"y":31,"symbol":"♣"},{"type":"symbol","x":43,"y":33,"symbol":"♣"},{"type":"symbol","x":75,"y":22,"symbol":"▲"},{"type":"symbol","x":82,"y":18,"symbol":"▲"},{"type":"symbol","x":89,"y":15,"symbol":"▲"},{"type":"path","kind":"river","d":"M27,62 C37,57 41,52 47,46 C53,40 57,38 63,34"},{"type":"path","kind":"road","d":"M8,66 C24,59 36,50 49,44 C61,39 70,32 81,25 C87,21 92,19 97,17"}],"nodes":[{"id":"brackencliff","title":"Brackencliff","x":10,"y":66,"reveal":13,"scenes":["intro","briefing","forge","cliff_excavation","first_mile","farmstead"]},{"id":"greywood","title":"Greywood Fork","x":27,"y":52,"reveal":12,"scenes":["woodland_edge","pine_road","river_road"]},{"id":"pine","title":"High Pine Road","x":40,"y":34,"reveal":10,"scenes":["charcoal_camp","stag_stones","pine_camp","pine_descent"]},{"id":"river","title":"River Tern","x":42,"y":58,"reveal":10,"scenes":["ferry_house","drowned_marker","river_hamlet","river_camp","river_exit"]},{"id":"span","title":"Broken Bridge","x":61,"y":44,"reveal":13,"scenes":["broken_span","span_wave1","span_choice","span_final","after_span"]},{"id":"hollowmere","title":"Hollowmere","x":74,"y":36,"reveal":11,"scenes":["hollowmere","hollow_inn","hollow_forge","hollow_records"]},{"id":"pass","title":"Crown Pass","x":88,"y":20,"reveal":12,"scenes":["mountain_departure","ridge1","ridge2","ridge3","tunnel1","tunnel2","tunnel3","pass_reunion","final_view","receiver_threshold","receiver_assault","keeper_choice"]}]};

function requirementSatisfied(choice){
  const type=choice[3],value=choice[4],n=choice[5];if(!type)return true;
  if(type==='item')return state.items?.includes(value);
  if(type==='flag')return !!state.flags?.[value];
  if(type==='count')return (state.items||[]).filter(x=>x===value).length>=(n||1);
  if(type==='notFlag')return !state.flags?.[value];
  if(type==='coin')return Number(state.coin||0)>=Number(value||0);
  return true;
}
function renderInventory(){
  const box=$('inventory');if(!box)return;const items=state.items||[];const counts={};items.forEach(id=>counts[id]=(counts[id]||0)+1);
  if(!items.length){box.innerHTML='<div class="small muted">No special items yet. Things found early may matter much later.</div>';return;}
  box.innerHTML=Object.entries(counts).map(([id,count])=>{const it=state.itemCatalog?.[id]||{name:id,icon:'🎒',desc:''};return `<div class="inventory-item"><span class="inventory-icon">${it.icon}</span><div><b>${esc(it.name)}${count>1?' ×'+count:''}</b><div class="small muted">${esc(it.desc)}</div></div></div>`;}).join('');
  if(items.includes('healing_draught')&&state.players[state.activeIndex]?.id===me){box.innerHTML+=`<button id="useHeal" class="btn btn-ghost btn-small full" style="margin-top:8px">Use Healing Draught</button>`;setTimeout(()=>{if($('useHeal'))$('useHeal').onclick=()=>{const wounded=state.players.filter(p=>p.wounds>0);if(!wounded.length)return showConsequence('No wound to heal','Save the draught for later.','good');const name=prompt('Who should drink it? '+wounded.map(x=>x.name).join(', '),wounded[0].name);const t=wounded.find(x=>x.name.toLowerCase()===String(name||'').toLowerCase())||wounded[0];socket.emit('useHealingDraught',{playerId:t.id});};},0);}
}

function sceneJourneyNode(scene){for(const n of worldMapConfig.nodes){if((n.scenes||[]).includes(scene))return n.id;}return 'brackencliff';}
function journeyNodes(){const cur=sceneJourneyNode(state.scene);const visited=new Set(state.mapVisited||[]);return worldMapConfig.nodes.map(n=>({...n,icon:n.id==='pass'?'▲':n.id==='span'?'⚔':n.id==='river'?'≋':n.id==='pine'?'♣':'✦',discovered:(n.scenes||[]).some(s=>visited.has(s))||n.id===cur,current:n.id===cur}));}
function journeySummary(nodeId){
  const f=state.flags||{};
  const notes={
    brackencliff:'The Road emerged after the quake and the expedition chose what to learn before leaving.',
    greywood:'At the Greywood fork, the expedition committed to a real route through the first wild country.',
    pine:'High forest, warning stones and voices beside the Road.',
    river:'Flooded stations suggest the Road once managed water as well as travel.',
    span:f.road_answered?'The company deliberately made the Road answer at the Broken Bridge.':'The Glass Hounds revealed that the Road can command constructed guardians.',
    hollowmere:'The last town before Crown Pass — forge, rumours and missing records.',
    pass:'The First Crossing revealed a living system and lights beyond the modern maps.'
  };
  return notes[nodeId]||'';
}
function mapNodeForScene(scene){
  const cfg=worldMapConfig||{};const direct=cfg.sceneToNode?.[scene];if(direct)return cfg.nodes.find(n=>n.id===direct)||null;
  return cfg.nodes?.find(n=>(n.scenes||[]).includes(scene))||null;
}
function routeCoords(trail=[]){const out=[];for(const s of trail){const n=mapNodeForScene(s);if(n&&(!out.length||out[out.length-1].id!==n.id))out.push(n);}return out;}
const journalNodeHints={
  brackencliff:['continental_marks','dain_warning','forbidden_mark','network_theory','warm_road_warning','pulse_sequence','timed_pulse','rook_racing','warn_edda','underground_lights'],
  greywood:['watchtower_map','watchtower_tapping','watchtower_warning'],
  pine:['watchtower_map','watchtower_tapping','watchtower_warning'],
  river:['ferryman_note','submerged_landing','ferry_lantern_kept'],
  span:['road_answers','hounds_network','road_addresses'],
  hollowmere:['bell_mark_toll','records_removed','ledger_restored'],
  pass:['bell_pulse','bell_sequence','bell_reburied','second_opening','deliberate_severing']
};
function journeyNodeMemories(nodeId){
  const j=state?.journal||{},ids=new Set(journalNodeHints[nodeId]||[]),mem=[];
  for(const x of j.clues||[])if(ids.has(x.id))mem.push({kind:'Discovery',title:x.title,text:x.text});
  for(const x of j.decisions||[])if(ids.has(x.id))mem.push({kind:'Choice',title:x.title,text:x.text});
  for(const x of j.sideStories||[])if(x.nodeId===nodeId)mem.push({kind:'Lost Archive',title:x.title,text:`${x.hero||'The company'} chose “${x.choice}”. ${x.summary}`});
  return mem;
}
function openJourneyDetail(nodeId){
  const n=(worldMapConfig.nodes||[]).find(x=>x.id===nodeId);if(!n)return;
  const mem=journeyNodeMemories(nodeId);$('journeyDetailTitle').textContent=n.title;
  $('journeyDetailBody').innerHTML=`<div class="journey-memory-lead">${esc(journeySummary(nodeId))}</div>${mem.length?`<div class="journey-memory-list">${mem.map(m=>`<article class="memory-card"><div class="eyebrow">${esc(m.kind)}</div><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></article>`).join('')}</div>`:'<p class="small muted">No major memories have been recorded here yet.</p>'}`;
  $('journeyDetailModal').classList.remove('hidden');scheduleFullPageTranslation(30);
}
function closeJourneyDetail(){$('journeyDetailModal')?.classList.add('hidden');}
function renderJourney(){
  const box=$('journey');if(!box||!state)return;const cfg=worldMapConfig||{};const nodes=cfg.nodes||[];
  const visitedScenes=new Set(state.mapVisited||[]);for(const g of state.groups||[])for(const s of g.trail||[])visitedScenes.add(s);for(const h of state.routeHistory||[])for(const s of h.trail||[])visitedScenes.add(s);
  const visitedNodes=nodes.filter(n=>(n.scenes||[]).some(s=>visitedScenes.has(s))||[...(state.groups||[])].some(g=>routeCoords(g.trail).some(x=>x.id===n.id)));
  const holes=visitedNodes.map(n=>`<circle cx="${n.x}" cy="${n.y}" r="${n.reveal||14}" fill="black"/>`).join('');
  const history=(state.routeHistory||[]).map((g,i)=>{const pts=routeCoords(g.trail);return pts.length>1?`<polyline class="map-route map-route--history" points="${pts.map(n=>`${n.x},${n.y}`).join(' ')}"/>`:'';}).join('');
  const current=(state.groups||[]).map((g,i)=>{const pts=routeCoords(g.trail);if(!pts.length)return '';const line=pts.length>1?`<polyline class="map-route map-route--${i%2?'b':'a'}" points="${pts.map(n=>`${n.x},${n.y}`).join(' ')}"/>`:'';const last=pts[pts.length-1];return `${line}<circle class="map-current map-current--${i%2?'b':'a'}" cx="${last.x}" cy="${last.y}" r="2.4"/><text class="map-group-label" x="${Math.min(94,last.x+3)}" y="${Math.max(7,last.y-3)}">${esc(g.name||'Company')}</text>`;}).join('');
  const labels=visitedNodes.map(n=>`<g class="map-place map-place--clickable" data-map-node="${n.id}"><circle cx="${n.x}" cy="${n.y}" r="2.2"/><text x="${Math.min(92,n.x+2.5)}" y="${Math.max(6,n.y-2)}">${esc(n.title)}</text></g>`).join('');
  const terrain=(cfg.terrain||[]).map(x=>x.type==='path'?`<path class="map-terrain map-terrain--${x.kind||'ridge'}" d="${x.d}"/>`:`<text class="map-symbol" x="${x.x}" y="${x.y}">${x.symbol||'▲'}</text>`).join('');
  box.innerHTML=`<div class="world-map"><div class="world-map__title">${esc(cfg.title||'Journey So Far')}</div><svg viewBox="0 0 100 72" role="img" aria-label="Explored map"><defs><mask id="fogMask"><rect width="100" height="72" fill="white"/>${holes}</mask><filter id="fogBlur"><feGaussianBlur stdDeviation="1.5"/></filter></defs><rect class="map-paper" width="100" height="72" rx="2"/>${cfg.baseSvg||''}${terrain}${history}${current}${labels}<rect class="map-fog" x="0" y="0" width="100" height="72" mask="url(#fogMask)" filter="url(#fogBlur)"/><rect class="map-edge" x=".7" y=".7" width="98.6" height="70.6" rx="2"/></svg><div class="world-map__legend">Explored ground is uncovered. Click a named place to revisit what happened there.${(state.groups||[]).length>1?' Your separated groups leave different trails.':''}</div></div>`;box.querySelectorAll('[data-map-node]').forEach(el=>el.addEventListener('click',()=>openJourneyDetail(el.dataset.mapNode)));
}
function npcForScene(scene){
  if(scene==='farmstead')return 'Edda';
  if(scene==='charcoal_camp')return 'Beren';
  if(scene==='hollow_inn')return 'Innkeeper';
  if(scene==='hollow_records')return 'Clerk';
  if(scene==='river_hamlet')return 'Elder';
  if(scene==='ridge3')return 'Scout';
  if(['intro','briefing','cliff_excavation','first_mile','final_view','receiver_threshold','receiver_assault','keeper_choice'].includes(scene))return 'Mara';
  if(['woodland_edge','pine_descent','river_exit','mountain_departure'].includes(scene))return 'Dain';
  if(['stag_stones','span_choice','ridge2','tunnel2','pass_reunion'].includes(scene))return 'Ilyra';
  if(['broken_span','after_span'].includes(scene))return 'Rook';
  if(scene==='forge')return 'Rowan';
  if(scene==='hollow_forge')return 'Sella';
  return null;
}
function npcMomentText(key,scene){
  const lines={
    Mara:'“A blank map is not ignorance. It is an honest invitation to find out.”',
    Dain:'“The road is only half the journey. Watch the people who decide what it means.”',
    Ilyra:'“Old warnings survive because someone was frightened enough to copy them.”',
    Rook:'“Discovery belongs to whoever reaches it first — until somebody stronger disagrees.”',
    Rowan:'“Good steel will not solve a bad decision, but it may let you survive one.”',
    Sella:'“Mountain work is not decoration. Choose what you need the equipment to do.”'
  };return lines[key]||'';
}
function renderNpcMoment(scene){const box=$('npcMoment'),key=npcForScene(scene);if(!box)return;if(!key){box.classList.add('hidden');box.innerHTML='';return;}const n=npcInfo[key],rel=state?.journal?.people?.[String(key).toLowerCase()]||null;const memory=rel?.status?`<div class="npc-memory"><b>They remember you:</b> ${esc(rel.status)}${rel.note?' — '+esc(rel.note):''}</div>`:'';box.innerHTML=`<img src="${n.img}" alt="${esc(n.name)}"><div><div class="eyebrow">${esc(n.tag)}</div><h3>${esc(n.name)}</h3><p>${esc(npcMomentText(key,scene))}</p>${memory}</div>`;box.classList.remove('hidden');}
function finaleCallbackCards(){const a=state.allies||{},f=state.flags||{},items=state.items||[],cards=[];
  if(a.edda)cards.push(['⌂','Because you made a promise at the last farm','The expedition has someone waiting for an honest warning on the return journey.']);
  if(f.road_network)cards.push(['✧','Because you connected the early clues','The Road is no longer a single mystery path; you now know many distant routes were once joined together.']);
  if(f.road_infrastructure)cards.push(['≋','Because you studied what the Road carries','The company knows the Road carried heat and water as well as travellers.']);
  if(a.rook||f.rook_cooperated)cards.push(['◆','Because you cooperated with Rook','Your rival has become part of the story rather than a distant competitor.']);
  if(f.severed_on_purpose)cards.push(['⚑','Because you reconstructed the closure','You know the eastern connection was severed deliberately.']);
  if(items.includes('glass_core')||items.includes('sealed_token'))cards.push(['◇','Because you carried something impossible out','The return expedition has physical evidence no court can dismiss.']);
  return cards.slice(0,6);
}
function reactiveMemoryCards(scene){const f=state?.flags||{},cards=[],p=player(),rep=earnedReputationTitle(p);if(rep&&['farmstead','broken_span','hollowmere','pass_reunion'].includes(scene))cards.push([rep.icon,`${p.name} is becoming known as ${rep.title}`,`The company has begun to expect ${p.name} to act in this role. Later checks and the ending remember it.`]);if(scene==='broken_span'&&state?.allies?.edda)cards.push(['🌾','A promise from the last farm','You promised Edda Varn that discovery would not matter more than warning the people who live beside the Road.']);if(scene==='after_span'&&f.road_answered)cards.push(['◈','You made the Road answer','This was not passive discovery: the party deliberately sent a signal into the network.']);if(scene==='hollowmere'&&(state?.items||[]).includes('glass_core'))cards.push(['⚒','The Hound Core can become equipment','Master Sella can bind the recovered core into one hero’s weapon or focus.']);if(scene==='mountain_departure'&&f.severed_on_purpose)cards.push(['✂','The crossing was severed deliberately','The mountain is now the site of an old decision, not merely an obstacle.']);if(scene==='pass_reunion'&&f.road_listens)cards.push(['✧','The Road responds','Milestones, guardians and hidden doors now seem to be parts of the same responsive Road.']);return cards;}
function renderFinaleCallbacks(scene){const box=$('callbackPanel');if(!box)return;let cards=reactiveMemoryCards(scene);if(['pass_reunion','final_view','receiver_threshold','receiver_assault','keeper_choice'].includes(scene))cards=[...cards,...finaleCallbackCards()];if(!cards.length){box.classList.add('hidden');box.innerHTML='';return;}box.innerHTML=`<div class="eyebrow">THE JOURNEY REMEMBERS</div><div class="callback-grid">${cards.map(c=>`<div class="callback-card"><span>${c[0]}</span><div><b>${esc(c[1])}</b><p>${esc(c[2])}</p></div></div>`).join('')}</div>`;box.classList.remove('hidden');}
function openingHeroDescription(p){
  const cls=p?.cls||'Adventurer', bg=p?.background||'Outlander';
  const stats=Object.entries(p?.stats||{}).sort((a,b)=>b[1]-a[1]);
  const first=stats[0]?.[0]||'instinct', second=stats[1]?.[0]||'nerve';
  const classLine={
    Knight:'A steady protector who tends to put themselves between danger and the rest of the company.',
    Ranger:'A watchful traveller who reads terrain, tracks and changing weather before most people notice them.',
    Thief:'A quick, observant problem-solver who notices openings, hidden routes and motives others miss.',
    Mage:'A patient student of patterns and old powers, drawn to questions that do not yet have sensible answers.',
    Monk:'A calm presence with a strong instinct for people, fear and the unseen weight carried into a journey.',
    Engineer:'A practical thinker who looks at strange mechanisms and immediately wonders how they were built.'
  }[cls]||'An experienced traveller bringing a different way of seeing the road.';
  const bgLine={
    Noble:'Their upbringing taught them to read status, obligation and the consequences of public choices.',
    Outlander:'They are comfortable beyond settled roads and trust hard-won instinct over tidy maps.',
    Scholar:'They have learned to look for what old records omit as carefully as what they preserve.',
    Sailor:'Weather, distance and the behaviour of a travelling company are second nature to them.',
    Streetwise:'They know that people reveal themselves through small bargains, silences and who controls the exits.',
    Artisan:'They notice workmanship, wear and practical details that other travellers overlook.'
  }[bg]||'They bring experience that does not fit neatly onto Mara’s maps.';
  return `${classLine} ${bgLine} Their strongest abilities are ${first} ${stats[0]?.[1]??0} and ${second} ${stats[1]?.[1]??0}.`;
}

function openingCompanyHtml(){
  const people=(state?.players||[]);
  if(!people.length)return '';
  return `<div class="opening-company"><div class="eyebrow">YOUR COMPANY</div><h3>The people taking the First Crossing</h3><p class="opening-company__lead">Mara has chosen this company because the Glass Road is an unknown problem: every hero brings a different way of seeing it.</p><div class="opening-company__grid">${people.map(p=>`<div class="opening-hero"><img src="${portraitPath(p.cls,p.portrait)}" onerror="${portraitError(p.cls)}" alt="${esc(p.name)}"><div><b>${esc(p.name)}</b><span>${esc(p.cls)} · ${esc(p.background||'Outlander')}</span><p>${esc(openingHeroDescription(p))}</p></div></div>`).join('')}</div></div>`;
}


function journalQuestions(){
  const f=state?.flags||{},q=[];
  if(!f.road_network)q.push('Was the Glass Road built to reach one place, or to connect many?');
  if(!f.road_infrastructure)q.push('What besides travellers moved through the Road?');
  if(!f.severed_on_purpose&&state?.chapter>=3)q.push('Why was the eastern crossing deliberately closed?');
  if(!state?.finalChoice)q.push(state?.scene==='keeper_choice'?'Can the Road be held without leaving someone behind?':'Who is answering from beyond Crown Pass?');
  return q.slice(0,5);
}
function battleState(scene){
  const f=state?.flags||{};
  const stages={broken_span:1,span_wave1:1,span_choice:2,span_final:3};
  if(stages[scene]){const stage=stages[scene];return {title:`Broken Bridge · Stage ${stage}/3`,items:[['Company line',f.span_line_held?'steady':'under pressure'],['Road signal',f.marker_control||f.road_answered?'understood':'unknown'],['Glass hounds',f.spared_hounds?'released':f.fought_hounds?'engaged':'active']]};}
  const finale={receiver_threshold:1,receiver_assault:2};
  if(finale[scene])return {title:`Far Bridge · Stage ${finale[scene]}/2`,items:[['Bridge',f.receiver_line?'held':'closing'],['Guardians',f.receiver_redirect?'confused':'active'],['Far tower',f.receiver_open?'within reach':'closing']]};
  return null;
}
const restScenes=new Set(['forge','pine_camp','river_camp','hollow_forge']);
function sceneKind(scene){
  if(restScenes.has(scene))return ['REST / PREP','rest'];
  if(battleState(scene))return ['BATTLE','battle'];
  if(/briefing|farmstead|charcoal|after_span|hollow|inn|records/.test(scene))return ['CONVERSATION','conversation'];
  if(/road|woodland|pine|river|ferry|marker|span|mountain|ridge|tunnel|pass|cliff/.test(scene))return ['EXPLORATION','exploration'];
  return ['STORY','story'];
}
function passiveInsight(scene,p){
  if(!p)return '';
  const bg=p.background||'Outlander';
  if(scene==='intro'&&p.cls==='Engineer')return `${p.name} can already tell the black surface was not laid like ordinary roadstone.`;
  if(scene==='intro'&&p.cls==='Ranger')return `${p.name} notices the gulls are circling inland, away from the sea and toward the newly exposed Road.`;
  if(scene==='farmstead'&&bg==='Outlander')return `${p.name} trusts the animals' behaviour: something changed here before the earthquake.`;
  if(scene==='broken_span'&&p.cls==='Knight')return `${p.name} sees the bridge as a battlefield immediately: one narrow line, no room to scatter.`;
  if(scene==='span_choice'&&p.cls==='Mage')return `${p.name} notices the hounds move a fraction after the milestone brightens.`;
  if(scene==='hollow_records'&&bg==='Scholar')return `${p.name} knows missing pages can often be reconstructed from indexes, citations and neighbouring entries.`;
  if(scene==='tunnel2'&&p.cls==='Engineer')return `${p.name} recognises that the Road was built to carry water and heat as well as travellers.`;
  if(scene==='keeper_choice'&&p.cls==='Monk')return `${p.name} hears the inscription differently: it describes a duty, not a death sentence. Ancient systems can be obeyed — or reinterpreted.`;
  if(scene==='keeper_choice'&&p.cls==='Engineer')return `${p.name} sees more than one way to pass control. The builders expected failure and left another path.`;
  return '';
}
function itemCallback(scene){
  const items=state?.items||[];
  const checks=[
    ['span_choice','road_shard','The warm Road Shard may help compare the milestone’s pulse with a piece broken from the Road itself.'],
    ['hollow_forge','glass_core','Sella Vorr will immediately recognise that the Glass Hound Core is not ordinary stone.'],
    ['mountain_departure','marker_rubbing','The Drowned Marker Rubbing may help Ilyra compare the mountain symbols with the markings by the River Tern.'],
    ['pass_reunion','sealed_token','The Sealed Chamber Token is still warm — even here, miles from the chamber.']
  ];
  for(const [s,id,text] of checks)if(scene===s&&items.includes(id))return text;
  return '';
}
function renderQualityPanels(scene){
  const [label,kind]=sceneKind(scene),badge=$('sceneKindBadge');
  if(badge){badge.textContent=label;badge.className=`scene-kind ${kind}`;}
  const pi=$('passiveInsight'),ins=passiveInsight(scene,player());
  if(pi){pi.classList.toggle('hidden',!ins);pi.innerHTML=ins?`<b>Character instinct:</b> ${esc(ins)}`:'';}
  const ic=$('itemCallback'),item=itemCallback(scene);
  if(ic){ic.classList.toggle('hidden',!item);ic.innerHTML=item?`<b>Something you carry may matter:</b> ${esc(item)}`:'';}
  const bs=$('battleState'),b=battleState(scene);
  if(bs){bs.classList.toggle('hidden',!b);bs.innerHTML=b?`<div class="battle-title">${esc(b.title)}</div><div class="battle-track">${b.items.map(x=>`<span><b>${esc(x[0])}</b>${esc(x[1])}</span>`).join('')}</div>`:'';}
  document.body.classList.toggle('threat-high',(state?.threat||0)>=5);
  document.body.classList.toggle('hope-low',(state?.hope||0)<=1);
  document.body.classList.toggle('supplies-empty',(state?.supplies||0)===0);
}
function renderRecap(){const b=$('recapBody');if(!b||!state)return;const j=state.journal||{people:{},clues:[],decisions:[],conclusions:[]},qs=journalQuestions(),events=(state.log||[]).slice(-8).reverse();b.innerHTML=`<div class="recap-grid"><section><div class="eyebrow">WHERE YOU ARE</div><h3>${esc(scenes[state.scene]?.title||'Current scene')}</h3><p>${esc(scenes[state.scene]?.mission||'')}</p></section><section><div class="eyebrow">RECENTLY</div>${events.length?events.map(x=>`<div class="recap-event">${esc(x)}</div>`).join(''):'<p class="muted">The journey has only just begun.</p>'}</section><section><div class="eyebrow">UNANSWERED QUESTIONS</div>${qs.length?qs.map(x=>`<div class="recap-question">? ${esc(x)}</div>`).join(''):'<p class="muted">The biggest questions have been answered.</p>'}</section><section><div class="eyebrow">KEY DECISIONS</div>${(j.decisions||[]).slice(-5).map(x=>`<div class="recap-event"><b>${esc(x.title)}</b><br>${esc(x.text)}</div>`).join('')||'<p class="muted">No major decision has been recorded yet.</p>'}</section></div>`;}
function openRecap(){renderRecap();$('recapModal')?.classList.remove('hidden');}function closeRecap(){$('recapModal')?.classList.add('hidden');}if($('recapBtn'))$('recapBtn').onclick=openRecap;if($('sessionRecapBtn'))$('sessionRecapBtn').onclick=openRecap;if($('recapClose'))$('recapClose').onclick=closeRecap;if($('recapModal'))$('recapModal').addEventListener('click',e=>{if(e.target===$('recapModal'))closeRecap();});
function duckAmbience(){if(!ambientMaster)return;const anyone=localSpeaking||[...voiceSpeaking.values()].some(Boolean);try{const ctx=playSound.ctx;if(ctx)ambientMaster.gain.setTargetAtTime(anyone?.18:.62,ctx.currentTime,.08);else ambientMaster.gain.value=anyone?.18:.62;}catch{}}

function renderGame(){
  show('game');const sc=scenes[state.scene]||{title:'Journey continues',mission:'This route is still active. Your progress is safe.',text:['The game is recovering this part of the journey. If the choices do not return, refresh this tab and you will rejoin at the latest saved point.'],choices:[]};updateAmbience(state.scene);renderVoiceUi();syncVoicePeers();
  if(lastRenderedScene!==state.scene){const artBox=$('sceneArt');if(artBox){artBox.classList.remove('scene-enter');void artBox.offsetWidth;artBox.classList.add('scene-enter');}const story=document.querySelector('.story-panel');if(story){story.classList.remove('story-step');void story.offsetWidth;story.classList.add('story-step');}lastRenderedScene=state.scene;}
  $('sceneTitle').textContent=sc.title;$('sceneTitle').dataset.translateSource=sc.title;$('sceneText').innerHTML=sc.text.map(x=>`<p>${x}</p>`).join('')+(state.scene==='intro'?openingCompanyHtml():'');$('mission').textContent=sc.mission;$('mission').dataset.translateSource=sc.mission;const bridge=$('storyBridge');if(bridge){if(pendingStoryBridge&&pendingStoryBridge.scene===state.scene){bridge.innerHTML=`<p>${esc(pendingStoryBridge.text)}</p>`;bridge.classList.remove('hidden');}else bridge.classList.add('hidden');}
  const art=sceneArt[state.scene]||['🧭',sc.title],image=sceneImages[state.scene]||'assets/glass_home.svg',loopImage=sceneLoops[state.scene]||'';const [icon,caption]=art;const artBox=$('sceneArt'),media=$('sceneArtMedia');artBox.className=`scene-art ${state.scene} ${sceneMotionClass(state.scene)} ${sceneAtmosClass(state.scene)} ${loopImage?'has-media':''}`;artBox.style.backgroundImage=`linear-gradient(0deg,rgba(5,10,18,.76),rgba(5,10,18,.08)),url('${image}')`;if(media){if(loopImage){if(media.getAttribute('src')!==loopImage)media.setAttribute('src',loopImage);media.classList.remove('hidden');}else{media.classList.add('hidden');media.removeAttribute('src');}}artBox.querySelector('.scene-art__icon').textContent=icon;artBox.querySelector('.scene-art__caption').textContent=caption;renderNpcMoment(state.scene);renderFinaleCallbacks(state.scene);renderQualityPanels(state.scene);scheduleFullPageTranslation(100);
  $('round').textContent=state.round;$('hope').textContent=state.hope;$('threat').textContent=state.threat;$('supplies').textContent=state.supplies;$('relics').textContent=state.relics;if($('coin'))$('coin').textContent=state.coin??0;if($('pressureNote')){$('pressureNote').textContent=threatStatusText(state.threat);$('pressureNote').className='pressure-note '+(state.threat>=5?'high':state.threat>=3?'mid':'low');}
  const active=state.players[state.activeIndex],mine=active?.id===me,waiting=(state.groups||[]).find(g=>g.id===state.currentGroupId)?.waitingMerge;renderLostArchive(mine);$('turnNotice').className='turn-notice'+(mine?' mine':'');$('turnNotice').innerHTML=waiting?`<b>${esc(state.currentGroupName||'Your group')} has reached the rendezvous.</b> The other group is still on its route.`:mine?`<b>Your turn, ${esc(active.name)}.</b> Choose what your hero does next.${state.groups?.length>1?` <span class="group-badge">${esc(state.currentGroupName)}</span>`:''}`:`Waiting for <b>${esc(active?.name||'')}</b>${state.groups?.length>1?` · ${esc((state.groups||[]).find(g=>(g.playerIds||[]).includes(active?.id))?.name||'another group')}`:''}.`;
  $('choices').innerHTML=''; if(!state.pending){sc.choices.forEach(choice=>{const [id,label,note]=choice;let available=requirementSatisfied(choice);if(id==='repair'&&Number(player()?.gearUpgrades?.condition??3)>=(player()?.gearUpgrades?.maxCondition||3))available=false;if(id==='roadsteel'&&(player()?.gearUpgrades?.roadsteel||Number(state.coin||0)<4))available=false;const b=document.createElement('button');b.className='choice';b.disabled=!mine||!available;b.innerHTML=`<b>${label}</b><span>${note}${available?'':' · NOT CURRENTLY AVAILABLE'}</span>`;b.onclick=()=>socket.emit('chooseAction',{action:id});$('choices').appendChild(b);});}
  if(currentLanguage!=='en')setTimeout(translateCurrentStory,0);
  renderChallenge(mine);renderHostTools();renderInventory();renderJourney();$('party').innerHTML=state.players.map(p=>playerCard(p,true)).join('');$('log').innerHTML=state.log.slice().reverse().map(x=>`<div class="log-item">• ${esc(x)}</div>`).join('');renderLastRoll();
}

function renderLostArchive(mine){
  const box=$('lostArchiveCard');if(!box)return;const st=state?.lostArchive;
  if(!st){box.classList.add('hidden');box.innerHTML='';return;}
  box.innerHTML=`<div class="lost-archive-mark">✦</div><div><div class="eyebrow">LOST ARCHIVE · OPTIONAL</div><h3>${esc(st.title)}</h3><p>${esc(st.teaser)}</p></div><button id="openLostArchive" class="btn btn-ghost btn-small" type="button" ${mine&&!state.pending?'':'disabled'}>Explore side story</button>`;
  box.classList.remove('hidden');const btn=$('openLostArchive');if(btn)btn.onclick=openLostArchive;
}
function openLostArchive(){
  const st=state?.lostArchive;if(!st)return;
  $('lostArchiveTitle').textContent=st.title;
  $('lostArchiveBody').innerHTML=`<p class="lost-archive-intro">${esc(st.body)}</p><div class="lost-archive-choices">${st.choices.map(c=>`<button class="choice lost-archive-choice" type="button" data-choice="${c.id}"><b>${esc(c.label)}</b><span>${esc(c.note)}</span></button>`).join('')}</div><p class="small muted">This is optional. Resolving it does not replace the main story choice.</p>`;
  $('lostArchiveModal').classList.remove('hidden');$('lostArchiveBody').querySelectorAll('[data-choice]').forEach(b=>b.onclick=()=>{b.disabled=true;socket.emit('resolveLostArchive',{storyId:st.id,choiceId:b.dataset.choice});});scheduleFullPageTranslation(30);
}
function closeLostArchive(){$('lostArchiveModal')?.classList.add('hidden');}
function storyMemoryCards(){
  const j=state?.journal||{},cards=[];
  for(const x of j.sideStories||[])cards.push({kicker:'LOST ARCHIVE',title:x.title,text:`${x.hero||'The company'} chose “${x.choice}”. ${x.summary}`});
  if(state?.flags?.road_network)cards.push({kicker:'BIG DISCOVERY',title:'The Glass Road was a network',text:'The company connected enough evidence to realise this was never one road to one destination.'});
  if(state?.flags?.road_infrastructure)cards.push({kicker:'BIG DISCOVERY',title:'The Road served whole settlements',text:'Water, warmth and signals once moved through the old system as well as travellers.'});
  if(state?.flags?.road_listens)cards.push({kicker:'BIG DISCOVERY',title:'The Road answers instructions',text:'Milestones, guardians and doors all react to repeated signals.'});
  return cards.slice(-8).reverse();
}
function storySoFarText(){
  const visited=new Set(state?.mapVisited||[]),names=(worldMapConfig.nodes||[]).filter(n=>(n.scenes||[]).some(s=>visited.has(s))).map(n=>n.title);
  if(!names.length)return 'The First Crossing has only just begun.';
  const side=(state?.journal?.sideStories||[]).length;return `The company has reached ${names.join(', ')}.${side?` Along the way you explored ${side} optional side stor${side===1?'y':'ies'} that now belong to your version of the journey.`:''}`;
}
function renderJournal(){const j=state?.journal||{people:{},clues:[],decisions:[],conclusions:[],sideStories:[]},body=$('journalBody');if(!body)return;const people=Object.values(j.people||{}),clues=j.clues||[],decisions=j.decisions||[],conclusions=j.conclusions||[],questions=journalQuestions(),memories=storyMemoryCards();body.innerHTML=`<div class="journal-story-so-far"><div class="eyebrow">STORY SO FAR</div><h3>Your First Crossing</h3><p>${esc(storySoFarText())}</p></div>${memories.length?`<div class="memory-card-grid">${memories.map(m=>`<article class="memory-card"><div class="eyebrow">${esc(m.kicker)}</div><h3>${esc(m.title)}</h3><p>${esc(m.text)}</p></article>`).join('')}</div>`:''}<div class="journal-grid"><section><div class="eyebrow">PEOPLE</div>${people.length?people.map(p=>`<div class="journal-entry"><b>${esc(p.name||p.id)}</b>${p.status?`<span class="journal-status">${esc(p.status)}</span>`:''}<p>${esc(p.note||'You have crossed paths.')}</p></div>`).join(''):'<p class="small muted">Important relationships will appear here.</p>'}</section><section><div class="eyebrow">DISCOVERIES</div>${conclusions.map(x=>`<div class="journal-entry conclusion"><b>✦ ${esc(x.title)}</b><p>${esc(x.text)}</p></div>`).join('')}${clues.length?clues.map(x=>`<div class="journal-entry"><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div>`).join(''):'<p class="small muted">Useful information will be recorded here.</p>'}</section><section><div class="eyebrow">CHOICES & QUESTIONS</div>${decisions.length?decisions.map(x=>`<div class="journal-entry"><b>${esc(x.title)}</b><p>${esc(x.text)}</p></div>`).join(''):'<p class="small muted">Major choices will be remembered here.</p>'}${questions.length?questions.map(x=>`<div class="journal-entry question"><b>? ${esc(x)}</b></div>`).join(''):'<p class="small muted">Nothing obvious remains unanswered.</p>'}</section></div>`;scheduleFullPageTranslation(30);}
function openJournal(){renderJournal();$('journalModal')?.classList.remove('hidden');}
function closeJournal(){$('journalModal')?.classList.add('hidden');}
if($('lostArchiveClose'))$('lostArchiveClose').onclick=closeLostArchive;if($('lostArchiveModal'))$('lostArchiveModal').addEventListener('click',e=>{if(e.target===$('lostArchiveModal'))closeLostArchive();});if($('journeyDetailClose'))$('journeyDetailClose').onclick=closeJourneyDetail;if($('journeyDetailModal'))$('journeyDetailModal').addEventListener('click',e=>{if(e.target===$('journeyDetailModal'))closeJourneyDetail();});
if($('journalBtn'))$('journalBtn').onclick=openJournal;if($('journalClose'))$('journalClose').onclick=closeJournal;if($('journalModal'))$('journalModal').addEventListener('click',e=>{if(e.target===$('journalModal'))closeJournal();});

function renderHeroSheet(){
  const p=player(); if(!p)return;
  const body=$('heroSheetBody');
  const unspent=p.skillPoints||0;
  body.innerHTML=`
    <div class="hero-sheet-summary">
      <img class="hero-sheet-portrait" src="${portraitPath(p.cls,p.portrait)}" onerror="${portraitError(p.cls)}" alt="${p.cls} portrait">
      <div><h3>${classInfo[p.cls].icon} ${esc(p.name)} — ${p.cls}</h3><p>${esc(classInfo[p.cls].gift)}</p><p class="small muted"><b>${esc(p.background||'Outlander')} background:</b> ${esc(backgrounds[p.background||'Outlander']?.text||'')} · Edge: +1 ${esc(backgrounds[p.background||'Outlander']?.edge||'Survival')}</p><div class="hero-sheet-chips"><span>Wounds ${p.wounds}/3</span><span>Growth ${p.growth}/5</span><span>${unspent} Skill Point${unspent===1?'':'s'} available</span>${p.talent?`<span>Talent: ${esc(p.talent)}</span>`:''}</div></div>
    </div>
    <div class="hero-sheet-section"><div class="section-heading"><div><div class="eyebrow">SKILLS</div><h3>Current abilities</h3></div><div class="small muted">Starting cap 5 · Campaign cap 7</div></div>
      <div class="hero-skill-grid">${skills.map(sk=>`<div class="hero-skill"><span>${classInfo[p.cls].fav.includes(sk)?'★ ':''}${sk}</span><strong>${p.stats[sk]}</strong>${unspent>0&&p.stats[sk]<7?`<button class="btn btn-primary btn-small grow-skill" data-skill="${sk}">+1</button>`:''}</div>`).join('')}</div>
      ${unspent?'<p class="growth-help">Choose where to spend your earned Skill Point. The choice is permanent for this campaign.</p>':'<p class="small muted">Participating in challenges earns Growth. Every 5 Growth becomes one Skill Point you can allocate here.</p>'}
    </div>
    ${!p.talent&&Object.values(p.stats||{}).some(v=>v>=6)?`<div class="hero-sheet-section talent-choice"><div class="eyebrow">ADVANCED PATH UNLOCKED</div><h3>Choose one permanent talent</h3><p class="small muted">Reaching 6 in a skill marks a turning point for your hero.</p><div id="talentChoices"></div></div>`:''}
    <div class="hero-sheet-section"><div class="eyebrow">EQUIPMENT & IDENTITY</div>${earnedReputationTitle(p)?`<div class="earned-title"><span>${earnedReputationTitle(p).icon}</span><div><b>${esc(earnedReputationTitle(p).title)}</b><small>Earned through repeated choices and successful actions — not selected at character creation.</small></div></div>`:''}<p><b>Equipment:</b> ${esc(p.gear||'None')}</p><div class="condition-meter"><span>Condition</span><div class="condition-track"><i style="width:${Math.max(0,Math.min(100,(Number(p.gearUpgrades?.condition??3)/Number(p.gearUpgrades?.maxCondition||3))*100))}%"></i></div><b>${esc(gearConditionText(p))}</b></div>${Number(p.gearUpgrades?.condition??3)<=0?`<div class="gear-warning">Your equipment is damaged. Reforge/service bonuses are offline until a blacksmith repairs it.</div>`:''}<p><b>Upgrades:</b> ${esc((p.gearUpgrades?.labels||[]).slice(-5).join(' · ')||'None yet')}</p>${p.gearUpgrades?.roadsteel?`<p class="roadsteel-note"><b>◈ Road-glass reinforcement:</b> +1 on dangerous combat checks against Road guardians and other threats tied to the Glass Road.</p>`:''}${Number(p.gearUpgrades?.serviceUses||0)>0?`<p><b>Fresh service:</b> +1 remains for ${Number(p.gearUpgrades.serviceUses)} combat check${Number(p.gearUpgrades.serviceUses)===1?'':'s'}.</p>`:''}<div class="reputation-grid">${Object.entries(p.reputation||{}).map(([k,v])=>`<div><span>${(reputationTitleMap[k]||[k,'✦'])[1]} ${(reputationTitleMap[k]||[k])[0]}</span><b>${Number(v||0)}</b></div>`).join('')}</div><p><b>Private insights discovered:</b> ${privateClues.length}</p><div class="clue-journal">${privateClues.length?privateClues.map(c=>`<div class="clue-entry"><b>${esc(c.title)}</b><span>${esc(c.text)}</span></div>`).join(''):'<div class="small muted">Any personal clues your hero notices will be saved here for later reference.</div>'}</div><p class="small muted" style="margin-top:10px"><b>Dice mastery:</b> Skills at 6+ roll with Advantage. Reputation at 3+ gives +1 when an action clearly fits the role your hero has earned.</p></div>`;
  body.querySelectorAll('.grow-skill').forEach(b=>b.onclick=()=>{const sk=b.dataset.skill;if(confirm(`Increase ${sk} from ${p.stats[sk]} to ${p.stats[sk]+1}?`))socket.emit('allocateSkillPoint',{skill:sk});});
  const tbox=body.querySelector('#talentChoices');if(tbox&&!p.talent){const opts=state.talentCatalog?.[p.cls]||{};tbox.innerHTML=Object.entries(opts).map(([name,v])=>`<button class="choice talent-btn" data-talent="${name}"><b>${name}</b><span>${esc(v.desc)}</span></button>`).join('');tbox.querySelectorAll('.talent-btn').forEach(b=>b.onclick=()=>{if(confirm(`Choose ${b.dataset.talent} as your permanent advanced talent?`))socket.emit('chooseTalent',{talent:b.dataset.talent});});}
}
function openHeroSheet(){renderHeroSheet();$('heroSheetModal').classList.remove('hidden');}
function closeHeroSheet(){$('heroSheetModal').classList.add('hidden');}
if($('heroSheetBtn'))$('heroSheetBtn').onclick=openHeroSheet;
if($('heroSheetClose'))$('heroSheetClose').onclick=closeHeroSheet;
if($('heroSheetModal'))$('heroSheetModal').addEventListener('click',e=>{if(e.target===$('heroSheetModal'))closeHeroSheet();});

function renderHostTools(){
  const box=$('hostTools');if(!box)return;const host=state?.hostId===me;box.classList.toggle('hidden',!host);if(!host)return;
  const saved=readJson('glassRoadCampaign');if($('saveStatus')&&saved?.updatedAt)$('saveStatus').textContent=`✓ Auto-saved · ${new Date(saved.updatedAt).toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}`;
  $('copyCampaignBtn').onclick=()=>{socket.emit('requestCampaignSave');setTimeout(()=>copyText(readJson('glassRoadCampaign')?.saveToken,$('copyCampaignBtn')),180);};
  $('resetChallengeBtn').disabled=!state.pending;$('resetChallengeBtn').onclick=()=>{if(state.pending&&confirm('Reset this challenge and let the active hero choose again?'))socket.emit('hostResetChallenge');};
  $('skipTurnBtn').onclick=()=>{const active=state.players[state.activeIndex];if(confirm(`Skip ${active?.name||'the active hero'}'s turn?`))socket.emit('hostSkipTurn');};
  const disconnected=state.players.filter(p=>!p.connected&&p.id!==state.hostId),wrap=$('removePlayerWrap');wrap.classList.toggle('hidden',!disconnected.length);
  if(disconnected.length){$('disconnectedPlayer').innerHTML=disconnected.map(p=>`<option value="${p.id}">${esc(p.name)} — ${p.cls}</option>`).join('');$('removeDisconnectedBtn').onclick=()=>{const id=$('disconnectedPlayer').value;if(id&&confirm('Remove this disconnected player from the campaign?'))socket.emit('hostRemovePlayer',{playerId:id});};}
}
function skillOptions(selected='',allowed=skills,who=null){const list=Array.isArray(allowed)&&allowed.length?allowed:skills;const hero=who||player();return list.map(s=>`<option value="${s}" ${s===selected?'selected':''}>${s} — ${Number(hero?.stats?.[s]||0)}</option>`).join('');}
function relevantSkillSummary(hero,allowed){const list=Array.isArray(allowed)&&allowed.length?allowed:skills;return list.map(s=>`${s} ${Number(hero?.stats?.[s]||0)}`).join(' · ');}
function difficultyName(n){return n<=6?'Normal':n===7?'Hard':'Very hard';}
function threatStatusText(t){return t>=5?'HUNTED — dangerous challenges are +1 difficulty; Support needs 7+':t>=3?'PRESSURED — Support rolls need 7+':'CLEAR — no Threat penalty';}
function renderChallenge(mine){
  const box=$('challenge');if(!state.pending){box.classList.add('hidden');return;}box.classList.remove('hidden');const p=state.pending;
  const groupHeroes=state.players.filter(x=>(state.currentGroupPlayerIds||state.players.map(p=>p.id)).includes(x.id));
  if(p.type==='split'){if(!mine){box.innerHTML=`<div class="challenge-box split-challenge"><span class="mode">SPLIT THE GROUP</span><h3>${esc(p.desc||'The road divides')}</h3><p>${esc(state.players[state.activeIndex]?.name||'The active hero')} is assigning the company to two routes.</p></div>`;return;}const routes=p.routes||{};const heroes=groupHeroes;box.innerHTML=`<div class="challenge-box split-challenge"><span class="mode">SPLIT THE GROUP</span><h3>${esc(p.desc||'The road divides')}</h3><p>${esc(p.reason||'The company can cover two objectives at once. The groups will follow separate scenes until they reunite.')}</p><div class="split-route-grid"><div class="split-route"><b>${esc(routes.a?.name||'Route A')}</b><span>${esc(routes.a?.text||'')}</span></div><div class="split-route"><b>${esc(routes.b?.name||'Route B')}</b><span>${esc(routes.b?.text||'')}</span></div></div><div class="split-assignments">${heroes.map((h,i)=>`<label><span><b>${esc(h.name)}</b> · ${h.cls}</span><select class="splitPick" data-player="${h.id}"><option value="a" ${i%2===0?'selected':''}>${esc(routes.a?.name||'Route A')}</option><option value="b" ${i%2===1?'selected':''}>${esc(routes.b?.name||'Route B')}</option></select></label>`).join('')}</div><button id="resolveSplit" class="btn btn-primary full">Split the Company</button></div>`;$('resolveSplit').onclick=()=>{const assignments={};box.querySelectorAll('.splitPick').forEach(s=>assignments[s.dataset.player]=s.value);socket.emit('resolveSplit',{assignments});};return;}
  if(p.failed){const can=player()?.interventionReady&&p.eligibleInterveners?.includes(me),canHope=mine&&state.hope>=2;box.innerHTML=`<div class="challenge-box"><span class="mode">SETBACK</span><h3>The attempt failed</h3><p>The story will follow the consequence of this result.</p>${canHope?'<button id="spendHope" class="btn btn-success full">Spend 2 Hope — make it a Partial Success</button>':''}${can?'<button id="intervene" class="btn btn-primary full" style="margin-top:8px">Use My Heroic Intervention</button>':''}${mine?'<button id="decline" class="btn btn-ghost full" style="margin-top:8px">Accept the Setback</button>':''}</div>`;if($('spendHope'))$('spendHope').onclick=()=>socket.emit('spendHope');if($('intervene'))$('intervene').onclick=()=>socket.emit('intervene');if($('decline'))$('decline').onclick=()=>socket.emit('declineIntervention');return;}
  if(!mine){box.innerHTML=`<div class="challenge-box"><span class="mode">${p.type.toUpperCase()} CHALLENGE</span><h3>${esc(p.desc)}</h3><p>Waiting for ${esc(state.players[state.activeIndex].name)} to choose skills and roll.</p></div>`;return;}
  if(p.type==='team'){
    const count=p.teamProfile?.count||Math.min(p.teamSize,groupHeroes.length);
    const defaultHeroes=groupHeroes.slice(0,count);
    let rows='';
    for(let i=0;i<count;i++){
      const role=p.teamRoles?.[i],roleSkills=role?.skills||skills,chosenHero=defaultHeroes[i]||state.players[0];
      rows+=`<div class="team-role-card" data-team-index="${i}"><div class="team-role-card__title">${esc(role?.name||('Hero '+(i+1)))}</div><div class="team-role-card__desc small muted">${esc(role?.desc||'Choose the hero best suited to this part of the crisis.')}</div><div class="form-grid"><label>Hero<select class="teamHero">${groupHeroes.map((x,j)=>`<option value="${x.id}" ${j===i?'selected':''}>${esc(x.name)} — ${x.cls}</option>`).join('')}</select></label><label>Skill<select class="teamSkill">${skillOptions(roleSkills[0],roleSkills,chosenHero)}</select></label></div><div class="team-role-stats small muted">${chosenHero?`Relevant skills: ${esc(relevantSkillSummary(chosenHero,roleSkills))}`:''}</div></div>`;
    }
    box.innerHTML=`<div class="challenge-box"><span class="mode">WORK TOGETHER</span><h3>${esc(p.desc)}</h3><div class="challenge-explain"><b>Why together?</b> ${esc(p.reason||'This problem needs several heroes acting at the same time.')}</div><p>Assign ${count} different roles. Each selected hero rolls <b>1D6 + one listed skill</b> against ${p.effectiveMemberDifficulty||p.memberDifficulty} (${difficultyName(p.effectiveMemberDifficulty||p.memberDifficulty)}). ${count===1?'1 success = success.':count===2?'2 successes = full success · 1 = partial success · 0 = setback.':'3 successes = full success · 2 = partial success · 0–1 = setback.'}${p.knowledgeNote?` <span class="knowledge-help">📖 ${esc(p.knowledgeNote)}</span>`:''}${(p.effectiveMemberDifficulty||p.memberDifficulty)>p.memberDifficulty?' <span class="threat-warning">Threat has made this dangerous challenge harder.</span>':''}</p><div class="team-role-grid">${rows}</div><button id="teamRoll" type="button" class="btn btn-primary full">🎲 Resolve the Team Challenge</button></div>`;
    [...box.querySelectorAll('.team-role-card')].forEach((card,i)=>{
      const h=card.querySelector('.teamHero'),s=card.querySelector('.teamSkill'),stats=card.querySelector('.team-role-stats'),role=p.teamRoles?.[i],allowed=role?.skills||skills;
      const update=()=>{const hero=groupHeroes.find(x=>x.id===h.value)||groupHeroes[0];s.innerHTML=skillOptions(allowed[0],allowed,hero);stats.textContent=`Relevant skills: ${relevantSkillSummary(hero,allowed)}`;};
      h.onchange=update;
    });
    $('teamRoll').onclick=()=>{const hs=[...document.querySelectorAll('.teamHero')],ss=[...document.querySelectorAll('.teamSkill')];const team=hs.map((h,i)=>({playerId:h.value,skill:ss[i].value}));sendChallengeRoll({team},$('teamRoll'));};if(rollRequest?.challengeId===p.challengeId){$('teamRoll').disabled=true;$('teamRoll').dataset.rollPending='1';$('teamRoll').textContent='🎲 Rolling…';rollRequest.button=$('teamRoll');}return;
  }
  const supportEligible=groupHeroes.filter(x=>x.id!==me&&x.supportReady);const support=p.type==='support',meHero=player();const rep=earnedReputationTitle(meHero),repMatch=rep&&Number(meHero?.reputation?.[rep.key]||0)>=3;const seasonedNote=(Number(meHero?.stats?.[p.recommended]||0)>=6?`<div class="knowledge-help">✦ Mastery: ${esc(p.recommended)} has become one of ${esc(meHero.name)}’s defining strengths. Choosing it rolls with Advantage.</div>`:'')+(repMatch?`<div class="knowledge-help">✦ Earned role: the company knows ${esc(meHero.name)} as <b>${esc(rep.title)}</b>. Checks that fit that role gain +1.</div>`:'');
  const helperOptions=supportEligible.map(x=>`<option value="${x.id}">${esc(x.name)} — ${x.cls} · ${esc(relevantSkillSummary(x,p.supportSkills))}</option>`).join('');
  if(p.lowStakes){
    const allowed=p.allowedSkills||[p.recommended];
    const successText=p.outcomeText?`You discover that ${esc(p.outcomeText)}.`:'You notice something useful that may change the route ahead.';
    box.innerHTML=`<div class="challenge-box sense-box"><span class="mode">LOOK CLOSELY</span><h3>${esc(p.desc)}</h3><p class="sense-intro">Look carefully for anything useful before moving on.</p><div class="sense-summary"><div><span class="small muted">TARGET</span><strong>${p.effectiveDifficulty||p.difficulty}</strong></div><div><span class="small muted">USE</span><strong>${allowed.map(sk=>`${esc(sk)} — ${Number(meHero?.stats?.[sk]||0)}`).join(' or ')}</strong></div></div><div class="sense-outcomes"><div class="sense-good"><b>If you succeed</b><span>${successText}</span></div><div class="sense-neutral"><b>If you miss</b><span>You do not notice anything useful and the journey continues.</span></div></div><label>Choose skill<select id="mainSkill">${skillOptions(p.recommended,p.allowedSkills,meHero)}</select></label><button id="mainRoll" type="button" class="btn btn-primary full">🎲 Roll the Dice</button></div>`;
  } else {
    box.innerHTML=`<div class="challenge-box"><span class="mode">${support?'HELP AVAILABLE':'YOUR ROLL'}</span><h3>${esc(p.desc)}</h3>${p.reason?`<div class="challenge-explain">${esc(p.reason)}</div>`:''}${seasonedNote}<p><b>Target:</b> ${p.effectiveDifficulty||p.difficulty} (${difficultyName(p.effectiveDifficulty||p.difficulty)}). <b>Use:</b> ${(p.allowedSkills||[p.recommended]).join(' or ')}.${support?` A helper may help; their roll needs <b>${p.supportTarget||6}</b>+ to add +2.`:''}${p.knowledgeNote?` <span class="knowledge-help">📖 ${esc(p.knowledgeNote)}</span>`:''}${(p.effectiveDifficulty||p.difficulty)>p.difficulty?' <span class="threat-warning">Threat has made this challenge harder.</span>':''}</p><div class="form-grid"><label>Your skill<select id="mainSkill">${skillOptions(p.recommended,p.allowedSkills,meHero)}</select></label>${support?`<label>Optional helper<select id="supportPlayer"><option value="">Roll alone</option>${helperOptions}</select></label>`:''}</div>${support?`<div id="supportSkillWrap" class="hidden"><label>Helper's skill<select id="supportSkill"></select></label><p id="supportSkillHint" class="small muted">Choose a helper to see their relevant skill ratings.</p></div>`:''}<button id="mainRoll" type="button" class="btn btn-primary full">🎲 Roll the Dice</button></div>`;
  }
  if(support&&$('supportPlayer'))$('supportPlayer').onchange=()=>{const id=$('supportPlayer').value,wrap=$('supportSkillWrap');wrap.classList.toggle('hidden',!id);if(id){const h=groupHeroes.find(x=>x.id===id);$('supportSkill').innerHTML=skillOptions((p.supportSkills||[])[0],p.supportSkills,h);$('supportSkillHint').textContent=`${h.name}: ${relevantSkillSummary(h,p.supportSkills)}. A total of ${p.supportTarget||6}+ adds +2 to the main roll.`;}};
  $('mainRoll').onclick=()=>sendChallengeRoll({skill:$('mainSkill').value,supportPlayerId:support&&$('supportPlayer').value||null,supportSkill:support&&$('supportSkill')?.value||null},$('mainRoll'));
  if(rollRequest?.challengeId===p.challengeId){$('mainRoll').disabled=true;$('mainRoll').dataset.rollPending='1';$('mainRoll').textContent='🎲 Rolling…';rollRequest.button=$('mainRoll');}
}
function renderLastRoll(){
  const r=state.lastRoll;if(!r){$('rollResult').innerHTML='';return;}
  const key=JSON.stringify(r);if(key===dismissedRollKey){$('rollResult').innerHTML='';return;}
  let html='';
  const heroicHtml=r.heroicMoment?`<div class="heroic-callout">✨ HEROIC MOMENT — ${esc(r.heroicEffect||'the exceptional roll creates an extra advantage.')}</div>`:'';
  const complicationHtml=r.complication?`<div class="complication-callout">⚠️ UNEXPECTED COMPLICATION — ${esc(r.complicationEffect||'something else goes wrong despite the main action.')}</div>`:'';
  if(r.type==='item'){
    html=`<div class="roll-card cinematic-result"><b>🎒 ${esc(r.name)}</b><p>${esc(r.text||'The item is used.')}</p></div>`;
  } else if(r.type==='intervention'){
    html=`<div class="roll-card cinematic-result"><b>Heroic Intervention</b><div class="dice-row"><span class="die rolling">${r.die}</span></div>${esc(r.name)} used ${esc(r.skill)}: <b>${r.total}</b> — <span class="${r.success?'result-success':'result-fail'}">${r.success?'SUCCESS':'FAILED'}</span></div>`;
  } else if(r.type==='team'){
    const graded=r.grade==='partial'?'PARTIAL SUCCESS':r.success?'TEAM SUCCESS':'SETBACK';
    html=`<div class="roll-card cinematic-result"><b>Team roll</b>${r.results.map(x=>`<p>${x.rollMode&&x.rollMode!=='normal'?`<span class="mode">${x.rollMode}</span> `:''}${(x.rolls||[x.die]).map(d=>`<span class="die rolling" style="display:inline-grid">${d}</span>`).join('')} ${esc(x.name)} · ${x.role?esc(x.role)+' · ':''}${esc(x.skill)} = <b>${x.total}</b> <span class="${x.ok?'result-success':'result-fail'}">${x.ok?'✓':'✕'}</span></p>`).join('')}<b>${r.successes}/${r.results.length} successes — <span class="${r.success?'result-success':'result-fail'}">${graded}</span></b>${heroicHtml}${complicationHtml}</div>`;
  } else {
    const mainDie=r.rollMode==='advantage'?Math.max(...r.dice):r.rollMode==='disadvantage'?Math.min(...r.dice):r.dice.reduce((a,b)=>a+b,0);
    html=`<div class="roll-card cinematic-result"><b>${esc(r.desc)}</b><div class="dice-row">${r.dice.map(d=>`<span class="die rolling">${d}</span>`).join('')}</div><p>Main roll: ${mainDie} + skill ${r.bonus}${r.supportBonus?` + support ${r.supportBonus}`:''} = <b>${r.total}</b> vs ${r.difficulty}</p>${r.support?`<p class="small">${esc(r.support.name)} supported with ${esc(r.support.skill)}: ${r.support.total} ${r.support.ok?'✓ +2':'✕ no bonus'}</p>`:''}${heroicHtml}${complicationHtml}<div class="result-banner ${r.success?'ok':'bad'}">${r.success?'SUCCESS!':'SETBACK'}</div>${!r.success?`<p class="small muted">${r.dangerous?'This was dangerous — the active hero may be wounded.':'No wound: this setback changes the situation instead.'}</p>`:''}</div>`;
  }
  $('rollResult').innerHTML=html;const card=$('rollResult').querySelector('.roll-card');if(card){
    card.classList.add('dismissible-result');
    card.insertAdjacentHTML('afterbegin','<button class="roll-dismiss-button" type="button" aria-label="Close dice result" title="Close dice result"><span aria-hidden="true">×</span></button>');
    const closeBtn=card.querySelector('.roll-dismiss-button');
    closeBtn.onclick=(event)=>{event.stopPropagation();dismissedRollKey=key;$('rollResult').innerHTML='';};
  }
  if(key!==lastRollSeen){lastRollSeen=key;dismissedRollKey='';playSound(r.success===false?'fail':'dice');setTimeout(()=>playSound(r.success===false?'fail':'success'),480);}
}
function renderEnding(){
  show('ended');
  document.querySelector('#ended .eyebrow').textContent='THE GLASS ROAD — FIRST CROSSING COMPLETE';
  const f=state.flags||{}, sacrificed=state.players.find(p=>p.sacrificed);
  const endings={
    hero_sacrifice:[sacrificed?`${sacrificed.name} Held the Road`:'A Hero Held the Road',sacrificed?`${sacrificed.name} stepped onto the keeper platform so the company could live. The far tower closed around them as the last hero crossed. Beyond Crown Pass, the Road remained open because one member of the company chose everyone else.`:'One hero remained behind so the others could cross.'],
    mara_sacrifice:['Mara Vale Held the Road','Mara stayed at the far tower she had spent years trying to find. Her final instruction was not about maps: “Tell them who paid for the first crossing.” The company reached safety while the Road closed around her.'],
    dain_sacrifice:['Dain Holt Stayed Behind','Dain took the keeper platform before Mara could stop him. “A road-captain gets people home,” he said. The crossing held until the last traveller was safe, and then Dain vanished behind blue glass.'],
    everyone_lives:['Another Way','Everything the company learned — the timed pulse, the water galleries, the answering milestones, the bells — finally connected. The person keeping the Road open did not have to be a sacrifice. You found a way to pass that duty from one traveller to another and walked out together.'],
    severed:['The Road Falls Silent','Rather than feed a life into a system you did not understand, the company broke the far tower. Blue light withdrew through the valley. The distant city remained visible, but the Glass Road went cold beneath your feet.'],
    retreat:['No One Was Left Behind','The company refused to leave a person inside the far tower. You withdrew before the bridge closed, losing the active crossing but carrying home proof that the old system demanded a price you were not willing to pay.']
  };
  const [title,lead]=endings[state.finalChoice]||['Beyond the Known Maps','The company returns knowing the Glass Road is awake and that the First Crossing changed them.'];
  document.querySelector('#ended h1').textContent=title;
  $('endingArt').style.backgroundImage="linear-gradient(0deg,rgba(5,10,18,.72),rgba(5,10,18,.08)),url('assets/final_ai.webp')";
  const routeNames=(state.routeHistory||[]).filter(r=>r.complete).map(r=>r.name).filter(Boolean);
  const trusted=Object.values(state.journal?.people||{}).filter(p=>['trusting','confiding','cooperating','competitive respect','wary respect','open','respectful','trusted interpreter'].includes(String(p.status||'').toLowerCase())).map(p=>p.name);
  const remainingItems=(state.items||[]).map(id=>state.itemCatalog?.[id]?.name||id.replaceAll('_',' '));
  const callbacks=[];
  if(f.road_network)callbacks.push('You proved the Glass Road was once a network, not a single road.');
  if(f.road_infrastructure)callbacks.push('You learned that the Road carried heat, water and signals as well as travellers.');
  if(f.severed_on_purpose)callbacks.push('You discovered that an earlier generation deliberately broke this connection.');
  if(f.road_listens)callbacks.push('You learned that the Road listens for structured signals and can answer.');
  if(f.keeper_solution)callbacks.push('Enough earlier clues survived to reveal that the keeper rule could be rewritten.');
  if(state.allies?.edda)callbacks.push('Edda Varn is still waiting for the warning you promised to bring back.');
  const memorial=state.finalChoice==='hero_sacrifice'&&sacrificed?`<div class="memorial-card"><div class="eyebrow">THE ROAD REMEMBERS</div><h2>${esc(sacrificed.name)}</h2><p>${esc(sacrificed.name)} gave up the return journey so the company could have one. Travellers who later reach Crown Pass touch the keeper-stone before crossing and speak their name.</p></div>`:state.finalChoice==='mara_sacrifice'?`<div class="memorial-card"><div class="eyebrow">THE ROAD REMEMBERS</div><h2>Mara Vale</h2><p>The first reliable map of the eastern crossing leaves one place blank. In the margin Dain writes: “Here a cartographer became the road home.”</p></div>`:state.finalChoice==='dain_sacrifice'?`<div class="memorial-card"><div class="eyebrow">THE ROAD REMEMBERS</div><h2>Dain Holt</h2><p>Future road-captains call the first safe shelter east of the pass Holt's Rest. No traveller is charged for a bed there.</p></div>`:'';
  $('endingText').innerHTML=`<p class="finale-lead">${esc(lead)}</p>${memorial}${callbacks.length?`<div class="ending-callbacks"><b>What your First Crossing changed</b><ul>${callbacks.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}${routeNames.length?`<p><b>Routes taken:</b> ${routeNames.map(esc).join(', ')}.</p>`:''}${trusted.length?`<p><b>Relationships carried home:</b> ${trusted.map(esc).join(', ')}.</p>`:''}${remainingItems.length?`<p><b>Evidence in the company’s pack:</b> ${remainingItems.map(esc).join(', ')}.</p>`:''}<h2>The Company After the Crossing</h2>${state.players.map(p=>`<div class="epilogue ${p.sacrificed?'sacrificed':''}"><b>${classInfo[p.cls]?.icon||'✦'} ${esc(p.name)} — ${p.cls}${p.sacrificed?' · ROAD KEEPER':''}</b><p>${p.sacrificed?`${esc(p.name)} did not return from the far tower. Their choice became part of every later telling of the First Crossing.`:heroEpilogue(p)}</p><span>Highest skill: ${strongestSkill(p)} · Wounds ${p.wounds}/3 · Unspent Skill Points ${p.skillPoints||0}</span></div>`).join('')}<p class="finale-close"><b>The Road remembers who crossed it.</b><br>Now the people west of Crown Pass must decide what to do with the story you bring home.</p>`;
  document.querySelector('.next-session').innerHTML='<div class="eyebrow">THE END OF THE FIRST CROSSING</div><h2>The road continues east.</h2><p>The larger campaign can begin from the consequence of this choice: a living keeper, a broken Road, a rescued company — or proof that the old rules can be changed.</p>';
  playSound(state.finalChoice&&state.finalChoice.includes('sacrifice')?'mystery':'success');
}
function strongestSkill(p){const entries=Object.entries(p.stats||{});entries.sort((a,b)=>b[1]-a[1]);return `${entries[0]?.[0]||'—'} ${entries[0]?.[1]||0}`;}
function heroEpilogue(p){
  const best=Object.entries(p.stats||{}).sort((a,b)=>b[1]-a[1])[0]?.[0]||'';
  const rep=earnedReputationTitle(p),role=rep?` By Crown Pass, companions had started calling them ${rep.title}.`:'';
  const upgrades=(p.gearUpgrades?.labels||[]).length?` Their ${p.gear} carries the marks of the smiths who prepared it for the Road.`:'';
  const byClass={
    Knight:`${p.name} became the person others looked toward when the road narrowed, the weather turned or the Glass Hounds came over the bridge. ${best?`Their ${best} became part of the company’s reputation.`:''}${role}${upgrades}`,
    Ranger:`${p.name} returned with routes no surveyor had walked in generations. The first reliable sketch of the Greywood crossing carries their notes in the margins.${role}${upgrades}`,
    Thief:`${p.name} learned that the Road hides mechanisms, people hide motives, and both leave traces. More than one secret survived only because they noticed it first.${role}${upgrades}`,
    Mage:`${p.name} returned with the beginning of a new theory: the Glass Road is not dead magic but an operating system of signals, route marks and responses.${role}${upgrades}`,
    Monk:`${p.name} became the company’s measure of when wonder was turning into fear. Their account of the voices beside the Road is copied more often than the expedition map.${role}${upgrades}`,
    Engineer:`${p.name} came home convinced the Glass Road was a working system before it became a legend. Valves, warm-water channels and responsive milestones now fill their notes.${role}${upgrades}`
  };
  return byClass[p.cls]||`${p.name} returned from Crown Pass carrying a story the western kingdoms will not be able to ignore.`;
}

function renderVoiceUi(){
  const players=state?.players||[],joined=players.filter(p=>p.voiceJoined);
  const connectedPeers=[...voiceConnectionStates.values()].filter(x=>x==='connected').length;
  const status=voiceJoined?`${joined.length} in voice · ${connectedPeers} linked`:'Not connected';
  ['voiceLobbyStatus','voiceGameStatus'].forEach(id=>{const el=$(id);if(el)el.textContent=status;});
  document.querySelectorAll('.voiceJoinBtn').forEach(b=>{b.classList.toggle('hidden',voiceJoined);b.textContent=voiceRelayAvailable?'Join Voice':'Try direct voice';});
  document.querySelectorAll('.voiceMuteBtn').forEach(b=>{b.classList.toggle('hidden',!voiceJoined);b.textContent=voiceMuted?'Unmute':'Mute';});
  document.querySelectorAll('.voiceLeaveBtn').forEach(b=>b.classList.toggle('hidden',!voiceJoined));
  const html=joined.length?joined.map(p=>{const speaking=p.id===me?localSpeaking:voiceSpeaking.get(p.id);const icon=p.voiceMuted?'🔇':speaking?'🔊':'🎙';return `<div class="voice-person ${speaking&&!p.voiceMuted?'speaking':''}"><span>${icon}</span><b>${esc(p.name)}</b>${p.id===me?'<em>You</em>':''}</div>`;}).join(''):'<span class="muted">No one has joined voice yet.</span>';
  ['voiceLobbyList','voiceGameList'].forEach(id=>{const el=$(id);if(el)el.innerHTML=html;});
  const note=voiceRelayAvailable?'Voice relay ready · reliable internet voice enabled':'Voice relay is not configured. Direct voice may fail on some networks.';
  ['voiceLobbyNetwork','voiceGameNetwork'].forEach(id=>{const el=$(id);if(el){el.textContent=note;el.className=`voice-network small ${voiceRelayAvailable?'ok':'warn'}`;}});
}
function bindVoiceButtons(){
  document.querySelectorAll('.voiceJoinBtn').forEach(b=>b.onclick=joinVoice);
  document.querySelectorAll('.voiceMuteBtn').forEach(b=>b.onclick=toggleVoiceMute);
  document.querySelectorAll('.voiceLeaveBtn').forEach(b=>b.onclick=leaveVoice);
}
bindVoiceButtons();
setupLanguageSelector();
loadTranslationConfig();
loadVoiceConfig();
async function joinVoice(){
  if(voiceJoined||!me||!state)return;
  await loadVoiceConfig();
  if(!navigator.mediaDevices?.getUserMedia)return showConsequence('Voice unavailable','This browser does not provide microphone access.','bad');
  try{
    if(!voiceRelayAvailable)showConsequence('Voice relay not configured','I’ll try a direct connection. This can fail between some home, mobile or work networks.','good');
    localVoiceStream=await navigator.mediaDevices.getUserMedia({audio:{echoCancellation:true,noiseSuppression:true,autoGainControl:true},video:false});
    voiceJoined=true;voiceMuted=false;socket.emit('voiceJoin');startLocalSpeakingDetector();renderVoiceUi();syncVoicePeers();
  }catch(e){voiceJoined=false;showConsequence('Microphone not connected','Allow microphone access to use optional voice chat.','bad');}
}
function toggleVoiceMute(){
  if(!voiceJoined||!localVoiceStream)return;voiceMuted=!voiceMuted;for(const t of localVoiceStream.getAudioTracks())t.enabled=!voiceMuted;socket.emit('voiceSetMuted',{muted:voiceMuted});if(voiceMuted)setLocalSpeaking(false);renderVoiceUi();
}
function leaveVoice(){
  if(voiceJoined)socket.emit('voiceLeave');voiceJoined=false;voiceMuted=false;setLocalSpeaking(false);stopLocalSpeakingDetector();
  if(localVoiceStream){localVoiceStream.getTracks().forEach(t=>t.stop());localVoiceStream=null;}if(voiceAudioCtx){try{voiceAudioCtx.close();}catch{}voiceAudioCtx=null;}
  for(const id of [...voicePeers.keys()])closeVoicePeer(id);renderVoiceUi();
}
function closeVoicePeer(id){const pc=voicePeers.get(id);if(pc){try{pc.close();}catch{}voicePeers.delete(id);}const a=document.getElementById(`voice-audio-${id}`);if(a)a.remove();voiceSpeaking.delete(id);voiceConnectionStates.delete(id);voiceRetryCount.delete(id);renderVoiceUi();}
function attachRemoteVoice(id,stream){let a=document.getElementById(`voice-audio-${id}`);if(!a){a=document.createElement('audio');a.id=`voice-audio-${id}`;a.autoplay=true;a.playsInline=true;a.className='remote-voice-audio';document.body.appendChild(a);}a.srcObject=stream;a.play?.().catch(()=>{});}
async function ensureVoicePeer(id,initiate=false){
  if(!voiceJoined||!localVoiceStream||id===me)return null;if(voicePeers.has(id))return voicePeers.get(id);
  const pc=new RTCPeerConnection(voiceRtcConfig);pc._queued=[];voicePeers.set(id,pc);voiceConnectionStates.set(id,'connecting');
  for(const track of localVoiceStream.getTracks())pc.addTrack(track,localVoiceStream);
  pc.onicecandidate=e=>{if(e.candidate)socket.emit('voiceSignal',{targetPlayerId:id,candidate:e.candidate});};
  pc.ontrack=e=>attachRemoteVoice(id,e.streams[0]);
  pc.onconnectionstatechange=async()=>{voiceConnectionStates.set(id,pc.connectionState);renderVoiceUi();if(pc.connectionState==='failed'){const tries=voiceRetryCount.get(id)||0;if(tries<1){voiceRetryCount.set(id,tries+1);try{pc.restartIce?.();const offer=await pc.createOffer({iceRestart:true});await pc.setLocalDescription(offer);socket.emit('voiceSignal',{targetPlayerId:id,description:pc.localDescription});return;}catch{}}showConsequence('Voice could not link',voiceRelayAvailable?'The relay is available, but this connection still failed. Leave Voice and try again.':'These two networks could not connect directly. A voice relay must be configured on the server for reliable voice.','bad');}if(pc.connectionState==='connected')voiceRetryCount.delete(id);if(pc.connectionState==='closed')closeVoicePeer(id);};pc.oniceconnectionstatechange=()=>{};
  if(initiate){try{const offer=await pc.createOffer();await pc.setLocalDescription(offer);socket.emit('voiceSignal',{targetPlayerId:id,description:pc.localDescription});}catch{}}
  return pc;
}
function syncVoicePeers(){
  if(!voiceJoined||!state)return;const ids=new Set((state.players||[]).filter(p=>p.voiceJoined&&p.id!==me).map(p=>p.id));
  for(const id of [...voicePeers.keys()])if(!ids.has(id))closeVoicePeer(id);
  for(const id of ids)ensureVoicePeer(id,String(me)<String(id));
}
socket.on('voiceSignal',async({fromPlayerId,description,candidate})=>{
  if(!voiceJoined||!localVoiceStream)return;const pc=await ensureVoicePeer(fromPlayerId,false);if(!pc)return;
  try{
    if(description){
      if(description.type==='offer'){if(pc.signalingState!=='stable')try{await pc.setLocalDescription({type:'rollback'});}catch{}await pc.setRemoteDescription(description);for(const c of pc._queued.splice(0))await pc.addIceCandidate(c);const ans=await pc.createAnswer();await pc.setLocalDescription(ans);socket.emit('voiceSignal',{targetPlayerId:fromPlayerId,description:pc.localDescription});}
      else if(description.type==='answer'&&pc.signalingState==='have-local-offer'){await pc.setRemoteDescription(description);for(const c of pc._queued.splice(0))await pc.addIceCandidate(c);}
    }else if(candidate){if(pc.remoteDescription)await pc.addIceCandidate(candidate);else pc._queued.push(candidate);}
  }catch{}
});
socket.on('voicePeerLeft',x=>{closeVoicePeer(x.playerId);renderVoiceUi();});
socket.on('voiceSpeaking',x=>{voiceSpeaking.set(x.playerId,!!x.speaking);renderVoiceUi();duckAmbience();});
socket.on('voiceMuted',x=>{voiceSpeaking.set(x.playerId,false);renderVoiceUi();});
function setLocalSpeaking(v){v=!!v&&!voiceMuted;if(localSpeaking===v)return;localSpeaking=v;if(voiceJoined)socket.emit('voiceSpeaking',{speaking:v});renderVoiceUi();duckAmbience();}
function startLocalSpeakingDetector(){
  stopLocalSpeakingDetector();if(!localVoiceStream)return;try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const ctx=voiceAudioCtx||(voiceAudioCtx=new AC());if(ctx.state==='suspended')ctx.resume().catch(()=>{});const src=ctx.createMediaStreamSource(localVoiceStream),an=ctx.createAnalyser();an.fftSize=512;src.connect(an);const data=new Uint8Array(an.fftSize);let quiet=0;const tick=()=>{if(!voiceJoined||!localVoiceStream)return;an.getByteTimeDomainData(data);let sum=0;for(const x of data){const d=(x-128)/128;sum+=d*d;}const rms=Math.sqrt(sum/data.length);if(rms>.035&&!voiceMuted){quiet=0;setLocalSpeaking(true);}else if(++quiet>6)setLocalSpeaking(false);voiceAnalyserFrame=requestAnimationFrame(tick);};tick();}catch{}
}
function stopLocalSpeakingDetector(){if(voiceAnalyserFrame)cancelAnimationFrame(voiceAnalyserFrame);voiceAnalyserFrame=null;}

function ambientCategory(scene){
  if(['intro','briefing','forge','cliff_excavation','first_mile','farmstead'].includes(scene))return 'shore';
  if(/pine|woodland|charcoal|stag/.test(scene))return 'forest';
  if(/river|ferry|drowned/.test(scene))return 'river';
  if(/span/.test(scene))return 'battle';
  if(/hollow/.test(scene))return 'forest';
  if(/tunnel/.test(scene))return 'cave';
  if(/mountain|ridge|pass|final/.test(scene))return 'wind';
  return 'forest';
}
function stopAmbience(){if(ambientTimer){clearInterval(ambientTimer);ambientTimer=null;}for(const n of ambientNodes){try{if(n.stop)n.stop();}catch{}try{n.disconnect();}catch{}}ambientNodes=[];if(ambientMaster){try{ambientMaster.disconnect();}catch{}ambientMaster=null;}ambientScene=null;}
function hardSilenceGameAudio(){if(audioOn||ambientOn)return;stopAmbience();const ctx=playSound.ctx;if(ctx&&ctx.state==='running')ctx.suspend().catch(()=>{});}
function makeNoiseSource(ctx){const len=ctx.sampleRate*3,b=ctx.createBuffer(1,len,ctx.sampleRate),d=b.getChannelData(0);for(let i=0;i<len;i++)d[i]=Math.random()*2-1;const s=ctx.createBufferSource();s.buffer=b;s.loop=true;return s;}
function ambientNoise(ctx,master,{gain=.02,low=0,high=0,type='lowpass'}={}){const src=makeNoiseSource(ctx),f=ctx.createBiquadFilter(),g=ctx.createGain();f.type=type;f.frequency.value=high||low||900;g.gain.value=gain;src.connect(f);f.connect(g);g.connect(master);src.start();ambientNodes.push(src,f,g);return {src,f,g};}
function ambientTone(ctx,master,freq,gain=.006){const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;g.gain.value=gain;o.connect(g);g.connect(master);o.start();ambientNodes.push(o,g);return o;}
function roadPulse(ctx,master){if(!ambientOn||!master)return;const scene=state?.scene||'';if(!/cliff|mile|river|span|hollow|tunnel|ridge|pass|final|intro|briefing|forge/.test(scene))return;const now=ctx.currentTime,o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.setValueAtTime(74,now);o.frequency.exponentialRampToValueAtTime(112,now+.65);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.009,now+.12);g.gain.exponentialRampToValueAtTime(.0001,now+1.05);o.connect(g);g.connect(master);o.start(now);o.stop(now+1.1);}
function birdChirp(ctx,master){if(!ambientOn||ambientCategory(state?.scene)!=='forest')return;const o=ctx.createOscillator(),g=ctx.createGain(),now=ctx.currentTime;o.type='sine';o.frequency.setValueAtTime(1650,now);o.frequency.exponentialRampToValueAtTime(2450,now+.12);g.gain.setValueAtTime(.0001,now);g.gain.exponentialRampToValueAtTime(.012,now+.02);g.gain.exponentialRampToValueAtTime(.0001,now+.22);o.connect(g);g.connect(master);o.start(now);o.stop(now+.25);}
function updateAmbience(scene,force=false){
  if(!ambientOn||!scene){stopAmbience();return;}const cat=ambientCategory(scene);if(!force&&ambientScene===cat&&ambientMaster)return;stopAmbience();ambientScene=cat;
  try{const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;const ctx=playSound.ctx||(playSound.ctx=new AC());ambientMaster=ctx.createGain();ambientMaster.gain.value=.72;ambientMaster.connect(ctx.destination);ambientNodes.push(ambientMaster);
    if(cat==='sea'){const n=ambientNoise(ctx,ambientMaster,{gain:.022,high:700});const l=ctx.createOscillator(),lg=ctx.createGain();l.frequency.value=.09;lg.gain.value=.013;l.connect(lg);lg.connect(n.g.gain);l.start();ambientNodes.push(l,lg);ambientTone(ctx,ambientMaster,55,.003);}
    else if(cat==='shore'){const n=ambientNoise(ctx,ambientMaster,{gain:.028,high:950});const l=ctx.createOscillator(),lg=ctx.createGain();l.frequency.value=.16;lg.gain.value=.016;l.connect(lg);lg.connect(n.g.gain);l.start();ambientNodes.push(l,lg);}
    else if(cat==='river'){ambientNoise(ctx,ambientMaster,{gain:.035,high:1800});ambientNoise(ctx,ambientMaster,{gain:.012,high:420,type:'lowpass'});}
    else if(cat==='storm'){ambientNoise(ctx,ambientMaster,{gain:.05,high:1100});ambientTone(ctx,ambientMaster,43,.018);}
    else if(cat==='marsh'){ambientNoise(ctx,ambientMaster,{gain:.013,high:1200});ambientTone(ctx,ambientMaster,86,.004);}
    else if(cat==='forest'){ambientNoise(ctx,ambientMaster,{gain:.009,high:2200,type:'highpass'});ambientNoise(ctx,ambientMaster,{gain:.006,high:500});ambientTimer=setInterval(()=>birdChirp(ctx,ambientMaster),6500);setTimeout(()=>birdChirp(ctx,ambientMaster),800);}
    else if(cat==='cave'){ambientNoise(ctx,ambientMaster,{gain:.007,high:500});ambientTone(ctx,ambientMaster,63,.006);ambientTone(ctx,ambientMaster,94,.003);}
    else if(cat==='wind'){ambientNoise(ctx,ambientMaster,{gain:.025,high:800});ambientTone(ctx,ambientMaster,48,.004);}
    else if(cat==='battle'){ambientNoise(ctx,ambientMaster,{gain:.02,high:700});ambientTone(ctx,ambientMaster,52,.008);ambientTimer=setInterval(()=>roadPulse(ctx,ambientMaster),7100);setTimeout(()=>roadPulse(ctx,ambientMaster),1400);}if(cat!=='forest'&&cat!=='battle'){ambientTimer=setInterval(()=>roadPulse(ctx,ambientMaster),11000);setTimeout(()=>roadPulse(ctx,ambientMaster),2400);}
  }catch{}
}

function playSound(kind){
  if(!audioOn)return;
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC)return;
    const ctx=playSound.ctx||(playSound.ctx=new AC());
    const now=ctx.currentTime;
    const tone=(freq,dur,type='sine',gain=.05,delay=0)=>{
      const o=ctx.createOscillator(),g=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,now+delay);g.gain.setValueAtTime(0.0001,now+delay);g.gain.exponentialRampToValueAtTime(gain,now+delay+.02);g.gain.exponentialRampToValueAtTime(.0001,now+delay+dur);o.connect(g);g.connect(ctx.destination);o.start(now+delay);o.stop(now+delay+dur+.03);
    };
    if(kind==='dialogue'){tone(360,.10,'sine',.025);tone(520,.16,'sine',.02,.08);}
    else if(kind==='storm'){tone(80,.8,'sawtooth',.07);tone(42,1.1,'sine',.08,.08);}
    else if(kind==='troll'){tone(58,.55,'square',.055);tone(45,.7,'sawtooth',.05,.15);}
    else if(kind==='success'){tone(440,.18,'sine',.045);tone(660,.22,'sine',.05,.14);tone(880,.30,'sine',.05,.28);}
    else if(kind==='fail'){tone(220,.25,'triangle',.04);tone(155,.4,'triangle',.04,.18);}
    else {tone(240,.08,'square',.025);tone(330,.08,'square',.025,.09);tone(410,.08,'square',.025,.18);}
  }catch{}
}
function showSceneReveal(scene){
  const sc=scenes[scene]; if(!sc||scene===lastSceneSeen)return; lastSceneSeen=scene;
  if(/span/.test(scene))playSound('storm'); else if(/forge/.test(scene))playSound('dialogue');
  const overlay=$('sceneReveal'); if(!overlay)return;const sk=sceneKind(scene)[1];if(sk==='battle')playSound('storm');else if(sk==='rest'||sk==='conversation')playSound('dialogue');
  overlay.className=`scene-reveal ${sceneRevealTone(scene)}`;
  overlay.style.backgroundImage=`linear-gradient(rgba(3,8,15,.2),rgba(3,8,15,.82)),url('${sceneImages[scene]||'assets/glass_home.svg'}')`;
  $('revealKicker').textContent=/span/.test(scene)?'DANGER ON THE ROAD':'THE GLASS ROAD';
  $('revealTitle').textContent=sc.title;
  $('revealText').textContent=scene==='troll'?'Something huge moves beneath the bridge.':scene==='storm'?'The calm is over. The sky breaks.':sc.mission;
  overlay.classList.remove('hidden');overlay.classList.add('show');
  clearTimeout(showSceneReveal.t);showSceneReveal.t=setTimeout(()=>{overlay.classList.remove('show');setTimeout(()=>{overlay.classList.add('hidden');overlay.className='scene-reveal hidden';},350);},2900);
}
function showSpotlight(kicker,title,text,image='assets/portraits.webp',ms=2500){
  const overlay=$('sceneReveal'); if(!overlay)return;
  const portrait=$('sceneRevealPortrait');
  overlay.className='scene-reveal tone-road spotlight-portrait';
  overlay.style.backgroundImage='linear-gradient(rgba(3,8,15,.24),rgba(3,8,15,.90))';
  if(portrait){portrait.setAttribute('src',image);portrait.classList.remove('hidden');portrait.onerror=()=>{portrait.classList.add('hidden');portrait.removeAttribute('src');};}
  $('revealKicker').textContent=kicker;
  $('revealTitle').textContent=title;
  $('revealText').textContent=text;
  overlay.classList.remove('hidden');overlay.classList.add('show');
  clearTimeout(showSpotlight.t);showSpotlight.t=setTimeout(()=>{overlay.classList.remove('show');setTimeout(()=>{overlay.classList.add('hidden');overlay.className='scene-reveal hidden'; if(portrait){portrait.classList.add('hidden');portrait.removeAttribute('src');}},350);},ms);
}
function showConsequence(title,text,type='good'){
  const box=$('consequenceToast');if(!box)return;
  box.className=`consequence-toast ${type}`;box.innerHTML=`<button class="hint-dismiss-button toast-dismiss" type="button" aria-label="Close notification" title="Close notification"><span aria-hidden="true">×</span></button><b>${esc(title)}</b><span>${esc(text)}</span>`;box.classList.remove('hidden');
  box.querySelector('.hint-dismiss-button')?.addEventListener('click',()=>box.classList.add('hidden'));
}
function handleAtmosphere(oldS,newS){
  if(oldS.phase!=='playing'&&newS.phase==='playing')setTimeout(()=>showSceneReveal(newS.scene),120);
  else if(newS.phase==='playing'&&oldS.scene!==newS.scene){if(suppressNextSceneReveal)suppressNextSceneReveal=false;else setTimeout(()=>showSceneReveal(newS.scene),120);}
  if(oldS.supplies!==newS.supplies)showConsequence(newS.supplies>oldS.supplies?'Supplies gained':'Supplies lost',`${Math.abs(newS.supplies-oldS.supplies)} supply ${Math.abs(newS.supplies-oldS.supplies)===1?'point':'points'} ${newS.supplies>oldS.supplies?'added to':'removed from'} the expedition.`,newS.supplies>oldS.supplies?'good':'bad');
  else if((oldS.items||[]).length!==(newS.items||[]).length)showConsequence('Inventory updated','The party has gained or used a special item.','good');
  else if(oldS.hope!==newS.hope)showConsequence('Hope changes',`Party Hope is now ${newS.hope}/6.`,newS.hope>oldS.hope?'good':'bad');
}



let activeOutcome=null;
function actionGerund(desc=''){
  const s=String(desc||'').trim(); if(!s)return '';
  const m=s.match(/^([A-Za-z]+)(.*)$/); if(!m)return s;
  const v=m[1].toLowerCase(),rest=m[2]||'';
  const irregular={be:'being',break:'breaking',bring:'bringing',build:'building',choose:'choosing',come:'coming',cut:'cutting',dig:'digging',do:'doing',drive:'driving',fight:'fighting',find:'finding',flee:'fleeing',get:'getting',hold:'holding',keep:'keeping',lead:'leading',leave:'leaving',make:'making',read:'reading',ride:'riding',rise:'rising',run:'running',see:'seeing',send:'sending',stand:'standing',take:'taking',wake:'waking',write:'writing'};
  let g=irregular[v];
  if(!g){
    if(v.endsWith('ie'))g=v.slice(0,-2)+'ying';
    else if(v.endsWith('e')&&!v.endsWith('ee'))g=v.slice(0,-1)+'ing';
    else g=v+'ing';
  }
  return g+rest;
}
function outcomeNarrative(payload){
  const result=payload.label||'OUTCOME';
  const hero=payload.hero?`<b>${esc(payload.hero)}</b>`:'The company';
  const action=payload.desc?esc(actionGerund(payload.desc)):'';
  if(result==='NOTHING FOUND') return `${hero} took a careful look, but nothing useful stood out this time.`;
  if(result==='DISCOVERY') return payload.desc?`${hero} ${esc(payload.desc)}.`:`${hero} noticed something useful.`;
  if(result==='SETBACK') return payload.failureText?esc(payload.failureText):(payload.desc?`${hero} attempted to ${esc(payload.desc)}, but the plan did not work. The consequences now have to be faced.`:`${hero} tried, but the plan did not work.`);
  if(result==='PARTIAL SUCCESS') return action?`${hero} succeeded in ${action}, but success came at a cost.`:`${hero} succeeded, but not without a cost.`;
  if(result==='DECISION MADE'){let d=String(payload.desc||'');if(/^do not wait\s*[—-]\s*/i.test(d))d=d.replace(/^do not wait\s*[—-]\s*/i,'press on without waiting and ');return d?`The company chose to ${esc(d)}.`:`The choice was made.`;}
  return action?`${hero} succeeded in ${action}.`:`${hero} succeeded.`;
}
function actionPast(desc=''){
  const s=String(desc||'').trim();if(!s)return '';
  const m=s.match(/^([A-Za-z]+)(.*)$/);if(!m)return s;
  const v=m[1].toLowerCase(),rest=m[2]||'';
  const irregular={be:'was able to',break:'broke',bring:'brought',build:'built',choose:'chose',come:'came',cut:'cut',dig:'dug',do:'did',drive:'drove',fight:'fought',find:'found',flee:'fled',get:'got',go:'went',hold:'held',keep:'kept',lead:'led',leave:'left',make:'made',read:'read',ride:'rode',rise:'rose',run:'ran',see:'saw',send:'sent',stand:'stood',take:'took',wake:'woke',write:'wrote'};
  let past=irregular[v];
  if(!past){if(v.endsWith('e'))past=v+'d';else if(v.endsWith('y')&&!/[aeiou]y$/.test(v))past=v.slice(0,-1)+'ied';else past=v+'ed';}
  return past+rest;
}
const destinationPhrases={"intro":"Brackencliff's cliffside excavation","briefing":"the expedition yard above Brackencliff","forge":"Rowan Marr's forge","cliff_excavation":"the exposed first mile of the Glass Road","first_mile":"the road beneath the western fields","farmstead":"Edda Varn's last farm","woodland_edge":"the Greywood fork","pine_road":"the high pine branch","charcoal_camp":"Beren Quill's charcoal camp","stag_stones":"the Stag Stones","pine_camp":"the camp above the River Tern","pine_descent":"the steep northern descent","river_road":"the River Tern branch","ferry_house":"the abandoned ferry house","drowned_marker":"the drowned milestone","river_hamlet":"Lowwater","river_camp":"the Lowwater barn","river_exit":"the flooded approach","broken_span":"the Broken Bridge","span_wave1":"the bridge approach","span_choice":"the centre of the Broken Bridge","span_final":"the singing bridge","after_span":"the far side of the Broken Bridge","hollowmere":"Hollowmere","hollow_inn":"the Lantern Inn","hollow_forge":"Sella Vorr's mountain forge","hollow_records":"the toll-house archive","mountain_departure":"the Crown Pass approach","ridge1":"the Wind Stair","ridge2":"the Bell Cairn","ridge3":"the White Ledge","tunnel1":"the hidden door","tunnel2":"the water galleries","tunnel3":"the sealed chamber","pass_reunion":"the high saddle at Crown Pass","final_view":"the high marker beyond the first crossing"};
function scenePlace(sceneId){
  const sc=scenes[sceneId];
  if(destinationPhrases[sceneId]) return destinationPhrases[sceneId];
  if(!sc?.title) return 'the next stretch of the journey';
  return /^(the|a|an)\s/i.test(sc.title) ? sc.title : `the ${sc.title}`;
}
function routeClause(desc=''){
  const s=String(desc||'').toLowerCase();
  if(!s) return '';
  if(s.includes('road')) return ' along the road';
  if(s.includes('forest')) return ' through the forest';
  if(s.includes('ridge')) return ' along the ridge';
  if(s.includes('river')) return ' along the river';
  if(s.includes('bridge')) return ' over the bridge';
  if(s.includes('ledge')) return ' along the ledge';
  if(s.includes('causeway')) return ' by the causeway';
  if(s.includes('marsh')) return ' through the marsh';
  if(s.includes('stairs')) return ' by the stairs';
  if(s.includes('tunnel')||s.includes('culvert')) return ' through the tunnel';
  if(s.includes('gate')) return ' toward the gate';
  if(s.includes('dock')||s.includes('wharf')) return ' toward the docks';
  return '';
}
function groupLabel(payload){
  return payload.hero ? `${payload.hero} and the company` : 'The company';
}
function transitionBridge(payload){
  if(!payload?.nextScene) return null;
  const from=scenePlace(payload.fromScene);
  const to=scenePlace(payload.nextScene);
  const route=routeClause(payload.desc||'');
  const actor=groupLabel(payload);
  if(payload.label==='SETBACK'){
    const setback=payload.failureText || `${payload.hero||'The acting hero'} could not ${String(payload.desc||'complete the task')}.`;
    return `${setback} From ${from}, the company is forced onward${route} toward ${to}.`;
  }
  if(payload.label==='PARTIAL SUCCESS'){
    return `${actor} got the job done, but not cleanly. From ${from}, the company presses on${route} toward ${to}, carrying the cost of that result with them.`;
  }
  if(payload.label==='DISCOVERY'){
    return `${actor} noticed something important. From ${from}, the company moves on${route} toward ${to} with a clearer sense of the way ahead.`;
  }
  if(payload.label==='NOTHING FOUND'){
    return `Nothing useful revealed itself at ${from}, so the company keeps moving${route} toward ${to}.`;
  }
  if(payload.label==='DECISION MADE'){
    return `The company ${actionPast(payload.desc||'chose the next path')}. From ${from}, they set out${route} toward ${to}.`;
  }
  const past=actionPast(payload.desc||'pressed on');
  return `${payload.hero||'The company'} successfully ${past}. From ${from}, the company moves on${route} toward ${to}.`;
}
function dialoguePortrait(speaker=''){const hit=Object.values(npcInfo||{}).find(n=>n.name===speaker||speaker.includes(n.name.split(' ').slice(-1)[0]));return hit?.img||null;}
function renderOutcome(){
  const payload=activeOutcome;if(!payload)return;
  const result=payload.label||'OUTCOME';
  $('outcomeLabel').textContent=result;
  $('outcomeTitle').textContent=result==='SUCCESS'?'Success':result==='PARTIAL SUCCESS'?'Success — at a cost':result==='DISCOVERY'?'Discovery':result==='NOTHING FOUND'?'Nothing unusual':result==='SETBACK'?'Setback':'Decision made';
  $('outcomeBody').innerHTML=outcomeNarrative(payload);
  const moments=[];
  if(payload.heroicMoment)moments.push(`<div class="heroic-callout">✨ <b>HEROIC MOMENT</b> — ${esc(payload.heroicEffect||'The exceptional roll creates an extra advantage.')}</div>`);
  if(payload.complication)moments.push(`<div class="complication-callout">⚠️ <b>UNEXPECTED COMPLICATION</b> — ${esc(payload.complicationEffect||'Something else goes wrong despite the main action.')}</div>`);
  if(payload.successes!=null&&payload.teamSize)moments.push(`<div class="outcome-team-score"><b>${payload.successes}/${payload.teamSize}</b> team roles succeeded.</div>`);
  if(payload.partialEffect)moments.push(`<div class="outcome-team-score"><b>Cost:</b> ${esc(payload.partialEffect)}</div>`);
  if(payload.dialogue){const d=payload.dialogue,img=dialoguePortrait(d.speaker||'');moments.push(`<div class="dialogue-result ${img?'with-portrait':''}">${img?`<img class="dialogue-portrait" src="${img}" alt="${esc(d.speaker||'NPC')}">`:''}<div class="dialogue-copy">${d.speaker?`<div class="dialogue-speaker">${esc(d.speaker)}</div>`:''}<p>“${esc(d.text||'')}”</p>${d.extra?`<p class="dialogue-extra">${esc(d.extra)}</p>`:''}${d.clue?`<div class="dialogue-clue">📖 <b>Journal updated:</b> ${esc(d.clue.title)}</div>`:''}${d.relationship?`<div class="dialogue-clue">🤝 <b>${esc(d.relationship.name||d.relationship.id)}</b>: ${esc(d.relationship.status||'relationship changed')}</div>`:''}</div></div>`);setTimeout(()=>playSound('dialogue'),80);}
  if(result==='SETBACK'&&payload.consequenceText)moments.push(`<div class="outcome-team-score setback-cost"><b>Consequence:</b> ${esc(payload.consequenceText)}</div>`);
  $('outcomeMoments').innerHTML=moments.join('');
  $('outcomeNext').innerHTML='';
  $('outcomeContinue').textContent='Continue';
}
function showOutcome(payload){
  const modal=$('outcomeModal');if(!modal)return;
  suppressNextSceneReveal=true;activeOutcome=payload;renderOutcome();modal.classList.remove('hidden');playSound(payload.label==='SETBACK'?'fail':'success');
}
socket.on('outcome',showOutcome);
if($('outcomeContinue'))$('outcomeContinue').onclick=()=>{if(!$('outcomeModal'))return;const bridgeText=transitionBridge(activeOutcome);if(bridgeText&&activeOutcome?.nextScene)pendingStoryBridge={scene:activeOutcome.nextScene,text:bridgeText};$('outcomeModal').classList.add('hidden');activeOutcome=null;if(state?.phase==='playing')renderGame();};
socket.on('skillPointEarned',x=>{playSound('success');showSpotlight('HERO ADVANCEMENT','Skill Point Earned','Open My Hero to choose one skill to improve. Your hero is becoming something more.',portraitPath(player()?.cls,player()?.portrait),2800);showConsequence('Skill Point earned!','Open My Hero to improve one skill.','good');if($('heroSheetModal')&&!$('heroSheetModal').classList.contains('hidden'))renderHeroSheet();});
socket.on('talentEarned',x=>{playSound('success');showSpotlight('ADVANCED PATH UNLOCKED',x.talent,x.desc,portraitPath(player()?.cls,player()?.portrait),3200);showConsequence(`${x.talent} unlocked`,x.desc,'good');if(!$('heroSheetModal').classList.contains('hidden'))renderHeroSheet();});
socket.on('reputationEarned',x=>{playSound('success');showSpotlight('REPUTATION EARNED',x.title,x.desc||'The company has begun to know your hero for this.',portraitPath(player()?.cls,player()?.portrait),3300);showConsequence(`Known as ${x.title}`,x.desc||'Your repeated choices are becoming part of your hero’s story.','good');});
socket.on('gearDamaged',x=>{playSound('fail');const text=x.condition<=0?`${x.gear||'Your equipment'} has been badly damaged. Its upgrade bonuses are offline until repaired.`:`${x.gear||'Your equipment'} is worn (${x.condition}/${x.max}). A blacksmith can restore it.`;showConsequence(x.condition<=0?'Equipment damaged':'Equipment worn',text,'bad');if($('heroSheetModal')&&!$('heroSheetModal').classList.contains('hidden'))renderHeroSheet();});
socket.on('itemFound',it=>{playSound('success');const modal=document.createElement('div');modal.className='item-modal';modal.innerHTML=`<div class="item-modal__card"><div style="font-size:3rem">${it.icon||'🎒'}</div><div class="eyebrow">ITEM DISCOVERED</div><h2>${esc(it.name)}</h2><p>${esc(it.desc||'')}</p><button class="btn btn-success full">Add to the Expedition</button></div>`;document.body.appendChild(modal);modal.querySelector('button').onclick=()=>modal.remove();});

