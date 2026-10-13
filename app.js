/* ===== DATA: TA -> specialty -> condition ===== */
const TAS=[
 {key:"CVRM",label:"Cardiovascular, Renal & Metabolic",short:"CVRM",color:"#2B65B5",specs:["Cardio","Metabolic","Hepatology / MASH","Renal"]},
 {key:"NEUR",label:"Neuroscience",short:"Neuroscience",color:"#5B489A",specs:["Neurodegeneration","Psychiatry"]},
 {key:"INFL",label:"Inflammation / Autoimmune / MSK",short:"Inflammation / IAM",color:"#B87520",specs:["Dermatology","Gastroenterology"]},
 {key:"RESP",label:"Respiratory",short:"Respiratory",color:"#1A7D7D",specs:["Respiratory"]},
 {key:"OPHT",label:"Ophthalmology",short:"Ophthalmology",color:"#27784A",specs:["Ophthalmology"]},
 {key:"HEME",label:"Hematology (Non-Malignant)",short:"Hematology",color:"#C04030",specs:["Hematology"]}
];
const TA_BY=Object.fromEntries(TAS.map(t=>[t.key,t]));
/* [name,count,taKey,spec,geneOrNull] */
const RAW=[
["Hypertension",181519,"CVRM","Cardio"],["Arrhythmias",75879,"CVRM","Cardio"],["ASCVD",57553,"CVRM","Cardio","LDLR"],
["Thrombosis",23913,"CVRM","Cardio"],["Heart failure",20374,"CVRM","Cardio"],["Secondary dilated CM",3188,"CVRM","Cardio"],
["Primary dilated CM",2216,"CVRM","Cardio"],["Hypertrophic CM",1340,"CVRM","Cardio","MYBPC3"],["Amyloidosis",802,"CVRM","Cardio","TTR"],
["Obesity",171569,"CVRM","Metabolic"],["T2DM",67412,"CVRM","Metabolic"],["GLP-1 cohort",95248,"CVRM","Metabolic"],
["Dyslipidemia",17660,"CVRM","Metabolic","LDLR"],["T1DM",5745,"CVRM","Metabolic"],
["MASH at risk",51066,"CVRM","Hepatology / MASH"],["MASH high-risk",31266,"CVRM","Hepatology / MASH"],["MASH",3981,"CVRM","Hepatology / MASH"],
["CKD",33787,"CVRM","Renal"],["AKI",20550,"CVRM","Renal"],["IgA nephropathy",302,"CVRM","Renal"],
["Anxiety disorders",213809,"NEUR","Psychiatry"],["Major depressive disorder",110278,"NEUR","Psychiatry"],["Substance use disorders",107931,"NEUR","Psychiatry"],
["Insomnia",99532,"NEUR","Psychiatry"],["ADHD",39154,"NEUR","Psychiatry"],["Bipolar disorder",17517,"NEUR","Psychiatry"],
["Narcolepsy",2456,"NEUR","Psychiatry"],["Schizophrenia",971,"NEUR","Psychiatry"],
["Dementia",3936,"NEUR","Neurodegeneration"],["Multiple sclerosis",3919,"NEUR","Neurodegeneration"],["Parkinson's disease",1965,"NEUR","Neurodegeneration"],
["Alzheimer's disease",998,"NEUR","Neurodegeneration"],["ALS",136,"NEUR","Neurodegeneration"],["SMA",79,"NEUR","Neurodegeneration"],
["Huntington's disease",58,"NEUR","Neurodegeneration"],["X-linked muscular dystrophy",30,"NEUR","Neurodegeneration"],
["Psoriasis",14862,"INFL","Dermatology"],["Atopic dermatitis",12651,"INFL","Dermatology"],
["Celiac disease",4852,"INFL","Gastroenterology"],["Crohn's disease",4326,"INFL","Gastroenterology"],["Ulcerative colitis",3766,"INFL","Gastroenterology"],["Eosinophilic esophagitis",3094,"INFL","Gastroenterology"],
["Asthma",80675,"RESP","Respiratory"],["COPD",23368,"RESP","Respiratory"],["PAH",6586,"RESP","Respiratory"],["ARDS",477,"RESP","Respiratory"],
["IPF",387,"RESP","Respiratory"],["Cystic fibrosis",365,"RESP","Respiratory","CFTR"],["Progressive fibrosing ILD",26,"RESP","Respiratory"],
["Dry eye disease",27289,"OPHT","Ophthalmology"],["Glaucoma",8179,"OPHT","Ophthalmology"],["Age-related macular degeneration",4185,"OPHT","Ophthalmology"],
["Uveitis",3466,"OPHT","Ophthalmology"],["Diabetic macular edema",1206,"OPHT","Ophthalmology"],["Retinal vein occlusion",818,"OPHT","Ophthalmology"],
["Diabetic retinopathy",694,"OPHT","Ophthalmology"],["Inherited retinal diseases",173,"OPHT","Ophthalmology"],
["ITP",3830,"HEME","Hematology"],["Thalassemias",1409,"HEME","Hematology"],["Sickle cell disease",850,"HEME","Hematology"],["MDS",533,"HEME","Hematology"],
["Hemophilia & bleeding disorders",248,"HEME","Hematology"],["Aplastic anemia",239,"HEME","Hematology"],["Congenital dyserythropoietic anemia",24,"HEME","Hematology"],["Pyruvate kinase deficiency",5,"HEME","Hematology"]
];
const DESC={
"Hypertension":"Chronically elevated blood pressure, including resistant and pulmonary forms, and a leading driver of cardiovascular risk.",
"Arrhythmias":"Disorders of heart rhythm, from atrial fibrillation to conduction defects.",
"ASCVD":"Plaque-driven arterial disease that underlies heart attack and stroke.",
"Thrombosis":"Pathologic blood clot formation in veins or arteries.",
"Heart failure":"The heart's reduced ability to pump, spanning preserved and reduced ejection fraction.",
"Secondary dilated CM":"A dilated, weakened heart muscle arising from another underlying cause.",
"Primary dilated CM":"Dilated cardiomyopathy with no identifiable secondary cause, often genetic.",
"Hypertrophic CM":"Inherited thickening of the heart muscle and a common cause of sudden cardiac death in the young.",
"Amyloidosis":"Deposition of misfolded protein in tissue, including the heart, as in transthyretin amyloidosis.",
"Obesity":"Excess adiposity that raises risk across metabolic and cardiovascular disease.",
"T2DM":"Insulin-resistant type 2 diabetes and its downstream complications.",
"GLP-1 cohort":"Participants eligible for or treated with GLP-1 receptor agonists.",
"Dyslipidemia":"Abnormal cholesterol or triglyceride levels that accelerate atherosclerosis.",
"T1DM":"Autoimmune loss of insulin-producing beta cells, requiring lifelong insulin.",
"MASH at risk":"Participants at elevated risk of progressing to metabolic steatohepatitis.",
"MASH high-risk":"Participants at high risk of MASH-related fibrosis progression.",
"MASH":"Metabolic dysfunction-associated steatohepatitis: inflammation and fibrosis in a fatty liver.",
"CKD":"Progressive, long-standing loss of kidney function.",
"AKI":"A sudden, often reversible decline in kidney function.",
"IgA nephropathy":"An immune-mediated kidney disease driven by IgA deposition.",
"Anxiety disorders":"Persistent, excessive anxiety across generalized, panic, and related disorders.",
"Major depressive disorder":"Recurrent low mood and loss of interest with functional impairment.",
"Substance use disorders":"Compulsive substance use that continues despite harm.",
"Insomnia":"Chronic difficulty falling or staying asleep.",
"ADHD":"A neurodevelopmental disorder of attention and impulse control.",
"Bipolar disorder":"Cycling between depressive and manic or hypomanic episodes.",
"Narcolepsy":"A chronic disorder of sleep-wake regulation with excessive daytime sleepiness.",
"Schizophrenia":"A chronic psychotic disorder affecting thought, perception, and affect.",
"Dementia":"Progressive decline in memory and cognition, including Alzheimer's and related types.",
"Multiple sclerosis":"An immune-mediated demyelinating disease of the central nervous system.",
"Parkinson's disease":"A progressive movement disorder caused by dopaminergic neuron loss.",
"Alzheimer's disease":"The most common neurodegenerative cause of dementia.",
"ALS":"Amyotrophic lateral sclerosis: progressive loss of motor neurons.",
"SMA":"Spinal muscular atrophy: inherited motor neuron degeneration.",
"Huntington's disease":"An inherited, fatal neurodegenerative disorder from a CAG repeat expansion.",
"X-linked muscular dystrophy":"Inherited muscle-wasting disorders such as Duchenne and Becker.",
"Psoriasis":"A chronic immune-mediated skin disease with scaly plaques.",
"Atopic dermatitis":"Chronic inflammatory, itchy skin disease, commonly called eczema.",
"Celiac disease":"An immune reaction to gluten that damages the small intestine.",
"Crohn's disease":"Chronic inflammatory bowel disease that can affect any part of the GI tract.",
"Ulcerative colitis":"Chronic inflammatory bowel disease of the colon and rectum.",
"Eosinophilic esophagitis":"Allergic, eosinophil-driven inflammation of the esophagus.",
"Asthma":"Chronic airway inflammation causing reversible airflow obstruction.",
"COPD":"Chronic obstructive pulmonary disease: progressive airflow limitation.",
"PAH":"Pulmonary arterial hypertension: high pressure in the lung arteries.",
"ARDS":"Acute respiratory distress syndrome: severe inflammatory lung injury.",
"IPF":"Idiopathic pulmonary fibrosis: progressive scarring of the lungs.",
"Cystic fibrosis":"An inherited CFTR disorder causing thick secretions and lung disease.",
"Progressive fibrosing ILD":"Interstitial lung diseases with a progressive fibrosing phenotype.",
"Dry eye disease":"Chronic tear film dysfunction causing ocular discomfort.",
"Glaucoma":"Progressive optic nerve damage, often with raised eye pressure.",
"Age-related macular degeneration":"A leading cause of central vision loss with age, in wet and dry forms.",
"Uveitis":"Non-infectious inflammation of the eye's uveal tract.",
"Diabetic macular edema":"Fluid-driven swelling of the central retina in diabetes.",
"Retinal vein occlusion":"Blockage of retinal venous drainage.",
"Diabetic retinopathy":"Diabetes-driven damage to the retinal blood vessels.",
"Inherited retinal diseases":"Genetic retinal disorders such as retinitis pigmentosa.",
"ITP":"Immune thrombocytopenic purpura: immune-mediated low platelet counts.",
"Thalassemias":"Inherited disorders of hemoglobin production causing anemia.",
"Sickle cell disease":"An inherited hemoglobinopathy causing painful vaso-occlusive crises.",
"MDS":"Myelodysplastic syndromes: clonal disorders of ineffective blood cell production.",
"Hemophilia & bleeding disorders":"Inherited deficiencies of clotting factors causing bleeding.",
"Aplastic anemia":"Bone marrow failure with reduced production of all blood cells.",
"Congenital dyserythropoietic anemia":"A rare inherited defect of red blood cell production.",
"Pyruvate kinase deficiency":"An inherited enzyme defect causing chronic hemolytic anemia."
};
const GENES={
LDLR:{plp:2072,plpVariants:296,top:"",cond:"Familial hypercholesterolemia drives early ASCVD. Pathogenic LDLR variants are its leading monogenic cause."},
TTR:{plp:1333,plpVariants:24,top:"p.Val142Ile",cond:"Transthyretin amyloidosis. The common cardiac variant p.Val142Ile accounts for most carriers here."},
MYBPC3:{plp:1004,plpVariants:147,top:"",cond:"The leading sarcomeric cause of hypertrophic cardiomyopathy."},
CFTR:{plp:31587,plpVariants:415,top:"p.Phe508del",cond:"Cystic fibrosis. p.Phe508del is the most common CF-causing variant in the cohort."}};
const LINKS=[
{gene:"CFTR",plp:31587,cond:"Cystic fibrosis",cc:365,line:"Carriers vastly outnumber diagnosed cases, a reservoir for screening and carrier studies."},
{gene:"LDLR",plp:2072,cond:"ASCVD cohort",cc:57553,line:"Pathogenic carriers sit inside a large cardiovascular population to follow over time."},
{gene:"TTR",plp:1333,cond:"Amyloidosis",cc:802,line:"The genetic and diagnosed populations can be reconciled participant by participant."},
{gene:"MYBPC3",plp:1004,cond:"Hypertrophic cardiomyopathy",cc:1340,line:"Nearly matched carrier and clinical cohorts for penetrance and outcome work."}];
const COND=RAW.map(r=>({name:r[0],count:r[1],taKey:r[2],spec:r[3],gene:r[4]||null,desc:DESC[r[0]]||""}));

