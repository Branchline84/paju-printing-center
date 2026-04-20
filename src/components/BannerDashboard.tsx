"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import styles from './BannerDashboard.module.css';

interface NewsItem { title: string; link: string; }
interface QuizQuestion { q: string; opts: string[]; ans: number; exp: string; }

const DEFAULT_NEWS: NewsItem[] = [
  { title: "소상공인 경영애로 해소 위해 '맞춤형 컨설팅' 지원 확대", link: '/notice' },
  { title: "파주출판단지 인쇄 소공인 대상 '친환경 잉크 기술 교육' 신청 접수", link: '/notice' },
  { title: "2024년 상반기 정책자금 지원 공고: 최저 금리 2.5% 적용", link: '/notice' },
  { title: "파주시, 인쇄 협업 시스템 고도화 사업 참여 업체 모집", link: '/notice' },
];

const ALL_QUIZ: QuizQuestion[] = [
  {
    q: "중대재해처벌법이 상시근로자 50인 이상 사업장에 최초 시행된 날짜는?",
    opts: ["2021년 1월 27일", "2022년 1월 27일", "2022년 7월 1일", "2023년 1월 27일"],
    ans: 1,
    exp: "중대재해처벌법은 2022년 1월 27일부터 상시근로자 50인 이상(건설업 공사금액 50억원 이상) 사업장에 시행되었습니다.",
  },
  {
    q: "5인 이상 50인 미만 사업장에 중대재해처벌법이 적용된 시기는?",
    opts: ["2022년 7월", "2023년 1월", "2024년 1월 27일", "2025년 1월"],
    ans: 2,
    exp: "2024년 1월 27일부터 5인 이상 50인 미만 사업장에도 중대재해처벌법이 확대 적용되었습니다.",
  },
  {
    q: "중대재해처벌법 적용이 제외되는 사업장은?",
    opts: ["5인 미만 사업장", "10인 미만 사업장", "30인 미만 사업장", "모든 사업장에 적용"],
    ans: 0,
    exp: "상시근로자 5인 미만 사업장은 중대재해처벌법 적용 대상에서 제외됩니다.",
  },
  {
    q: "중대산업재해 정의 중 '부상자' 기준으로 옳은 것은?",
    opts: [
      "동일 사고로 3개월 이상 치료 부상자 3명 이상",
      "동일 사고로 6개월 이상 치료 부상자 2명 이상",
      "동일 사고로 1개월 이상 치료 부상자 5명 이상",
      "동일 사고로 6개월 이상 치료 부상자 3명 이상",
    ],
    ans: 1,
    exp: "중대산업재해 부상자 기준은 동일한 사고로 6개월 이상 치료가 필요한 부상자가 2명 이상인 경우입니다.",
  },
  {
    q: "중대산업재해 중 '직업성 질병자' 기준은?",
    opts: [
      "동일 유해요인으로 6개월 이내 2명 이상",
      "동일 유해요인으로 1년 이내 3명 이상",
      "동일 유해요인으로 2년 이내 5명 이상",
      "동일 유해요인으로 1년 이내 5명 이상",
    ],
    ans: 1,
    exp: "동일한 유해요인으로 직업성 질병자가 1년 이내에 3명 이상 발생하면 중대산업재해에 해당합니다.",
  },
  {
    q: "경영책임자가 중대산업재해(사망)를 발생시킨 경우 형사처벌 기준은?",
    opts: [
      "6개월 이상 징역 또는 5억 이하 벌금",
      "1년 이상 징역 또는 10억 이하 벌금",
      "2년 이상 징역 또는 20억 이하 벌금",
      "3년 이상 징역 또는 30억 이하 벌금",
    ],
    ans: 1,
    exp: "경영책임자는 사망 중대산업재해 발생 시 1년 이상 징역 또는 10억원 이하 벌금에 처할 수 있습니다.",
  },
  {
    q: "경영책임자가 중대산업재해(부상·질병)를 발생시킨 경우 처벌 기준은?",
    opts: [
      "3년 이하 징역 또는 5000만원 이하 벌금",
      "5년 이하 징역 또는 5000만원 이하 벌금",
      "7년 이하 징역 또는 1억원 이하 벌금",
      "10년 이하 징역 또는 3억원 이하 벌금",
    ],
    ans: 2,
    exp: "부상·질병 중대산업재해의 경우 경영책임자는 7년 이하 징역 또는 1억원 이하 벌금에 처합니다.",
  },
  {
    q: "사망 중대산업재해 발생 시 법인에게 부과할 수 있는 최대 벌금은?",
    opts: ["10억원", "30억원", "50억원", "100억원"],
    ans: 2,
    exp: "법인은 사망 중대산업재해 발생 시 50억원 이하의 벌금에 처할 수 있습니다.",
  },
  {
    q: "부상·질병 중대산업재해 시 법인 최대 벌금은?",
    opts: ["1억원", "5억원", "10억원", "30억원"],
    ans: 2,
    exp: "부상·질병 중대산업재해의 경우 법인은 10억원 이하의 벌금에 처합니다.",
  },
  {
    q: "중대재해처벌법상 '경영책임자'에 해당하지 않는 자는?",
    opts: [
      "대표이사",
      "안전보건관리책임자(현장소장)",
      "사업을 대표하고 총괄하는 권한과 책임이 있는 사람",
      "개인사업주",
    ],
    ans: 1,
    exp: "경영책임자는 사업을 대표하고 총괄하는 권한과 책임이 있는 자(대표이사, 개인사업주 등)를 말합니다. 현장 안전보건관리책임자는 별도 개념입니다.",
  },
  {
    q: "경영책임자의 안전보건관리체계 구축 의무 중 '전담 조직'을 반드시 설치해야 하는 기준은?",
    opts: [
      "상시근로자 100인 이상",
      "상시근로자 300인 이상",
      "상시근로자 500인 이상 또는 건설업 시공능력 200위 이내",
      "모든 사업장",
    ],
    ans: 2,
    exp: "상시근로자 500인 이상 또는 건설업 시공능력 200위 이내 기업은 안전보건 전담 조직을 반드시 설치해야 합니다.",
  },
  {
    q: "경영책임자가 안전보건 관계 법령 의무이행 여부를 점검해야 하는 최소 주기는?",
    opts: ["월 1회", "분기 1회", "반기 1회", "연 1회"],
    ans: 2,
    exp: "경영책임자는 반기(6개월)에 1회 이상 안전보건 관계 법령의 의무이행 여부를 점검해야 합니다.",
  },
  {
    q: "중대재해 발생 시 재발방지대책을 수립하고 이행해야 하는 의무자는?",
    opts: ["현장 안전관리자", "경영책임자 및 사업주", "노동조합", "고용노동부"],
    ans: 1,
    exp: "중대재해 발생 시 경영책임자(및 사업주)는 재발방지대책을 수립하고 이행할 의무가 있습니다.",
  },
  {
    q: "도급인(원청)은 수급인(하청) 근로자에 대해 어떤 경우에 중대재해처벌법 책임을 지는가?",
    opts: [
      "수급인 근로자가 도급인의 사업장에서만 작업할 때",
      "도급인이 실질적으로 지배·운영·관리하는 장소에서 재해가 발생한 경우",
      "수급인의 매출이 도급인보다 적을 때",
      "도급 계약서에 안전 조항이 없을 때",
    ],
    ans: 1,
    exp: "도급인이 실질적으로 지배·운영·관리하는 사업장이나 장소에서 수급인 근로자에게 재해가 발생한 경우 도급인도 책임을 집니다.",
  },
  {
    q: "중대시민재해에서 '사망자' 기준은?",
    opts: ["1명 이상", "3명 이상", "5명 이상", "10명 이상"],
    ans: 0,
    exp: "중대시민재해는 특정 원료·제조물, 공중이용시설·공중교통수단으로 사망자가 1명 이상 발생한 경우입니다.",
  },
  {
    q: "중대시민재해에서 '부상자' 기준은?",
    opts: [
      "2개월 이상 치료 부상자 5명 이상",
      "3개월 이상 치료 부상자 5명 이상",
      "2개월 이상 치료 부상자 10명 이상",
      "6개월 이상 치료 부상자 2명 이상",
    ],
    ans: 2,
    exp: "중대시민재해 부상자 기준은 2개월 이상 치료가 필요한 부상자가 10명 이상인 경우입니다.",
  },
  {
    q: "다음 중 '위험성평가'의 주요 목적으로 가장 옳은 것은?",
    opts: [
      "사고 발생 후 원인 파악",
      "유해·위험요인을 사전에 파악하고 제거·감소",
      "근로자 임금 결정",
      "법적 서류 작성",
    ],
    ans: 1,
    exp: "위험성평가는 작업장의 유해·위험요인을 사전에 파악하여 제거하거나 감소시키기 위한 예방 활동입니다.",
  },
  {
    q: "산업안전보건법상 사업주가 근로자에게 실시해야 하는 안전보건교육 중 채용 시 교육 시간은?",
    opts: ["1시간 이상", "4시간 이상", "8시간 이상", "16시간 이상"],
    ans: 1,
    exp: "사업주는 근로자를 채용할 때 4시간 이상의 안전보건교육을 실시해야 합니다.",
  },
  {
    q: "근로자에게 안전보건 관련 정보를 제공하지 않아 중대재해가 발생한 경우 경영책임자의 법적 책임은?",
    opts: [
      "민사상 손해배상만 적용",
      "중대재해처벌법에 따른 형사처벌 가능",
      "과태료만 부과",
      "책임 없음",
    ],
    ans: 1,
    exp: "안전보건 정보 미제공으로 중대재해가 발생하면 경영책임자는 중대재해처벌법에 따른 형사처벌을 받을 수 있습니다.",
  },
  {
    q: "작업중지권이란?",
    opts: [
      "관리자가 비효율 작업을 중단시키는 권리",
      "근로자가 급박한 위험 발생 시 작업을 중지하고 대피할 수 있는 권리",
      "고용노동부가 사업장을 강제 폐쇄하는 권한",
      "근로자가 야간작업을 거부하는 권리",
    ],
    ans: 1,
    exp: "작업중지권은 근로자가 급박한 위험이 있을 때 작업을 멈추고 대피할 수 있는 권리로, 이를 이유로 불이익 처우를 해서는 안 됩니다.",
  },
  {
    q: "중대재해처벌법과 산업안전보건법의 주된 차이점으로 옳은 것은?",
    opts: [
      "중대재해처벌법은 현장 관리자를 처벌하고, 산안법은 경영책임자를 처벌",
      "중대재해처벌법은 경영책임자를, 산안법은 주로 현장 안전관리자·사업주를 처벌 대상으로 삼음",
      "두 법은 동일한 처벌 기준을 가짐",
      "산안법은 폐지되어 중대재해처벌법으로 통합됨",
    ],
    ans: 1,
    exp: "중대재해처벌법은 사업을 총괄하는 경영책임자를 주요 수범자로 하며, 산안법은 사업주·안전관리자 등 현장 이행 주체를 대상으로 합니다.",
  },
  {
    q: "화학물질을 취급하는 사업장에서 반드시 비치하고 근로자에게 제공해야 하는 자료는?",
    opts: ["품질성적서", "물질안전보건자료(MSDS)", "원산지증명서", "환경영향평가서"],
    ans: 1,
    exp: "화학물질 취급 사업장은 물질안전보건자료(MSDS)를 비치하고, 근로자가 쉽게 볼 수 있도록 게시해야 합니다.",
  },
  {
    q: "밀폐공간 작업 전 반드시 실시해야 하는 조치는?",
    opts: [
      "관리자 승인 후 즉시 입장",
      "산소 및 유해가스 농도 측정 후 환기",
      "작업 완료 후 가스 농도 확인",
      "안전모 착용만으로 충분",
    ],
    ans: 1,
    exp: "밀폐공간 작업 전에는 산소 농도(18% 이상) 및 유해가스 농도를 반드시 측정하고 충분히 환기한 후 입장해야 합니다.",
  },
  {
    q: "추락재해 예방을 위해 높이 몇 m 이상 작업 시 안전난간, 추락방지망 등을 설치해야 하는가?",
    opts: ["0.5m", "1m", "2m", "3m"],
    ans: 2,
    exp: "높이 2m 이상의 작업 장소에서는 안전난간 설치, 추락방지망 설치 등 추락 예방 조치를 해야 합니다.",
  },
  {
    q: "끼임(협착) 재해 예방을 위한 기계 안전조치로 옳지 않은 것은?",
    opts: [
      "덮개 및 방호장치 설치",
      "기계 가동 중 점검 금지",
      "기계 작동 중 방호장치 제거",
      "잠금장치(LOTO) 적용 후 점검",
    ],
    ans: 2,
    exp: "기계 가동 중 방호장치를 제거하는 것은 극히 위험하며 금지됩니다. 점검 시에는 반드시 기계를 정지하고 잠금장치(LOTO)를 적용해야 합니다.",
  },
  {
    q: "감전 재해 예방을 위한 전기 작업의 기본 원칙은?",
    opts: [
      "전원을 켠 상태로 작업하여 시간 절약",
      "전원 차단 후 잠금·표지 부착(LOTO) 후 작업",
      "절연장갑만 착용하면 전원 유지 가능",
      "동료가 옆에 있으면 통전 상태로 작업 가능",
    ],
    ans: 1,
    exp: "전기 작업 시에는 반드시 전원을 차단하고 잠금·태그아웃(LOTO)을 적용하여 타인이 전원을 투입할 수 없도록 한 후 작업해야 합니다.",
  },
  {
    q: "화재·폭발 예방을 위한 인화성 물질 취급 시 주의사항으로 옳지 않은 것은?",
    opts: [
      "정전기 방지 접지 설치",
      "환기 철저히 유지",
      "화기 작업 인근 보관 편의를 위해 근처에 적재",
      "소화기 비치 및 대피 경로 확보",
    ],
    ans: 2,
    exp: "인화성 물질은 화기 작업 근처에 보관하면 폭발 위험이 높습니다. 반드시 별도의 지정 저장소에 보관해야 합니다.",
  },
  {
    q: "사업장 내 비상대응계획에 반드시 포함되어야 하는 내용이 아닌 것은?",
    opts: [
      "비상 연락망 및 대피 경로",
      "화재·폭발 시 초기 대응 절차",
      "근로자 임금 지급 기준",
      "응급처치 방법 및 119 신고 절차",
    ],
    ans: 2,
    exp: "비상대응계획에는 비상 연락망, 대피 경로, 초기 대응 절차, 응급처치 방법 등이 포함되어야 합니다. 임금 지급은 해당 사항이 아닙니다.",
  },
  {
    q: "근로자대표 또는 명예산업안전감독관과의 협의는 어떤 사항에 해당하는가?",
    opts: [
      "사업장 내 안전보건 관련 사항을 근로자 측과 협의하는 의무",
      "고용노동부 감독관과의 면담",
      "경영이사회 안전 보고",
      "보험사와의 협약",
    ],
    ans: 0,
    exp: "사업주는 산업안전보건법에 따라 근로자대표 또는 명예산업안전감독관과 안전보건에 관한 사항을 협의해야 합니다.",
  },
  {
    q: "산업재해가 발생했을 때 사업주의 의무로 옳지 않은 것은?",
    opts: [
      "재해를 은폐하거나 사실과 다르게 신고",
      "재해자에게 즉시 응급처치 실시",
      "사망재해 등 중대재해 발생 시 즉시 고용노동부에 신고",
      "재발방지 대책 수립",
    ],
    ans: 0,
    exp: "산업재해를 은폐하거나 허위 신고하는 것은 산업안전보건법 위반입니다. 재해 발생 사실을 정확히 신고하고 필요한 조치를 취해야 합니다.",
  },
  {
    q: "특수형태근로종사자(특고)에 대한 중대재해처벌법 적용 여부는?",
    opts: [
      "적용되지 않음",
      "근로계약이 없어 전혀 보호 불가",
      "노무를 제공받는 자의 사업에서 재해 발생 시 적용 가능",
      "사업주가 선택적으로 적용 결정",
    ],
    ans: 2,
    exp: "중대재해처벌법은 근로자 외에도 노무를 제공하는 자(특수형태근로종사자 등)의 안전보건을 보호하는 내용을 포함합니다.",
  },
  {
    q: "사업장에서 근골격계 질환 예방을 위한 조치로 가장 적절한 것은?",
    opts: [
      "무거운 물건을 들 때 허리를 구부려 빠르게 처리",
      "근골격계 부담 작업 유해요인 조사 및 개선",
      "근로자가 스스로 알아서 해결",
      "야간 작업 증가로 낮 시간 부담 경감",
    ],
    ans: 1,
    exp: "사업주는 근골격계 부담 작업에 대해 유해요인을 조사하고 개선 계획을 수립·이행해야 합니다.",
  },
  {
    q: "야간작업 근로자의 건강 보호를 위해 사업주가 실시해야 하는 것은?",
    opts: [
      "야간작업 완전 금지",
      "특수건강진단 실시",
      "추가 수당만 지급하면 충분",
      "자체적으로 해결하도록 방치",
    ],
    ans: 1,
    exp: "야간작업 근로자에 대해 사업주는 특수건강진단을 실시하여 건강 이상 여부를 확인하고 보호 조치를 해야 합니다.",
  },
  {
    q: "뇌심혈관계 질환(과로사 등)을 예방하기 위해 사업주가 해야 하는 것은?",
    opts: [
      "연장근로를 최대한 확대하여 생산성 증대",
      "업무량 조절, 휴식 보장, 건강진단 실시",
      "자발적 야근에는 개입하지 않음",
      "뇌심혈관계는 개인 질환이므로 사업주 무관",
    ],
    ans: 1,
    exp: "사업주는 뇌심혈관계 질환 예방을 위해 과도한 업무 부담을 줄이고, 정기 건강진단 및 작업환경 개선을 해야 합니다.",
  },
  {
    q: "중대재해처벌법에서 '양벌규정'이 의미하는 것은?",
    opts: [
      "경영책임자와 법인 모두 처벌 가능",
      "근로자와 관리자를 동시에 처벌",
      "동일 사고에 2개의 법을 중복 적용",
      "처벌 횟수를 두 배로 늘리는 규정",
    ],
    ans: 0,
    exp: "양벌규정은 위반 행위를 한 경영책임자 개인뿐만 아니라 법인도 함께 처벌할 수 있도록 하는 규정입니다.",
  },
  {
    q: "안전보건관리체계 구축을 위해 경영책임자가 설정해야 하는 것은?",
    opts: [
      "매출 목표와 영업 방침",
      "안전보건 목표와 경영방침",
      "채용 계획과 임금 기준",
      "환경부 신고 계획",
    ],
    ans: 1,
    exp: "경영책임자는 안전보건관리체계 구축을 위해 안전보건 목표와 경영방침을 설정하고 전 직원에게 알려야 합니다.",
  },
  {
    q: "사업장에서 안전보건 예산을 편성·집행해야 하는 의무자는?",
    opts: [
      "고용노동부",
      "현장 반장",
      "경영책임자(사업주)",
      "근로자대표",
    ],
    ans: 2,
    exp: "중대재해처벌법 시행령은 경영책임자가 안전보건에 필요한 예산을 편성하고 집행할 의무를 부여합니다.",
  },
  {
    q: "중대재해처벌법 위반으로 유죄 판결을 받은 경영책임자의 형이 확정된 경우, 법원은 추가로 무엇을 명할 수 있는가?",
    opts: [
      "영업정지 명령",
      "징벌적 손해배상 5배 이내",
      "사업장 폐쇄",
      "주식 몰수",
    ],
    ans: 1,
    exp: "중대재해처벌법은 사업주·법인이 의무를 위반하여 손해를 입힌 경우 손해액의 5배 이내에서 징벌적 손해배상을 청구할 수 있도록 합니다.",
  },
  {
    q: "안전보건 관리 체계에서 '위험성평가'를 실시해야 하는 최소 주기는?",
    opts: ["매월 1회", "분기 1회", "반기 1회", "연 1회 이상 (수시 실시 포함)"],
    ans: 3,
    exp: "사업주는 위험성평가를 최초 실시 후 매년 정기적으로 실시해야 하며, 작업 방법 변경 등 수시로도 실시해야 합니다.",
  },
  {
    q: "안전보건관리규정을 작성·게시해야 하는 사업장 기준은?",
    opts: [
      "상시근로자 5인 이상",
      "상시근로자 10인 이상",
      "상시근로자 50인 이상",
      "상시근로자 100인 이상",
    ],
    ans: 3,
    exp: "상시근로자 100인 이상 사업장은 안전보건관리규정을 작성하여 게시·비치해야 합니다.",
  },
  {
    q: "안전관리자를 의무적으로 선임해야 하는 사업장 기준은?",
    opts: [
      "상시근로자 5인 이상 모든 제조업",
      "상시근로자 50인 이상(업종에 따라 다름)",
      "매출 10억원 이상 사업장",
      "모든 건설 현장",
    ],
    ans: 1,
    exp: "안전관리자는 상시근로자 50인 이상(업종별로 상이) 사업장에서 선임 의무가 있습니다. 구체적 기준은 산업안전보건법 시행령으로 정합니다.",
  },
  {
    q: "고용노동부 감독관이 사업장에 출입하여 안전보건 감독을 실시할 수 있는 법적 근거는?",
    opts: [
      "근로기준법",
      "산업안전보건법",
      "고용보험법",
      "직업안정법",
    ],
    ans: 1,
    exp: "산업안전보건법은 고용노동부 감독관이 사업장을 출입하여 관계 서류를 검사하고 안전보건 상태를 감독할 수 있는 권한을 부여합니다.",
  },
  {
    q: "중대재해처벌법상 사업주가 안전조치를 이행하지 않을 경우 받을 수 있는 처벌로 옳은 것은?",
    opts: [
      "구두 경고만 받음",
      "과태료 10만원",
      "중대재해 발생 시 징역 또는 벌금 처벌",
      "면허 취소만 해당",
    ],
    ans: 2,
    exp: "사업주가 안전보건관리체계 의무를 이행하지 않아 중대재해가 발생하면 징역 또는 벌금 형사처벌을 받을 수 있습니다.",
  },
  {
    q: "인쇄 사업장에서 발생하기 쉬운 직업성 질환과 관련 유해요인의 연결이 옳은 것은?",
    opts: [
      "소음성 난청 - 화학 용제",
      "유기용제 중독 - 톨루엔, 자일렌 등 유기용제 노출",
      "진폐증 - 소음",
      "근골격계 질환 - 자외선",
    ],
    ans: 1,
    exp: "인쇄 공정에서 사용하는 톨루엔, 자일렌 등 유기용제에 과다 노출되면 유기용제 중독이 발생할 수 있습니다.",
  },
  {
    q: "사업장에서 개인보호구(PPE)를 지급하고 착용하게 해야 하는 의무를 가지는 자는?",
    opts: ["근로자 본인", "사업주", "안전관리자", "노동조합"],
    ans: 1,
    exp: "사업주는 작업 특성에 맞는 개인보호구를 근로자에게 지급하고, 착용을 지도·감독할 의무가 있습니다.",
  },
  {
    q: "사업장 내 안전표지 부착 의무는 누가 지는가?",
    opts: [
      "고용노동부",
      "근로자",
      "사업주",
      "한국산업안전보건공단",
    ],
    ans: 2,
    exp: "사업주는 유해·위험 장소에 안전표지를 설치·부착하여 근로자에게 위험을 알릴 의무가 있습니다.",
  },
  {
    q: "작업환경측정을 실시해야 하는 주기(일반 유해인자)는?",
    opts: ["1년에 1회 이상", "반기(6개월)에 1회 이상", "2년에 1회 이상", "3년에 1회 이상"],
    ans: 1,
    exp: "사업주는 유해인자가 발생하는 작업장에 대해 반기에 1회 이상 작업환경측정을 실시해야 합니다.",
  },
  {
    q: "외국인 근로자에게 중대재해처벌법과 산업안전보건법 적용 여부는?",
    opts: [
      "외국인은 적용 제외",
      "비자 종류에 따라 다름",
      "내국인 근로자와 동일하게 적용",
      "고용주가 선택적으로 결정",
    ],
    ans: 2,
    exp: "외국인 근로자도 내국인과 동일하게 중대재해처벌법 및 산업안전보건법의 보호를 받습니다.",
  },
  {
    q: "중대재해 발생 시 사업주가 즉시 해야 할 첫 번째 조치는?",
    opts: [
      "언론 보도 차단",
      "작업 재개 명령",
      "재해자 응급처치 및 119 신고",
      "사고 원인 서류 작성",
    ],
    ans: 2,
    exp: "중대재해 발생 시 최우선 조치는 재해자에게 즉각적인 응급처치를 하고 119에 신고하는 것입니다.",
  },
  {
    q: "안전보건공단(KOSHA)의 주요 역할은?",
    opts: [
      "근로자를 직접 처벌",
      "산업재해 예방 기술 지원, 교육, 연구",
      "사업장에 과태료 부과",
      "임금 체불 해결",
    ],
    ans: 1,
    exp: "한국산업안전보건공단(KOSHA)은 산업재해 예방을 위한 기술 지원, 교육, 연구 및 홍보 등의 업무를 수행합니다.",
  },
  {
    q: "중대재해처벌법 제정의 주된 배경으로 가장 옳은 것은?",
    opts: [
      "기업 경쟁력 강화",
      "반복되는 중대산업재해에 대한 경영책임자의 책임 강화",
      "근로자 임금 인상",
      "외국 자본 유치",
    ],
    ans: 1,
    exp: "중대재해처벌법은 구의역 스크린도어, 태안화력발전소 사고 등 반복되는 중대재해에 대해 경영책임자의 책임을 강화하기 위해 제정되었습니다.",
  },
  {
    q: "안전보건 우수 사업장 인정(KOSHA-MS 등) 취득의 주요 효과는?",
    opts: [
      "법적 의무 면제",
      "산재보험료 감면 혜택 등 인센티브",
      "고용노동부 감독 면제",
      "법인세 전액 면제",
    ],
    ans: 1,
    exp: "KOSHA-MS 등 안전보건 우수 인정을 받으면 산재보험료 감면, 정부 지원사업 우선 선정 등 인센티브를 받을 수 있습니다.",
  },
];

