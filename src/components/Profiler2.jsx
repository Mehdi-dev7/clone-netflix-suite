import React from "react";

let pile = [];
const logProfiler = () => {
  if (!pile.length) {
    return;
  }
	console.log("%c profiler", "color: LightCoral", pile);
  
  pile = [];
};

setInterval(logProfiler, 10000);

function Profiler2({appData, phases = [], ...props }) {
	const handleRender = (
		id, // la prop "id" du Profiler dont l’arborescence vient d’être mise à jour
		phase, // soit "mount" (si on est au montage) soit "update" (pour une mise à jour)
		actualDuration, // temps passé à faire le rendu de la mise à jour finalisée
		baseDuration, // temps estimé du rendu pour l’ensemble du sous-arbre sans mémoïsation
		startTime, // horodatage du début de rendu de cette mise à jour par React
		commitTime, // horodatage de la finalisation de cette mise à jour par React
		interactions
	) => {
		if (!phases.length || phases.includes(phase)) {
			pile.push({
        appData,
				id,
				phase,
				actualDuration,
				baseDuration,
				startTime,
				commitTime,
				interactions,
			});
		}
	};


	return <React.Profiler onRender={handleRender} {...props} />;
}
export { Profiler2 };
