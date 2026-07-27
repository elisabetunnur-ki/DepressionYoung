(() => {
  "use strict";

  function byId(id) {
    return document.getElementById(id);
  }

  function init() {
    const analyses = window.THREE_D_NETWORK_ANALYSES || [];
    const select = byId("threeDAnalysisSelect");
    const frame = byId("threeDFrame");
    const loading = byId("threeDLoading");
    const analysisName = byId("threeDAnalysisName");
    const fullSizeLink = byId("threeDFullSizeLink");
    if (!select || !frame || !analyses.length) return;

    select.innerHTML = analyses
      .map((analysis) => `<option value="${analysis.id}">${analysis.name}</option>`)
      .join("");

    function setAnalysis(id) {
      const analysis = analyses.find((item) => item.id === id) || analyses[0];
      select.value = analysis.id;
      analysisName.textContent = analysis.name;
      fullSizeLink.href = analysis.file;
      fullSizeLink.setAttribute("aria-label", `Open ${analysis.name} 3D disease network in a new tab`);
      loading.hidden = false;
      frame.title = `${analysis.name}: interactive 3D disease network`;
      frame.onload = () => { loading.hidden = true; };
      frame.src = analysis.file;

      const url = new URL(window.location.href);
      url.searchParams.set("analysis", analysis.id);
      history.replaceState(null, "", url);
    }

    select.addEventListener("change", () => setAnalysis(select.value));
    const requested = new URLSearchParams(window.location.search).get("analysis");
    setAnalysis(requested);
  }

  window.ThreeDNetworkApp = { init: init };
})();