const fmt=n=>n.toLocaleString('en-US');
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/"/g,'&quot;');
const clamp=(a,b,v)=>Math.max(a,Math.min(b,v));
const byTA={},byTS={};
TAS.forEach(t=>byTA[t.key]=[]);
COND.forEach(c=>{byTA[c.taKey].push(c);const k=c.taKey+'|'+c.spec;(byTS[k]=byTS[k]||[]).push(c);});
Object.values(byTA).forEach(a=>a.sort((x,y)=>y.count-x.count));
Object.values(byTS).forEach(a=>a.sort((x,y)=>y.count-x.count));
function specColor(taKey,spec){const base=TA_BY[taKey].color;const i=TA_BY[taKey].specs.indexOf(spec);
  const shades=[0,-16,14,-28,26];return shade(base,shades[(i+shades.length)%shades.length]);}
function shade(hex,amt){let n=parseInt(hex.slice(1),16),r=(n>>16)+amt,g=((n>>8)&255)+amt,b=(n&255)+amt;
  r=clamp(0,255,r);g=clamp(0,255,g);b=clamp(0,255,b);return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
function condR(c){return clamp(5,18,0.039*Math.sqrt(c.count));}

function helixPath(x1,y1,x2,y2,amp,ph){const dx=x2-x1,dy=y2-y1,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,px=-uy,py=ux;
  const turns=Math.max(2,Math.round(L/30)),seg=Math.max(16,turns*7);let d="";
  for(let i=0;i<=seg;i++){const t=i/seg,bx=x1+dx*t,by=y1+dy*t,off=Math.sin(t*turns*6.2832+ph)*amp,x=bx+px*off,y=by+py*off;d+=(i?"L":"M")+x.toFixed(1)+" "+y.toFixed(1);}return d;}

const HUBR=42,R1=172;
function taGeo(i){const ang=(-90+i*(360/TAS.length))*Math.PI/180;return {ang,x:Math.cos(ang)*R1,y:Math.sin(ang)*R1};}
let state={level:'ta',ta:null,spec:null};
let zoom={z:1,px:0,py:0};

function render(){
  const bb=[],push=(x,y,r)=>bb.push({x,y,r:r||0});
  push(0,0,215);
  let strands='',taG='',specG='',bloom='';
  let rings='';[70,140,210].forEach(r=>rings+=`<circle class="ring" cx="0" cy="0" r="${r}"></circle>`);
  TAS.forEach((t,i)=>{
    const g=taGeo(i),taDim=state.ta&&state.ta!==t.key?' dim':'';
    strands+=`<path class="hstrand${taDim}" d="${helixPath(0,0,g.x,g.y,4,0)}" stroke="${t.color}" stroke-opacity="0.55" stroke-width="1.4"></path>`;
    strands+=`<path class="hstrand${taDim}" d="${helixPath(0,0,g.x,g.y,4,Math.PI)}" stroke="${t.color}" stroke-opacity="0.3" stroke-width="1.2"></path>`;
    taG+=`<g class="ta${taDim}" data-ta="${t.key}" tabindex="0" role="button" aria-label="${esc(t.label)}, open">
      <circle cx="${g.x.toFixed(1)}" cy="${g.y.toFixed(1)}" r="25" fill="${t.color}"></circle>
      <text class="tlabel" x="${g.x.toFixed(1)}" y="${(g.y+ (g.y<0?-35:41)).toFixed(1)}" fill="${t.color}" font-size="13">${esc(t.short)}</text></g>`;
    push(g.x,g.y,36);
    if(state.ta===t.key){
      const specs=t.specs,n=specs.length,base=g.ang;
      const span=n>1?clamp(0.6,2.4,n*0.5):0;
      specs.forEach((sp,si)=>{
        const a=n>1?base-span/2+span*(si/(n-1)):base;
        const sx=g.x+Math.cos(a)*90,sy=g.y+Math.sin(a)*90,sc=specColor(t.key,sp);
        const spDim=state.spec&&state.spec!==sp?' dim':'';
        strands+=`<path class="hstrand${spDim}" d="${helixPath(g.x,g.y,sx,sy,3,0)}" stroke="${sc}" stroke-opacity="0.5" stroke-width="1.2"></path>`;
        specG+=`<g class="spec${spDim}" data-ta="${t.key}" data-spec="${esc(sp)}" tabindex="0" role="button" aria-label="${esc(sp)} specialty, open">
          <circle cx="${sx.toFixed(1)}" cy="${sy.toFixed(1)}" r="16" fill="${sc}"></circle>
          <text class="slabel" x="${sx.toFixed(1)}" y="${(sy+(Math.sin(a)<0?-23:29)).toFixed(1)}" fill="${sc}" font-size="11">${esc(sp)}</text></g>`;
        push(sx,sy,26);
        if(state.spec===sp){
          const list=byTS[t.key+'|'+sp].map(c=>({...c,r:condR(c)}));
          const n=list.length;
          const span=n>1?clamp(0.9,2.7,n*0.34):0, dAng=n>1?span/(n-1):0;
          let maxPair=0;for(let i=0;i<n-1;i++)maxPair=Math.max(maxPair,list[i].r+list[i+1].r);
          let R=n>1?Math.max(74,(maxPair+16)/(2*Math.sin(dAng/2))):74;R=Math.min(R,160);
          list.forEach((c,i)=>{
            const ai=n>1?a-span/2+span*(i/(n-1)):a;
            const ux=Math.cos(ai),uy=Math.sin(ai),nx=sx+ux*R,ny=sy+uy*R,nr=c.r;
            bloom+=`<path class="twig" d="${helixPath(sx,sy,nx,ny,2.2,0)}" fill="none" stroke="${sc}" stroke-opacity="0.4" stroke-width="1"></path>`;
            bloom+=`<g class="bub" data-name="${esc(c.name)}" tabindex="0" role="button" aria-label="${esc(c.name)}, ${fmt(c.count)} participants">
              <circle cx="${nx.toFixed(1)}" cy="${ny.toFixed(1)}" r="${nr.toFixed(1)}" fill="${sc}" fill-opacity="0.92" stroke="${sc}" stroke-width="1"></circle>`;
            const inside=nr>=12;
            if(inside)bloom+=`<text class="cin" x="${nx.toFixed(1)}" y="${(ny+3.5).toFixed(1)}" font-size="${Math.min(11,nr*0.8).toFixed(1)}">${aK(c.count)}</text>`;
            const anchor=ux>=-0.08?'start':'end',lx=nx+ux*(nr+8),ly=ny+uy*(nr+8);
            const lines=wrapLabel(c.name,18);
            const y0=ly-(lines.length-1)*5.5+(inside?0:-4);
            let tsp='';lines.forEach((ln,li)=>{tsp+=`<tspan x="${lx.toFixed(1)}" dy="${li===0?0:11}">${esc(ln)}</tspan>`;});
            bloom+=`<text class="clabel" y="${y0.toFixed(1)}" style="text-anchor:${anchor}" font-size="10.5">${tsp}</text>`;
            if(!inside)bloom+=`<text class="csub" x="${lx.toFixed(1)}" y="${(y0+lines.length*11).toFixed(1)}" style="text-anchor:${anchor}" font-size="8.5">${fmt(c.count)}</text>`;
            bloom+=`</g>`;
            push(nx,ny,nr);push(lx+(anchor==='start'?90:-90),ly,10);
          });
        }
      });
    }
  });
  let minX=1e9,minY=1e9,maxX=-1e9,maxY=-1e9;bb.forEach(o=>{minX=Math.min(minX,o.x-o.r);minY=Math.min(minY,o.y-o.r);maxX=Math.max(maxX,o.x+o.r);maxY=Math.max(maxY,o.y+o.r);});
  const pad=30;minX-=pad;minY-=pad;maxX+=pad;maxY+=pad;
  const vb=`${minX.toFixed(0)} ${minY.toFixed(0)} ${(maxX-minX).toFixed(0)} ${(maxY-minY).toFixed(0)}`;
  const hub=`<g class="hub" tabindex="0" role="button" aria-label="GenoSphere"><circle cx="0" cy="0" r="${HUBR}"></circle><text x="0" y="-3" font-size="13">GenoSphere</text><text x="0" y="14" font-size="8.5" fill="#bfe6c2">560K+ participants</text></g>`;
  const svg=`<svg viewBox="${vb}" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Therapeutic-area web"><g class="rings">${rings}</g>${strands}${taG}${specG}${bloom}${hub}</svg>`;
  const host=document.getElementById('svgHost');host.classList.add('swap');
  setTimeout(()=>{host.innerHTML=svg;host.classList.remove('swap');applyZoom();bindWeb();applySearch(document.getElementById('mapSearch').value);},80);
}
function aK(n){return n>=1000?(n/1000).toFixed(n<10000?1:0)+'K':''+n;}
function wrapLabel(s,m){const w=s.split(' '),lines=[];let cur='';
  for(const word of w){if(((cur+' '+word).trim()).length<=m){cur=(cur+' '+word).trim();}else{if(cur)lines.push(cur);cur=word;}if(lines.length>=2){break;}}
  if(cur&&lines.length<2)lines.push(cur);
  if(lines.join(' ').length<s.length&&lines.length)lines[lines.length-1]+='…';
  return lines.slice(0,2);}
function bindWeb(){
  document.querySelectorAll('#svgHost .ta').forEach(a=>{const k=a.dataset.ta;
    a.addEventListener('click',ev=>{ev.stopPropagation();openTA(k);});
    a.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openTA(k);}});
    a.addEventListener('mousemove',e=>showTip(e,TA_BY[k].label,byTA[k].length+' conditions'));a.addEventListener('mouseleave',hideTip);});
  document.querySelectorAll('#svgHost .spec').forEach(s=>{const k=s.dataset.ta,sp=s.dataset.spec;
    s.addEventListener('click',ev=>{ev.stopPropagation();openSpec(k,sp);});
    s.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openSpec(k,sp);}});
    s.addEventListener('mousemove',e=>showTip(e,sp,byTS[k+'|'+sp].length+' conditions'));s.addEventListener('mouseleave',hideTip);});
  const hub=document.querySelector('#svgHost .hub');if(hub){hub.addEventListener('click',ev=>{ev.stopPropagation();toOverview();});hub.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();toOverview();}});}
  document.querySelectorAll('#svgHost .bub').forEach(b=>{
    b.addEventListener('click',ev=>{ev.stopPropagation();openDrawer(b.dataset.name);});
    b.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();openDrawer(b.dataset.name);}});
    b.addEventListener('mousemove',e=>{const c=COND.find(x=>x.name===b.dataset.name);if(c)showTip(e,c.name,fmt(c.count)+' participants');});b.addEventListener('mouseleave',hideTip);});
}
function openTA(k){const t=TA_BY[k];
  if(t.specs.length===1){openSpec(k,t.specs[0]);return;}
  state={level:'spec',ta:k,spec:null};setBack('Back to all areas');
  document.getElementById('stageTitle').innerHTML=`<b>${esc(t.label)}</b> &middot; choose a specialty`;render();}
