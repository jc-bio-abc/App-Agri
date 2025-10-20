import type { Activity, ActivityStatus, ActivityType } from './field.models';

/**
 * Événement présenté dans la timeline d'une parcelle.
 */
export interface FieldActivityEvent {
  id: string;
  activityId: string;
  fieldId: string;
  type: ActivityType;
  status: ActivityStatus;
  date: string;
  description: string;
  highlight?: boolean;
}

/**
 * Représente un regroupement d'activités par mois pour alimenter des graphes simples.
 */
export interface MonthlyActivitySummary {
  month: string;
  planned: number;
  completed: number;
  cancelled: number;
}

/**
 * Résultat retourné par la synchronisation avec un SI externe.
 */
export interface SyncResult {
  activities: Activity[];
  syncedAt: string;
  source: string;
}
