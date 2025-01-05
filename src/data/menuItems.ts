import { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    id: 'curas',
    label: 'CURAS',
    hasChildren: true,
    children: [
      { id: 'erosiones', label: 'EROSIONES', hasChildren: true, children: [] },
      {
        id: 'heridas-contusas',
        label: 'HERIDAS CONTUSAS',
        hasChildren: true,
        children: [],
      },
      {
        id: 'heridas-incisas',
        label: 'HERIDAS INCISAS',
        hasChildren: true,
        children: [],
      },
      {
        id: 'quemaduras',
        label: 'QUEMADURAS',
        hasChildren: true,
        children: [],
      },
      {
        id: 'ulcera-varicosa',
        label: 'ULCERA VARICOSA',
        hasChildren: true,
        children: [],
      },
      {
        id: 'ulceras-decubito',
        label: 'ULCERAS POR DECUBITO',
        hasChildren: true,
        children: [],
      },
      {
        id: 'herida-quirurgica',
        label: 'Herida Quirúrgica',
        hasChildren: false,
      },
    ],
  },
  {
    id: 'protocolos',
    label: 'PROTOCOLOS',
    hasChildren: true,
    children: [
      {
        id: 'ictus-agudo',
        label: 'ICTUS AGUDO',
        hasChildren: true,
        children: [],
      },
      {
        id: 'paciente-alt-respiracion',
        label: 'PACIENTE ALT. RESPIRACIÓN',
        hasChildren: false,
      },
    ],
  },
  {
    id: 'tecnicas',
    label: 'TECNICAS',
    hasChildren: true,
    children: [
      {
        id: 'aislamiento-respiratorio',
        label: 'AISLAMIENTO RESPIRATORIO',
        hasChildren: true,
      },
      { id: 'colaboracion', label: 'COLABORACION', hasChildren: true },
      {
        id: 'constantes-vitales',
        label: 'CONSTANTES VITALES:',
        hasChildren: true,
      },
      {
        id: 'derivacion-especialista',
        label: 'DERIVACIÓN A ESPECIALISTA',
        hasChildren: true,
      },
      {
        id: 'electrocardiograma',
        label: 'ELECTROCARDIOGRAMA',
        hasChildren: true,
      },
      { id: 'enema-limpieza', label: 'ENEMA DE LIMPIEZA', hasChildren: true },
      { id: 'monitorizacion', label: 'MONITORIZACION', hasChildren: true },
      { id: 'oxigenoterapia', label: 'OXIGENOTERAPIA', hasChildren: true },
      {
        id: 'pruebas-diagnosticas',
        label: 'PRUEBAS DIAGNOSTICAS',
        hasChildren: true,
      },
      {
        id: 'recogida-muestras',
        label: 'RECOGIDA MUESTRAS LABORATORIO',
        hasChildren: true,
      },
      {
        id: 'recogida-muestras-conjuntas',
        label: 'RECOGIDA MUESTRAS LABORATORIO CONJUNTAS',
        hasChildren: true,
      },
      { id: 'reglas-ottawa', label: 'REGLAS DE OTTAWA', hasChildren: true },
      { id: 'venoclisis', label: 'VENOCLISIS', hasChildren: true },
      {
        id: 'canula-traqueotomia',
        label: 'CANULA TRAQUEOTOMIA',
        hasChildren: false,
      },
      { id: 'glucemia-capilar', label: 'GLUCEMIA CAPILAR', hasChildren: false },
      { id: 'lavado-gastrico', label: 'LAVADO GASTRICO', hasChildren: false },
      { id: 'nebulizacion', label: 'NEBULIZACION', hasChildren: false },
      {
        id: 'sonda-nasogastrica',
        label: 'SONDA NASOGASTRICA',
        hasChildren: false,
      },
    ],
  },
  {
    id: 'tecnicas-auxiliares',
    label: 'TECNICAS AUXILIARES',
    hasChildren: true,
    children: [
      { id: 'enemas', label: 'ENEMAS (aCCIÓN DELEGADA)', hasChildren: true },
      { id: 'muestras-orina', label: 'MUESTRAS DEORINA', hasChildren: true },
      {
        id: 'preparacion-paciente',
        label: 'PREPARACION PACIENTE',
        hasChildren: true,
      },
      { id: 'recogida-heces', label: 'RECOGIDA HECES', hasChildren: true },
      {
        id: 'administracion-ontrste-via-oral',
        label: 'ADMINISTRACION CONTRASTE CIA ORAL',
        hasChildren: false,
      },
      {
        id: 'aplicación-medidas-protccion',
        label: 'APLICACION MEDIDAS PROTECCION',
        hasChildren: false,
      },
      { id: 'ayuda-vestido', label: 'AYUDA VESTIDO', hasChildren: false },
      {
        id: 'cambo-bolsa-orina',
        label: 'CMBIO BOLSA ORIN',
        hasChildren: false,
      },
      { id: 'cambio-pañal', label: 'CAMBIO PAÑAL', hasChildren: false },
      { id: 'cambio-posturaL', label: 'CAMBIO POSTURAL', hasChildren: false },
      {
        id: 'colaboación ingesta',
        label: 'COLABORACIÓN INGESTA',
        hasChildren: false,
      },
      { id: 'mas', label: '....', hasChildren: false },
    ],
  },
  { id: 'vendajes', label: 'VENDAJES', hasChildren: true, children: [] },
];
