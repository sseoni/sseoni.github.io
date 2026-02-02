---
layout: post

title: "LangChain 1. 기본 이해"
date: 2025-05-05
tags: [스터디로그, Langchain, NLP, LLM]
summary:
---

## **LangChain의 목적**

LangChain은 **LLM(Large Language Model)을 도구처럼 활용하는 체인 기반 프레임워크**이다.

단순히 LLM에게 한 번 질문하고 끝나는 게 아니라

- 외부 지식 검색(RAG),
- 도구 호출(계산기, 웹 브라우저, DB),
- 사용자 컨텍스트 기억하기(Memory),
- 체계적 응답 흐름 설계(Chain, Agent)

등을 통해 LLM을 **실제 "에이전트"처럼 사용하는 시스템**을 만들 수 있게 한다.

## **LangChain의 주요 구성 요소 (Core Concepts)**

| 구성 요소 | 역할 |
| --- | --- |
| **LLM** / ChatModel | GPT-4, Claude 같은 언어 모델 |
| **Prompt Template** | 프롬프트 설계 및 변수 삽입 |
| **Chain** | 여러 컴포넌트를 연결한 처리 흐름 |
| **Memory** | 대화나 상태를 기억 |
| **Tool** | 계산기, 검색 등 외부 기능 호출 |
| **Agent** | 도구를 상황에 따라 선택해서 사용하는 "지능형 실행자" |
| **Retriever** | 외부 지식 문서를 검색하는 객체 (RAG) |
| **Document Loader** | PDF, Notion 등에서 문서 불러오기 |
| **Output Parser** | 모델 출력을 원하는 형태로 가공 |

## **LangChain Expression Language (LCEL)**

LangChain은 이전에는 `chain.run()` 같은 Imperative 방식이었지만,

지금은 **LCEL(LangChain Expression Language)**라는 **선언형 구성 방식**이 주류이다.

```python
chain = prompt | llm | parser
result = chain.invoke({"input": "Hello"})
```

이런 식으로 **데이터 흐름을 파이프(|)로 연결**해서 표현한다.

이건 LangGraph, Streaming, Async 처리 등과도 연결되기 때문에 꼭 알아야 한다.

## **LangChain의 체인 vs 에이전트**

| Chain | Agent |
| --- | --- |
| 정해진 순서대로 실행 | 상황에 따라 도구 선택 |
| 예: Prompt → LLM → Output | 예: 질문 분석 후 검색 도구 실행 |
| 흐름이 고정 | 동적 판단 필요 |

## 기타

LangChain과 함께 자주 쓰이는 것들

- **OpenAI API (GPT-4 등)**
- **FAISS / Chroma** (벡터 검색용)
- **LangSmith** (디버깅/로깅)
- **Streamlit / Gradio / FastAPI** (프론트엔드 연동)