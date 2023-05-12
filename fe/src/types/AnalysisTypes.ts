export interface MostCategory {
	foodCategoryId: number;
	consumer: number;
	waste: number;
}

export interface MonthlyReportData {
	countPurchase: number;
	countConsumer: number;
	countWaste: number;
	mostConsumer: MostCategory[];
	mostWaste: MostCategory[];
}

export interface PurchaseData {
	name: string;
}

export interface CalendarData {
	name: string;
}
