import Matter from "matter-js";

let Bodies = Matter.Bodies;

const codeIcons = [
  {
    element: Bodies.rectangle(100, 0, 40, 40, {
      restitution: 0.9,
      label: "angular",
      render: {
        sprite: {
          texture: "assets/code_icons/angular.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -50, 40, 40, {
      restitution: 0.9,
      label: "antd",
      render: {
        sprite: {
          texture: "assets/code_icons/antd.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -100, 40, 40, {
      restitution: 0.9,
      label: "api_platform",
      render: {
        sprite: {
          texture: "assets/code_icons/api_platform.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -150, 40, 40, {
      restitution: 0.9,
      label: "css",
      render: {
        sprite: {
          texture: "assets/code_icons/css.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -200, 40, 40, {
      restitution: 0.9,
      label: "symfony",
      render: {
        sprite: {
          texture: "assets/code_icons/symfony.png",
          xScale: 0.4,
          yScale: 0.4,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -250, 40, 40, {
      restitution: 0.9,
      label: "docker",
      render: {
        sprite: {
          texture: "assets/code_icons/docker.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -300, 40, 40, {
      restitution: 0.9,
      label: "feathersjs",
      render: {
        sprite: {
          texture: "assets/code_icons/feathersjs.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -350, 40, 40, {
      restitution: 0.9,
      label: "flutter",
      render: {
        sprite: {
          texture: "assets/code_icons/flutter.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -400, 40, 40, {
      restitution: 0.9,
      label: "git",
      render: {
        sprite: {
          texture: "assets/code_icons/git.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -450, 40, 40, {
      restitution: 0.9,
      label: "graphql",
      render: {
        sprite: {
          texture: "assets/code_icons/graphql.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -500, 40, 40, {
      restitution: 0.9,
      label: "html",
      render: {
        sprite: {
          texture: "assets/code_icons/html.png",
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -550, 40, 40, {
      restitution: 0.9,
      label: "ionic",
      render: {
        sprite: {
          texture: "assets/code_icons/ionic.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -600, 40, 40, {
      restitution: 0.9,
      label: "javascript",
      render: {
        sprite: {
          texture: "assets/code_icons/javascript.png",
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -650, 40, 40, {
      restitution: 0.9,
      label: "keystonejs",
      render: {
        sprite: {
          texture: "assets/code_icons/keystonejs.png",
          xScale: 0.08,
          yScale: 0.08,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -700, 40, 40, {
      restitution: 0.9,
      label: "less",
      render: {
        sprite: {
          texture: "assets/code_icons/less.png",
          xScale: 0.05,
          yScale: 0.05,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -750, 40, 40, {
      restitution: 0.9,
      label: "typescript",
      render: {
        sprite: {
          texture: "assets/code_icons/typescript.png",
          xScale: 0.06,
          yScale: 0.06,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -800, 40, 40, {
      restitution: 0.9,
      label: "mongodb",
      render: {
        sprite: {
          texture: "assets/code_icons/mongodb.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -850, 40, 40, {
      restitution: 0.9,
      label: "nestjs",
      render: {
        sprite: {
          texture: "assets/code_icons/nestjs.png",
          xScale: 0.05,
          yScale: 0.05,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -900, 40, 40, {
      restitution: 0.9,
      label: "nodejs",
      render: {
        sprite: {
          texture: "assets/code_icons/nodejs.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -950, 40, 40, {
      restitution: 0.9,
      label: "nosql",
      render: {
        sprite: {
          texture: "assets/code_icons/nosql.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -1000, 40, 40, {
      restitution: 0.9,
      label: "php",
      render: {
        sprite: {
          texture: "assets/code_icons/php.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -1050, 40, 40, {
      restitution: 0.9,
      label: "react",
      render: {
        sprite: {
          texture: "assets/code_icons/react.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -1100, 40, 40, {
      restitution: 0.9,
      label: "redux",
      render: {
        sprite: {
          texture: "assets/code_icons/redux.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -1150, 40, 40, {
      restitution: 0.9,
      label: "restapi",
      render: {
        sprite: {
          texture: "assets/code_icons/restapi.png",
          xScale: 0.15,
          yScale: 0.15,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(100, -1200, 40, 40, {
      restitution: 0.9,
      label: "sass",
      render: {
        sprite: {
          texture: "assets/code_icons/sass.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
  {
    element: Bodies.rectangle(50, -1250, 40, 40, {
      restitution: 0.9,
      label: "sql",
      render: {
        sprite: {
          texture: "assets/code_icons/sql.png",
          xScale: 0.1,
          yScale: 0.1,
        },
      },
    }),
  },
];

export default codeIcons;
