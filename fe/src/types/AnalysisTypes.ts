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

export interface CalendarData {
	categoryId: number;
	foodName: string;
	foodId: number;
	purchaseRecords: string[];
	purchaseCycle: number;
}

export interface CalendarDataResponse {
	calData: CalendarData[];
}
