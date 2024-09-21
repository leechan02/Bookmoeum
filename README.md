<h1 align="center">
    📚 책모음
</h1>

<h3 align="center">
	<a href="#-프로젝트-소개">프로젝트 소개</a>
	<span> · </span>
	<a href="#%EF%B8%8F-기술-스택">기술 스택</a>
</h3>

## ✋ 프로젝트 소개
책모음은 여러 사이트를 돌아다니지 않고 한 곳에서 다양한 서점 및 도서관의 책 정보를 확인할 수 있는 검색 서비스입니다. 사용자는 검색한 책이 어디에서 제공되는지 쉽게 찾아볼 수 있습니다.

Next.js로 구현하였고, 모든 디자인은 Tailwindcss로 반응형을 고려하여 작업되었습니다. 컴포넌트의 애니메이션은 Framer Motion을 통해 구현되었으며, Redux로 다크 모드와 상태 관리를 처리했습니다. React Query를 통해 데이터 페칭과 상태 관리를 최적화하였고, 무한 스크롤 기능은 `useInfinityScroll`을 사용해 구현하였습니다.

로그인과 데이터베이스는 Firebase를 활용해 구현하였고, 책 정보는 Naver API와 알라딘 API를 사용하여 다양한 정보를 제공합니다. 서점과 도서관의 API 외에도 웹 크롤링을 통해 추가 정보를 수집합니다.

## 🖥️ 기술 스택
| 분류 | 기술스택 |
| --- | --- |
| 🎨 **프론트엔드** | <img src="https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=ffffff"> <img src="https://img.shields.io/badge/Next.js-000000?logo=Next.js&logoColor=white"> <img src="https://img.shields.io/badge/React-000000?logo=React&logoColor=61DAFB"> <img src="https://img.shields.io/badge/tailwindcss-ffffff?logo=tailwindcss&logoColor=06B6D4"> ![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=ffffff) ![Framer](https://img.shields.io/badge/Framer-0055FF?logo=framer&logoColor=ffffff) ![Redux](https://img.shields.io/badge/Redux-764ABC?logo=redux&logoColor=ffffff) ![React-query](https://img.shields.io/badge/React%20Query-FF4154?logo=react-query&logoColor=ffffff)|
| 🛠️ **패키지 매니저** | ![Yarn](https://img.shields.io/badge/Yarn-2C8EBB?logo=yarn&logoColor=ffffff)|
| 🌐 **배포** | <img src="https://img.shields.io/badge/Vercel-000000?logo=Vercel&logoColor=ffffff"> |
| 🔥 **인증 및 데이터베이스** | ![Firebase](https://img.shields.io/badge/Firebase-FFCA28?logo=firebase&logoColor=ffffff) |

## 🎯 프로젝트 하이라이트
- **다양한 책 정보 제공**: Naver API, 알라딘 API, 교보문고, Yes24, 리디북스 데이터를 수집하여 책의 상세 정보를 제공합니다.
- **OPEN APIs 및 웹 크롤링**: 서점과 도서관의 API 및 크롤링을 통해 어디서 책을 읽을 수 있는지 한곳에서 확인할 수 있습니다.
- **반응형 UI**: Tailwind CSS와 Figma를 이용해 다양한 디바이스에서 최적화된 UI 제공.
- **무한 스크롤 기능**: `useInfinityScroll`을 사용하여 스크롤 시 새로운 데이터를 불러오는 사용자 경험 최적화.
