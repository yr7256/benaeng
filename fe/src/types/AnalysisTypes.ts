export interface MostCategory {
	foodCategoryId: number;
	Consumer: number;
	Waste: number;
}

export interface MonthlyReportData {
	countPurchase: number;
	countConsumer: number;
	countWaste: number;
	mostConsumer: MostCategory[];
	mostWaste: MostCategory[];
}
