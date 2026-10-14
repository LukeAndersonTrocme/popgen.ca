---
title: "Organisation des scripts et des fichiers/dossiers"
date: 2026-10-14
description: "Quatre questions auxquelles ton dossier de projet doit répondre — données brutes, fichiers dérivés, mémoire à six mois, portabilité — avec une règle et un test pour chacune. Aide-mémoire d'une session Digital Wednesdays."
tags: ["reproducibility", "project-organisation", "R", "RStudio", "français", "digital-wednesdays"]
draft: false
---

*English version: [How to organise your scripts and files](/lukezone/organising-scripts-and-files)*

## Reconnais-tu ton dossier ?

- `analyse_final_v3_VRAIMENT_final.R`
- `data_clean.csv`, `data_clean2.csv`, `data_clean_new.csv` — et personne ne sait lequel a servi
- `setwd("/Users/moi/Desktop/trucs/")` en haut de chaque script
- un script de 1200 lignes qui lit, nettoie, analyse et dessine
- la figure 2 du manuscrit, que plus personne n'arrive à régénérer

Aucun de ces problèmes n'est un problème de discipline. Ce sont quatre questions auxquelles ton dossier de projet ne répond pas. Règle les quatre questions, et les symptômes disparaissent d'eux-mêmes.

---

## 1. Où sont mes données brutes ?

**Pourquoi ça fait mal.** Si le même dossier contient ce que tu as reçu et ce que ton code a produit, tu ne peux plus distinguer la source de la conséquence. Un `write.csv()` mal pointé, et des données irremplaçables sont parties — souvent sans que tu le remarques avant des semaines.

**La règle.** `data/raw/` est sacré. Aucun script n'y écrit, jamais. Tout ce que le code produit va ailleurs. Et un petit `data/raw/README.md` note la provenance : d'où ça vient, reçu quand, quelle version, qui contacter.

```bash
chmod -R 444 data/raw/     # le système refuse maintenant d'écrire
```

Ça prend deux secondes et ça transforme une catastrophe silencieuse en message d'erreur.

**Le test.** Est-ce qu'un bug dans mon code pourrait abîmer mes données brutes ? Si la réponse n'est pas un *non* immédiat, tu as du travail.

---

## 2. Qu'est-ce qui est dérivé ?

**Pourquoi ça fait mal.** Quand tu ne sais plus quels fichiers sont des *inputs* et lesquels sont des *outputs*, tu n'oses plus rien supprimer. Le dossier grossit, chaque fichier devient potentiellement précieux, et tu gardes tout par peur.

**La règle.** Tout ce que ton code produit est jetable, parce que tu peux le régénérer. Données intermédiaires dans `data/processed/`, figures et tableaux dans `output/`. Et les scripts sont numérotés dans l'ordre où on les lance :

```
scripts/01_nettoyage.R
scripts/02_analyse.R
scripts/03_figures.R
```

Le numéro n'est pas cosmétique : c'est la documentation du pipeline. Quelqu'un qui ouvre le dossier sait par où commencer.

**Le test.** `rm -rf output/`, puis relance tout. Est-ce que ça revient ? Si un fichier ne revient pas, c'est un orphelin — soit il est en réalité une donnée brute (déplace-le dans `data/raw/`), soit la recette qui l'a produit n'existe plus. Les deux valent la peine d'être découverts maintenant plutôt qu'à la révision du *reviewer 2*.

---

## 3. Et si j'y reviens dans six mois ?

**Pourquoi ça fait mal.** Ton futur toi n'a aucun des souvenirs de ton toi actuel. Il a la même mémoire qu'un collègue à qui tu enverrais le dossier : zéro.

**La règle.** Un `README.md` à la racine qui répond à trois choses, en dix lignes maximum : *c'est quoi ce projet*, *comment on le lance*, *où sont les données*. C'est le meilleur retour sur investissement de toute cette liste.

Et un nommage qui te laisse tranquille :

| À faire | À éviter |
|---|---|
| `2026-10-14_notes.md` (dates ISO, elles se trient) | `14oct26.md`, `oct14.md` |
| `01_nettoyage.R` (numéros à deux chiffres) | `1_nettoyage.R` à côté de `10_figures.R` |
| `donnees_cartagene.csv` | `données cartagène (copie).csv` |
| minuscules, `_` ou `-`, jamais les deux au hasard | `Mes Fichiers/Analyse Finale/` |
| `analyse.R` versionné dans Git | `analyse_v3_final_VRAIMENT.R` |

Pas d'espaces, pas d'accents, pas de majuscules décoratives. Ce n'est pas du purisme : les espaces cassent les scripts shell, les accents cassent le transfert entre ton Mac et le cluster, et `final` est un mensonge que tu te répètes.

