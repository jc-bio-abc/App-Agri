import type { MultiPolygon, Polygon } from 'geojson';

/**
 * Représente une parcelle agricole suivie dans l'application.
 */
export interface Field {
  id: string;
  exploitationId: string;
  nom: string;
  codeInterne?: string;
  surfaceHa: number; // auto-calculée depuis geom
  geom: Polygon | MultiPolygon;
  isLockedGeom: boolean;
  modeProduction: 'bio' | 'conversion_annee1' | 'conversion_annee2' | 'conventionnel';
  statut: 'active' | 'jachere' | 'a_ceder' | 'non_geree';
  irrigation?: 'non' | 'aspersion' | 'goutte_a_goutte' | 'autre';
  notes?: string;
  dateCreation: string;
  dateMaj: string;
  attachments?: Attachment[];
  subzones?: Polygon[]; // zones internes
  histories?: CropYearSummary[]; // cultures passées (pour colonnes "cultures précédentes")
}

/**
 * Fichiers attachés à la parcelle (photos, documents).
 */
export interface Attachment {
  id: string;
  name: string;
  url?: string;
  type: 'photo' | 'doc';
  createdAt: string;
}

/**
 * Synthèse des cultures réalisées sur une campagne.
 */
export interface CropYearSummary {
  annee: number;
  principale?: Culture;
  secondaire?: Culture;
  couvert?: Culture;
}

/**
 * Description d'une culture implantée.
 */
export interface Culture {
  nom: string;
  variete?: string;
  surfaceHa?: number;
  codeTelepac?: string;
}

export type ActivityStatus = 'brouillon' | 'planifiee' | 'en_cours' | 'terminee' | 'annulee';
export type ActivityType = 'semis' | 'labour' | 'pulverisation' | 'recolte' | 'autre';

/**
 * Activités réalisées ou planifiées sur une ou plusieurs parcelles.
 */
export interface Activity {
  id: string;
  fieldIds: string[];
  type: ActivityType;
  status: ActivityStatus;
  datePrevue?: string;
  dateReelle?: string;
  sursemis?: boolean;
  typeSemis?: string;
  intrants?: InputUse[];
  commentaire?: string;
  coutTotal?: number;
  eta?: { name?: string; photos?: string[] };
}

/**
 * Intrant utilisé lors d'une activité.
 */
export interface InputUse {
  produit: string;
  fournisseur?: string[];
  lot?: string;
  doseHa?: number;
  unite?: 'kg/ha' | 'l/ha' | 'graines_m2';
  quantiteTotale?: number;
  entrepot?: string;
  coutUnitaire?: number;
}
