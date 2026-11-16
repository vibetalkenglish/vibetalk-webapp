// Single source of truth for Pro plan prices. The server uses this to set
// order amounts, so a client can never choose its own price.
export type PlanId = '1_month' | '6_months' | '1_year' | 'lifetime';

export const PLANS: Record<PlanId, { name: string; amount: number }> = {
  '1_month': { name: 'Gói 1 Tháng', amount: 99000 },
  '6_months': { name: 'Gói 6 Tháng', amount: 299000 },
  '1_year': { name: 'Gói 1 Năm', amount: 499000 },
  lifetime: { name: 'Gói Trọn Đời', amount: 899000 },
};

export function isPlanId(value: unknown): value is PlanId {
  return typeof value === 'string' && value in PLANS;
}