**Le test.** Ouvre le dossier et dis en cinq secondes quoi lancer en premier. Si tu dois réfléchir, écris le README.

---

## 4. Qu'est-ce qui doit suivre le projet ?

**Pourquoi ça fait mal.** Un projet qui ne marche que sur ta machine n'est pas un projet, c'est une configuration. Il ne survit ni au partage, ni au cluster, ni au changement d'ordinateur.

**La règle.** Des chemins relatifs, toujours. En R, le mécanisme c'est le *RStudio Project* (`.Rproj`) combiné à `here` :

```r
library(here)
donnees <- read_csv(here("data", "raw", "cartagene.csv"))
ggsave(here("output", "figures", "fig2.pdf"))
```

`here()` trouve la racine du projet tout seul, peu importe d'où le script est lancé. En Python, `pathlib` joue le même rôle. Dans les deux cas, `setwd()` et `os.chdir()` sont le signe que quelque chose d'autre devrait être corrigé.

Capture aussi l'environnement : `renv::snapshot()` en R, `requirements.txt` ou un `environment.yml` en Python. Le code sans ses versions de packages vieillit mal.

**Le test.** Envoie le dossier à un collègue, ou clone-le sur le cluster. Ça roule sans modifier une seule ligne ?

---

## Le squelette

Les quatre réponses, assemblées. Rien d'exotique — c'est à peu près le consensus de la communauté depuis quinze ans.

```
mon-projet/
├── README.md              # c'est quoi, comment on lance, où sont les données
├── mon-projet.Rproj       # la racine, pour here() et RStudio
├── data/
│   ├── raw/               # sacré, read-only, jamais écrit par un script
│   │   └── README.md      # provenance : source, date, version
│   └── processed/         # généré, donc jetable
├── R/                     # (src/ en Python) fonctions réutilisables
├── scripts/               # le pipeline, numéroté
│   ├── 01_nettoyage.R
│   ├── 02_analyse.R
│   └── 03_figures.R
├── output/
│   ├── figures/
│   └── tables/
├── doc/                   # manuscrit, notes, présentations
└── .gitignore             # data/processed/, output/, .Rhistory
```

Deux détails qui comptent plus qu'ils n'en ont l'air. D'abord la séparation `R/` contre `scripts/` : les *fonctions* d'un côté, les *recettes qui les appellent* de l'autre. C'est ce qui empêche le script de 1200 lignes. Ensuite, `output/` est dans le `.gitignore` — on ne versionne pas ce qu'on peut régénérer.

---

## Quand ça devient sérieux

Trois paliers, le jour où le squelette ne suffit plus.

**Relancer à la main devient pénible.** Quand tu hésites à relancer `01_` parce que ça prend quarante minutes et que tu n'es plus sûr de ce qui a changé, tu as besoin d'un *build system* : `targets` en R, `Snakemake` ou `Nextflow` en Python/shell. Ils gardent la trace de ce qui est à jour et ne recalculent que le nécessaire.

**Les chemins de ta machine ne veulent plus rien dire.** Sur le cluster, l'espace *scratch* est rapide mais effacé périodiquement, l'espace *project* est durable mais lent et contingenté. Les données brutes vivent dans l'espace durable, le calcul se fait dans le scratch. Ce découpage est exactement celui de la question 1, imposé par l'infrastructure.

**Tu veux une vraie histoire des versions.** C'est Git — et c'est le sujet d'une session dans deux semaines, donc on ne creuse pas aujourd'hui. Retiens juste ceci : on ne versionne pas avec des noms de fichiers. `_v2`, `_final`, `_revu_LAT` sont des symptômes, pas des solutions.

---

## Food for thought

**À essayer cette semaine** (chacun prend moins de dix minutes) :

1. `chmod -R 444 data/raw/` sur ton projet actif.
2. Le test du `rm -rf output/` — relance tout, vois ce qui ne revient pas.
3. Écris le README de dix lignes. Juste les trois questions.
4. Remplace un `setwd()` par `here()`.
5. Ouvre un projet d'il y a un an et note, sans rien corriger, les trois choses que tu ne comprends plus.

**Pour la discussion :**

- Combien de temps avant que tu ne comprennes plus ton propre code ? Deux semaines ? Six mois ?
- Y a-t-il un dossier que tu n'oses pas nettoyer ? Qu'est-ce qui te retient exactement ?
- Qu'est-ce qui se passe quand deux personnes travaillent sur le même projet — vous faites comment en ce moment ?
- Quel est le fichier que tu as le plus peur de perdre, et qu'est-ce qui le protège en ce moment ?

---

*Référence : Noble WS (2009), « A Quick Guide to Organizing Computational Biology Projects », PLoS Computational Biology 5(7).*
