/** 식품 영양정보 type */
interface Data {
	title: string;
	weight: string | null;
	percent: number | null;
}

function FoodTable() {
	// 식품 영양정보 더미 데이터
	const tableData: Data[] = [
		{
			title: '탄수화물',
			weight: '14g',
			percent: 4,
		},
		{
			title: '당류',
			weight: '2g',
			percent: 2,
		},
		{
			title: '단백질',
			weight: '2g',
			percent: 4,
		},
		{
			title: '지방',
			weight: '2.6g',
			percent: 5,
		},
		{
			title: '포화지방',
			weight: '0.7g',
			percent: 5,
		},
		{
			title: '트랜스지방',
			weight: '0g',
			percent: null,
		},
		{
			title: '콜레스테롤',
			weight: '4mg',
			percent: 4,
		},
		{
			title: '단백질',
			weight: '2g',
			percent: 4,
		},
	];
	return (
		<table className="h-auto px-6 w-76">
			<thead className="h-9 bg-green">
				<tr className="border-b-2 stroke">
					<th className="px-6 py-2 text-xs font-bold text-white dark:text-black">1회 제공량당 함량</th>
					<th aria-label="Save" />
					<th className="px-6 py-2 text-right text-xxs">
						1일 영양성분
						<br /> 기준치에 대한 비율
					</th>
				</tr>
			</thead>
			<tbody className="text-sm">
				{tableData.map(item => (
					<tr className="border-b-2 component stroke">
						<td className="px-6 py-2 text-text">{item.title}</td>
						<td className="py-2 font-bold text-text">{item.weight ? item.weight : '-'}</td>
						<td className="px-6 py-2 font-bold text-right text-text">{item.percent ? `${item.percent}%` : '-'}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

export default FoodTable;
