/**
 * string 관련 변환 및 검색에 유용한 함수 모음
 */

import * as Hangul from 'hangul-js';
import moment from 'moment';

/**
 * 한글 초성 비교를 통한 매칭 함수
 * @param a 비교대상 문자열
 * @param b 비교대상 문자열
 * @returns 비교 결과값
 */
export function matchKo(a: string, b: string): boolean {
	return Hangul.search(a, b) >= 0;
}

/**
 * 두 날짜의 차이 반환 함수
 * @param a 비교할 날짜
 * @param b 배교 대상 날짜
 */
export function getDateDiff(a: string, b: string): number {
	let startDate = moment();
	let endDate = moment();

	startDate = moment(a ?? b, 'YYYY-MM-DD');
	endDate = moment(b ?? a, 'YYYY-MM-DD');
	return endDate.diff(startDate, 'day');
}

/**
 * 오늘 문자열 반환 함수
 * @returns 오늘 문자열
 */
export function getTodayStr() {
	return moment().format('YYYY-MM-DD');
}

/**
 * 마감기한 문자열 반환 함수
 * @param pogDayCnt 마감기한까지 남은 날
 * @returns 문자열의 마감기한
 */
export function getExpireDayStr(pogDayCnt: number) {
	return moment().add(pogDayCnt, 'days').format('YYYY-MM-DD');
}