function openSpec(k,sp){const t=TA_BY[k];state={level:'cond',ta:k,spec:sp};
  setBack(t.specs.length>1?('Back to '+t.short):'Back to all areas');
  document.getElementById('stageTitle').innerHTML=`<b>${esc(sp)}</b> &middot; ${esc(t.label)} &middot; ${byTS[k+'|'+sp].length} conditions`;render();}
function toOverview(){state={level:'ta',ta:null,spec:null};document.getElementById('backChip').style.display='none';
  document.getElementById('stageTitle').textContent='Click a therapeutic area to open it';render();}
function goBack(){if(state.level==='cond'&&TA_BY[state.ta].specs.length>1){openTA(state.ta);}else{toOverview();}}
function setBack(l){document.getElementById('backChip').style.display='inline-flex';document.getElementById('backLabel').textContent=l;}

/* zoom + pan */
function applyZoom(){const s=document.querySelector('#svgHost svg');if(s)s.style.transform=`scale(${zoom.z}) translate(${zoom.px}px,${zoom.py}px)`;}
document.getElementById('zIn').onclick=()=>{zoom.z=clamp(0.5,4,zoom.z*1.25);applyZoom();};
document.getElementById('zOut').onclick=()=>{zoom.z=clamp(0.5,4,zoom.z/1.25);applyZoom();};
document.getElementById('zReset').onclick=()=>{zoom={z:1,px:0,py:0};applyZoom();};
(function(){const host=document.getElementById('svgHost');let drag=false,sx,sy;
  host.addEventListener('mousedown',e=>{if(e.target.closest('.bub,.ta,.spec,.hub'))return;drag=true;sx=e.clientX;sy=e.clientY;const s=host.querySelector('svg');if(s)s.classList.add('grabbing');});
  window.addEventListener('mousemove',e=>{if(!drag)return;zoom.px+=(e.clientX-sx)/zoom.z;zoom.py+=(e.clientY-sy)/zoom.z;sx=e.clientX;sy=e.clientY;applyZoom();});
  window.addEventListener('mouseup',()=>{drag=false;const s=host.querySelector('svg');if(s)s.classList.remove('grabbing');});
})();
function toggleTut(open){document.getElementById('tut').classList.toggle('open',open);}
document.getElementById('zHelp').onclick=()=>toggleTut(true);

