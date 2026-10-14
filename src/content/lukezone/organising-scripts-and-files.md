---
title: "How to Organise Your Scripts and Files"
date: 2026-10-14
description: "Four questions your project folder has to answer — raw data, derived outputs, six-month recall, portability — each with a rule and a test you can actually run. Handout from a Digital Wednesdays session."
tags: ["reproducibility", "project-organisation", "R", "RStudio", "digital-wednesdays"]
draft: false
---

*Version française : [Organisation des scripts et des fichiers/dossiers](/lukezone/organisation-scripts-fichiers)*

## Do you recognise your own folder?

- `analysis_final_v3_REALLY_final.R`
- `data_clean.csv`, `data_clean2.csv`, `data_clean_new.csv` — and nobody knows which one was used
- `setwd("/Users/me/Desktop/stuff/")` at the top of every script
- a 1200-line script that reads, cleans, analyses and plots
- figure 2 of the manuscript, which nobody can regenerate any more

None of these is a discipline problem. They are four questions your project folder doesn't answer. Settle the four questions and the symptoms disappear on their own.

---

## 1. Where is my raw data?

**Why it hurts.** If the same folder holds what you were given and what your code produced, you can no longer tell the source from the consequence. One misdirected `write.csv()` and irreplaceable data is gone — usually without you noticing for weeks.

**The rule.** `data/raw/` is sacred. No script ever writes to it. Everything the code produces goes somewhere else. And a small `data/raw/README.md` records the provenance: where it came from, when you received it, which version, who to contact.

```bash
chmod -R 444 data/raw/     # the system now refuses to write
```

It takes two seconds and it turns a silent catastrophe into an error message.

**The test.** Could a bug in my code damage my raw data? If the answer isn't an immediate *no*, you have work to do.

---

## 2. What is derived?

**Why it hurts.** Once you can't tell which files are inputs and which are outputs, you stop daring to delete anything. The folder grows, every file becomes potentially precious, and you keep it all out of fear.

**The rule.** Everything your code produces is disposable, because you can regenerate it. Intermediate data in `data/processed/`, figures and tables in `output/`. And scripts are numbered in the order you run them:

```
scripts/01_cleaning.R
scripts/02_analysis.R
scripts/03_figures.R
```

The number isn't cosmetic: it is the pipeline's documentation. Someone opening the folder knows where to start.

**The test.** `rm -rf output/`, then re-run everything. Does it come back? If a file doesn't come back, it's an orphan — either it is actually raw data (move it into `data/raw/`), or the recipe that produced it no longer exists. Both are worth discovering now rather than at reviewer 2.

---

## 3. What if I come back in six months?

**Why it hurts.** Future you has none of present you's memories. Future you remembers exactly as much as a colleague you'd email the folder to: nothing.

**The rule.** A `README.md` at the root that answers three things in ten lines or less: *what is this project*, *how do you run it*, *where is the data*. Best return on investment on this entire list.

And naming that leaves you alone:

| Do | Avoid |
|---|---|
| `2026-10-14_notes.md` (ISO dates — they sort) | `14oct26.md`, `oct14.md` |
| `01_cleaning.R` (two-digit numbers) | `1_cleaning.R` sitting next to `10_figures.R` |
| `cartagene_data.csv` | `données cartagène (copy).csv` |
| lowercase, `_` or `-`, never both at random | `My Files/Final Analysis/` |
| `analysis.R` versioned in Git | `analysis_v3_final_REALLY.R` |

No spaces, no accents, no decorative capitals. This isn't purism: spaces break shell scripts, accents break transfers between your Mac and the cluster, and `final` is a lie you keep telling yourself.

**The test.** Open the folder and say within five seconds what to run first. If you have to think, write the README.

---

## 4. What has to travel with the project?

**Why it hurts.** A project that only works on your machine isn't a project, it's a configuration. It survives neither sharing, nor the cluster, nor a new computer.

**The rule.** Relative paths, always. In R the mechanism is the RStudio Project (`.Rproj`) combined with `here`:

```r
library(here)
data <- read_csv(here("data", "raw", "cartagene.csv"))
ggsave(here("output", "figures", "fig2.pdf"))
```

`here()` finds the project root by itself, no matter where the script is launched from. In Python, `pathlib` plays the same role. In both cases, `setwd()` and `os.chdir()` are a sign that something else should be fixed.

Capture the environment too: `renv::snapshot()` in R, `requirements.txt` or an `environment.yml` in Python. Code without its package versions ages badly.

**The test.** Send the folder to a colleague, or clone it on the cluster. Does it run without editing a single line?

---

## The skeleton

The four answers, assembled. Nothing exotic — this is roughly the community consensus of the last fifteen years.

```
my-project/
├── README.md              # what it is, how to run it, where the data is
├── my-project.Rproj       # the root, for here() and RStudio
├── data/
│   ├── raw/               # sacred, read-only, never written by a script
│   │   └── README.md      # provenance: source, date, version
│   └── processed/         # generated, therefore disposable
├── R/                     # (src/ in Python) reusable functions
├── scripts/               # the pipeline, numbered
│   ├── 01_cleaning.R
│   ├── 02_analysis.R
│   └── 03_figures.R
├── output/
│   ├── figures/
│   └── tables/
├── doc/                   # manuscript, notes, presentations
└── .gitignore             # data/processed/, output/, .Rhistory
```

Two details that matter more than they look. First, the `R/` versus `scripts/` split: the *functions* on one side, the *recipes that call them* on the other. That's what prevents the 1200-line script. Second, `output/` is in `.gitignore` — you don't version what you can regenerate.

---

## When it gets serious

Three tiers, for the day the skeleton stops being enough.

**Re-running by hand becomes painful.** When you hesitate to re-run `01_` because it takes forty minutes and you're no longer sure what changed, you need a build system: `targets` in R, `Snakemake` or `Nextflow` in Python/shell. They track what is up to date and only recompute what's necessary.

**Your machine's paths stop meaning anything.** On the cluster, scratch space is fast but periodically wiped; project space is durable but slow and quota'd. Raw data lives in the durable space, computation happens in scratch. That split is exactly question 1, imposed by the infrastructure.

**You want a real version history.** That's Git — and it's the subject of a session in two weeks, so we won't dig today. Just remember this: you don't version with filenames. `_v2`, `_final`, `_revised_LAT` are symptoms, not solutions.

---

## Food for thought

**To try this week** (each one takes under ten minutes):

1. `chmod -R 444 data/raw/` on your active project.
2. The `rm -rf output/` test — re-run everything, see what doesn't come back.
3. Write the ten-line README. Just the three questions.
4. Replace one `setwd()` with `here()`.
5. Open a project from a year ago and note, without fixing anything, the three things you no longer understand.

**For discussion:**

- How long before you stop understanding your own code? Two weeks? Six months?
- Is there a folder you don't dare clean up? What exactly is holding you back?
- What happens when two people work on the same project — how are you handling it right now?
- Which file are you most afraid of losing, and what is protecting it at the moment?

---

*Reference: Noble WS (2009), "A Quick Guide to Organizing Computational Biology Projects", PLoS Computational Biology 5(7).*
