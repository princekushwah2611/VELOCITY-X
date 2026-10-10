/**
 * VELOCITY X — Central Content & Data Configuration (v2.0)
 * All editorial copy, demonstration metrics, and chapter definitions.
 */

export const HERO_CONTENT = {
  headline: 'WELCOME ITZFIZZ',
  tagline: 'FEEL THE MOTION. CONTROL THE EXPERIENCE.',
  brandTitle: 'VELOCITY X',
  studioLabel: 'SYS.V-X PROTOCOL // 3D KINETIC RIG',
  subheading: 'CINEMATIC REAL-TIME AUTOMOTIVE CAMPAIGN',
};

export const STATS_DATA = [
  {
    id: 'stat-1',
    sector: 'TELEMETRY // S-01',
    number: '58%',
    label: 'Increase in pickup point usage',
    trend: 'positive',
    chapter: 1,
    checkpoint: 0.18,
  },
  {
    id: 'stat-2',
    sector: 'TELEMETRY // S-02',
    number: '23%',
    label: 'Reduction in customer phone calls',
    trend: 'negative',
    chapter: 2,
    checkpoint: 0.38,
  },
  {
    id: 'stat-3',
    sector: 'TELEMETRY // S-03',
    number: '27%',
    label: 'Improvement in pickup experience',
    trend: 'positive',
    chapter: 3,
    checkpoint: 0.60,
  },
  {
    id: 'stat-4',
    sector: 'TELEMETRY // S-04',
    number: '40%',
    label: 'Reduction in delivery friction',
    trend: 'negative',
    chapter: 4,
    checkpoint: 0.82,
  },
];

export const CHAPTERS_DATA = [
  {
    number: '01',
    title: 'IGNITION',
    subtitle: 'POWER ON // FRONT THREE-QUARTER STANCE',
    range: [0.0, 0.20],
    description: 'Headlights ignite as the camera establishes an intimate front three-quarter profile.',
  },
  {
    number: '02',
    title: 'LAUNCH',
    subtitle: 'ACCELERATION // SIDE-PROFILE TRACKING SHOT',
    range: [0.20, 0.45],
    description: 'The vehicle surges horizontally across the frame with synchronized wheel spin.',
  },
  {
    number: '03',
    title: 'AERO LAB',
    subtitle: 'DETAIL ZOOM // DOWFORCE & TORSIONAL MATRIX',
    range: [0.45, 0.65],
    description: 'Low-angle orbit around the front wheel and active carbon splitter.',
  },
  {
    number: '04',
    title: 'REVEAL',
    subtitle: 'REAR THREE-QUARTER // COLOR & DRAG ORBIT',
    range: [0.65, 0.85],
    description: 'Flaring brake diffusers and interactive bespoke paint color switching.',
  },
  {
    number: '05',
    title: 'RELEASE',
    subtitle: 'HIGH WIDE EXIT // UNPIN TRANSITION',
    range: [0.85, 1.0],
    description: 'Camera rises into a sweeping aerial view as the hero seamlessly releases into the engineering section.',
  },
];

export const PAINT_COLORS = [
  { id: 'lime', name: 'Electric Lime', hex: '#c6ff00', label: 'V-X SIGNATURE' },
  { id: 'graphite', name: 'Stealth Carbon', hex: '#1c1d21', label: 'MATTE FINISH' },
  { id: 'white', name: 'Apex White', hex: '#f0f2f5', label: 'CERAMIC COAT' },
  { id: 'red', name: 'Rosso Corsa', hex: '#d32f2f', label: 'RACE LIVERY' },
  { id: 'chrome', name: 'Liquid Chrome', hex: '#94a3b8', label: 'SPECULAR HIGH' },
];

export const CALLOUT_SPECS = [
  {
    chapter: 3,
    title: 'ACTIVE DOWNFORCE',
    value: '620 KG @ 250 KM/H',
    desc: 'Venturi tunnels produce ground-effect low pressure.',
  },
  {
    chapter: 3,
    title: 'T1000 MONOCOQUE',
    value: '50,000 NM/DEG',
    desc: 'Aerospace-grade autoclave carbon chassis.',
  },
  {
    chapter: 3,
    title: 'DUAL MOTOR AXLE',
    value: '1,020 HP // 1,400 NM',
    desc: 'Sub-millisecond dynamic torque vectoring.',
  },
];
