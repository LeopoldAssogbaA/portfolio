const devProjects = [
  {
    name: "Application webinaire",
    type: "desktop",
    mockup: "assets/mockups/webinar.png",
    company: "MediaXtend",
    date: "04/2020",
    stack: "FeatherJS, Sequelize, SocketIo, React, Redux, Open-Vidu",
    description: `
      Le projet à débuté sous la forme d'une P.O.C. (Proof of concept) et à rapidement évolué.
      Le projet devait permettre à des professionnels de la santé d'animer et d'assister à des webinaire.
      A terme le projet permettait de discuter dans un chat en temps réel avec les différents participants du webinaire.
      Ces derniers pouvait également recevoir le flux vidéo de l'intervenant, qu'il présente son contenu à la caméra ou qu'il diffuse un document.
      L'intervenant pouvait également soumettre des questionnaires et suivre le taux de participation en temps réel.
    `,
  },
  {
    name: "Super Block Heroes",
    type: "desktop",
    mockup: "assets/mockups/superblockheroes.png",
    company: "Wild Code School",
    date: "10/2019",
    stack: "Angular, SocketIo, NestJS, TypeORM",
    description: `
    Réaliser un jeu multijoueur autour de tétris;
    Tel était l'enjeu de ce projet d'application. Au sein d'une équipe de 4 développeurs . 
    Nous avons réaliser un jeu collaboratif dans lequel 4 joueurs maximum, jouaient ensemble.
    L'objectif: réaliser des lignes pour infliger des dégats à un monstre.
    Chaque pouvait choisir son personnage dans la boutique moyennant quelques golds (obtenus en fin de partie).
    `,
  },
  {
    name: " JustFoot",
    type: "mobile",
    mockup: "assets/mockups/justfoot.png",
    company: "Wild Code School",
    date: "03/2019",
    stack: "Angular, Ionic, Flutter, KeystoneJS, Docker, GraphQL",
    description: `
    Création d'une application Mobile.
    Pour répondre à un besoin d’impartialité sur la notation des performances des joueurs, nous avons imaginé JustFoot. 
    La notation des joueurs ne sera plus seulement réservée à certains journalistes professionnels, mais accessibles à tous.
    Chaque supporter jugera les joueurs de son équipe et pourra consulter les notations de ses amis et des autres utilisateurs du service.
    L'application étant avant tout communautaire, nous avons imaginé un flux d'actualité alimenté par les posts des utilisateurs avec des photos ou des images de leur galerie.
    
    L'application finale permettait de choisir son équipe, de noter ses joueurs et d'alimenter le flux d'actualité. Une connexion automatique et plusieurs autres foncitonnalités on également été implémentées.
    `,
  },
  {
    name: "Abcell bio",
    type: "desktop",
    mockup: "assets/mockups/abcellbio.png",
    company: "Wild Code School",
    date: "03/2019",
    stack: "Angular, Ionic, Flutter, KeystoneJS, Docker, GraphQL",
    description: `
    Abcell-bio est une société de biotechnologie située au sein du Genopole à Evry, spécialisée dans l’isolement des cellules souches humaines et de cellules primaires issues des tissus périnataux.
    Ces produits sont créés dans le cadre de la recherche.
    Pour le compte de cette société nous devions créer un site web d’après une interface utilisateur maquettée par un graphiste prestataire externe de l’entreprise.
    Nous devions également mettre en place un serveur et une base de données pour stocker les informations des différents produits proposés par l’entreprise ainsi que d’autres informations présentes sur le site web telles que les actualités ou les différents membres de l’entreprise.
    Nous avons mis a disposition une interface d’administration pour leur permettre de gérer le contenu du site web.
    `,
  },
  {
    name: "Landing Page",
    type: "desktop",
    mockup: "assets/mockups/b4road.png",
    company: "B4road",
    date: "02/2020",
    stack: "Html/Css/Js",
    description: `
    Créée pour répondre à une demande urgente au début de l'année 2020, la landing page de B4road présente l'entreprise et son activité.
    `,
  },
];

export default devProjects;
