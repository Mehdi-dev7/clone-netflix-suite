import React from 'react'

// 🐶 Cette fonction loguera les information de profil en rouge
const logProfiler = data => {
  console.log('%c profiler', 'color: LightCoral', data)
}

// 🐶 passe les props 'phases' et ...props
function Profiler2({phases = [], ...props}) {
  // 🐶 créé une fonction handleRender qui fera le rendu du profiler
  // passe lui tous les paramètres du 'onRender'
  // 📝https://fr.reactjs.org/docs/profiler.html#onrender-callback
  const handleRender = (id, // la prop "id" du Profiler dont l’arborescence vient d’être mise à jour
    phase, // soit "mount" (si on est au montage) soit "update" (pour une mise à jour)
    actualDuration, // temps passé à faire le rendu de la mise à jour finalisée
    baseDuration, // temps estimé du rendu pour l’ensemble du sous-arbre sans mémoïsation
    startTime, // horodatage du début de rendu de cette mise à jour par React
    commitTime, // horodatage de la finalisation de cette mise à jour par React
    interactions)  => { 
    logProfiler({id, phase, actualDuration, baseDuration, startTime, commitTime, interactions})
  }

  // 🐶 retourne <React.Profiler avec les bons props onRender et ...props
  return <React.Profiler onRender={handleRender} {...props} /> 
}
export {Profiler2}
