/**
 * string 관련 변환 및 검색에 유용한 함수 모음
 */

import * as Hangul from 'hangul-js';

/**
 * 한글 초성 비교를 통한 매칭 함수
 * @param a 비교대상 문자열
 * @param b 비교대상 문자열
 * @returns 비교 결과값
 */
export function matchKo(a: string, b: string): boolean {
	return Hangul.search(a, b) >= 0;
}
