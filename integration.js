/* Shared V2 UI and server workflow integration. */
const integratedOpenProject=openProject;
openProject=function(id,tab='overview'){integratedOpenProject(id,tab);view.chatOrigin=false;};
openChat=function(id){openProject(id,'chat');view.chatOrigin=true;render();};
const integratedGo=go;
go=function(page){integratedGo(page);view.chatOrigin=false;};
const integratedDashboard=dashboard;
dashboard=function(){const desktop=integratedDashboard();const tasks=db.tasks.filter(t=>t.status!=='Erledigt'&&(isOffice()||t.assignees.includes(user().id)));const materials=db.materials.filter(m=>!['Geliefert','Storniert'].includes(m.status));return `<div class="mobile-today">${Domain.absent(db,user().id,today())?'<p class="warning">Für dich ist heute eine Abwesenheit erfasst.</p>':''}${mobileToday([],tasks,materials)}</div><div class="desktop-dashboard">${desktop}</div>`;};
planningDrop=async function(event,userId,date){event.preventDefault();event.currentTarget.classList.remove('drag-over');if(!isOffice())return;const id=event.dataTransfer.getData('text/plain'),allocation=db.allocations.find(a=>a.id===id);if(!allocation)return;if(Domain.absent(db,userId,date))return toast('Mitarbeiter ist an diesem Tag abwesend.','err');if(!project(allocation.projectId)?.members.includes(userId))return toast('Mitarbeiter zuerst dem Projekt zuordnen.','err');allocation.userId=userId;allocation.date=date;await save();render();toast('Einsatz verschoben');};
const integratedProjectForm=projectForm;
projectForm=function(...args){if(!isOffice())return toast('Keine Berechtigung.','err');return integratedProjectForm(...args);};
