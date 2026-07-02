import moon from '../assets/moon.png'
import mars from '../assets/mars.png'
import europa from '../assets/europa.png'
import titan from '../assets/titan.png'



const destinationData = [
    {
        id: 0,
        name: 'MOON' , 
        about: 'See our planet from a completely new perspective. A perfect weekend getaway.',
        desc: `See our planet from a completely new perspective. As humanity's first stepping stone into the cosmos, 
        the lunar surface offers an unforgettable retro-futuristic weekend getaway. Walk among historic landing sites, 
        experience low-gravity base jumping, and watch Earthrise from the comfort of a pressurized bio-dome.`,
        img : moon,
        equaRadius : 1738.1,
        oritalPeriod : 27.3217,
        density: 3.34,
        solarAphelion : 0.4055,
    },
    {
        id: 1,
        name: 'MARS',
        about: "Don't forget your hiking boots. You'll need them to tackle Olympus Mons.",
        desc: `Don't forget your hiking boots. You'll need them to tackle Olympus Mons, the tallest planetary mountain 
        in our solar system. It's three times the height of Mount Everest, and the views are absolutely breathtaking.`,
        img: mars,
        equaRadius : 3396.19,
        oritalPeriod : 686.98 ,
        density: 3.93,
        solarAphelion : 249.2,
    },
    {
        id: 2,
        name: 'EUROPA',
        about: 'The ultimate luxury ice-skating experience, surrounded by deep-space bioluminescence.',
        desc: `The smallest of the four Galilean moons orbiting Jupiter, Europa is a cryo-lover's dream. With a surface 
        made of solid water ice, it is the ultimate luxury ice-skating and deep-sea exploration destination in the system.`,
        img: europa,
        equaRadius : 1560.8,
        oritalPeriod : 3.55118,
        density: 3.01,
        solarAphelion : 0,
    },
    {
        id: 3,
        name: 'TITAN',
        about: 'Swim in liquid methane lakes under a dense, golden alien atmosphere.',
        desc: `The only moon in the solar system known to have a dense atmosphere and massive liquid seas. 
        Titan is an explorer's ultimate playground. Put on your thermal wingsuit and coast through the thick, 
        golden nitrogen skies, or charter a submarine cruise to explore the deep methane depths of Kraken Mare.`,
        img: titan,
        equaRadius : 2574.73,
        oritalPeriod : 15.95,
        density: 1.88,
        solarAphelion : 1.25706,
    }
]

export default destinationData