/* ranked */
function renderBars(){let h='<div class="bars">';
  TAS.forEach(t=>{t.specs.forEach(sp=>{const list=byTS[t.key+'|'+sp];if(!list)return;const mx=list[0].count,sc=specColor(t.key,sp);
    h+=`<div class="bar-cat">${esc(t.short)} &middot; ${esc(sp)}</div>`;
    list.forEach(c=>{h+=`<div class="bar-row" data-name="${esc(c.name)}" onclick="openDrawer('${esc(c.name).replace(/'/g,"\\'")}')">
      <span class="bar-name">${esc(c.name)}</span><span class="bar-track"><span class="bar-fill" style="width:${Math.max(2,c.count/mx*100)}%;background:${sc}"></span></span>
      <span class="bar-val num">${fmt(c.count)}</span></div>`;});});});
  h+='</div>';document.getElementById('svgHost').innerHTML=h;applySearch(document.getElementById('mapSearch').value);}
function setView(v){document.getElementById('viewMap').setAttribute('aria-pressed',v==='map');document.getElementById('viewBars').setAttribute('aria-pressed',v==='bars');
  if(v==='bars'){state={level:'bars'};document.getElementById('backChip').style.display='none';document.getElementById('stageTitle').textContent='Every condition, ranked by participants';renderBars();}
  else toOverview();}

