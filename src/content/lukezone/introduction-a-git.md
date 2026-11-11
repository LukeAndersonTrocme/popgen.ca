---
title: "Git et GitHub, pour de vrai"
date: 2026-11-11
description: "Le modèle mental de Git en trois boîtes, quatre questions auxquelles il répond — revenir en arrière, ne rien perdre, essayer sans casser, travailler à plusieurs — l'astuce « une phrase par ligne » pour les manuscrits, et tout ce que Git fait d'autre. Aide-mémoire d'une session Digital Wednesdays."
tags: ["git", "github", "reproducibility", "collaboration", "français", "digital-wednesdays"]
draft: false
---

*Le dépôt de la série : [github.com/LukeAndersonTrocme/mercredis-numeriques](https://github.com/LukeAndersonTrocme/mercredis-numeriques) — les exercices sont là.*

## Avant de venir

1. Crée-toi un compte sur [github.com](https://github.com).
2. *Optionnel* : installe Git, puis vérifie avec `git --version` dans un terminal. Pas nécessaire pour l'exercice en classe, utile pour les exercices à la maison.
3. Apporte ton portable. Un navigateur suffit.

---

## Où on en était

La dernière fois, on a terminé sur ceci : *on ne versionne pas avec des noms de fichiers*. `analyse_v2.R`, `manuscrit_final_revu_LAT.docx`, `fig2_VRAIMENT_final.pdf` — chaque suffixe est une tentative maison de faire ce que Git fait correctement depuis 2005.

Git n'est pas un outil d'informaticien. C'est un cahier de laboratoire pour tes fichiers : il note ce qui a changé, quand, par qui, et pourquoi — et il te laisse revenir à n'importe quelle page.

---

## Le modèle mental : trois boîtes et un nuage

Presque toute la confusion autour de Git vient d'un seul malentendu : croire qu'il y a *un* endroit où vivent tes fichiers. Il y en a quatre.

```
 dossier de travail    ce que tu édites
         │
      git add
         ▼
 index                 ce qui ira dans la prochaine photo
         │
      git commit
         ▼
 historique            les photos prises, pour toujours
         │      ▲
   git push    git pull           ── au-dessus : ta machine
         ▼      │                 ── en dessous : ailleurs
 GitHub                une copie de l'historique
```

- **Le dossier de travail** : tes fichiers, tels que tu les vois dans le Finder. Git les observe mais n'y touche pas.
- **L'index** (*staging area*) : la liste de ce qui ira dans la prochaine photo. `git add` choisit ; ça te permet de faire un commit avec *un* changement logique, même si tu en as fait trois.
- **L'historique** : la suite des commits. Un commit est une **photo complète** du projet à un moment donné, avec un auteur, une date et un message. Pas un diff — une photo. Git calcule les différences entre photos quand tu les demandes.
- **GitHub** (le *remote*) : une copie de l'historique sur un autre ordinateur. `push` envoie, `pull` récupère.

**Git ≠ GitHub.** Git est le programme, sur ta machine, et il marche très bien hors-ligne. GitHub est un site qui héberge des copies de dépôts Git et ajoute une couche sociale par-dessus (pull requests, issues, pages web). GitLab et Bitbucket font la même chose.

Quatre commandes couvrent l'essentiel de ton quotidien :

```bash
git status                       # où en suis-je ? (à lancer sans modération)
git add scripts/02_analyse.R     # je mets ce fichier dans la prochaine photo
git commit -m "Corrige le filtre MAF dans l'analyse"
git push                         # j'envoie l'historique sur GitHub
```

---

## 1. Comment je reviens en arrière ?

**Pourquoi ça fait mal.** Tu as « amélioré » ton script hier, la figure ne ressemble plus à rien, et tu ne sais plus ce que tu as changé. Ctrl-Z ne remonte pas jusqu'à hier.

**La règle.** Commit petit, commit souvent, et écris *pourquoi* dans le message. Un commit, c'est un point de sauvegarde : tu ne peux revenir qu'aux endroits où tu t'es arrêté.

```bash
git log --oneline                # la liste des photos
git diff                         # ce qui a changé depuis la dernière photo
git restore scripts/02_analyse.R # jette mes modifications, reviens à la dernière photo
git restore --source=a1b2c3d scripts/02_analyse.R   # reviens à une photo plus vieille
```

« Corrige le filtre MAF : 0.01 au lieu de 0.05, cf. réunion du 4 nov. » vaut infiniment plus que « update ». Le *quoi*, Git le voit déjà dans le diff. Le *pourquoi*, il n'y a que toi qui le sais — aujourd'hui.

**Le test.** Peux-tu retrouver, en moins d'une minute, la version du script qui a produit la figure 2 du mois dernier ?

---

## 2. Comment je ne perds rien ?

**Pourquoi ça fait mal.** Un dépôt Git qui n'existe que sur ton portable meurt avec ton portable. L'historique le plus soigné du monde ne sert à rien au fond du fleuve.

**La règle.** Push à la fin de chaque séance de travail. Un dépôt *privé* sur GitHub est gratuit et illimité ; il n'y a aucune raison qu'un projet de recherche n'ait pas sa copie ailleurs.

Mais attention à *ce* que tu pousses. Git versionne du **code et du texte**, pas des données. Un fichier `.gitignore` à la racine dit à Git quoi ignorer — et c'est exactement le découpage de la dernière session :

```
# .gitignore
data/            # les données ne vont jamais dans Git
output/          # régénérable, donc pas besoin
*.Rhistory
.DS_Store
```

Trois raisons de garder les données hors de Git : la taille (GitHub refuse les fichiers de plus de 100 Mo, et un dépôt alourdi le reste pour toujours), la confidentialité (des données de participants n'ont rien à faire sur un serveur américain, même privé), et le fait qu'elles ont déjà leur propre sauvegarde — l'espace *project* du cluster, par exemple.

**Le test.** Si ton portable disparaît ce soir, qu'est-ce que tu perds ? Si la réponse est « du code », tu as du travail.

---

## 3. Comment j'essaie quelque chose sans casser ce qui marche ?

**Pourquoi ça fait mal.** Tu veux tester une autre méthode de normalisation, mais l'analyse actuelle marche et tu as un comité dans deux semaines. Alors tu copies le dossier en `analyse_test/`, et maintenant tu as deux projets qui divergent en silence.

**La règle.** Une branche. C'est une ligne d'historique parallèle, gratuite, que tu peux jeter sans conséquence.

```bash
git switch -c essai-normalisation   # nouvelle branche, on y est
# ... tu modifies, tu commits, tu testes ...
git switch main                     # retour à la version qui marche, intacte
git merge essai-normalisation       # ça a marché : on garde
git branch -D essai-normalisation   # ça n'a pas marché : on jette
```

Un *fork* est la même idée, en plus gros : une copie complète d'un dépôt sous ton propre compte. C'est le terrain de jeu idéal quand le dépôt ne t'appartient pas — le code d'un collaborateur, un outil publié — et que tu veux tout casser tranquillement sans que personne ne le voie.

**Le test.** Y a-t-il un dossier `_test`, `_old` ou `_backup` dans ton projet en ce moment ? C'est une branche qui s'ignore.

---

## 4. Comment je travaille à plusieurs ?

**Pourquoi ça fait mal.** Deux personnes, un script, des versions qui s'échangent par courriel ou par Dropbox. Personne ne sait qui a changé quoi, et la fusion se fait à la main, à minuit, avant la date limite.

**La règle.** On ne modifie jamais directement la version commune. Chacun travaille sur sa branche (ou son fork), puis propose ses changements avec une **pull request** (PR) : une page GitHub qui montre le diff, où l'autre peut commenter ligne par ligne, et qui se fusionne en un clic une fois approuvée.

```
ton fork / ta branche ──▶ pull request ──▶ relecture ──▶ merge dans main
```

Et l'historique répond tout seul à la question « qui a fait quoi » :

```bash
git log --author="Marie" --oneline   # tout ce que Marie a fait
git blame scripts/02_analyse.R        # pour chaque ligne : qui, quand, quel commit
```

`blame` a un nom agressif, mais c'est l'outil le plus bienveillant de Git : il te mène au commit, donc au message, donc au *pourquoi*.

**Le test.** Dans ton projet partagé, peux-tu dire qui a changé cette ligne, quand, et pourquoi — sans envoyer de courriel ?

---

## Écrire un manuscrit : une phrase par ligne

Git marche pour tout ce qui est du texte, y compris un article en LaTeX ou en Markdown. Je l'utilise pour tous mes manuscrits avec mes collaborateurs. Il y a une seule astuce à connaître, et elle change tout.

Git compare les fichiers **ligne par ligne**. Si ton paragraphe est une seule ligne de 600 caractères, changer un mot marque tout le paragraphe comme modifié :

```diff
- La structure génétique du Québec reflète l'histoire de son peuplement. Les fondateurs se sont installés le long du Saint-Laurent. Les régions éloignées montrent un effet fondateur marqué.
+ La structure génétique du Québec reflète l'histoire de son peuplement. Les fondateurs se sont installés le long du Saint-Laurent. Les régions éloignées montrent un effet fondateur prononcé.
```

Bonne chance pour trouver le mot. Maintenant, la même modification, avec **une phrase par ligne** :

```diff
  La structure génétique du Québec reflète l'histoire de son peuplement.
  Les fondateurs se sont installés le long du Saint-Laurent.
- Les régions éloignées montrent un effet fondateur marqué.
+ Les régions éloignées montrent un effet fondateur prononcé.
```

La phrase modifiée, entière, et rien d'autre. LaTeX et Markdown ignorent les retours à la ligne simples — le PDF final est identique. Seul le diff change, et il devient lisible.

Pour les cas où tu ne contrôles pas le formatage : `git diff --word-diff` compare mot par mot. Et si tes collaborateurs ne jurent que par Overleaf, Overleaf sait synchroniser un projet avec un dépôt Git (selon l'abonnement).

---

## Ce que Git fait d'autre

Une fois que tu as le modèle mental, tu le croises partout.

- **Installer des logiciels.** La moitié des outils de génomique s'installent depuis GitHub : `git clone` puis `pip install -e .`, ou `remotes::install_github("auteur/package")` en R. Le dépôt, c'est aussi la doc, les issues (« est-ce que quelqu'un a déjà eu cette erreur ? ») et l'historique des versions.
- **Partager le code d'un article.** Un dépôt public, lié dans la section *Code availability*. Une *release* GitHub peut être archivée sur [Zenodo](https://zenodo.org) qui lui attribue un DOI — ton code devient citable, et la version exacte de l'article est figée.
- **Héberger un site web.** GitHub Pages sert gratuitement un site à partir d'un dépôt. [popgen.ca](https://popgen.ca) est un dépôt Git : ce billet que tu lis est un commit.
- **Garder ses machines synchronisées.** Portable, ordinateur du labo, cluster : `push` d'un côté, `pull` de l'autre, et le code est le même partout. Fini le `scp` de scripts dans tous les sens. (Les données, elles, restent où elles sont.)
- **Rédiger à plusieurs.** Voir plus haut : thèse, articles, demandes de subvention — tout ce qui est du texte brut.

---

## Exercices

Tous dans le [dépôt de la série](https://github.com/LukeAndersonTrocme/mercredis-numeriques), dossier `2026-11-11-git/exercices/`.

| | Où | Durée | Quoi |
|---|---|---|---|
| **1** | en classe, navigateur | 10 min | Fork, ajoute ta fiche dans `participants/`, ouvre une pull request |
| **2** | à la maison, terminal | 15 min | La même chose, en ligne de commande |
| **3** | à la maison, ton projet | 15 min | `git init` sur un vrai projet, un `.gitignore`, un premier push vers un dépôt privé |
| **4** | à la maison, navigateur | 10 min | Corrige une phrase d'un manuscrit écrit « une phrase par ligne », regarde le diff |

L'exercice 3 est celui qui compte. Les autres sont de l'entraînement.

---

## Food for thought

- Quel est le plus vieux fichier `_final` de ton ordinateur ? Qu'est-ce qu'il te faudrait pour le supprimer en confiance ?
- Avec qui partages-tu du code ou du texte en ce moment, et comment ? Qu'est-ce qui coince ?
- Qu'est-ce qui ne devrait *jamais* aller dans un dépôt Git dans ton projet ? (Pense aux données, mais aussi aux mots de passe et aux clés d'API.)
- Un dépôt public de ton projet de thèse : qu'est-ce qui te retient ?

---

*Références : Blischak JD, Davenport ER, Wilson G (2016), « A Quick Introduction to Version Control with Git and GitHub », PLoS Computational Biology 12(1). Bryan J (2018), « Excuse Me, Do You Have a Moment to Talk About Version Control? », The American Statistician 72(1).*
