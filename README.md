# Ydiscover_V2 :

I Choose the subjetc : Codename

Vous avez déjà joué à Codename ? Pour la suite, je vais considérer que non
(si oui vous pouvez passer cette partie du brief)
Le jeu est relativement simple
Plusieurs joueurs sont divisés en équipe de 2, l’un est un agent secret l’autre
son complice, le complice doit faire deviner à son agent différents mots en lui
donnant des indices, la complexité réside dans le fait que l’agent ne voient
pas les mots à deviner, seul son complice peut les voir, à lui donc de trouver
les bons mots pour le mener vers la bonne voie.
Cela se joue à 4, une équipe bleue et une équipe rouge.
Sur le plateau il y a donc différents mots à trouver, certains de couleur rouge
et d’autres de couleur bleu
Si l’agent de l’équipe bleue choisit une carte de l’équipe rouge, il accorde un
point à l’équipe adverse.
Mais il y a également des cartes noires, si l’un des agents choisit une carte
noire, la partie s’arrête et c’est l’équipe adverse qui gagne.
Le complice doit donc trouver les bons indices, tout en évitant de semer le
doute dans la tête de son agent.
Ajoutons également qu’il ne faut pas choisi comme indice des mots
relativement proche, par exemple :
- Si le mot à deviner est "cheval", l'indice ne devrait pas être "animal"
(trop direct), mais plutôt quelque chose comme "galop", "ferme" ou
"course" qui sont tous des mots associés à "cheval" sans le nommer
directement.
- L'objectif est d'éviter de donner des indices qui rendraient le mot à
deviner trop évident, ce qui réduirait la difficulté et l'intérêt du jeu. Par
exemple, si le mot à deviner est "football", donner l'indice "sport" serait
trop direct et éliminerait une grande partie du défi pour les devineurs.
Attendus
- Vous devrez réaliser ce jeu avec NodeJS et ExpressJS, il est attendu
une communication “bidirectionnel” à partir des websocket
- Dans le cadre de ce projet, nous allons considérer que le jeu ne devra
gérer uniquement 2 équipes de 2.
Fonctionnalités attendus
- Je dois pouvoir rejoindre une partie à partir d’un lien / d’un mot de
passe, dans ce cas le créateur de la partie est administrateur, et à le
pouvoir de kick les joueurs
- Chaque partie est privée, donc seuls ceux qui ont le lien / le mot de
passes doivent pouvoir accéder à la partie
- Il n’est pas spécifiquement demandé de base de données, faites
comme vous le sentez, mais il pourra être nécessaire d’en utiliser une,
réfléchissez à l’organisation de votre projet.
- L’objectif est donc de gérer 2 équipes de 2 en simultanés, sur une
même partie, l’équipe 1 ne doivent pas voir les mots des autres, à vous
d’utiliser les fonctionnalités appropriés de socket.io pour cet usage
Un minimum d’animations sont attendus, par exemple un effet sur les cartes
qui se tournent etc.