const tip=document.getElementById('tip');
function showTip(e,name,sub){tip.innerHTML=`<div class="tn">${esc(name)}</div><div class="tv num">${esc(sub)}</div>`;tip.style.opacity='1';tip.style.left=Math.min(e.clientX+14,window.innerWidth-250)+'px';tip.style.top=(e.clientY+14)+'px';}
function hideTip(){tip.style.opacity='0';}
function applySearch(q){q=(q||'').trim().toLowerCase();
  if(state.level==='bars'){document.querySelectorAll('.bar-row').forEach(r=>r.style.opacity=(!q||r.dataset.name.toLowerCase().includes(q))?'1':'0.22');return;}
  if(state.level==='ta'){document.querySelectorAll('#svgHost .ta').forEach(a=>{const any=q&&byTA[a.dataset.ta].some(c=>c.name.toLowerCase().includes(q));a.classList.toggle('amatch',!!any);a.classList.toggle('dim',q&&!any);});}
  else if(state.level==='spec'){document.querySelectorAll('#svgHost .spec').forEach(s=>{const any=q&&byTS[s.dataset.ta+'|'+s.dataset.spec].some(c=>c.name.toLowerCase().includes(q));s.classList.toggle('amatch',!!any);});}
  else{document.querySelectorAll('#svgHost .bub').forEach(b=>b.classList.toggle('match',q&&b.dataset.name.toLowerCase().includes(q)));}}