const CONFETTI_COLORS = ['#003366', '#FFD700', '#4CAF50', '#FF5722', '#9C27B0', '#03A9F4', '#FF9800'];

function Confetti() {
  const pieces = Array.from({ length: 70 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
    duration: 2 + Math.random() * 2,
    color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
    size: 7 + Math.random() * 8,
    isCircle: Math.random() > 0.5,
  }));
  return (
    <div className={styles.confettiWrap}>
      {pieces.map(p => (
        <div
          key={p.id}
          className={styles.confettiPiece}
          style={{
            left: `${p.left}%`,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.duration}s`,
            backgroundColor: p.color,
            width: `${p.size}px`,
            height: `${p.size}px`,
            borderRadius: p.isCircle ? '50%' : '2px',
          }}
        />
      ))}
    </div>
  );
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function BannerDashboard() {
  const router = useRouter();
  const [newsList, setNewsList] = useState<NewsItem[]>(DEFAULT_NEWS);
  const [currentNews, setCurrentNews] = useState(0);
  const [showSafetyQuiz, setShowSafetyQuiz] = useState(false);
  const [showCheckQuiz, setShowCheckQuiz] = useState(false);
  const [weather, setWeather] = useState({ temp: '...', status: '전송 중', dust: '좋음' });

  // 퀴즈 상태
  const [quizPhase, setQuizPhase] = useState<'intro' | 'playing' | 'done'>('intro');
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [currentQIdx, setCurrentQIdx] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);

  // 소공인 체커 상태 (0: 업종, 1: 근로자 수, 2: 매출액, 3: 결과)
  const [checkStep, setCheckStep] = useState(0);
  const [checkFail, setCheckFail] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch('/api/news/external');
        if (!res.ok) throw new Error('Fetch failed');
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) setNewsList(data);
      } catch { /* 기본 뉴스 유지 */ }
    };

    const fetchWeather = async () => {
      try {
        const res = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.76&longitude=126.77&current_weather=true');
        const data = await res.json();
        if (data.current_weather) {
          const temp = Math.round(data.current_weather.temperature);
          setWeather(prev => ({ ...prev, temp: `${temp}°C`, status: '구름조금' }));
        }
      } catch {
        setWeather({ temp: '2.4°C', status: '맑음', dust: '좋음' });
      }
    };

    if (newsList === DEFAULT_NEWS) fetchNews();
    fetchWeather();

    const tickerTimer = setInterval(() => {
      setCurrentNews((cur) => (cur + 1) % newsList.length);
    }, 4500);
    return () => clearInterval(tickerTimer);
  }, [newsList]);

  const handleNewsClick = () => {
    const activeNews = newsList[currentNews];
    if (activeNews?.link.startsWith('http')) window.open(activeNews.link, '_blank');
    else router.push('/notice');
  };

  const handleWeatherClick = () => window.open('https://weather.naver.com/today/02480101', '_blank');

  const startQuiz = () => {
    setQuizQuestions(shuffle(ALL_QUIZ).slice(0, 10));
    setCurrentQIdx(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowAnswer(false);
    setQuizPhase('playing');
  };

  const handleSelectAnswer = (idx: number) => {
    if (showAnswer) return;
    setSelectedAnswer(idx);
    setShowAnswer(true);
    if (idx === quizQuestions[currentQIdx].ans) setScore(s => s + 1);
  };

  const handleNext = () => {
    if (currentQIdx < 9) {
      setCurrentQIdx(i => i + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setQuizPhase('done');
    }
  };

  const closeSafetyQuiz = () => {
    setShowSafetyQuiz(false);
    setQuizPhase('intro');
    setSelectedAnswer(null);
    setShowAnswer(false);
  };

  const closeCheckQuiz = () => {
    setShowCheckQuiz(false);
    setCheckStep(0);
    setCheckFail(null);
    setShowConfetti(false);
  };

  const scoreMessage = () => {
    if (score >= 9) return '🏆 완벽합니다! 안전 전문가 수준입니다.';
    if (score >= 7) return '👍 우수합니다! 조금 더 학습하면 완벽해요.';
    if (score >= 5) return '📚 중대재해처벌법을 더 공부해 보세요.';
    return '⚠️ 안전 교육이 필요합니다. 센터에 문의하세요.';
  };

  const currentQ = quizQuestions[currentQIdx];

  return (
    <>
      <div className={styles.dashboard}>
        <div className={styles.card} onClick={handleWeatherClick}>
          <div className={styles.cardHeader}>● 실시간 파주 기상</div>
          <div className={styles.weatherGrid}>
            <div className={styles.temp}>{weather.temp}</div>
            <div className={styles.weatherInfo}>
              <div className={styles.cardTitle}>{weather.status}</div>
              <div className={`${styles.dustBadge} ${styles.dustGood}`}>미세먼지 좋음</div>
            </div>
          </div>
        </div>

        <div className={styles.card} onClick={() => setShowSafetyQuiz(true)}>
          <div className={styles.cardHeader}>● 안전문화 확산</div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>중대재해처벌법 대비</div>
            <div className={styles.cardDesc}>우리 공장은 얼마나 준비되어 있을까요? 자가진단 해보기</div>
          </div>
        </div>

        <div className={styles.card} onClick={() => setShowCheckQuiz(true)}>
          <div className={styles.cardHeader}>● 지원대상 확인</div>
          <div className={styles.cardContent}>
            <div className={styles.cardTitle}>소공인 자격 체커</div>
            <div className={styles.cardDesc}>매출액과 근로자 수로 간편하게 지원 대상 여부를 확인하세요.</div>
          </div>
        </div>

        <div className={`${styles.card} ${styles.newsCard}`} onClick={handleNewsClick}>
          <div className={styles.cardHeader}>● 실시간 소공인 뉴스</div>
          <div className={styles.newsCardContent}>
            {newsList.map((news, index) => (
              <div
                key={index}
                className={`${styles.newsItem} ${index === currentNews ? styles.activeNews : ''}`}
              >
                {news.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 중대재해처벌법 퀴즈 모달 */}
      {showSafetyQuiz && (
        <div className={styles.modalOverlay} onClick={closeSafetyQuiz}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            <button className={styles.closeBtn} onClick={closeSafetyQuiz}>✕</button>
            <div className={styles.modalTag}>안전 진단</div>

            {quizPhase === 'intro' && (
              <>
                <h2>중대재해처벌법 대비 자가진단</h2>
                <p className={styles.introDesc}>
                  총 {ALL_QUIZ.length}개 문제 중 <strong>10개가 랜덤</strong>으로 출제됩니다.<br />
                  각 문제는 4지선다형이며, 정답과 해설을 바로 확인할 수 있습니다.
                </p>
                <button className={styles.actionBtn} onClick={startQuiz}>퀴즈 시작하기</button>
              </>
            )}

            {quizPhase === 'playing' && currentQ && (
              <>
                <div className={styles.quizProgress}>
                  <span>{currentQIdx + 1} / 10</span>
                  <div className={styles.progressBar}>
                    <div className={styles.progressFill} style={{ width: `${(currentQIdx + 1) * 10}%` }} />
                  </div>
                  <span>점수: {score}</span>
                </div>
                <div className={styles.quizQuestion}>{currentQ.q}</div>
                <div className={styles.quizOptions}>
                  {currentQ.opts.map((opt, idx) => {
                    let cls = styles.optionBtn;
                    if (showAnswer) {
                      if (idx === currentQ.ans) cls = `${styles.optionBtn} ${styles.optionCorrect}`;
                      else if (idx === selectedAnswer) cls = `${styles.optionBtn} ${styles.optionWrong}`;
                    }
                    return (
                      <button key={idx} className={cls} onClick={() => handleSelectAnswer(idx)} disabled={showAnswer}>
                        <span className={styles.optionLabel}>{['①', '②', '③', '④'][idx]}</span> {opt}
                      </button>
                    );
                  })}
                </div>
                {showAnswer && (
                  <div className={`${styles.explanation} ${selectedAnswer === currentQ.ans ? styles.expCorrect : styles.expWrong}`}>
                    <strong>{selectedAnswer === currentQ.ans ? '✓ 정답!' : '✗ 오답'}</strong>
                    <p>{currentQ.exp}</p>
                    <button className={styles.nextBtn} onClick={handleNext}>
                      {currentQIdx < 9 ? '다음 문제 →' : '결과 보기'}
                    </button>
                  </div>
                )}
              </>
            )}

            {quizPhase === 'done' && (
              <div className={styles.resultView}>
                <div className={styles.resultIcon}>
                  {score >= 9 ? '🏆' : score >= 7 ? '👍' : score >= 5 ? '📚' : '⚠️'}
                </div>
                <h2>퀴즈 완료!</h2>
                <div className={styles.scoreDisplay}>
                  <span className={styles.scoreNum}>{score}</span>
                  <span className={styles.scoreDen}> / 10</span>
                </div>
                <p className={styles.scoreMsg}>{scoreMessage()}</p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
                  <button className={styles.actionBtn} onClick={startQuiz}>다시 풀기</button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`} onClick={closeSafetyQuiz}>닫기</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 소공인 자격 체커 모달 */}
      {showCheckQuiz && (
        <div className={styles.modalOverlay} onClick={closeCheckQuiz}>
          <div className={styles.modal} onClick={e => e.stopPropagation()}>
            {showConfetti && <Confetti />}
            <button className={styles.closeBtn} onClick={closeCheckQuiz}>✕</button>
            <div className={styles.modalTag}>자격 확인</div>
            <h2>소공인 지원대상 확인</h2>

            {/* 실패 결과 */}
            {checkFail && (
              <div className={styles.resultView}>
                <div className={styles.resultIcon}>⚠️</div>
                <p style={{ color: '#c0392b', fontWeight: 600 }}>{checkFail}</p>
                <button className={styles.actionBtn} onClick={closeCheckQuiz}>확인</button>
              </div>
            )}

            {/* STEP 0: 주된 업종 확인 */}
            {!checkFail && checkStep === 0 && (
              <>
                <div className={styles.checkerStepBadge}>STEP 1 · 주된 업종 확인</div>
                <div className={styles.quizQuestion}>
                  귀사의 <strong>전체 매출 중 제조업(C) 비중이 가장 높은가요?</strong>
                </div>
                <p className={styles.checkerNote}>
                  💡 소공인은 제조업이 주된 업종이어야 합니다. 서비스·도소매 등 타 업종 매출이 더 높으면 해당되지 않습니다.
                </p>
                <div className={styles.quizOptions}>
                  <button className={styles.optionBtn} onClick={() => setCheckStep(1)}>
                    예, 제조업 매출이 가장 높습니다
                  </button>
                  <button className={styles.optionBtn} onClick={() => setCheckFail('소공인 지원은 제조업(C)이 주된 업종(매출 최대 비율)인 사업체에 해당합니다. 제조업 비중을 확인해 주세요.')}>
                    아니오, 다른 업종 매출이 더 높습니다
                  </button>
                </div>
              </>
            )}

            {/* STEP 1: 근로자 수 확인 */}
            {!checkFail && checkStep === 1 && (
              <>
                <div className={styles.checkerStepBadge}>STEP 2 · 상시근로자 수 확인</div>
                <div className={styles.quizQuestion}>
                  귀사의 <strong>상시근로자 수</strong>는 몇 명인가요?
                </div>
                <div className={styles.quizOptions}>
                  <button className={styles.optionBtn} onClick={() => setCheckStep(2)}>
                    10인 미만
                  </button>
                  <button className={styles.optionBtn} onClick={() => setCheckFail('소공인은 상시근로자 10인 미만이어야 합니다. 중소기업 지원 프로그램(중소벤처기업부)을 확인해 보세요.')}>
                    10인 이상
                  </button>
                </div>
              </>
            )}

            {/* STEP 2: 매출액 확인 */}
            {!checkFail && checkStep === 2 && (
              <>
                <div className={styles.checkerStepBadge}>STEP 3 · 연간 매출액 확인</div>
                <div className={styles.quizQuestion}>
                  귀사의 <strong>연간 매출액</strong>이 소기업 기준 이내인가요?
                </div>
                <div className={styles.checkerWarning}>
                  ⚠️ <strong>매출액 기준은 업종별로 상이합니다.</strong><br />
                  정확한 기준은 반드시 중소기업현황정보시스템(sminfo.mss.go.kr) 또는 저희 센터에서 확인하시기 바랍니다.
                  <br /><br />
                  예시: 인쇄업(제조C) — 평균 매출액 120억원 이하 소기업 기준 적용
                </div>
                <div className={styles.quizOptions}>
                  <button className={styles.optionBtn} onClick={() => { setCheckStep(3); setShowConfetti(true); }}>
                    예, 기준 이내로 확인됩니다
                  </button>
                  <button className={styles.optionBtn} onClick={() => setCheckFail('매출액 기준을 초과하는 경우 소기업 지원 대상이 아닐 수 있습니다. 센터에 문의하시면 정확한 안내를 받으실 수 있습니다.')}>
                    확인이 필요하거나 기준 초과입니다
                  </button>
                </div>
              </>
            )}

            {/* STEP 3: 최종 결과 — 안정권 */}
            {!checkFail && checkStep === 3 && (
              <div className={styles.resultView}>
                <div className={styles.resultIcon}>🎉</div>
                <h3 style={{ color: '#003366', marginBottom: '8px' }}>소공인 지원 대상에 해당됩니다!</h3>
                <p style={{ color: '#555', lineHeight: '1.7', marginBottom: '8px' }}>
                  ✅ 주된 업종: 제조업(C)<br />
                  ✅ 상시근로자: 10인 미만<br />
                  ✅ 연간 매출액: 기준 이내
                </p>
                <p style={{ color: '#777', fontSize: '13px', marginBottom: '24px' }}>
                  파주인쇄소공인특화지원센터와 함께 성장하세요!<br />
                  회원으로 가입하시면 전용 지원사업, 교육, 컨설팅을 우선 제공받으실 수 있습니다.
                </p>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <button
                    className={styles.actionBtn}
                    style={{ background: '#003366', fontSize: '16px', padding: '14px 32px' }}
                    onClick={() => { closeCheckQuiz(); router.push('/signup'); }}
                  >
                    🚀 센터 회원가입 하기
                  </button>
                  <button className={`${styles.actionBtn} ${styles.actionBtnSecondary}`} onClick={closeCheckQuiz}>
                    나중에
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
