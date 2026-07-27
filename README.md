# Interactive Depression Disease-Network Visualization

This directory is a fully static interactive site generated from `current_manuscript/results_20260622` and the six DiNetxify exports in `3D_figures`. It can be opened locally from `index.html` or published as a static website without a server-side application.

## Sections

- `index.html`: landing page with PheWAS, Comorbidity Network, Disease Trajectory, and 3D Disease Network modules.
- `pages/phewas/scatter.html`: analysis-selectable PheWAS scatter plot.
- `pages/phewas/forest.html`: condition-by-analysis forest plot.
- `pages/comorbidity-network/index.html`: interactive comorbidity-network explorer.
- `pages/disease-trajectory/index.html`: interactive within-module temporal-ordering explorer.
- `pages/3d-disease-network/index.html`: analysis-selectable integrated 3D disease-network explorer.
- `pages/3d-disease-network/figures/`: six self-contained DiNetxify/Plotly network exports copied into the static site.
- `data/`: cleaned CSV/JSON files and JavaScript-wrapped payloads for direct `file://` use.
- `assets/`: local CSS, JavaScript, and Plotly assets.

## Analyses

All four modules include:

1. Population-based analysis
2. Population-based analysis (female)
3. Population-based analysis (male)
4. Sibling-based analysis
5. Sibling-based analysis (female)
6. Sibling-based analysis (male)

## Statistical display rules

- PheWAS displays rows with finite coefficient and standard-error estimates. Markers are highlighted as manuscript-positive results only when `phewas_coef > 0`, the saved FDR significance flag is true, and `phewas_p_adjusted < 0.05`.
- Comorbidity networks use positive statistically significant adjusted associations (`comorbidity_beta > 0`). Exact adjusted odds ratios are read from `comorbidity_result.csv`; values are capped at 10 only for edge filtering and layout.
- Disease trajectories use statistically significant positive temporal-ordering results and retain only pairs whose endpoints share the same cluster in `figures/cluster.csv`. Endpoints are not additionally required to appear in the positive-edge GEXF, preserving qualifying trajectory-only cluster members.
- The 3D disease-network section embeds the six supplied DiNetxify HTML exports. During site generation, the depression origin is restyled from a large black circle to a smaller coral diamond with a white outline. The source exports in `3D_figures` are not modified.
- Raw cluster identifiers are mapped to the Roman module labels used in the current figures.

## Regeneration

From the project root:

```bash
python current_manuscript/generate_depression_visualization_site.py \
  --result-dir current_manuscript/results_20260622 \
  --three-d-dir 3D_figures \
  --out-dir current_manuscript/interactive_visualization
```

The generator rewrites generated HTML, CSS, JavaScript, cleaned data files, and site copies of the six 3D figures. It does not modify the source result files or source 3D exports.

## Interpretation

The sibling-based PheWAS is a within-family comparison. The sibling-based networks and temporal ordering are reconstructed among depression-diagnosed individuals eligible for the sibling analysis and are not within-family edge estimates. Temporal arrows indicate ordering of recorded diagnoses, not causal disease progression.