document.getElementById('mapSearch').addEventListener('input',e=>applySearch(e.target.value));

/* drawer with description */
function openDrawer(name){const c=COND.find(x=>x.name===name);if(!c)return;const t=TA_BY[c.taKey],sc=specColor(c.taKey,c.spec),prev=c.count/533825*100;
  document.getElementById('drawerArea').innerHTML=`<span class="swatch" style="background:${sc}"></span>${esc(t.label)} &middot; ${esc(c.spec)}`;
  document.getElementById('drawerName').textContent=c.name;
  let h=c.desc?`<p class="d-desc">${esc(c.desc)}</p>`:'';
  h+=`<div class="d-big num">${fmt(c.count)}</div><div class="d-big-l">participants with this condition in linked records</div>`;
  h+=`<div class="d-prev">Roughly <b>${prev.toFixed(prev<1?2:1)}%</b> of the ${fmt(533825)}-participant HRN cohort.</div>`;
  if(c.gene&&GENES[c.gene]){const g=GENES[c.gene];
    h+=`<div class="gene-link"><div class="lbl">Linked genomics, live</div><div class="gname">${c.gene}</div>
      <div class="gstat"><div><div class="n num">${fmt(g.plp)}</div><div class="l">P/LP variant carriers</div></div><div><div class="n num">${fmt(g.plpVariants)}</div><div class="l">distinct P/LP variants</div></div></div>
      <p>${esc(g.cond)}${g.top?` Most common: <b style="font-style:italic">${esc(g.top)}</b>.`:''}</p></div>`;
  }else{h+=`<div class="d-note">Genomic markers for this condition are explorable in Explorer against the full exome panel of 6,000 genes.</div>`;}
  h+=`<div class="d-note">Counts are participants with the condition in HRN-enrolled, Anuva-excluded records. Variant figures as of 15 May 2026.</div>`;
  document.getElementById('drawerBody').innerHTML=h;document.getElementById('drawer').classList.add('open');document.getElementById('scrim').classList.add('open');}
function closeDrawer(){document.getElementById('drawer').classList.remove('open');document.getElementById('scrim').classList.remove('open');}
document.addEventListener('keydown',e=>{if(e.key==='Escape'){closeDrawer();toggleTut(false);}});

/* linkage */
(function(){const host=document.getElementById('linkage');LINKS.forEach(l=>{const el=document.createElement('div');el.className='lk';
  el.innerHTML=`<div><div class="gene">${l.gene}</div><div class="plp num" style="margin-top:8px">${fmt(l.plp)}</div><div class="plp-l">pathogenic / likely-pathogenic carriers</div></div>
   <div class="arrow" aria-hidden="true"><svg width="26" height="26" viewBox="0 0 24 24" fill="none"><path d="M4 12h15M13 6l6 6-6 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></div>
   <div class="cond"><div class="cn">${l.cond}</div><div class="cc num">${fmt(l.cc)} in cohort</div></div><div class="lk-note">${l.line}</div>`;
  el.onclick=()=>{const c=COND.find(x=>x.gene===l.gene);if(c)openDrawer(c.name);};host.appendChild(el);});})();

