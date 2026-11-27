module.exports = {
  /*
   * Mirrored into `siteMetadata` by gatsby-config.js, and read directly by the SEO
   * component. It lives here rather than only in gatsby-config because the Head API
   * cannot reach React context on Gatsby 4, so `useStaticQuery` is not available to it.
   */
  siteMetadata: {
    title: 'Tobi Omorubore',
    description:
      "I'm software engineer; I enjoy creating things that live on the internet. Build high perfomant mobile and web apps.",
    siteUrl: 'https://tobi-omorubore.dev', // No trailing slash allowed!
    image: '/logo.png', //'/og.png', // Path to your image you placed in the 'static' folder
    twitterUsername: '@OmoruboreO',
  },

  googleSiteVerification: '9wznNvGBzPUFMaw4Y4p14IVjl0XFqmY4bQpiRtmnJAM',

  email: 'tobbyzomo221@gmail.com', //brittany.chiang@gmail.com

  socialMedia: [
    {
      name: 'GitHub',
      url: 'https://github.com/Edamijueda', //https://github.com/bchiang7
    },
    // {
    //   name: 'Instagram',
    //   url: 'https://www.instagram.com/bchiang7',
    // },
    {
      name: 'Twitter',
      url: 'https://twitter.com/OmoruboreO', // https://twitter.com/bchiang7
    },
    {
      name: 'Linkedin',
      url: 'https://www.linkedin.com/in/oluwatobi-omorubore/', // https://www.linkedin.com/in/bchiang7
    },
    {
      name: 'Medium',
      url: 'https://medium.com/@oluwatobi_omorubore', // https://www.linkedin.com/in/bchiang7
    },
    // {
    //   name: 'Codepen',
    //   url: 'https://codepen.io/bchiang7',
    // },
  ],

  navLinks: [
    {
      name: 'About',
      url: '/#about',
    },
    {
      name: 'Experience',
      url: '/#jobs',
    },
    {
      name: 'Work',
      url: '/#projects',
    },
    {
      name: 'Contact',
      url: '/#contact',
    },
  ],

  colors: {
    green: '#64ffda',
    navy: '#0a192f',
    darkNavy: '#020c1b',
  },

  srConfig: (delay = 200, viewFactor = 0.25) => ({
    origin: 'bottom',
    distance: '20px',
    duration: 500,
    delay,
    rotate: { x: 0, y: 0, z: 0 },
    opacity: 0,
    scale: 1,
    easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
    mobile: true,
    reset: false,
    useDelay: 'always',
    viewFactor,
    viewOffset: { top: 0, right: 0, bottom: 0, left: 0 },
  }),
};