/* clinicogenomic orbit */
const CGL={genomics:{t:"Genomics",d:"Clinical-grade exome across 6,000 genes.",c:"#8c94ad"},ehr:{t:"EHR",d:"Diagnoses, lab results and medications over time.",c:"#7ebc74"},claims:{t:"Claims",d:"Utilization signals beyond a single health system.",c:"#5fb0bf"},notes:{t:"Unstructured data",d:"Free-text clinical notes, newly linked.",c:"#e6799a"}};
const cgKeys=Object.keys(CGL);
(function(){const CX=180,CY=150,RR=92,L=[],N=[];cgKeys.forEach((k,i)=>{const a=(-90+i*90)*Math.PI/180,x=CX+Math.cos(a)*RR,y=CY+Math.sin(a)*RR,col=CGL[k].c;
  L.push(`<line class="olink" data-k="${k}" x1="${CX}" y1="${CY}" x2="${x}" y2="${y}" stroke="${col}" stroke-opacity="0.3"></line>`);
  N.push(`<g class="onode" data-k="${k}" tabindex="0" role="button" aria-label="${CGL[k].t}"><circle cx="${x}" cy="${y}" r="26" data-k="${k}" fill="${col}" fill-opacity="0.9"></circle><text x="${x}" y="${y+4}" fill="#fff" font-size="12">${k[0].toUpperCase()}</text></g>`);});
  document.getElementById('orbitLinks').innerHTML=L.join('');document.getElementById('orbitNodes').innerHTML=N.join('');})();
let cgIdx=0,cgTimer=null;
function cgSet(k,manual){cgIdx=cgKeys.indexOf(k);document.querySelectorAll('#cgLayers .layer').forEach(l=>l.setAttribute('aria-current',l.dataset.k===k));
  document.querySelectorAll('#orbit .olink').forEach(l=>l.setAttribute('stroke-opacity',l.dataset.k===k?'0.95':'0.22'));
  document.querySelectorAll('#orbit .onode circle').forEach(c=>c.setAttribute('fill-opacity',c.dataset.k===k?'1':'0.5'));
  document.getElementById('cgTitle').textContent=CGL[k].t;document.getElementById('cgDesc').textContent=CGL[k].d;if(manual&&cgTimer){clearInterval(cgTimer);cgTimer=null;}}
document.querySelectorAll('#cgLayers .layer').forEach(l=>l.addEventListener('click',()=>cgSet(l.dataset.k,true)));
document.querySelectorAll('#orbit .onode').forEach(n=>n.addEventListener('click',()=>cgSet(n.dataset.k,true)));
cgSet('genomics');

/* longitudinal */
const DOM={dx:{k:"Diagnoses",h:"ICD-10 condition history",ex:'<span class="num">E11.9</span> Type 2 diabetes &middot; <span class="num">I10</span> Hypertension &middot; <span class="num">N18.3</span> CKD stage 3, with onset dates across years.'},
  labs:{k:"Lab results",h:"Serial quantitative measurements",ex:'HbA1c <span class="num">7.8%</span> to <span class="num">6.9%</span> to <span class="num">6.4%</span> over three years. eGFR, lipids and more, tracked over time.'},
  meds:{k:"Medications",h:"RxNorm prescribing and exposure",ex:'Metformin, then a GLP-1 receptor agonist added, with start and stop dates and dose changes over time.'},
  notes:{k:"Clinical notes",h:"Unstructured free-text records",ex:'"Patient reports improved exertional tolerance since therapy change; no new chest pain." Newly linked unstructured data.'}};
const domKeys=Object.keys(DOM);let domIdx=0,domTimer=null;
function domSet(k,manual){domIdx=domKeys.indexOf(k);document.querySelectorAll('#domains .dom').forEach(d=>d.setAttribute('aria-current',d.dataset.k===k));
  const m=DOM[k];document.getElementById('lnPreview').innerHTML=`<div class="pk">${m.k}</div><h4>${m.h}</h4><div class="ex">${m.ex}</div>`;if(manual&&domTimer){clearInterval(domTimer);domTimer=null;}}
document.querySelectorAll('#domains .dom').forEach(d=>d.addEventListener('click',()=>domSet(d.dataset.k,true)));
domSet('dx');

/* resources */
const RES=[{kind:"Blog",t:"Inside GenoSphere",d:"How we build and curate the clinicogenomic dataset.",g:"linear-gradient(135deg,#2b3356,#161b33)"},
 {kind:"Partner story",t:"From hypothesis to cohort",d:"A biopharma team validates a target in weeks, not months.",g:"linear-gradient(135deg,#223b2b,#161b33)"},
 {kind:"Cohort profile",t:"Neurology cohort",d:"309,762 participants across neurodegeneration and psychiatry.",g:"linear-gradient(135deg,#3a2b4a,#161b33)"},
 {kind:"Webinar",t:"GenoSphere webinar",d:"A live walkthrough of the dataset and Explorer.",g:"linear-gradient(135deg,#2b3a4a,#161b33)"}];
(function(){const host=document.getElementById('resCards');RES.forEach(r=>{const el=document.createElement('a');el.className='rc';el.href='#';el.setAttribute('role','button');
  el.innerHTML=`<div class="rtop" style="background:${r.g}"><span class="rkind">${r.kind}</span></div><div class="rbody"><div class="rt">${r.t}</div><div class="rd">${r.d}</div><div class="rcta">Coming soon</div></div>`;
  el.addEventListener('click',e=>{e.preventDefault();alert('Resource placeholder: '+r.kind+' "'+r.t+'". Link this card to the real '+r.kind.toLowerCase()+' when published.');});host.appendChild(el);});})();

/* count-up */
const reduce=window.matchMedia('(prefers-reduced-motion:reduce)').matches;
function renderN(el,v){const s=el.dataset.suffix||'';el.innerHTML=v.toLocaleString()+(s?'<small>'+s+'</small>':'');}
function animateCount(el){const to=+el.dataset.to;if(reduce){renderN(el,to);return;}const dur=1400,t0=performance.now();(function step(t){const k=Math.min(1,(t-t0)/dur),e=1-Math.pow(1-k,3);renderN(el,Math.round(to*e));if(k<1)requestAnimationFrame(step);})(performance.now());}
const io=new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting){animateCount(en.target);io.unobserve(en.target);}}),{threshold:.3});
document.querySelectorAll('#readout .n[data-to]').forEach(el=>{renderN(el,0);io.observe(el);});

/* explorer video (local mp4) */
const ev=document.getElementById('expVideo');
function playExplorer(){ev.innerHTML='<video src="Explorer-Demo-Summit.mp4" controls autoplay playsinline></video>';}
ev.addEventListener('click',playExplorer);ev.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();playExplorer();}});

/* hero network */
(function(){const cv=document.getElementById('net'),ctx=cv.getContext('2d'),hero=document.getElementById('top');
  let W=0,H=0,dpr=Math.min(window.devicePixelRatio||1,2),nodes=[],mouse={x:-999,y:-999},raf=null;const COLORS=['#8c94ad','#8c94ad','#8c94ad','#5b6aa0','#4A8B5C'];
  function size(){W=hero.clientWidth;H=hero.clientHeight;cv.width=W*dpr;cv.height=H*dpr;cv.style.width=W+'px';cv.style.height=H+'px';ctx.setTransform(dpr,0,0,dpr,0,0);
    const n=Math.round(clamp(46,120,W*H/14000));nodes=[];for(let i=0;i<n;i++)nodes.push({x:Math.random()*W,y:Math.random()*H,vx:(Math.random()-.5)*.28,vy:(Math.random()-.5)*.28,r:Math.random()*1.8+1.1,c:COLORS[Math.floor(Math.random()*COLORS.length)]});
    for(let i=0;i<4;i++){const nd=nodes[Math.floor(Math.random()*nodes.length)];nd.c='#d43c66';nd.r=2.6;}}
  function frame(){ctx.clearRect(0,0,W,H);const D=132;for(let i=0;i<nodes.length;i++){const a=nodes[i];a.x+=a.vx;a.y+=a.vy;if(a.x<0||a.x>W)a.vx*=-1;if(a.y<0||a.y>H)a.vy*=-1;
    for(let j=i+1;j<nodes.length;j++){const b=nodes[j],dx=a.x-b.x,dy=a.y-b.y,d=Math.hypot(dx,dy);if(d<D){ctx.globalAlpha=(1-d/D)*.18;ctx.strokeStyle='#9aa6d4';ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}
    const mdx=a.x-mouse.x,mdy=a.y-mouse.y,md=Math.hypot(mdx,mdy);if(md<170){ctx.globalAlpha=(1-md/170)*.5;ctx.strokeStyle='#bfe6c2';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();a.vx+=mdx/md*.004;a.vy+=mdy/md*.004;}
    a.vx=clamp(-.6,.6,a.vx);a.vy=clamp(-.6,.6,a.vy);}ctx.globalAlpha=1;nodes.forEach(a=>{ctx.fillStyle=a.c;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,6.283);ctx.fill();});raf=requestAnimationFrame(frame);}
  function stat(){ctx.clearRect(0,0,W,H);const D=132;for(let i=0;i<nodes.length;i++)for(let j=i+1;j<nodes.length;j++){const a=nodes[i],b=nodes[j],d=Math.hypot(a.x-b.x,a.y-b.y);if(d<D){ctx.globalAlpha=(1-d/D)*.16;ctx.strokeStyle='#9aa6d4';ctx.beginPath();ctx.moveTo(a.x,a.y);ctx.lineTo(b.x,b.y);ctx.stroke();}}ctx.globalAlpha=1;nodes.forEach(a=>{ctx.fillStyle=a.c;ctx.beginPath();ctx.arc(a.x,a.y,a.r,0,6.283);ctx.fill();});}
  hero.addEventListener('mousemove',e=>{const rc=hero.getBoundingClientRect();mouse.x=e.clientX-rc.left;mouse.y=e.clientY-rc.top;});hero.addEventListener('mouseleave',()=>{mouse.x=-999;mouse.y=-999;});
  let rt;window.addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>{if(raf)cancelAnimationFrame(raf);size();reduce?stat():frame();},180);});size();reduce?stat():frame();})();

/* autoplay loops */
if(!reduce){
  new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting&&!cgTimer){cgTimer=setInterval(()=>{cgIdx=(cgIdx+1)%cgKeys.length;cgSet(cgKeys[cgIdx]);},1500);}else if(!en.isIntersecting&&cgTimer){clearInterval(cgTimer);cgTimer=null;}}),{threshold:.3}).observe(document.getElementById('model'));
  new IntersectionObserver(es=>es.forEach(en=>{if(en.isIntersecting&&!domTimer){domTimer=setInterval(()=>{domIdx=(domIdx+1)%domKeys.length;domSet(domKeys[domIdx]);},1600);}else if(!en.isIntersecting&&domTimer){clearInterval(domTimer);domTimer=null;}}),{threshold:.3}).observe(document.getElementById('longitudinal'));
}
render();
